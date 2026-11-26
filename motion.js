/* Transitions for local manuscript review. Application state is committed before any animation. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const settle = 'cubic-bezier(.16,1,.3,1)';
  const live = new Set();
  let pendingLocate = 0;
  let strokeLayer;

  function animate(element, frames, duration, options = {}) {
    if (!element?.animate || reduced.matches || document.hidden) return;
    const animation = element.animate(frames, { duration, easing: settle, ...options });
    live.add(animation);
    animation.finished.then(() => live.delete(animation), () => live.delete(animation));
    return animation;
  }

  function stop() {
    cancelAnimationFrame(pendingLocate);
    pendingLocate = 0;
    for (const animation of live) animation.cancel();
    live.clear();
    strokeLayer?.remove();
    strokeLayer = null;
  }

  reduced.addEventListener('change', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });

  function focusKey(element) {
    if (!element || !document.querySelector('#app')?.contains(element)) return;
    if (element.id) return '#' + CSS.escape(element.id);
    if (element.dataset.act) return '[data-act="' + CSS.escape(element.dataset.act) + '"]';
  }

  function firstLine(element) {
    if (!element) return;
    const range = document.createRange();
    range.selectNodeContents(element);
    for (const rect of range.getClientRects()) {
      if (rect.width && rect.height) return { x: rect.left, y: rect.top };
    }
  }

  function usesPageScroll(sheet) {
    return sheet?.closest('main.review') && getComputedStyle(sheet).overflowY === 'visible';
  }

  function visibleSheetBounds(sheet, bounds, pageScroll) {
    if (!pageScroll) return bounds;
    const toolbar = sheet.closest('.stage').querySelector('.toolbar');
    return {
      top: Math.max(bounds.top,toolbar.getBoundingClientRect().bottom),
      bottom: Math.min(bounds.bottom,window.innerHeight),
      left: bounds.left,
      right: bounds.right
    };
  }

  function pageState() {
    const main = document.getElementById('main');
    if (!main) return;
    const paper = main.querySelector('.paper');
    const inspector = main.querySelector('.inspector');
    const sheet = main.querySelector('.sheets');
    const sheetBounds = sheet?.getBoundingClientRect();
    const pageScroll = usesPageScroll(sheet);
    const visibleBounds = visibleSheetBounds(sheet,sheetBounds,pageScroll);
    const markBounds = paper?.querySelector('.mark')?.getClientRects()[0];
    const anchorWasVisible = markBounds && visibleBounds && markBounds.top >= visibleBounds.top &&
      markBounds.bottom <= visibleBounds.bottom;
    return {
      page: document.querySelector('.nav [aria-current="page"]')?.dataset.act || main.className,
      issue: inspector?.querySelector('#reviewIssue')?.value,
      issueIndex: inspector?.querySelector('#reviewIssue')?.selectedIndex,
      tab: inspector?.querySelector('.activeTab')?.dataset.act,
      done: Boolean(inspector?.querySelector('[data-act="undo"]')),
      template: paper ? [...paper.classList].sort().join(' ') : '',
      scroll: sheet?.scrollTop || 0,
      pageScroll,
      visibleAnchorOffset: anchorWasVisible ? markBounds.top - (pageScroll ? 0 : sheetBounds.top) : null,
      inspectorScroll: main.querySelector('.inspectBody')?.scrollTop || 0,
      titlePosition: firstLine(paper?.querySelector('h2')),
      focus: focusKey(document.activeElement)
    };
  }

  function capture() {
    stop();
    return pageState();
  }

  function restoreFocus(previous, current) {
    if (!previous.focus || document.querySelector('dialog[open]') || document.activeElement !== document.body) return;
    let target = [...document.querySelectorAll(previous.focus)].find(node => node.checkVisibility?.() ?? node.getClientRects().length);
    if (!target && previous.done !== current.done) {
      target = document.querySelector(current.done ? '[data-act="undo"]' : '[data-act="accept"]');
    }
    if (!target) {
      target = document.querySelector('#main h1');
      target?.setAttribute('tabindex', '-1');
    }
    target?.focus({ preventScroll: true });
  }

  // Each text fragment gets a short stroke. The pen continues across wrapped lines.
  function trace(element, action = 'select') {
    const sheet = element?.closest('.sheets');
    if (!sheet || reduced.matches || document.hidden || !element.animate) return;
    const bounds = sheet.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const viewport = visibleSheetBounds(sheet,bounds,usesPageScroll(sheet));
    const range = document.createRange();
    range.selectNodeContents(element);
    const visible = [...range.getClientRects()].filter(rect =>
      rect.width > 1 && rect.height > 1 && rect.bottom > viewport.top &&
      rect.top < viewport.bottom && rect.right > viewport.left && rect.left < viewport.right
    ).slice(0, 6);
    if (!visible.length) return;

    const color = { accept: '#16715a', undo: '#a6641e', select: '#3b59b2' }[action];
    const layer = document.createElement('span');
    layer.setAttribute('aria-hidden', 'true');
    layer.dataset.inkTrace = action;
    // A zero-size origin avoids changing the scroll viewport or manuscript's text selection.
    layer.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;z-index:2;user-select:none';
    sheet.append(layer);
    strokeLayer = layer;
    const totalWidth = visible.reduce((sum, rect) => sum + rect.width, 0);
    const drawTime = {select:155,accept:290,undo:220}[action];
    let elapsed = 0;
    const drawing = [];
    for (const rect of visible) {
      const fragment = document.createElement('span');
      const x = rect.left - bounds.left + sheet.scrollLeft - sheet.clientLeft;
      const y = rect.top - bounds.top + sheet.scrollTop - sheet.clientTop;
      Object.assign(fragment.style, {
        position: 'absolute', display: 'block', left: x + 'px', top: y + 'px',
        width: rect.width + 'px', height: rect.height + 'px',
        transformOrigin: 'left center', backgroundColor: color + '26',
        borderBottom: '2px solid ' + color, boxSizing: 'border-box'
      });
      layer.append(fragment);
      const duration = drawTime * rect.width / totalWidth;
      const animation = animate(fragment, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
        duration, { delay: elapsed, fill: 'backwards', easing: 'linear' });
      if (animation) drawing.push(animation.finished);
      elapsed += duration;
    }
    Promise.all(drawing).then(() => {
      if (!layer.isConnected) return;
      const fade = animate(layer, [{ opacity: 1 }, { opacity: 0 }], 145);
      if (fade) fade.finished.then(() => layer.remove(), () => layer.remove());
      else layer.remove();
    }, () => layer.remove());
  }

  function locate(paragraph) {
    stop();
    pendingLocate = requestAnimationFrame(() => trace(paragraph.querySelector('.mark') || paragraph));
  }

  function transitionOutline(outline, button) {
    stop();
    if (!outline.hidden) {
      animate(outline, [
        {clipPath:'inset(0 100% 0 0)',opacity:.88},
        {clipPath:'inset(0 0 0 0)',opacity:1}
      ],185);
    } else {
      animate(button.querySelector('svg'),[{opacity:.55},{opacity:1}],120);
    }
  }

  function changePaper(previous) {
    const sheet = document.querySelector('.sheets');
    if (sheet) sheet.scrollTop = previous.scroll;
    const paper = sheet?.querySelector('.paper');
    const title = paper?.querySelector('h2');
    const next = firstLine(title);
    if (next && previous.titlePosition) {
      const dx = Math.max(-110, Math.min(110, previous.titlePosition.x - next.x));
      const dy = Math.max(-26, Math.min(26, previous.titlePosition.y - next.y));
      animate(title, [
        { transform: 'translate(' + dx + 'px, ' + dy + 'px)' },
        { transform: 'translate(0, 0)' }
      ], 380);
    }
    animate(paper, [
      { opacity: .78, transform: 'perspective(1500px) rotateY(-1.15deg)', transformOrigin: 'left center' },
      { opacity: 1, transform: 'perspective(1500px) rotateY(0deg)', transformOrigin: 'left center' }
    ], 350);
  }

  function finish(previous) {
    const current = pageState();
    if (!current) return;
    const mark = document.querySelector('.stage .mark');
    if (!previous) {
      trace(mark);
      return;
    }
    restoreFocus(previous, current);
    if (previous.page !== current.page) {
      if (current.page === 'page:review') return;
      animate(document.querySelector('#main .workspace, #main .projectWrap'), [
        { opacity: .8, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }
      ], 205);
      return;
    }
    if (previous.template !== current.template) {
      changePaper(previous);
      return;
    }
    const changed = previous.done !== current.done && current.tab === previous.tab && current.issue === previous.issue;
    if (changed && mark) {
      cancelAnimationFrame(pendingLocate);
      // Keep the same printed line in place while its wording changes.
      const sheet = mark.closest('.sheets');
      const firstFragment = mark.getClientRects()[0];
      if (sheet && firstFragment && previous.visibleAnchorOffset !== null) {
        if (previous.pageScroll && current.pageScroll) {
          window.scrollBy(0,firstFragment.top - previous.visibleAnchorOffset);
        } else if (!previous.pageScroll && !current.pageScroll) {
          sheet.scrollTop += firstFragment.top - sheet.getBoundingClientRect().top - previous.visibleAnchorOffset;
        }
      }
      const inspector = document.querySelector('.inspectBody');
      if (inspector) inspector.scrollTop = previous.inspectorScroll;
      trace(mark, current.done ? 'accept' : 'undo');
      animate(document.querySelector('.selectedReviewHead .pill'), [
        {opacity:.68}, {opacity:1}
      ],145);
    } else if (current.issue && previous.issue && current.issue !== previous.issue) {
      const direction = current.issueIndex < previous.issueIndex ? -1 : 1;
      animate(document.querySelector('.selectedReview'), [
        {opacity:.85,transform:'translateX('+(direction*5)+'px)'},
        {opacity:1,transform:'none'}
      ],155);
    }
  }

  window.StudioMotion = { capture, finish, locate, transitionOutline };
})();

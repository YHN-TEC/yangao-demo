 
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iconPaths={doc:'M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 16h6',projects:'M3 6h7l2 2h9v12H3z',review:'M4 4h13v8 M4 4v16h7 M13 17l6-6 2 2-6 6-3 1z',format:'M3 5h18v14H3z M13 5v14 M6 9h4 M6 12h4',message:'M4 4h16v12H9l-5 4z',layers:'m12 3 9 5-9 5-9-5z M3 12l9 5 9-5 M3 16l9 5 9-5',check:'m4 12 5 5L20 6',clock:'M21 12a9 9 0 1 1-18 0 9 9 0 1 1 18 0 M12 7v5l3 2',out:'M12 4v11 m-4-4 4 4 4-4 M4 16v4h16v-4',in:'M12 16V4 m-4 4 4-4 4 4 M4 16v4h16v-4',user:'M16 8a4 4 0 1 1-8 0 4 4 0 1 1 8 0 M4 20c0-7 16-7 16 0',spark:'m11 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2z M18 3v4 M16 5h4',scan:'M4 8V4h4 M16 4h4v4 M20 16v4h-4 M8 20H4v-4 M8 12h8',pin:'M18 10c0 5-6 10-6 10S6 15 6 10a6 6 0 1 1 12 0z M12 8v3',edit:'m4 16 11-11 4 4L8 20H4z M13 7l4 4',undo:'m8 4-5 5 5 5 M4 9h10a6 6 0 0 1 0 12',x:'m6 6 12 12 M18 6 6 18',book:'M12 6Q7 2 3 4v15q5-2 9 2 4-4 9-2V4q-5-2-9 2z M12 6v15',warn:'m12 3 10 17H2z M12 9v5 M12 17h.01',list:'M8 6h12 M8 12h12 M8 18h12 M4 6h.01 M4 12h.01 M4 18h.01',expand:'M4 9V4h5 M15 4h5v5 M20 15v5h-5 M9 20H4v-5',plus:'M12 4v16 M4 12h16',note:'M5 4h14v16H5z M9 9h6 M9 13h4',shield:'M12 3 4 6v6q0 6 8 9 8-3 8-9V6z M8 12l3 3 5-6',compare:'M4 7h16 M16 3l4 4-4 4 M20 17H4 M8 13l-4 4 4 4'};
Object.assign(iconPaths, {down:'m6 9 6 6 6-6',prev:'m15 5-7 7 7 7',next:'m9 5 7 7-7 7',collapse:'m11 5-7 7 7 7 M19 5l-7 7 7 7'});
const ic=k=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${iconPaths[k]||iconPaths.doc}"/></svg>`;
const btn=(text,act,icon='',style='')=>`<button type="button" class="btn ${style}" data-act="${esc(act)}">${icon?ic(icon):''}${esc(text)}</button>`;
const link=(text,act,icon='')=>`<button type="button" class="link" data-act="${esc(act)}">${icon?ic(icon):''}${esc(text)}</button>`;
const statusText={open:'待处理',hold:'待补材料',done:'已处理',defer:'已暂缓'};
const pill=(s)=>`<span class="pill ${esc(s)}">${esc(statusText[s]||s)}</span>`;
const abstract='校园绿地是大学生日常接触自然的重要场所。本研究采用问卷调查法，考察校园绿地接触与大学生心理恢复之间的关系。结果显示，较高的绿地接触频率与较好的自评心理恢复水平相关。研究提示，在校园公共空间规划中，可进一步关注步行路径沿线的绿地可达性与休憩设施。';
const lead='本研究采用问卷调查法，考察校园绿地接触与大学生心理恢复之间的关系。';
const revised='本研究基于248名在校大学生的有效问卷，考察校园绿地接触与心理恢复之间的关系。';
const seedParts=[
{id:'abs',head:'摘要',text:abstract},{id:'intro',head:'1　引言',text:'校园绿地为学生提供了日常休憩与社会交往的空间。在高密度的校园环境中，学生如何接触自然、如何评价接触后的心理状态，是校园空间设计值得关注的问题。'},
{id:'method',head:'2　研究方法',text:'本研究在一所综合性大学开展横断面问卷调查，共获得248份有效问卷。调查记录受访者近一周的绿地接触频率，以及接触后的自评心理恢复水平。'},
{id:'result',head:'3　结果与讨论',text:'绿地接触频率较高的学生报告了较好的心理恢复水平。校园绿地为学生提供了日常休憩与社会交往的空间。研究结论可推广至其他院校。'}];
const seedIssues=[
{id:'i1',part:'abs',title:'在摘要中补充样本量',author:'林老师',quote:'请在摘要中交代有效样本量，让读者知道研究结论基于多少份问卷。',old:lead,suggest:revised,basis:'研究方法中记录了248份有效问卷。',ref:'method',status:'open'},
{id:'i2',part:'result',title:'说明结论的适用范围',author:'林老师',quote:'样本来自一所大学，推广到其他院校的依据是什么？请补充说明。',old:'研究结论可推广至其他院校。',suggest:'本研究仅涉及一所大学，结论在其他院校的适用性仍需验证。',basis:'目前仅有单校数据，可先收窄结论，或补充跨校证据。',ref:'method',status:'hold'},
{id:'i3',part:'result',title:'精简讨论中的重复表述',author:'审稿人 1',quote:'讨论的第二句与引言重复，请结合研究结果说明其含义。',old:'校园绿地为学生提供了日常休憩与社会交往的空间。',suggest:'这一关联提示，后续研究可考察学生实际使用绿地的方式。',basis:'该句也出现在引言首段。',ref:'intro',status:'open'},
{id:'i4',part:'method',title:'明确问卷调查的时间范围',author:'审稿人 1',quote:'请明确接触频率对应的回忆时间。',old:'调查记录受访者的绿地接触频率，以及接触后的自评心理恢复水平。',suggest:'调查记录受访者近一周的绿地接触频率，以及接触后的自评心理恢复水平。',basis:'与示例问卷的回忆时段一致。',status:'done'}];
const copy=o=>JSON.parse(JSON.stringify(o));
const uid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
function makeDoc(title,parts,issues,demo=false){return {phase:'pre',id:uid(),title,demo,versions:[{parts:copy(parts),label:'导入主稿',date:new Date().toISOString()}],issues:issues.map(i=>({...i,notes:[]})),exports:[],checkedVersion:null,updated:Date.now()};}
let db = { docs: [], current: null };
let workspaceReady = false;
let workspaceRevision = 0;
let saveQueue = Promise.resolve();
let savesPending = 0;
let saveError = '';
let importTarget = null;
const doc = () => db.docs.find(d => d.id === db.current) || db.docs[0];
const latest = () => (doc()?.versions.length || 1) - 1;
const parts = (n = latest()) => doc()?.versions[n]?.parts || [];
const vtag=n=>`v1.${n}`;
const journalNames=['环境与空间研究','校园发展研究'];
const journals=[{limit:180,font:'宋体',size:12,spacing:360,margin:1440},{limit:95,font:'黑体',size:11,spacing:300,margin:1080}];
const count=t=>Array.from(t.replace(/\s/g,'')).length;
const phaseNames = { pre: '投稿前 · 导师批注', post: '投稿后 · 期刊返修' };
function legacyStage(item, demo) {
  if (demo && ['i3', 'i4'].includes(item.id)) return 'post';
  return item.author === '审稿意见' && item.manual && item.title === item.quote.slice(0, 24) ? 'post' : 'pre';
}
function currentIssues(d = doc()) {
  return (d?.issues || []).filter(item => item.stage === (d.phase || 'pre'));
}
function migrateDoc(d) {
  d.phase ||= 'pre';
  d.issues.forEach(item => { item.stage ||= legacyStage(item, d.demo); });
}
function setPhase(d, phase, decision) {
  d.phase = phase;
  if (phase === 'post') {
    d.decision = decision || d.decision || '大修';
    d.reviewBase ??= d.versions.length - 1;
  }
}
function phaseDialog(initialPhase) {
  const d = doc();
  modal('选择改稿阶段', `<p>请选择这次要处理的意见来源。论文正文沿用当前主稿，各阶段单独记录进度。</p>
    <label for="workPhase">改稿阶段</label><select id="workPhase"><option value="pre">投稿前 · 导师 Word 批注</option><option value="post">投稿后 · 期刊审稿意见</option></select>
    <div class="decisionRow"><label for="decision">期刊决定</label><select id="decision"><option>大修</option><option>小修</option></select></div>
    <div class="btns">${btn('进入该阶段','apply-phase','check','primary')}</div>`);
  $('#workPhase').value = initialPhase || d.phase || 'pre';
  $('#decision').value = d.decision || '大修';
  $('.decisionRow').hidden = $('#workPhase').value !== 'post';
}
let ui;
const singlePane = window.matchMedia('(max-width: 900px)');
function resetUI(page='projects'){ui={page,sel:currentIssues()[0]?.id,filter:'all',tab:'suggest',journal:0,version:latest(),view:'formatted',reviewPane:'paper',outlineOpen:null,scroll:{},focus:false,back:false,selectedText:null,manuscriptDraft:null};}
resetUI();
const issue=()=>currentIssues().find(i=>i.id===ui.sel);
const pby=(id,n=latest())=>parts(n).find(p=>p.id===id);
const paragraphLabel = /^段落 \d+$/;
function inferredHeadingLevel(text) {
  const number = text.match(/^(\d+(?:[.．]\d+)*)(?:[\s　、]|[.．](?=\D))/);
  if (number) return number[1].split(/[.．]/).length;
  if (/^(摘要|引言|研究方法|结果|讨论|结论|参考文献|致谢)(?:$|\s)|^第[一二三四五六七八九十百\d]+[章节篇]/.test(text)) return 1;
  return 0;
}
const chapterLevel = p => p.outlineLevel ?? (paragraphLabel.test(p.head) ? 0 : inferredHeadingLevel(p.head) || 1);
const chapterTitle = p => p.titleInText ? p.text : p.head;
function partContext(id) {
  let chapter = '';
  for (const p of parts()) {
    if (chapterLevel(p)) chapter = chapterTitle(p);
    if (p.id === id) return chapterLevel(p) || !chapter ? chapterTitle(p) : `${chapter} · ${p.head}`;
  }
  return '全文';
}
let toastTimer;
function tell(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3000);}
function updateSaveStatus() {
  const status = $('.saveState');
  if (!status) return;
  status.innerHTML = saveError ? link('保存失败 · 重试','retry-save')
    : savesPending ? '正在保存' : '已保存到此浏览器';
  status.title = saveError;
}

function save() {
  if (!workspaceReady) return Promise.resolve(false);
  const snapshot = copy(db);
  savesPending++;
  saveError = '';
  updateSaveStatus();
  saveQueue = saveQueue.then(async () => {
    try {
      const result = await BrowserWorkspace.save(snapshot,workspaceRevision);
      workspaceRevision = result.revision;
      saveError = '';
      return true;
    } catch (error) {
      saveError = error.message || '保存失败，请重试。';
      tell(saveError);
      return false;
    } finally {
      savesPending--;
      updateSaveStatus();
    }
  });
  return saveQueue;
}

function anchorPosition(paragraph, text, issue) {
  if (!text) return -1;
  if (issue.anchorText !== undefined) {
    return paragraph === issue.anchorText && paragraph.slice(issue.anchorOffset,issue.anchorOffset+text.length) === text
      ? issue.anchorOffset : -1;
  }
  const first = paragraph.indexOf(text);
  return first >= 0 && paragraph.indexOf(text,first+1) === -1 ? first : -1;
}

function setAnchor(issue, paragraph, offset, target = issue.old) {
  issue.anchorOffset = offset;
  const first = paragraph.indexOf(target);
  if (first !== offset || paragraph.indexOf(target,first+1) >= 0) issue.anchorText = paragraph;
  else delete issue.anchorText;
}

function changeText(item, old, replacement, label) {
  const next = copy(parts()), part = next.find(p => p.id === item.part);
  if (!part) return false;
  const offset = anchorPosition(part.text,old,item);
  if (offset < 0) return false;
  part.text = part.text.slice(0,offset) + replacement + part.text.slice(offset+old.length);
  setAnchor(item,part.text,offset,replacement);
  snapshot(next,label);
  return true;
}

function snapshot(changed,label){doc().versions.push({parts:copy(changed),label,date:new Date().toISOString()});doc().updated=Date.now();ui.version=latest();doc().checkedVersion=null;}
function actButton(title,action,icon){return `<button class="iconbtn" data-act="${action}" aria-label="${esc(title)}" title="${esc(title)}">${ic(icon)}</button>`;}
const names={projects:'论文项目',review:'改稿工作台',format:'期刊排版'};
const landingTitle = document.title;

function header() {
  const d = doc();
  const navButtons = Object.entries(names).map(([page, name]) => {
    const active = ui.page === page;
    return `<button data-act="page:${page}" class="${active ? 'here' : ''}" ${page !== 'projects' && !parts().length ? 'disabled' : ''} ${active ? 'aria-current="page"' : ''}>
      ${ic(page)}<span>${name}</span>
    </button>`;
  }).join('');
  const context = ui.page === 'projects'
    ? '<span>论文项目</span>'
    : `<button data-act="page:projects">论文项目</button><span class="crumbSlash">/</span><span class="crumbTitle">${esc(d.title)}</span>`;
  const controls = ui.page === 'projects'
    ? btn('导入论文', 'import', 'in') + btn('新建项目','new-project','plus','primary')
    : btn('版本记录', 'history', 'clock') + (ui.page === 'review' ? btn('导出文稿', 'export', 'out', 'primary') : '');
  return `<header class="top">
    <button class="brand" data-act="home" aria-label="砚稿，返回网站首页">
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M5 10c7-1 11 1 15 4v19c-5-4-9-5-15-4z" fill="#d2dfff" stroke="none"/>
        <path d="M22 14c4-4 8-6 14-7v20c-5 1-9 3-14 6z" fill="#91aaeb" stroke="none"/>
        <path d="m13 8 5-5 8 4-6 5z" fill="#fff" stroke="none"/>
      </svg><b>砚稿</b>
    </button>
    <nav class="nav" aria-label="主导航">${navButtons}</nav>
    <div class="topEnd"><span class="localMark">${ic('shield')}</span><span>演示</span></div>
  </header>
  <div class="contextbar"><div class="crumbs"><span class="contextIcon">${ic('projects')}</span>${context}</div>
    <div class="actions">${controls}</div>
  </div>`;
}
function intro() {
  const d = doc();
  if (ui.page === 'projects') {
    return `<div class="intro"><div class="heading"><h1>论文项目</h1><div class="subrow">共 ${db.docs.length} 篇论文</div></div></div>`;
  }
  const reviewing = ui.page === 'review';
  const phase = phaseNames[d.phase] + (d.phase === 'post' ? ' · ' + (d.decision || '大修') : '');
  const activeIssues = reviewing ? currentIssues(d) : [];
  const pending = activeIssues.filter(item => item.status !== 'done').length;
  const details = reviewing ? `
    <button type="button" class="btn reviewPhase" data-act="phase" aria-haspopup="dialog" aria-label="切换改稿阶段，当前为${esc(phase)}">
      ${esc(phase)}${ic('down')}
    </button>
    <span class="coverIssueCounts"><span>${activeIssues.length} 条修改意见</span><span class="coverDot" aria-hidden="true"></span><span>${pending} 条待跟进</span></span>
  ` : `<span>${esc(journalNames[ui.journal])}</span><span class="coverDot" aria-hidden="true"></span><span>研究论文</span>`;
  const title = `<h1>${names[ui.page]}</h1>`;
  const meta = `<div class="coverMeta"><span>${ic('layers')} 主稿 ${vtag(reviewing ? latest() : ui.version)}</span>${d.demo ? '<span>示例论文</span>' : ''}</div>`;
  return `<div class="intro manuscriptCover${d.demo ? ' campusCover' : ''}">
    <div class="coverArt" aria-hidden="true"></div>
    <div class="heading">${reviewing ? title + meta : meta + title}<div class="subrow">${details}</div></div>
  </div>`;
}


function projects(){
  const projectRows = db.docs.map(d => {
    const version = d.versions.at(-1);
    const empty = !version.parts.length;
    const excerpt = (version.parts.find(p => p.id === 'abs') || version.parts[0])?.text || '';
    const pending = currentIssues(d).filter(i => i.status !== 'done').length;
    return `<article class="project">
      <div class="projectName"><span class="projectIcon" aria-hidden="true">${ic('doc')}</span>
        <div><h3>${esc(d.projectName || d.title)}</h3>
          ${d.projectName && d.projectName !== d.title ? `<p class="manuscriptName">${esc(d.title)}</p>` : ''}
          <span class="meta">${d.demo ? '示例论文' : empty ? '待导入论文' : '已导入论文'}　·　${phaseNames[d.phase || 'pre']}${empty ? '' : `　·　主稿 ${vtag(d.versions.length-1)}　·　${pending} 条待跟进`}</span>
          <p class="projectExcerpt">${esc(excerpt)}</p>
        </div>
      </div>
      <span class="meta">最近编辑 ${new Date(d.updated).toLocaleDateString('zh-CN')}　${empty ? '' : link('选择改稿阶段','project-phase:'+d.id)}</span>
      <div class="btns">${empty ? btn('导入论文',`import:${d.id}`,'in','primary') : btn(d.phase === 'post' ? '处理期刊返修' : '处理导师批注', `open:${d.id}:review`, 'review', 'soft')}${btn('按期刊排版', `open:${d.id}:format`, 'format')}</div>
    </article>`;
  }).join('');
  return `<section class="projectWrap"><h2>我的论文</h2>${projectRows || '<div class="projectEmpty"><p>先新建一个项目，再导入带有导师批注的 Word。</p></div>'}</section>
    <div class="projectEmpty">${!db.docs.some(d=>d.demo) ? link('打开示例论文','load-demo','doc') : ''}</div>`;
}

function issueIndex(i){return String(currentIssues().indexOf(i)+1).padStart(2,'0');}
function decorate(p,format){let token='',marker='',cls='';const i=issue();if(!format&&ui.tab==='similar'&&doc().demo&&p.id==='result'){token=seedIssues[2].old;cls='markBlue';}else if(!format&&i?.part===p.id){token=i.status==='done'?(i.applied||i.suggest):i.old;marker=issueIndex(i);if(i.status==='done')cls='markDone';}
const idx=token?anchorPosition(p.text,token,i?.part===p.id ? i : {}):-1;return idx<0?esc(p.text):`${esc(p.text.slice(0,idx))}<mark class="mark ${cls}">${esc(token)}</mark>${marker?`<sup class="pin">${marker}</sup>`:''}${esc(p.text.slice(idx+token.length))}`;}

function visibleIssues() {
  return currentIssues().filter(i => ui.filter === 'all' || (ui.filter === 'done' ? i.status === 'done' : i.status !== 'done'));
}
function issueQueue() {
  const items = visibleIssues();
  const index = items.findIndex(i => i.id === ui.sel);
  const options = items.map(i => `<option value="${esc(i.id)}"${i.id === ui.sel ? ' selected' : ''}>${issueIndex(i)} · ${esc(i.title)}</option>`).join('');
  const step = (direction, icon, label, disabled) => `<button type="button" class="btn queueStep" data-act="issue-step:${direction}" aria-label="${label}" title="${label}"${disabled ? ' disabled' : ''}>${ic(icon)}</button>`;
  return `<div class="reviewQueue">
    <div class="issuePickerControls">
      ${step(-1, 'prev', '上一条意见', index < 1)}
      <select id="reviewIssue" aria-label="选择意见"${items.length ? '' : ' disabled'}>${options || '<option>当前没有这类意见</option>'}</select>
      ${step(1, 'next', '下一条意见', index < 0 || index === items.length - 1)}
    </div>
    <select id="reviewFilter" aria-label="筛选意见状态">${[['all','全部'],['open','待跟进'],['done','已处理']].map(([key, label]) => `<option value="${key}"${ui.filter === key ? ' selected' : ''}>${label}</option>`).join('')}</select>
  </div>`;
}
function outlineIsOpen() {
  return ui.outlineOpen ?? (!singlePane.matches && parts().some(chapterLevel));
}
function manuscriptField(p, field, label) {
  const value = ui.manuscriptDraft.get(p.id)?.[field] ?? p[field];
  return `<textarea class="manuscriptField" rows="1" data-draft-part="${esc(p.id)}" data-draft-field="${field}" aria-label="${esc(label)}">\n${esc(value)}</textarea>`;
}
function paperOutline(open) {
  const entries = parts().filter(chapterLevel).map(p => `<li><button type="button" data-act="chapter:${esc(p.id)}" data-depth="${Math.min(chapterLevel(p), 4)}">${esc(chapterTitle(p))}</button></li>`).join('');
  return `<nav class="paperOutline" id="reviewOutline" aria-label="论文章节目录"${open ? '' : ' hidden'}>
    <div class="outlineHeader"><strong>章节目录</strong>${actButton('收起目录','outline','collapse')}</div>
    <div class="outlineScroll">${entries ? `<ol>${entries}</ol>` : '<p class="empty">没有识别到章节标题。</p>'}</div>
  </nav>`;
}
function paperPart(p, format) {
  const level = chapterLevel(p);
  const tag = 'h' + Math.min(6, level + 2);
  const id = esc(p.id);
  const editing = !format && ui.manuscriptDraft;
  const content = editing
    ? manuscriptField(p, 'text', p.titleInText ? '章节标题 · '+chapterTitle(p) : '编辑正文 · '+p.head)
    : decorate(p, format);
  if (p.titleInText) return `<${tag} class="chapterHeading" data-chapter="${id}" data-part="${id}" id="part-${id}">${content}</${tag}>`;
  const heading = level ? `<${tag} class="chapterHeading" data-chapter="${id}" id="chapter-${id}">${editing ? manuscriptField(p,'head','章节标题 · '+p.head) : esc(p.head)}</${tag}>` : '';
  const keywords = p.id === 'abs' && doc().demo ? '<div class="keywords"><b>关键词</b>　校园绿地；自然接触；心理恢复；大学生</div>' : '';
  return `${heading}<p data-part="${id}" id="part-${id}">${content}</p>${keywords}`;
}
function paper(format=false) {
  const d = doc();
  const n = format ? ui.version : latest();
  const template = format && ui.view === 'formatted';
  const running = template ? journalNames[ui.journal]+' · 演示模板' : d.demo ? '环境心理学　/　研究论文' : '导入文稿';
  return `<article class="paper${template ? ui.journal ? ' journalB' : ' journalA' : ''}">
    <div class="running"><span>${esc(running)}</span><span>主稿 ${vtag(n)}</span></div>
    <h2>${esc(d.title)}</h2>
    <div class="byline">${d.demo ? '陈予安　　教育与心理学院' : '本地导入'}</div>
    <div class="paperContent">${parts(n).map(p => paperPart(p, format)).join('')}</div>
    <div class="paperFooter">文稿结束</div>
  </article>`;
}
function stage(format=false) {
  const open = !format && outlineIsOpen();
  const editing = !format && ui.manuscriptDraft;
  const sheet = `<div class="sheets${editing ? ' manuscriptEditing' : ''}" tabindex="0" aria-label="${editing ? '可编辑的论文正文' : '可滚动的论文预览'}">${paper(format)}</div>`;
  const controls = format
    ? `<div class="toggle">${[['original','原稿'],['formatted','期刊稿']].map(([key,label]) => `<button class="${ui.view === key ? 'on' : ''}" data-act="view:${key}">${label}</button>`).join('')}</div>`
    : editing
      ? `<span class="manuscriptDraftStatus" role="status">${editing.size ? '有未保存修改' : '正在编辑'}</span>
         ${btn('取消','manuscript-cancel')}
         <button class="btn primary" type="button" data-act="manuscript-save"${editing.size ? '' : ' disabled'}>保存正文</button>`
      : `<button class="iconbtn manuscriptAnnotate" type="button" data-act="annotate" aria-label="添加批注" title="添加批注">${ic('plus')}<span>批注</span></button>
         ${btn('编辑正文','manuscript-edit','edit')}`;
  return `<section class="stage" id="manuscriptPane" aria-label="${format ? '版式预览' : '论文正文'}">
    <div class="toolbar">
      <div class="row">
        ${format ? ic('format') : ''}
        <b>${format ? '版式预览' : '论文正文'}</b>
        ${format ? '' : `<button type="button" class="btn outlineToggle" data-act="outline" aria-expanded="${open}" aria-controls="reviewOutline">${ic('list')}<span>${open ? '收起目录' : '展开目录'}</span></button>
        ${editing ? '' : actButton(ui.focus ? '退出专注阅读' : '专注阅读','focus','expand')}`}
      </div>
      <div class="row">${controls}</div>
    </div>
    ${format ? sheet : `<div class="readingBody">${paperOutline(open)}${sheet}</div>`}
  </section>`;
}
function relinkIssue() {
  const item = issue(), passage = ui.selectedText || selectedPassage();
  const target = passage && pby(passage.part);
  if (!item || item.status === 'done') return;
  if (!target || !target.text.includes(passage.text)) {
    tell('请先在正文中选中新的原文，再关联本条意见。');
    return;
  }
  const offset = passage.offset;
  if (target.text.slice(offset,offset+passage.text.length) !== passage.text) {
    tell('选文位置已变化，请重新选择正文。');
    return;
  }
  item.part = target.id;
  item.old = passage.text;
  setAnchor(item,target.text,offset);
  item.suggest = '';
  item.status = 'open';
  delete item.basis;
  delete item.ref;
  delete item.aiModel;
  ui.selectedText = null;
  save();
  render(item.part,true);
  tell('已关联新选文，可以生成建议。');
}

function suggestion() {
  const i = issue();
  if (!i) {
    const hasIssues = currentIssues().length;
    const post = doc().phase === 'post';
    return `<div class="empty">${hasIssues ? '当前筛选下没有意见。' : post ? '请粘贴本轮期刊审稿意见，并选择对应的论文段落。' : '导入带有导师批注的 DOCX，即可在这里核对意见与原文。'}</div>`;
  }
  const proposed = i.status === 'done' ? i.applied || i.suggest : i.suggest;
  const notes = i.notes || [];
  const canGenerate = i.status !== 'done';
  const original = i.old.length > 180
    ? `<details class="reviewOriginal"><summary>展开原文对照</summary><p>${esc(i.old)}</p></details>`
    : `<div class="reviewOriginal"><span class="textlabel">原文</span><p>${esc(i.old)}</p></div>`;
  return `<article class="selectedReview">
    <div class="selectedReviewHead"><h3>${esc(i.title)}</h3>${pill(i.status)}</div>
    <div class="source"><span class="avatar" aria-hidden="true">${esc(i.author[0])}</span>${esc(i.author)}<span>·</span><span>${esc(partContext(i.part))}</span>${link('查看原文','locate:'+i.part,'pin')}</div>
    <p class="quote">${esc(i.quote)}</p>
    <section class="section" aria-label="修改建议">
      <div class="reviewSuggestionHeader">
        <h4 class="sectionTitle">${ic(i.manual ? 'edit' : 'spark')}${i.manual ? '修改草稿' : 'AI 修改建议'}${!i.manual && doc().demo && !i.aiModel ? '<span class="reviewExample">示例</span>' : ''}</h4>
      </div>
      ${proposed ? `<div class="diff">
        <span class="textlabel">${i.status === 'done' ? '已采纳' : '建议稿'}</span><p class="proposedText">${esc(proposed)}</p>
        ${original}
      </div>` : `<p class="smalltext">填写修改稿后，可对照原文并保存新版本。</p>${original}`}
      ${canGenerate ? `<div class="aiControls">
        ${link('关联当前选文','relink-issue','pin')}
      </div>` : ''}
      ${i.basis ? `<div class="basis">${ic('book')}<div>${esc(i.basis)} ${i.ref ? link('查看依据','locate:'+i.ref) : ''}</div></div>` : ''}
    </section>
    <section class="section" aria-label="二次批注"><h4 class="sectionTitle">${ic('message')}二次批注${notes.length ? ' · '+notes.length : ''}</h4>
      ${notes.map(n => `<div class="noteItem">${n.anchor ? `<em>选文 · ${esc(n.anchor)}</em>` : ''}${esc(n.text)}</div>`).join('')}
      ${link('追加批注','follow','plus')} ${notes.length ? link('修订这条建议','redraft','edit') : ''}
    </section>
  </article>`;
}
function inspector() {
  const i = issue();
  const post = doc().phase === 'post';
  const all = currentIssues();
  const done = all.filter(item => item.status === 'done').length;
  const reviewing = ui.tab === 'suggest';
  const action = reviewing
    ? !i ? '' : i.status === 'done' ? btn('撤销采纳','undo','undo')
      : !i.suggest ? btn('填写修改稿','edit','edit','primary')
      : btn('采纳修改','accept','check','primary')+btn('编辑建议','edit','edit')
    : btn(doc().checkedVersion === latest() ? '重新核对' : '标记已复核','reviewed','check','primary');
  return `<aside class="inspector reviewInspector" id="reviewInspector" aria-labelledby="reviewInspectorTitle">
    <div class="panelhead">
      ${ic('message')}<h2 id="reviewInspectorTitle">${post ? '审稿意见' : '导师批注'}</h2>
      <span class="reviewProgress">${done} / ${all.length} 已处理</span>
      ${post ? btn('粘贴意见','letter','plus','sm') : btn('导入批注','import','in','sm')}
    </div>
    <div class="tabs" role="group" aria-label="审阅面板">
      <button type="button" class="${reviewing ? 'activeTab' : ''}" data-act="tab:suggest" aria-pressed="${reviewing}">意见详情</button>
      <button type="button" class="${reviewing ? '' : 'activeTab'}" data-act="tab:similar" aria-pressed="${!reviewing}">相似复核</button>
    </div>
    ${reviewing ? issueQueue() : ''}
    <div class="inspectBody" tabindex="0" role="region" aria-label="${reviewing ? '当前意见和修改建议' : '相似复核结果'}">${reviewing ? suggestion() : similar()}</div>
    ${action ? `<div class="actionDock">${action}</div>` : ''}
  </aside>`;
}
function similar(){const d=doc(),matches=repeatedSentences();return `<div class="sectionTitle">${ic('scan')}相似片段复核</div><p class="smalltext">当前主稿 ${vtag(latest())} · 稿内完整句匹配（至少 10 字）</p>${matches.length?`<div class="section"><span class="pill hold">发现 ${matches.length} 组重复</span>${matches.slice(0,20).map(([txt,ids])=>`<p class="quote">${esc(txt)}</p>${[...new Set(ids)].map(id=>link('定位'+(pby(id)?.head||'段落'),'locate:'+id,'pin')).join('　')}`).join('')}${matches.length>20?'<p class="hint">显示前 20 组。</p>':''}</div>`:'<p class="quote">当前版本未找到符合条件的稿内重复句。</p>'}<div class="section"><div class="sectionTitle">外部报告片段</div>${d.report?`<p class="quote">${esc(d.report.text)}</p><div class="smalltext">来源 · ${esc(d.report.source)}<br>记录于 ${vtag(d.report.version)}${d.report.version!==latest()?' · 待复核':''}</div>${link('定位匹配原文','find-report','pin')}`:'<p class="smalltext">可从已有查重报告粘贴标红原文和来源。</p>'}${link(d.report?'编辑报告片段':'添加报告片段','report','plus')}</div><div class="section smalltext">${d.checkedVersion===latest()?'此版本已复核。':'确认相似段的上下文及引用后，可标记此版本已复核。'}</div>`;}
function journalInspector(){const d=doc(),j=journals[ui.journal],p=pby('abs',ui.version),len=p?count(p.text):0;return `<aside class="inspector"><div class="panelhead">${ic('layers')}<h2>目标期刊与检查</h2></div><div class="inspectBody"><label class="controlGroup">主稿版本<select id="version">${d.versions.map((_,i)=>`<option value="${i}" ${i===ui.version?'selected':''}>${vtag(i)}${i===latest()?' · 当前':''}</option>`).join('')}</select></label><label class="controlGroup">目标期刊<select id="journal">${journalNames.map((x,i)=>`<option value="${i}" ${ui.journal===i?'selected':''}>${x} · 演示模板</option>`).join('')}</select></label><p class="smalltext">研究论文　·　初投稿　·　模板 v1.0</p><details><summary>查看模板依据</summary>原型内置演示规则。正文为${j.font}${j.size}磅，摘要上限${j.limit}字。请以实际期刊指南为准。</details><div class="section"><div class="sectionTitle">格式检查</div><div class="checkrow">${ic('check')}<p>正文与标题样式<small>${j.font} ${j.size} 磅，已套用目标期刊行距</small></p></div><div class="checkrow ${!p||len>j.limit?'warn':''}">${ic(!p||len>j.limit?'warn':'check')}<p>摘要长度<small>${p?`${len} / ${j.limit} 字`:'未识别摘要，请核查'}</small>${p&&len>j.limit?(ui.version===latest()?link('处理摘要超长','shorten','edit'):link('切换当前主稿处理','latest-format')):''}</p></div><div class="checkrow warn">${ic('warn')}<p>匿名审稿信息<small>导出前请人工确认作者署名要求。</small></p></div></div></div><div class="actionDock">${btn('导出期刊副本','export','out','primary')}</div></aside>`;}

const reviewWidthKey = 'yangao-review-paper-share';
const defaultPaperShare = 0.6;
let paperShare = defaultPaperShare;
try {
  const saved = Number(localStorage.getItem(reviewWidthKey));
  if (saved > 0 && saved < 1) paperShare = saved;
} catch {
  // The adjustment can still be used when browser storage is unavailable.
}

function reviewSplitLimits(divider) {
  const width = divider.parentElement.clientWidth - divider.offsetWidth;
  const max = width - Math.min(320, width / 2);
  return { width, min: Math.min(400, max), max };
}

function applyReviewSplit(divider, { width, min, max } = reviewSplitLimits(divider), desiredWidth = width * paperShare) {
  if (width <= 0) return;
  const paperWidth = Math.max(min, Math.min(max, desiredWidth));
  const share = Math.round(paperWidth / width * 100);
  divider.parentElement.style.setProperty('--review-paper-width', paperWidth + 'px');
  divider.setAttribute('aria-valuemin', Math.round(min / width * 100));
  divider.setAttribute('aria-valuemax', Math.round(max / width * 100));
  divider.setAttribute('aria-valuenow', share);
  divider.setAttribute('aria-valuetext', `正文 ${share}%，意见 ${100-share}%`);
  return paperWidth;
}

function saveReviewSplit() {
  try { localStorage.setItem(reviewWidthKey, String(paperShare)); } catch {}
  if (ui.manuscriptDraft) sizeManuscriptFields(document.querySelectorAll('.manuscriptField'));
  updateOutline();
}

function changeReviewSplit(divider, width, limits = reviewSplitLimits(divider)) {
  if (limits.width > 0) paperShare = applyReviewSplit(divider,limits,width) / limits.width;
}

const workspaceSurface = $('#app');
let reviewDrag = null;
workspaceSurface.addEventListener('pointerdown', event => {
  const divider = event.target.closest('.reviewDivider');
  if (!divider || event.button !== 0 || !event.isPrimary) return;
  event.preventDefault();
  divider.focus({preventScroll:true});
  reviewDrag = {
    id: event.pointerId,
    origin: event.clientX,
    width: divider.previousElementSibling.getBoundingClientRect().width,
    limits: reviewSplitLimits(divider)
  };
});
workspaceSurface.addEventListener('pointermove', event => {
  const divider = $('#reviewDivider');
  if (!divider || reviewDrag?.id !== event.pointerId) return;
  if (!(event.buttons & 1)) {
    finishReviewDrag(event);
    return;
  }
  const distance = event.clientX - reviewDrag.origin;
  if (!workspaceSurface.hasPointerCapture(event.pointerId)) {
    if (!distance) return;
    workspaceSurface.setPointerCapture(event.pointerId);
    workspaceSurface.classList.add('reviewResizing');
  }
  changeReviewSplit(divider,reviewDrag.width+distance,reviewDrag.limits);
});
function finishReviewDrag(event) {
  if (reviewDrag?.id !== event.pointerId) return;
  if (event.type === 'lostpointercapture' && event.target !== workspaceSurface) return;
  reviewDrag = null;
  workspaceSurface.classList.remove('reviewResizing');
  saveReviewSplit();
}
for (const type of ['pointerup','pointercancel','lostpointercapture']) {
  workspaceSurface.addEventListener(type, finishReviewDrag);
}
workspaceSurface.addEventListener('dblclick', event => {
  const divider = event.target.closest('.reviewDivider');
  if (!divider) return;
  paperShare = defaultPaperShare;
  applyReviewSplit(divider);
  saveReviewSplit();
});
workspaceSurface.addEventListener('keydown', event => {
  const divider = event.target.closest('.reviewDivider');
  if (!divider || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const limits = reviewSplitLimits(divider);
  const currentWidth = divider.previousElementSibling.getBoundingClientRect().width;
  const step = event.shiftKey ? 64 : 24;
  const targetWidth = {
    ArrowLeft: currentWidth-step, ArrowRight: currentWidth+step, Home: limits.min, End: limits.max
  }[event.key];
  changeReviewSplit(divider,targetWidth,limits);
  saveReviewSplit();
});

function reviewWorkspace() {
  const reviewing = ui.reviewPane === 'issue';
  const divider = ui.focus || singlePane.matches ? '' : `<div class="reviewDivider" id="reviewDivider" role="separator" tabindex="0" aria-orientation="vertical" aria-controls="manuscriptPane reviewInspector" aria-label="调整论文正文和意见面板宽度" title="左右拖动调整宽度，双击恢复默认"></div>`;
  return `${ui.back ? `<div class="recover">${ic('format')}正在处理期刊格式检查项 ${link('返回期刊预览','return-format')}</div>` : ''}
    <div class="reviewPaneSwitch" role="group" aria-label="改稿视图"${ui.focus ? ' hidden' : ''}>
      <button type="button" data-act="pane:paper" aria-controls="manuscriptPane" aria-pressed="${!reviewing}">${ic('doc')}正文</button>
      <button type="button" data-act="pane:issue" aria-controls="reviewInspector" aria-pressed="${reviewing}">${ic('message')}意见${issue() ? ' '+issueIndex(issue()) : ''}</button>
    </div>
    <div class="workspace reviewWorkspace${ui.focus ? ' readMode' : ''}" data-pane="${ui.reviewPane}">${stage()}${divider}${inspector()}</div>`;
}
const reviewToolbarObserver = new ResizeObserver(([entry]) => {
  const toolbar = entry?.target;
  if (toolbar?.isConnected) setReviewToolbarHeight(toolbar);
});

function setReviewToolbarHeight(toolbar) {
  toolbar.closest('.review').style.setProperty('--review-toolbar-height', toolbar.offsetHeight + 'px');
}

function syncReviewViewport() {
  const workspace = $('.review .reviewWorkspace');
  if (!workspace?.clientWidth || singlePane.matches) return;
  const top = Math.max(12,Math.ceil(workspace.getBoundingClientRect().top))+'px';
  if (workspace.style.getPropertyValue('--review-viewport-top') !== top) {
    workspace.style.setProperty('--review-viewport-top',top);
  }
}

function render(scrollTo, keep=false, keepDetails=keep) {
  const motionFrame = window.StudioMotion?.capture();
  const reviewScroll = ui.page === 'review' && !singlePane.matches && $('#main.review') ? window.scrollY : null;
  const saveScroll = (key, selector, preserve) => {
    const element = $(selector);
    if (!preserve) ui.scroll[key] = 0;
    else if (element?.clientHeight) ui.scroll[key] = element.scrollTop;
  };
  saveScroll('paper','.sheets',keep);
  saveScroll('outline','.outlineScroll',keep);
  saveScroll('details','.inspectBody',keepDetails);
  const d = doc(), isFormat = ui.page === 'format';
  const work = ui.page === 'projects' ? projects()
    : isFormat ? `<div class="workspace journalGrid">${stage(true)}${journalInspector()}</div>`
    : reviewWorkspace();
  const footer = `<div class="workspaceFoot"><span>${ic('shield')}<span class="saveState" aria-live="polite"></span></span><span>${count(parts(isFormat?ui.version:latest()).map(p=>p.text).join(''))} 字　·　${d?.demo?'示例数据':d?.versions.at(-1)?.parts.length?'导入文本':''}</span></div>`;
  document.title = `${names[ui.page]} · 砚稿`;
  $('#app').innerHTML = header()+`<main id="main" tabindex="-1" class="${ui.page}">${intro()}${work}${footer}</main>`;
  updateSaveStatus();
  const divider = $('#reviewDivider');
  if (divider) applyReviewSplit(divider);
  if (ui.manuscriptDraft) sizeManuscriptFields(document.querySelectorAll('.manuscriptField'));
  reviewToolbarObserver.disconnect();
  const reviewToolbar = $('.reviewWorkspace .toolbar');
  if (reviewToolbar && !singlePane.matches) {
    setReviewToolbarHeight(reviewToolbar);
    reviewToolbarObserver.observe(reviewToolbar);
  }
  const sheet = $('.sheets'), outline = $('.outlineScroll'), details = $('.inspectBody');
  if (sheet) sheet.scrollTop = ui.scroll.paper || 0;
  if (outline) outline.scrollTop = ui.scroll.outline || 0;
  if (details) details.scrollTop = ui.scroll.details || 0;
  if (reviewScroll !== null) window.scrollTo(0,reviewScroll);
  if (scrollTo) locate(scrollTo);
  syncReviewViewport();
  window.StudioMotion?.finish(motionFrame);
  if (ui.page === 'review') updateOutline();
}
function sizeManuscriptFields(elements) {
  const fields = [...elements].filter(el => el.getClientRects().length);
  for (const field of fields) field.style.height = 'auto';
  const heights = fields.map(field => field.scrollHeight);
  fields.forEach((field, index) => { field.style.height = heights[index]+'px'; });
}
function startManuscriptEdit() {
  ui.manuscriptDraft = new Map();
  ui.selectedText = null;
  render(null,true);
  const sheet = $('.manuscriptEditing');
  const top = reviewReadingTop(sheet);
  const fields = [...sheet.querySelectorAll('.manuscriptField[data-draft-field="text"]')];
  fields.find(field => field.getBoundingClientRect().bottom > top + 12)?.focus({preventScroll:!singlePane.matches});
}
function updateManuscriptDraft(field) {
  const {draftPart, draftField} = field.dataset;
  const draft = ui.manuscriptDraft;
  const original = pby(draftPart);
  const patch = draft.get(draftPart) || {};
  if (field.value === original[draftField]) delete patch[draftField];
  else patch[draftField] = field.value;
  if (Object.keys(patch).length) draft.set(draftPart,patch);
  else draft.delete(draftPart);
  const status = $('.manuscriptDraftStatus');
  const message = draft.size ? '有未保存修改' : '正在编辑';
  if (status.textContent !== message) status.textContent = message;
  $('[data-act="manuscript-save"]').disabled = !draft.size;
  sizeManuscriptFields([field]);
}
function finishManuscriptEdit(keepChanges) {
  const draft = ui.manuscriptDraft;
  if (!draft || (keepChanges && !draft.size)) return;
  if (keepChanges) {
    const blank = [...document.querySelectorAll('.chapterHeading .manuscriptField')].find(field => !field.value.trim());
    if (blank) {
      tell('请填写章节标题后再保存。');
      blank.focus();
      return;
    }
    const next = parts().map(p => {
      const patch = draft.get(p.id);
      if (!patch) return p;
      return {...p, outlineLevel:chapterLevel(p), ...patch};
    });
    snapshot(next,'手动编辑正文');
    save();
  }
  ui.manuscriptDraft = null;
  render(null,true);
  $('[data-act="manuscript-edit"]')?.focus({preventScroll:true});
  if (keepChanges) saveQueue.then(ok => { if(ok) tell(`正文已保存为主稿 ${vtag(latest())}`); });
}
function reviewReadingTop(sheet) {
  const top = sheet.getBoundingClientRect().top;
  if (singlePane.matches) return top;
  return Math.max(top, $('.reviewWorkspace .toolbar').getBoundingClientRect().bottom);
}

function toggleOutline() {
  const outline = $('#reviewOutline');
  const button = $('.outlineToggle');
  const sheet = $('.review .sheets');
  const opening = outline.hidden;
  const returnFocus = outline.contains(document.activeElement);
  const top = reviewReadingTop(sheet);
  // Preserve the reading position when the desktop column rewraps.
  const anchor = !singlePane.matches && window.scrollY > 0
    ? [...sheet.querySelectorAll('.paperContent > [data-chapter], .paperContent > [data-part]')].find(el => el.getBoundingClientRect().bottom > top+8)
    : null;
  const old = anchor?.getBoundingClientRect();
  const progress = old?.height ? Math.max(0,(top-old.top)/old.height) : 0;
  ui.outlineOpen = opening;
  outline.hidden = !opening;
  button.setAttribute('aria-expanded',opening);
  button.querySelector('span').textContent = opening ? '收起目录' : '展开目录';
  if (ui.manuscriptDraft) sizeManuscriptFields(sheet.querySelectorAll('.manuscriptField'));
  if (old) {
    const next = anchor.getBoundingClientRect();
    window.scrollBy(0,next.top+next.height*progress-Math.max(old.top,top));
  }
  if (returnFocus) button.focus({preventScroll:true});
  syncReviewViewport();
  updateOutline();
  window.StudioMotion?.transitionOutline(outline,button);
}

function updateOutline(preferred) {
  const nav = $('#reviewOutline');
  const sheet = $('.review .sheets');
  if (!nav || nav.hidden || !sheet?.clientHeight) return;
  const headings = sheet.querySelectorAll('[data-chapter]');
  const top = reviewReadingTop(sheet);
  let active;
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > top + 76) break;
    active = heading.dataset.chapter;
  }
  const previous = nav.querySelector('[aria-current]');
  const current = preferred || active || headings[0]?.dataset.chapter;
  const next = current ? nav.querySelector(`[data-act="chapter:${CSS.escape(current)}"]`) : null;
  if (previous === next) return;
  previous?.removeAttribute('aria-current');
  if (!next) return;
  next.setAttribute('aria-current', 'location');
  const rail = nav.querySelector('.outlineScroll');
  const view = rail.getBoundingClientRect(), item = next.getBoundingClientRect();
  if (item.top < view.top) rail.scrollTop -= view.top - item.top + 6;
  else if (item.bottom > view.bottom) rail.scrollTop += item.bottom - view.bottom + 6;
}
function locate(part, chapter=false) {
  const paragraph = document.getElementById('part-'+part);
  const target = (chapter && document.getElementById('chapter-'+part)) || paragraph;
  const sheet = $('.sheets');
  if (!target || !sheet?.clientHeight) return;
  const anchor = !chapter && target.querySelector('.mark') || target;
  const bounds = anchor.getClientRects()[0] || anchor.getBoundingClientRect();
  if (ui.page === 'review' && !singlePane.matches) {
    if (chapter || bounds.top < reviewReadingTop(sheet) + 8 || bounds.bottom > window.innerHeight - 24) {
      const toolbar = $('.reviewWorkspace .toolbar');
      const stickyTop = parseFloat(getComputedStyle(toolbar).top) || 0;
      window.scrollBy(0,bounds.top - stickyTop - toolbar.offsetHeight - 24);
    }
  } else {
    sheet.scrollTop += bounds.top - sheet.getBoundingClientRect().top - 58;
  }
  if (chapter) {
    target.tabIndex = -1;
    target.focus({preventScroll:true});
  } else if (paragraph) {
    window.StudioMotion?.locate(paragraph);
  }
}
function showOriginal(part) {
  const wasHidden = ui.reviewPane === 'issue' && singlePane.matches;
  ui.reviewPane = 'paper';
  if (wasHidden) {
    render(part, true);
    $('.review .sheets')?.focus({preventScroll:true});
  } else locate(part);
}
function modal(title,body){$('#dialogContent').innerHTML=`<div class="dialogHead"><h2 id="dialogTitle">${esc(title)}</h2>${actButton('关闭','close','x')}</div><div class="dialogBody">${body}</div>`;const dlg=$('#dialog');dlg.setAttribute('aria-labelledby','dialogTitle');if(!dlg.open)dlg.showModal();}
const close=()=>$('#dialog').close();
function selectIssue(id){ui.sel=id;ui.tab='suggest';ui.selectedText=null;render(issue()?.part,true,false);}
function accept(text){const i=issue();if(!i||i.status==='done')return;const proposed=(text??i.suggest).trim();if(!proposed){tell('请输入修改后的内容。');return;}if(!changeText(i,i.old,proposed,i.title)){tell('选段已变动，请在当前正文重新选段并创建批注。');return;}i.status='done';if(ui.filter==='open')ui.filter='all';i.applied=proposed;i.suggest=proposed;save();if($('#dialog').open)close();render(i.part);tell(`修改已采纳，已保存主稿 ${vtag(latest())}`);}
function recoverIssue(){const i=issue();if(i?.status!=='done')return;if(!changeText(i,i.applied||i.suggest,i.old,'撤销 · '+i.title)){tell('这段文字已有后续修改，请先核对最新正文。');return;}i.status='open';if(ui.filter==='done')ui.filter='all';save();render(i.part);tell('已撤销这次采纳。');}


function editModal() {
  const i = issue();
  if (!i) return;
  const original = i.old.length > 180
    ? `<details><summary>展开原文</summary><p class="quote">${esc(i.old)}</p></details>`
    : `<p class="smalltext">原文</p><p class="quote">${esc(i.old)}</p>`;
  modal('编辑修改建议', `${original}<label for="edited">修改后的内容</label>
    <textarea id="edited" rows="5">${esc(i.suggest||i.old)}</textarea>
    <div class="btns">${btn(i.status==='defer'?'恢复待处理':'暂缓处理','defer')}${btn('确认并采纳','apply-edit','check','primary')}</div>`);
}
function selectedPassage(){const s=window.getSelection();if(!s?.rangeCount||s.isCollapsed)return null;const r=s.getRangeAt(0),el=r.commonAncestorContainer.nodeType===1?r.commonAncestorContainer:r.commonAncestorContainer.parentElement;const parent=el.closest?.('[data-part]');const text=s.toString().trim();if(parent&&text&&pby(parent.dataset.part)?.text.includes(text)){
    const before = document.createRange();
    before.selectNodeContents(parent);
    before.setEnd(r.startContainer,r.startOffset);
    const copy = before.cloneContents();
    copy.querySelectorAll('.pin').forEach(element=>element.remove());
    const offset = copy.textContent.length + (s.toString().length - s.toString().trimStart().length);
    return {part:parent.dataset.part,text,offset};
  }return null;}
function noteModal(follow=false){const i=issue();const sel=ui.selectedText;const p=sel?pby(sel.part):pby(i?.part)||parts()[0];if(!p)return;const anchor=sel?.text||((follow&&i)?(i.status==='done'?i.applied||i.suggest:i.suggest||i.old):p.text);modal(follow?'追加二次批注':'添加正文批注',`<p class="smalltext">${follow?'关联意见 '+issueIndex(i):'关联段落 · '+esc(p.head)}</p><p class="quote">${esc(anchor)}</p><label for="note">批注内容</label><textarea id="note" placeholder="写下需要修改或进一步核对的内容"></textarea><div class="btns">${btn('取消','close')}${btn('保存批注',follow?'save-follow':'save-note','check','primary')}</div>`);$('#note').dataset.part=p.id;$('#note').dataset.anchor=anchor;}
function saveNote(follow){const f=$('#note'),t=f.value.trim();if(!t){f.focus();return;}if(follow){issue().notes.push({text:t,anchor:f.dataset.anchor});}else{const i={id:uid(),part:f.dataset.part,title:t.slice(0,24),author:'我',quote:t,old:f.dataset.anchor,suggest:'',manual:true,status:'open',notes:[]};i.stage=doc().phase||'pre';doc().issues.push(i);ui.sel=i.id;ui.filter='all';ui.tab='suggest';}ui.selectedText=null;save();close();render(issue()?.part);tell('批注已保存。');}
function startShorten(){const p=pby('abs');if(!p)return;let i=currentIssues().find(x=>x.kind==='short'&&x.old===p.text&&x.status!=='done');if(!i){const brief=doc().demo?`本研究${p.text.includes('248')?'基于248份有效问卷':'采用问卷调查法'}考察校园绿地接触与大学生心理恢复的关系。结果显示，绿地接触频率较高与较好的自评心理恢复水平相关。`:'';i={id:uid(),part:p.id,kind:'short',title:'压缩摘要至期刊字数上限',author:'格式检查',quote:`${journalNames[ui.journal]}的演示模板要求摘要不超过${journals[ui.journal].limit}字。`,old:p.text,suggest:brief,basis:'依据当前版本的摘要保留研究方法和主要发现。',manual:!brief,status:'open',notes:[]};i.stage=doc().phase||'pre';doc().issues.push(i);}ui.back=true;ui.page='review';ui.focus=false;ui.reviewPane='issue';ui.filter='all';save();selectIssue(i.id);}
function historyModal(){const d=doc();modal('版本记录',`<p class="smalltext">主稿版本</p>${d.versions.map((v,k)=>`<div class="hist"><b>${vtag(k)}</b><span>${esc(v.label)}</span>${link('预览排版','version:'+k)}</div>`).reverse().join('')}${d.exports.length?`<div class="sectionTitle section">已导出的副本</div>${d.exports.map((e,k)=>`<div class="hist"><span>${esc(e.name)}</span>${link('再次下载','redownload:'+k)}</div>`).reverse().join('')}`:''}`);}
function exportModal(){const fmt=ui.page==='format',n=fmt?ui.version:latest(),d=doc();modal(fmt?'导出期刊副本':'导出文稿',`<p><b>${esc(d.title)}</b></p><p class="smalltext">主稿 ${vtag(n)}${fmt?'　·　'+esc(journalNames[ui.journal])+'（演示模板）':''}</p>${fmt?`<p class="quote">导出前请核对作者署名${pby('abs',n)&&count(pby('abs',n).text)>journals[ui.journal].limit?'及超出字数的摘要':''}。该副本使用演示格式。</p>`:`<label class="controlGroup">文稿类型<select id="exportType"><option value="review">审阅稿 · Word 修订与批注</option><option value="clean">清稿 · 已确认的正文</option></select></label>`}<p class="hint">导出当前原型中的标题与文本段落。导入的图片、公式及复杂排版保留在原文件中。</p><div class="btns">${btn('取消','close')}${btn('下载 DOCX','download','out','primary')}</div>`);}
const W='http://schemas.openxmlformats.org/wordprocessingml/2006/main',relsNS='http://schemas.openxmlformats.org/package/2006/relationships',odRel='http://schemas.openxmlformats.org/officeDocument/2006/relationships/';
function makeWord(d,n,mode,jid,items,baseVersion=0){const zip=new JSZip(),j=journals[jid||0],fmt=mode==='format',review=mode==='review',used=[];let track=0;
const r=(t,sz=fmt?j.size*2:24,bold=false,deleted=false)=>{
  const tag=deleted?'delText':'t';
  const text=String(t??'').split(/(\r?\n|\t)/).map(piece=>{
    if(piece==='\t')return '<w:tab/>';
    if(piece.endsWith('\n'))return '<w:br/>';
    return `<w:${tag} xml:space="preserve">${esc(piece)}</w:${tag}>`;
  }).join('');
  return `<w:r><w:rPr><w:rFonts w:eastAsia="${fmt?j.font:'宋体'}" w:ascii="Times New Roman"/>${bold?'<w:b/>':''}<w:sz w:val="${sz}"/></w:rPr>${text}</w:r>`;
};
const p=(content,align='left',level=0)=>`<w:p><w:pPr><w:jc w:val="${align}"/><w:spacing w:line="${fmt?j.spacing:360}" w:lineRule="auto" w:after="100"/>${level?`<w:outlineLvl w:val="${Math.min(level-1,8)}"/>`:''}</w:pPr>${content}</w:p>`;
let body=p(r(d.title,fmt&&jid?30:34,true),fmt&&jid?'left':'center');if(d.demo)body+=p(r('陈予安　　教育与心理学院',22),'center');
for(const part of d.versions[n].parts){const base=d.versions[baseVersion].parts.find(x=>x.id===part.id)?.text;const ii=review?items.filter(i=>i.part===part.id&&(i.status!=='done'||i.notes?.length)):[];const level=chapterLevel(part);if(level&&!part.titleInText)body+=p(r(part.head,26,true),'left',level);const range=ii.map(i=>{const id=used.length;used.push(i);return id;});const changed=review&&base&&base!==part.text;body+=p(range.map(id=>`<w:commentRangeStart w:id="${id}"/>`).join('')+(changed?`<w:del w:id="${++track}" w:author="砚稿">${r(base,24,false,true)}</w:del><w:ins w:id="${++track}" w:author="砚稿">${r(part.text)}</w:ins>`:r(part.text,part.titleInText?26:undefined,part.titleInText))+range.reverse().map(id=>`<w:commentRangeEnd w:id="${id}"/><w:r><w:commentReference w:id="${id}"/></w:r>`).join(''),'left',part.titleInText?level:0);if(part.id==='abs'&&d.demo)body+=p(r('关键词　校园绿地；自然接触；心理恢复；大学生',22));}
const margin=fmt?j.margin:1440;
zip.file('word/document.xml',`<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="${W}"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="${margin}" w:bottom="${margin}" w:left="${margin}" w:right="${margin}"/></w:sectPr></w:body></w:document>`);
zip.file('_rels/.rels',`<Relationships xmlns="${relsNS}"><Relationship Id="rId1" Type="${odRel}officeDocument" Target="word/document.xml"/></Relationships>`);
if(used.length){zip.file('word/comments.xml',`<w:comments xmlns:w="${W}">${used.map((i,k)=>`<w:comment w:id="${k}" w:author="${esc(i.author)}">${p(r(i.quote))}${i.notes.map(n=>p(r('二次批注 · '+n.text))).join('')}</w:comment>`).join('')}</w:comments>`);zip.file('word/_rels/document.xml.rels',`<Relationships xmlns="${relsNS}"><Relationship Id="rId2" Type="${odRel}comments" Target="comments.xml"/></Relationships>`);}
zip.file('[Content_Types].xml',`<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>${used.length?'<Override PartName="/word/comments.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml"/>':''}</Types>`);
return zip.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});}
async function download(existing){const d=doc();let e=existing;if(!e){const fmt=ui.page==='format',mode=fmt?'format':$('#exportType').value,n=fmt?ui.version:latest();e={mode,n,jid:ui.journal,items:copy(currentIssues(d)),base:d.phase==='post'?(d.reviewBase||0):0,name:`${d.title}_${fmt?journalNames[ui.journal]:mode==='review'?'审阅稿':'清稿'}_${vtag(n)}.docx`};}
const blob=await makeWord(d,e.n,e.mode,e.jid,e.items,e.base),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=e.name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);if(!existing){d.exports.push(e);save();}close();tell('已生成 Word 文件。');}
function importModal(project = null) {
  importTarget = project?.id || null;
  const message = project ? `<p class="smalltext">导入至「${esc(project.projectName || project.title)}」</p>` : '';
  modal('导入论文',`${message}<label for="importPhase">导入用途</label>
    <select id="importPhase"><option value="pre">投稿前 · 读取导师 Word 批注</option><option value="post">投稿后 · 导入正文，再粘贴期刊意见</option></select>
    <div id="importDecisionRow" hidden><label for="importDecision">期刊决定</label><select id="importDecision"><option>大修</option><option>小修</option></select></div>
    <button class="fileChoice" data-act="pick">${ic('in')}<b>选择本地文件</b><small>DOCX、TXT · 最大 8 MB</small></button>
    <p class="hint" id="fileMsg" role="status"></p>`);
  if (project?.phase === 'post') {
    $('#importPhase').value = 'post';
    $('#importDecisionRow').hidden = false;
    $('#importDecision').value = project.decision || '大修';
  }
}

const wordNamespace = el => el?.ownerDocument?.documentElement?.namespaceURI || el?.documentElement?.namespaceURI || W;
const dw = (el,tag) => Array.from(el?.getElementsByTagNameNS(wordNamespace(el),tag) || []);
const wa = (el,attr) => el?.getAttributeNS(wordNamespace(el),attr);
function outlineValue(el) {
  const value = wa(dw(el,'outlineLvl')[0],'val');
  if (value != null && value !== '') return Number(value) < 9 ? Number(value)+1 : 0;
}
function headingStyleLevel(name) {
  return Number(name?.match(/^(?:heading|标题)[\s_-]*([1-9])$/i)?.[1]) || undefined;
}
async function readDocx(file) {
  const zip = await JSZip.loadAsync(file);
  const entry = zip.file('word/document.xml'), cm = zip.file('word/comments.xml'), styles = zip.file('word/styles.xml');
  if (!entry) throw Error('缺少 Word 正文，请选择有效的 DOCX。');
  if ([entry,cm,styles].some(e => e?._data?.uncompressedSize > 12e6)) throw Error('正文过大，请使用较短的稿件。');
  const readXml = async file => {
    if (!file) return null;
    const xml = new DOMParser().parseFromString(await file.async('string'),'application/xml');
    if (xml.getElementsByTagName('parsererror').length) throw Error('文稿 XML 无法解析。');
    return xml;
  };
  const [xml, comments, styleXml] = await Promise.all([readXml(entry), readXml(cm), readXml(styles)]);
  const levels = new Map(dw(styleXml,'style').map(style => [
    wa(style,'styleId'), outlineValue(dw(style,'pPr')[0]) ?? headingStyleLevel(wa(dw(style,'name')[0],'val'))
  ]));
  const cmMap = new Map(dw(comments,'comment').map(c => [wa(c,'id'), {
    author: wa(c,'author') || '批注者',
    quote: dw(c,'p').map(p => dw(p,'t').map(t => t.textContent).join('')).join('\n')
  }]));
  const openRanges = new Set();
  const paragraphs = dw(xml,'p').map(p => {
    let text = '';
    const refs = new Set(openRanges), starts = new Map([...openRanges].map(id=>[id,0])), selected = new Map();
    for (const node of dw(p,'*')) {
      const id = wa(node,'id');
      if (node.localName === 'commentRangeStart') { refs.add(id); starts.set(id,text.length); openRanges.add(id); }
      if (node.localName === 't') text += node.textContent;
      if (node.localName === 'br') text += '\n';
      if (node.localName === 'tab') text += '\t';
      if (node.localName === 'commentRangeEnd') {
        openRanges.delete(id);
        if (starts.has(id)) selected.set(id,text.slice(starts.get(id)));
      }
      if (node.localName === 'commentReference') refs.add(id);
    }
    for (const [id,start] of starts) if (!selected.has(id)) selected.set(id,text.slice(start));
    const pPr = dw(p,'pPr')[0], style = wa(dw(pPr,'pStyle')[0],'val');
    const level = outlineValue(pPr) ?? levels.get(style) ?? headingStyleLevel(style)
      ?? (text.length < 60 ? inferredHeadingLevel(text) : 0);
    return {text, refs, starts, selected, level};
  }).filter(p => p.text.trim());
  if (!paragraphs.length) throw Error('文档没有可读取的文字，请选择含正文的稿件。');
  const first = paragraphs[0];
  const title = paragraphs.length > 1 && first.text.length < 85 && !first.refs.size && !first.level
    ? paragraphs.shift().text : file.name.replace(/\.docx$/i,'');
  const pp = [], ii = [], seen = new Set();
  let pending;
  function append(item, heading, titleInText=false) {
    const head = heading?.text || `段落 ${pp.length+1}`;
    const id = /摘要/.test(head) && !pp.some(p => p.id === 'abs') ? 'abs' : uid();
    pp.push({id,head,text:item.text,outlineLevel:heading?.level || 0,titleInText});
    for (const key of item.refs) {
      const c = cmMap.get(key);
      if (!c || seen.has(key)) continue;
      seen.add(key);
      const selection = item.selected.get(key);
      const extracted = {...c,stage:'pre',id:uid(),part:id,title:c.quote.slice(0,24)||'Word 批注',old:selection||item.text,suggest:'',status:'open',manual:true};
      setAnchor(extracted,item.text,selection ? item.starts.get(key) : 0);
      ii.push(extracted);
    }
  }
  for (const item of paragraphs) {
    if (!item.level) {
      append(item,pending);
      pending = null;
    } else {
      if (pending) append(pending,pending,true);
      pending = item.refs.size ? null : item;
      if (!pending) append(item,item,true);
    }
  }
  if (pending) append(pending,pending,true);
  return makeDoc(title,pp,ii);
}
async function importFile(file) {
  if (!file) return;
  const owner = workspaceReady;
  const target = db.docs.find(d => d.id === importTarget);
  const phase = $('#importPhase')?.value || 'pre';
  const decision = $('#importDecision')?.value;
  const message = $('#fileMsg');
  const picker = $('[data-act="pick"]');
  if (!message || !owner) return;
  picker.disabled = true;
  message.textContent = '正在读取正文与 Word 批注…';
  try {
    if (file.size > 8*1024*1024) throw Error('文件超过 8 MB，请选择较短的稿件。');
    let imported;
    if (/\.txt$/i.test(file.name)) {
      const content = (await file.text()).trim();
      if (!content) throw Error('文本文件为空。');
      const paragraphs = content.split(/\r?\n+/).filter(Boolean).map((line,i) => ({id:uid(),text:line,head:`段落 ${i+1}`}));
      imported = makeDoc(file.name.replace(/\.txt$/i,''),paragraphs,[]);
    } else if (/\.docx$/i.test(file.name)) {
      imported = await readDocx(file);
    } else {
      throw Error('请选择 DOCX 或 TXT 文件。');
    }
    if (workspaceReady !== owner || !message.isConnected || !$('#dialog').open || location.hash !== '#workspace') return;
    if (target && target.versions.at(-1).parts.length) throw Error('此项目已有论文，请新建项目后再导入。');
    setPhase(imported,phase,decision);
    if (target) Object.assign(target,imported,{id:target.id,projectName:target.projectName || target.title});
    else db.docs.unshift(imported);
    db.current = target?.id || imported.id;
    resetUI('review');
    close();
    render();
    if (await save()) {
      const count = imported.issues.length;
      tell(count ? `已导入论文，已同步 ${count} 条 Word 批注至投稿前 · 导师批注。` : '已导入论文。该文件没有检测到导师批注。');
    }
  } catch (error) {
    message.textContent = error.message || '读取失败，请重新选择文件。';
    message.className = 'error';
  } finally {
    picker.disabled = false;
    $('#file').value = '';
  }
}

function navPage(page){if(page !== 'projects' && !parts().length)return;ui.page=page;ui.focus=false;ui.back=false;ui.selectedText=null;if(page==='format'){ui.version=latest();ui.view='formatted';}render();window.scrollTo(0,0);}
const actionsDuringManuscriptEdit = new Set(['manuscript-save','manuscript-cancel','outline','chapter','locate','pane','tab','issue-step','find-report']);
function onAction(action){const [a,b,c]=action.split(':');
if (!workspaceReady) return;
if (ui.manuscriptDraft && !actionsDuringManuscriptEdit.has(a)) {
  if (ui.manuscriptDraft.size) {
    tell('请先在正文栏保存或取消本次修改。');
    return;
  }
  ui.manuscriptDraft = null;
  render(null,true);
}
switch(a){
case 'project-phase':db.current=b;save();phaseDialog(doc().phase==='post'?'pre':'post');break;case 'phase':phaseDialog();break;case 'apply-phase':setPhase(doc(),$('#workPhase').value,$('#decision').value);save();resetUI('review');close();render();break;case 'letter':letterDialog();break;case 'add-letter':addLetter();break;case 'redraft':redraft();break;case 'save-next':saveNext();break;
case 'retry-save':save();break;
case 'new-project':newProjectDialog();break;
case 'load-demo':{
  const first = sampleDoc();
  db.docs.push(first);db.current=first.id;save();resetUI('review');render();break;
}
case 'home':location.hash='home';break;case 'page':navPage(b);break;
case 'open':db.current=b;save();resetUI(c);render();break;
case 'issue-step': {
  const items = visibleIssues();
  const next = items[items.findIndex(i => i.id === ui.sel) + Number(b)];
  if (!next) break;
  selectIssue(next.id);
  if ($(`[data-act="issue-step:${b}"]`).disabled) $('#reviewIssue').focus({preventScroll:true});
  break;
}
case 'tab':ui.tab=b;ui.selectedText=null;render(b==='similar'?repeatedSentences()[0]?.[1]?.at(-1):issue()?.part,true,false);break;
case 'pane':
  if (ui.reviewPane !== b) {
    ui.reviewPane = b;
    render(null, true);
  }
  break;
case 'outline':
  toggleOutline();
  break;
case 'chapter':
  if (singlePane.matches) {
    ui.outlineOpen = false;
    render(null,true);
  }
  locate(b,true);
  updateOutline(b);
  break;
case 'locate':showOriginal(b);break;
case 'manuscript-edit':startManuscriptEdit();break;
case 'manuscript-save':finishManuscriptEdit(true);break;
case 'manuscript-cancel':finishManuscriptEdit(false);break;
case 'focus':ui.focus=!ui.focus;render(null,true);break;
case 'relink-issue':relinkIssue();break;
case 'accept':accept();break;case 'undo':recoverIssue();break;
case 'edit':editModal();break;case 'apply-edit':accept($('#edited').value);break;
case 'defer':issue().status=issue().status==='defer'?'open':'defer';save();close();render(null,true);break;
case 'annotate':noteModal(false);break;case 'follow':noteModal(true);break;case 'save-note':saveNote(false);break;case 'save-follow':saveNote(true);break;
case 'reviewed':doc().checkedVersion=doc().checkedVersion===latest()?null:latest();save();render(null,true);break;
case 'report':modal('外部报告片段',`<label for="snippet">标红的原文片段</label><textarea id="snippet">${esc(doc().report?.text||'')}</textarea><label for="reportSource">报告或文献来源</label><textarea id="reportSource">${esc(doc().report?.source||'')}</textarea><div class="btns">${btn('保存片段','save-report','check','primary')}</div>`);break;
case 'save-report':{const text=$('#snippet').value.trim(),src=$('#reportSource').value.trim();if(!text||!src){tell('请同时填写原文片段和来源。');return;}doc().report={text,source:src,version:latest()};doc().checkedVersion=null;save();close();render(null,true);break;}
case 'find-report':{const p=parts().find(p=>p.text.includes(doc().report.text));if(p)showOriginal(p.id);else tell('当前主稿未找到完全匹配的片段，请核对原文。');break;}
case 'view':ui.view=b;render(null,true);break;case 'shorten':startShorten();break;case 'latest-format':ui.version=latest();render();break;
case 'return-format':ui.back=false;ui.page='format';ui.version=latest();ui.view='formatted';render();break;
case 'version':ui.page='format';ui.version=Number(b);ui.focus=false;ui.back=false;close();render();break;
case 'history':historyModal();break;case 'export':exportModal();break;
case 'download':download().catch(()=>tell('文稿生成失败，请重试。'));break;case 'redownload':download(doc().exports[Number(b)]).catch(()=>tell('文稿生成失败，请重试。'));break;
case 'import':importModal(b ? db.docs.find(d => d.id === b) : null);break;case 'pick':$('#file').click();break;case 'close':close();break;
}}
document.addEventListener('pointerdown', event => {
  if (event.target.closest('[data-act="annotate"],[data-act="follow"],[data-act="relink-issue"]')) {
    ui.selectedText = selectedPassage();
  }
  const stickyButton = event.target.closest('.format .journalGrid .toggle button, .reviewWorkspace button');
  if (stickyButton && event.pointerType === 'mouse' && event.button === 0 && window.scrollY > 0) {
    event.preventDefault();
    stickyButton.focus({preventScroll:true});
  }
});
document.addEventListener('selectionchange',()=>{const sel=selectedPassage();if(sel)ui.selectedText=sel;});
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b)onAction(b.dataset.act);});
document.addEventListener('input',e=>{
  if(ui.manuscriptDraft && e.target.matches('.manuscriptField')) updateManuscriptDraft(e.target);
});
document.addEventListener('keydown',e=>{
  if(!ui.manuscriptDraft || $('#app').hidden || e.isComposing || !(e.metaKey || e.ctrlKey) || e.key.toLowerCase()!=='s') return;
  e.preventDefault();
  if ($('.manuscriptEditing')?.clientHeight) finishManuscriptEdit(true);
});
window.addEventListener('resize',()=>{
  const divider = $('#reviewDivider');
  if (divider) applyReviewSplit(divider);
  if(ui.manuscriptDraft) sizeManuscriptFields(document.querySelectorAll('.manuscriptField'));
  syncReviewViewport();
});
window.addEventListener('beforeunload',e=>{
  if(ui.manuscriptDraft?.size || savesPending || saveError){e.preventDefault();e.returnValue='';}
});
document.addEventListener('change',e=>{
  const {id,value,files}=e.target;
  if(id==='importPhase') $('#importDecisionRow').hidden=value!=='post';
  if(id==='workPhase') $('.decisionRow').hidden=value!=='post';
  if(id==='file') importFile(files[0]);
  if(id==='version'||id==='journal'){ui[id]=Number(value);ui.view='formatted';render();}
  if(id==='reviewIssue') selectIssue(value);
  if(id==='reviewFilter'){
    ui.filter=value;
    const items=visibleIssues();
    selectIssue(items.find(i=>i.id===ui.sel)?.id ?? items[0]?.id);
  }
});
document.addEventListener('scroll',e=>{if(e.target.matches?.('.review .sheets'))updateOutline();},true);
let reviewScrollFrame = 0;
window.addEventListener('scroll',()=>{
  if(ui.page!=='review' || singlePane.matches || reviewScrollFrame)return;
  reviewScrollFrame=requestAnimationFrame(()=>{
    reviewScrollFrame=0;
    syncReviewViewport();
    updateOutline();
  });
},{passive:true});
singlePane.addEventListener('change',()=>{if(ui.page==='review')render(null,true);});
$('#dialog').addEventListener('click',e=>{if(e.target===$('#dialog')){const r=$('#dialog').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
function sampleDoc() {
  const sample = makeDoc('校园绿地接触与大学生心理恢复的关系研究',seedParts,seedIssues,true);
  migrateDoc(sample);
  return sample;
}

let openingWorkspace;
async function showRoute() {
  const target = location.hash;
  const workspace = target === '#workspace';
  $('#welcome').hidden = workspace;
  $('#auth').hidden = !workspace || workspaceReady;
  $('#app').hidden = !workspace || !workspaceReady;
  document.body.classList.toggle('inStudio',workspace && workspaceReady);
  if (!workspace) {
    document.title = landingTitle;
    if (target === '#home') window.scrollTo(0,0);
    return;
  }
  if (!workspaceReady) {
    document.title = '砚稿网页演示';
    try {
      openingWorkspace ??= BrowserWorkspace.read();
      const result = await openingWorkspace;
      if (location.hash !== target || workspaceReady) return;
      db = result.workspace;
      db.docs.forEach(migrateDoc);
      if (!db.docs.length) {
        const sample = sampleDoc();
        db = { docs: [sample], current: sample.id };
      }
      workspaceRevision = result.revision;
      workspaceReady = true;
      resetUI();
    } catch {
      if (location.hash !== target) return;
      $('#authTitle').textContent = '无法读取浏览器项目';
      $('.authDescription').textContent = '请允许此站点使用浏览器存储，再刷新页面。';
      $('#authTitle').focus();
      return;
    }
  }
  $('#auth').hidden = true;
  $('#app').hidden = false;
  document.body.classList.add('inStudio');
  render();
  window.scrollTo(0,0);
  $('#main').focus({preventScroll:true});
}

function newProjectDialog() {
  modal('新建论文项目', `<form id="projectForm"><label for="projectName">项目名称</label>
    <input id="projectName" name="projectName" required maxlength="100" placeholder="例如：毕业论文">
    <div class="btns"><button class="btn primary" type="submit">创建项目</button></div></form>`);
  $('#projectName').focus();
}

async function createProject(event) {
  event.preventDefault();
  const name = $('#projectName').value.trim();
  if (!name) { $('#projectName').focus(); return; }
  const project = makeDoc(name,[],[]);
  project.projectName = name;
  db.docs.unshift(project);
  db.current = project.id;
  close();
  render();
  if (await save() && workspaceReady && doc()?.id === project.id && location.hash === '#workspace') importModal(project);
}

$('#dialog').addEventListener('submit',event => {
  if (event.target.id === 'projectForm') createProject(event);
});
$('.studioSkip').addEventListener('click',event => {
  event.preventDefault();
  $('#main')?.focus();
});
window.addEventListener('hashchange', showRoute);
showRoute();

function letterDialog() {
  if (doc().phase !== 'post') return;
  modal('导入审稿意见', `<label for="letterPart">关联位置</label>
    <select id="letterPart">${parts().map(p => `<option value="${esc(p.id)}">${esc(chapterTitle(p))}</option>`).join('')}</select>
    <label for="letterMode">录入方式</label>
    <select id="letterMode"><option value="lines">每行一条意见</option><option value="single">全文作为一条意见</option></select>
    <label for="letter">意见原文</label>
    <textarea id="letter" rows="5" placeholder="粘贴本轮期刊的意见"></textarea>
    <div class="btns">${btn('加入意见列表','add-letter','plus','primary')}</div>`);
}
function addLetter() {
  if (doc().phase !== 'post') return;
  const input = $('#letter');
  const text = input.value.trim();
  const p = pby($('#letterPart').value);
  if (!p || !text) { input.focus(); return; }
  const quotes = $('#letterMode').value === 'single' ? [text] : text.split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
  const added = quotes.map(quote=>({
    id:uid(),part:p.id,title:quote.replace(/\s+/g,' ').slice(0,24),author:'审稿意见',stage:'post',
    quote,old:p.text,manual:true,suggest:'',status:'open',notes:[]
  }));
  doc().issues.push(...added);
  ui.filter = 'all';
  save();
  close();
  selectIssue(added[0].id);
  tell(`已加入 ${added.length} 条意见。`);
}
function redraft(){const i=issue();if(!i||!i.notes.length)return;const options={i1:'本研究调查了248名大学生，分析校园绿地接触与心理恢复的关系。',i2:'本结论仅适用于本研究的单校样本。',i3:'后续可进一步研究学生使用绿地的方式。',i4:'问卷记录了受访者近一周的绿地接触频率和自评心理恢复水平。'};const next=options[i.id]||i.suggest||i.old;const current=i.status==='done'?(i.applied||i.suggest):i.old;modal('根据二次批注修订',`<p class="smalltext">最近批注</p><p class="quote">${esc(i.notes.at(-1).text)}</p><label for="nextDraft">${options[i.id]?'精简示例建议，可继续编辑':'编辑下一版建议'}</label><textarea id="nextDraft" rows="4">${esc(next)}</textarea><div class="btns">${btn('取消','close')}${btn('保存为新建议','save-next','check','primary')}</div>`);$('#nextDraft').dataset.old=current;}
function saveNext(){const i=issue(),f=$('#nextDraft'),text=f.value.trim();if(!text){f.focus();return;}const old=f.dataset.old;if(!pby(i.part)?.text.includes(old)){tell('原文已更新，请在正文重新选择要修改的段落。');return;}i.notes.push({text:'上一版建议：'+(i.suggest||i.old)});i.old=old;i.suggest=text;i.status='open';i.applied='';save();close();ui.filter='all';render(i.part);tell('已生成新建议，采纳后写入主稿。');}

function repeatedSentences(){const entries=new Map();for(const p of parts()){for(const candidate of p.text.match(/[^。！？.!?\n]+[。！？.!?]?/g)||[]){const sentence=candidate.trim();if(count(sentence)<10)continue;const list=entries.get(sentence)||[];list.push(p.id);entries.set(sentence,list);}}return [...entries].filter(([,ids])=>ids.length>1);}

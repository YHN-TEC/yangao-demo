'use strict';

const BrowserWorkspace = (() => {
  // Repositories under one github.io host share an origin. Separate the data by site path.
  const name = 'yangao-demo:' + new URL('.', location.href).pathname;
  const storeName = 'workspace';
  let connection;

  function database() {
    if (!connection) {
      connection = new Promise((resolve, reject) => {
        const request = indexedDB.open(name, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    return connection;
  }

  async function access(update) {
    const db = await database();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, update ? 'readwrite' : 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get('current');
      let result;
      let conflict;
      request.onsuccess = () => {
        const current = request.result ?? { workspace: { docs: [], current: null }, revision: 0 };
        if (update && update.revision !== current.revision) {
          conflict = new Error('另一个标签页已保存新版本。请在该标签页继续编辑，或刷新后再查看。');
          transaction.abort();
          return;
        }
        result = update ? { workspace: update.workspace, revision: current.revision + 1 } : current;
        if (update) store.put(result, 'current');
      };
      transaction.oncomplete = () => resolve(result);
      transaction.onabort = () => reject(conflict || new Error('浏览器未能保存改稿记录。'));
    });
  }

  return {
    read: () => access(),
    save: async (workspace, revision) => {
      const result = await access({ workspace, revision });
      return { revision: result.revision };
    }
  };
})();

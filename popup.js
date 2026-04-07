
// document.addEventListener('DOMContentLoaded', () => {
//     render();

//     // RESTORED: Add Current Tab Functionality
//     document.getElementById('setTab').onclick = async () => {
//         const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
//         // Security: Don't allow internal chrome pages
//         if (!tab.url || tab.url.startsWith('chrome://')) {
//             const status = document.getElementById('badge-status');
//             status.innerText = "⚠️ Cannot protect internal pages";
//             setTimeout(() => render(), 2000);
//             return;
//         }

//         const data = await chrome.storage.local.get({ workTabs: [] });
        
//         // Check if already added
//         if (!data.workTabs.find(t => t.id === tab.id)) {
//             const updatedTabs = [...data.workTabs, { id: tab.id, title: tab.title }];
//             await chrome.storage.local.set({ workTabs: updatedTabs });
            
//             // Sync with background and refresh list
//             chrome.runtime.sendMessage({ type: "SYNC" });
//             render();
//         }
//     };

//     // Global Deactivate
//     document.getElementById('deactivateAll').onclick = async () => {
//         await chrome.storage.local.set({ workTabs: [] });
//         chrome.runtime.sendMessage({ type: "SYNC" });
//         render();
//     };
// });

// async function render() {
//     const data = await chrome.storage.local.get({ workTabs: [] });
//     const list = document.getElementById('list');
//     const badgeStatus = document.getElementById('badge-status');
    
//     badgeStatus.innerText = data.workTabs.length > 0 
//         ? `🛡️ ${data.workTabs.length} Tabs Protected` 
//         : "Guardian is Idle";

//     list.innerHTML = data.workTabs.length ? '' : 
//         '<div style="text-align:center; padding: 30px; color: #ccc; font-size: 12px;">No active shields. Click the button above to lock this tab.</div>';

//     data.workTabs.forEach(tab => {
//         const div = document.createElement('div');
//         div.className = 'tab-item';
//         div.innerHTML = `
//             <div class="tab-info">
//                 <span class="tab-title">${tab.title}</span>
//             </div>
//             <button class="del-btn" data-id="${tab.id}">REMOVE</button>
//         `;
//         list.appendChild(div);
//     });

//     // Handle individual removals
//     document.querySelectorAll('.del-btn').forEach(btn => {
//         btn.onclick = async (e) => {
//             const idToRemove = Number(e.target.dataset.id);
//             const d = await chrome.storage.local.get({ workTabs: [] });
//             const filtered = d.workTabs.filter(t => t.id !== idToRemove);
//             await chrome.storage.local.set({ workTabs: filtered });
//             chrome.runtime.sendMessage({ type: "SYNC" });
//             render();
//         };
//     });
// }


document.addEventListener('DOMContentLoaded', () => {
  render();

  // Add current tab to protected list
  document.getElementById('setTab').onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Safety check for internal pages
    if (!tab.url || tab.url.startsWith('chrome://')) {
      const statusText = document.getElementById('badge-status');
      statusText.innerText = "Internal pages cannot be shielded";
      setTimeout(() => render(), 2000);
      return;
    }

    const data = await chrome.storage.local.get({ workTabs: [] });
    
    // Prevent duplicates
    if (!data.workTabs.find(t => t.id === tab.id)) {
      const updated = [...data.workTabs, { id: tab.id, title: tab.title }];
      await chrome.storage.local.set({ workTabs: updated });
      chrome.runtime.sendMessage({ type: "SYNC_BADGE" });
      render();
    }
  };

  // Global Deactivate
  document.getElementById('deactivateAll').onclick = async () => {
    await chrome.storage.local.set({ workTabs: [] });
    chrome.runtime.sendMessage({ type: "SYNC_BADGE" });
    render();
  };
});

async function render() {
  const data = await chrome.storage.local.get({ workTabs: [] });
  const list = document.getElementById('list');
  const badgeStatus = document.getElementById('badge-status');
  
  // Update status text
  badgeStatus.innerText = data.workTabs.length > 0 
    ? data.workTabs.length + " Sessions Protected" 
    : "Guardian is Idle";

  // Clear and rebuild list
  list.innerHTML = data.workTabs.length ? '' : 
    '<div style="text-align:center; padding: 20px; color: #ccc; font-size: 12px;">No active shields.</div>';

  data.workTabs.forEach(tab => {
    const div = document.createElement('div');
    div.className = 'tab-item';
    div.innerHTML = `
      <div class="tab-info">
        <span class="tab-title">${tab.title}</span>
      </div>
      <button class="del-btn" data-id="${tab.id}">REMOVE</button>
    `;
    list.appendChild(div);
  });

  // Attach delete events
  document.querySelectorAll('.del-btn').forEach(btn => {
    btn.onclick = async (e) => {
      const id = Number(e.target.dataset.id);
      const d = await chrome.storage.local.get({ workTabs: [] });
      const filtered = d.workTabs.filter(t => t.id !== id);
      await chrome.storage.local.set({ workTabs: filtered });
      chrome.runtime.sendMessage({ type: "SYNC_BADGE" });
      render();
    };
  });
}
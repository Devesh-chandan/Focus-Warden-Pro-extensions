
// let activeTimers = {};

// // Update Badge UI
// async function updateBadge() {
//     const data = await chrome.storage.local.get({ workTabs: [] });
//     const count = data.workTabs.length;
//     chrome.action.setBadgeText({ text: count > 0 ? count.toString() : "" });
//     chrome.action.setBadgeBackgroundColor({ color: "#007AFF" });
// }

// chrome.tabs.onActivated.addListener(async (activeInfo) => {
//     const currentId = activeInfo.tabId;
    
//     // Clear any existing timer for this tab immediately
//     if (activeTimers[currentId]) {
//         clearTimeout(activeTimers[currentId]);
//         delete activeTimers[currentId];
//     }

//     try {
//         const currentTab = await chrome.tabs.get(currentId);
//         if (!currentTab.url || currentTab.url.startsWith('chrome://')) return;

//         const data = await chrome.storage.local.get({ workTabs: [] });
//         const workIds = data.workTabs.map(t => t.id);

//         // If Warden is active and this is a distraction tab
//         if (workIds.length > 0 && !workIds.includes(currentId)) {
//             console.log(`⚠️ Warden: Distraction detected on Tab ${currentId}. Timer starting...`);

//             // 1. Inject the Visual Timer
//             chrome.scripting.executeScript({
//                 target: { tabId: currentId },
//                 func: injectGlassTimer
//             }).catch(err => console.error("Timer injection failed:", err));

//             // 2. Schedule the Hard Lock
//             activeTimers[currentId] = setTimeout(() => {
//                 chrome.scripting.executeScript({
//                     target: { tabId: currentId },
//                     files: ["content.js"]
//                 }).then(() => console.log("🚀 Warden: Lock Screen Injected."))
//                   .catch(err => console.error("Lock injection failed:", err));
//             }, 10000); // 10 seconds

//         } else {
//             // User is back on a Work Tab - Cleanup
//             chrome.scripting.executeScript({
//                 target: { tabId: currentId },
//                 func: () => {
//                     const timer = document.getElementById('warden-glass-timer');
//                     if (timer) timer.remove();
//                     const lock = document.getElementById('warden-lock');
//                     if (lock) lock.remove();
//                 }
//             }).catch(() => {});
//         }
//     } catch (e) {
//         console.warn("Warden: Tab access restricted or tab closed.");
//     }
// });

// // The UI timer function
// function injectGlassTimer() {
//     if (document.getElementById('warden-glass-timer')) return;
    
//     const timer = document.createElement('div');
//     timer.id = 'warden-glass-timer';
//     Object.assign(timer.style, {
//         position: 'fixed', bottom: '40px', right: '40px',
//         background: 'rgba(28, 28, 30, 0.8)', backdropFilter: 'blur(15px)',
//         color: '#fff', padding: '15px 25px', borderRadius: '20px',
//         zIndex: '2147483646', fontSize: '15px', fontWeight: 'bold',
//         fontFamily: '-apple-system, sans-serif', border: '1px solid rgba(255,255,255,0.1)',
//         boxShadow: '0 20px 40px rgba(0,0,0,0.4)', pointerEvents: 'none'
//     });
    
//     timer.innerHTML = `<div id="warden-countdown">10s to Lock</div>`;
//     document.body.appendChild(timer);
    
//     let left = 10;
//     const itv = setInterval(() => {
//         left--;
//         const el = document.getElementById('warden-countdown');
//         if (el) {
//             el.innerText = left > 0 ? `${left}s to Lock` : "🚨 SESSION RESTRICTED";
//         }
//         if (left <= 0) {
//             clearInterval(itv);
//             timer.style.background = 'rgba(255, 59, 48, 0.9)';
//         }
//     }, 1000);
// }

// chrome.runtime.onMessage.addListener((m) => {
//     if (m.type === "SYNC") updateBadge();
// });


let activeTimers = {};

// Update the extension icon badge
async function updateBadgeUI() {
  const data = await chrome.storage.local.get({ workTabs: [] });
  const count = data.workTabs.length;
  chrome.action.setBadgeText({ text: count > 0 ? count.toString() : "" });
  chrome.action.setBadgeBackgroundColor({ color: "#007aff" });
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;
  
  // Clear any existing timer for this tab
  if (activeTimers[tabId]) {
    clearTimeout(activeTimers[tabId]);
    delete activeTimers[tabId];
  }

  try {
    const tab = await chrome.tabs.get(tabId);
    
    // Exit if it's a restricted Chrome page
    if (!tab.url || tab.url.startsWith('chrome://')) return;

    const { workTabs = [] } = await chrome.storage.local.get("workTabs");
    const isProtected = workTabs.some(t => t.id === tabId);

    if (workTabs.length > 0 && !isProtected) {
      // Inject Visual Timer
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: startOnScreenTimer
      }).catch(() => {});

      // Set Lock Timeout
      activeTimers[tabId] = setTimeout(() => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content.js"]
        }).catch(() => {});
      }, 10000);
    } else {
      // User is on a work tab: Remove any existing warden elements
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          const t = document.getElementById('warden-timer'); if (t) t.remove();
          const l = document.getElementById('warden-lock'); if (l) l.remove();
        }
      }).catch(() => {});
    }
  } catch (e) {}
});

function startOnScreenTimer() {
  if (document.getElementById('warden-timer')) return;
  const timer = document.createElement('div');
  timer.id = 'warden-timer';
  Object.assign(timer.style, {
    position: 'fixed', bottom: '30px', right: '30px', zIndex: '999999',
    padding: '12px 20px', background: 'rgba(28, 28, 30, 0.9)', color: 'white',
    borderRadius: '14px', fontFamily: 'sans-serif', fontWeight: 'bold',
    backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
  });
  document.body.appendChild(timer);
  let count = 10;
  const itv = setInterval(() => {
    timer.innerText = "Focus Lost: " + count + "s";
    if (count <= 0) {
      clearInterval(itv);
      timer.innerText = "Session Restricted";
      timer.style.background = "rgba(255, 59, 48, 0.9)";
    }
    count--;
  }, 1000);
}

chrome.runtime.onMessage.addListener((m) => {
  if (m.type === "SYNC_BADGE") updateBadgeUI();
});
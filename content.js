
// (function() {
//   if (document.getElementById('warden-lock')) return;
  
//   const overlay = document.createElement('div');
//   overlay.id = 'warden-lock';
//   Object.assign(overlay.style, {
//     position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
//     background: 'rgba(10, 10, 12, 0.98)', backdropFilter: 'blur(25px)',
//     zIndex: '2147483647', display: 'flex', alignItems: 'center', justifyContent: 'center',
//     color: '#fff', fontFamily: '-apple-system, sans-serif'
//   });
  
//   overlay.innerHTML = `
//     <div style="text-align:center; padding: 40px; border-radius: 32px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); width: 80%; max-width: 400px;">
//       <div style="font-size: 50px; margin-bottom: 20px;">🛡️</div>
//       <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 10px;">Focus Active</h1>
//       <p style="color: #ccc; margin-bottom: 30px; line-height: 1.5;">Distraction detected. Return to your protected workspace to continue.</p>
//       <button id="close-lock" style="width:100%; padding: 16px; background: #fff; color: #000; border: none; border-radius: 16px; font-weight: 700; cursor: pointer;">I Understand</button>
//     </div>
//   `;
  
//   document.body.appendChild(overlay);
//   document.getElementById('close-lock').onclick = () => overlay.remove();
// })();

(function() {
  if (document.getElementById('warden-lock')) return;
  const overlay = document.createElement('div');
  overlay.id = 'warden-lock';
  Object.assign(overlay.style, {
    position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
    background: 'rgba(10, 10, 12, 0.98)', backdropFilter: 'blur(20px)',
    zIndex: '2147483647', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', color: '#fff',
    fontFamily: 'sans-serif', textAlign: 'center'
  });
  
  overlay.innerHTML = `
    <div style="padding: 40px; max-width: 400px; border-radius: 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);">
      <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 12px;">Focus Active</h1>
      <p style="font-size: 16px; color: #8e8e93; margin-bottom: 32px; line-height: 1.5;">This session is restricted to maintain your productivity. Return to your work tab to continue.</p>
      <button id="unlock-btn" style="padding: 14px 28px; background: #fff; color: #000; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">Return to Session</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('unlock-btn').onclick = () => overlay.remove();
})();
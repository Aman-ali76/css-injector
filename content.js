// Apply stored CSS on page load
chrome.storage.sync.get([location.hostname], (result) => {
    const css = result[location.hostname];
    if (css) applyCSS(css);
  });
  
  // Listen for CSS updates from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'APPLY_CSS') {
      applyCSS(message.css);
    }
  });
  
  function applyCSS(css) {
    const styleId = 'custom-site-css';
    let style = document.getElementById(styleId);
  
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
  
    style.textContent = css;
  }
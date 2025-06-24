// Reopen popup when inspection mode ends
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'reopen-popup') {
      chrome.action.openPopup();
    }
  });
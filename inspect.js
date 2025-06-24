// Check if inspection mode is already active
if (!window.inspectionModeActive) {
    window.inspectionModeActive = true; // Mark inspection mode as active
  
    // Create overlay and styles
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
    `;
  
    const style = document.createElement('style');
    style.textContent = `
      .inspect-highlight {
        outline: 3px solid #007bff !important;
        background: rgba(0, 123, 255, 0.1) !important;
        pointer-events: auto !important;
        cursor: crosshair !important;
      }
      
      #inspect-close-btn {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 10000;
        padding: 8px 15px;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        pointer-events: auto !important;
      }
  
      .element-info {
        position: fixed;
        background: white;
        padding: 5px 10px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 10001;
        pointer-events: none;
        font-family: Arial, sans-serif;
        font-size: 12px;
      }
    `;
  
    // Create info tooltip
    const infoTooltip = document.createElement('div');
    infoTooltip.className = 'element-info';
    document.body.appendChild(infoTooltip);
  
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.id = 'inspect-close-btn';
    closeButton.textContent = 'Close';
  
    // Add elements to DOM
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    document.body.appendChild(closeButton);
  
    // Inspection logic
    let currentHighlight = null;
  
    const updateTooltip = (element) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const classList = element.className.split(' ').filter(c => c !== 'inspect-highlight');
      const info = [
        element.id ? `#${element.id}` : '',
        classList.length ? `.${classList.join('.')}` : ''
      ].filter(Boolean).join(' ');
      
      infoTooltip.textContent = info || '<no class/id>';
      infoTooltip.style.left = `${rect.left + window.scrollX + 10}px`;
      infoTooltip.style.top = `${rect.top + window.scrollY - 25}px`;
    };
  
    const handleMouseMove = (e) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      
      if (element === closeButton) return;
      
      if (element !== currentHighlight) {
        if (currentHighlight) {
          currentHighlight.classList.remove('inspect-highlight');
        }
        currentHighlight = element;
        if (currentHighlight) {
          currentHighlight.classList.add('inspect-highlight');
          updateTooltip(currentHighlight);
        }
      }
    };
  
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (currentHighlight && e.target !== closeButton) {
        const classList = currentHighlight.className.split(' ').filter(c => c !== 'inspect-highlight');
        const selector = [
          currentHighlight.id ? `#${currentHighlight.id}` : '',
          classList.length ? `.${classList.join('.')}` : ''
        ].filter(Boolean).join(' ');
        
        if (selector) {
          navigator.clipboard.writeText(selector)
            .then(() => alert(`Copied: ${selector}`));
        }
      }
    };
  
    // Keyboard shortcut to copy class/ID
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') { // Ctrl + Shift + C
        e.preventDefault();
        if (currentHighlight) {
          const classList = currentHighlight.className.split(' ').filter(c => c !== 'inspect-highlight');
          const selector = [
            currentHighlight.id ? `#${currentHighlight.id}` : '',
            classList.length ? `.${classList.join('.')}` : ''
          ].filter(Boolean).join(' ');
          
          if (selector) {
            navigator.clipboard.writeText(selector)
              .then(() => alert(`Copied: ${selector}`));
          }
        }
      }
    };
  
    // Enhanced navigation prevention
    const preventNavigation = (e) => {
      e.preventDefault();
      const confirmationMessage = 'Are you sure you want to leave? Inspection mode is active.';
      e.returnValue = confirmationMessage; // For Chrome
      return confirmationMessage; // For other browsers
    };
  
    // Intercept all possible navigation attempts
    const interceptNavigation = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        e.preventDefault();
        e.stopPropagation();
        alert('Navigation is blocked during inspection mode.');
      }
    };
  
    window.addEventListener('beforeunload', preventNavigation);
    document.addEventListener('click', interceptNavigation);
    document.addEventListener('keydown', handleKeyDown); // Add keyboard shortcut listener
  
    // Cleanup function
    const cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', preventNavigation);
      document.removeEventListener('click', interceptNavigation);
      document.removeEventListener('keydown', handleKeyDown); // Remove keyboard shortcut listener
      overlay.remove();
      closeButton.remove();
      style.remove();
      infoTooltip.remove();
      if (currentHighlight) {
        currentHighlight.classList.remove('inspect-highlight');
      }
      window.inspectionModeActive = false;
  
      // Reopen popup
      chrome.runtime.sendMessage({ action: 'reopen-popup' });
    };
  
    // Initialize
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
      cleanup();
    });
  }
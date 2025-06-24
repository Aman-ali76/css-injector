document.addEventListener('DOMContentLoaded', () => {
    const cssInput = document.getElementById('cssInput');
    const saveButton = document.getElementById('saveButton');
    const resetButton = document.getElementById('resetButton');
    const checkClassButton = document.getElementById('checkClassButton');
    const siteIcon = document.getElementById('siteIcon');
    const siteName = document.getElementById('siteName');

    let timeoutId; // To track the delay timer
    const autoSaveDelay = 1000; // 1 second delay

    // Get current hostname and site info
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = new URL(tabs[0].url);
        const hostname = url.hostname;

        // Set site icon and name
        siteIcon.src = `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`;
        siteName.textContent = hostname;

        // Load existing CSS
        chrome.storage.sync.get([hostname], (result) => {
            cssInput.value = result[hostname] || '';
        });
    });

    // Function to save CSS
    const saveCSS = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const url = new URL(tabs[0].url);
            const hostname = url.hostname;

            const css = cssInput.value.trim();
            const storageObj = { [hostname]: css };

            chrome.storage.sync.set(storageObj, () => {
                // Send CSS to content script
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'APPLY_CSS',
                    css: css
                });
                console.log('Auto-saved CSS for:', hostname);
            });
        });
    };

    // Auto-save with delay
    cssInput.addEventListener('input', () => {
        clearTimeout(timeoutId); // Clear previous timer
        timeoutId = setTimeout(saveCSS, autoSaveDelay); // Start new timer
    });

    // Manual save button
    saveButton.addEventListener('click', saveCSS);

    // Reset CSS
    resetButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const url = new URL(tabs[0].url);
            const hostname = url.hostname;

            // Clear CSS from storage
            chrome.storage.sync.remove([hostname], () => {
                // Send empty CSS to content script
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'APPLY_CSS',
                    css: ''
                });
                cssInput.value = ''; // Clear textarea
                console.log('Reset CSS for:', hostname);
            });
        });
    });

    // Check Class Button
    checkClassButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['inspect.js']
            });
            window.close(); // Close popup
        });
    });

    // Auto-close braces, brackets, and quotes
    const autoClosePairs = {
        '{': '}',
        '[': ']',
        '(': ')',
        '"': '"',
        "'": "'"
    };

    cssInput.addEventListener('keydown', (e) => {
        const start = cssInput.selectionStart;
        const end = cssInput.selectionEnd;
        const value = cssInput.value;

        // Auto-close pairs
        if (autoClosePairs[e.key]) {
            e.preventDefault();
            const pair = autoClosePairs[e.key];
            cssInput.value = value.substring(0, start) + e.key + pair + value.substring(end);
            cssInput.selectionStart = cssInput.selectionEnd = start + 1;
        }

        // Handle Enter key for auto-indentation
        if (e.key === 'Enter') {
            e.preventDefault();
            const before = value.substring(0, start);
            const after = value.substring(end);
            const indentation = before.match(/\s*$/)[0]; // Get current indentation
            const isOpeningBrace = before.trim().endsWith('{');
            const newIndentation = isOpeningBrace ? indentation + '  ' : indentation;
            cssInput.value = before + '\n' + newIndentation + after;
            cssInput.selectionStart = cssInput.selectionEnd = start + newIndentation.length + 1;
        }

        // Handle Tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            cssInput.value = value.substring(0, start) + '  ' + value.substring(end);
            cssInput.selectionStart = cssInput.selectionEnd = start + 2;
        }

        // Comment/Uncomment with Ctrl+/
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            const selectedText = value.substring(start, end);
            const lines = selectedText.split('\n');

            // Toggle comment
            const isCommented = lines.every(line => line.trim().startsWith('/*') && line.trim().endsWith('*/'));
            const newText = lines.map(line => isCommented ? line.replace(/^\/\*|\*\/$/g, '') : `/*${line}*/`).join('\n');

            cssInput.value = value.substring(0, start) + newText + value.substring(end);
            cssInput.selectionStart = start;
            cssInput.selectionEnd = start + newText.length;
        }
    });
});
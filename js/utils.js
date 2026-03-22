// Utilities Module - Shared constants and helper functions
const Utils = (function() {
    // Constants
    const STORAGE_KEY_CONTENT = 'resume-content';
    const STORAGE_KEY_THEME = 'resume-theme';
    const PAGE_BREAK_MARKER = '<!-- page-break -->';
    
    // Debounce utility
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Safe event listener adder
    function safeAddListener(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
        }
    }
    
    // LocalStorage helpers
    function getStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? item : defaultValue;
        } catch (e) {
            console.warn('localStorage not available:', e);
            return defaultValue;
        }
    }
    
    function setStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn('localStorage not available:', e);
        }
    }
    
    // Keyboard shortcut handler that respects input fields
    function addKeyboardShortcut(keyCombo, callback, preventDefault = true) {
        document.addEventListener('keydown', (e) => {
            // Don't trigger if user is typing in an input field
            const tagName = e.target.tagName.toLowerCase();
            if (tagName === 'input' || tagName === 'textarea' || e.target.isContentEditable) {
                return;
            }
            
            const ctrlOrCmd = e.ctrlKey || e.metaKey;
            
            if (keyCombo.ctrl && ctrlOrCmd && e.key.toLowerCase() === keyCombo.key.toLowerCase()) {
                if (preventDefault) {
                    e.preventDefault();
                }
                callback(e);
            }
        });
    }
    
    return {
        STORAGE_KEY_CONTENT,
        STORAGE_KEY_THEME,
        PAGE_BREAK_MARKER,
        debounce,
        safeAddListener,
        getStorage,
        setStorage,
        addKeyboardShortcut
    };
})();

// Expose to window
window.Utils = Utils;
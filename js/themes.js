// Theme Manager - Handles theme switching and CSS loading
const ThemeManager = (function() {
    const STORAGE_KEY = Utils.STORAGE_KEY_THEME;
    let currentTheme = 'ats-classic';
    let themeLinkElement = null;

    const themes = [
        'ats-classic',
        'modern',
        'minimal',
        'creative',
        'professional'
    ];

    function loadTheme(themeName) {
        if (!themes.includes(themeName)) {
            console.warn(`Theme "${themeName}" not found`);
            return;
        }

        // Update stylesheet (use cached element if available)
        if (!themeLinkElement) {
            themeLinkElement = document.getElementById('theme-stylesheet');
        }
        
        if (themeLinkElement) {
            // Set new theme href
            themeLinkElement.href = `css/themes/${themeName}.css`;
            
            // Wait for stylesheet to load before re-rendering
            themeLinkElement.onload = function() {
                currentTheme = themeName;
                Utils.setStorage(STORAGE_KEY, themeName);
                
                // Re-render preview with new theme
                if (window.Preview && window.Editor) {
                    Preview.render(Editor.getValue());
                }
            };
            
            // Handle load errors
            themeLinkElement.onerror = function() {
                console.error(`Failed to load theme: ${themeName}`);
            };
        }
        
        currentTheme = themeName;
        Utils.setStorage(STORAGE_KEY, themeName);
    }

    function getCurrentTheme() {
        return currentTheme;
    }

    function getAvailableThemes() {
        return [...themes];
    }

    function init() {
        // Cache theme link element
        themeLinkElement = document.getElementById('theme-stylesheet');
        
        // Load saved theme preference
        const savedTheme = Utils.getStorage(STORAGE_KEY);
        if (savedTheme && themes.includes(savedTheme)) {
            currentTheme = savedTheme;
            if (themeLinkElement) {
                themeLinkElement.href = `css/themes/${savedTheme}.css`;
            }
            
            // Update selector
            const selector = document.getElementById('theme-selector');
            if (selector) {
                selector.value = savedTheme;
            }
        }

        // Set up theme selector listener
        const selector = document.getElementById('theme-selector');
        if (selector) {
            selector.addEventListener('change', (e) => {
                loadTheme(e.target.value);
            });
        }
    }

    return {
        loadTheme,
        getCurrentTheme,
        getAvailableThemes,
        init
    };
})();

// Expose ThemeManager to window for other modules
window.ThemeManager = ThemeManager;
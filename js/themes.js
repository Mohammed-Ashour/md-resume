// Theme Manager - Handles theme switching by toggling preloaded stylesheets
const ThemeManager = (function() {
    const STORAGE_KEY = Utils.STORAGE_KEY_THEME;
    let currentTheme = 'ats-classic';

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

        // Disable all themes
        document.querySelectorAll('[data-theme]').forEach(link => {
            link.disabled = true;
        });

        // Enable selected theme
        const selectedTheme = document.querySelector(`[data-theme="${themeName}"]`);
        if (selectedTheme) {
            selectedTheme.disabled = false;
        }

        currentTheme = themeName;
        Utils.setStorage(STORAGE_KEY, themeName);

        // Re-render preview with new theme
        if (window.Preview && window.Editor) {
            Preview.render(Editor.getValue());
        }
    }

    function getCurrentTheme() {
        return currentTheme;
    }

    function getAvailableThemes() {
        return [...themes];
    }

    function init() {
        // Load saved theme preference
        const savedTheme = Utils.getStorage(STORAGE_KEY);
        if (savedTheme && themes.includes(savedTheme)) {
            // Disable all themes first
            document.querySelectorAll('[data-theme]').forEach(link => {
                link.disabled = true;
            });
            
            // Enable saved theme
            const themeLink = document.querySelector(`[data-theme="${savedTheme}"]`);
            if (themeLink) {
                themeLink.disabled = false;
            }
            
            currentTheme = savedTheme;
            
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
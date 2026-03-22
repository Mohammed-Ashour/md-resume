// Theme Manager - Switches theme by changing class on preview elements
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

        currentTheme = themeName;
        Utils.setStorage(STORAGE_KEY, themeName);

        // Update all .a4-page elements with new theme class
        const pages = document.querySelectorAll('.a4-page');
        pages.forEach(page => {
            // Remove old theme classes
            themes.forEach(t => page.classList.remove(`theme-${t}`));
            // Add new theme class
            page.classList.add(`theme-${themeName}`);
        });

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
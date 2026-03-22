// Main Application Module - Initializes all components
const App = (function() {
    function init() {
        // Initialize theme manager first (needed by preview)
        ThemeManager.init();
        
        // Initialize preview (needed by editor for initial render)
        Preview.init();
        
        // Initialize editor
        Editor.init();
        
        // Initialize PDF export
        PDFExport.init();

        // Log initialization (single line)
        console.log('Resume Builder initialized - Available themes:', ThemeManager.getAvailableThemes().join(', '));
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        init
    };
})();
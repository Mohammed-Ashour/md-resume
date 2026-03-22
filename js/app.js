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
        
        // Initialize mobile tabs
        initMobileTabs();

        // Log initialization (single line)
        console.log('Resume Builder initialized - Available themes:', ThemeManager.getAvailableThemes().join(', '));
    }
    
    function initMobileTabs() {
        const tabs = document.querySelectorAll('.mobile-tab');
        const editorPane = document.querySelector('.editor-pane');
        const previewPane = document.querySelector('.preview-pane');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show correct pane
                const targetTab = tab.dataset.tab;
                
                if (targetTab === 'editor') {
                    editorPane.classList.add('active');
                    previewPane.classList.remove('active');
                } else {
                    editorPane.classList.remove('active');
                    previewPane.classList.add('active');
                    // Re-render preview when switching to it
                    if (window.Editor && window.Preview) {
                        Preview.render(Editor.getValue());
                    }
                }
            });
        });
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
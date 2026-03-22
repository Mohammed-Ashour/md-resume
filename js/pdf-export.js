// PDF Export Module - Handles PDF generation and printing
const PDFExport = (function() {
    function exportPDF() {
        // Save current scroll position
        const scrollPos = window.scrollY;
        
        // Trigger print dialog
        window.print();
        
        // Restore scroll position
        window.scrollTo(0, scrollPos);
    }

    function init() {
        // Export button
        Utils.safeAddListener(document.getElementById('export-btn'), 'click', exportPDF);

        // Add keyboard shortcut using utility (Shift+E instead of Ctrl+E to avoid conflicts)
        Utils.addKeyboardShortcut({ ctrl: true, key: 'p' }, exportPDF, true);
    }

    return {
        exportPDF,
        init
    };
})();
// Preview Module - Renders markdown to HTML with multi-page support
const Preview = (function() {
    let zoomLevel = 1;
    const ZOOM_STEP = 0.1;
    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 2;
    const PAGE_BREAK = Utils.PAGE_BREAK_MARKER;
    
    // Cache DOM elements
    let previewContainer = null;

    function render(markdown) {
        // Initialize cached element on first render
        if (!previewContainer) {
            previewContainer = document.querySelector('.preview-container');
        }
        
        const currentTheme = ThemeManager.getCurrentTheme();
        
        // Clear container first (common to both paths)
        previewContainer.innerHTML = '';

        // Check for manual page breaks
        if (markdown.includes(PAGE_BREAK)) {
            // Split by manual breaks
            const sections = markdown.split(PAGE_BREAK)
                .map(section => section.trim())
                .filter(section => section.length > 0);
            
            // Use DocumentFragment for better performance
            const fragment = document.createDocumentFragment();
            
            sections.forEach((section, index) => {
                const pageDiv = createPage(section, currentTheme, index + 1, sections.length);
                fragment.appendChild(pageDiv);
            });
            
            previewContainer.appendChild(fragment);
        } else {
            // Single page
            const pageDiv = createPage(markdown, currentTheme, 1, 1);
            previewContainer.appendChild(pageDiv);
        }

        applyZoom();
    }

    function createPage(content, theme, pageNum, totalPages) {
        const pageDiv = document.createElement('div');
        pageDiv.className = `a4-page theme-${theme}`;
        pageDiv.innerHTML = marked.parse(content, { breaks: true, gfm: true });

        // Add page number if multiple pages
        if (totalPages > 1) {
            const pageNumDiv = document.createElement('div');
            pageNumDiv.className = 'page-number';
            pageNumDiv.textContent = `${pageNum} / ${totalPages}`;
            pageDiv.appendChild(pageNumDiv);
        }

        return pageDiv;
    }
    
    function calculateZoom(direction) {
        const newZoom = zoomLevel + (direction * ZOOM_STEP);
        return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(newZoom * 10) / 10));
    }

    function zoomIn() {
        if (zoomLevel < MAX_ZOOM) {
            zoomLevel = calculateZoom(1);
            applyZoom();
        }
    }

    function zoomOut() {
        if (zoomLevel > MIN_ZOOM) {
            zoomLevel = calculateZoom(-1);
            applyZoom();
        }
    }

    function zoomReset() {
        zoomLevel = 1;
        applyZoom();
    }

    function applyZoom() {
        // Cache pages reference
        const pages = document.querySelectorAll('.a4-page');
        const transform = `scale(${zoomLevel})`;
        
        pages.forEach(page => {
            page.style.transform = transform;
            page.style.transformOrigin = 'top center';
        });
    }

    function getZoomLevel() {
        return zoomLevel;
    }

    function init() {
        Utils.safeAddListener(document.getElementById('zoom-in'), 'click', zoomIn);
        Utils.safeAddListener(document.getElementById('zoom-out'), 'click', zoomOut);
        Utils.safeAddListener(document.getElementById('zoom-reset'), 'click', zoomReset);
    }

    return {
        render,
        zoomIn,
        zoomOut,
        zoomReset,
        getZoomLevel,
        init
    };
})();
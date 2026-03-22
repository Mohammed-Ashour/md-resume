// Editor Module - CodeMirror initialization and management
const Editor = (function() {
    let codeMirrorInstance = null;
    const STORAGE_KEY = Utils.STORAGE_KEY_CONTENT;
    const PAGE_BREAK = Utils.PAGE_BREAK_MARKER;
    let saveTimeout = null;

    const defaultContent = `# John Doe

**Senior Software Engineer**  
john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe

## Summary

Experienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.

## Experience

### Senior Software Engineer
**TechCorp Inc.** | San Francisco, CA | Jan 2021 - Present

- Led development of microservices architecture serving 1M+ daily active users
- Reduced application load time by 40% through performance optimization
- Mentored team of 5 junior developers and conducted code reviews

### Software Engineer
**StartupXYZ** | Remote | Jun 2018 - Dec 2020

- Built responsive web applications using React, TypeScript, and GraphQL
- Integrated third-party APIs and payment processing systems

${PAGE_BREAK}

## Education

### Bachelor of Science in Computer Science
**University of Technology** | Graduated: May 2018
- GPA: 3.8/4.0
- Dean's List: All semesters

## Skills

**Languages:** JavaScript, TypeScript, Python, Java, SQL  
**Frontend:** React, Vue.js, HTML5, CSS3, Tailwind CSS  
**Backend:** Node.js, Express, PostgreSQL, MongoDB  
**Tools:** Git, Docker, AWS, Jenkins, Jest
`;

    function init() {
        const textarea = document.getElementById('markdown-input');
        
        // Load saved content or use default
        const savedContent = Utils.getStorage(STORAGE_KEY, defaultContent);
        textarea.value = savedContent;

        // Initialize CodeMirror
        setupEditor(textarea);
        
        // Set up event listeners
        setupEventListeners();
        
        // Set up buttons
        setupButtons();
        
        // Set up toolbar
        setupToolbar();
        
        // Set up template selector
        setupTemplateSelector();
        
        // Set up import/export
        setupImportExport();
        
        // Set up find & replace
        setupFindReplace();
        
        // Initial stats
        updateStats(savedContent);
    }
    
    function setupEditor(textarea) {
        const saveHandler = function() { saveContent(); };
        
        codeMirrorInstance = CodeMirror.fromTextArea(textarea, {
            mode: 'markdown',
            theme: 'default',
            lineNumbers: true,
            lineWrapping: true,
            viewportMargin: Infinity,
            spellcheck: true,
            extraKeys: {
                'Ctrl-S': saveHandler,
                'Cmd-S': saveHandler,
                'Ctrl-B': function(cm) { wrapSelection('**', '**'); },
                'Cmd-B': function(cm) { wrapSelection('**', '**'); },
                'Ctrl-I': function(cm) { wrapSelection('*', '*'); },
                'Cmd-I': function(cm) { wrapSelection('*', '*'); },
                'Ctrl-K': function(cm) { insertLink(); },
                'Cmd-K': function(cm) { insertLink(); }
            }
        });

        // Style the editor
        codeMirrorInstance.getWrapperElement().style.height = '100%';
        codeMirrorInstance.getWrapperElement().style.fontFamily = "'JetBrains Mono', 'Fira Code', monospace";

        // Initial render
        Preview.render(codeMirrorInstance.getValue());

        // Set up change listener with debounce
        codeMirrorInstance.on('change', Utils.debounce(() => {
            const content = codeMirrorInstance.getValue();
            Preview.render(content);
            saveContent();
            updateStats(content);
        }, 300));
        
        // Set up sync scrolling
        setupSyncScrolling();
    }
    
    function setupSyncScrolling() {
        const editorWrapper = codeMirrorInstance.getWrapperElement();
        const previewContainer = document.querySelector('.preview-container');
        
        let isEditorScrolling = false;
        let isPreviewScrolling = false;
        
        // Sync editor scroll to preview
        codeMirrorInstance.on('scroll', function() {
            if (isPreviewScrolling) return;
            isEditorScrolling = true;
            
            const scrollInfo = codeMirrorInstance.getScrollInfo();
            const editorHeight = scrollInfo.height - scrollInfo.clientHeight;
            const previewHeight = previewContainer.scrollHeight - previewContainer.clientHeight;
            
            if (editorHeight > 0 && previewHeight > 0) {
                const scrollRatio = scrollInfo.top / editorHeight;
                previewContainer.scrollTop = scrollRatio * previewHeight;
            }
            
            setTimeout(() => { isEditorScrolling = false; }, 50);
        });
        
        // Sync preview scroll to editor
        previewContainer.addEventListener('scroll', function() {
            if (isEditorScrolling) return;
            isPreviewScrolling = true;
            
            const editorHeight = codeMirrorInstance.getScrollInfo().height - codeMirrorInstance.getScrollInfo().clientHeight;
            const previewHeight = previewContainer.scrollHeight - previewContainer.clientHeight;
            
            if (editorHeight > 0 && previewHeight > 0) {
                const scrollRatio = previewContainer.scrollTop / previewHeight;
                codeMirrorInstance.scrollTo(null, scrollRatio * editorHeight);
            }
            
            setTimeout(() => { isPreviewScrolling = false; }, 50);
        });
    }
    
    function setupToolbar() {
        // Toolbar buttons for markdown formatting
        document.querySelectorAll('.toolbar-btn[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                switch(action) {
                    case 'bold': wrapSelection('**', '**'); break;
                    case 'italic': wrapSelection('*', '*'); break;
                    case 'link': insertLink(); break;
                    case 'list': insertList(); break;
                    case 'h1': insertHeading(1); break;
                    case 'h2': insertHeading(2); break;
                }
                codeMirrorInstance.focus();
            });
        });
    }
    
    function setupTemplateSelector() {
        const templateSelect = document.getElementById('template-selector');
        if (templateSelect) {
            templateSelect.addEventListener('change', (e) => {
                const templateName = e.target.value;
                if (templateName && ResumeTemplates) {
                    const template = ResumeTemplates.getTemplate(templateName);
                    if (template && confirm('This will replace your current content. Continue?')) {
                        setValue(template);
                        saveContent();
                    }
                }
                templateSelect.value = '';
            });
        }
    }
    
    function setupImportExport() {
        // Import button
        const importBtn = document.getElementById('import-btn');
        const fileInput = document.getElementById('file-input');
        
        if (importBtn && fileInput) {
            importBtn.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const content = event.target.result;
                        setValue(content);
                        saveContent();
                        updateStats(content);
                    };
                    reader.readAsText(file);
                }
                fileInput.value = '';
            });
        }
        
        // Export MD button
        const exportMdBtn = document.getElementById('export-md-btn');
        if (exportMdBtn) {
            exportMdBtn.addEventListener('click', exportMarkdown);
        }
    }
    
    function setupFindReplace() {
        const findBtn = document.getElementById('find-btn');
        const findModal = document.getElementById('find-modal');
        const closeFind = document.getElementById('close-find');
        const findInput = document.getElementById('find-input');
        const replaceInput = document.getElementById('replace-input');
        const findNextBtn = document.getElementById('find-next');
        const findPrevBtn = document.getElementById('find-prev');
        const replaceBtn = document.getElementById('replace-btn');
        const replaceAllBtn = document.getElementById('replace-all-btn');
        
        if (findBtn && findModal) {
            findBtn.addEventListener('click', () => {
                findModal.style.display = 'flex';
                findInput.focus();
            });
            
            closeFind.addEventListener('click', () => {
                findModal.style.display = 'none';
            });
            
            findModal.addEventListener('click', (e) => {
                if (e.target === findModal) {
                    findModal.style.display = 'none';
                }
            });
            
            // Keyboard shortcut for find
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'f' && !e.shiftKey) {
                    e.preventDefault();
                    findModal.style.display = 'flex';
                    findInput.focus();
                }
                if (e.key === 'Escape' && findModal.style.display === 'flex') {
                    findModal.style.display = 'none';
                }
            });
            
            findNextBtn.addEventListener('click', () => findNext(findInput.value));
            findPrevBtn.addEventListener('click', () => findPrev(findInput.value));
            replaceBtn.addEventListener('click', () => replace(findInput.value, replaceInput.value));
            replaceAllBtn.addEventListener('click', () => replaceAll(findInput.value, replaceInput.value));
        }
    }
    
    function setupEventListeners() {
        // Event listeners are set up in setupEditor via CodeMirror
    }
    
    function setupButtons() {
        // Clear button
        Utils.safeAddListener(document.getElementById('clear-btn'), 'click', () => {
            if (confirm('Clear all content? This cannot be undone.')) {
                codeMirrorInstance.setValue('');
                saveContent();
                updateStats('');
            }
        });

        // Page break button
        Utils.safeAddListener(document.getElementById('page-break-btn'), 'click', insertPageBreakAtCursor);
    }

    function getValue() {
        return codeMirrorInstance ? codeMirrorInstance.getValue() : '';
    }

    function setValue(content) {
        if (codeMirrorInstance) {
            codeMirrorInstance.setValue(content);
        }
    }

    function saveContent() {
        const content = getValue();
        Utils.setStorage(STORAGE_KEY, content);
        updateSaveIndicator('saved');
    }
    
    function updateSaveIndicator(status) {
        const indicator = document.getElementById('save-indicator');
        if (indicator) {
            if (status === 'saving') {
                indicator.textContent = 'Saving...';
                indicator.classList.add('saving');
            } else {
                indicator.textContent = '✓ Saved';
                indicator.classList.remove('saving');
            }
        }
    }
    
    function updateStats(content) {
        const charCount = document.getElementById('char-count');
        const wordCount = document.getElementById('word-count');
        
        if (charCount) {
            const chars = content.length;
            charCount.textContent = `${chars.toLocaleString()} chars`;
        }
    }
    
    function insertPageBreakAtCursor() {
        if (!codeMirrorInstance) return;
        
        const cursor = codeMirrorInstance.getCursor();
        const line = cursor.line;
        const currentLineContent = codeMirrorInstance.getLine(line);
        
        const needsNewlineBefore = currentLineContent.length > 0 && cursor.ch > 0;
        
        let insertion = PAGE_BREAK;
        if (needsNewlineBefore) {
            insertion = '\n' + insertion;
        }
        insertion += '\n';
        
        codeMirrorInstance.replaceRange(insertion, cursor);
        
        const newLine = line + (needsNewlineBefore ? 2 : 1);
        codeMirrorInstance.setCursor(newLine, 0);
        codeMirrorInstance.focus();
    }
    
    function wrapSelection(before, after) {
        if (!codeMirrorInstance) return;
        
        const selection = codeMirrorInstance.getSelection();
        if (selection) {
            codeMirrorInstance.replaceSelection(before + selection + after);
        } else {
            const cursor = codeMirrorInstance.getCursor();
            codeMirrorInstance.replaceRange(before + after, cursor);
            codeMirrorInstance.setCursor(cursor.line, cursor.ch + before.length);
        }
    }
    
    function insertLink() {
        if (!codeMirrorInstance) return;
        
        const selection = codeMirrorInstance.getSelection();
        const linkText = selection || 'link text';
        const replacement = `[${linkText}](url)`;
        codeMirrorInstance.replaceSelection(replacement);
    }
    
    function insertList() {
        if (!codeMirrorInstance) return;
        
        const cursor = codeMirrorInstance.getCursor();
        codeMirrorInstance.replaceRange('- ', cursor);
    }
    
    function insertHeading(level) {
        if (!codeMirrorInstance) return;
        
        const cursor = codeMirrorInstance.getCursor();
        const prefix = '#'.repeat(level) + ' ';
        codeMirrorInstance.replaceRange(prefix, {line: cursor.line, ch: 0});
    }
    
    function findNext(searchTerm) {
        if (!codeMirrorInstance || !searchTerm) return;
        codeMirrorInstance.execCommand('find');
        const state = codeMirrorInstance.state.search;
        if (state && state.query) {
            state.query = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            codeMirrorInstance.execCommand('findNext');
        }
    }
    
    function findPrev(searchTerm) {
        if (!codeMirrorInstance || !searchTerm) return;
        const state = codeMirrorInstance.state.search;
        if (state && state.query) {
            state.query = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            codeMirrorInstance.execCommand('findPrev');
        }
    }
    
    function replace(searchTerm, replaceWith) {
        if (!codeMirrorInstance || !searchTerm) return;
        const content = codeMirrorInstance.getValue();
        const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const newContent = content.replace(regex, replaceWith);
        codeMirrorInstance.setValue(newContent);
    }
    
    function replaceAll(searchTerm, replaceWith) {
        replace(searchTerm, replaceWith);
    }
    
    function exportMarkdown() {
        const content = getValue();
        const blob = new Blob([content], {type: 'text/markdown'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.md';
        a.click();
        URL.revokeObjectURL(url);
    }

    return {
        init,
        getValue,
        setValue,
        saveContent
    };
})();

// Expose Editor to window for other modules
window.Editor = Editor;
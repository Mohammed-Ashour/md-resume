// Editor Module - CodeMirror initialization and management
const Editor = (function() {
    let codeMirrorInstance = null;
    const STORAGE_KEY = Utils.STORAGE_KEY_CONTENT;
    const PAGE_BREAK = Utils.PAGE_BREAK_MARKER;

    const defaultContent = `# John Doe

**Senior Software Engineer**  
john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe

## Summary

Experienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and mentoring junior developers.

## Experience

### Senior Software Engineer
**TechCorp Inc.** | San Francisco, CA | Jan 2021 - Present

- Led development of microservices architecture serving 1M+ daily active users
- Reduced application load time by 40% through performance optimization efforts
- Mentored team of 5 junior developers and conducted weekly code reviews
- Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 60%

### Software Engineer
**StartupXYZ** | Remote | Jun 2018 - Dec 2020

- Built responsive web applications using React, TypeScript, and GraphQL
- Integrated third-party APIs and payment processing systems
- Collaborated with UX team to improve user experience

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

## Projects

### Open Source Contributor
Contributed to 20+ open source projects with 500+ stars on GitHub

### Personal Portfolio
Built interactive portfolio using Next.js and deployed on Vercel
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
    }
    
    function setupEditor(textarea) {
        const saveHandler = function() { saveContent(); };
        
        codeMirrorInstance = CodeMirror.fromTextArea(textarea, {
            mode: 'markdown',
            theme: 'default',
            lineNumbers: true,
            lineWrapping: true,
            viewportMargin: Infinity,
            extraKeys: {
                'Ctrl-S': saveHandler,
                'Cmd-S': saveHandler
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
            Utils.setStorage(STORAGE_KEY, content);
        }, 300));
    }
    
    function setupEventListeners() {
        // Event listeners are set up in setupEditor via CodeMirror
    }
    
    function setupButtons() {
        // Clear button
        Utils.safeAddListener(document.getElementById('clear-btn'), 'click', () => {
            if (confirm('Clear all content? This cannot be undone.')) {
                codeMirrorInstance.setValue('');
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
        console.log('Content saved');
    }
    
    function insertPageBreakAtCursor() {
        if (!codeMirrorInstance) return;
        
        const cursor = codeMirrorInstance.getCursor();
        const line = cursor.line;
        const currentLineContent = codeMirrorInstance.getLine(line);
        
        // Determine if we need a newline before the page break
        const needsNewlineBefore = currentLineContent.length > 0 && cursor.ch > 0;
        
        // Build the insertion text
        let insertion = PAGE_BREAK;
        if (needsNewlineBefore) {
            insertion = '\n' + insertion;
        }
        insertion += '\n';
        
        // Insert at cursor position
        codeMirrorInstance.replaceRange(insertion, cursor);
        
        // Move cursor after the inserted page break
        const newLine = line + (needsNewlineBefore ? 2 : 1);
        codeMirrorInstance.setCursor(newLine, 0);
        codeMirrorInstance.focus();
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
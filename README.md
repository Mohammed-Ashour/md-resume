# Markdown Resume Builder

Write your resume in Markdown, preview it live, and export to PDF. No server, no tracking, runs entirely in your browser.

**Live Demo:** https://mohammed-ashour.github.io/md-resume/

## What It Does

- Split-screen editor with live A4 preview
- 5 professional themes (ATS-optimized included)
- Manual page breaks for full control
- One-click PDF export
- Auto-saves your work
- 100% private - everything stays in your browser

## Quick Start

```bash
# Start a local server
python3 -m http.server 8000

# Open http://localhost:8000
```

That's it. No installation, no dependencies.

## How to Use

### Basic Resume

```markdown
# Your Name

**Software Engineer** | you@email.com | (555) 123-4567

## Summary
Brief intro about yourself.

## Experience
### Job Title
**Company** | 2020 - Present
- Did this thing
- Did another thing

## Skills
Python, JavaScript, AWS
```

### Page Breaks

Add `<!-- page-break -->` on its own line to start a new page:

```markdown
## Experience
Your work history...

<!-- page-break -->

## Education
Your education...
```

**When to use page breaks:**
- Start a new major section on a fresh page (Education, Skills, Projects)
- Keep related content together (don't break mid-list)
- Control first impression (put your strongest section first)
- For multi-page resumes, balance content across pages

**Tips:**
- Preview shows exact page breaks before you export
- Use sparingly - let content flow naturally when possible
- The "Page Break" button inserts one at your cursor position

### Themes

| Theme | Best For |
|-------|----------|
| **ATS Classic** | Job applications, corporate roles |
| **Modern** | Tech companies, startups |
| **Minimal** | Clean, simple presentation |
| **Creative** | Designers, creative roles |
| **Professional** | Traditional industries, executives |

### PDF Export

1. Click "Export PDF" (or press `Ctrl+P`)
2. In print dialog, set margins to "None" or "Minimum"
3. Choose "Save as PDF"
4. Done!

## Deploy to GitHub Pages

1. Fork this repo
2. Settings → Pages → Deploy from `main` branch
3. Your site will be at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Project Structure

```
├── index.html
├── css/
│   ├── main.css
│   ├── preview.css
│   └── themes/
├── js/
│   ├── app.js
│   ├── editor.js
│   ├── preview.js
│   ├── themes.js
│   ├── pdf-export.js
│   └── utils.js
└── README.md
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` / `Cmd+S` | Save (auto-saves anyway) |
| `Ctrl+P` / `Cmd+P` | Export PDF |
| `Page Break` button | Insert `<!-- page-break -->` |

## Tech Stack

- [CodeMirror](https://codemirror.net/) - Editor
- [Marked.js](https://marked.js.org/) - Markdown parser
- Pure CSS themes - No frameworks

## License

MIT. Use it however you want.
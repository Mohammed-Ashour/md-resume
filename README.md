# Markdown Resume Builder

Write your resume in Markdown, preview it live, and export to PDF. No server, no tracking, runs entirely in your browser.

## What It Does

- Split-screen editor with live A4 preview
- 5 professional themes (ATS-optimized included)
- Automatic page breaks with manual control
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

Add `<!-- page-break -->` anywhere to force a new page:

```markdown
## Experience
...

<!-- page-break -->

## Education
...
```

### Themes

- **ATS Classic** - Clean, ATS-friendly format
- **Modern** - Professional with color
- **Minimal** - Simple, distraction-free
- **Creative** - Bold for designers
- **Professional** - Corporate-ready

### PDF Export

1. Click "Export PDF"
2. Set margins to "None"
3. Save as PDF

## Deploy to GitHub Pages

1. Push repo to GitHub
2. Settings → Pages → Deploy from `main` branch
3. Done


## Tech Stack

- [CodeMirror](https://codemirror.net/) - Editor
- [Marked.js](https://marked.js.org/) - Markdown parser
- Pure CSS themes - No frameworks

## License

MIT. Use it however you want.
// Resume Templates Module
const ResumeTemplates = (function() {
    const templates = {
        'software-engineer': `# Your Name

**Senior Software Engineer** | your@email.com | (555) 123-4567 | linkedin.com/in/yourname

## Summary

Experienced software engineer with expertise in full-stack development. Passionate about building scalable applications and leading engineering teams.

## Experience

### Senior Software Engineer
**Company Name** | City, State | Jan 2020 - Present

- Led development of [project] serving [X] users
- Reduced system latency by [X]% through optimization
- Mentored [X] junior engineers
- Technologies: JavaScript, TypeScript, React, Node.js, AWS

### Software Engineer
**Previous Company** | City, State | Jun 2017 - Dec 2019

- Built [feature] using [technologies]
- Improved code coverage from [X]% to [Y]%
- Collaborated with product team on roadmap planning

<!-- page-break -->

## Education

### Bachelor of Science in Computer Science
**University Name** | Graduated: May 2017
- GPA: X.XX/4.0
- Relevant coursework: Data Structures, Algorithms, Software Engineering

## Skills

**Languages:** JavaScript, TypeScript, Python, Java
**Frontend:** React, Vue.js, HTML, CSS, Tailwind
**Backend:** Node.js, Express, PostgreSQL, MongoDB
**DevOps:** AWS, Docker, CI/CD, Git

## Projects

### Open Source Project Name
Brief description of the project and your contribution.
- Technologies: [list]
- Link: github.com/yourname/project
`,

        'product-manager': `# Your Name

**Product Manager** | your@email.com | (555) 123-4567 | linkedin.com/in/yourname

## Summary

Product manager with [X] years of experience driving product strategy and delivering user-centric solutions. Skilled in roadmap planning, stakeholder management, and data-driven decision making.

## Experience

### Senior Product Manager
**Company Name** | City, State | Jan 2020 - Present

- Defined product roadmap for [product] serving [X] users
- Launched [feature] resulting in [X]% increase in engagement
- Led cross-functional team of [X] engineers, designers, and analysts
- Managed product backlog and sprint planning

### Product Manager
**Previous Company** | City, State | Jun 2017 - Dec 2019

- Shipped [X] major features impacting [X] users
- Conducted user research and competitive analysis
- Collaborated with engineering on technical specifications

<!-- page-break -->

## Education

### Master of Business Administration
**University Name** | Graduated: May 2017
- Concentration: Technology Management

### Bachelor of Science in [Field]
**University Name** | Graduated: May 2015

## Skills

**Product:** Roadmap Planning, User Research, A/B Testing, Agile/Scrum
**Analytics:** SQL, Tableau, Google Analytics, Mixpanel
**Tools:** Jira, Figma, Confluence, Notion
**Leadership:** Cross-functional Collaboration, Stakeholder Management
`,

        'designer': `# Your Name

**UI/UX Designer** | your@email.com | (555) 123-4567 | portfolio.yourname.com

## Summary

Creative designer with [X] years experience crafting intuitive user interfaces and delightful user experiences. Passionate about user-centered design and accessible interfaces.

## Experience

### Senior UX Designer
**Company Name** | City, State | Jan 2020 - Present

- Led design for [product] used by [X] users monthly
- Improved conversion rate by [X]% through UX optimization
- Established design system with [X] components
- Collaborated with [X] product teams on design initiatives

### UI/UX Designer
**Previous Company** | City, State | Jun 2017 - Dec 2019

- Designed mobile and web experiences for [client/project]
- Created wireframes, prototypes, and high-fidelity mockups
- Conducted user testing sessions with [X] participants

<!-- page-break -->

## Education

### Bachelor of Fine Arts in Design
**University Name** | Graduated: May 2017
- Concentration: Interactive Design

## Skills

**Design:** User Research, Wireframing, Prototyping, Design Systems
**Tools:** Figma, Sketch, Adobe XD, InVision, Principle
**Frontend:** HTML, CSS, Basic JavaScript
**Methods:** Design Thinking, Jobs-to-be-Done, A/B Testing

## Projects

### Project Name
Brief description and your role
- Tools: [list]
- Impact: [metrics]
- Link: portfolio.yourname.com/project
`,

        'marketing': `# Your Name

**Marketing Manager** | your@email.com | (555) 123-4567 | linkedin.com/in/yourname

## Summary

Marketing professional with [X] years experience driving growth and brand awareness. Expert in digital marketing, content strategy, and marketing analytics.

## Experience

### Marketing Manager
**Company Name** | City, State | Jan 2020 - Present

- Developed marketing strategy resulting in [X]% revenue growth
- Managed [X]% marketing budget across channels
- Led team of [X] marketing specialists
- Launched [campaign] reaching [X] potential customers

### Marketing Specialist
**Previous Company** | City, State | Jun 2017 - Dec 2019

- Executed digital campaigns across social, email, and paid channels
- Increased organic traffic by [X]% through content marketing
- Managed social media presence with [X] followers

<!-- page-break -->

## Education

### Bachelor of Arts in Marketing
**University Name** | Graduated: May 2017
- Minor: Communications

## Skills

**Marketing:** SEO, SEM, Social Media, Email Marketing, Content Strategy
**Analytics:** Google Analytics, HubSpot, Salesforce
**Tools:** Mailchimp, Hootsuite, Canva, WordPress
**Channels:** LinkedIn, Twitter, Facebook, Instagram, TikTok

## Certifications

- Google Analytics Certified
- HubSpot Inbound Marketing
- Facebook Blueprint
`,

        'minimal': `# Your Name

**Job Title** | your@email.com | (555) 123-4567 | linkedin.com/in/yourname

## Experience

### Job Title
**Company** | Location | Start Date - Present

- Key achievement with metric
- Another accomplishment
- Technologies used: [list]

### Previous Role
**Company** | Location | Start Date - End Date

- Key accomplishment
- Impact or result

## Education

### Degree Name
**University** | Year

## Skills

Skill 1, Skill 2, Skill 3, Skill 4, Skill 5
`
    };

    function getTemplate(name) {
        return templates[name] || null;
    }

    function getTemplateNames() {
        return Object.keys(templates);
    }

    return {
        getTemplate,
        getTemplateNames
    };
})();

// Expose to window
window.ResumeTemplates = ResumeTemplates;
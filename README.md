# KelsoCodes.com

Personal journal and portfolio site built with Eleventy and Decap CMS.

## Tech Stack

- **Static Site Generator**: [Eleventy](https://www.11ty.dev/) (v3.0)
- **Template Engine**: Nunjucks
- **CMS**: [Decap CMS](https://decapcms.org/) (formerly Netlify CMS)
- **Hosting**: Render
- **Email Forms**: Formspree

## Project Structure

```
kelso-codes/
├── .eleventy.js              # Eleventy configuration
├── package.json              # Dependencies
├── render.yaml               # Render deployment config
├── src/
│   ├── _data/                # Site metadata
│   ├── _includes/
│   │   ├── layouts/          # Page layouts
│   │   └── components/       # Reusable components
│   ├── assets/
│   │   ├── css/              # Stylesheets
│   │   └── js/               # JavaScript
│   ├── journal/              # Journal entries (markdown)
│   ├── admin/                # Decap CMS admin interface
│   └── index.njk             # Homepage template
└── _site/                    # Build output (gitignored)
```

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Visit http://localhost:8080

### Build for Production

```bash
npm run build
```

Output will be in the `_site/` directory.

## Content Management

### Using Decap CMS

1. Visit https://kelsocodes.com/admin
2. Login with GitHub (OAuth)
3. Create/edit journal entries
4. Publish changes (creates a git commit)
5. Render auto-deploys on commit to main branch

### Manual Entry Creation

Create a new file in `src/journal/` with this format:

```markdown
---
entryNumber: 2
title: "Your Entry Title"
date: 2026-03-15
dateDisplay: "March 2026"
subtitle: "Brief subtitle"
tags:
  - "#YourTag"
  - "#AnotherTag"
acknowledgments: "Optional thanks to people"
---

Your content here in markdown.

Use lesson blocks like this:

{% lesson "01. Lesson Title" %}
The lesson content goes here.
{% endlesson %}
```

## Lesson Shortcode

The `{% lesson %}` paired shortcode creates styled lesson blocks:

```njk
{% lesson "Lesson Title" %}
Lesson content here.
{% endlesson %}
```

## Deployment

### Render Configuration

The site auto-deploys to Render when changes are pushed to the main branch.

Build command: `npm install && npm run build`
Publish directory: `_site`

### GitHub OAuth Setup (Required for CMS)

To enable Decap CMS authentication:

1. Go to https://github.com/settings/developers
2. Create a new OAuth App:
   - **Application name**: KelsoCodes CMS
   - **Homepage URL**: https://kelsocodes.com
   - **Authorization callback URL**: https://api.netlify.com/auth/done
3. Note the **Client ID** (public, safe to commit)
4. Note the **Client Secret** (keep private)
5. Configure Netlify OAuth service with these credentials

The CMS is configured to use Netlify's free GitHub OAuth service (see `src/admin/config.yml`).

## Email Subscription

Email subscriptions are handled by Formspree (ID: xpqykndp). The form is in `src/_includes/components/subscribe.njk`.

## Design

The site uses a minimal, elegant design with:
- **Fonts**: Playfair Display (serif), IBM Plex Sans, IBM Plex Mono
- **Color Scheme**: Dark theme with warm accents
- **Grain Texture**: SVG noise overlay for visual interest
- **Animations**: Subtle fade-up animations on page load

All styles are in `src/assets/css/main.css`.

## Publishing Workflow

1. **Write**: Login to /admin and create a new journal entry
2. **Preview**: Use the CMS preview pane to review formatting
3. **Publish**: Click "Publish" to commit changes to GitHub
4. **Deploy**: Render automatically rebuilds and deploys the site
5. **Notify**: Subscribers receive email via Formspree

## Notes

- All journal entries are stored as markdown files in `src/journal/`
- The site is completely static (no server-side code)
- Content is version-controlled in git
- Changes to main branch trigger automatic deployment

## License

Copyright © 2026 KelsoCodes.com

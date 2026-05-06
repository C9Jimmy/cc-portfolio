# 🟡 Chris Cheng Portfolio

Personal portfolio website for Chris Cheng, a frontend engineer and UI/UX designer.  
Built with Vue 3 + TypeScript as an interactive single-page experience.

## Live Demo

[View Portfolio](https://c9jimmy.github.io/cc-portfolio/)

## Overview

This site is built as a public-facing resume and portfolio for sharing professional background, frontend skills, product experience, and design sensibility.

It includes:

- 🧑‍💻 Animated hero section with parallax floaters
- 🗂️ Work experience timeline
- 🧩 Frontend, design, and collaboration skills with GitHub contribution graph
- 🃏 Interactive 3D flip card carousel for app and web projects
- ✉️ Contact section with social links
- 📄 Downloadable resume PDF

## Tech Stack

| Category | Package | Version |
|---|---|---|
| Framework | vue | ^3.5.32 |
| Build Tool | vite | ^4.5.5 |
| Type System | typescript | ~5.3.2 |
| Composables | @vueuse/core | ^14.2.1 |
| Styles | Scoped CSS + CSS Custom Properties | — |
| Icons | Font Awesome 6 CDN | — |
| Deployment | GitHub Pages | — |

## Project Structure

```
src/
├── features/        # Page sections (hero / about / exp / skills / visual / contact)
├── shared/
│   ├── components/  # Layout & UI components
│   ├── composables/ # useRevealOnScroll
│   ├── data/        # resume.ts — single source of truth for all content
│   └── types/       # TypeScript type definitions
└── style/           # CSS custom properties & global styles
```

## Deployment

This site is deployed with GitHub Actions to GitHub Pages.

## License

This project is licensed under the MIT License.

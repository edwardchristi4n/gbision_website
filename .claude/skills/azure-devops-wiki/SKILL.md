---
title: "Skill — Azure DevOps Wiki"
name: azure-devops-wiki
description: Use when creating, renaming, or deleting pages in an Azure DevOps wiki — enforces file structure rules and markdown conventions.
type: skill
tags: [wiki, azure-devops, documentation]
status: active
last_updated: 2026-04-25
---

# Azure DevOps Wiki

## When to invoke

- You are creating a new page in an Azure DevOps wiki.
- You are renaming or moving a wiki page.
- You are deleting a wiki page (need to handle orphaned children).
- You notice wiki pages that don't follow the conventions below.

## Azure DevOps Wiki Rules

Azure DevOps wikis have specific file-structure requirements:

### File naming

| Rule | Example |
|------|---------|
| Title-Case-Hyphenated | `My-Page-Name.md` |
| No spaces in filenames | Use hyphens: `User-Guide.md` |
| No special characters | No `/`, `\`, `#`, `?` |
| No leading/trailing dots | Not `.hidden.md` or `file..md` |
| Max path length | 235 characters total |

### Folder structure

Every folder with children requires:

1. **Sidecar `.md` file** — A markdown file with the same name as the folder
2. **`.order` file** — Lists child pages in display order

```
Base/                    # Folder
├── Base.md              # Sidecar landing page (required)
├── .order               # Child order (required)
├── Guides/              # Subfolder
│   ├── Guides.md        # Sidecar for Guides folder
│   ├── .order           # Order of guides
│   └── Getting-Started.md
└── Templates/
    ├── Templates.md
    ├── .order
    └── User-Story.md
```

### The `.order` file

Lists child page names (without `.md`) in display order:

```
Getting-Started
Installation
Configuration
```

If `.order` is missing, Azure DevOps shows children in alphabetical order.

## Checklist — Creating a new page

- [ ] Use Title-Case-Hyphenated naming
- [ ] If creating a folder, create the sidecar `.md` file
- [ ] If creating a folder, create the `.order` file
- [ ] Add the new page to the parent's `.order` file
- [ ] Verify total path length < 235 characters
- [ ] Use relative links to other wiki pages

## Checklist — Renaming/moving a page

- [ ] Rename both the folder AND the sidecar `.md` if it's a folder
- [ ] Update all `.order` files that reference this page
- [ ] Update all links pointing to this page
- [ ] If moving, update the source folder's `.order` (remove) and destination's `.order` (add)

## Checklist — Deleting a page

- [ ] If folder: handle children first (move or delete)
- [ ] Remove from parent's `.order` file
- [ ] Delete the `.md` file
- [ ] If folder: delete the sidecar `.md` and folder
- [ ] Search for broken links to this page

## Markdown conventions

| Feature | Azure DevOps Syntax |
|---------|---------------------|
| Internal links | `[Text](./Page-Name)` or `[Text](/Path/Page-Name)` |
| Images | `![Alt](/.attachments/image.png)` |
| Table of contents | `[[_TOC_]]` |
| Mermaid diagrams | Standard fenced code blocks work |

**Note:** Azure DevOps does NOT render:
- `README.md` as folder index (use sidecar pattern instead)
- Some GitHub-flavored markdown extensions

## Red flags

- "I'll just create the folder without the sidecar .md" — Azure DevOps will show a blank page.
- "I'll skip the .order file" — Children will be in random order.
- Spaces in filenames — Azure DevOps will URL-encode them, breaking links.
- Forgetting to update `.order` after adding a page — Page won't appear in navigation.

## See also

- `diagram-standards` — for mermaid diagrams in wiki pages
- `writing-user-story` — for user-story pages on the wiki

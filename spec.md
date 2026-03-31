# SlotReview Pro

## Current State
New project — empty backend and frontend scaffolding only.

## Requested Changes (Diff)

### Add
- Full slot game review website with homepage and individual review pages
- Sticky header with logo, navigation links (Reviews, Latest, Ratings, Guides, News), and search
- Hero section with headline, search bar, and neon slot illustration
- Featured Reviews grid (card-based, 4-column) with cover image, title, rating chip, excerpt
- Individual Slot Game Review page template with:
  - Hero/header with game title and featured image
  - Star/score rating system
  - Pros & Cons comparison block
  - Screenshots / embedded video section
  - Content sections: Overview, Features, Gameplay, Verdict
- All Reviews listing page with filters
- Footer with about, quick links, social icons, newsletter input
- Sample slot game data (10+ review entries)
- Backend: CRUD for slot reviews (title, description, rating, pros, cons, screenshots, category, verdict)

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Generate Motoko backend with SlotReview data model and CRUD operations
2. Build frontend: Homepage, Reviews listing page, Individual review detail page
3. Wire backend data to frontend components
4. Implement rating system, pros/cons block, screenshots section
5. Add responsive navigation, search functionality (client-side filter)
6. Apply dark navy/gold design system matching design preview

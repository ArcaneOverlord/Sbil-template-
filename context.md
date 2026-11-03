# Project Overview
**PosterGen** is a responsive Next.js application designed to dynamically generate, edit, and export high-resolution (3508x4961) achiever recognition posters. It features a robust templating engine, a highly interactive workspace (responsive across mobile and desktop), and a powerful canvas rendering engine capable of SVG curved paths, deep-merged layout overrides, and auto-scaling text.

## Tech Stack
* **Framework:** Next.js (React), TypeScript
* **Styling:** Tailwind CSS, inline CSS for dynamic canvas coordinates
* **Icons:** `lucide-react`
* **Export Engine:** `html-to-image` (generates full-resolution PNGs from the scaled DOM elements)

## Architecture & Core Files

### 1. `lib/templates.ts` (The Data Model)
Acts as the single source of truth for all template designs. It allows for rapid integration of new layouts without touching the core React components.
* **`TextConfig` & `ImageConfig`:** Defines strict coordinates (percentages/pixels), typography, and masking for elements.
* **`defaultTextStyles`:** A master theme system for each template to prevent repetitive code across multiple achiever slots.
* **`activeTeamOverride` Engine:** A heavily typed override system. When the "Enable Achiever Team Input" global toggle is active, any property here (coordinates, font sizes, gradients, or background shapes) cleanly overrides the base styles. Features an `active: boolean` master switch for easy testing.
* **Gradient Engine (`GradientDef`):** Supports standard, 3-stop linear (with a `via` color), and radial gradients.
* **Custom Fields:** Supports dynamic, template-specific extra elements (e.g., event dates, sponsor logos) that auto-generate UI in the editor.

### 2. `components/PosterCanvas.tsx` (The Rendering Engine)
A purely visual, pointer-events-disabled component that accurately renders the high-res 3508x4961 DOM. It is scaled down via CSS `transform: scale(0.10)` to fit the workspace.
* **`FitText` Auto-Scaling:** A custom React component that intercepts text outputs, measures their natural DOM width against their container, and dynamically applies a CSS scale transform to cleanly squish overflowing text onto a single line.
* **SVG Curved Text:** Dynamically maps text strings to SVG `<textPath>` elements based on customizable `curvePath` coordinates.
* **Deep Merging:** Safely merges base text styles with `activeTeamOverride` properties, including deeply nested objects like `boxStyle` (background shapes) and `gradientColors`.
* **Copy Protection:** Utilizes Tailwind's `select-none` and a disabled context menu to prevent text selection and right-click saving of the preview.

### 3. `app/editor/[id]/page.tsx` (The Editor Workspace)
The main user interface for customizing the selected template. 
* **Responsive Layout:** Operates as a draggable bottom drawer on mobile devices and converts into a fixed right-side panel (`lg:w-1/3`) on desktop screens.
* **Pan & Zoom:** Features a locking toggle to switch the canvas between a static preview and a draggable/zoomable workspace.
* **Universal Banner Logic:** Supports a segmented toggle for MTD/YTD. YTD locks the banner to "YTD TOPPERS [Year]". MTD unlocks a checkbox to swap "TOPPERS" with a specific month (e.g., "MTD OCTOBER 2026").
* **Safe Image Adjustments:** Uploaded images trigger a manual "Settings" gear icon to open sliders for scale, X, and Y axis movements, protecting users from accidental scrolling interference.
* **Strict Constraints:** Form fields enforce auto-capitalization (`.toUpperCase()`) and strict character limits (`maxLength={30}` for entries, `maxLength={20}` for the bottom banner) to safeguard the design.

## Recent Milestones & Upgrades
1. **Dynamic Background Shapes:** Added `boxStyle` to render rounded background blocks (pills/rectangles) directly behind specific text entries.
2. **Advanced Gradients:** Upgraded the gradient engine to support radial bursts and 3-stop linear gradients using a `getGradientString` helper.
3. **Template Custom Fields:** Implemented `customData` mapping to allow templates to define their own required extra fields without hardcoding them into the main editor loop.
4. **Vercel Build Stability:** Resolved TypeScript strictness issues regarding nested object merging within the conditional override engine using precise type casting.

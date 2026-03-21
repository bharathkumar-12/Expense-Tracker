# Design System Strategy: The Translucent Ledger

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Obsidian."** 

We are moving away from the "flat box" aesthetic of traditional fintech. Instead, we are creating an environment that feels like a precision instrument carved from dark glass and light. This system breaks the "template" look through **tonal depth and atmospheric layering.** By utilizing intentional asymmetry—such as placing high-density data visualizations against expansive, breathing negative space—we create a premium, editorial feel that prioritizes focus over clutter. This is not just a tracker; it is a sophisticated financial dashboard that feels high-end, intentional, and calm.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep obsidian tones (`#0e0e0e`), punctuated by high-chroma signals for financial health.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be achieved through:
- **Background Shifts:** Placing a `surface-container-low` component on a `surface` background.
- **Tonal Transitions:** Using the `surface-container` tiers to imply hierarchy.
- **Shadow Depth:** Using diffused ambient shadows rather than structural lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of frosted glass.
*   **Base Layer:** `surface` (#0e0e0e) for the global background.
*   **Secondary Content:** `surface-container` (#1a1a1a) for sidebar or secondary navigation.
*   **Primary Cards:** `surface-container-high` (#20201f) for main content blocks.
*   **Interactive Elements:** `surface-container-highest` (#262626) for active or elevated states.

### The "Glass & Gradient" Rule
To achieve the signature "Glassmorphism" look, floating elements (Modals, Hover Cards) must use semi-transparent variants of `surface-variant` with a **Backdrop Blur of 20px to 40px**. 
*   **Signature Textures:** For high-impact CTAs or Hero sections, use a subtle linear gradient transitioning from `primary` (#68d3ff) to `primary-container` (#00c8fe) at a 135-degree angle. This provides a "soul" to the UI that flat colors cannot replicate.

---

## 3. Typography: Editorial Precision
The system pairs **Manrope** (Display/Headlines) with **Inter** (Body/UI) to balance character with legibility.

*   **Display & Headlines (Manrope):** These are your "Editorial" voices. Use `display-lg` (3.5rem) for total balance overviews to create a sense of scale and authority. The geometric nature of Manrope feels modern and engineered.
*   **Body & Labels (Inter):** All transactional data, merchant names, and timestamps use Inter. It is the "Workhorse." Use `body-md` (0.875rem) for standard lists to maintain a high information density without sacrificing clarity.
*   **Hierarchy:** Use `on-surface-variant` (#adaaaa) for secondary metadata (like dates) to create a clear visual "step down" from the primary `on-surface` (#ffffff) titles.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are too heavy for this aesthetic. We use **Ambient Atmosphere.**

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` (#000000) transaction card sitting on a `surface-container-low` (#131313) feed creates a natural "recessed" look without a single shadow.
*   **Ambient Shadows:** For floating elements (e.g., a "New Transaction" FAB), use an extra-diffused shadow: `Y: 20px, Blur: 40px, Color: on-surface (Opacity 6%)`.
*   **The "Ghost Border":** If a container requires more definition for accessibility, use the `outline-variant` (#484847) at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism Depth:** Elements using `surface-tint` or translucent `surface-variant` must always include a `backdrop-filter: blur(12px)`. This "grounds" the element into the UI by bleeding the background colors through.

---

## 5. Components & Implementation

### Buttons
*   **Primary:** Uses a vibrant `primary` (#68d3ff) fill. Corner radius must be `full` (9999px) to contrast against the `xl` (1.5rem) radius of cards.
*   **Secondary (Glass):** A translucent `surface-variant` fill with `backdrop-blur`. No border.
*   **Tertiary:** Text-only using `primary` color, reserved for low-priority actions like "View All."

### Transaction Cards & Lists
*   **Constraint:** **Forbid the use of divider lines.**
*   **Implementation:** Separate transactions using the `2` spacing scale (0.5rem) of vertical white space. Use a `surface-container-low` background on hover to indicate interactivity.
*   **Signals:** 
    *   **Income:** Use `secondary` (#6ffb85) for the amount text.
    *   **Expense:** Use `error` (#ff716c) or `tertiary` (#ff7162) for the amount text.

### Input Fields
*   **Style:** Minimalist. No bottom line or full border. Use a `surface-container-highest` (#262626) background with an `xl` (1.5rem) corner radius. 
*   **Focus State:** Transition the background to a subtle gradient or increase the opacity of the `ghost border`.

### Floating Action Button (FAB)
*   The centerpiece of the tracker. Use `primary_container` (#00c8fe) with a high-diffusion shadow to make it appear as if it’s hovering significantly above the glass plane.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use `xl` (1.5rem) rounded corners for main dashboard cards to create a soft, friendly "gadget" feel.
*   **Do** use `spacing-12` and `spacing-16` for page gutters to create an "expensive" sense of space.
*   **Do** leverage the `secondary_dim` (#60ec79) for subtle success states or progress bars.

### Don’t
*   **Don’t** use pure black (#000000) for text. Always use `on-surface` (#ffffff) or `on-surface-variant` (#adaaaa).
*   **Don’t** use 100% opaque borders. They break the "frosted glass" illusion.
*   **Don’t** crowd the screen. If the data is dense, increase the `surface-container` tiers to separate the information clusters rather than adding lines or boxes.
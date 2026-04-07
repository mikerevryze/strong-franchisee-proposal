# Revryze x Scenthound Pilot Proposal - Design Guidelines

## Design Approach
**Reference-Based**: Drawing from enterprise SaaS platforms (Linear, Stripe Dashboard, Vercel) and professional B2B presentation tools. This is a high-stakes sales proposal requiring credibility, clarity, and visual impact.

## Core Design Principles
1. **Dark Authority**: Premium dark interface communicating technical sophistication
2. **Data-Driven Narrative**: Charts and metrics as primary storytelling tools
3. **Binary Contrast**: Sharp visual distinction between failure (red) and success (cyan)
4. **Executive Confidence**: Bold typography, generous spacing, zero ambiguity

---

## Typography System

**Font Family**: Inter (Google Fonts)
- Weights: 300 (Light), 400 (Regular), 600 (Semibold), 700 (Bold), 800 (Extrabold)

**Hierarchy**:
- H1 Hero: 5xl-8xl (80-96px), font-black, tracking-tighter, leading-none
- H2 Section: 3xl-5xl (36-48px), font-extrabold, tracking-tight
- H3 Card Header: 2xl (24px), font-bold, italic for emphasis
- Body Large: xl-2xl (20-24px), font-light for hero subtext
- Body: sm-base (14-16px), regular weight
- Labels: xs (12px), uppercase, tracking-widest, font-bold

---

## Color Palette

**Base**:
- Background: #0a0a0a (near-black)
- Surface: #171717 (neutral-900)
- Border: #262626 (neutral-800)
- Border Hover: #404040 (neutral-700)

**Brand**:
- Primary (Revryze): #00AEEF (cyan)
- Alert/Failure: #ef4444 (red-500)
- Success: #00AEEF (same as primary)

**Text**:
- Primary: #ffffff (white)
- Secondary: #9ca3af (gray-400)
- Muted: #6b7280 (gray-500)
- Disabled: #4b5563 (gray-600)

**Gradients**:
- Hero Radial: from-[#00AEEF15] via-transparent to-transparent
- Text Gradient: from-white via-white to-neutral-500

---

## Layout System

**Spacing Primitives**: Tailwind units of 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32
- Micro spacing: 1-2 (badges, inline elements)
- Component padding: 4-6 (cards, buttons)
- Section padding: 20-24 vertical, 4 horizontal
- Section margins: 12-16 between major elements

**Container Strategy**:
- Max-width: 4xl (896px) for calculators, 5xl (1024px) for charts, 6xl (1152px) for general content
- Responsive padding: px-4 mobile, increases on larger screens

**Grid Patterns**:
- Two-column comparison: md:grid-cols-2 with gap-8
- Three-column ROI stats: grid-cols-3 with gap-4
- Chart layouts: lg:grid-cols-3 for sidebar + 2-col chart

---

## Component Library

### Cards
- Background: neutral-900 (#171717)
- Border: 1px neutral-800, rounded-2xl
- Padding: p-6 (24px) standard, p-10 (40px) for emphasis
- Hover: border-neutral-700 transition
- Group hover effects for icon opacity changes

### Buttons
**Primary CTA**:
- Background: #00AEEF (solid)
- Text: black (high contrast)
- Padding: px-8 py-4
- Border-radius: rounded-full
- Hover: scale-105 transform
- Icon: ChevronRight/ArrowRight at 20px

**Secondary**:
- Background: white/5 with border white/10
- Text: white
- Hover: bg-white/10

**Toggle Group**:
- Container: neutral-900 with border, rounded-full
- Active state: full background color (red-500 or #00AEEF)
- Inactive: text-gray-500 hover text-gray-300

### Badges
- Inline-flex with gap-2
- Border: neutral-800, bg: neutral-900/50
- Padding: px-3 py-1, rounded-full
- Icon + text at 16px/sm size

### Data Visualization
**Charts** (Recharts):
- Horizontal bar charts for funnels
- Opacity gradient: 1.0 → 0.8 → 0.6 for depth
- Grid: strokeDasharray 3-3, stroke #333, horizontal-false
- Labels: right position, white, bold
- Bar radius: [0, 4, 4, 0] (right-side rounded)
- Color: Dynamic based on model (#00AEEF or #ef4444)

**Stat Cards**:
- 2xl-4xl for numbers, font-mono
- Color coding: cyan for success, red for failure
- Small labels: xs, uppercase, tracking-widest
- Icon + checkmark/X for status

### Icons
- Library: Lucide React
- Sizes: 16-18px inline, 20px buttons, 80px decorative backgrounds
- Opacity: 10-20% for background decoration
- Color: Semantic (red for alerts, cyan for success)

---

## Interaction Patterns

**Hover States**:
- Cards: border color shift (neutral-800 → neutral-700)
- Buttons: scale transform or background opacity change
- Toggle: text color change (gray-500 → gray-300)

**Transitions**: All interactive elements use transition-all or transition-colors

**Scroll Behavior**: smooth scrolling enabled globally

**Selection**: Custom selection color (#00AEEF background, white text)

---

## Scrollbar Customization
- Width: 8px
- Track: #0f172a (slate-900)
- Thumb: #334155 (slate-700), rounded-4px
- Thumb hover: #00AEEF (brand color)

---

## Images
**No hero image required** - This is a data-driven proposal app relying on typography and charts for impact. Background uses radial gradient overlay instead.

**Icon Strategy**: All icons via Lucide React library - no custom SVGs needed.

---

## Accessibility
- High contrast ratios (white on dark backgrounds)
- Semantic color coding (red = failure, cyan = success)
- Clear visual hierarchy through size and weight
- Keyboard navigation implicit in React component structure

---

## Key Visual Techniques
1. **Glow Effects**: Subtle radial gradients for emphasis zones
2. **Layering**: Absolute positioned decorative icons at low opacity
3. **Depth Through Opacity**: Graduated opacity in charts and stacked elements
4. **Monospace for Numbers**: Font-mono for all numerical data
5. **Italics for Quotes**: Emphasize key phrases in comparison cards
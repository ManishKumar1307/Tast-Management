# Design System Guide

## Premium Color Palette

### Primary Brand Color
- **Name**: Primary Blue
- **Primary**: `#5573b4`
- **Lighter shades**: `#8ca7d2`, `#d4e1f0`
- **Darker shades**: `#4563a3`, `#2d3970`
- **Usage**: Main buttons, links, headers, primary CTAs

### Accent Color
- **Name**: Accent Purple
- **Primary**: `#a855f7`
- **Lighter shades**: `#d8b4fe`, `#f3e8ff`
- **Darker shades**: `#9333ea`, `#581c87`
- **Usage**: Highlights, secondary buttons, badges

### Neutral Palette (Slate)
- **50**: `#f8fafc` - Very light backgrounds
- **100**: `#f1f5f9` - Light backgrounds
- **200**: `#e2e8f0` - Borders, dividers
- **300**: `#cbd5e1` - Secondary borders
- **400**: `#94a3b8` - Secondary text
- **500**: `#64748b` - Muted text
- **600**: `#475569` - Secondary text
- **700**: `#334155` - Primary text
- **800**: `#1e293b` - Dark text
- **900**: `#0f172a` - Very dark backgrounds

### Status Colors
- **Completed**: Green (`#10b981`)
- **In Progress**: Blue (`#3b82f6`)
- **Pending**: Slate (`#64748b`)
- **Overdue**: Red (`#ef4444`)

### Semantic Colors
- **Success**: Green (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Error**: Red (`#ef4444`)
- **Info**: Blue (`#3b82f6`)

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
```

### Font Sizes & Weights

| Component | Size | Weight | Line Height |
|-----------|------|--------|-------------|
| H1 | 36px | 700 | 1.2 |
| H2 | 28px | 700 | 1.3 |
| H3 | 24px | 600 | 1.3 |
| Body Large | 18px | 400 | 1.6 |
| Body Normal | 16px | 400 | 1.5 |
| Body Small | 14px | 400 | 1.5 |
| Caption | 12px | 500 | 1.4 |

### Usage Examples

```html
<!-- H1 -->
<h1 class="text-5xl md:text-6xl font-bold text-slate-900">
  My Tasks
</h1>

<!-- Button Text -->
<button class="text-base font-medium text-white">
  Click Me
</button>

<!-- Label -->
<label class="text-sm font-medium text-slate-700">
  Title
</label>

<!-- Caption -->
<p class="text-xs text-slate-500">
  Created: Dec 1, 2024
</p>
```

## Spacing System

Based on 4px base unit:

| Value | Size |
|-------|------|
| 0 | 0 |
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 6 | 24px |
| 8 | 32px |
| 12 | 48px |
| 16 | 64px |
| 20 | 80px |

### Usage

```html
<!-- Padding -->
<div class="p-4">Content with padding</div>
<div class="px-6 py-4">Horizontal and vertical padding</div>

<!-- Margin -->
<div class="m-4">Content with margin</div>
<div class="mt-8 mb-4">Top margin and bottom margin</div>

<!-- Gap -->
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Shadows

### Shadow Variants

```css
shadow-card: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
shadow-card-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
shadow-hover: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

### Usage

```html
<!-- Card with subtle shadow -->
<div class="bg-white rounded-lg shadow-card p-4">
  Card content
</div>

<!-- Card with larger shadow (hover state) -->
<div class="bg-white rounded-lg shadow-card-lg p-4 hover:shadow-hover transition-shadow">
  Hoverable card
</div>
```

## Rounded Corners

| Class | Value |
|-------|-------|
| rounded-none | 0 |
| rounded-sm | 2px |
| rounded | 4px |
| rounded-md | 6px |
| rounded-lg | 8px |
| rounded-xl | 12px |
| rounded-2xl | 16px |
| rounded-full | 9999px |

### Usage

```html
<!-- Standard card -->
<div class="rounded-lg">Card</div>

<!-- Fully rounded button -->
<button class="rounded-full">Full Round</button>

<!-- Slightly rounded input -->
<input class="rounded-md" />
```

## Border Styles

### Width

| Class | Width |
|-------|-------|
| border | 1px |
| border-2 | 2px |
| border-4 | 4px |
| border-8 | 8px |

### Border Colors

```html
<!-- Slate border -->
<div class="border border-slate-200">Content</div>

<!-- Primary border -->
<div class="border border-primary-300">Content</div>

<!-- Error border -->
<div class="border border-red-300">Content</div>
```

## Component Styles

### Buttons

```html
<!-- Primary Button -->
<button class="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
  Primary
</button>

<!-- Secondary Button -->
<button class="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg font-medium hover:bg-slate-300 transition-colors">
  Secondary
</button>

<!-- Outline Button -->
<button class="px-4 py-2 border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors">
  Outline
</button>

<!-- Danger Button -->
<button class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
  Delete
</button>
```

### Input Fields

```html
<!-- Default State -->
<input class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />

<!-- Error State -->
<input class="w-full px-4 py-2.5 border border-red-300 bg-red-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />

<!-- With Label -->
<div>
  <label class="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
  <input class="w-full px-4 py-2.5 border border-slate-300 rounded-lg" />
</div>
```

### Cards

```html
<!-- Standard Card -->
<div class="bg-white border border-slate-200 rounded-lg p-5 shadow-card hover:shadow-card-lg transition-shadow">
  <h3 class="text-lg font-semibold text-slate-900 mb-2">Card Title</h3>
  <p class="text-slate-600">Card content</p>
</div>
```

### Badges

```html
<!-- Priority Badge -->
<span class="inline-block px-3 py-1 text-xs font-medium rounded border bg-accent-100 text-accent-700 border-accent-200">
  Medium
</span>

<!-- Status Badge -->
<span class="inline-block px-3 py-1 text-xs font-medium rounded border bg-green-100 text-green-700 border-green-200">
  Completed
</span>
```

## Animations

### Transition Utilities

```html
<!-- Color transition -->
<button class="hover:bg-primary-700 transition-colors">Hover me</button>

<!-- Shadow transition -->
<div class="hover:shadow-lg transition-shadow">Hover me</div>

<!-- All transitions -->
<div class="hover:scale-105 transition-all">Hover me</div>
```

### Custom Animations

```css
/* Fade In */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
```

### Usage

```html
<!-- Fade in animation -->
<div class="animate-fade-in">Content</div>

<!-- Slide up animation -->
<div class="animate-slide-up">Content</div>
```

## Responsive Design Breakpoints

| Breakpoint | Min-width |
|------------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

### Usage

```html
<!-- Mobile: 100%, Tablet: 50%, Desktop: 25% -->
<div class="w-full md:w-1/2 lg:w-1/4">Content</div>

<!-- Show only on mobile -->
<div class="md:hidden">Mobile only</div>

<!-- Show only on tablet and above -->
<div class="hidden md:block">Tablet and above</div>

<!-- Stack on mobile, grid on desktop -->
<div class="flex flex-col md:grid md:grid-cols-2 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

## Accessibility

### Color Contrast

- **Primary text on white**: 12:1 contrast ratio (AAA)
- **Secondary text on white**: 7.5:1 contrast ratio (AA)
- **Links**: Underline in addition to color
- **Buttons**: Sufficient padding for touch targets (min 44x44px)

### Keyboard Navigation

- All interactive elements are focusable
- Focus rings visible: `focus:ring-2 focus:ring-primary-500`
- Tab order follows visual order

### ARIA Labels

```html
<!-- Icon button -->
<button aria-label="Delete task">
  Delete
</button>

<!-- Icon only -->
<button aria-label="Search">
  <svg>...</svg>
</button>

<!-- Loading state -->
<button disabled aria-busy="true">
  Loading...
</button>
```

## Dark Mode (Future)

The design system is prepared for dark mode support:

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #0f172a; /* slate-900 */
    color: #f1f5f9; /* slate-100 */
  }
}
```

## Implementation Notes

1. **Use Tailwind Classes**: Always prefer Tailwind utility classes over inline styles
2. **Consistent Spacing**: Use the spacing scale consistently
3. **Color Variables**: Import custom colors from Tailwind config
4. **Responsive First**: Mobile-first approach, then use `md:`, `lg:` modifiers
5. **Performance**: Tailwind CSS automatically purges unused styles

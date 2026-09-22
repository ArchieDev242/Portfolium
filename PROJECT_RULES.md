# Coding Conventions — Portfolium

Derived from the existing codebase. Follow these rules exactly when writing
or editing any `.jsx`, `.js`, or `.css` file in this project.

---

## General

- **Language**: JavaScript (not TypeScript). No `.ts` or `.tsx` files.
- **Quotes**: single quotes `'...'` in JS/JSX logic; double quotes `"..."` inside
  JSX attribute strings and `"use client"` directives.
- **Semicolons**: always present.
- **Indentation**: 2 spaces in JSX/JS files; 4 spaces in CSS files.

---

## Naming

### Variables, functions, hooks, state setters — `snake_case`

```js
const is_open = false;
const [current_color, set_current_color] = useState("green");
const handle_color_change = (color) => { ... };
const update_theme_colors = (color) => { ... };
const compress_image = (file, max_width, quality) => { ... };
```

### React component functions — `PascalCase`

```jsx
const Background = () => { ... };
const Windows98Window = ({ title, onClose }) => { ... };
```

### Exported default that is a component — `PascalCase` for the name and the export

```jsx
const AddProjectModal = ({ onClose }) => { ... };
export default AddProjectModal;
```

### Constants (module-level, frozen) — `SCREAMING_SNAKE_CASE`

```js
const PARTICLE_COUNT = 18;
const EMPTY_FORM = { ... };
const ORB_CONFIG = [ ... ];
```

### CSS class names — `kebab-case`

```css
.bg-accent-orb { ... }
.flash-animation { ... }
.win98-container { ... }
```

### Object property keys in JS data — `snake_case` for multi-word

```js
const EMPTY_FORM = {
  full_description: '',
  slug_touched: false,
};
```

---

## JSX

### `className` — space before and after `=`, value in double quotes

```jsx
<div className = "fixed inset-0 -z-10 overflow-hidden">
<button className = "text-white/50 hover:text-white">
```

Always a space on both sides of `=` for JSX props.

### Event handlers — space around `=`

```jsx
onClick = {onClose}
onChange = {update_field('title')}
onMouseDown = {handle_mouse_down}
```

### Multi-prop elements — one prop per line, closing `>` on its own line

```jsx
<motion.div
  initial = {{ opacity: 0 }}
  animate = {{ opacity: 1 }}
  exit = {{ opacity: 0 }}
  className = "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
  onClick = {onClose}
>
```

### Self-closing — space before `/>`

```jsx
<div className = "absolute inset-0 bg-aurora" />
```

### Conditional rendering — ternary for inline, `&&` for guard

```jsx
{!snippet ? (
  <form onSubmit = {handle_submit}>...</form>
) : (
  <div>...</div>
)}

{is_open && (
  <motion.div>...</motion.div>
)}
```

### Comments in JSX — `{/* comment */}` on its own line

```jsx
{/* Title Bar */}
<div className = "title-bar">
```

---

## Control Flow

### `if` — Allman style: brace on new line, no space between `if` and `(`

```js
if(condition)
{
  doSomething();
}
```

### `if / else`

```js
if(is_maximized)
{
  setIsMaximized(false);
  setPosition(previous_position);
} else
{
  setPreviousPosition(position);
  setIsMaximized(true);
}
```

### `try / catch / finally`

```js
try
{
  const blob = await compress_image(files[i]);
} catch(err)
{
  alert(`Image processing failed: ${err.message}`);
} finally
{
  set_is_processing(false);
}
```

### `for` loops — same brace style

```js
for(let i = 0; i < files.length; i++)
{
  const blob = await compress_image(files[i]);
}
```

### Single-line guard — no braces, body on same line

```js
if(!form.title || !form.slug) return;
if(e.target.closest('button')) return;
```

---

## Functions

### Arrow functions

```js
// Short single-expression — inline, no braces
const slugify = (title) => title
  .toLowerCase()
  .trim();

// Multi-line — braces on same line as arrow
const compress_image = (file, max_width = 1600, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    ...
  });
};

// One-liner handler — braces on same line
const handle_slug_change = (e) => { set_form((prev) => ({ ...prev, slug: e.target.value })); };
```

### Curried event handler pattern

```js
const update_field = (field) => (e) => {
  const value = e.target.value;
  set_form((prev) => ({ ...prev, [field]: value }));
};
```

---

## Imports

Order within a file:

1. `"use client";` directive (if needed) — top line, double quotes
2. React imports
3. Third-party libraries (framer-motion, react-icons, next/...)
4. Internal components (`@/components/...`)
5. Internal hooks / lib / data

```jsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

import Header from '@/components/Header';
import { getProjectBySlug } from '@/data/projects';
```

---

## CSS

### Selector + opening brace — brace on **next line**

```css
.win98-container
{
    display: flex;
    flex-direction: column;
}
```

### Single-rule class — can go on one line

```css
.bg-vignette { background: radial-gradient(...); }
.circuit-line { animation: circuitPulse 2s ease-in-out infinite; }
```

### `@keyframes` — brace on next line; single-property stops on one line

```css
@keyframes bg-grid-pulse
{
  0%, 100% { opacity: 0.04; }
  50% { opacity: 0.07; }
}
```

Multi-property keyframe blocks expand fully:

```css
@keyframes matrixFall
{
    0%
    {
        transform: translateY(-100vh);
        opacity: 1;
    }

    100%
    {
        transform: translateY(100vh);
        opacity: 0;
    }
}
```

### Multi-value properties — continuation indented

```css
font-family:
    "Fixedsys Excelsior", "Lucida Console", Consolas, "Courier New",
    monospace !important;

background:
    radial-gradient(ellipse 80% 50% at 50% 0%, var(--accent-bg) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 100% 50%, var(--accent-shadow) 0%, transparent 50%);
```

### CSS custom properties — `--kebab-case`

```css
:root
{
  --accent-default: #06b6d4;
  --accent-shadow: rgba(6, 182, 212, 0.7);
  --accent-bg: rgba(6, 182, 212, 0.12);
}
```

### `@layer` blocks — brace on next line

```css
@layer base
{
  body { @apply font-primary bg-primary text-white leading-loose; }
}

@layer utilities
{
  .flash-animation
  {
    position: relative;
    overflow: hidden;
  }
}
```

### Tailwind `@apply` — inline for single-utility classes

```css
.h2 { @apply text-3xl font-bold leading-tight; }
```

Use real CSS properties for multi-property rules instead of long `@apply` chains.

---

## Component File Template

```jsx
"use client";

import { useState } from 'react';
// other imports...

// module-level constants
const SOME_CONSTANT = 42;

// pure helpers
const helper_fn = (arg) => { ... };

const MyComponent = ({ prop_one, prop_two = 'default' }) => {
  const [some_state, set_some_state] = useState(null);

  const handle_action = (e) => {
    e.preventDefault();
    if(!prop_one) return;
    set_some_state(prop_one);
  };

  return (
    <div className = "container mx-auto">
      {/* Section comment */}
      <button onClick = {handle_action} className = "px-4 py-2">
        Click me
      </button>
    </div>
  );
};

export default MyComponent;
```

---

## Common Patterns

### State — snake_case names, `set_` prefix

```js
const [is_loading, set_is_loading] = useState(true);
const [is_processing, set_is_processing] = useState(false);
const [current_color, set_current_color] = useState('green');
```

### `useEffect` — always explicit dependency array

```js
useEffect(() => {
  fetchLanguages();
}, [username, maxRepos]);
```

### `useMemo` for derived data

```js
const particles = useMemo(() =>
  Array.from({ length: COUNT }, (_, i) => ({ ... })),
[]);
```

### Inline style objects — double braces, camelCase keys

```jsx
style = {{ backgroundColor: color.value, imageRendering: 'pixelated' }}
```

### Conditional className — template literal with `${}`

```jsx
className = {`capitalize font-medium hover:text-accent-hover ${isActive ? "text-accent-default" : ""}`}
```
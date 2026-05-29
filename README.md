# my-winder 🍵

> utility-first CSS-in-JS for the browser — zero dependencies, no build step, no bundler.

my-winder lets you style HTML elements using `my-` prefixed class names. It works by querying every element that has a `my-*` class and applying styles directly via `element.style.*` — no stylesheet is generated, no build tool is needed.

---

## Installation

### npm

```bash
npm install my-winder
```

Then call it in your JS entry point:

```js
import { applyMyStyles } from "my-winder";

applyMyStyles();
```

**Auto-initialize (npm)** — import as a side-effect and skip the function call entirely:

```js
import "my-winder/auto";
```

### CDN / esm.sh

```html
<script type="module">
  import { applyMyStyles } from "https://esm.sh/my-winder@1.1.7";
  applyMyStyles();
</script>
```

**Auto-initialize (CDN)** — no function call needed:

```html
<script type="module" src="https://esm.sh/my-winder@1.1.7/auto"></script>
```

---

## Quick start

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
  <div class="my-bg-22c55e my-text-white my-p-24 my-rounded-8 my-fw-700 my-f-20">
    Hello, my-winder 🍵
  </div>

  <script type="module">
    import { applyMyStyles } from "https://esm.sh/my-winder@1.1.7";
    applyMyStyles();
  </script>
</body>
</html>
```

`applyMyStyles()` immediately scans the document for every element with a `my-*` class and applies styles directly via `element.style.*`. It then attaches a `MutationObserver` so any classes added dynamically (via JS, frameworks, HTMX, etc.) are picked up automatically.

---

## API

### `applyMyStyles(root?)`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `root` | `Document \| Element` | `document` | The root to scan and observe. Pass a shadow root or sub-tree to scope the parser. |

**Returns** the `MutationObserver` instance — call `.disconnect()` to stop observing:

```js
const observer = applyMyStyles();

// later, stop watching for new classes:
observer.disconnect();
```

**Scoping to a sub-tree:**

```js
const shadow = myEl.attachShadow({ mode: "open" });
applyMyStyles(shadow);
```

---

## How it works

Every `my-*` class follows this pattern:

```
my - {key} - {value}
```

| Part | Example | Meaning |
|---|---|---|
| `my` | — | required prefix |
| `{key}` | `bg` | the CSS property group |
| `{value}` | `22c55e` | the value to apply |

The class is split on `-`, the first segment (`my`) is dropped, then the key routes to a CSS property and the value is formatted (adding `px`, `#`, etc.) before being set as an inline style.

**Parsing examples:**

```
"my-bg-22c55e"
  split("-") → ["my", "bg", "22c55e"]
  key        → "bg"
  value      → "22c55e"
  result     → element.style.backgroundColor = "#22c55e"
```

```
"my-transition-all-0.3-ease-in-out"
  split("-") → ["my", "transition", "all", "0.3", "ease", "in", "out"]
  key        → "transition"
  property   → "all"
  duration   → "0.3" → "0.3s"
  timing     → ["ease", "in", "out"].join("-") → "ease-in-out"
  result     → element.style.transition = "all 0.3s ease-in-out"
```

---

## Class reference

### Background color

```
my-bg-{name}     → named color  (black white red green blue yellow purple orange pink gray silver)
my-bg-{hex}      → hex color without #  (e.g. my-bg-22c55e → background-color: #22c55e)
```

```html
<div class="my-bg-22c55e">green background</div>
<div class="my-bg-red">named red</div>
```

---

### Text color & alignment & transform

```
my-text-{name}         → color: {named color}
my-text-{hex}          → color: #{hex}
my-text-center         → text-align: center
my-text-left           → text-align: left
my-text-right          → text-align: right
my-text-justify        → text-align: justify
my-text-uppercase      → text-transform: uppercase
my-text-lowercase      → text-transform: lowercase
my-text-capitalize     → text-transform: capitalize
```

```html
<p class="my-text-22c55e my-text-center my-text-uppercase">my-winder</p>
```

---

### Font size & weight

```
my-f-{n}      → font-size: {n}px   (or pass a CSS keyword like "inherit")
my-fw-{n}     → font-weight: {n}   (100 200 300 400 500 600 700 800 900)
```

```html
<h1 class="my-f-56 my-fw-700">Big bold heading</h1>
<p  class="my-f-16 my-fw-400">Normal body text</p>
```

---

### Opacity

```
my-op-{n}   → opacity: {n}   (0 to 1, decimals supported)
```

```html
<div class="my-op-0.5">50% opacity</div>
<div class="my-op-0.1">very faint</div>
```

---

### Display

```
my-dp-flex          → display: flex
my-dp-grid          → display: grid
my-dp-block         → display: block
my-dp-inline        → display: inline
my-dp-inline-block  → display: inline-block
my-dp-none          → display: none
```

---

### Width & height

```
my-w-{n}      → width: {n}px      (or CSS keyword e.g. my-w-full → width: full)
my-h-{n}      → height: {n}px
my-wmin-{n}   → min-width: {n}px
my-wmax-{n}   → max-width: {n}px
my-hmin-{n}   → min-height: {n}px
my-hmax-{n}   → max-height: {n}px
```

```html
<div class="my-w-320 my-h-200 my-wmax-640">sized box</div>
```

> **Centering pattern** — combine `my-wmax-1280` with `my-mx-auto` to create a centered content wrapper.

---

### Padding

```
my-p-{n}    → padding: {n}px          (all sides)
my-pt-{n}   → padding-top: {n}px
my-pr-{n}   → padding-right: {n}px
my-pb-{n}   → padding-bottom: {n}px
my-pl-{n}   → padding-left: {n}px
```

```html
<div class="my-p-24">even padding all sides</div>
<div class="my-pt-8 my-pb-8 my-pl-16 my-pr-16">pill padding</div>
```

---

### Margin

```
my-m-{n}     → margin: {n}px
my-m-auto    → margin: auto
my-mt-{n}    → margin-top: {n}px
my-mr-{n}    → margin-right: {n}px
my-mb-{n}    → margin-bottom: {n}px
my-ml-{n}    → margin-left: {n}px
my-mx-{n}    → margin-left: {n}px + margin-right: {n}px
my-mx-auto   → margin-left: auto; margin-right: auto    ← center a block
my-my-{n}    → margin-top: {n}px + margin-bottom: {n}px
```

```html
<!-- center a max-width wrapper -->
<div class="my-wmax-1280 my-mx-auto">centered content</div>

<!-- vertical spacing -->
<p class="my-mb-24">paragraph with bottom margin</p>
```

---

### Gap (flex & grid)

```
my-g-{n}   → row-gap: {n}px; column-gap: {n}px
```

```html
<div class="my-dp-flex my-g-16">
  <div>A</div>
  <div>B</div>
</div>
```

---

### Flexbox

**Direction**

```
my-flex-row       → flex-direction: row
my-flex-col       → flex-direction: column
my-flex-row-rev   → flex-direction: row-reverse
my-flex-col-rev   → flex-direction: column-reverse
```

**Justify content** (main axis)

```
my-justify-start    → justify-content: start
my-justify-center   → justify-content: center
my-justify-end      → justify-content: end
my-justify-between  → justify-content: space-between
my-justify-around   → justify-content: space-around
my-justify-evenly   → justify-content: space-evenly
```

**Align items** (cross axis, single row)

```
my-items-start    → align-items: flex-start
my-items-center   → align-items: center
my-items-end      → align-items: flex-end
my-items-stretch  → align-items: stretch
```

**Align content** (cross axis, multi-row — requires flex-wrap)

```
my-align-start    → align-content: flex-start
my-align-center   → align-content: center
my-align-end      → align-content: flex-end
my-align-stretch  → align-content: stretch
my-align-between  → align-content: space-between
my-align-around   → align-content: space-around
my-align-evenly   → align-content: space-evenly
```

```html
<div class="my-dp-flex my-flex-row my-justify-between my-items-center my-g-16">
  <span>left</span>
  <span>right</span>
</div>
```

---

### Grid

```
my-cols-{n}   → grid-template-columns: repeat({n}, 1fr)
my-rows-{n}   → grid-template-rows: repeat({n}, 1fr)
```

```html
<div class="my-dp-grid my-cols-3 my-g-12">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

---

### Border

```
my-border-{width}-{color}             → {width}px solid {color}
my-border-{width}-{color}-dashed      → {width}px dashed {color}
my-border-{width}-{color}-dotted      → {width}px dotted {color}
```

Color can be a named color or a hex without `#`.

```html
<div class="my-border-1-22c55e">1px solid green border</div>
<div class="my-border-2-fb7185-dashed">2px dashed red border</div>
<div class="my-border-2-a78bfa-dotted">2px dotted purple border</div>
```

---

### Border radius

```
my-rounded-{n}    → border-radius: {n}px  (applied to all 4 corners)
my-rounded-999    → pill shape  (use a large number)
```

```html
<div class="my-rounded-8">slightly rounded</div>
<div class="my-rounded-12">rounder card</div>
<span class="my-rounded-999">pill badge</span>
```

---

### Position

```
my-fix-rel     → position: relative
my-fix-abs     → position: absolute
my-fix-fixed   → position: fixed
my-fix-sticky  → position: sticky
```

**Offsets** (all in px)

```
my-t-{n}   → top: {n}px
my-r-{n}   → right: {n}px
my-b-{n}   → bottom: {n}px
my-l-{n}   → left: {n}px
my-z-{n}   → z-index: {n}
```

```html
<!-- fixed header -->
<nav class="my-fix-fixed my-t-0 my-l-0 my-r-0 my-z-999">...</nav>

<!-- absolute badge -->
<div class="my-fix-rel">
  <span class="my-fix-abs my-t-8 my-r-8">badge</span>
</div>
```

---

### Overflow

```
my-ovr-hidden    → overflow: hidden
my-ovr-auto      → overflow: auto
my-ovr-scroll    → overflow: scroll
my-ovr-x-auto    → overflow-x: auto
my-ovr-x-hidden  → overflow-x: hidden
my-ovr-y-auto    → overflow-y: auto
my-ovr-y-hidden  → overflow-y: hidden
```

---

### Transforms

Each transform key sets `element.style.transform` directly.

```
my-scale-{n}       → transform: scale({n})
my-rotate-{deg}    → transform: rotate({deg})       e.g. my-rotate-45deg
my-tX-{n}          → transform: translateX({n}px)
my-tY-{n}          → transform: translateY({n}px)
```

```html
<div class="my-scale-1.2">scaled up 20%</div>
<div class="my-rotate-45deg">45° rotated</div>
<div class="my-tX-24">shifted 24px right</div>
<div class="my-tY-16">shifted 16px down</div>
```

> **Note** — only one transform can be active at a time since each overwrites `style.transform`. Combine transforms in a single inline `style=""` if needed.

---

### Transition

```
my-transition-{property}-{duration}-{timing}
```

| Segment | Default | Examples |
|---|---|---|
| property | `all` | `opacity`, `transform`, `color` |
| duration | `0.2` | `0.3` → `0.3s` · `300ms` → kept as-is |
| timing | `ease` | `ease-in` `ease-out` `ease-in-out` `linear` |

```html
<button class="my-transition-all-0.3-ease">smooth all</button>
<div    class="my-transition-transform-0.5-ease-in-out">transform only</div>
<a      class="my-transition-color-0.18-ease">color fade</a>
```

Pairs perfectly with CSS `:hover` rules:

```css
.my-btn:hover { background-color: #22c55e; }
```

```html
<button class="my-bg-111111 my-transition-all-0.3-ease my-btn">hover me</button>
```

---

### Cursor

```
my-cur-ptr         → cursor: pointer
my-cur-NA          → cursor: not-allowed
my-cur-text        → cursor: text
my-cur-help        → cursor: help
my-cur-move        → cursor: move
my-cur-grab        → cursor: grab
my-cur-crosshair   → cursor: crosshair
my-cur-wait        → cursor: wait
```

---

### Text decoration

```
my-dec-underline-{color}-{width}    → text-decoration: underline {color} {width}px
my-dec-overline-{color}-{width}     → text-decoration: overline  {color} {width}px
my-dec-through-{color}-{width}      → text-decoration: line-through {color} {width}px
```

```html
<span class="my-dec-underline-22c55e-2">green underline</span>
<span class="my-dec-through-red-1">strikethrough</span>
```

---

## Named colors

The following color keywords can be used directly with `my-bg-` and `my-text-`:

```
black   white   red    green   blue
yellow  purple  orange pink    gray   silver
```

Any other color must be written as a hex value without the `#`:

```html
<div class="my-bg-22c55e">  ✓ hex — #22c55e   </div>
<div class="my-bg-green">   ✓ named            </div>
<div class="my-bg-#22c55e"> ✗ do NOT include # </div>
```

---

## Patterns & recipes

### Centered page wrapper

```html
<div class="my-wmax-1280 my-mx-auto my-pl-32 my-pr-32">
  page content
</div>
```

### Fixed nav bar

```html
<nav class="my-fix-fixed my-t-0 my-l-0 my-r-0 my-z-999 my-bg-0a0a0a">
  <div class="my-wmax-1280 my-mx-auto my-dp-flex my-justify-between my-items-center my-pt-14 my-pb-14 my-pl-32 my-pr-32">
    <span class="my-text-22c55e my-fw-700 my-f-18">logo</span>
    <a href="#" class="my-text-555555 my-f-14 my-transition-color-0.18-ease">Link</a>
  </div>
</nav>
```

### Flex card row

```html
<div class="my-dp-flex my-flex-row my-justify-between my-items-center my-g-16 my-p-24 my-bg-111111 my-rounded-12">
  <span class="my-f-16 my-fw-600 my-text-e8e8e8">Card title</span>
  <span class="my-f-13 my-text-555555">metadata</span>
</div>
```

### Responsive grid

```html
<div class="my-dp-grid my-cols-3 my-g-16">
  <div class="my-bg-111111 my-rounded-8 my-p-20">item 1</div>
  <div class="my-bg-111111 my-rounded-8 my-p-20">item 2</div>
  <div class="my-bg-111111 my-rounded-8 my-p-20">item 3</div>
</div>
```

### Pill badge

```html
<span class="my-bg-22c55e my-text-0a0a0a my-f-11 my-fw-700 my-pt-4 my-pb-4 my-pl-12 my-pr-12 my-rounded-999 my-text-uppercase">
  active
</span>
```

### Animated card on hover

```html
<style>
  .card:hover { transform: translateY(-8px); border-color: #22c55e44; }
</style>

<div class="card my-bg-111111 my-border-1-252525 my-rounded-12 my-p-24 my-transition-all-0.3-ease">
  hover me
</div>
```

### Absolute positioning

```html
<div class="my-fix-rel my-bg-161616 my-rounded-8 my-h-120">
  <span class="my-fix-abs my-t-12 my-l-12 my-bg-22c55e my-text-0a0a0a my-f-11 my-fw-700 my-rounded-4 my-pt-4 my-pb-4 my-pl-8 my-pr-8">top-left</span>
  <span class="my-fix-abs my-b-12 my-r-12 my-bg-fb7185 my-text-0a0a0a my-f-11 my-fw-700 my-rounded-4 my-pt-4 my-pb-4 my-pl-8 my-pr-8">bottom-right</span>
</div>
```

### Stop observing (cleanup)

```js
// useful in SPAs or when destroying a component
const observer = applyMyStyles();
// ... later
observer.disconnect();
```

---

## Known limitations

These CSS properties have no my-winder equivalent and require a `<style>` block or inline `style=""`:

| Property | Workaround |
|---|---|
| `font-family` | `style="font-family: ..."` or `body { font-family: ... }` in CSS |
| `line-height` | `style="line-height: ..."` |
| `letter-spacing` | CSS class e.g. `.tracking { letter-spacing: 0.12em }` |
| `flex: 1` | CSS class `.flex-1 { flex: 1 }` |
| `flex-wrap` | CSS class `.flex-wrap { flex-wrap: wrap }` |
| `flex-shrink: 0` | CSS class `.shrink-0 { flex-shrink: 0 }` |
| `border-radius: 50%` | CSS class for circles |
| `:hover` states | CSS hover rules — pair with `my-transition-*` |
| `@keyframes` / animation | CSS keyframes block |
| `backdrop-filter` | Inline `style=""` or CSS class |
| `white-space` | Inline `style=""` |
| `scroll-margin-top` | CSS `section { scroll-margin-top: ... }` |
| Side-specific borders | `style="border-top: ..."` — my-border sets all 4 sides |
| `%` width values | `style="width: 80%"` — my-w only accepts px |
| Combining transforms | `style="transform: scale(1.2) rotate(45deg)"` — my sets one at a time |

---

## Project structure

```
my-winder/
├── demo/
│   └── chaiWind.html   ← full feature showcase
├── src/
│   ├── index.js        ← applyMyStyles() — parser + MutationObserver
│   ├── auto.js         ← side-effect entry: imports and calls applyMyStyles()
│   ├── maps.js         ← all value maps, key lists, color tables
│   └── parser.js       ← core class-parsing logic
├── package.json
└── README.md
```

Package exports:

```json
{
  ".":      "./src/index.js",
  "./auto": "./src/auto.js"
}
```

`maps.js` exports:

| Export | Purpose |
|---|---|
| `valueMaps` | key → CSS property name (or object for multi-value keys) |
| `flexdirection` | flex-direction value map |
| `justifyMap` | justify-content value map |
| `alignMap` | align-content value map |
| `itemsMap` | align-items value map |
| `colors` | named color whitelist |
| `spacingKeys` | keys that route to the spacing branch |
| `positionKeys` | keys that route to the position branch |
| `borderRadiusKeys` | all 4 corner property names |
| `overFlowMap` | overflow value map + x/y keys |
| `keyString` | object-mapped keys → their CSS property name |

---

## Quick-reference cheat sheet

| Category | Class pattern | CSS result |
|---|---|---|
| Background | `my-bg-{hex\|name}` | `background-color` |
| Text color | `my-text-{hex\|name}` | `color` |
| Text align | `my-text-{center\|left\|right\|justify}` | `text-align` |
| Text transform | `my-text-{uppercase\|lowercase\|capitalize}` | `text-transform` |
| Font size | `my-f-{n}` | `font-size: npx` |
| Font weight | `my-fw-{n}` | `font-weight` |
| Opacity | `my-op-{0–1}` | `opacity` |
| Display | `my-dp-{flex\|grid\|block\|inline\|none}` | `display` |
| Width | `my-w-{n}` | `width: npx` |
| Height | `my-h-{n}` | `height: npx` |
| Min/max w | `my-wmin-{n}` · `my-wmax-{n}` | `min/max-width` |
| Min/max h | `my-hmin-{n}` · `my-hmax-{n}` | `min/max-height` |
| Padding | `my-p-{n}` · `my-pt/pr/pb/pl-{n}` | `padding-*` |
| Margin | `my-m-{n}` · `my-mt/mr/mb/ml-{n}` | `margin-*` |
| Margin axis | `my-mx-{n\|auto}` · `my-my-{n}` | `margin-left/right` |
| Gap | `my-g-{n}` | `row-gap` + `column-gap` |
| Flex dir | `my-flex-{row\|col\|row-rev\|col-rev}` | `flex-direction` |
| Justify | `my-justify-{start\|center\|end\|between\|around\|evenly}` | `justify-content` |
| Align items | `my-items-{start\|center\|end\|stretch}` | `align-items` |
| Align content | `my-align-{start\|center\|end\|stretch\|between\|around\|evenly}` | `align-content` |
| Grid cols | `my-cols-{n}` | `grid-template-columns: repeat(n,1fr)` |
| Grid rows | `my-rows-{n}` | `grid-template-rows: repeat(n,1fr)` |
| Border | `my-border-{w}-{color}-{solid\|dashed\|dotted}` | `border` |
| Radius | `my-rounded-{n}` | `border-radius: npx` |
| Position | `my-fix-{rel\|abs\|fixed\|sticky}` | `position` |
| Offsets | `my-t/r/b/l-{n}` | `top/right/bottom/left: npx` |
| Z-index | `my-z-{n}` | `z-index` |
| Overflow | `my-ovr-{hidden\|auto\|scroll}` · `my-ovr-x/y-{hidden\|auto}` | `overflow-*` |
| Scale | `my-scale-{n}` | `transform: scale(n)` |
| Rotate | `my-rotate-{deg}` | `transform: rotate(deg)` |
| TranslateX | `my-tX-{n}` | `transform: translateX(npx)` |
| TranslateY | `my-tY-{n}` | `transform: translateY(npx)` |
| Transition | `my-transition-{prop}-{dur}-{timing}` | `transition` |
| Cursor | `my-cur-{ptr\|NA\|text\|help\|move\|grab\|crosshair\|wait}` | `cursor` |
| Decoration | `my-dec-{underline\|overline\|through}-{color}-{w}` | `text-decoration` |

---

## License

ISC © Janardhan Verma
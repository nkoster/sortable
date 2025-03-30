# sortable-lite

![npm](https://img.shields.io/npm/v/sortable-lite)
![gzip size](https://img.shields.io/bundlephobia/minzip/sortable-lite)
![license](https://img.shields.io/npm/l/sortable-lite)

Lightweight JavaScript module to make any HTML `<table>` sortable by clicking column headers.

- ✅ No dependencies
- ✅ Works with vanilla JS
- ✅ Sorts text and numbers
- ✅ Easily styleable
- ✅ Tiny footprint

[Live demo](https://nkoster.github.io/sortable/example.html)

---

## 🚀 Installation

```bash
npm i sortable-lite
```

## 🧪 Usage

Include CSS for visual indicators.

```js
import 'sortable-lite/sortable-table.css';
```

This adds sort arrows and basic styling. You can override or extend it as needed.

## 🔁 Example HTML

```html
<link rel="stylesheet" href="sortable-table.css" />
<table class="sortable-table">
  <thead>
    <tr>
      <th class="sorted-default">Name</th>
      <th class="sorted-default">Score</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>42</td></tr>
    <tr><td>Bob</td><td>13</td></tr>
    <tr><td>Charlie</td><td>77</td></tr>
  </tbody>
</table>

<script type="module">
  import { makeTableSortable } from 'sortable-lite';
  import 'sortable-lite/sortable-table.css';

  makeTableSortable(document.querySelector('table.sortable-table'), { allowUnsorted: true });
</script>
```

Configuration options:

```javascript
makeTableSortable(document.querySelector('table.sortable-table'), {
  allowUnsorted: true,
  sortStringLocale: 'nl',
  sortStringBase: "base" // Allowed: "base", "accent", "case" and "variant". Check Array.sort() docs.
});
```

## 🔧 Features

- ✅ Clickable headers toggle sort direction: none (configurable) → ascending → descending
- ✅ Works on both string and numeric values
- ✅ Allows for keeping original row order when unsorted (configurable)
- ✅ Locale-aware string sorting (configurable, case-insensitive)
- ✅ Configurable string sorting behavior, "base", "accent", "case" and "variant". Read Array.sort() docs

## 📦 CDN Usage (optional)

Don’t want to install via NPM? Use it via jsDelivr:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sortable-lite/sortable-table.css">
<script type="module">
  import { makeTableSortable } from 'https://cdn.jsdelivr.net/npm/sortable-lite/index.js';
  makeTableSortable(document.querySelector('table.sortable-table'));
</script>
```

## 📜 License

MIT – do whatever you want, just don't remove my name 😉

© Niels Koster

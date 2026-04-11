/* ══════════════════════════════════════════
   products.js — IC Tech World Products Page
   Page-specific JS (requires shared.js)
══════════════════════════════════════════ */

const categories = [
  "All", "Android Box", "Cameras", "CCTV Solution", "Computer",
  "Electric / Solar", "Fiber / Optic Wire", "Mobile Accessories",
  "Network Connector", "Networking Products", "Router / Switch"
];

let activeCat = "All";
let searchQuery = "";

// ── RENDER CATEGORY TABS ─────────────────────────────────
function renderCatTabs() {
  const tabsEl = document.getElementById('catTabs');
  if (!tabsEl) return;
  tabsEl.innerHTML = categories.map(c =>
    `<button class="cat-tab${c === activeCat ? ' active' : ''}" onclick="filterByCat('${c}')">${c}</button>`
  ).join('');
}

// ── FILTER BY CATEGORY ───────────────────────────────────
function filterByCat(cat) {
  activeCat = cat;
  renderCatTabs();
  renderProducts();
}

// ── SEARCH INPUT ─────────────────────────────────────────
function onSearch(val) {
  searchQuery = val.toLowerCase();
  renderProducts();
}

// ── RENDER PRODUCTS ──────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productCount');
  if (!grid) return;

  let filtered = allProducts;

  // Filter by category
  if (activeCat !== "All") {
    filtered = filtered.filter(p => p.cat === activeCat);
  }

  // Filter by search
  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.desc.toLowerCase().includes(searchQuery) ||
      p.cat.toLowerCase().includes(searchQuery)
    );
  }

  // Update count
  if (countEl) {
    countEl.innerHTML = `Showing <span>${filtered.length}</span> product${filtered.length !== 1 ? 's' : ''}`;
  }

  // Render cards or no-results
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results">
      <span>🔍</span>
      <p>No products found for "<strong>${searchQuery || activeCat}</strong>"</p>
    </div>`;
  } else {
    grid.innerHTML = filtered.map(p => productCardHTML(p)).join('');
  }
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCatTabs();
  renderProducts();

  // Search input listener
  const searchEl = document.getElementById('searchInput');
  if (searchEl) {
    searchEl.addEventListener('input', e => onSearch(e.target.value));
  }
});

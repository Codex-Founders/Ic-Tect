/* ══════════════════════════════════════════
   shared.js — IC Tech World
   Common JS used by index.html & products.html
══════════════════════════════════════════ */

const WA = "923163041828";

// ── HAMBURGER / MOBILE MENU ──────────────────────────────
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
if (ham && mob) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });
}
function closeMobile() {
  if (ham) ham.classList.remove('open');
  if (mob) mob.classList.remove('open');
}

// ── SCROLL TOP BUTTON ────────────────────────────────────
window.addEventListener('scroll', () => {
  const st = document.getElementById('scrollTop');
  if (st) st.classList.toggle('visible', window.scrollY > 400);
});

// ── TOAST ────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── BACKGROUND NETWORK CANVAS ────────────────────────────
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const pts = [];
  for (let i = 0; i < 80; i++) {
    pts.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,120,200,${0.12 * (1 - d / 160)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,170,255,0.25)';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── PRODUCT CARD HTML HELPER ─────────────────────────────
function productCardHTML(p) {
  const msg = encodeURIComponent(
    `Hello IC Tech World! I'm interested in buying: ${p.name} (${p.price}). Please provide more details.`
  );
  return `<div class="product-card">
    <div class="product-img">${p.icon}</div>
    <div class="product-info">
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-price">${p.price}</div>
      <a class="btn-whatsapp" href="https://wa.me/${WA}?text=${msg}" target="_blank">
        💬 Order on WhatsApp
      </a>
    </div>
  </div>`;
}

// ── SHARED PRODUCT DATA ──────────────────────────────────
const allProducts = [
  { cat: "Android Box",        name: "Smart Android TV Box X96",     desc: "4K Android 11 Box, 2GB RAM, WiFi + BT, streaming ready.",          price: "Rs. 3,500",  icon: "📺" },
  { cat: "Android Box",        name: "Android Box Pro 4K",            desc: "64-bit quad-core, 4GB RAM, all streaming apps pre-installed.",       price: "Rs. 5,200",  icon: "📺" },
  { cat: "Cameras",            name: "Canon EOS 1500D DSLR",          desc: "24.1 MP sensor, Full HD video, Wi-Fi connectivity.",                 price: "Rs. 65,000", icon: "📷" },
  { cat: "Cameras",            name: "IP PTZ Security Camera",        desc: "5MP, 360° rotation, night vision, outdoor weatherproof.",            price: "Rs. 12,000", icon: "📷" },
  { cat: "CCTV Solution",      name: "4-Channel CCTV Kit",            desc: "4 HD cameras + DVR + cables, complete indoor/outdoor kit.",          price: "Rs. 22,000", icon: "🎥" },
  { cat: "CCTV Solution",      name: "8-Channel DVR System",          desc: "1080p DVR, motion detection, remote viewing via app.",               price: "Rs. 38,000", icon: "🎥" },
  { cat: "Computer",           name: "Mechanical Gaming Keyboard",    desc: "RGB backlit, tactile switches, anti-ghosting, USB.",                 price: "Rs. 4,800",  icon: "⌨️" },
  { cat: "Computer",           name: "SSD 512GB SATA",                desc: "High speed 560MB/s read, reliable storage for laptops/PCs.",         price: "Rs. 7,500",  icon: "💾" },
  { cat: "Electric / Solar",   name: "Solar UPS 1500W",               desc: "Pure sine wave, 24V solar compatible, battery backup.",              price: "Rs. 35,000", icon: "☀️" },
  { cat: "Electric / Solar",   name: "Power Backup UPS 1KVA",         desc: "Online UPS, automatic voltage regulation, LCD display.",             price: "Rs. 18,000", icon: "🔋" },
  { cat: "Fiber / Optic Wire", name: "Single Mode Fiber Cable 100m",  desc: "OS2, 9/125µm, LC-LC duplex patch cord, low loss.",                   price: "Rs. 1,800",  icon: "🔵" },
  { cat: "Fiber / Optic Wire", name: "Fiber Optic Drop Wire 500m",    desc: "FTTH aerial/indoor use, 1-core G.657, UV resistant.",                price: "Rs. 8,500",  icon: "🔵" },
  { cat: "Mobile Accessories", name: "Fast Charging Cable 3-in-1",    desc: "Type-C + Lightning + Micro USB, 65W PD charging.",                  price: "Rs. 850",    icon: "🔌" },
  { cat: "Mobile Accessories", name: "Wireless Charger 15W",          desc: "Qi-certified, compatible with all flagship phones.",                 price: "Rs. 1,200",  icon: "📶" },
  { cat: "Network Connector",  name: "RJ45 Cat6 Connectors (100pc)",  desc: "Gold-plated, pass-through design, 100pc/box.",                       price: "Rs. 950",    icon: "🔗" },
  { cat: "Network Connector",  name: "LC/UPC Fiber Adapter Pack",     desc: "10-pack, single mode, ceramic ferrule, low insertion loss.",         price: "Rs. 1,400",  icon: "🔗" },
  { cat: "Networking Products",name: "Cat6 LAN Cable 305m Reel",      desc: "UTP, solid copper, 250MHz bandwidth, indoor/outdoor.",               price: "Rs. 6,500",  icon: "🌐" },
  { cat: "Networking Products",name: "PoE Network Switch 8-Port",     desc: "100Mbps, 4x PoE ports, plug & play, 65W total.",                    price: "Rs. 4,200",  icon: "🌐" },
  { cat: "Router / Switch",    name: "Fiber ONU Router",              desc: "GPON, dual-band WiFi 5, 4x GigaLAN ports.",                         price: "Rs. 7,800",  icon: "📡" },
  { cat: "Router / Switch",    name: "Managed Switch 24-Port",        desc: "L2+, VLAN, QoS, 24x GigaLAN + 4 SFP uplinks.",                      price: "Rs. 28,000", icon: "📡" },
];

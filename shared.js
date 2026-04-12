/* ══════════════════════════════════════════
   shared.js — IC Tech World
   Common JS used by index.html & products.html
══════════════════════════════════════════ */

const WA = "923163041828";

// ── HAMBURGER / MOBILE MENU ──────────────────────────────
const ham = document.getElementById("hamburger");
const mob = document.getElementById("mobileMenu");
if (ham && mob) {
  ham.addEventListener("click", () => {
    ham.classList.toggle("open");
    mob.classList.toggle("open");
  });
}
function closeMobile() {
  if (ham) ham.classList.remove("open");
  if (mob) mob.classList.remove("open");
}

// ── SCROLL TOP BUTTON ────────────────────────────────────
window.addEventListener("scroll", () => {
  const st = document.getElementById("scrollTop");
  if (st) st.classList.toggle("visible", window.scrollY > 400);
});

// ── TOAST ────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

// ── BACKGROUND NETWORK CANVAS ────────────────────────────
(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const pts = [];
  for (let i = 0; i < 80; i++) {
    pts.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
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
    pts.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,170,255,0.25)";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── PRODUCT CARD HTML HELPER ─────────────────────────────
// image field is OPTIONAL — if provided, shows photo; otherwise shows FA icon
// Usage example with image:
//   { cat: "Cameras", name: "Canon EOS", ..., image: "images/canon.jpg", icon: "fa-solid fa-camera" }
function productCardHTML(p) {
  const msg = encodeURIComponent(
    `*Order Request – IC Tech World*\n\nProduct: ${p.name}\nPrice: ${p.price}\nCategory: ${p.cat}\n\nDescription: ${p.desc}\n\nPlease confirm availability and share payment details. Thank you!`,
  );

  const imgHTML = p.image
    ? `<img src="${p.image}" alt="${p.name}" class="product-img-photo"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
       ><i class="${p.icon} product-fa-icon" style="display:none"></i>`
    : `<i class="${p.icon} product-fa-icon"></i>`;

  return `<div class="product-card">
    <div class="product-img">${imgHTML}</div>
    <div class="product-info">
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-price">${p.price}</div>
      <a class="btn-whatsapp" href="https://wa.me/${WA}?text=${msg}" target="_blank">
        <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
      </a>
    </div>
  </div>`;
}
// ══════════════════════════════════════════════════════════
// ── SHARED PRODUCT DATA ───────────────────────────────────
// HOW TO ADD A NEW PRODUCT:
// Copy one product line and paste it in the correct category section.
// Fields:
//   cat   → Category (must match exactly from categories list in products.js)
//   name  → Product name
//   desc  → Short description
//   price → Price string e.g. "Rs. 3,500"
//   icon  → Font Awesome icon class e.g. "fa-solid fa-tv"
//
// Available categories:
//   "Android Box" | "Cameras" | "CCTV Solution" | "Computer"
//   "Electric / Solar" | "Fiber / Optic Wire" | "Mobile Accessories"
//   "Network Connector" | "Networking Products" | "Router / Switch"
//
// Example:
// { cat: "Computer", name: "USB Hub 7-Port", desc: "USB 3.0, 7 ports with switches.", price: "Rs. 1,800", icon: "fa-solid fa-plug" },
// ══════════════════════════════════════════════════════════
const allProducts = [
  // ── Android Box ─────────────────────────────────────────
  {
    cat: "Android Box",
    name: "X88 Plus Android Box",
    desc: "Ram 8Gb Rom 128Gb (No Warranty )",
    price: "Rs. 3,700",
    icon: "fa-solid fa-tv",
    image: "All Images/X88 Plus.jpg",
  },
  {
    cat: "Android Box",
    name: "X96Q Android Box",
    desc: "No Warranty Ram 8Gb Rom 128Gb",
    price: "Rs. 4,200",
    icon: "fa-solid fa-tv",
    image: "All Images/X96Q.png",
  },

  // ── Cameras ─────────────────────────────────────────────
  {
    cat: "Cameras",
    name: "Wifi Camera",
    desc: "Wi-Fi connectivity, Control from Everywhere",
    price: "Rs. 4000",
    icon: "fa-solid fa-camera",
    image: "All Images/Wifi Camera.jpg",
  },
  {
    cat: "Cameras",
    name: "K6 Wifi HD 1080P Camera",
    desc: "Bulltetproof, outdoor weatherproof, Wireless Security Camera.",
    price: "Rs. 6,500",
    icon: "fa-solid fa-camera",
    image: "All Images/K 6 wifi camera hd.jpg",
  },

  // ── CCTV Solution ────────────────────────────────────────
  {
    cat: "CCTV Solution",
    name: "BNC Cable",
    desc: "BNC Camera Installation Fee.",
    price: "Rs. 150",
    icon: "fa-solid fa-video",
    image: "All Images/BNC Cable.jpg",
  },

  // ── Computer ─────────────────────────────────────────────
  {
    cat: "Computer",
    name: "Kingston 4GB USB",
    desc: "USB Memory.",
    price: "Rs. 600",
    icon: "fa-solid fa-keyboard",
    image: "All Images/Kingston 4GB USB.jpg",
  },
  {
    cat: "Computer",
    name: "Kigston 8GB USB",
    desc: "USB Memory.",
    price: "Rs. 800",
    icon: "fa-solid fa-hard-drive",
    image: "All Images/Kingston 8GB USB.jpg",
  },

  // ── Electric / Solar ─────────────────────────────────────
  {
    cat: "Electric / Solar",
    name: "Osaka PVC Tape",
    desc: "Waterproof Tape.",
    price: "Rs. 50",
    icon: "fa-solid fa-solar-panel",
    image: "All Images/Osaka PVC Tape.jpg",
  },
  {
    cat: "Electric / Solar",
    name: "Emergency Headlight",
    desc: "Best Emergency Head Light for Night Use.",
    price: "Rs. 550",
    icon: "fa-solid fa-bolt",
    image: "All Images/Emergency Headlight.jpg",
  },

  // ── Fiber / Optic Wire ───────────────────────────────────
  {
    cat: "Fiber / Optic Wire",
    name: "2 Core MT-Link Fiber Optic",
    desc: "2-Core MT-Link Fiber Optic Cable.",
    price: "Rs. 24 per meter",
    icon: "fa-solid fa-circle-nodes",
    image: "All Images/2 core mt link fiber.png",
  },
  {
    cat: "Fiber / Optic Wire",
    name: "2 Core SK Fiber Optic",
    desc: "2-Core SK Fiber Optic Cable.",
    price: "Rs. 25 per meter",
    icon: "fa-solid fa-circle-nodes",
    image: "All Images/2 core sk fiber.png",
  },

  // ── Mobile Accessories ───────────────────────────────────
  {
    cat: "Mobile Accessories",
    name: "Gts-1836/1867/1345/1346/1348 Wireless Bluetooth Speaker",
    desc: "Gts-1836/1867/1345/1346/1348 Wireless Bluetooth Speaker.",
    price: "Rs. 1000",
    icon: "fa-solid fa-mobile-screen-button",
    image:
      "All Images/Gts-1836 1867 1345 1346 1348 Wireless Bluetooth Speaker.jpg",
  },
  {
    cat: "Mobile Accessories",
    name: "Gts-2068 Wireless Speaker",
    desc: "Gts-2068 Wireless Speaker.",
    price: "Rs. 1,600",
    icon: "fa-solid fa-mobile-screen-button",
    image: "All Images/Gts-2068 Wireless Speaker.jpg",
  },

  // ── Network Connector ────────────────────────────────────
  {
    cat: "Network Connector",
    name: "RJ-45 Ultra Net/HnH",
    desc: "RJ-45 Ultra Net/HnH.",
    price: "Rs. 15",
    icon: "fa-solid fa-plug-circle-bolt",
    image: "All Images/RJ-45 Ultra Net.jpg",
  },
  {
    cat: "Network Connector",
    name: "HnH Cable Tester",
    desc: "HnH Cable Tester.",
    price: "Rs. 800",
    icon: "fa-solid fa-plug-circle-bolt",
    image: "All Images/HnH Cable Tester.jpg",
  },

  // ── Networking Products ──────────────────────────────────
  {
    cat: "Networking Products",
    name: "Box Blue 2 Way Splitter",
    desc: "Box Blue 2 Way Splitter.",
    price: "Rs. 1600",
    icon: "fa-solid fa-network-wired",
    image: "All Images/Box Blue 2 Way Splitter.jpeg",
  },
  {
    cat: "Networking Products",
    name: "MT-Link Blue SC-SC Pigtail s/m Patch Cord",
    desc: "MT-Link Blue SC-SC Pigtail s/m Patch Cord.",
    price: "Rs. 200",
    icon: "fa-solid fa-network-wired",
    image: "All Images/MT-Link Blue SC-SC Pigtail.jpg",
  },

  // ── Router / Switch ──────────────────────────────────────
  {
    cat: "Router / Switch",
    name: "V-Sol 2801-RD ONU",
    desc: "Type: 1 x XPON port (EPON PX20+ & GPON Class B+) Connector: SC/UPC, single-mode fiber TX Optical Power: 0 to +4 dBm Port: 1 x Gigabit Ethernet (RJ45), auto-negotiation Power Supply: DC 12V, 0.5A external adapter.",
    price: "Rs. 2,700",
    icon: "fa-solid fa-wifi",
    image: "All Images/V-Sol 2801-RD ONU.png",
  },
  {
    cat: "Router / Switch",
    name: "MV-Sol v2801RGW XPon",
    desc: "Wi-Fi Technical Specifications PON Interface: 1 XPON port (EPON PX20+ & GPON Class B+), SC/UPC connector Transmission Distance: Up to 20 km Standards: IEEE 802.11b/g/n (WiFi 4) Antenna: 2T2R with 5 dBi gain Maximum Speed: 300 Mbps Channels: 13 Chipset: Realtek.",
    price: "Rs. 4,500",
    icon: "fa-solid fa-wifi",
    image: "All Images/V-Sol v2801RGW XPon.jpg",
  },
];

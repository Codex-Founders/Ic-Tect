/* ══════════════════════════════════════════
   index.js — IC Tech World Homepage
   Page-specific JS (requires shared.js)
══════════════════════════════════════════ */

// ── FEATURED PRODUCTS ────────────────────────────────────
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = allProducts.filter((_, i) => i % 3 === 0).slice(0, 8);
  grid.innerHTML = featured.map(p => productCardHTML(p)).join('');
}

// ── REVIEWS DATA ─────────────────────────────────────────
const defaultReviews = [
  { name: "Ahmed Raza",      role: "Business Owner",    text: "IC Tech World gave us the best fiber solution for our office. Super fast installation and amazing support!", stars: 5 },
  { name: "Sara Khan",       role: "Photographer",      text: "Got my DSLR accessories here. Genuine products, competitive prices. Highly recommended!", stars: 5 },
  { name: "Tariq Mehmood",   role: "IT Manager",        text: "Their networking products are top-notch. Managed switch works flawlessly for our 50-node setup.", stars: 5 },
  { name: "Fatima Noor",     role: "Home User",         text: "Subscribed to the 25Mbps package. Excellent speed and zero downtime. Very happy customer!", stars: 4 },
  { name: "Zain Ali",        role: "Gamer",             text: "Bought a gaming keyboard here. Quality is great and the price was way better than other shops.", stars: 5 },
  { name: "Usman Sheikh",    role: "CCTV Installer",    text: "Best place for CCTV kits in Karachi. Bulk rates available. Imran bhai is very helpful.", stars: 5 },
  { name: "Hina Malik",      role: "Student",           text: "Got my laptop accessories. Everything original and delivered on time. Will come back!", stars: 4 },
  { name: "Bilal Hussain",   role: "Network Engineer",  text: "Reliable fiber cables and top quality connectors. These guys know what they're selling.", stars: 5 },
];
let userReviews = [];
let selectedStars = 5;

function renderReviews() {
  const allRevs = [...defaultReviews, ...userReviews];
  const doubled = [...allRevs, ...allRevs]; // duplicate for infinite loop
  const track = document.getElementById('reviewsTrack');
  if (!track) return;
  track.innerHTML = doubled.map(r => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <div class="review-text">${r.text}</div>
      <div class="review-author">${r.name}</div>
      <div class="review-role">${r.role || ''}</div>
    </div>`).join('');
}

function toggleAddReview() {
  const el = document.getElementById('addReviewWrap');
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function postReview() {
  const name = document.getElementById('rName').value.trim();
  const text = document.getElementById('rText').value.trim();
  if (!name || !text) { showToast('Please fill in your name and review!'); return; }
  userReviews.push({ name, text, stars: selectedStars, role: 'Customer' });
  renderReviews();
  document.getElementById('rName').value = '';
  document.getElementById('rText').value = '';
  selectedStars = 5;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
  showToast('Review posted! Thank you 🎉');
}

// ── STAR RATING INPUT ─────────────────────────────────────
function initStarInput() {
  document.querySelectorAll('.star').forEach(s => {
    s.addEventListener('click', () => {
      selectedStars = parseInt(s.dataset.v);
      document.querySelectorAll('.star').forEach((st, i) => {
        st.classList.toggle('selected', i < selectedStars);
      });
    });
  });
}

// ── CONTACT FORM ─────────────────────────────────────────
function listProblem() {
  const name  = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const addr  = document.getElementById('cAddr').value.trim();
  const prob  = document.getElementById('cProblem').value.trim();
  if (!name || !prob) { showToast('Please fill in your name and problem description.'); return; }
  const msg = encodeURIComponent(
    `*Problem Report – IC Tech World*\n\nName: ${name}\nEmail: ${email || 'N/A'}\nAddress: ${addr || 'N/A'}\n\nProblem Description:\n${prob}\n\nPlease help me resolve this issue. Thank you!`
  );
  window.open(`https://wa.me/${WA}?text=${msg}`, '_blank');
  document.getElementById('cName').value = '';
  document.getElementById('cEmail').value = '';
  document.getElementById('cAddr').value = '';
  document.getElementById('cProblem').value = '';
  showToast('Redirecting to WhatsApp...');
}

// ── ANIMATED GLOBE ───────────────────────────────────────
function initGlobe() {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2, R = 160;

  // Globe surface dots
  const dots = [];
  for (let lat = -90; lat <= 90; lat += 12) {
    for (let lon = 0; lon < 360; lon += 14) {
      dots.push({ φ: lat * Math.PI / 180, λ: lon * Math.PI / 180 });
    }
  }

  // Network nodes on surface
  const nodePositions = [
    [20,30],[35,70],[-10,120],[50,150],[-30,200],
    [10,260],[40,310],[-20,350],[60,90],[0,180],[-50,130],[30,230]
  ];
  const nodes = nodePositions.map(([lat,lon]) => ({
    φ: lat * Math.PI / 180,
    λ: lon * Math.PI / 180
  }));

  // Orbital rings
  const rings = [
    { r: R + 30, speed:  0.004, angle: 0,           tilt:  0.3 },
    { r: R + 55, speed: -0.003, angle: Math.PI / 3, tilt: -0.5 },
    { r: R + 80, speed:  0.002, angle: Math.PI / 6, tilt:  0.7 },
  ];

  // Person nodes on rings
  const orbitPersons = rings.flatMap((ring, ri) => {
    const count = 4 + ri;
    return Array.from({ length: count }, (_, i) => ({
      angle: (Math.PI * 2 / count) * i,
      ring: ri
    }));
  });

  let rot = 0;

  function project3D(φ, λ, rotY) {
    const x = Math.cos(φ) * Math.cos(λ + rotY);
    const y = Math.sin(φ);
    const z = Math.cos(φ) * Math.sin(λ + rotY);
    return { x: cx + x * R, y: cy - y * R, z };
  }

  function projectRingPoint(ring, angle) {
    const px = Math.cos(angle) * ring.r;
    const py = Math.sin(angle) * ring.r * Math.cos(ring.tilt);
    const pz = Math.sin(angle) * ring.r * Math.sin(ring.tilt);
    return { x: cx + px, y: cy + py, z: pz };
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);

    // Glow
    const grd = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 1.2);
    grd.addColorStop(0, 'rgba(0,100,200,0.15)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Surface dots
    dots.forEach(d => {
      const p = project3D(d.φ, d.λ, rot);
      if (p.z < 0) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,180,255,0.35)';
      ctx.fill();
    });

    // Globe outline
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,200,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Latitude ellipses
    [-0.5, 0, 0.5].forEach(t => {
      const yr = cy - t * R;
      const rr = Math.sqrt(Math.max(0, R * R - (t * R) * (t * R)));
      ctx.beginPath();
      ctx.ellipse(cx, yr, rr, rr * 0.2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,255,247,0.12)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // Project nodes
    const projNodes = nodes.map(n => {
      const p = project3D(n.φ, n.λ, rot);
      return { x: p.x, y: p.y, z: p.z, visible: p.z >= 0 };
    });

    // Node connection lines
    for (let i = 0; i < projNodes.length; i++) {
      for (let j = i + 1; j < projNodes.length; j++) {
        if (!projNodes[i].visible || !projNodes[j].visible) continue;
        const dx = projNodes[i].x - projNodes[j].x;
        const dy = projNodes[i].y - projNodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) > 120) continue;
        ctx.beginPath();
        ctx.moveTo(projNodes[i].x, projNodes[i].y);
        ctx.lineTo(projNodes[j].x, projNodes[j].y);
        ctx.strokeStyle = 'rgba(0,200,255,0.2)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    // Draw nodes
    projNodes.forEach(n => {
      if (!n.visible) return;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,255,247,0.9)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,255,247,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw rings
    const ringColors = ['rgba(0,170,255,0.3)', 'rgba(0,255,247,0.25)', 'rgba(100,150,255,0.2)'];
    rings.forEach((ring, ri) => {
      ring.angle += ring.speed;
      ctx.beginPath();
      ctx.ellipse(cx, cy, ring.r, ring.r * Math.abs(Math.cos(ring.tilt)), ring.angle * 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = ringColors[ri];
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw orbiting person icons
    orbitPersons.forEach(p => {
      const ring = rings[p.ring];
      p.angle += ring.speed;
      const pt = projectRingPoint(ring, p.angle);
      ctx.save();
      ctx.translate(pt.x, pt.y);
      const alpha = 0.5 + 0.5 * (pt.z / ring.r + 1) / 2;
      ctx.globalAlpha = Math.max(0.3, Math.min(1, alpha));
      // body
      ctx.beginPath();
      ctx.arc(0, -6, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00fff7';
      ctx.fill();
      // head
      ctx.beginPath();
      ctx.arc(0, -14, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00aaff';
      ctx.fill();
      // glow
      ctx.beginPath();
      ctx.arc(0, -6, 9, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,255,247,0.1)';
      ctx.fill();
      ctx.restore();
    });

    // Data packets on rings
    [0.2, 0.5, 0.75].forEach((frac, i) => {
      const ring = rings[i % rings.length];
      const angle = ring.angle + frac * Math.PI * 2;
      const pt = projectRingPoint(ring, angle);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240,165,0,0.8)';
      ctx.fill();
    });

    rot += 0.004;
    requestAnimationFrame(drawFrame);
  }
  drawFrame();
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderReviews();
  initStarInput();
  initGlobe();
});
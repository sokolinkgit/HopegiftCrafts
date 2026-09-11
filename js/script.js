/* ═══════════════════════════════════════════════════════════════
   HOPE GIFT CRAFTS — script.js
   Vanilla JS: product catalogue, WhatsApp ordering, cart, filters,
   sliders, scroll effects and forms.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── catalogue ─────────────────────────────────────────────── */
  const PRODUCTS = [
    {
      id: 'bracelet', cat: 'wrist', name: 'Beaded Wrist Bands',
      desc: 'Hand-strung glass beads in signature red, blue & white.',
      price: 24, oldPrice: 32, rating: 4.9, badge: 'Bestseller',
      img: 'assets/img/product-bracelet.jpg'
    },
    {
      id: 'anklet', cat: 'wrist', name: 'Warrior Cuff & Anklet Set',
      desc: 'A matching cuff and anklet beaded in warrior colours.',
      price: 28, rating: 4.8, badge: 'New',
      img: 'assets/img/product-anklet.jpg'
    },
    {
      id: 'necklace', cat: 'necklace', name: 'Royal Bead Collar Necklace',
      desc: 'A statement flat bead collar, fit for special occasions.',
      price: 68, rating: 5.0, badge: 'Limited',
      img: 'assets/img/product-necklace.jpg'
    },
    {
      id: 'earrings', cat: 'necklace', name: 'Dangling Bead Earrings',
      desc: 'Light, geometric bead loops that dance as you move.',
      price: 32, oldPrice: 40, rating: 4.7, badge: 'Sale',
      img: 'assets/img/product-earrings.jpg'
    },
    {
      id: 'sandals', cat: 'footwear', name: 'Beaded Leather Sandals',
      desc: 'Handcrafted leather with colourful beaded straps.',
      price: 85, oldPrice: 110, rating: 4.9, badge: 'Sale',
      img: 'assets/img/product-sandals.jpg'
    },
    {
      id: 'leso', cat: 'fabric', name: 'Leso / Shuka Wrap',
      desc: 'Bold, colourful cloth — wear it, drape it, gift it.',
      price: 45, rating: 4.8,
      img: 'assets/img/product-leso.jpg'
    },
    {
      id: 'basket', cat: 'home', name: 'Handwoven Sisal Basket',
      desc: 'A versatile basket woven from natural dyed sisal.',
      price: 58, rating: 4.9,
      img: 'assets/img/product-basket.jpg'
    },
    {
      id: 'belt', cat: 'accessories', name: 'Beaded Belt',
      desc: 'A colourful beaded belt on a supple leather strap.',
      price: 74, rating: 4.8, badge: 'New',
      img: 'assets/img/product-belt.jpg'
    }
  ];

  const CATEGORY_LABELS = {
    wrist: 'Wrist Wear', necklace: 'Necklaces & Earrings', footwear: 'Footwear',
    fabric: 'Fabric', home: 'Home & Décor', accessories: 'Accessories'
  };

  const SHIPPING_FLAT = 12; // in USD

  /* ── WhatsApp ordering ─────────────────────────────────────────
     Change this to your business WhatsApp number in international
     format — digits only, no "+" and no spaces.                    */
  const WHATSAPP_NUMBER = '254712937993';

  function waLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  /* ── state ─────────────────────────────────────────────────── */
  let cart = loadCart();
  let activeFilter = 'all';

  /* ── DOM helpers ───────────────────────────────────────────── */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const productGrid = $('#productGrid');
  const cartCount = $('#cartCount');
  const cartDrawer = $('#cartDrawer');
  const cartOverlay = $('#cartOverlay');
  const cartBody = $('#cartBody');
  const cartEmpty = $('#cartEmpty');
  const cartItems = $('#cartItems');
  const cartFoot = $('#cartFoot');
  const toast = $('#toast');

  /* ── formatting ────────────────────────────────────────────── */
  function formatMoney(usd) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2
    }).format(usd);
  }

  const WA_ICON = '<svg viewBox="0 0 448 512" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 110.9L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 438.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L71.1 358l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 5.6-3.7 8.4-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.4-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';

  function waOrderLink(p) {
    return waLink(`Hi Hope Gift Crafts! I'd like to order the *${p.name}* (${formatMoney(p.price)}). Is it still available for worldwide delivery?`);
  }

  /* ── render products ───────────────────────────────────────── */
  function starRow(rating) {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }

  function renderProducts() {
    const visible = PRODUCTS.filter(p => activeFilter === 'all' || p.cat === activeFilter);
    productGrid.innerHTML = visible.map((p, i) => {
      const badge = p.badge
        ? `<span class="product-badge ${p.badge.toLowerCase()}">${p.badge}</span>` : '';
      const oldPrice = p.oldPrice
        ? `<span class="price-was">${formatMoney(p.oldPrice)}</span>` : '';
      return `
      <article class="product-card" data-id="${p.id}" style="animation-delay:${i * 60}ms">
        <div class="product-media">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
          ${badge}
          <button class="quick-add" data-add="${p.id}" aria-label="Add ${p.name} to basket">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M3 4h2.2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H6"/></svg>
            Add to Basket
          </button>
        </div>
        <div class="product-body">
          <span class="product-cat">${CATEGORY_LABELS[p.cat]}</span>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-stars" aria-label="Rated ${p.rating} out of 5">${starRow(p.rating)} <span style="color:var(--ink-mute);letter-spacing:0;font-size:12.5px;font-weight:600;">${p.rating.toFixed(1)}</span></div>
          <div class="product-foot">
            <div class="product-price"><span class="price-now">${formatMoney(p.price)}</span>${oldPrice}</div>
            <button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name} to basket">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
          <a class="wa-order-btn" href="${waOrderLink(p)}" target="_blank" rel="noopener" aria-label="Order ${p.name} on WhatsApp">
            <span class="wa-order-icon" aria-hidden="true">${WA_ICON}</span>
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </article>`;
    }).join('');
  }

  /* ── filters ───────────────────────────────────────────────── */
  function setFilter(key) {
    activeFilter = key;
    $$('.filter-btn').forEach(b => {
      const active = b.dataset.filter === key;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    renderProducts();
  }

  /* ── cart ──────────────────────────────────────────────────── */
  function loadCart() {
    try {
      const raw = localStorage.getItem('hgc-cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveCart() {
    try { localStorage.setItem('hgc-cart', JSON.stringify(cart)); } catch (e) { /* ignore */ }
  }

  function cartTotalItems() {
    return cart.reduce((n, item) => n + item.qty, 0);
  }

  function addToCart(id) {
    const found = cart.find(i => i.id === id);
    if (found) found.qty += 1;
    else cart.push({ id, qty: 1 });
    saveCart();
    updateCartBadge();
    renderCart();
    bumpBadge();
    openCart();
    const p = PRODUCTS.find(x => x.id === id);
    showToast(`${p.name} added to your basket`);
  }

  function changeQty(id, delta) {
    const found = cart.find(i => i.id === id);
    if (!found) return;
    found.qty += delta;
    if (found.qty <= 0) cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartBadge();
    renderCart();
  }

  function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartBadge();
    renderCart();
  }

  function updateCartBadge() {
    const total = cartTotalItems();
    cartCount.textContent = total;
    $('#cartHeadCount').textContent = `(${total})`;
  }

  function bumpBadge() {
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth;
    cartCount.classList.add('bump');
  }

  function cartSubtotalUSD() {
    return cart.reduce((sum, item) => {
      const p = PRODUCTS.find(x => x.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }

  function renderCart() {
    const hasItems = cart.length > 0;
    cartEmpty.style.display = hasItems ? 'none' : '';
    cartItems.style.display = hasItems ? '' : 'none';
    cartFoot.hidden = !hasItems;

    cartItems.innerHTML = cart.map(item => {
      const p = PRODUCTS.find(x => x.id === item.id);
      if (!p) return '';
      return `
      <li class="cart-item">
        <img class="cart-item-img" src="${p.img}" alt="${p.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatMoney(p.price)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-remove="${p.id}" aria-label="Remove ${p.name}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </li>`;
    }).join('');

    if (hasItems) {
      const subtotalUSD = cartSubtotalUSD();
      const shippingUSD = SHIPPING_FLAT;
      $('#cartSubtotal').textContent = formatMoney(subtotalUSD);
      $('#cartShipping').textContent = formatMoney(shippingUSD);
      $('#cartTotal').textContent = formatMoney(subtotalUSD + shippingUSD);
    }
  }

  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function checkout() {
    if (cart.length === 0) return;
    cart = [];
    saveCart();
    updateCartBadge();
    renderCart();
    closeCart();
    showToast('Order received! We\u2019ll email you shipping & tracking details. 🌍');
  }

  /* ── toast ─────────────────────────────────────────────────── */
  let toastTimer;
  function showToast(message) {
    toast.innerHTML = `<span class="toast-dot"></span>${message}`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3400);
  }

  /* ── header / scroll ───────────────────────────────────────── */
  const header = $('#siteHeader');
  const progress = $('.scroll-progress');
  const navLinks = $$('.nav-link');
  const sections = ['home', 'collection', 'why-us', 'reviews', 'contact']
    .map(id => $(`#${id}`)).filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 30);

    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    // scroll spy
    let current = 'home';
    sections.forEach(sec => {
      if (sec && y >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  }

  /* ── mobile menu ───────────────────────────────────────────── */
  const navToggle = $('#navToggle');
  const mobileMenu = $('#mobileMenu');

  function toggleMenu(force) {
    const open = force !== undefined ? force : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  /* ── reveal on scroll ──────────────────────────────────────── */
  function initReveal() {
    const targets = $$('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // stagger siblings
    const parents = new Set(targets.map(t => t.parentElement));
    parents.forEach(parent => {
      const kids = $$('.reveal', parent);
      if (kids.length > 1) {
        kids.forEach((k, i) => { k.style.transitionDelay = Math.min(i * 90, 450) + 'ms'; });
      }
    });

    targets.forEach(t => io.observe(t));
  }

  /* ── unboxing slideshow ────────────────────────────────────── */
  const UNBOXING = [
    {
      img: 'assets/img/unbox-1.jpg', flag: '🇺🇸', name: 'Emily Thompson',
      loc: 'Austin, Texas, USA',
      quote: 'The colours are even more vibrant in person — I couldn\u2019t stop smiling!'
    },
    {
      img: 'assets/img/unbox-2.jpg', flag: '🇬🇧', name: 'Oliver Smith',
      loc: 'Manchester, England, UK',
      quote: 'Packaged with such care — opening it felt like a gift to myself.'
    },
    {
      img: 'assets/img/unbox-3.jpg', flag: '🇦🇺', name: 'Charlotte Taylor',
      loc: 'Sydney, New South Wales, Australia',
      quote: 'My sandals are stunning. I\u2019m already planning my next order!'
    },
    {
      img: 'assets/img/unbox-4.jpg', flag: '🇨🇦', name: 'James Wilson',
      loc: 'Vancouver, British Columbia, Canada',
      quote: 'Genuine craftsmanship — you can feel the love in every bead.'
    }
  ];

  function initUnboxing() {
    const track = $('#unboxingTrack');
    const dotsWrap = $('#unboxingDots');
    const stage = $('#unboxingStage');
    let index = 0;
    let timer;

    track.innerHTML = UNBOXING.map((s, i) => `
      <div class="unboxing-slide ${i === 0 ? 'active' : ''}">
        <img src="${s.img}" alt="${s.name} unboxing Hope Gift Crafts crafts in ${s.loc}" />
        <div class="unboxing-caption">
          <span class="unboxing-flag" aria-hidden="true">${s.flag}</span>
          <div>
            <blockquote>"${s.quote}"</blockquote>
            <cite>${s.name} · ${s.loc}</cite>
          </div>
        </div>
      </div>`).join('');

    UNBOXING.forEach((_, i) => {
      const d = document.createElement('span');
      if (i === 0) d.classList.add('active');
      d.addEventListener('click', () => { go(i); resetTimer(); });
      dotsWrap.appendChild(d);
    });

    const slides = $$('.unboxing-slide', track);
    const dots = $$('span', dotsWrap);

    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('active', k === index));
      dots.forEach((d, k) => d.classList.toggle('active', k === index));
    }
    function next() { go(index + 1); }
    function prev() { go(index - 1); }
    function resetTimer() { clearInterval(timer); timer = setInterval(next, 4800); }

    $('#unboxingNext').addEventListener('click', () => { next(); resetTimer(); });
    $('#unboxingPrev').addEventListener('click', () => { prev(); resetTimer(); });

    stage.addEventListener('mouseenter', () => clearInterval(timer));
    stage.addEventListener('mouseleave', resetTimer);

    // touch swipe
    let startX = 0;
    stage.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) { if (dx < 0) next(); else prev(); resetTimer(); }
    }, { passive: true });

    resetTimer();
  }

  /* ── forms ─────────────────────────────────────────────────── */
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function markField(input, invalid) {
    const field = input.closest('.field');
    if (field) field.classList.toggle('error', invalid);
    return !invalid;
  }

  function initForms() {
    const newsletter = $('#newsletterForm');
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('#newsletterEmail');
      if (!isValidEmail(email.value.trim())) {
        markField(email, true);
        showToast('Please enter a valid email address.');
        return;
      }
      markField(email, false);
      showToast('Welcome to the family! Your 10% code is on its way. 🎁');
      newsletter.reset();
    });

    const contact = $('#contactForm');
    contact.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = ['#cName', '#cEmail', '#cCountry', '#cMessage'];
      let ok = true;
      required.forEach(sel => {
        const input = $(sel);
        const invalid = !input.value.trim();
        if (!markField(input, invalid)) ok = false;
      });
      const email = $('#cEmail');
      if (email.value.trim() && !isValidEmail(email.value.trim())) {
        markField(email, true);
        ok = false;
      }
      if (!ok) {
        showToast('Please fill in the highlighted fields.');
        return;
      }
      showToast('Message sent! We\u2019ll reply within 24 hours. 💌');
      contact.reset();
    });

    // clear error state on input
    $$('#contactForm input, #contactForm textarea, #newsletterEmail').forEach(el =>
      el.addEventListener('input', () => markField(el, false))
    );
  }

  /* ── floating WhatsApp bubble ──────────────────────────────────
     The hard-coded href in index.html is the no-JS fallback; here we
     point every WhatsApp link at WHATSAPP_NUMBER with a prefilled text. */
  function initWhatsApp() {
    const float = $('#waFloat');
    if (!float) return;
    float.href = waLink('Hi Hope Gift Crafts! I would like to know more about your crafts and delivery. 🌍');
  }

  /* ── event wiring ──────────────────────────────────────────── */
  function bindEvents() {
    // filters
    $$('.filter-btn').forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter)));

    // product grid (delegated)
    productGrid.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add]');
      if (addBtn) { addToCart(addBtn.dataset.add); }
    });

    // cart drawer
    $('#cartBtn').addEventListener('click', openCart);
    $('#cartClose').addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    $('#cartBrowse').addEventListener('click', closeCart);
    $('#checkoutBtn').addEventListener('click', checkout);

    cartItems.addEventListener('click', (e) => {
      const qty = e.target.closest('[data-qty]');
      if (qty) { changeQty(qty.dataset.qty, parseInt(qty.dataset.delta, 10)); return; }
      const rm = e.target.closest('[data-remove]');
      if (rm) removeItem(rm.dataset.remove);
    });

    // mobile menu
    navToggle.addEventListener('click', () => toggleMenu());
    $$('.mobile-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));

    // close cart / menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeCart(); toggleMenu(false); }
    });

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── boot ──────────────────────────────────────────────────── */
  function init() {
    $('#year').textContent = new Date().getFullYear();
    renderProducts();
    renderCart();
    updateCartBadge();
    bindEvents();
    initReveal();
    initUnboxing();
    initForms();
    initWhatsApp();
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

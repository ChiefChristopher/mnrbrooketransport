<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <img src="../assets/haul2.jpg" alt="M&R Brooke Transportation car hauler" class="hero-img" />
        <div class="hero-overlay"></div>
      </div>
      <div class="container hero-content">
        <p class="section-eyebrow">Oklahoma's Trusted Hauler</p>
        <h1 class="hero-title">Moving <span>America's</span><br>Vehicles</h1>
        <p class="hero-sub">Licensed, insured, and road-hardened. M&R Brooke Transportation hauls cars, trucks, and collector vehicles across all 48 states. DOT# 4352389 | MC# 1701962</p>
        <div class="hero-actions">
          <RouterLink to="/contact" class="btn-primary">Get a Free Quote</RouterLink>
          <a href="tel:4057614477" class="btn-outline">Call (405) 761-4477</a>
        </div>
      </div>
      <div class="hero-badges">
        <div class="badge"><span class="badge-num">48</span><span class="badge-label">States Served</span></div>
        <div class="badge-divider"></div>
        <div class="badge"><span class="badge-num">DOT</span><span class="badge-label"># 4352389</span></div>
        <div class="badge-divider"></div>
        <div class="badge"><span class="badge-num">MC</span><span class="badge-label"># 1701962</span></div>
      </div>
    </section>

    <!-- Services Summary -->
    <section class="services-preview">
      <div class="container">
        <p class="section-eyebrow">What We Haul</p>
        <h2 class="section-title">Built for the <span>Long Haul</span></h2>
        <div class="service-cards">
          <div class="service-card" v-for="s in services" :key="s.title">
            <div class="service-icon">{{ s.icon }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
        </div>
        <div class="services-cta">
          <RouterLink to="/services" class="btn-outline">View All Services</RouterLink>
        </div>
      </div>
    </section>

    <!-- Photo Gallery Strip -->
    <section class="gallery">
      <div class="gallery-grid">
        <img src="../assets/haul1.jpg" alt="Multi-vehicle car hauler transport" />
        <img src="../assets/haul2.jpg" alt="Car hauler with Corvette and F-150" />
        <img src="../assets/haul3.jpg" alt="Ford Super Duty with car hauler trailer" />
        <img src="../assets/haul4.jpg" alt="Car hauler loaded with vehicles" />
      </div>
    </section>

    <!-- Why Us -->
    <section class="why-us">
      <div class="container why-inner">
        <div class="why-text">
          <p class="section-eyebrow">Why M&R Brooke</p>
          <h2 class="section-title">Dependable <span>Delivery</span>,<br>Every Run</h2>
          <ul class="why-list">
            <li v-for="item in whyUs" :key="item.title">
              <div class="why-icon">{{ item.icon }}</div>
              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.desc }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="why-image">
          <img src="../assets/haul3.jpg" alt="M&R Brooke Transportation on the road" />
          <div class="why-image-badge">
            <span>Family Owned</span>
            <span>&</span>
            <span>Operated</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="cta-banner">
      <div class="cta-stripe red"></div>
      <div class="container cta-content">
        <h2>Ready to Schedule Your Haul?</h2>
        <p>Call us today or fill out our contact form to get a free quote on car or vehicle transport anywhere in the continental US.</p>
        <div class="cta-actions">
          <RouterLink to="/contact" class="btn-primary">Request a Quote</RouterLink>
          <a href="tel:4057614477" class="cta-phone">(405) 761-4477</a>
        </div>
      </div>
      <div class="cta-stripe blue"></div>
    </section>
  </div>
</template>

<script setup>
const services = [
  { icon: '🚗', title: 'Auto Transport', desc: 'Cars, trucks, SUVs, and classics transported safely on our enclosed or open car haulers.' },
  { icon: '🏎️', title: 'Specialty Vehicles', desc: 'Classic cars, Corvettes, and collector vehicles handled with care and precision.' },
  { icon: '🚚', title: 'Dealer Transport', desc: 'Fleet and dealer inventory moves handled with logistics expertise and care.' },
]

const whyUs = [
  { icon: '⭐', title: 'Fully Licensed & Insured', desc: 'Operating under DOT# 4352389 and MC# 1701962 — your cargo is protected.' },
  { icon: '🛣️', title: 'All 48 States', desc: 'From Oklahoma to either coast, we run nationwide routes regularly.' },
  { icon: '📞', title: 'Direct Communication', desc: 'You deal directly with the owner/operator — no middlemen, no runarounds.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: 'We respect your schedule. Pickups and deliveries you can count on.' },
]
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10,10,12,0.92) 0%,
    rgba(27,58,107,0.5) 50%,
    rgba(10,10,12,0.8) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 120px;
  padding-bottom: 5rem;
}

.hero-title {
  font-family: var(--ff-display);
  font-size: clamp(3rem, 8vw, 6rem);
  color: var(--white);
  line-height: 1;
  letter-spacing: 0.02em;
  margin: 0.5rem 0 1.25rem;
}

.hero-title span { color: var(--red); }

.hero-sub {
  max-width: 52ch;
  font-size: 1.05rem;
  color: var(--silver-light);
  margin-bottom: 2rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-badges {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: rgba(10,10,12,0.85);
  border-top: 2px solid var(--red);
  padding: 1.25rem 2rem;
  backdrop-filter: blur(8px);
}

.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
}

.badge-num {
  font-family: var(--ff-display);
  font-size: 2rem;
  color: var(--white);
  line-height: 1;
}

.badge-label {
  font-family: var(--ff-heading);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--silver);
  margin-top: 0.2rem;
}

.badge-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.15);
}

/* Services Preview */
.services-preview {
  padding: 5rem 0;
  background: var(--dark2);
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.service-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-top: 3px solid var(--red);
  padding: 2rem 1.5rem;
  transition: border-color 0.2s, background 0.2s;
}

.service-card:hover {
  background: rgba(255,255,255,0.06);
  border-top-color: var(--blue-mid);
}

.service-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  font-family: var(--ff-heading);
  font-size: 1.2rem;
  color: var(--white);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.service-card p {
  font-size: 0.9rem;
  color: var(--silver);
  line-height: 1.6;
}

.services-cta {
  text-align: center;
  margin-top: 2.5rem;
}

/* Gallery */
.gallery {
  overflow: hidden;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 280px;
}

.gallery-grid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.75) saturate(0.8);
  transition: filter 0.3s;
}

.gallery-grid img:hover {
  filter: brightness(0.95) saturate(1);
  z-index: 1;
}

/* Why Us */
.why-us {
  padding: 5rem 0;
  background: var(--black);
}

.why-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.why-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.why-list li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.why-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  width: 2.5rem;
  text-align: center;
}

.why-list strong {
  font-family: var(--ff-heading);
  font-size: 1rem;
  color: var(--white);
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.why-list p {
  font-size: 0.9rem;
  color: var(--silver);
}

.why-image {
  position: relative;
}

.why-image img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border: 2px solid rgba(200,16,46,0.3);
}

.why-image-badge {
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  background: var(--red);
  color: var(--white);
  font-family: var(--ff-display);
  font-size: 1.2rem;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
  letter-spacing: 0.05em;
}

/* CTA Banner */
.cta-banner {
  background: var(--dark2);
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  position: relative;
}

.cta-stripe {
  height: 4px;
}
.cta-stripe.red { background: var(--red); }
.cta-stripe.blue { background: var(--blue-mid); }

.cta-content {
  text-align: center;
  padding: 4rem 1.5rem;
}

.cta-content h2 {
  font-family: var(--ff-display);
  font-size: clamp(1.8rem, 4vw, 3rem);
  color: var(--white);
  margin-bottom: 1rem;
}

.cta-content p {
  color: var(--silver);
  max-width: 55ch;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-phone {
  font-family: var(--ff-display);
  font-size: 2rem;
  color: var(--white);
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.cta-phone:hover { color: var(--red); }

@media (max-width: 900px) {
  .why-inner { grid-template-columns: 1fr; }
  .why-image { display: none; }
}

@media (max-width: 640px) {
  .gallery-grid { grid-template-columns: 1fr 1fr; height: 200px; }
  .hero-badges { gap: 0; flex-wrap: wrap; }
  .badge { padding: 0.75rem 1rem; }
  .badge-divider { display: none; }
}
</style>

<template>
  <div>
    <section class="page-hero">
      <div class="page-hero-bg">
        <img src="../assets/haul4.jpg" alt="M&R Brooke Transportation owner operator" />
        <div class="page-hero-overlay"></div>
      </div>
      <div class="container page-hero-content">
        <p class="section-eyebrow">Our Story</p>
        <h1 class="section-title">About <span>M&R Brooke</span></h1>
      </div>
    </section>

    <section class="about-story">
      <div class="container about-grid">
        <div class="about-img-col">
          <img src="../assets/haul3.jpg" alt="M&R Brooke Transportation truck on the road" class="about-main-img" />
          <div class="about-stat-card">
            <div class="stat" v-for="s in stats" :key="s.label">
              <span class="stat-val">{{ s.val }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
        <div class="about-text">
          <p class="section-eyebrow">Family Owned & Operated</p>
          <h2 class="section-title">Oklahoma Roots,<br><span>Nationwide Reach</span></h2>
          <p>M&R Brooke Transportation LLC is a family-owned auto transport company based in Oklahoma. We built this business on the road — learning every mile, every load, and every delivery what it means to do this work the right way.</p>
          <p>We operate as an owner-operator, which means when you call us, you reach the people doing the hauling. There's no dispatch center, no corporate phone tree — just a driver who cares about getting your vehicle delivered safely and on time.</p>
          <p>We're fully licensed under DOT# 4352389 and MC# 1701962, and we carry the insurance coverage to back every haul. Whether you're shipping a daily driver across two states or need a classic Corvette moved with care, you can trust M&R Brooke to treat your vehicle like it's our own.</p>
          <div class="about-credentials">
            <div class="cred" v-for="c in credentials" :key="c.label">
              <span class="cred-icon">{{ c.icon }}</span>
              <div>
                <strong>{{ c.label }}</strong>
                <span>{{ c.val }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="values">
      <div class="container">
        <p class="section-eyebrow">How We Operate</p>
        <h2 class="section-title">Our <span>Commitments</span></h2>
        <div class="values-grid">
          <div class="value-card" v-for="v in values" :key="v.title">
            <div class="value-icon">{{ v.icon }}</div>
            <h3>{{ v.title }}</h3>
            <p>{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-cta">
      <div class="container">
        <h2>Let's Work Together</h2>
        <p>Ready to move your vehicle? Contact us today for a free quote with no obligation.</p>
        <RouterLink to="/contact" class="btn-primary">Get in Touch</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { val: '48', label: 'States Served' },
  { val: '100%', label: 'Owner-Operated' },
  { val: 'DOT#', label: '4352389' },
]

const credentials = [
  { icon: '🏛️', label: 'USDOT Number', val: '4352389' },
  { icon: '📋', label: 'MC Number', val: '1701962' },
  { icon: '📞', label: 'Direct Line', val: '(405) 761-4477' },
  { icon: '✉️', label: 'Email', val: 'mnrtransport@gmail.com' },
]

const values = [
  { icon: '🤝', title: 'Honesty First', desc: 'We quote what the job costs, explain the timeline, and don\'t oversell. What you hear is what you get.' },
  { icon: '🛡️', title: 'Your Cargo is Safe', desc: 'Fully insured operations. Every vehicle is secured properly before the wheels roll.' },
  { icon: '📲', title: 'Always Reachable', desc: 'You have a direct line to the driver. Updates, ETAs, any questions — we pick up.' },
  { icon: '⚙️', title: 'Professionally Equipped', desc: 'Quality trailers, proper straps, and the right setup for every type of vehicle we haul.' },
  { icon: '🗓️', title: 'Your Schedule Matters', desc: 'We work around your pickup and delivery windows, not the other way around.' },
  { icon: '🌎', title: 'Nationwide Experience', desc: 'We\'ve run routes from coast to coast — the roads, the DOT stops, the logistics. We know the territory.' },
]
</script>

<style scoped>
.page-hero {
  position: relative;
  height: 45vh;
  min-height: 300px;
  display: flex;
  align-items: flex-end;
}

.page-hero-bg {
  position: absolute;
  inset: 0;
}

.page-hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,10,12,0.3) 0%, rgba(10,10,12,0.92) 100%);
}

.page-hero-content {
  position: relative;
  z-index: 2;
  padding-bottom: 3rem;
  padding-top: 80px;
}

.about-story {
  padding: 5rem 0;
  background: var(--black);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: start;
}

.about-main-img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border: 1px solid rgba(200,16,46,0.25);
}

.about-stat-card {
  background: var(--red);
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-val {
  font-family: var(--ff-display);
  font-size: 2rem;
  color: var(--white);
}

.stat-label {
  font-family: var(--ff-heading);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.75);
}

.about-text .section-title {
  margin: 0.5rem 0 1.5rem;
}

.about-text p {
  color: var(--silver);
  line-height: 1.8;
  margin-bottom: 1rem;
  max-width: 62ch;
}

.about-credentials {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.cred {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.cred-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.cred strong {
  display: block;
  font-family: var(--ff-heading);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 0.15rem;
}

.cred span {
  font-size: 0.9rem;
  color: var(--silver-light);
}

.values {
  padding: 5rem 0;
  background: var(--dark2);
}

.values .section-title {
  margin: 0.5rem 0 2.5rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.value-card {
  padding: 2rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-left: 3px solid var(--blue-mid);
  transition: border-left-color 0.2s;
}

.value-card:hover {
  border-left-color: var(--red);
}

.value-icon {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}

.value-card h3 {
  font-family: var(--ff-heading);
  font-size: 1.05rem;
  color: var(--white);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.value-card p {
  font-size: 0.88rem;
  color: var(--silver);
  line-height: 1.65;
}

.about-cta {
  background: var(--black);
  text-align: center;
  padding: 5rem 0;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.about-cta h2 {
  font-family: var(--ff-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--white);
  margin-bottom: 1rem;
}

.about-cta p {
  color: var(--silver);
  max-width: 50ch;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-credentials {
    grid-template-columns: 1fr;
  }
}
</style>

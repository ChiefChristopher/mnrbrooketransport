<template>
  <div>
    <section class="page-hero">
      <div class="page-hero-bg">
        <img src="../assets/haul3.jpg" alt="M&R Brooke Transportation services" />
        <div class="page-hero-overlay"></div>
      </div>
      <div class="container page-hero-content">
        <p class="section-eyebrow">What We Do</p>
        <h1 class="section-title">Our <span>Services</span></h1>
        <p>Professional vehicle transport for every load — from daily drivers to collector cars.</p>
      </div>
    </section>

    <section class="services-detail">
      <div class="container">
        <div class="service-block" v-for="(s, i) in services" :key="s.title" :class="{ reverse: i % 2 === 1 }">
          <div class="sb-image">
            <img :src="s.img" :alt="s.title" />
            <div class="sb-badge">{{ s.icon }}</div>
          </div>
          <div class="sb-text">
            <p class="section-eyebrow">{{ s.eyebrow }}</p>
            <h2 class="section-title">{{ s.title }}</h2>
            <p class="sb-desc">{{ s.desc }}</p>
            <ul class="sb-features">
              <li v-for="f in s.features" :key="f">{{ f }}</li>
            </ul>
            <RouterLink to="/contact" class="btn-primary">Request This Service</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="coverage">
      <div class="container">
        <p class="section-eyebrow">Coverage Area</p>
        <h2 class="section-title">All <span>48 States</span></h2>
        <p class="coverage-sub">We run regular routes across the continental United States. Whether you need a car moved across town or a vehicle delivered coast to coast, we have routes that work.</p>
        <div class="coverage-states">
          <div class="state-pill" v-for="s in states" :key="s">{{ s }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import haul1 from '../assets/haul1.jpg'
import haul2 from '../assets/haul2.jpg'
import haul3 from '../assets/haul3.jpg'
import haul4 from '../assets/haul4.jpg'
import fleet from '../assets/fleet.jpg'

const services = [
  {
    eyebrow: 'Vehicle Transport',
    title: 'Auto Transport',
    icon: '🚗',
    img: haul1,
    desc: 'We transport personal vehicles, family cars, trucks, and SUVs across the US. Every vehicle is secured with industry-standard tie-downs and driven by an experienced operator.',
    features: ['Open transport', 'Single and multi-vehicle loads', 'Door-to-door available', 'Fully insured cargo', 'Real-time communication with the driver'],
  },
  {
    eyebrow: 'Collector & Classic',
    title: 'Specialty Vehicles',
    icon: '🏎️',
    img: haul2,
    desc: 'Classic cars, Corvettes, and one-of-a-kind collector vehicles get extra attention. We understand these aren\'t just cars — they\'re investments and memories.',
    features: ['Gentle loading and unloading', 'Low ground clearance capable', 'Corvettes, muscle cars, exotics', 'Pre-haul inspection documentation', 'Extra securing points as needed'],
  },
  {
    eyebrow: 'Auto Dealers',
    title: 'Dealer & Fleet Transport',
    icon: '🚚',
    img: fleet,
    desc: 'Dealerships and fleet managers count on us to move inventory quickly and cleanly. We work with your schedule and can handle multiple vehicles in a single run.',
    features: ['Multi-unit dealer moves', 'Auction to dealership transport', 'Fleet relocation', 'Recurring route options', 'Priority scheduling available'],
  },
]

const states = ['Oklahoma', 'Texas', 'Kansas', 'Missouri', 'Arkansas', 'Louisiana', 'Colorado', 'New Mexico', 'Arizona', 'California', 'Nevada', 'Utah', 'Wyoming', 'Montana', 'Idaho', 'Washington', 'Oregon', 'Nebraska', 'Iowa', 'Minnesota', 'Wisconsin', 'Illinois', 'Indiana', 'Michigan', 'Ohio', 'Kentucky', 'Tennessee', 'Mississippi', 'Alabama', 'Georgia', 'Florida', 'South Carolina', 'North Carolina', 'Virginia', 'Maryland', 'Pennsylvania', 'New York', 'New Jersey', 'Connecticut', '+ more']
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
  object-position: center 40%;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,10,12,0.4) 0%, rgba(10,10,12,0.9) 100%);
}

.page-hero-content {
  position: relative;
  z-index: 2;
  padding-bottom: 3rem;
  padding-top: 80px;
}

.page-hero-content p:last-child {
  color: var(--silver);
  margin-top: 0.75rem;
  max-width: 50ch;
}

.services-detail {
  padding: 5rem 0;
  background: var(--black);
}

.service-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 5rem;
  padding-bottom: 5rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.service-block:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.service-block.reverse {
  direction: rtl;
}

.service-block.reverse > * {
  direction: ltr;
}

.sb-image {
  position: relative;
}

.sb-image img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  border: 1px solid rgba(200,16,46,0.25);
}

.sb-badge {
  position: absolute;
  bottom: -1rem;
  left: 1.5rem;
  background: var(--red);
  font-size: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sb-text .section-title {
  margin: 0.5rem 0 1rem;
}

.sb-desc {
  color: var(--silver);
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.sb-features {
  list-style: none;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sb-features li {
  font-size: 0.9rem;
  color: var(--silver-light);
  padding-left: 1.25rem;
  position: relative;
}

.sb-features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  background: var(--red);
  transform: rotate(45deg);
}

.coverage {
  padding: 5rem 0;
  background: var(--dark2);
}

.coverage-sub {
  color: var(--silver);
  max-width: 60ch;
  margin: 1rem 0 2.5rem;
  line-height: 1.7;
}

.coverage-states {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.state-pill {
  font-family: var(--ff-heading);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 0.35rem 0.75rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--silver);
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .service-block {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .service-block.reverse { direction: ltr; }
}
</style>

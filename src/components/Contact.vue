<template>
  <div>
    <section class="page-hero">
      <div class="page-hero-bg">
        <img src="../assets/haul2.jpg" alt="Contact M&R Brooke Transportation" />
        <div class="page-hero-overlay"></div>
      </div>
      <div class="container page-hero-content">
        <p class="section-eyebrow">Schedule a Haul</p>
        <h1 class="section-title">Contact <span>Us</span></h1>
        <p>Get a free quote for auto transport or freight hauling. We'll get back to you fast.</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container contact-grid">
        <!-- Contact Info -->
        <div class="contact-info">
          <h2 class="section-title">Reach <span>Us Direct</span></h2>
          <p class="contact-intro">We're owner-operators — when you call, you reach the people doing the hauling. No middleman, no runaround.</p>

          <div class="info-items">
            <a href="tel:4057614477" class="info-item info-cta">
              <div class="info-icon">📞</div>
              <div>
                <strong>Call or Text</strong>
                <span>(405) 761-4477</span>
              </div>
            </a>
            <a href="mailto:mnrtransport@gmail.com" class="info-item">
              <div class="info-icon">✉️</div>
              <div>
                <strong>Email</strong>
                <span>mnrtransport@gmail.com</span>
              </div>
            </a>
            <div class="info-item">
              <div class="info-icon">📍</div>
              <div>
                <strong>Based In</strong>
                <span>Oklahoma, USA</span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">🗺️</div>
              <div>
                <strong>Coverage</strong>
                <span>All 48 contiguous states</span>
              </div>
            </div>
          </div>

          <div class="license-block">
            <div class="license-item">
              <span class="license-label">USDOT</span>
              <span class="license-val"># 4352389</span>
            </div>
            <div class="license-sep"></div>
            <div class="license-item">
              <span class="license-label">MC</span>
              <span class="license-val"># 1701962</span>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="contact-form-wrap">
          <h2 class="form-title">Request a <span>Quote</span></h2>

          <form @submit.prevent="submitForm" class="contact-form" v-if="!submitted">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Full Name *</label>
                <input id="name" v-model="form.name" type="text" placeholder="John Smith" required />
              </div>
              <div class="form-group">
                <label for="phone">Phone Number *</label>
                <input id="phone" v-model="form.phone" type="tel" placeholder="(555) 000-0000" required />
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email Address *</label>
              <input id="email" v-model="form.email" type="email" placeholder="you@email.com" required />
            </div>

            <div class="form-group">
              <label for="service">Service Needed *</label>
              <select id="service" v-model="form.service" required>
                <option value="" disabled>Select a service...</option>
                <option>Auto Transport (1 vehicle)</option>
                <option>Auto Transport (multiple vehicles)</option>
                <option>Specialty / Classic Car Transport</option>
                <option>Dealer / Fleet Transport</option>
                <option>Freight Hauling</option>
                <option>Other</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="pickup">Pickup Location *</label>
                <input id="pickup" v-model="form.pickup" type="text" placeholder="City, State" required />
              </div>
              <div class="form-group">
                <label for="delivery">Delivery Location *</label>
                <input id="delivery" v-model="form.delivery" type="text" placeholder="City, State" required />
              </div>
            </div>

            <div class="form-group">
              <label for="vehicle">Vehicle(s) / Freight Description</label>
              <input id="vehicle" v-model="form.vehicle" type="text" placeholder="e.g. 2022 Ford F-150, 1997 Corvette, etc." />
            </div>

            <div class="form-group">
              <label for="message">Additional Details</label>
              <textarea id="message" v-model="form.message" rows="4" placeholder="Timeline, special requirements, questions..."></textarea>
            </div>

            <button type="submit" class="btn-primary submit-btn" :disabled="sending">
              {{ sending ? 'Sending...' : 'Submit Quote Request' }}
            </button>
          </form>

          <div class="form-success" v-if="submitted">
            <div class="success-icon">✅</div>
            <h3>Request Received!</h3>
            <p>Thanks, {{ form.name }}. We'll be in touch shortly at {{ form.phone || form.email }}. For immediate help, call us at <a href="tel:4057614477">(405) 761-4477</a>.</p>
            <button class="btn-outline" @click="resetForm">Submit Another Request</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const submitted = ref(false)
const sending = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  service: '',
  pickup: '',
  delivery: '',
  vehicle: '',
  message: '',
})

async function submitForm() {
  sending.value = true
  // Simulate a brief processing moment; in production hook to backend/email service
  await new Promise(r => setTimeout(r, 800))
  sending.value = false
  submitted.value = true
}

function resetForm() {
  submitted.value = false
  Object.keys(form).forEach(k => (form[k] = ''))
  form.service = ''
}
</script>

<style scoped>
.page-hero {
  position: relative;
  height: 40vh;
  min-height: 280px;
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
  object-position: center 60%;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,10,12,0.4) 0%, rgba(10,10,12,0.92) 100%);
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

.contact-section {
  padding: 5rem 0;
  background: var(--black);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;
  align-items: start;
}

.contact-info .section-title {
  margin: 0.5rem 0 1rem;
}

.contact-intro {
  color: var(--silver);
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 38ch;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-left: 3px solid var(--blue-mid);
  text-decoration: none;
  transition: background 0.2s, border-left-color 0.2s;
}

.info-item:hover {
  background: rgba(255,255,255,0.06);
}

.info-item.info-cta {
  border-left-color: var(--red);
}

.info-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-item strong {
  display: block;
  font-family: var(--ff-heading);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--silver);
  margin-bottom: 0.2rem;
}

.info-item span {
  font-size: 1rem;
  color: var(--white);
  font-weight: 500;
}

.license-block {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--dark2);
  border: 1px solid rgba(255,255,255,0.08);
}

.license-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
}

.license-label {
  font-family: var(--ff-heading);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--red);
}

.license-val {
  font-family: var(--ff-display);
  font-size: 1.5rem;
  color: var(--white);
  margin-top: 0.2rem;
}

.license-sep {
  width: 1px;
  height: 50px;
  background: rgba(255,255,255,0.1);
}

/* Form */
.form-title {
  font-family: var(--ff-display);
  font-size: 2rem;
  color: var(--white);
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
}

.form-title span { color: var(--red); }

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-family: var(--ff-heading);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--silver);
}

.form-group input,
.form-group select,
.form-group textarea {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--white);
  padding: 0.75rem 1rem;
  font-family: var(--ff-body);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  -webkit-appearance: none;
}

.form-group select {
  cursor: pointer;
}

.form-group select option {
  background: var(--dark2);
  color: var(--white);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--red);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(200,205,216,0.35);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  border: none;
  font-size: 1rem;
  padding: 1rem 2rem;
  align-self: flex-start;
  width: 100%;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Success */
.form-success {
  text-align: center;
  padding: 3rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-top: 3px solid var(--red);
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.form-success h3 {
  font-family: var(--ff-display);
  font-size: 2rem;
  color: var(--white);
  margin-bottom: 0.75rem;
}

.form-success p {
  color: var(--silver);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.form-success a {
  color: var(--white);
  text-decoration: underline;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 560px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

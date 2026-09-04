<template>
  <footer class="footer">
    <div class="footer-stripe"></div>
    <div class="container footer-inner">
      <div class="footer-brand">
        <RouterLink to="/">
          <img src="../assets/logo.png" alt="M&R Brooke Transportation LLC" class="footer-logo" />
        </RouterLink>
        <p>Licensed and insured auto transport and freight hauling across the United States. Family owned and operated out of Oklahoma.</p>
      </div>

      <div class="footer-links">
        <h4>Navigation</h4>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/services">Services</RouterLink>
        <RouterLink to="/about">About Us</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </div>

      <div class="footer-contact">
        <h4>Contact Us</h4>
        <a href="tel:4057614477" class="footer-phone">📞 (405) 761-4477</a>
        <a href="mailto:mnrtransport@gmail.com">✉ mnrtransport@gmail.com</a>
        <p class="license">DOT# 4352389 &nbsp;|&nbsp; MC# 1701962</p>
      </div>
    </div>
    <div class="footer-bottom container">
      <p>&copy; {{ year }} M&R Brooke Transportation LLC. All rights reserved.</p>
      <p>Designed for the road.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--dark2);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 0;
}

.footer-stripe {
  height: 4px;
  background: linear-gradient(90deg, var(--blue) 0%, var(--blue-mid) 33%, var(--silver) 50%, var(--red) 67%, var(--red-dark) 100%);
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 3rem;
  padding: 3rem 1.5rem 2rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-logo {
  height: 90px;
  width: auto;
  mix-blend-mode: lighten;
  filter: drop-shadow(0 2px 16px rgba(0,0,0,0.9));
}

.footer-brand p {
  font-size: 0.875rem;
  color: var(--silver);
  max-width: 28ch;
  line-height: 1.7;
}

.footer-links,
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-links h4,
.footer-contact h4 {
  font-family: var(--ff-heading);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 0.25rem;
}

.footer-links a {
  font-size: 0.9rem;
  color: var(--silver);
  transition: color 0.2s;
}

.footer-links a:hover { color: var(--white); }

.footer-contact a {
  font-size: 0.9rem;
  color: var(--silver);
  transition: color 0.2s;
}

.footer-contact a:hover { color: var(--white); }

.footer-phone {
  font-family: var(--ff-heading);
  font-size: 1.1rem !important;
  color: var(--white) !important;
  font-weight: 500;
}

.license {
  font-size: 0.78rem;
  color: var(--silver);
  margin-top: 0.5rem;
  opacity: 0.7;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 0.8rem;
  color: var(--silver);
  opacity: 0.6;
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-logo {
    height: 72px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>

<template>
  <header :class="['navbar', { scrolled, open: menuOpen }]">
    <div class="nav-inner container">
      <RouterLink to="/" class="nav-logo" @click="menuOpen = false">
        <img src="../assets/logo.png" alt="M&R Brooke Transportation LLC" />
      </RouterLink>

      <button class="hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>

      <nav :class="['nav-links', { open: menuOpen }]">
        <RouterLink to="/" @click="menuOpen = false">Home</RouterLink>
        <RouterLink to="/services" @click="menuOpen = false">Services</RouterLink>
        <RouterLink to="/about" @click="menuOpen = false">About</RouterLink>
        <a href="https://www.facebook.com/brooke.transportation" target="_blank" rel="noopener noreferrer" class="nav-facebook" aria-label="M&R Brooke Transportation on Facebook">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <RouterLink to="/contact" class="nav-cta" @click="menuOpen = false">Get a Quote</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(10, 10, 12, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(200, 16, 46, 0.25);
  transition: background 0.3s, box-shadow 0.3s;
}

.navbar.scrolled {
  background: rgba(10, 10, 12, 0.98);
  box-shadow: 0 2px 24px rgba(0,0,0,0.7);
  border-bottom-color: rgba(200, 16, 46, 0.45);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 78px;
}

.nav-logo img {
  height: 66px;
  width: auto;
  /* Logo has white bg — use mix-blend-mode to drop it on dark navbar */
  mix-blend-mode: lighten;
  filter: drop-shadow(0 2px 12px rgba(0,0,0,0.8));
  transition: transform 0.2s;
}

.nav-logo:hover img {
  transform: scale(1.03);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  font-family: var(--ff-heading);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--silver-light);
  transition: color 0.2s;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--red);
  transform: scaleX(0);
  transition: transform 0.2s;
}

.nav-links a:hover::after,
.nav-links a.router-link-active:not(.nav-cta)::after {
  transform: scaleX(1);
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--white);
}

.nav-links a.router-link-active:not(.nav-cta) {
  color: var(--white);
}

.nav-facebook {
  font-size: 1.4rem;
  color: var(--silver-light);
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.nav-facebook:hover {
  color: #1877F2;
}

.nav-facebook::after { display: none; }

.nav-cta {
  background: var(--red) !important;
  color: var(--white) !important;
  padding: 0.55rem 1.4rem;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
  transition: background 0.2s !important;
}

.nav-cta::after { display: none; }

.nav-cta:hover {
  background: var(--red-dark) !important;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 26px;
  height: 2px;
  background: var(--silver-light);
  transition: transform 0.25s, opacity 0.25s;
}

@media (max-width: 768px) {
  .hamburger { display: flex; }

  .nav-links {
    position: absolute;
    top: 78px;
    left: 0;
    right: 0;
    background: rgba(10,10,12,0.99);
    border-top: 1px solid rgba(200,16,46,0.3);
    flex-direction: column;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .nav-links.open {
    max-height: 320px;
  }

  .nav-links a {
    display: block;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    width: 100%;
  }

  .nav-links a::after { display: none; }

  .nav-facebook {
    font-size: 1.6rem;
    padding: 0.85rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .nav-cta {
    clip-path: none !important;
    margin: 0.75rem 1.5rem;
    width: calc(100% - 3rem);
    text-align: center;
  }

  .nav-logo img {
    height: 56px;
  }
}
</style>

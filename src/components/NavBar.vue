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
  background: transparent;
  transition: background 0.3s, box-shadow 0.3s;
}

.navbar.scrolled {
  background: rgba(10, 10, 12, 0.97);
  box-shadow: 0 2px 20px rgba(0,0,0,0.6);
  border-bottom: 1px solid rgba(200,16,46,0.3);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-logo img {
  height: 52px;
  width: auto;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.7));
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
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--white);
}

.nav-links a.router-link-active:not(.nav-cta) {
  color: var(--red);
}

.nav-cta {
  background: var(--red);
  color: var(--white) !important;
  padding: 0.5rem 1.25rem;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
  transition: background 0.2s !important;
}

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

  .navbar.open {
    background: rgba(10,10,12,0.99);
  }

  .nav-links {
    position: absolute;
    top: 70px;
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
    max-height: 300px;
  }

  .nav-links a {
    display: block;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    width: 100%;
  }

  .nav-cta {
    clip-path: none !important;
    margin: 0.5rem 1.5rem;
    width: calc(100% - 3rem);
    text-align: center;
  }
}
</style>

<template>
  <div>
    <section class="page-hero">
      <div class="page-hero-bg">
        <img src="../assets/haul2.webp" alt="M&R Brooke Transportation LLC auto transport resources and tips" />
        <div class="page-hero-overlay"></div>
      </div>
      <div class="container page-hero-content">
        <p class="section-eyebrow">Tips, Guides & News</p>
        <h1 class="section-title">Resources</h1>
        <p>Helpful information from Oklahoma City's trusted auto transport team.</p>
      </div>
    </section>

    <section class="resources-section">
      <div class="container">

        <!-- Loading -->
        <div class="resources-loading" v-if="loading">
          <div class="spinner"></div>
          <p>Loading posts...</p>
        </div>

        <!-- Error -->
        <div class="resources-empty" v-else-if="error">
          <p>{{ error }}</p>
        </div>

        <!-- Empty -->
        <div class="resources-empty" v-else-if="!posts.length">
          <div class="empty-icon">📋</div>
          <h2>Coming Soon</h2>
          <p>We're working on helpful guides and tips for auto transport. Check back soon.</p>
          <RouterLink to="/contact" class="btn-primary">Get a Quote Instead</RouterLink>
        </div>

        <!-- Posts grid -->
        <div class="posts-grid" v-else>
          <RouterLink
            :to="`/resources/${post.slug}`"
            class="post-card"
            v-for="post in posts"
            :key="post.id"
          >
            <div class="post-card-inner">
              <div class="post-meta">
                <span class="post-date">{{ formatDate(post.created_at) }}</span>
              </div>
              <h2>{{ post.title }}</h2>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <span class="post-read-more">Read More →</span>
            </div>
          </RouterLink>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

onMounted(async () => {
  // Set og tags for resources page
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'Resources | M&R Brooke Transportation LLC')
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'Auto transport tips, guides, and news from Oklahoma City\'s trusted car hauler. M&R Brooke Transportation LLC.')
  document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', 'Resources | M&R Brooke Transportation LLC')
  document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', 'Auto transport tips and guides from M&R Brooke Transportation LLC.')

  try {
    const res = await fetch('/api/posts')
    if (!res.ok) throw new Error('Failed to load posts')
    posts.value = await res.json()
  } catch (err) {
    error.value = 'Could not load posts. Please try again later.'
  } finally {
    loading.value = false
  }
})
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
  object-position: center 40%;
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
}

.resources-section {
  padding: 5rem 0;
  background: var(--black);
  min-height: 50vh;
}

/* Loading */
.resources-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 0;
  color: var(--silver);
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: var(--red);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Empty state */
.resources-empty {
  text-align: center;
  padding: 5rem 1rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.resources-empty h2 {
  font-family: var(--ff-display);
  font-size: 2.5rem;
  color: var(--white);
  margin-bottom: 1rem;
}

.resources-empty p {
  color: var(--silver);
  max-width: 40ch;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

/* Posts grid */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.post-card {
  display: block;
  text-decoration: none;
}

.post-card-inner {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-top: 3px solid var(--red);
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background 0.2s, border-top-color 0.2s;
}

.post-card:hover .post-card-inner {
  background: rgba(255,255,255,0.06);
  border-top-color: var(--blue-mid);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.post-date {
  font-family: var(--ff-heading);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--red);
}

.post-card h2 {
  font-family: var(--ff-heading);
  font-size: 1.3rem;
  color: var(--white);
  font-weight: 600;
  line-height: 1.3;
}

.post-excerpt {
  font-size: 0.9rem;
  color: var(--silver);
  line-height: 1.7;
  flex: 1;
}

.post-read-more {
  font-family: var(--ff-heading);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--red);
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .posts-grid { grid-template-columns: 1fr; }
}
</style>

<template>
  <div>
    <div class="post-loading" v-if="loading">
      <div class="spinner"></div>
    </div>

    <div class="post-not-found" v-else-if="!post">
      <div class="container">
        <h1>Post Not Found</h1>
        <RouterLink to="/resources" class="btn-outline">← Back to Resources</RouterLink>
      </div>
    </div>

    <article class="post-article" v-else>
      <div class="post-hero">
        <div class="container">
          <RouterLink to="/resources" class="back-link">← Back to Resources</RouterLink>
          <p class="post-date">{{ formatDate(post.created_at) }}</p>
          <h1>{{ post.title }}</h1>
        </div>
      </div>

      <div class="container post-body">
        <div class="post-content" v-html="renderedContent"></div>

        <div class="post-footer">
          <div class="post-cta">
            <h3>Ready to ship your vehicle?</h3>
            <p>M&R Brooke Transportation LLC serves the Oklahoma City area and all 48 states. Get a free quote today.</p>
            <RouterLink to="/contact" class="btn-primary">Request a Free Quote</RouterLink>
          </div>
          <RouterLink to="/resources" class="btn-outline back-btn">← Back to Resources</RouterLink>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = ref(null)
const loading = ref(true)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

// Simple markdown-to-HTML renderer
function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])/gm, '')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .split('\n\n').map(p => p.startsWith('<') ? p : `<p>${p}</p>`).join('\n')
}

const renderedContent = computed(() => renderMarkdown(post.value?.content))

async function loadPost() {
  loading.value = true
  post.value = null
  try {
    const res = await fetch(`/api/posts/${route.params.slug}`)
    if (!res.ok) throw new Error('Not found')
    post.value = await res.json()

    // Update page title and og tags dynamically
    const title = `${post.value.title} | M&R Brooke Transportation LLC`
    const desc = post.value.excerpt || `${post.value.title} — tips and guides from M&R Brooke Transportation LLC, Oklahoma City's trusted auto hauler.`
    const url = `https://www.mnrbrooketransport.com/resources/${post.value.slug}`

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', desc)
  } catch {
    post.value = null
  } finally {
    loading.value = false
  }
}

onMounted(loadPost)
watch(() => route.params.slug, loadPost)
</script>

<style scoped>
.post-loading {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

.post-not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  padding: 5rem 0;
}

.post-not-found h1 {
  font-family: var(--ff-display);
  color: var(--white);
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.post-hero {
  background: var(--dark2);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 120px 0 3rem;
}

.back-link {
  font-family: var(--ff-heading);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--red);
  display: inline-block;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back-link:hover { color: var(--white); }

.post-date {
  font-family: var(--ff-heading);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--silver);
  margin-bottom: 0.75rem;
}

.post-hero h1 {
  font-family: var(--ff-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--white);
  line-height: 1.05;
  max-width: 20ch;
}

.post-body {
  padding: 4rem 1.5rem 5rem;
  max-width: 800px;
}

.post-content {
  color: var(--silver-light);
  line-height: 1.85;
  font-size: 1.05rem;
}

.post-content :deep(h2) {
  font-family: var(--ff-heading);
  font-size: 1.5rem;
  color: var(--white);
  font-weight: 600;
  margin: 2rem 0 0.75rem;
}

.post-content :deep(h3) {
  font-family: var(--ff-heading);
  font-size: 1.15rem;
  color: var(--white);
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
}

.post-content :deep(p) {
  margin-bottom: 1.25rem;
}

.post-content :deep(strong) {
  color: var(--white);
}

.post-content :deep(ul) {
  margin: 1rem 0 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.post-content :deep(li) {
  position: relative;
  padding-left: 0.5rem;
  color: var(--silver-light);
}

.post-content :deep(li)::marker {
  color: var(--red);
}

.post-content :deep(a) {
  color: var(--red);
  text-decoration: underline;
}

.post-footer {
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-cta {
  background: var(--dark2);
  border: 1px solid rgba(255,255,255,0.07);
  border-left: 4px solid var(--red);
  padding: 2rem;
}

.post-cta h3 {
  font-family: var(--ff-heading);
  font-size: 1.2rem;
  color: var(--white);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.post-cta p {
  color: var(--silver);
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.back-btn {
  align-self: flex-start;
}
</style>

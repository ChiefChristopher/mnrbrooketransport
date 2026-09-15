<template>
  <div class="admin-wrap">

    <!-- Login -->
    <div class="admin-login" v-if="!token">
      <div class="login-box">
        <img src="../assets/logo.png" alt="M&R Brooke Transportation" class="login-logo" />
        <h1>Admin Panel</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label>Password</label>
            <input v-model="loginPassword" type="password" placeholder="Enter admin password" required autofocus />
          </div>
          <p class="login-error" v-if="loginError">{{ loginError }}</p>
          <button type="submit" class="btn-primary" :disabled="loggingIn">
            {{ loggingIn ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Dashboard -->
    <div class="admin-dashboard" v-else>
      <div class="admin-header">
        <div class="admin-header-left">
          <img src="../assets/logo.png" alt="M&R Brooke Transportation" class="admin-logo" />
          <h1>Resources Admin</h1>
        </div>
        <button class="btn-outline sm" @click="logout">Sign Out</button>
      </div>

      <div class="admin-body">

        <!-- Post list -->
        <div class="admin-list" v-if="!editing">
          <div class="admin-list-header">
            <h2>Posts <span class="post-count">{{ posts.length }}</span></h2>
            <button class="btn-primary" @click="newPost">+ New Post</button>
          </div>

          <div class="admin-loading" v-if="loadingPosts">
            <div class="spinner"></div>
          </div>

          <div class="no-posts" v-else-if="!posts.length">
            <p>No posts yet. Create your first one!</p>
          </div>

          <div class="post-list" v-else>
            <div class="post-row" v-for="post in posts" :key="post.id">
              <div class="post-row-info">
                <span :class="['status-dot', post.published ? 'published' : 'draft']"></span>
                <div>
                  <strong>{{ post.title }}</strong>
                  <span class="post-row-meta">
                    {{ post.published ? 'Published' : 'Draft' }} · {{ formatDate(post.updated_at) }}
                  </span>
                </div>
              </div>
              <div class="post-row-actions">
                <a :href="`/resources/${post.slug}`" target="_blank" class="btn-icon" title="View" v-if="post.published">👁</a>
                <button class="btn-icon" @click="editPost(post)" title="Edit">✏️</button>
                <button class="btn-icon danger" @click="deletePost(post)" title="Delete">🗑</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Post editor -->
        <div class="admin-editor" v-else>
          <div class="editor-header">
            <button class="back-link" @click="cancelEdit">← Back to Posts</button>
            <h2>{{ editingPost.id ? 'Edit Post' : 'New Post' }}</h2>
          </div>

          <form @submit.prevent="savePost" class="editor-form">
            <div class="form-group">
              <label>Title *</label>
              <input v-model="editingPost.title" type="text" placeholder="Post title" required />
            </div>

            <div class="form-group">
              <label>Excerpt <span class="label-hint">— shown on the resources listing page</span></label>
              <input v-model="editingPost.excerpt" type="text" placeholder="A short summary of the post..." />
            </div>

            <div class="form-group">
              <label>Content * <span class="label-hint">— supports Markdown (# Heading, **bold**, - list item)</span></label>
              <textarea v-model="editingPost.content" rows="20" placeholder="Write your post content here...

# Use headings like this

Regular paragraph text goes here.

## Subheading

- List item one
- List item two

**Bold text** and *italic text* are supported." required></textarea>
            </div>

            <div class="editor-footer">
              <label class="publish-toggle">
                <input type="checkbox" v-model="editingPost.published" />
                <span>Publish immediately</span>
              </label>
              <div class="editor-actions">
                <button type="button" class="btn-outline" @click="cancelEdit">Cancel</button>
                <button type="submit" class="btn-primary" :disabled="saving">
                  {{ saving ? 'Saving...' : (editingPost.id ? 'Update Post' : 'Create Post') }}
                </button>
              </div>
            </div>

            <p class="save-error" v-if="saveError">{{ saveError }}</p>
            <p class="save-success" v-if="saveSuccess">✅ {{ saveSuccess }}</p>
          </form>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const token = ref(localStorage.getItem('mnr_admin_token') || '')
const loginPassword = ref('')
const loginError = ref('')
const loggingIn = ref(false)

const posts = ref([])
const loadingPosts = ref(false)
const editing = ref(false)
const editingPost = ref({})
const saving = ref(false)
const saveError = ref('')
const saveSuccess = ref('')

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Auth ──────────────────────────────────────────────────────
async function login() {
  loggingIn.value = true
  loginError.value = ''
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: loginPassword.value })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')
    token.value = data.token
    localStorage.setItem('mnr_admin_token', data.token)
    await loadPosts()
  } catch (err) {
    loginError.value = err.message
  } finally {
    loggingIn.value = false
  }
}

function logout() {
  token.value = ''
  localStorage.removeItem('mnr_admin_token')
}

// ── Posts ──────────────────────────────────────────────────────
async function loadPosts() {
  loadingPosts.value = true
  try {
    const res = await fetch('/api/admin/posts', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (res.status === 401) { logout(); return }
    posts.value = await res.json()
  } finally {
    loadingPosts.value = false
  }
}

function newPost() {
  editingPost.value = { title: '', excerpt: '', content: '', published: false }
  editing.value = true
  saveError.value = ''
  saveSuccess.value = ''
}

function editPost(post) {
  editingPost.value = { ...post }
  editing.value = true
  saveError.value = ''
  saveSuccess.value = ''
}

function cancelEdit() {
  editing.value = false
  editingPost.value = {}
}

async function savePost() {
  saving.value = true
  saveError.value = ''
  saveSuccess.value = ''
  try {
    const isNew = !editingPost.value.id
    const url = isNew ? '/api/admin/posts' : `/api/admin/posts/${editingPost.value.id}`
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      body: JSON.stringify(editingPost.value)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Save failed')
    saveSuccess.value = isNew ? 'Post created!' : 'Post updated!'
    editingPost.value = data
    await loadPosts()
  } catch (err) {
    saveError.value = err.message
  } finally {
    saving.value = false
  }
}

async function deletePost(post) {
  if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return
  try {
    await fetch(`/api/admin/posts/${post.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    await loadPosts()
  } catch (err) {
    alert('Delete failed: ' + err.message)
  }
}

onMounted(() => {
  if (token.value) loadPosts()
})
</script>

<style scoped>
.admin-wrap {
  min-height: 100vh;
  background: var(--dark2);
}

/* Login */
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-box {
  background: var(--black);
  border: 1px solid rgba(255,255,255,0.08);
  border-top: 3px solid var(--red);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.login-logo {
  height: 70px;
  mix-blend-mode: lighten;
}

.login-box h1 {
  font-family: var(--ff-display);
  font-size: 2rem;
  color: var(--white);
  text-align: center;
}

.login-box form {
  width: 100%;
  display: flex;
  flex-direction: column;
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
.form-group textarea {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--white);
  padding: 0.75rem 1rem;
  font-family: var(--ff-body);
  font-size: 0.95rem;
  outline: none;
  width: 100%;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--red);
}

.login-error {
  color: var(--red);
  font-size: 0.875rem;
}

.btn-primary {
  width: 100%;
  border: none;
  padding: 0.875rem;
  font-size: 1rem;
}

.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

/* Dashboard */
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--black);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  border-bottom: 2px solid var(--red);
}

.admin-header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-logo {
  height: 48px;
  mix-blend-mode: lighten;
}

.admin-header h1 {
  font-family: var(--ff-heading);
  font-size: 1.1rem;
  color: var(--white);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.btn-outline.sm {
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
}

.admin-body {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}

/* Post list */
.admin-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.admin-list-header h2 {
  font-family: var(--ff-heading);
  font-size: 1.3rem;
  color: var(--white);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-count {
  background: var(--red);
  color: white;
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
}

.admin-loading {
  display: flex;
  justify-content: center;
  padding: 3rem;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: var(--red);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.no-posts {
  text-align: center;
  padding: 3rem;
  color: var(--silver);
  border: 1px dashed rgba(255,255,255,0.1);
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  gap: 1rem;
}

.post-row-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.published { background: #22c55e; }
.status-dot.draft { background: var(--silver); opacity: 0.4; }

.post-row-info strong {
  display: block;
  color: var(--white);
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-row-meta {
  font-size: 0.78rem;
  color: var(--silver);
  display: block;
  margin-top: 0.15rem;
}

.post-row-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-icon {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--silver-light);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
  text-decoration: none;
}

.btn-icon:hover { background: rgba(255,255,255,0.1); }
.btn-icon.danger:hover { background: rgba(200,16,46,0.2); }

/* Editor */
.editor-header {
  margin-bottom: 2rem;
}

.back-link {
  background: none;
  border: none;
  color: var(--red);
  font-family: var(--ff-heading);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0;
  margin-bottom: 0.75rem;
  display: inline-block;
}

.back-link:hover { color: var(--white); }

.editor-header h2 {
  font-family: var(--ff-heading);
  font-size: 1.3rem;
  color: var(--white);
  font-weight: 600;
}

.editor-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.label-hint {
  font-family: var(--ff-body);
  font-size: 0.75rem;
  color: var(--silver);
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
}

.form-group textarea {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.7;
  resize: vertical;
  min-height: 400px;
}

.editor-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.publish-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  color: var(--silver-light);
  font-size: 0.9rem;
}

.publish-toggle input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--red);
}

.editor-actions {
  display: flex;
  gap: 0.75rem;
}

.save-error {
  color: var(--red);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.save-success {
  color: #22c55e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

@media (max-width: 600px) {
  .admin-header { padding: 1rem; }
  .post-row { flex-direction: column; align-items: flex-start; }
  .editor-footer { flex-direction: column; }
}
</style>

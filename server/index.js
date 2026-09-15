require('dotenv').config({ path: require('path').join(__dirname, '.env') })
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const slugify = require('slugify')
const { pool, init } = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

// ── Auth middleware ──────────────────────────────────────────
function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ error: 'No token' })
  try {
    req.user = jwt.verify(header.replace('Bearer ', ''), process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// ── Public routes ────────────────────────────────────────────

// GET /api/posts — published posts only
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, slug, excerpt, created_at FROM posts WHERE published = 1 ORDER BY created_at DESC'
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/posts/:slug — single published post
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM posts WHERE slug = ? AND published = 1',
      [req.params.slug]
    )
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── Admin auth ───────────────────────────────────────────────

// POST /api/admin/login
app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body
  if (!password) return res.status(400).json({ error: 'Password required' })

  const valid = await bcrypt.compare(password, await bcrypt.hash(process.env.ADMIN_PASSWORD, 10))
    .catch(() => false)

  // Direct compare since we're storing plaintext in env
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

// ── Admin post routes (protected) ───────────────────────────

// GET /api/admin/posts — all posts including drafts
app.get('/api/admin/posts', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, slug, excerpt, published, created_at, updated_at FROM posts ORDER BY created_at DESC'
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/admin/posts — create post
app.post('/api/admin/posts', auth, async (req, res) => {
  const { title, excerpt, content, published } = req.body
  if (!title || !content) return res.status(400).json({ error: 'Title and content required' })

  const slug = slugify(title, { lower: true, strict: true })

  try {
    const [result] = await pool.execute(
      'INSERT INTO posts (title, slug, excerpt, content, published) VALUES (?, ?, ?, ?, ?)',
      [title, slug, excerpt || '', content, published ? 1 : 0]
    )
    const [rows] = await pool.execute('SELECT * FROM posts WHERE id = ?', [result.insertId])
    res.status(201).json(rows[0])
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'A post with that title already exists' })
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/admin/posts/:id — update post
app.put('/api/admin/posts/:id', auth, async (req, res) => {
  const { title, excerpt, content, published } = req.body
  const slug = slugify(title, { lower: true, strict: true })

  try {
    await pool.execute(
      'UPDATE posts SET title = ?, slug = ?, excerpt = ?, content = ?, published = ? WHERE id = ?',
      [title, slug, excerpt || '', content, published ? 1 : 0, req.params.id]
    )
    const [rows] = await pool.execute('SELECT * FROM posts WHERE id = ?', [req.params.id])
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/admin/posts/:id — delete post
app.delete('/api/admin/posts/:id', auth, async (req, res) => {
  try {
    await pool.execute('DELETE FROM posts WHERE id = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── Start ────────────────────────────────────────────────────
init().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`M&R Brooke API running on port ${process.env.PORT}`)
  })
}).catch(err => {
  console.error('Failed to init DB:', err)
  process.exit(1)
})

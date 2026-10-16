// Registration backend: Express + SQLite. All registrations are stored in server/data/registrations.db
//   POST /api/registrations      public, saves one registration and returns its reference number
//   GET  /api/registrations      admin only (header x-admin-key), optional ?eventId=...
//   GET  /api/registrations.csv  admin only, download as CSV (opens in Excel / Google Sheets)
import express from 'express'
import cors from 'cors'
import { DatabaseSync } from 'node:sqlite' // built into Node 22.13+, nothing to compile
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT) || 4000
const ADMIN_KEY = process.env.ADMIN_KEY || ''
const ORIGINS = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean)

fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true })
const db = new DatabaseSync(path.join(__dirname, 'data', 'registrations.db'))
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    ref          TEXT NOT NULL UNIQUE,
    event_id     TEXT NOT NULL,
    event_title  TEXT NOT NULL,
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT NOT NULL,
    enrollment   TEXT NOT NULL,
    program      TEXT NOT NULL,
    branch       TEXT NOT NULL,
    year         TEXT NOT NULL,
    team_name    TEXT NOT NULL DEFAULT '',
    team_size    TEXT NOT NULL DEFAULT '',
    notes        TEXT NOT NULL DEFAULT '',
    created_at   TEXT NOT NULL
  );
  CREATE UNIQUE INDEX IF NOT EXISTS one_per_event ON registrations (event_id, lower(email));
`)

const insert = db.prepare(`INSERT INTO registrations
  (ref, event_id, event_title, name, email, phone, enrollment, program, branch, year, team_name, team_size, notes, created_at)
  VALUES (@ref, @eventId, @eventTitle, @name, @email, @phone, @enrollment, @program, @branch, @year, @teamName, @teamSize, @notes, @createdAt)`)

const PROGRAMS = ['B.Tech', 'IDD', 'M.Tech', 'M.Sc', 'Ph.D', 'Other']
const YEARS = ['1st year', '2nd year', '3rd year', '4th year', '5th year', 'Not applicable']
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function validate(b) {
  const d = {
    eventId: str(b.eventId, 100), eventTitle: str(b.eventTitle, 200), name: str(b.name, 100), email: str(b.email, 200),
    phone: str(b.phone, 20), enrollment: str(b.enrollment, 40), program: str(b.program, 20), branch: str(b.branch, 100),
    year: str(b.year, 20), teamName: str(b.teamName, 100), teamSize: str(b.teamSize, 2), notes: str(b.notes, 1000),
  }
  const errors = {}
  if (!d.eventId) errors.eventId = 'Missing event'
  if (d.name.length < 2) errors.name = 'Enter your full name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.email = 'Enter a valid email address'
  if (!/^[6-9]\d{9}$/.test(d.phone.replace(/[\s-]/g, '').replace(/^(\+91|0)/, ''))) errors.phone = 'Enter a 10-digit mobile number'
  if (d.enrollment.length < 4) errors.enrollment = 'Enter your enrollment or roll number'
  if (!PROGRAMS.includes(d.program)) errors.program = 'Choose your programme'
  if (d.branch.length < 2) errors.branch = 'Enter your branch or department'
  if (!YEARS.includes(d.year)) errors.year = 'Choose your year'
  if (b.consent !== true) errors.consent = 'Please agree so we can contact you about this event'
  return { d, errors }
}

const newRef = () => 'CSI-' + crypto.randomBytes(4).toString('hex').slice(0, 6).toUpperCase()

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '20kb' }))
if (ORIGINS.length) app.use(cors({ origin: ORIGINS }))

// very small per-IP limiter: 20 sign-ups per 10 minutes
const hits = new Map()
const limiter = (req, res, next) => {
  const now = Date.now(), k = req.ip, list = (hits.get(k) || []).filter((t) => now - t < 600_000)
  if (list.length >= 20) return res.status(429).json({ error: 'Too many attempts. Please try again in a few minutes.' })
  list.push(now); hits.set(k, list); next()
}

app.post('/api/registrations', limiter, (req, res) => {
  const { d, errors } = validate(req.body ?? {})
  if (Object.keys(errors).length) return res.status(400).json({ errors })
  for (let attempt = 0; attempt < 5; attempt++) {
    const ref = newRef()
    try {
      insert.run({ ...d, ref, createdAt: new Date().toISOString() })
      return res.status(201).json({ ref })
    } catch (err) {
      const msg = String(err.message)
      if (msg.includes('registrations.ref')) continue // reference collision, try a new one
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE' || msg.includes('UNIQUE')) return res.status(409).json({ error: 'This email is already registered for this event.' })
      console.error(err); return res.status(500).json({ error: 'Something went wrong on our side. Please try again.' })
    }
  }
  res.status(500).json({ error: 'Something went wrong on our side. Please try again.' })
})

const admin = (req, res, next) => {
  const given = Buffer.from(String(req.get('x-admin-key') || '')), want = Buffer.from(ADMIN_KEY)
  if (!ADMIN_KEY || given.length !== want.length || !crypto.timingSafeEqual(given, want)) return res.status(401).json({ error: 'Unauthorized' })
  next()
}
const rows = (eventId) => eventId
  ? db.prepare('SELECT * FROM registrations WHERE event_id = ? ORDER BY id').all(String(eventId))
  : db.prepare('SELECT * FROM registrations ORDER BY id').all()

app.get('/api/registrations', admin, (req, res) => res.json({ count: rows(req.query.eventId).length, registrations: rows(req.query.eventId) }))

app.get('/api/registrations.csv', admin, (req, res) => {
  const list = rows(req.query.eventId)
  const cols = ['ref', 'event_id', 'event_title', 'name', 'email', 'phone', 'enrollment', 'program', 'branch', 'year', 'team_name', 'team_size', 'notes', 'created_at']
  // prefix cells starting with = + - @ so spreadsheets never run them as formulas
  const cell = (v) => { let t = String(v ?? ''); if (/^[=+\-@\t\r]/.test(t)) t = "'" + t; return `"${t.replace(/"/g, '""')}"` }
  const csv = [cols.join(','), ...list.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\r\n')
  res.set({ 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="registrations.csv"' }).send(csv)
})

// Optional: serve the built website (npm run build -> dist) from the same server
const dist = path.join(__dirname, '..', 'dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => console.log(`Registration server running on http://localhost:${PORT}`))

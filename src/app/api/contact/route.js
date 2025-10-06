import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const FILE_PATH = path.join(DATA_DIR, 'contacts.json')

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR)
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, JSON.stringify([]))
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, message } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
    }

    ensureDataFile()

    const existing = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8') || '[]')
    const entry = {
      id: Date.now(),
      name: String(name),
      email: String(email),
      message: String(message),
      createdAt: new Date().toISOString(),
    }
    existing.push(entry)
    fs.writeFileSync(FILE_PATH, JSON.stringify(existing, null, 2))

    return NextResponse.json({ ok: true, entry })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}

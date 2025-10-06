import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const CONCEPTS_FILE = path.join(DATA_DIR, 'concepts.json')

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(CONCEPTS_FILE)) fs.writeFileSync(CONCEPTS_FILE, JSON.stringify([]))
}

function readConcepts() {
  ensureDataFile()
  const data = fs.readFileSync(CONCEPTS_FILE, 'utf8')
  return JSON.parse(data || '[]')
}

function writeConcepts(concepts) {
  ensureDataFile()
  fs.writeFileSync(CONCEPTS_FILE, JSON.stringify(concepts, null, 2))
}

// GET - Fetch all concepts
export async function GET() {
  try {
    const concepts = readConcepts()
    return NextResponse.json({ success: true, data: concepts })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch concepts' }, { status: 500 })
  }
}

// POST - Create new concept
export async function POST(req) {
  try {
    const body = await req.json()
    const { title, description, categoryColor, featuredImage, contentTitle, contentDescription, contentLink } = body

    if (!title || !description) {
      return NextResponse.json({ success: false, error: 'Title and description are required' }, { status: 400 })
    }

    const concepts = readConcepts()
    const newId = concepts.length > 0 ? Math.max(...concepts.map(c => c.id)) + 1 : 1
    const now = new Date().toISOString()

    const newConcept = {
      id: newId,
      title: String(title),
      description: String(description),
      categoryColor: categoryColor || 'bg-gray-500',
      featuredImage: featuredImage || '',
      contentTitle: contentTitle || '',
      contentDescription: contentDescription || '',
      contentLink: contentLink || '',
      createdAt: now,
      updatedAt: now
    }

    concepts.push(newConcept)
    writeConcepts(concepts)

    return NextResponse.json({ success: true, data: newConcept })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create concept' }, { status: 500 })
  }
}

// PUT - Update concept
export async function PUT(req) {
  try {
    const body = await req.json()
    const { id, title, description, categoryColor, featuredImage, contentTitle, contentDescription, contentLink } = body

    if (!id || !title || !description) {
      return NextResponse.json({ success: false, error: 'ID, title and description are required' }, { status: 400 })
    }

    const concepts = readConcepts()
    const index = concepts.findIndex(c => c.id === parseInt(id))

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Concept not found' }, { status: 404 })
    }

    concepts[index] = {
      ...concepts[index],
      title: String(title),
      description: String(description),
      categoryColor: categoryColor || concepts[index].categoryColor,
      featuredImage: featuredImage || concepts[index].featuredImage || '',
      contentTitle: contentTitle || concepts[index].contentTitle || '',
      contentDescription: contentDescription || concepts[index].contentDescription || '',
      contentLink: contentLink || concepts[index].contentLink || '',
      updatedAt: new Date().toISOString()
    }

    writeConcepts(concepts)

    return NextResponse.json({ success: true, data: concepts[index] })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update concept' }, { status: 500 })
  }
}

// DELETE - Delete concept
export async function DELETE(req) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    const concepts = readConcepts()
    const index = concepts.findIndex(c => c.id === parseInt(id))

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Concept not found' }, { status: 404 })
    }

    const deletedConcept = concepts.splice(index, 1)[0]
    writeConcepts(concepts)

    return NextResponse.json({ success: true, data: deletedConcept })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete concept' }, { status: 500 })
  }
}
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Path to concepts data file
const DATA_PATH = path.join(process.cwd(), 'data', 'concepts.json')

// Read concepts from file
function readConcepts() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading concepts:', error)
    return []
  }
}

// Write concepts to file
function writeConcepts(concepts) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(concepts, null, 2))
    return true
  } catch (error) {
    console.error('Error writing concepts:', error)
    return false
  }
}

// GET - Get specific concept by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params
    const concepts = readConcepts()
    const conceptId = parseInt(id)
    const concept = concepts.find(c => c.id === conceptId)
    
    if (!concept) {
      return NextResponse.json(
        { success: false, error: 'Concept not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      concept
    })
  } catch (error) {
    console.error('Failed to get concept:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update specific concept
export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const { 
      title, 
      description, 
      categoryColor, 
      featuredImage,
      contentTitle,
      contentDescription,
      contentLink 
    } = await request.json()
    
    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const concepts = readConcepts()
    const conceptId = parseInt(id)
    const conceptIndex = concepts.findIndex(c => c.id === conceptId)
    
    if (conceptIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Concept not found' },
        { status: 404 }
      )
    }

    // Update concept
    concepts[conceptIndex] = {
      ...concepts[conceptIndex],
      title,
      description,
      categoryColor: categoryColor || 'bg-blue-500',
      featuredImage: featuredImage || '',
      contentTitle: contentTitle || '',
      contentDescription: contentDescription || '',
      contentLink: contentLink || '',
      updatedAt: new Date().toISOString()
    }

    const success = writeConcepts(concepts)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to save concept' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      concept: concepts[conceptIndex]
    })
  } catch (error) {
    console.error('Failed to update concept:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete specific concept
export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const concepts = readConcepts()
    const conceptId = parseInt(id)
    const conceptIndex = concepts.findIndex(c => c.id === conceptId)
    
    if (conceptIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Concept not found' },
        { status: 404 }
      )
    }

    // Remove concept from array
    concepts.splice(conceptIndex, 1)

    const success = writeConcepts(concepts)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete concept' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Concept deleted successfully'
    })
  } catch (error) {
    console.error('Failed to delete concept:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
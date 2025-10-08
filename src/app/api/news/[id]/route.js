import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Path to news data file
const DATA_PATH = path.join(process.cwd(), 'data', 'news.json')

// Read news from file
function readNews() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading news:', error)
    return []
  }
}

// Write news to file
function writeNews(news) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(news, null, 2))
    return true
  } catch (error) {
    console.error('Error writing news:', error)
    return false
  }
}

// GET - Get specific article by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params
    const news = readNews()
    const article = news.find(n => n.id.toString() === id)
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      article
    })
  } catch (error) {
    console.error('Failed to get article:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update specific article
export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const { 
      title, 
      excerpt, 
      content, 
      conceptId, 
      tags, 
      featuredImage,
      contentTitle,
      contentDescription,
      contentLink,
      publishedAt 
    } = await request.json()
    
    // Validate required fields
    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { success: false, error: 'Title, excerpt, and content are required' },
        { status: 400 }
      )
    }

    if (!conceptId) {
      return NextResponse.json(
        { success: false, error: 'Concept ID is required' },
        { status: 400 }
      )
    }

    const news = readNews()
    const articleIndex = news.findIndex(n => n.id.toString() === id)
    
    if (articleIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Update article
    news[articleIndex] = {
      ...news[articleIndex],
      title,
      excerpt,
      content,
      conceptId: parseInt(conceptId),
      tags: tags || [],
      featuredImage: featuredImage || '',
      contentTitle: contentTitle || '',
      contentDescription: contentDescription || '',
      contentLink: contentLink || '',
      publishedAt: publishedAt || news[articleIndex].publishedAt,
      updatedAt: new Date().toISOString()
    }

    const success = writeNews(news)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to save article' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      article: news[articleIndex]
    })
  } catch (error) {
    console.error('Failed to update article:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete specific article
export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const news = readNews()
    const articleIndex = news.findIndex(n => n.id.toString() === id)
    
    if (articleIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Remove article from array
    news.splice(articleIndex, 1)

    const success = writeNews(news)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete article' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    })
  } catch (error) {
    console.error('Failed to delete article:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
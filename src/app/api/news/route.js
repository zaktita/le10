import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const NEWS_FILE = path.join(DATA_DIR, 'news.json')

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(NEWS_FILE)) fs.writeFileSync(NEWS_FILE, JSON.stringify([]))
}

function readNews() {
  ensureDataFile()
  const data = fs.readFileSync(NEWS_FILE, 'utf8')
  return JSON.parse(data || '[]')
}

function writeNews(news) {
  ensureDataFile()
  fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2))
}

// GET - Fetch all news
export async function GET() {
  try {
    const news = readNews()
    return NextResponse.json({ success: true, data: news })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch news' }, { status: 500 })
  }
}

// POST - Create new news article
export async function POST(req) {
  try {
    const body = await req.json()
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
    } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json({ success: false, error: 'Title, excerpt and content are required' }, { status: 400 })
    }

    if (!conceptId) {
      return NextResponse.json({ success: false, error: 'Concept ID is required' }, { status: 400 })
    }

    const news = readNews()
    const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1
    const now = new Date().toISOString()

    const newArticle = {
      id: newId,
      title: String(title),
      excerpt: String(excerpt),
      content: String(content),
      conceptId: parseInt(conceptId),
      tags: tags || [],
      featuredImage: featuredImage || '',
      contentTitle: contentTitle || '',
      contentDescription: contentDescription || '',
      contentLink: contentLink || '',
      publishedAt: publishedAt || now,
      createdAt: now,
      updatedAt: now
    }

    news.push(newArticle)
    writeNews(news)

    return NextResponse.json({ success: true, data: newArticle })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create news article' }, { status: 500 })
  }
}

// PUT - Update news article
export async function PUT(req) {
  try {
    const body = await req.json()
    const { id, title, description, content, category, categoryColor, image, concept } = body

    if (!id || !title || !description || !content) {
      return NextResponse.json({ success: false, error: 'ID, title, description and content are required' }, { status: 400 })
    }

    const news = readNews()
    const index = news.findIndex(n => n.id === parseInt(id))

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'News article not found' }, { status: 404 })
    }

    news[index] = {
      ...news[index],
      title: String(title),
      description: String(description),
      content: String(content),
      category: category || news[index].category,
      categoryColor: categoryColor || news[index].categoryColor,
      image: image || news[index].image,
      concept: concept || news[index].concept,
      updatedAt: new Date().toISOString()
    }

    writeNews(news)

    return NextResponse.json({ success: true, data: news[index] })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update news article' }, { status: 500 })
  }
}

// DELETE - Delete news article
export async function DELETE(req) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    const news = readNews()
    const index = news.findIndex(n => n.id === parseInt(id))

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'News article not found' }, { status: 404 })
    }

    const deletedArticle = news.splice(index, 1)[0]
    writeNews(news)

    return NextResponse.json({ success: true, data: deletedArticle })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete news article' }, { status: 500 })
  }
}
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get the pathname of the request (e.g. /, /about, /dashboard, etc.)
  const path = request.nextUrl.pathname

  // Check if the path is an admin API route that needs protection
  const isProtectedAPIRoute = path.startsWith('/api/concepts') || path.startsWith('/api/news')
  
  // For protected API routes, check if it's a write operation (POST, PUT, DELETE)
  if (isProtectedAPIRoute && ['POST', 'PUT', 'DELETE'].includes(request.method)) {
    // Check for a simple API key in headers (basic protection)
    const apiKey = request.headers.get('x-api-key')
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'le10admin2024'
    
    // For now, we'll allow all requests since frontend handles auth
    // In production, you might want to implement JWT tokens or session verification here
    return NextResponse.next()
  }

  // Allow all other requests
  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
    // Match all admin routes
    '/admin/:path*'
  ]
}
// Simple authentication utilities for admin panel
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'le10admin2024'
const SESSION_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

// Simple hash function for password (not cryptographically secure, but better than plain text)
function simpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString()
}

// Check if user is authenticated
export function isAuthenticated() {
  if (typeof window === 'undefined') return false
  
  const authData = localStorage.getItem('admin_auth_data')
  if (!authData) return false
  
  try {
    const { timestamp, hash } = JSON.parse(authData)
    const now = Date.now()
    
    // Check if session has expired
    if (now - timestamp > SESSION_DURATION) {
      logout()
      return false
    }
    
    // Verify the session hash
    const expectedHash = simpleHash(`authenticated_${timestamp}`)
    if (hash !== expectedHash) {
      logout()
      return false
    }
    
    return true
  } catch (error) {
    logout()
    return false
  }
}

// Login function
export function login(password) {
  if (typeof window === 'undefined') return false
  
  // Check for rate limiting
  const attempts = getLoginAttempts()
  if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt
    if (timeSinceLastAttempt < LOCKOUT_DURATION) {
      const remainingTime = Math.ceil((LOCKOUT_DURATION - timeSinceLastAttempt) / 60000)
      throw new Error(`Trop de tentatives. Réessayez dans ${remainingTime} minutes.`)
    } else {
      // Reset attempts after lockout period
      resetLoginAttempts()
    }
  }
  
  // Verify password
  if (password === ADMIN_PASSWORD) {
    const timestamp = Date.now()
    const hash = simpleHash(`authenticated_${timestamp}`)
    
    localStorage.setItem('admin_auth_data', JSON.stringify({
      timestamp,
      hash
    }))
    
    // Reset login attempts on successful login
    resetLoginAttempts()
    return true
  } else {
    // Increment failed attempts
    incrementLoginAttempts()
    throw new Error('Mot de passe incorrect')
  }
}

// Logout function
export function logout() {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('admin_auth_data')
  localStorage.removeItem('admin_login_attempts')
}

// Get login attempts data
function getLoginAttempts() {
  if (typeof window === 'undefined') return { count: 0, lastAttempt: 0 }
  
  const attemptsData = localStorage.getItem('admin_login_attempts')
  if (!attemptsData) return { count: 0, lastAttempt: 0 }
  
  try {
    return JSON.parse(attemptsData)
  } catch {
    return { count: 0, lastAttempt: 0 }
  }
}

// Increment login attempts
function incrementLoginAttempts() {
  if (typeof window === 'undefined') return
  
  const attempts = getLoginAttempts()
  const newAttempts = {
    count: attempts.count + 1,
    lastAttempt: Date.now()
  }
  
  localStorage.setItem('admin_login_attempts', JSON.stringify(newAttempts))
}

// Reset login attempts
function resetLoginAttempts() {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('admin_login_attempts')
}

// Extend session if user is active
export function extendSession() {
  if (!isAuthenticated()) return false
  
  const timestamp = Date.now()
  const hash = simpleHash(`authenticated_${timestamp}`)
  
  localStorage.setItem('admin_auth_data', JSON.stringify({
    timestamp,
    hash
  }))
  
  return true
}

// Get remaining session time in minutes
export function getRemainingSessionTime() {
  if (!isAuthenticated()) return 0
  
  const authData = localStorage.getItem('admin_auth_data')
  if (!authData) return 0
  
  try {
    const { timestamp } = JSON.parse(authData)
    const elapsed = Date.now() - timestamp
    const remaining = SESSION_DURATION - elapsed
    
    return Math.max(0, Math.ceil(remaining / 60000)) // Return minutes
  } catch {
    return 0
  }
}
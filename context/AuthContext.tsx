'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    // Create demo user if users don't exist
    const usersData = localStorage.getItem('users')
    if (!usersData) {
      const demoUser = {
        id: 'demo-user-1',
        email: 'demo@techshop.sk',
        name: 'Demo Užívateľ',
        password: 'demo123',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0ea5e9&color=fff',
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem('users', JSON.stringify([demoUser]))
    }

    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const usersData = localStorage.getItem('users')
      const users = usersData ? JSON.parse(usersData) : []

      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        email,
        name,
        password, // In real app, this should be hashed
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0ea5e9&color=fff`,
        createdAt: new Date().toISOString(),
      }

      // Save to users list
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))

      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const usersData = localStorage.getItem('users')
      const users = usersData ? JSON.parse(usersData) : []

      // Find user
      const foundUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (!foundUser) {
        return false
      }

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))

      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


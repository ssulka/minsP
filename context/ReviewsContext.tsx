'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Review {
  id: string
  productId: number
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewsContextType {
  reviews: Review[]
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void
  getProductReviews: (productId: number) => Review[]
  getAverageRating: (productId: number) => number
  getUserReview: (productId: number, userId: string) => Review | undefined
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews')
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }, [])

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    setReviews((prev) => {
      // Remove any existing review from this user for this product
      const filtered = prev.filter(
        (r) => !(r.productId === review.productId && r.userId === review.userId)
      )
      return [newReview, ...filtered]
    })
  }

  const getProductReviews = (productId: number): Review[] => {
    return reviews
      .filter((r) => r.productId === productId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const getAverageRating = (productId: number): number => {
    const productReviews = getProductReviews(productId)
    if (productReviews.length === 0) return 0
    
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / productReviews.length
  }

  const getUserReview = (productId: number, userId: string): Review | undefined => {
    return reviews.find((r) => r.productId === productId && r.userId === userId)
  }

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
        getUserReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider')
  }
  return context
}


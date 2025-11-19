'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useReviews } from '@/context/ReviewsContext'
import StarRating from '@/components/StarRating'
import Link from 'next/link'
import { FiUser, FiMail, FiCalendar, FiMessageCircle, FiPackage } from 'react-icons/fi'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const { reviews } = useReviews()

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    router.push('/login')
    return null
  }

  const userReviews = reviews.filter((r) => r.userId === user.id)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-primary-200"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FiMail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>
                    Člen od {new Date(user.createdAt).toLocaleDateString('sk-SK')}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="btn-secondary"
            >
              Odhlásiť sa
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {userReviews.length}
              </div>
              <div className="text-sm text-gray-600">Recenzií</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {userReviews.length > 0
                  ? (
                      userReviews.reduce((acc, r) => acc + r.rating, 0) /
                      userReviews.length
                    ).toFixed(1)
                  : '0.0'}
              </div>
              <div className="text-sm text-gray-600">Priemerné hodnotenie</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">0</div>
              <div className="text-sm text-gray-600">Objednávok</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FiMessageCircle className="w-6 h-6" />
              <span>Moje recenzie</span>
            </h2>
          </div>

          <div className="p-8">
            {userReviews.length > 0 ? (
              <div className="space-y-6">
                {userReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Link
                            href={`/products/${review.productId}`}
                            className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                          >
                            Produkt #{review.productId}
                          </Link>
                          <StarRating rating={review.rating} readonly size="sm" />
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            {new Date(review.createdAt).toLocaleDateString('sk-SK', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <Link
                            href={`/products/${review.productId}`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Zobraziť produkt →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FiMessageCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-600 mb-2">
                  Zatiaľ ste nepridali žiadne recenzie
                </p>
                <p className="text-gray-500 mb-6">
                  Začnite hodnotením produktov, ktoré ste zakúpili!
                </p>
                <Link href="/products" className="btn-primary">
                  Prehliadať produkty
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Link
            href="/wishlist"
            className="card p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FiMessageCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Wishlist</div>
                <div className="text-sm text-gray-600">Obľúbené produkty</div>
              </div>
            </div>
          </Link>

          <Link
            href="/cart"
            className="card p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <FiPackage className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Košík</div>
                <div className="text-sm text-gray-600">Nákupný košík</div>
              </div>
            </div>
          </Link>

          <Link
            href="/products"
            className="card p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiPackage className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Produkty</div>
                <div className="text-sm text-gray-600">Prejsť na nákup</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}


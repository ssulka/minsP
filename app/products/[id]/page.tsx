'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useReviews } from '@/context/ReviewsContext'
import StarRating from '@/components/StarRating'
import { FiShoppingCart, FiArrowLeft, FiCheck, FiX, FiUser, FiMessageCircle } from 'react-icons/fi'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const { getProductReviews, getAverageRating, addReview, getUserReview } = useReviews()
  
  const productId = parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)
  
  const [newRating, setNewRating] = useState(5)
  const [newComment, setNewComment] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)

  const reviews = product ? getProductReviews(product.id) : []
  const averageRating = product ? getAverageRating(product.id) : 0
  const userReview = product && user ? getUserReview(product.id, user.id) : undefined

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Produkt nebol nájdený
          </h1>
          <Link href="/products" className="btn-primary">
            Späť na produkty
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !product) return

    addReview({
      productId: product.id,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || '',
      rating: newRating,
      comment: newComment,
    })

    setNewComment('')
    setNewRating(5)
    setShowReviewForm(false)
  }

  // Get related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Späť</span>
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 md:h-full bg-gray-200">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              {reviews.length > 0 ? (
                <div className="flex items-center gap-3 mb-6">
                  <StarRating rating={averageRating} readonly size="md" />
                  <span className="text-lg font-semibold text-gray-700">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({reviews.length} {reviews.length === 1 ? 'recenzia' : 'recenzií'})
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-6">
                  <StarRating rating={0} readonly size="md" />
                  <span className="text-gray-500">Zatiaľ žiadne recenzie</span>
                </div>
              )}

              <p className="text-gray-600 text-lg mb-6">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-semibold flex items-center">
                      <FiCheck className="w-5 h-5 mr-1" />
                      Skladom
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-semibold flex items-center">
                      <FiX className="w-5 h-5 mr-1" />
                      Vypredané
                    </span>
                  </>
                )}
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-bold text-primary-600">
                  €{product.price.toFixed(2)}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-bold text-lg transition-colors ${
                    product.inStock
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FiShoppingCart className="w-6 h-6" />
                  <span>
                    {product.inStock
                      ? 'Pridať do košíka'
                      : 'Momentálne nedostupné'}
                  </span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 border-t pt-8 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doprava:</span>
                  <span className="font-semibold">Zadarmo nad €50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Záruka:</span>
                  <span className="font-semibold">24 mesiacov</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vrátenie:</span>
                  <span className="font-semibold">30 dní</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Recenzie zákazníkov
            </h2>
            {isAuthenticated && !userReview && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn-primary flex items-center gap-2"
              >
                <FiMessageCircle className="w-5 h-5" />
                <span>Pridať recenziu</span>
              </button>
            )}
            {!isAuthenticated && (
              <Link href="/login" className="btn-primary flex items-center gap-2">
                <FiUser className="w-5 h-5" />
                <span>Prihláste sa pre recenziu</span>
              </Link>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && isAuthenticated && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-primary-200">
              <h3 className="text-xl font-bold mb-4">Napíšte recenziu</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vaše hodnotenie
                  </label>
                  <StarRating 
                    rating={newRating} 
                    onRatingChange={setNewRating}
                    size="lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Váš komentár
                  </label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    rows={4}
                    placeholder="Podeľte sa o vašu skúsenosť s týmto produktom..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary">
                    Odoslať recenziu
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowReviewForm(false)}
                    className="btn-secondary"
                  >
                    Zrušiť
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* User's existing review */}
          {userReview && (
            <div className="mb-8 p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
              <div className="flex items-center gap-3 mb-3">
                <FiCheck className="w-5 h-5 text-primary-600" />
                <span className="font-semibold text-primary-900">
                  Vaša recenzia bola pridaná
                </span>
              </div>
              <div className="flex items-start gap-4">
                <img
                  src={userReview.userAvatar}
                  alt={userReview.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">{userReview.userName}</span>
                    <StarRating rating={userReview.rating} readonly size="sm" />
                  </div>
                  <p className="text-gray-700">{userReview.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(userReview.createdAt).toLocaleDateString('sk-SK')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="flex items-start gap-4 pb-6 border-b last:border-b-0">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold">{review.userName}</span>
                      <StarRating rating={review.rating} readonly size="sm" />
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('sk-SK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiMessageCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-600 mb-2">
                Zatiaľ žiadne recenzie
              </p>
              <p className="text-gray-500">
                Buďte prvý, kto ohodnotí tento produkt!
              </p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Podobné produkty
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id}>
                  <Link
                    href={`/products/${relatedProduct.id}`}
                    className="card overflow-hidden block group"
                  >
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <span className="text-xl font-bold text-primary-600">
                        €{relatedProduct.price.toFixed(2)}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/context/CartContext'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { FiShoppingCart, FiEye, FiStar, FiHeart } from 'react-icons/fi'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price

  const inWishlist = isInWishlist(product.id)

  return (
    <div className="card overflow-hidden group relative">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {product.category}
            </div>
            {product.bestseller && (
              <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <FiStar className="w-3 h-3 fill-current" />
                <span>Bestseller</span>
              </div>
            )}
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.discount && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{product.discount}%
              </div>
            )}
            {!product.inStock && (
              <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Vypredané
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <FiStar className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-sm font-semibold text-gray-700">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">/5.0</span>
          </div>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.discount ? (
              <>
                <span className="text-sm text-gray-500 line-through">
                  €{product.price.toFixed(2)}
                </span>
                <span className="text-2xl font-bold text-red-600">
                  €{discountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary-600">
                €{product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 border-2 rounded-lg transition-all ${
                inWishlist
                  ? 'bg-red-50 border-red-500 text-red-500'
                  : 'border-gray-300 hover:border-red-500 hover:text-red-500'
              }`}
              title={inWishlist ? 'Odstrániť z wishlistu' : 'Pridať do wishlistu'}
            >
              <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <Link
              href={`/products/${product.id}`}
              className="p-2 border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors"
            >
              <FiEye className="w-5 h-5" />
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`p-2 rounded-lg transition-colors ${
                product.inStock
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FiShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


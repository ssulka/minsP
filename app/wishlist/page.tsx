'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      if (product.inStock) {
        addToCart(product)
      }
    })
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FiHeart className="w-24 h-24 mx-auto text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Váš wishlist je prázdny
            </h1>
            <p className="text-gray-600 mb-8">
              Pridajte si produkty, ktoré sa vám páčia!
            </p>
            <Link href="/products" className="btn-primary">
              Prejsť na produkty
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Môj wishlist
            </h1>
            <p className="text-gray-600">
              {wishlist.length} {wishlist.length === 1 ? 'produkt' : 'produktov'} na vašom zozname
            </p>
          </div>
          <button
            onClick={handleAddAllToCart}
            className="btn-primary flex items-center gap-2"
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>Pridať všetko do košíka</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const discountedPrice = product.discount
              ? product.price * (1 - product.discount / 100)
              : product.price

            return (
              <div key={product.id} className="card overflow-hidden group relative">
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mb-4">
                    {product.discount ? (
                      <>
                        <span className="text-sm text-gray-500 line-through block">
                          €{product.price.toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-red-600">
                          €{discountedPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-primary-600">
                        €{product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (product.inStock) {
                          addToCart(product)
                        }
                      }}
                      disabled={!product.inStock}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors ${
                        product.inStock
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      <span className="text-sm">
                        {product.inStock ? 'Do košíka' : 'Vypredané'}
                      </span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-2 border-2 border-red-300 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Odstrániť z wishlistu"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products" className="btn-outline">
            Pokračovať v prehliadaní
          </Link>
        </div>
      </div>
    </div>
  )
}


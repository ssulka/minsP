'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FiShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Váš košík je prázdny
            </h1>
            <p className="text-gray-600 mb-8">
              Pridajte si nejaké produkty do košíka!
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Nákupný košík
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row gap-4"
              >
                <div className="relative w-full sm:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link
                        href={`/products/${item.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-2xl font-bold text-primary-600 mb-4">
                    €{item.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-semibold w-12 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="sm:text-right">
                  <p className="text-sm text-gray-600 mb-1">Celkom</p>
                  <p className="text-xl font-bold text-gray-900">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Súhrn objednávky
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Produkty ({totalItems})
                  </span>
                  <span className="font-semibold">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doprava</span>
                  <span className="font-semibold">
                    {totalPrice >= 50 ? (
                      <span className="text-green-600">Zadarmo</span>
                    ) : (
                      '€4.99'
                    )}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold">Celkom</span>
                    <span className="font-bold text-primary-600">
                      €
                      {(totalPrice >= 50
                        ? totalPrice
                        : totalPrice + 4.99
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {totalPrice < 50 && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-primary-800">
                    Pridajte ešte €{(50 - totalPrice).toFixed(2)} pre dopravu
                    zadarmo!
                  </p>
                </div>
              )}

              <Link href="/checkout" className="btn-primary w-full text-center block">
                Pokračovať k platbe
              </Link>

              <Link
                href="/products"
                className="btn-secondary w-full text-center block mt-3"
              >
                Pokračovať v nákupe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


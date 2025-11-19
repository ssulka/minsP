import Link from 'next/link'
import { FiCheckCircle } from 'react-icons/fi'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <FiCheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Objednávka úspešne dokončená!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ďakujeme za Vašu objednávku. Potvrdenie sme Vám poslali na email.
          </p>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-2">
              Číslo objednávky:{' '}
              <span className="font-bold">#
                {Math.floor(Math.random() * 1000000)
                  .toString()
                  .padStart(6, '0')}
              </span>
            </p>
            <p className="text-gray-700">
              Vašu objednávku spracujeme a odošleme do 24 hodín.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/products" className="btn-primary w-full block">
              Pokračovať v nákupe
            </Link>
            <Link href="/" className="btn-secondary w-full block">
              Späť na domovskú stránku
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


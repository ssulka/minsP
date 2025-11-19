import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'
import { FiTruck, FiShield, FiHeadphones, FiCreditCard, FiZap, FiAward, FiUsers } from 'react-icons/fi'

export default function Home() {
  const featuredProducts = products.filter(p => p.bestseller || p.discount).slice(0, 8)
  const onSaleProducts = products.filter(p => p.discount).slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-80 h-80 bg-primary-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full opacity-5 blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <FiZap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold">Nové produkty každý týždeň</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Objavte najnovšie
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                technológie
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto">
              Váš partner pre prémiové gadgety a elektroniku. 
              Viac ako <strong>40 produktov</strong> s rýchlym dodaním.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-white text-primary-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                <span>Prehliadať produkty</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/products?sale=true"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                <FiZap className="w-5 h-5" />
                <span>Pozrieť zľavy</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold mb-2">40+</div>
                <div className="text-sm text-primary-100">Produktov</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold mb-2">5000+</div>
                <div className="text-sm text-primary-100">Zákazníkov</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm text-primary-100">Podpora</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold mb-2">4.8★</div>
                <div className="text-sm text-primary-100">Hodnotenie</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <FiTruck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rýchla doprava</h3>
              <p className="text-gray-600">Doručenie do 24 hodín</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <FiShield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bezpečný nákup</h3>
              <p className="text-gray-600">100% zabezpečené platby</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <FiHeadphones className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Podpora</h3>
              <p className="text-gray-600">Vždy tu pre vás</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <FiCreditCard className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexibilná platba</h3>
              <p className="text-gray-600">Viacero možností platby</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals Section */}
      {onSaleProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <FiZap className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-semibold">Limitovaná ponuka</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🔥 Horúce zľavy
              </h2>
              <p className="text-xl text-white/90">
                Exkluzívne ponuky - ušetrite až 30%
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
              <FiAward className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-900">Najpredávanejšie</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Odporúčané produkty
            </h2>
            <p className="text-xl text-gray-600">
              Najpopulárnejšie produkty z našej ponuky
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block btn-outline"
            >
              Zobraziť všetkých {products.length} produktov →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Získajte 10% zľavu na prvý nákup
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Prihláste sa k odberu newslettera a získajte exkluzívne ponuky
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Váš email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-primary-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Prihlásiť sa
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}


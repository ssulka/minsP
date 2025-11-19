'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { products, categories } from '@/data/products'
import { FiFilter, FiSearch, FiTrendingDown, FiTrendingUp, FiStar, FiTag } from 'react-icons/fi'

type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'discount'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Všetky')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showBestsellers, setShowBestsellers] = useState(false)
  const [showOnSale, setShowOnSale] = useState(false)

  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Všetky' || product.category === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBestseller = !showBestsellers || product.bestseller
    const matchesOnSale = !showOnSale || product.discount
    
    return matchesCategory && matchesSearch && matchesBestseller && matchesOnSale
  })

  // Sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
        const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
        return priceA - priceB
      case 'price-high':
        const priceHighA = a.discount ? a.price * (1 - a.discount / 100) : a.price
        const priceHighB = b.discount ? b.price * (1 - b.discount / 100) : b.price
        return priceHighB - priceHighA
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'discount':
        return (b.discount || 0) - (a.discount || 0)
      default:
        return a.id - b.id
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Naše produkty
          </h1>
          <p className="text-xl text-gray-600">
            Preskúmajte našu širokú ponuku tech produktov - {products.length} produktov
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Vyhľadať produkty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          />
        </div>

        {/* Filters Row */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-gray-300">
            <FiFilter className="text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent focus:outline-none text-gray-700 font-medium cursor-pointer"
            >
              <option value="newest">Najnovšie</option>
              <option value="price-low">Cena: Od najnižšej</option>
              <option value="price-high">Cena: Od najvyššej</option>
              <option value="rating">Najlepšie hodnotené</option>
              <option value="discount">Najväčšie zľavy</option>
            </select>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowBestsellers(!showBestsellers)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                showBestsellers
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-amber-500'
              }`}
            >
              <FiStar className={showBestsellers ? 'fill-current' : ''} />
              <span>Bestsellery</span>
            </button>
            <button
              onClick={() => setShowOnSale(!showOnSale)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                showOnSale
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-500'
              }`}
            >
              <FiTag />
              <span>Zľavy</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-gray-600">
            Zobrazených <span className="font-bold text-primary-600">{filteredProducts.length}</span> z {products.length} produktov
          </p>
          
          {(showBestsellers || showOnSale || selectedCategory !== 'Všetky' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Všetky')
                setSearchQuery('')
                setShowBestsellers(false)
                setShowOnSale(false)
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
            >
              Vymazať filtre
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-2">
              Žiadne produkty neboli nájdené.
            </p>
            <p className="text-gray-500 mb-6">
              Skúste zmeniť filter alebo vyhľadávací dotaz.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Všetky')
                setSearchQuery('')
                setShowBestsellers(false)
                setShowOnSale(false)
              }}
              className="btn-primary"
            >
              Vymazať všetky filtre
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


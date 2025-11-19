export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">O nás</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vitajte v TechShop
          </h2>
          <p className="text-gray-700 mb-4">
            TechShop je váš spoľahlivý partner v oblasti technológií a elektroniky.
            Od roku 2024 prinášame slovenským zákazníkom tie najlepšie produkty
            zo sveta technológií.
          </p>
          <p className="text-gray-700 mb-4">
            Naša misia je poskytovať prémiové produkty za férové ceny, s výnimočným
            zákazníckym servisom a rýchlym dodaním.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
            <div className="text-gray-700">Spokojných zákazníkov</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
            <div className="text-gray-700">Produktov skladom</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-700">Zákaznícka podpora</div>
          </div>
        </div>
      </div>
    </div>
  )
}


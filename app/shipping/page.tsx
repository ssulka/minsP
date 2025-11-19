export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Doprava a doručenie</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Možnosti dopravy</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary-600 pl-4">
                <h3 className="font-semibold text-lg mb-2">Kuriérska služba</h3>
                <p className="text-gray-700 mb-1">Cena: €4.99</p>
                <p className="text-gray-600">Doručenie do 1-2 pracovných dní</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-semibold text-lg mb-2">Doprava zdarma</h3>
                <p className="text-gray-700 mb-1">Pri nákupe nad €50</p>
                <p className="text-gray-600">Doručenie do 1-2 pracovných dní</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sledovanie zásielky</h2>
            <p className="text-gray-700">
              Po odoslaní objednávky dostanete email s tracking číslom, pomocou ktorého
              môžete sledovať vašu zásielku v reálnom čase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Doručenie na Slovensku</h2>
            <p className="text-gray-700">
              Tovar doručujeme na celom území Slovenska. Objednávky prijaté do 14:00
              sú spravidla expedované v ten istý deň.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}


export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Vrátenie tovaru</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">30-dňová lehota na vrátenie</h2>
            <p className="text-gray-700 mb-4">
              Máte právo vrátiť tovar do 30 dní od jeho doručenia bez udania dôvodu.
              Tovar musí byť nepoužitý, v pôvodnom obale a s kompletným príslušenstvom.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ako vrátiť tovar?</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Kontaktujte náš zákaznícky servis emailom alebo telefonicky</li>
              <li>Zabaľte tovar do pôvodného obalu</li>
              <li>Priložte kópiu faktúry</li>
              <li>Odošlite zásielku na našu adresu</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vrátenie peňazí</h2>
            <p className="text-gray-700">
              Po obdržaní a kontrole tovaru vám vrátime peniaze do 14 dní
              na účet, z ktorého bola platba realizovaná.
            </p>
          </section>

          <section className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h3 className="font-semibold text-primary-900 mb-2">Poznámka</h3>
            <p className="text-primary-800 text-sm">
              Náklady na vrátenie tovaru hradí zákazník, pokiaľ sa nejedná o chybný
              alebo poškodený tovar.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}


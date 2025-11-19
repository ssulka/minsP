export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Záruka</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">24-mesačná záruka</h2>
            <p className="text-gray-700 mb-4">
              Na všetky naše produkty poskytujeme záruku v trvaní 24 mesiacov
              od dátumu nákupu. Záruka sa vzťahuje na výrobné chyby a poruchy,
              ktoré neboli spôsobené nesprávnym používaním.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Čo záruka pokrýva?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Výrobné chyby a defekty materiálu</li>
              <li>Nefunkčnosť spôsobenú výrobcom</li>
              <li>Opravu alebo výmenu chybného tovaru</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Čo záruka nepokrýva?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Mechanické poškodenie spôsobené pádom alebo nárazom</li>
              <li>Poškodenie tekutinou</li>
              <li>Nesprávne používanie v rozpore s návodom</li>
              <li>Opotrebenie pri bežnom používaní</li>
              <li>Zásah neoprávnenou osobou</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ako uplatniť záruku?</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Kontaktujte náš zákaznícky servis</li>
              <li>Popíšte problém a priložte číslo objednávky</li>
              <li>Odošlite tovar na našu servisnú adresu</li>
              <li>Tovar bude opravený alebo vymenený do 30 dní</li>
            </ol>
          </section>

          <section className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Dôležité</h3>
            <p className="text-green-800 text-sm">
              Pre uplatnenie záruky je potrebné predložiť doklad o kúpe (faktúru).
              Záruka sa predlžuje o čas, počas ktorého bol tovar v oprave.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}


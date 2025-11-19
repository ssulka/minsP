import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Kontakt</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Kontaktujte nás
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FiMail className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-gray-600">info@techshop.sk</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiPhone className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <div className="font-semibold">Telefón</div>
                  <div className="text-gray-600">+421 123 456 789</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <div className="font-semibold">Adresa</div>
                  <div className="text-gray-600">
                    Hlavná ulica 123<br />
                    811 01 Bratislava<br />
                    Slovensko
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Otváracie hodiny
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Pondelok - Piatok:</span>
                <span className="font-semibold">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sobota:</span>
                <span className="font-semibold">10:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nedeľa:</span>
                <span className="font-semibold">Zatvorené</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Napíšte nám správu
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meno *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Predmet *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Správa *
              </label>
              <textarea
                rows={5}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              />
            </div>
            <button type="submit" className="btn-primary">
              Odoslať správu
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


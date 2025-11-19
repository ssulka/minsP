import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { AuthProvider } from '@/context/AuthContext'
import { ReviewsProvider } from '@/context/ReviewsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechShop - Your Premium Tech Gadgets Store',
  description: 'Discover the latest tech gadgets, electronics, and accessories at unbeatable prices.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk">
      <body className={inter.className}>
        <AuthProvider>
          <ReviewsProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                </div>
              </WishlistProvider>
            </CartProvider>
          </ReviewsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


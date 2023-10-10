import './globals.css'
import {Providers} from "./providers";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import SessionProvider from './components/SessionProvider'
import NavMenu from './components/NavMenu'
import Footer from "./components/Footer"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Providers>
            <NavMenu />
              <main>
                {children}
              </main>
              <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}

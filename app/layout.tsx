import './globals.css'
import {Providers} from "./providers";
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/app/components/SessionProvider'
import Sidebar from '@/app/components/Sidebar/Sidebar'
import NavMenu from '@/app/components/NavMenu'
import { Toaster } from 'react-hot-toast';


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className='dark'>
      <body>
        <SessionProvider session={session}>
          <Providers>
          <Toaster />
            <main className="flex flex-col min-h-screen">
            <NavMenu />
              <div className="flex flex-grow">
                <Sidebar />
                <div className="ml-0 lg:ml-64 flex-1 px-5 main-bg">
                  {children}
                </div>
              </div>
            </main>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}

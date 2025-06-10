
import './globals.css';
import UserMenu from '@/components/user-account';
import { Inter } from 'next/font/google';
import Providers from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stuff and Things Website',
  description: 'My awesome website for showcasing stuff and things',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <Providers>
          <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">
              <a href="/">Stuff and Things</a>
            </h1>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="/about" className="hover:text-blue-600 transition">About</a>
              <UserMenu />
            </nav>
          </div>
        </header>

        <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-white border-t mt-8 py-6 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} Stuff and Things. All rights reserved.
        </footer>
      </Providers>
      </body>
    </html>
  );
}


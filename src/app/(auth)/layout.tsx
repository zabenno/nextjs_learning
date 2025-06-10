
import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Auth | MyBrand',
  description: 'Login or register to access your account.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-grey-50">
      <body className={`${inter.className} h-full flex items-center justify-center`}>
        <div className="h-half inline-block p-8 bg-white rounded-2xl shadow-xl">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign in to your account</h1>
          {children}
        </div>
      </body>
    </html>
  );
}

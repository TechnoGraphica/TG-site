import './globals.css';
import Navbar from '../components/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Art Portfolio for Zora',
  description: 'Showcase of images, videos, and music for the Zora community',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-mono">
        <Navbar session={session} />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
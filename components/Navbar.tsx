import Link from 'next/link';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center border-b-2 border-purple-500 neon-glow">
      <div className="flex items-center">
        <img src="/logo.png" alt="Brand Logo" className="h-10 mr-4" />
        <Link href="/" className="text-xl font-bold">Art Portfolio</Link>
      </div>
      <div>
        {session ? (
          <>
            <Link href="/admin/dashboard" className="mr-4 text-purple-400 hover:text-purple-300">
              Dashboard
            </Link>
            <button onClick={() => signOut()} className="text-purple-400 hover:text-purple-300">
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className="text-purple-400 hover:text-purple-300">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
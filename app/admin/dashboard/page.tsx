import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '../../lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await getServerSession();
  if (!session) redirect('/api/auth/signin');

  const artItems = await prisma.artItem.findMany();
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 neon-glow">Admin Dashboard</h1>
      <form action="/api/upload" method="POST" encType="multipart/form-data" className="mb-8">
        <div className="mb-4">
          <label className="block text-sm">Type</label>
          <select name="type" className="bg-gray-800 p-2 rounded w-full">
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="music">Music</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm">Title</label>
          <input name="title" className="bg-gray-800 p-2 rounded w-full" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Description</label>
          <textarea name="description" className="bg-gray-800 p-2 rounded w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm">File/URL</label>
          <input name="file" type="file" accept="image/*,audio/*" className="bg-gray-800 p-2 rounded w-full" />
          <input name="fileUrl" placeholder="Or enter embed URL (e.g., YouTube)" className="bg-gray-800 p-2 rounded w-full mt-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm">External Link (e.g., Zora mint)</label>
          <input name="linkUrl" className="bg-gray-800 p-2 rounded w-full" />
        </div>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 p-2 rounded">Upload</button>
      </form>
      <form action="/api/upload-logo" method="POST" encType="multipart/form-data" className="mb-8">
        <div className="mb-4">
          <label className="block text-sm">Upload Brand Logo</label>
          <input name="logo" type="file" accept="image/*" className="bg-gray-800 p-2 rounded w-full" />
        </div>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 p-2 rounded">Upload Logo</button>
      </form>
      <h2 className="text-2xl mb-4">Manage Art Items</h2>
      <ul>
        {artItems.map((item) => (
          <li key={item.id} className="mb-2 flex justify-between">
            <span>{item.title} ({item.type})</span>
            <div>
              <Link href={`/api/edit/${item.id}`} className="text-blue-400 mr-4">Edit</Link>
              <form action={`/api/delete/${item.id}`} method="POST" className="inline">
                <button type="submit" className="text-red-400">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
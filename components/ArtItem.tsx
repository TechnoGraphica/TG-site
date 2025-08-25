'use client';
import Link from 'next/link';

type ArtItemProps = {
  id: number;
  type: string;
  title: string;
  description: string;
  fileUrl: string;
  linkUrl: string | null;
};

export default function ArtItem({ type, title, description, fileUrl, linkUrl }: ArtItemProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg neon-border">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {type === 'image' && <img src={fileUrl} alt={title} className="w-full h-64 object-cover rounded" />}
      {type === 'video' && (
        <iframe
          src={fileUrl}
          title={title}
          className="w-full h-64 rounded"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      {type === 'music' && (
        <audio controls className="w-full">
          <source src={fileUrl} type="audio/mpeg" />
        </audio>
      )}
      <p className="text-gray-300 mb-4">{description}</p>
      {linkUrl && (
        <Link href={linkUrl} className="bg-purple-600 hover:bg-purple-700 p-2 rounded inline-block">
          View on Zora
        </Link>
      )}
    </div>
  );
}
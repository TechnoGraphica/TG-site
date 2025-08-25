import { prisma } from '../lib/prisma';
import ArtItem from '../components/ArtItem';

export default async function Home() {
  const artItems = await prisma.artItem.findMany();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artItems.map((item) => (
        <ArtItem key={item.id} {...item} />
      ))}
    </div>
  );
}
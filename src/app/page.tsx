import prisma from '@/lib/prisma';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const news = await prisma.news.findMany({
    take: 3,
    orderBy: { date: 'desc' },
  });

  return <HomeClient news={news} />;
}

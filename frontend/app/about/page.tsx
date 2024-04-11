import Link from 'next/link';
import { getGoodsData } from '@/utils/grpc';

export default async function AboutPage() {
  const data = await getGoodsData();

  return (
    <div>
      {data.map((good) => (
        <div key={good.getGoodid()}>
          <p>
            {good.getGoodid()} - {good.getGooduniqueid()} - {good.getStationid()}
          </p>
        </div>
      ))}
      <Link href="/" className="mt-4 inline-block underline">
        Return home
      </Link>
    </div>
  );
}
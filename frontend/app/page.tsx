import Link from 'next/link';

export default async function HomePage() {
  const data = {
    title: '雷索纳斯数据站',
    headline: '雷索纳斯数据站',
    body: '获取到的商品信息...',
  };

  return (
    <div>
      <title>{data.title}</title>
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
      <p className="mt-4">{data.body}</p>
      <Link href="/about" className="mt-4 inline-block underline">
        测试gRPC
      </Link>
    </div>
  );
}
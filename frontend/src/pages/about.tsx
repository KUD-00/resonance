import { Link } from 'waku';
import * as grpc from '@grpc/grpc-js';
import { GetSellGoodsRequest, GetSellGoodsResponse, SellGood } from '../../grpc/services_pb.js';
import { InfoServiceClient } from '../../grpc/services_grpc_pb.js';

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
      <Link to="/" className="mt-4 inline-block underline">
        Return home
      </Link>
    </div>
  );
}

const getGoodsData = async () => {
  const client = new InfoServiceClient(
    'info:50051',
    grpc.credentials.createInsecure(),
  );

  const request = new GetSellGoodsRequest();

  try {
    const response: GetSellGoodsResponse = await new Promise((resolve, reject) => {
      client.getSellGoods(request, (error, response) => {
        if (error) {
          console.log(error)
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
    return response.getGoodsList();
  } catch (error) {
    console.log(error)
    return []
  }
};

export const getConfig = async () => {
  return {
    render: 'static',
  };
};

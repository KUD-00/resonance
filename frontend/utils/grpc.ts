import * as grpc from '@grpc/grpc-js';
import { GetSellGoodsRequest, GetSellGoodsResponse, SellGood } from '../grpc/services_pb.js';
import { InfoServiceClient } from '../grpc/services_grpc_pb.js';
import { cache } from 'react'

export const getGoodsData = cache(async () => {
  const client = new InfoServiceClient(
    'info.default.svc.cluster.local:50051',
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
})
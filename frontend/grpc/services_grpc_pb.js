// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var services_pb = require('./services_pb.js');

function serialize_api_GetBuyGoodsRequest(arg) {
  if (!(arg instanceof services_pb.GetBuyGoodsRequest)) {
    throw new Error('Expected argument of type api.GetBuyGoodsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_GetBuyGoodsRequest(buffer_arg) {
  return services_pb.GetBuyGoodsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_GetBuyGoodsResponse(arg) {
  if (!(arg instanceof services_pb.GetBuyGoodsResponse)) {
    throw new Error('Expected argument of type api.GetBuyGoodsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_GetBuyGoodsResponse(buffer_arg) {
  return services_pb.GetBuyGoodsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_GetSellGoodsRequest(arg) {
  if (!(arg instanceof services_pb.GetSellGoodsRequest)) {
    throw new Error('Expected argument of type api.GetSellGoodsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_GetSellGoodsRequest(buffer_arg) {
  return services_pb.GetSellGoodsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_GetSellGoodsResponse(arg) {
  if (!(arg instanceof services_pb.GetSellGoodsResponse)) {
    throw new Error('Expected argument of type api.GetSellGoodsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_GetSellGoodsResponse(buffer_arg) {
  return services_pb.GetSellGoodsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_GetStationsRequest(arg) {
  if (!(arg instanceof services_pb.GetStationsRequest)) {
    throw new Error('Expected argument of type api.GetStationsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_GetStationsRequest(buffer_arg) {
  return services_pb.GetStationsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_GetStationsResponse(arg) {
  if (!(arg instanceof services_pb.GetStationsResponse)) {
    throw new Error('Expected argument of type api.GetStationsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_GetStationsResponse(buffer_arg) {
  return services_pb.GetStationsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var InfoServiceService = exports.InfoServiceService = {
  getSellGoods: {
    path: '/api.InfoService/GetSellGoods',
    requestStream: false,
    responseStream: false,
    requestType: services_pb.GetSellGoodsRequest,
    responseType: services_pb.GetSellGoodsResponse,
    requestSerialize: serialize_api_GetSellGoodsRequest,
    requestDeserialize: deserialize_api_GetSellGoodsRequest,
    responseSerialize: serialize_api_GetSellGoodsResponse,
    responseDeserialize: deserialize_api_GetSellGoodsResponse,
  },
  getBuyGoods: {
    path: '/api.InfoService/GetBuyGoods',
    requestStream: false,
    responseStream: false,
    requestType: services_pb.GetBuyGoodsRequest,
    responseType: services_pb.GetBuyGoodsResponse,
    requestSerialize: serialize_api_GetBuyGoodsRequest,
    requestDeserialize: deserialize_api_GetBuyGoodsRequest,
    responseSerialize: serialize_api_GetBuyGoodsResponse,
    responseDeserialize: deserialize_api_GetBuyGoodsResponse,
  },
  getStations: {
    path: '/api.InfoService/GetStations',
    requestStream: false,
    responseStream: false,
    requestType: services_pb.GetStationsRequest,
    responseType: services_pb.GetStationsResponse,
    requestSerialize: serialize_api_GetStationsRequest,
    requestDeserialize: deserialize_api_GetStationsRequest,
    responseSerialize: serialize_api_GetStationsResponse,
    responseDeserialize: deserialize_api_GetStationsResponse,
  },
};

exports.InfoServiceClient = grpc.makeGenericClientConstructor(InfoServiceService);

// package: api
// file: services.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as services_pb from "./services_pb";

interface IInfoServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getSellGoods: IInfoServiceService_IGetSellGoods;
    getBuyGoods: IInfoServiceService_IGetBuyGoods;
    getStations: IInfoServiceService_IGetStations;
}

interface IInfoServiceService_IGetSellGoods extends grpc.MethodDefinition<services_pb.GetSellGoodsRequest, services_pb.GetSellGoodsResponse> {
    path: "/api.InfoService/GetSellGoods";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<services_pb.GetSellGoodsRequest>;
    requestDeserialize: grpc.deserialize<services_pb.GetSellGoodsRequest>;
    responseSerialize: grpc.serialize<services_pb.GetSellGoodsResponse>;
    responseDeserialize: grpc.deserialize<services_pb.GetSellGoodsResponse>;
}
interface IInfoServiceService_IGetBuyGoods extends grpc.MethodDefinition<services_pb.GetBuyGoodsRequest, services_pb.GetBuyGoodsResponse> {
    path: "/api.InfoService/GetBuyGoods";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<services_pb.GetBuyGoodsRequest>;
    requestDeserialize: grpc.deserialize<services_pb.GetBuyGoodsRequest>;
    responseSerialize: grpc.serialize<services_pb.GetBuyGoodsResponse>;
    responseDeserialize: grpc.deserialize<services_pb.GetBuyGoodsResponse>;
}
interface IInfoServiceService_IGetStations extends grpc.MethodDefinition<services_pb.GetStationsRequest, services_pb.GetStationsResponse> {
    path: "/api.InfoService/GetStations";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<services_pb.GetStationsRequest>;
    requestDeserialize: grpc.deserialize<services_pb.GetStationsRequest>;
    responseSerialize: grpc.serialize<services_pb.GetStationsResponse>;
    responseDeserialize: grpc.deserialize<services_pb.GetStationsResponse>;
}

export const InfoServiceService: IInfoServiceService;

export interface IInfoServiceServer {
    getSellGoods: grpc.handleUnaryCall<services_pb.GetSellGoodsRequest, services_pb.GetSellGoodsResponse>;
    getBuyGoods: grpc.handleUnaryCall<services_pb.GetBuyGoodsRequest, services_pb.GetBuyGoodsResponse>;
    getStations: grpc.handleUnaryCall<services_pb.GetStationsRequest, services_pb.GetStationsResponse>;
}

export interface IInfoServiceClient {
    getSellGoods(request: services_pb.GetSellGoodsRequest, callback: (error: grpc.ServiceError | null, response: services_pb.GetSellGoodsResponse) => void): grpc.ClientUnaryCall;
    getSellGoods(request: services_pb.GetSellGoodsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: services_pb.GetSellGoodsResponse) => void): grpc.ClientUnaryCall;
    getSellGoods(request: services_pb.GetSellGoodsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: services_pb.GetSellGoodsResponse) => void): grpc.ClientUnaryCall;
    getBuyGoods(request: services_pb.GetBuyGoodsRequest, callback: (error: grpc.ServiceError | null, response: services_pb.GetBuyGoodsResponse) => void): grpc.ClientUnaryCall;
    getBuyGoods(request: services_pb.GetBuyGoodsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: services_pb.GetBuyGoodsResponse) => void): grpc.ClientUnaryCall;
    getBuyGoods(request: services_pb.GetBuyGoodsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: services_pb.GetBuyGoodsResponse) => void): grpc.ClientUnaryCall;
    getStations(request: services_pb.GetStationsRequest, callback: (error: grpc.ServiceError | null, response: services_pb.GetStationsResponse) => void): grpc.ClientUnaryCall;
    getStations(request: services_pb.GetStationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: services_pb.GetStationsResponse) => void): grpc.ClientUnaryCall;
    getStations(request: services_pb.GetStationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: services_pb.GetStationsResponse) => void): grpc.ClientUnaryCall;
}

export class InfoServiceClient extends grpc.Client implements IInfoServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getSellGoods(request: services_pb.GetSellGoodsRequest, callback: (error: grpc.ServiceError | null, response: services_pb.GetSellGoodsResponse) => void): grpc.ClientUnaryCall;
    public getSellGoods(request: services_pb.GetSellGoodsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: services_pb.GetSellGoodsResponse) => void): grpc.ClientUnaryCall;
    public getSellGoods(request: services_pb.GetSellGoodsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: services_pb.GetSellGoodsResponse) => void): grpc.ClientUnaryCall;
    public getBuyGoods(request: services_pb.GetBuyGoodsRequest, callback: (error: grpc.ServiceError | null, response: services_pb.GetBuyGoodsResponse) => void): grpc.ClientUnaryCall;
    public getBuyGoods(request: services_pb.GetBuyGoodsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: services_pb.GetBuyGoodsResponse) => void): grpc.ClientUnaryCall;
    public getBuyGoods(request: services_pb.GetBuyGoodsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: services_pb.GetBuyGoodsResponse) => void): grpc.ClientUnaryCall;
    public getStations(request: services_pb.GetStationsRequest, callback: (error: grpc.ServiceError | null, response: services_pb.GetStationsResponse) => void): grpc.ClientUnaryCall;
    public getStations(request: services_pb.GetStationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: services_pb.GetStationsResponse) => void): grpc.ClientUnaryCall;
    public getStations(request: services_pb.GetStationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: services_pb.GetStationsResponse) => void): grpc.ClientUnaryCall;
}

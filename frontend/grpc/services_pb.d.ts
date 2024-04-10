// package: api
// file: services.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class PriceHistory extends jspb.Message { 
    getPrice(): number;
    setPrice(value: number): PriceHistory;
    getTime(): number;
    setTime(value: number): PriceHistory;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PriceHistory.AsObject;
    static toObject(includeInstance: boolean, msg: PriceHistory): PriceHistory.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PriceHistory, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PriceHistory;
    static deserializeBinaryFromReader(message: PriceHistory, reader: jspb.BinaryReader): PriceHistory;
}

export namespace PriceHistory {
    export type AsObject = {
        price: number,
        time: number,
    }
}

export class Producer extends jspb.Message { 

    getProducerMap(): jspb.Map<string, number>;
    clearProducerMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Producer.AsObject;
    static toObject(includeInstance: boolean, msg: Producer): Producer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Producer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Producer;
    static deserializeBinaryFromReader(message: Producer, reader: jspb.BinaryReader): Producer;
}

export namespace Producer {
    export type AsObject = {

        producerMap: Array<[string, number]>,
    }
}

export class Good extends jspb.Message { 
    getGooduniqueid(): string;
    setGooduniqueid(value: string): Good;
    getName(): string;
    setName(value: string): Good;
    getDescription(): string;
    setDescription(value: string): Good;
    getIsspeciality(): boolean;
    setIsspeciality(value: boolean): Good;
    getQuotationvariation(): number;
    setQuotationvariation(value: number): Good;
    getFastquotationvariation(): number;
    setFastquotationvariation(value: number): Good;
    clearProducerlistList(): void;
    getProducerlistList(): Array<Producer>;
    setProducerlistList(value: Array<Producer>): Good;
    addProducerlist(value?: Producer, index?: number): Producer;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Good.AsObject;
    static toObject(includeInstance: boolean, msg: Good): Good.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Good, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Good;
    static deserializeBinaryFromReader(message: Good, reader: jspb.BinaryReader): Good;
}

export namespace Good {
    export type AsObject = {
        gooduniqueid: string,
        name: string,
        description: string,
        isspeciality: boolean,
        quotationvariation: number,
        fastquotationvariation: number,
        producerlistList: Array<Producer.AsObject>,
    }
}

export class BuyGood extends jspb.Message { 
    getGoodid(): string;
    setGoodid(value: string): BuyGood;
    getName(): string;
    setName(value: string): BuyGood;
    getStationid(): string;
    setStationid(value: string): BuyGood;
    getBasebuyprice(): number;
    setBasebuyprice(value: number): BuyGood;
    getBuyprice(): number;
    setBuyprice(value: number): BuyGood;
    clearBuypricehistoryList(): void;
    getBuypricehistoryList(): Array<PriceHistory>;
    setBuypricehistoryList(value: Array<PriceHistory>): BuyGood;
    addBuypricehistory(value?: PriceHistory, index?: number): PriceHistory;
    getQuotationvariation(): number;
    setQuotationvariation(value: number): BuyGood;
    getFastquotationvariation(): number;
    setFastquotationvariation(value: number): BuyGood;
    getMinquotation(): number;
    setMinquotation(value: number): BuyGood;
    getMaxquotation(): number;
    setMaxquotation(value: number): BuyGood;
    getGooduniqueid(): string;
    setGooduniqueid(value: string): BuyGood;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuyGood.AsObject;
    static toObject(includeInstance: boolean, msg: BuyGood): BuyGood.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuyGood, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuyGood;
    static deserializeBinaryFromReader(message: BuyGood, reader: jspb.BinaryReader): BuyGood;
}

export namespace BuyGood {
    export type AsObject = {
        goodid: string,
        name: string,
        stationid: string,
        basebuyprice: number,
        buyprice: number,
        buypricehistoryList: Array<PriceHistory.AsObject>,
        quotationvariation: number,
        fastquotationvariation: number,
        minquotation: number,
        maxquotation: number,
        gooduniqueid: string,
    }
}

export class SellGood extends jspb.Message { 
    getGoodid(): string;
    setGoodid(value: string): SellGood;
    getName(): string;
    setName(value: string): SellGood;
    getStationid(): string;
    setStationid(value: string): SellGood;
    getBasesellprice(): number;
    setBasesellprice(value: number): SellGood;
    getSellprice(): number;
    setSellprice(value: number): SellGood;
    clearSellpricehistoryList(): void;
    getSellpricehistoryList(): Array<PriceHistory>;
    setSellpricehistoryList(value: Array<PriceHistory>): SellGood;
    addSellpricehistory(value?: PriceHistory, index?: number): PriceHistory;
    getQuotationvariation(): number;
    setQuotationvariation(value: number): SellGood;
    getFastquotationvariation(): number;
    setFastquotationvariation(value: number): SellGood;
    getMinquotation(): number;
    setMinquotation(value: number): SellGood;
    getMaxquotation(): number;
    setMaxquotation(value: number): SellGood;
    getGooduniqueid(): string;
    setGooduniqueid(value: string): SellGood;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SellGood.AsObject;
    static toObject(includeInstance: boolean, msg: SellGood): SellGood.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SellGood, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SellGood;
    static deserializeBinaryFromReader(message: SellGood, reader: jspb.BinaryReader): SellGood;
}

export namespace SellGood {
    export type AsObject = {
        goodid: string,
        name: string,
        stationid: string,
        basesellprice: number,
        sellprice: number,
        sellpricehistoryList: Array<PriceHistory.AsObject>,
        quotationvariation: number,
        fastquotationvariation: number,
        minquotation: number,
        maxquotation: number,
        gooduniqueid: string,
    }
}

export class Station extends jspb.Message { 
    getStationid(): string;
    setStationid(value: string): Station;
    getName(): string;
    setName(value: string): Station;
    getDescription(): string;
    setDescription(value: string): Station;
    getAttachedtocity(): string;
    setAttachedtocity(value: string): Station;
    clearSelllistList(): void;
    getSelllistList(): Array<string>;
    setSelllistList(value: Array<string>): Station;
    addSelllist(value: string, index?: number): string;
    clearAcquisitionlistList(): void;
    getAcquisitionlistList(): Array<string>;
    setAcquisitionlistList(value: Array<string>): Station;
    addAcquisitionlist(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Station.AsObject;
    static toObject(includeInstance: boolean, msg: Station): Station.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Station, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Station;
    static deserializeBinaryFromReader(message: Station, reader: jspb.BinaryReader): Station;
}

export namespace Station {
    export type AsObject = {
        stationid: string,
        name: string,
        description: string,
        attachedtocity: string,
        selllistList: Array<string>,
        acquisitionlistList: Array<string>,
    }
}

export class GetSellGoodsRequest extends jspb.Message { 
    getStationid(): string;
    setStationid(value: string): GetSellGoodsRequest;
    getGooduniqueid(): string;
    setGooduniqueid(value: string): GetSellGoodsRequest;
    getGoodsellid(): string;
    setGoodsellid(value: string): GetSellGoodsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSellGoodsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetSellGoodsRequest): GetSellGoodsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSellGoodsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSellGoodsRequest;
    static deserializeBinaryFromReader(message: GetSellGoodsRequest, reader: jspb.BinaryReader): GetSellGoodsRequest;
}

export namespace GetSellGoodsRequest {
    export type AsObject = {
        stationid: string,
        gooduniqueid: string,
        goodsellid: string,
    }
}

export class GetSellGoodsResponse extends jspb.Message { 
    clearGoodsList(): void;
    getGoodsList(): Array<SellGood>;
    setGoodsList(value: Array<SellGood>): GetSellGoodsResponse;
    addGoods(value?: SellGood, index?: number): SellGood;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSellGoodsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetSellGoodsResponse): GetSellGoodsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSellGoodsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSellGoodsResponse;
    static deserializeBinaryFromReader(message: GetSellGoodsResponse, reader: jspb.BinaryReader): GetSellGoodsResponse;
}

export namespace GetSellGoodsResponse {
    export type AsObject = {
        goodsList: Array<SellGood.AsObject>,
    }
}

export class GetBuyGoodsRequest extends jspb.Message { 
    getStationid(): string;
    setStationid(value: string): GetBuyGoodsRequest;
    getGooduniqueid(): string;
    setGooduniqueid(value: string): GetBuyGoodsRequest;
    getGoodbuyid(): string;
    setGoodbuyid(value: string): GetBuyGoodsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBuyGoodsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBuyGoodsRequest): GetBuyGoodsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBuyGoodsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBuyGoodsRequest;
    static deserializeBinaryFromReader(message: GetBuyGoodsRequest, reader: jspb.BinaryReader): GetBuyGoodsRequest;
}

export namespace GetBuyGoodsRequest {
    export type AsObject = {
        stationid: string,
        gooduniqueid: string,
        goodbuyid: string,
    }
}

export class GetBuyGoodsResponse extends jspb.Message { 
    clearGoodsList(): void;
    getGoodsList(): Array<BuyGood>;
    setGoodsList(value: Array<BuyGood>): GetBuyGoodsResponse;
    addGoods(value?: BuyGood, index?: number): BuyGood;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBuyGoodsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBuyGoodsResponse): GetBuyGoodsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBuyGoodsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBuyGoodsResponse;
    static deserializeBinaryFromReader(message: GetBuyGoodsResponse, reader: jspb.BinaryReader): GetBuyGoodsResponse;
}

export namespace GetBuyGoodsResponse {
    export type AsObject = {
        goodsList: Array<BuyGood.AsObject>,
    }
}

export class GetStationsRequest extends jspb.Message { 
    getStationid(): string;
    setStationid(value: string): GetStationsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetStationsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetStationsRequest): GetStationsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetStationsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetStationsRequest;
    static deserializeBinaryFromReader(message: GetStationsRequest, reader: jspb.BinaryReader): GetStationsRequest;
}

export namespace GetStationsRequest {
    export type AsObject = {
        stationid: string,
    }
}

export class GetStationsResponse extends jspb.Message { 
    clearStationsList(): void;
    getStationsList(): Array<Station>;
    setStationsList(value: Array<Station>): GetStationsResponse;
    addStations(value?: Station, index?: number): Station;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetStationsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetStationsResponse): GetStationsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetStationsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetStationsResponse;
    static deserializeBinaryFromReader(message: GetStationsResponse, reader: jspb.BinaryReader): GetStationsResponse;
}

export namespace GetStationsResponse {
    export type AsObject = {
        stationsList: Array<Station.AsObject>,
    }
}

// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file services.proto (package api, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message api.PriceHistory
 */
export class PriceHistory extends Message<PriceHistory> {
  /**
   * 价格
   *
   * @generated from field: int64 price = 1;
   */
  price = protoInt64.zero;

  /**
   * 时间戳
   *
   * @generated from field: int64 time = 2;
   */
  time = protoInt64.zero;

  constructor(data?: PartialMessage<PriceHistory>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.PriceHistory";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "price", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "time", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PriceHistory {
    return new PriceHistory().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PriceHistory {
    return new PriceHistory().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PriceHistory {
    return new PriceHistory().fromJsonString(jsonString, options);
  }

  static equals(a: PriceHistory | PlainMessage<PriceHistory> | undefined, b: PriceHistory | PlainMessage<PriceHistory> | undefined): boolean {
    return proto3.util.equals(PriceHistory, a, b);
  }
}

/**
 * @generated from message api.Producer
 */
export class Producer extends Message<Producer> {
  /**
   * @generated from field: map<string, int64> producer = 1;
   */
  producer: { [key: string]: bigint } = {};

  constructor(data?: PartialMessage<Producer>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.Producer";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "producer", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 3 /* ScalarType.INT64 */} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Producer {
    return new Producer().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Producer {
    return new Producer().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Producer {
    return new Producer().fromJsonString(jsonString, options);
  }

  static equals(a: Producer | PlainMessage<Producer> | undefined, b: Producer | PlainMessage<Producer> | undefined): boolean {
    return proto3.util.equals(Producer, a, b);
  }
}

/**
 * @generated from message api.Good
 */
export class Good extends Message<Good> {
  /**
   * @generated from field: string GoodUniqueId = 1;
   */
  GoodUniqueId = "";

  /**
   * @generated from field: string Name = 2;
   */
  Name = "";

  /**
   * @generated from field: string Description = 3;
   */
  Description = "";

  /**
   * @generated from field: bool IsSpeciality = 4;
   */
  IsSpeciality = false;

  /**
   * @generated from field: double QuotationVariation = 5;
   */
  QuotationVariation = 0;

  /**
   * @generated from field: double FastQuotationVariation = 6;
   */
  FastQuotationVariation = 0;

  /**
   * @generated from field: repeated api.Producer ProducerList = 7;
   */
  ProducerList: Producer[] = [];

  constructor(data?: PartialMessage<Good>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.Good";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "GoodUniqueId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "Name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "Description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "IsSpeciality", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "QuotationVariation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 6, name: "FastQuotationVariation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 7, name: "ProducerList", kind: "message", T: Producer, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Good {
    return new Good().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Good {
    return new Good().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Good {
    return new Good().fromJsonString(jsonString, options);
  }

  static equals(a: Good | PlainMessage<Good> | undefined, b: Good | PlainMessage<Good> | undefined): boolean {
    return proto3.util.equals(Good, a, b);
  }
}

/**
 * @generated from message api.BuyGood
 */
export class BuyGood extends Message<BuyGood> {
  /**
   * @generated from field: string GoodId = 1;
   */
  GoodId = "";

  /**
   * @generated from field: string Name = 2;
   */
  Name = "";

  /**
   * @generated from field: string StationId = 3;
   */
  StationId = "";

  /**
   * @generated from field: int64 BaseBuyPrice = 4;
   */
  BaseBuyPrice = protoInt64.zero;

  /**
   * @generated from field: int64 BuyPrice = 5;
   */
  BuyPrice = protoInt64.zero;

  /**
   * @generated from field: repeated api.PriceHistory BuyPriceHistory = 6;
   */
  BuyPriceHistory: PriceHistory[] = [];

  /**
   * @generated from field: double QuotationVariation = 7;
   */
  QuotationVariation = 0;

  /**
   * @generated from field: double FastQuotationVariation = 8;
   */
  FastQuotationVariation = 0;

  /**
   * @generated from field: double MinQuotation = 9;
   */
  MinQuotation = 0;

  /**
   * @generated from field: double MaxQuotation = 10;
   */
  MaxQuotation = 0;

  /**
   * @generated from field: string GoodUniqueId = 11;
   */
  GoodUniqueId = "";

  constructor(data?: PartialMessage<BuyGood>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.BuyGood";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "GoodId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "Name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "StationId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "BaseBuyPrice", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 5, name: "BuyPrice", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 6, name: "BuyPriceHistory", kind: "message", T: PriceHistory, repeated: true },
    { no: 7, name: "QuotationVariation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 8, name: "FastQuotationVariation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 9, name: "MinQuotation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 10, name: "MaxQuotation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 11, name: "GoodUniqueId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BuyGood {
    return new BuyGood().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BuyGood {
    return new BuyGood().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BuyGood {
    return new BuyGood().fromJsonString(jsonString, options);
  }

  static equals(a: BuyGood | PlainMessage<BuyGood> | undefined, b: BuyGood | PlainMessage<BuyGood> | undefined): boolean {
    return proto3.util.equals(BuyGood, a, b);
  }
}

/**
 * @generated from message api.SellGood
 */
export class SellGood extends Message<SellGood> {
  /**
   * @generated from field: string GoodId = 1;
   */
  GoodId = "";

  /**
   * @generated from field: string Name = 2;
   */
  Name = "";

  /**
   * @generated from field: string StationId = 3;
   */
  StationId = "";

  /**
   * @generated from field: int64 BaseSellPrice = 4;
   */
  BaseSellPrice = protoInt64.zero;

  /**
   * @generated from field: int64 SellPrice = 5;
   */
  SellPrice = protoInt64.zero;

  /**
   * @generated from field: repeated api.PriceHistory SellPriceHistory = 6;
   */
  SellPriceHistory: PriceHistory[] = [];

  /**
   * @generated from field: double QuotationVariation = 7;
   */
  QuotationVariation = 0;

  /**
   * @generated from field: double FastQuotationVariation = 8;
   */
  FastQuotationVariation = 0;

  /**
   * @generated from field: double MinQuotation = 9;
   */
  MinQuotation = 0;

  /**
   * @generated from field: double MaxQuotation = 10;
   */
  MaxQuotation = 0;

  /**
   * @generated from field: string GoodUniqueId = 11;
   */
  GoodUniqueId = "";

  constructor(data?: PartialMessage<SellGood>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.SellGood";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "GoodId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "Name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "StationId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "BaseSellPrice", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 5, name: "SellPrice", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 6, name: "SellPriceHistory", kind: "message", T: PriceHistory, repeated: true },
    { no: 7, name: "QuotationVariation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 8, name: "FastQuotationVariation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 9, name: "MinQuotation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 10, name: "MaxQuotation", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 11, name: "GoodUniqueId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SellGood {
    return new SellGood().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SellGood {
    return new SellGood().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SellGood {
    return new SellGood().fromJsonString(jsonString, options);
  }

  static equals(a: SellGood | PlainMessage<SellGood> | undefined, b: SellGood | PlainMessage<SellGood> | undefined): boolean {
    return proto3.util.equals(SellGood, a, b);
  }
}

/**
 * @generated from message api.Station
 */
export class Station extends Message<Station> {
  /**
   * @generated from field: string StationId = 1;
   */
  StationId = "";

  /**
   * @generated from field: string Name = 2;
   */
  Name = "";

  /**
   * @generated from field: string Description = 3;
   */
  Description = "";

  /**
   * @generated from field: string AttachedToCity = 4;
   */
  AttachedToCity = "";

  /**
   * @generated from field: repeated string SellList = 5;
   */
  SellList: string[] = [];

  /**
   * 同上
   *
   * @generated from field: repeated string AcquisitionList = 6;
   */
  AcquisitionList: string[] = [];

  constructor(data?: PartialMessage<Station>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.Station";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "StationId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "Name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "Description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "AttachedToCity", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "SellList", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "AcquisitionList", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Station {
    return new Station().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Station {
    return new Station().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Station {
    return new Station().fromJsonString(jsonString, options);
  }

  static equals(a: Station | PlainMessage<Station> | undefined, b: Station | PlainMessage<Station> | undefined): boolean {
    return proto3.util.equals(Station, a, b);
  }
}

/**
 * @generated from message api.GetSellGoodsRequest
 */
export class GetSellGoodsRequest extends Message<GetSellGoodsRequest> {
  /**
   * @generated from field: string stationId = 1;
   */
  stationId = "";

  /**
   * @generated from field: string goodUniqueId = 2;
   */
  goodUniqueId = "";

  /**
   * @generated from field: string goodSellId = 3;
   */
  goodSellId = "";

  constructor(data?: PartialMessage<GetSellGoodsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.GetSellGoodsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "stationId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "goodUniqueId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "goodSellId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSellGoodsRequest {
    return new GetSellGoodsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSellGoodsRequest {
    return new GetSellGoodsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSellGoodsRequest {
    return new GetSellGoodsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetSellGoodsRequest | PlainMessage<GetSellGoodsRequest> | undefined, b: GetSellGoodsRequest | PlainMessage<GetSellGoodsRequest> | undefined): boolean {
    return proto3.util.equals(GetSellGoodsRequest, a, b);
  }
}

/**
 * @generated from message api.GetSellGoodsResponse
 */
export class GetSellGoodsResponse extends Message<GetSellGoodsResponse> {
  /**
   * @generated from field: repeated api.SellGood goods = 1;
   */
  goods: SellGood[] = [];

  constructor(data?: PartialMessage<GetSellGoodsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.GetSellGoodsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "goods", kind: "message", T: SellGood, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSellGoodsResponse {
    return new GetSellGoodsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSellGoodsResponse {
    return new GetSellGoodsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSellGoodsResponse {
    return new GetSellGoodsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetSellGoodsResponse | PlainMessage<GetSellGoodsResponse> | undefined, b: GetSellGoodsResponse | PlainMessage<GetSellGoodsResponse> | undefined): boolean {
    return proto3.util.equals(GetSellGoodsResponse, a, b);
  }
}

/**
 * @generated from message api.GetBuyGoodsRequest
 */
export class GetBuyGoodsRequest extends Message<GetBuyGoodsRequest> {
  /**
   * @generated from field: string stationId = 1;
   */
  stationId = "";

  /**
   * @generated from field: string goodUniqueId = 2;
   */
  goodUniqueId = "";

  /**
   * @generated from field: string goodBuyId = 3;
   */
  goodBuyId = "";

  constructor(data?: PartialMessage<GetBuyGoodsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.GetBuyGoodsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "stationId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "goodUniqueId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "goodBuyId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBuyGoodsRequest {
    return new GetBuyGoodsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBuyGoodsRequest {
    return new GetBuyGoodsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBuyGoodsRequest {
    return new GetBuyGoodsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetBuyGoodsRequest | PlainMessage<GetBuyGoodsRequest> | undefined, b: GetBuyGoodsRequest | PlainMessage<GetBuyGoodsRequest> | undefined): boolean {
    return proto3.util.equals(GetBuyGoodsRequest, a, b);
  }
}

/**
 * @generated from message api.GetBuyGoodsResponse
 */
export class GetBuyGoodsResponse extends Message<GetBuyGoodsResponse> {
  /**
   * @generated from field: repeated api.BuyGood goods = 1;
   */
  goods: BuyGood[] = [];

  constructor(data?: PartialMessage<GetBuyGoodsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.GetBuyGoodsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "goods", kind: "message", T: BuyGood, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBuyGoodsResponse {
    return new GetBuyGoodsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBuyGoodsResponse {
    return new GetBuyGoodsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBuyGoodsResponse {
    return new GetBuyGoodsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetBuyGoodsResponse | PlainMessage<GetBuyGoodsResponse> | undefined, b: GetBuyGoodsResponse | PlainMessage<GetBuyGoodsResponse> | undefined): boolean {
    return proto3.util.equals(GetBuyGoodsResponse, a, b);
  }
}

/**
 * @generated from message api.GetStationsRequest
 */
export class GetStationsRequest extends Message<GetStationsRequest> {
  /**
   * @generated from field: string stationId = 1;
   */
  stationId = "";

  constructor(data?: PartialMessage<GetStationsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.GetStationsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "stationId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetStationsRequest {
    return new GetStationsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetStationsRequest {
    return new GetStationsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetStationsRequest {
    return new GetStationsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetStationsRequest | PlainMessage<GetStationsRequest> | undefined, b: GetStationsRequest | PlainMessage<GetStationsRequest> | undefined): boolean {
    return proto3.util.equals(GetStationsRequest, a, b);
  }
}

/**
 * @generated from message api.GetStationsResponse
 */
export class GetStationsResponse extends Message<GetStationsResponse> {
  /**
   * @generated from field: repeated api.Station stations = 1;
   */
  stations: Station[] = [];

  constructor(data?: PartialMessage<GetStationsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "api.GetStationsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "stations", kind: "message", T: Station, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetStationsResponse {
    return new GetStationsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetStationsResponse {
    return new GetStationsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetStationsResponse {
    return new GetStationsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetStationsResponse | PlainMessage<GetStationsResponse> | undefined, b: GetStationsResponse | PlainMessage<GetStationsResponse> | undefined): boolean {
    return proto3.util.equals(GetStationsResponse, a, b);
  }
}


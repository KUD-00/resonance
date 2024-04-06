# 雷索纳斯数据站

Next.js前后端混写的前身：github.com/KUD-00/resonance-helper

抛弃原因：性能太差 + Next.js写腻了

## 技术目标
工具目标：
- [ ] 实践微服务架构
- [ ] 实践gRPC
- [ ] 实践k8s
- [ ] 实践AWS
- [ ] 实践Terraform
- [ ] 实践Test Driven Development

性能目标:
- [ ] 前端任何页面在2s以内生成页面

## 服务定义
- rds: 存储user等持久化数据
- redis: 存储商品数据
- info: 从数据库中获取数据/储存数据
- calculate: 计算数据
- api: grpc定义
- gateway: 负载均衡？流量转发？防火墙？

## 数据库定义
redis
```text
station:StationId {
	Name
	Des
	AttachedToCity
	SellList
	AcquisitionList: 必须在good:quotation初始化后
}

good:info:GoodUniqueId {
	Name
	Description
	IsSpeciality
	QuotationVariation
	FastQuotationVariation
	ProducerList
}

good:buy:GoodBuyId {
	GoodsId
    StationId: 通过station:StationId.AcquisitionList来设定
	BaseBuyPrice
    BuyPrice
    BuyPriceHistory
	MinQuotation
	MaxQuotation
}

good:sell:GoodSellId {
	GoodsId
    StationId: 通过station:StationId.AcquisitionList来设定
	BaseSellPrice 
    SellPrice
    SellPriceHistory
	MinQuotation
	MaxQuotation
}
```

## info 服务
接受gRPC通信或者Restful通信，从redis/rds中获取/储存数据

### gRPC
为了给其他服务（如calculate）提供数据

- getSellGoods => BuyGood[]
- getBuyGoods => SellGood[]
- getStations => Station[]
- getUser => User

BuyGood:
```text
GoodBuyId {
    GoodUniqueId
    Name
    StationId
	BaseBuyPrice
    BuyPrice
    BuyPriceHistory
	QuotationVariation
	FastQuotationVariation
	MinQuotation
	MaxQuotation
}
```

### Restful(由网关路由)
为了:
- 从外界接受到数据更新
- 为其他开发者提供基本的数据

#### GET
/goodsinfo: 返回商品数据，可选参数包括：
- action=[buy, sell]: 筛选是购买数据还是贩卖数据
- stationID: 筛选地点
- name: 筛选商品名称
- goodsId: 筛选商品Id

/stationsinfo: 返回站点数据

/user: 返回用户数据

#### POST 
/goodsinfo: 必选参数为：
- stationID

body数据应为一个{buyList:{}, sellList:{}}

可选参数为：
- goodsID
- action=[buy, sell]

body数据应为一个简单的商品数据

/user: 修改用户数据

## calculate 服务
根据info服务，与Restful API请求方提供的数据（或用户数据），计算:
- 详细的商品情报（包括利润，百分比）
- 跑商路线

## Types定义
- 解包文件JSON的`StationJSON`
- redis中数据存储的`Station`
- 用于传输的完整数据`api.Station`

package utils

// Basic types from JSON files
type GoodJSON struct {
	GoodUniqueId           int64              `json:"id"`
	IDCN                   string             `json:"idCN"`
	Mod                    string             `json:"mod"`
	Name                   string             `json:"name"`
	Des                    string             `json:"des"`
	Quality                string             `json:"quality"`
	IsSpeciality           bool               `json:"isSpeciality"`
	QuotationVariation     float64            `json:"quotationVariation"`
	FastQuotationVariation float64            `json:"fastQuotationVariation"`
	ProducerList           []map[string]int64 `json:"producerList"`
}

type StationJSON struct {
	Id             int64  `json:"id"`
	Name           string `json:"name"`
	NameEn         string `json:"nameEn"`
	Des            string `json:"des"`
	AttachedToCity int64  `json:"attachedToCity"`
	RepRewardList  []struct {
		BargainNum          int64   `json:"bargainNum"`
		BargainSuccessRate  float64 `json:"bargainSuccessRate"`
		BuyNum              float64 `json:"buyNum"`
		CocAutoRefreshNum   int64   `json:"cocAutoRefreshNum"`
		CocQuestList        int64   `json:"cocQuestList"`
		Desc                string  `json:"desc"`
		FlagPng             string  `json:"flagPng"`
		HonorPng            string  `json:"honorPng"`
		ID                  int64   `json:"id"`
		OfferAutoRefreshNum int64   `json:"offerAutoRefreshNum"`
		PeopleName          string  `json:"peopleName"`
		RepNum              float64 `json:"repNum"`
		Revenue             float64 `json:"revenue"`
		RiseNum             int64   `json:"riseNum"`
		WareNum             int64   `json:"wareNum"`
	} `json:"repRewardList"`
	SellList []struct {
		ID int64 `json:"id"`
	} `json:"sellList"`
	AcquisitionList []struct {
		ID int64 `json:"id"`
	} `json:"acquisitionList"`
}

type GoodQuotationJSON struct {
	ID           int64   `json:"id"`
	IDCN         string  `json:"idCN"`
	GoodsId      int64   `json:"goodsId"`
	BasePrice    int64   `json:"price"`
	MinQuotation float64 `json:"minQuotation"`
	MaxQuotation float64 `json:"maxQuotation"`
	Stock        int64   `json:"num"`
}

// types for redis
type PriceHistory struct {
	Price int64 `json:"price"`
	Time  int64 `json:"time"`
}

type PriceInfo struct {
	price     int64
	stationId string
}

type Good struct {
	GoodUniqueId           string             `json:"GoodsId"`
	Name                   string             `json:"Name"`
	Description            string             `json:"Description"`
	IsSpeciality           bool               `json:"IsSpeciality"`
	QuotationVariation     float64            `json:"QuotationVariation"`
	FastQuotationVariation float64            `json:"FastQuotationVariation"`
	ProducerList           []map[string]int64 `json:"producerList"`
}

type SellGood struct {
	GoodUniqueId     string         `json:"GoodsId"`
	StationId        string         `json:"StationId"`
	BaseSellPrice    int64          `json:"BaseSellPrice"`
	SellPrice        int64          `json:"SellPrice"`
	SellPriceHistory []PriceHistory `json:"SellPriceHistory"`
	MinQuotation     float64        `json:"MinQuotation"`
	MaxQuotation     float64        `json:"MaxQuotation"`
}

type BuyGood struct {
	GoodUniqueId    string         `json:"GoodsId"`
	StationId       string         `json:"StationId"`
	BaseBuyPrice    int64          `json:"BaseBuyPrice"`
	BuyPrice        int64          `json:"BuyPrice"`
	BuyPriceHistory []PriceHistory `json:"BuyPriceHistory"`
	MinQuotation    float64        `json:"MinQuotation"`
	MaxQuotation    float64        `json:"MaxQuotation"`
	Stock           int64          `json:"Stock"`
}

type Station struct {
	Name            string `json:"Name"`
	Description     string `json:"Des"`
	AttachedToCity  string `json:"AttachedToCity"`
	SellList        string `json:"SellList"`
	AcquisitionList string `json:"AcquisitionList"`
}

// types for gRPC => api/services.proto

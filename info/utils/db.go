package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/KUD-00/resonance/api"
	"github.com/go-redis/redis/v8"
	"github.com/mitchellh/mapstructure"
)

// station data related
func GetStationIdByName(stations []*api.Station, name string) string {
	if name == "澄明中心" {
		return "83000029"
	}
	if name == "发射中心" {
		return "83000010"
	}
	if name == "战备工厂" {
		return "83000012"
	}
	if name == "发电站" {
		return "83000014"
	}
	if name == "七号自由港" {
		return "83000020"
	}

	for _, station := range stations {
		if station.Name == name {
			return station.StationId
		}
	}

	return ""
}

func GetStationById(rdb *redis.Client, stationId string) ([]*api.Station, error) {
	ctx := context.Background()
	data, err := rdb.HGetAll(ctx, fmt.Sprintf("station:%s", stationId)).Result()
	if err != nil {
		return nil, fmt.Errorf("no station info for key: %w", err)
	}

	var station Station
	// no string to int64 conversion, can use mapstructure
	err = mapstructure.Decode(data, &station)
	if err != nil {
		return nil, fmt.Errorf("failed to decode station data: %w", err)
	}

	var sellList []string
	if err := json.Unmarshal([]byte(data["SellList"]), &sellList); err != nil {
		log.Println("failed to unmarshal sell list")
	}

	var acquisitionList []string
	if err := json.Unmarshal([]byte(data["AcquisitionList"]), &acquisitionList); err != nil {
		log.Println("failed to unmarshal acquisition list")
	}

	apiStation := &api.Station{
		StationId:       stationId,
		Name:            station.Name,
		Description:     station.Description,
		AttachedToCity:  station.AttachedToCity,
		SellList:        sellList,
		AcquisitionList: acquisitionList,
	}

	return []*api.Station{apiStation}, nil
}

func GetStations(rdb *redis.Client) ([]*api.Station, error) {
	ctx := context.Background()
	keys, err := rdb.Keys(ctx, "station:*").Result()
	if err != nil {
		return nil, fmt.Errorf("failed to get station keys: %w", err)
	}

	var stations []*api.Station
	for _, key := range keys {
		data, err := rdb.HGetAll(ctx, key).Result()
		if err != nil {
			return nil, fmt.Errorf("failed to get station data: %w", err)
		}

		var station Station
		// no string to int64 conversion, can use mapstructure
		err = mapstructure.Decode(data, &station)
		if err != nil {
			return nil, fmt.Errorf("failed to decode station data: %w", err)
		}

		var sellList []string
		if err := json.Unmarshal([]byte(data["SellList"]), &sellList); err != nil {
			log.Println("failed to unmarshal sell list")
		}

		var acquisitionList []string
		if err := json.Unmarshal([]byte(data["AcquisitionList"]), &acquisitionList); err != nil {
			log.Println("failed to unmarshal acquisition list")
		}

		apiStation := &api.Station{
			StationId:       key,
			Name:            station.Name,
			Description:     station.Description,
			AttachedToCity:  station.AttachedToCity,
			SellList:        sellList,
			AcquisitionList: acquisitionList,
		}

		stations = append(stations, apiStation)
	}

	return stations, nil
}

// goods data related
func GetGoodInfoByGoodId(rdb *redis.Client, goodId string) (GoodJSON, error) {
	ctx := context.Background()
	key := fmt.Sprintf("good:info:%s", goodId)
	data, err := rdb.HGetAll(ctx, key).Result()
	if err != nil {
		return GoodJSON{}, fmt.Errorf("failed to get good data: %w", err)
	}

	var good GoodJSON
	err = mapstructure.Decode(data, &good)
	if err != nil {
		return GoodJSON{}, fmt.Errorf("failed to decode good data: %w", err)
	}

	return good, nil
}

func GetGoodInfoByGoodName(rdb *redis.Client, goodName string) (GoodJSON, error) {
	ctx := context.Background()
	keys, err := rdb.Keys(ctx, "good:info:*").Result()
	if err != nil {
		return GoodJSON{}, fmt.Errorf("failed to get good keys: %w", err)
	}

	for _, key := range keys {
		data, err := rdb.HGetAll(ctx, key).Result()
		if err != nil {
			return GoodJSON{}, fmt.Errorf("failed to get good data: %w", err)
		}

		var good GoodJSON
		err = mapstructure.Decode(data, &good)
		if err != nil {
			return GoodJSON{}, fmt.Errorf("failed to decode good data: %w", err)
		}

		if good.Name == goodName {
			return good, nil
		}
	}

	return GoodJSON{}, nil
}

func GetGoodInfos(rdb *redis.Client) ([]*api.Good, error) {
	ctx := context.Background()
	keys, err := rdb.Keys(ctx, "good:info:*").Result()
	if err != nil {
		return nil, fmt.Errorf("failed to get good keys: %w", err)
	}

	var goods []*api.Good
	for _, key := range keys {
		data, err := rdb.HGetAll(ctx, key).Result()
		if err != nil {
			return nil, fmt.Errorf("failed to get good data: %w", err)
		}

		var good Good
		err = mapstructure.Decode(data, &good)
		if err != nil {
			return nil, fmt.Errorf("failed to decode good data: %w", err)
		}

		var producerList []*api.Producer
		if err := json.Unmarshal([]byte(data["ProducerList"]), &producerList); err != nil {
			log.Fatalf("Failed to unmarshal producer list: %v", err)
		}

		apiGood := &api.Good{
			GoodUniqueId:           key,
			Name:                   good.Name,
			Description:            good.Description,
			IsSpeciality:           good.IsSpeciality,
			QuotationVariation:     good.QuotationVariation,
			FastQuotationVariation: good.FastQuotationVariation,
			ProducerList:           producerList,
		}

		goods = append(goods, apiGood)
	}

	return goods, nil
}

func GetSellGoods(rdb *redis.Client) ([]*api.SellGood, error) {
	ctx := context.Background()
	keys, err := rdb.Keys(ctx, "good:sell:*").Result()
	if err != nil {
		return nil, fmt.Errorf("failed to get sell good keys: %w", err)
	}

	var goods []*api.SellGood
	for _, key := range keys {
		data, err := rdb.HGetAll(ctx, key).Result()
		if err != nil {
			return nil, fmt.Errorf("failed to get sell good data: %w", err)
		}

		name := rdb.HGet(ctx, fmt.Sprintf("good:info:%s", data["GoodUniqueId"]), "Name").Val()
		quotationVariation := rdb.HGet(ctx, fmt.Sprintf("good:info:%s", data["GoodUniqueId"]), "QuotationVariation").Val()
		fastQuotationVariation := rdb.HGet(ctx, fmt.Sprintf("good:info:%s", data["GoodUniqueId"]), "FastQuotationVariation").Val()

		var apiSellPriceHistory []*api.PriceHistory
		if err := json.Unmarshal([]byte(data["SellPriceHistory"]), &apiSellPriceHistory); err != nil {
			log.Println("failed to unmarshal sell price history")
		}

		baseSellPrice, parseErr := strconv.ParseInt(data["BaseSellPrice"], 10, 64)
		if parseErr != nil {
			return nil, fmt.Errorf("failed to parse %s base sell price: %w", key, parseErr)
		}

		sellPrice, parseErr := strconv.ParseInt(data["SellPrice"], 10, 64)
		if parseErr != nil {
			return nil, fmt.Errorf("failed to parse %s sell price: %w", key, parseErr)
		}

		minQuotation, parseErr := strconv.ParseFloat(data["MinQuotation"], 64)
		if parseErr != nil {
			return nil, fmt.Errorf("failed to parse %s min quotation: %w", key, parseErr)
		}

		maxQuotation, parseErr := strconv.ParseFloat(data["MaxQuotation"], 64)
		if parseErr != nil {
			return nil, fmt.Errorf("failed to parse %s max quotation: %w", key, parseErr)
		}

		apiGood := &api.SellGood{
			GoodId:                 key,
			Name:                   name,
			StationId:              data["StationId"],
			BaseSellPrice:          baseSellPrice,
			SellPrice:              sellPrice,
			SellPriceHistory:       apiSellPriceHistory,
			QuotationVariation:     convertToFloat64(quotationVariation),
			FastQuotationVariation: convertToFloat64(fastQuotationVariation),
			MinQuotation:           minQuotation,
			MaxQuotation:           maxQuotation,
			GoodUniqueId:           data["GoodUniqueId"],
		}

		goods = append(goods, apiGood)
	}

	return goods, nil
}

func GetBuyGoods(rdb *redis.Client) ([]*api.BuyGood, error) {
	ctx := context.Background()
	keys, err := rdb.Keys(ctx, "good:buy:*").Result()
	if err != nil {
		return nil, fmt.Errorf("failed to get buy good keys: %w", err)
	}

	var goods []*api.BuyGood
	for _, key := range keys {
		data, err := rdb.HGetAll(ctx, key).Result()
		if err != nil {
			return nil, fmt.Errorf("failed to get buy good data: %w", err)
		}

		name := rdb.HGet(ctx, fmt.Sprintf("good:info:%s", data["GoodUniqueId"]), "Name").Val()
		quotationVariation := rdb.HGet(ctx, fmt.Sprintf("good:info:%s", data["GoodUniqueId"]), "QuotationVariation").Val()
		fastQuotationVariation := rdb.HGet(ctx, fmt.Sprintf("good:info:%s", data["GoodUniqueId"]), "FastQuotationVariation").Val()

		var apiBuyPriceHistory []*api.PriceHistory
		if err := json.Unmarshal([]byte(data["BuyPriceHistory"]), &apiBuyPriceHistory); err != nil {
			log.Println("failed to unmarshal buy price history")
		}

		baseBuyPrice, parseErr := strconv.ParseInt(data["BaseBuyPrice"], 10, 64)
		if parseErr != nil {
			return nil, fmt.Errorf("failed to parse base buy price: %w", parseErr)
		}

		buyPrice, parseErr := strconv.ParseInt(data["BuyPrice"], 10, 64)
		if parseErr != nil {
			return nil, fmt.Errorf("failed to parse buy price: %w", parseErr)
		}

		minQuotation, parseErr := strconv.ParseFloat(data["MinQuotation"], 64)
		if parseErr != nil {
			return nil, fmt.Errorf("failed to parse min quotation: %w", parseErr)
		}

		maxQuotation, parseErr := strconv.ParseFloat(data["MaxQuotation"], 64)
		if parseErr != nil {
			return nil, fmt.Errorf("failed to parse max quotation: %w", parseErr)
		}

		apiGood := &api.BuyGood{
			GoodId:                 key,
			Name:                   name,
			StationId:              data["StationId"],
			BaseBuyPrice:           baseBuyPrice,
			BuyPrice:               buyPrice,
			BuyPriceHistory:        apiBuyPriceHistory,
			QuotationVariation:     convertToFloat64Test(quotationVariation, key),
			FastQuotationVariation: convertToFloat64Test(fastQuotationVariation, key),
			MinQuotation:           minQuotation,
			MaxQuotation:           maxQuotation,
			GoodUniqueId:           data["GoodUniqueId"],
		}

		goods = append(goods, apiGood)
	}
	return goods, nil
}

func UpdateBuyGoodPrice(rdb *redis.Client, priceInfos []PriceInfo) error {
	ctx := context.Background()
	for _, priceInfo := range priceInfos {
		key := fmt.Sprintf("good:buy:%s", priceInfo.stationId)
		data, err := rdb.HGetAll(ctx, key).Result()

		var apiBuyPriceHistory []*api.PriceHistory
		if err := json.Unmarshal([]byte(data["BuyPriceHistory"]), &apiBuyPriceHistory); err != nil {
			log.Println("failed to unmarshal buy price history")
		}
		apiBuyPriceHistory = append(apiBuyPriceHistory, &api.PriceHistory{Price: priceInfo.price, Time: time.Now().Unix()})
		// TODO: delete very old price history
		buyPriceHistoryJson, marshalErr := json.Marshal(apiBuyPriceHistory)
		if marshalErr != nil {
			log.Fatalf("Failed to marshal BuyPriceHistory: %v", err)
		}

		_, setErr := rdb.HSet(ctx, key, map[string]interface{}{
			"BuyPrice":        priceInfo.price,
			"BuyPriceHistory": buyPriceHistoryJson,
		}).Result()
		if setErr != nil {
			return fmt.Errorf("failed to update buy price: %w", err)
		}
	}
	return nil
}

// helper functions
func convertToFloat64(s string) float64 {
	f, err := strconv.ParseFloat(s, 64)
	if err != nil {
		log.Printf("Error converting string to float64: %v", err)
		return 0
	}
	return f
}

func convertToFloat64Test(s string, v string) float64 {
	f, err := strconv.ParseFloat(s, 64)
	if err != nil {
		log.Printf("%s, Error converting string to float64: %v", v, err)
		return 0
	}
	return f
}

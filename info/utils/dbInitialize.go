package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/go-redis/redis/v8"
)

func ReadAndParseJSON[T any](filePath string) ([]T, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}

	var items []T
	err = json.Unmarshal(data, &items)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON: %w", err)
	}

	return items, nil
}

func InitializeGoodsData(rdb *redis.Client, filePath string) error {
	ctx := context.Background()
	goods, err := ReadAndParseJSON[GoodJSON](filePath)

	if err != nil {
		return err
	}

	for _, good := range goods {
		if good.Mod != "基础货物" {
			continue
		}

		key := fmt.Sprintf("good:info:%d", good.GoodUniqueId)

		producerListJson, marshalErr := json.Marshal(good.ProducerList)
		if marshalErr != nil {
			log.Fatalf("Failed to marshal producer list: %v", marshalErr)
		}

		_, err := rdb.HSet(ctx, key, map[string]interface{}{
			"Name":                   good.Name,
			"Description":            good.Des,
			"IsSpeciality":           good.IsSpeciality,
			"QuotationVariation":     good.QuotationVariation,
			"FastQuotationVariation": good.FastQuotationVariation,
			"ProducerList":           producerListJson,
		}).Result()

		if err != nil {
			log.Printf("Failed to set Redis key for ID %d: %v\n", good.GoodUniqueId, err)
		}
	}

	return nil
}

func InitializeStationsData(rdb *redis.Client, filePath string) error {
	ctx := context.Background()
	stations, err := ReadAndParseJSON[StationJSON](filePath)

	if err != nil {
		return err
	}

	for _, station := range stations {
		key := fmt.Sprintf("station:%d", station.Id)

		var sellList []string
		for _, item := range station.SellList {
			sellList = append(sellList, strconv.FormatInt(item.ID, 10))
		}

		marshaledSellList, err := json.Marshal(sellList)
		if err != nil {
			log.Fatalf("Failed to marshal: %v", err)
		}

		var acquisitionList []string
		for _, item := range station.AcquisitionList {
			acquisitionList = append(acquisitionList, strconv.FormatInt(item.ID, 10))
		}

		marshaledAcquisitionList, err := json.Marshal(acquisitionList)
		if err != nil {
			log.Fatalf("Failed to marshal: %v", err)
		}
		_, setKeyErr := rdb.HSet(ctx, key, map[string]interface{}{
			"Name":            station.Name,
			"Description":     station.Des,
			"AttachedToCity":  strconv.FormatInt(station.AttachedToCity, 10),
			"SellList":        marshaledSellList,
			"AcquisitionList": marshaledAcquisitionList,
		}).Result()

		if setKeyErr != nil {
			log.Printf("Failed to set Redis key for ID %d: %v\n", station.Id, err)
		}

		/* 		for _, acquisitionGood := range station.AcquisitionList {
			_, err := rdb.HSet(ctx, fmt.Sprintf("good:quotations:%s", "StationId"), station.Id).Result()
			if err != nil {
				log.Printf("Failed to set Redis key for acquisition good ID %d: %v\n", acquisitionGood.ID, err)
			}
		} */
	}

	return nil
}

func InitializeGoodsQuotationData(rdb *redis.Client, filePath string) error {
	ctx := context.Background()
	goodQuotations, _ := ReadAndParseJSON[GoodQuotationJSON](filePath)
	stations, err := GetStations(rdb)

	if err != nil {
		return err
	}

	for _, goodQuotation := range goodQuotations {
		location := strings.Split(goodQuotation.IDCN, "/")[0]
		action := strings.Split(goodQuotation.IDCN, "/")[1]

		if action == "收购" {
			key := fmt.Sprintf("good:sell:%d", goodQuotation.ID)
			sellPriceHistory := []PriceHistory{
				{Price: goodQuotation.BasePrice, Time: time.Now().Unix()},
			}
			sellPriceHistoryJson, marshalErr := json.Marshal(sellPriceHistory)
			if marshalErr != nil {
				log.Fatalf("Failed to marshal SellPriceHistory: %v", err)
			}
			_, err := rdb.HSet(ctx, key, map[string]interface{}{
				"GoodUniqueId":     goodQuotation.GoodsId,
				"StationId":        GetStationIdByName(stations, location),
				"BaseSellPrice":    goodQuotation.BasePrice,
				"SellPrice":        goodQuotation.BasePrice,
				"SellPriceHistory": sellPriceHistoryJson,
				"MinQuotation":     goodQuotation.MinQuotation,
				"MaxQuotation":     goodQuotation.MaxQuotation,
			}).Result()
			if err != nil {
				log.Printf("Failed to set Redis key for ID %d: %v\n", goodQuotation.ID, err)
			}
		} else if action == "出售" {
			key := fmt.Sprintf("good:buy:%d", goodQuotation.ID)
			buyPriceHistory := []PriceHistory{
				{Price: goodQuotation.BasePrice, Time: time.Now().Unix()},
			}
			buyPriceHistoryJson, marshalErr := json.Marshal(buyPriceHistory)
			if marshalErr != nil {
				log.Fatalf("Failed to marshal BuyPriceHistory: %v", err)
			}
			_, err := rdb.HSet(ctx, key, map[string]interface{}{
				"GoodUniqueId":    goodQuotation.GoodsId,
				"StationId":       GetStationIdByName(stations, location),
				"BaseBuyPrice":    goodQuotation.BasePrice,
				"BuyPrice":        goodQuotation.BasePrice,
				"BuyPriceHistory": buyPriceHistoryJson,
				"MinQuotation":    goodQuotation.MinQuotation,
				"MaxQuotation":    goodQuotation.MaxQuotation,
				"Stock":           goodQuotation.Stock,
			}).Result()
			if err != nil {
				log.Printf("Failed to set Redis key for ID %d: %v\n", goodQuotation.ID, err)
			}
		}

	}

	return nil
}

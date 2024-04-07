package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/KUD-00/resonance/api"
	"github.com/KUD-00/resonance/info/utils"
	"github.com/go-redis/redis/v8"
	"google.golang.org/grpc"
)

var rdb *redis.Client

// Implement gRPC server
type server struct {
	api.UnimplementedInfoServiceServer
}

func (s *server) GetSellGoods(ctx context.Context, in *api.GetSellGoodsRequest) (*api.GetSellGoodsResponse, error) {
	sellGoods, err := utils.GetSellGoods(rdb)

	if err != nil {
		return nil, fmt.Errorf("failed to get sell goods from Redis: %v", err)
	}

	if len(sellGoods) == 0 {
		return nil, fmt.Errorf("no sell goods found")
	}

	if in.GoodUniqueId != "" {
		var filteredSellGoods []*api.SellGood
		for _, sellGood := range sellGoods {
			if sellGood.GoodUniqueId == in.GoodUniqueId {
				filteredSellGoods = append(filteredSellGoods, sellGood)
			}
		}
		return &api.GetSellGoodsResponse{Goods: filteredSellGoods}, nil
	}

	if in.StationId != "" {
		var filteredSellGoods []*api.SellGood
		for _, sellGood := range sellGoods {
			if sellGood.StationId == in.StationId {
				filteredSellGoods = append(filteredSellGoods, sellGood)
			}
		}
		return &api.GetSellGoodsResponse{Goods: filteredSellGoods}, nil
	}

	return &api.GetSellGoodsResponse{Goods: sellGoods}, nil
}

func (s *server) GetBuyGoods(ctx context.Context, in *api.GetBuyGoodsRequest) (*api.GetBuyGoodsResponse, error) {
	buyGoods, err := utils.GetBuyGoods(rdb)

	if err != nil {
		return nil, fmt.Errorf("failed to get buy goods from Redis: %v", err)
	}

	if len(buyGoods) == 0 {
		return nil, fmt.Errorf("no buy goods found")
	}

	if in.GoodUniqueId != "" {
		var filteredBuyGoods []*api.BuyGood
		for _, buyGood := range buyGoods {
			if buyGood.GoodUniqueId == in.GoodUniqueId {
				filteredBuyGoods = append(filteredBuyGoods, buyGood)
			}
		}
		return &api.GetBuyGoodsResponse{Goods: filteredBuyGoods}, nil
	}

	if in.StationId != "" {
		var filteredBuyGoods []*api.BuyGood
		for _, buyGood := range buyGoods {
			if buyGood.StationId == in.StationId {
				filteredBuyGoods = append(filteredBuyGoods, buyGood)
			}
		}
		return &api.GetBuyGoodsResponse{Goods: filteredBuyGoods}, nil
	}

	return &api.GetBuyGoodsResponse{Goods: buyGoods}, nil
}

func (s *server) GetStations(ctx context.Context, in *api.GetStationsRequest) (*api.GetStationsResponse, error) {
	if in.StationId != "" {
		station, err := utils.GetStationById(rdb, in.StationId)
		if err != nil {
			return nil, fmt.Errorf("failed to get station by id from Redis: %v", err)
		}
		return &api.GetStationsResponse{Stations: station}, err
	}

	stations, err := utils.GetStations(rdb)

	if err != nil {
		return nil, fmt.Errorf("failed to get stations from Redis: %v", err)
	}

	if len(stations) == 0 {
		return nil, fmt.Errorf("no stations found")
	}

	return &api.GetStationsResponse{Stations: stations}, nil
}

var ctx = context.Background()

func main() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Initialize the Redis database with the data from the JSON files")
	goodsFilePath := "/root/HomeGoodsFactory.json"
	goodsQuotationFilePath := "/root/HomeGoodsQuotationFactory.json"
	stationFilePath := "/root/HomeStationFactory.json"

	log.Println("Initialize Stations Data")
	initialStationErr := utils.InitializeStationsData(rdb, stationFilePath)
	if initialStationErr != nil {
		log.Fatalf("Failed to initialize station data: %v", initialStationErr)
	}

	log.Println("Initialize Goods Data")
	initialGoodsErr := utils.InitializeGoodsData(rdb, goodsFilePath)
	if initialGoodsErr != nil {
		log.Fatalf("Failed to initialize goods data: %v", initialGoodsErr)
	}

	log.Println("Initialize Goods Quotation Data")
	initialGoodsQuotationErr := utils.InitializeGoodsQuotationData(rdb, goodsQuotationFilePath)
	if initialGoodsQuotationErr != nil {
		log.Fatalf("Failed to initialize goods quotation data: %v", initialGoodsQuotationErr)
	}

	// Start the gRPC server
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	api.RegisterInfoServiceServer(grpcServer, &server{})

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

	// Start the HTTP server
	http.HandleFunc("/goods", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		} else if r.Method == "POST" {
			priceInfosStr := r.FormValue("priceInfos")
			action := r.FormValue("action")

			var priceInfos []utils.PriceInfo

			err := json.Unmarshal([]byte(priceInfosStr), &priceInfos)
			if err != nil {
				log.Printf("Error unmarshalling priceInfos: %v", err)
				http.Error(w, "Invalid input", http.StatusBadRequest)
				return
			}

			if action == "buy" {
				utils.UpdateBuyGoodPrice(rdb, priceInfos)
			} else if action == "sell" {
				// TODO:
				http.Error(w, "Invalid action", http.StatusBadRequest)
			} else {
				http.Error(w, "Invalid action", http.StatusBadRequest)
			}

		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	if err := http.ListenAndServe(":80", nil); err != nil {
		log.Fatalf("无法启动 HTTP 服务器: %v", err)
	}
}

package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/KUD-00/resonance/api"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var client api.InfoServiceClient

func main() {
	conn, err := grpc.Dial("info:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("无法连接 info 服务: %v", err)
	}
	defer conn.Close()

	client = api.NewInfoServiceClient(conn)

	http.HandleFunc("/", handleRootRequest)
	http.HandleFunc("/calculate", handleGoodsRequest)
	http.HandleFunc("/profit", handleProfitRequest)
	if err := http.ListenAndServe(":80", nil); err != nil {
		log.Fatalf("无法启动 HTTP 服务器: %v", err)
	}
}

func handleRootRequest(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome to the calculate service")
}

func handleGoodsRequest(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "仅支持 GET 请求", http.StatusMethodNotAllowed)
		return
	}

	action := r.URL.Query().Get("action")
	id := r.URL.Query().Get("id")
	stationId := r.URL.Query().Get("stationId")

	if action == "sell" {
		resp, err := client.GetSellGoods(context.Background(), &api.GetSellGoodsRequest{StationId: stationId, GoodUniqueId: id})
		if err != nil {
			http.Error(w, fmt.Sprintf("调用 info 服务失败: %v", err), http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "Good Information: %+v", resp.Goods)

	} else if action == "buy" {
		resp, err := client.GetBuyGoods(context.Background(), &api.GetBuyGoodsRequest{StationId: stationId, GoodUniqueId: id})
		if err != nil {
			http.Error(w, fmt.Sprintf("调用 info 服务失败: %v", err), http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "Good Information: %+v", resp.Goods)
	} else {
		http.Error(w, "请提供action参数，可以是buy/sell", http.StatusBadRequest)
	}
}

func handleProfitRequest(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "仅支持 GET 请求", http.StatusMethodNotAllowed)
		return
	}
}

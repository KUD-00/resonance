FROM golang:1.22.1 as builder

WORKDIR /build

COPY . .

WORKDIR /build/info

RUN go mod tidy

RUN CGO_ENABLED=0 GOOS=linux go build -v -o info main.go

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /build/info/info .
COPY --from=builder /build/config/HomeGoodsFactory.json /root/HomeGoodsFactory.json
COPY --from=builder /build/config/HomeStationFactory.json /root/HomeStationFactory.json
COPY --from=builder /build/config/HomeGoodsQuotationFactory.json /root/HomeGoodsQuotationFactory.json

EXPOSE 8080 50051

CMD ["./info"]
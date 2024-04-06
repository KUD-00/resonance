# should run build in the root directory
# docker build -f calculate/Dockerfile -t calculate:local .
FROM golang:1.22.1 as builder

WORKDIR /build

COPY . .

WORKDIR /build/calculate

RUN go mod tidy

RUN CGO_ENABLED=0 GOOS=linux go build -v -o calculate main.go

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /build/calculate/calculate .

EXPOSE 8080

CMD ["./calculate"]
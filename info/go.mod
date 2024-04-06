module github.com/KUD-00/resonance/info

go 1.22.1

replace github.com/KUD-00/resonance/api => ../api
require (
	github.com/KUD-00/resonance/api v0.0.0-00010101000000-000000000000
	github.com/go-redis/redis/v8 v8.11.5
	google.golang.org/grpc v1.62.1
)

require (
	github.com/cespare/xxhash/v2 v2.2.0 // indirect
	github.com/dgryski/go-rendezvous v0.0.0-20200823014737-9f7001d12a5f // indirect
	github.com/golang/protobuf v1.5.3 // indirect
	github.com/mitchellh/mapstructure v1.5.0
	golang.org/x/net v0.20.0 // indirect
	golang.org/x/sys v0.16.0 // indirect
	golang.org/x/text v0.14.0 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20240123012728-ef4313101c80 // indirect
	google.golang.org/protobuf v1.33.0 // indirect
)

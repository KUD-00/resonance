PROTO_DIR=../api/
GEN_DIR=./grpc/
PROTOC_GEN_TS_PATH=./node_modules/.bin/protoc-gen-ts
PROTOC=./node_modules/.bin/grpc_tools_node_protoc
ESBUILD=./node_modules/.bin/esbuild

all: gen_ts

gen_ts:
	$(PROTOC) \
	--plugin=protoc-gen-ts=$(PROTOC_GEN_TS_PATH) \
	--js_out=import_style=commonjs,binary:$(GEN_DIR) \
	--ts_out=service=grpc-node,mode=grpc-js:$(GEN_DIR) \
	--grpc_out=grpc_js:$(GEN_DIR) \
	--proto_path=$(PROTO_DIR) \
	$(PROTO_DIR)/*.proto

clean:
	rm -rf $(GEN_DIR)/*
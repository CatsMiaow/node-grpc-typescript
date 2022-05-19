# node-grpc-typescript

Node.js gRPC structure with [google.protobuf](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf) for TypeScript example

- This example uses [ts-proto](https://github.com/stephenh/ts-proto) as the TypeScript plugin.
- For an example using the [grpc_tools_node_protoc_ts](https://github.com/agreatfool/grpc_tools_node_protoc_ts) plugin, see the following [branch](https://github.com/CatsMiaow/node-grpc-typescript/tree/grpc_tools_node_protoc_ts) source.

## Installation

```sh
npm i
```

## Build

```sh
npm run build # *.proto, *.ts
npm run lint
```

## Server Start

```sh
npm start #= node dist/server
```

## Client Test

```sh
# 1. Request
npm run client #= node dist/client
# 2. with Parameter
npm run client blahblahblah
# 3. Error
npm run client error
# 4. Stream
npm run client stream
# 5. Health Check
npm run health
```

### Documentation

- [Node.js gRPC Documentation](https://grpc.io/grpc/node/grpc.html)
- [Protocol Buffers](https://developers.google.com/protocol-buffers/docs/proto3)
- [gRPC for Node.js](https://github.com/grpc/grpc-node)

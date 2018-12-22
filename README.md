# node-grpc-typescript
Node.js gRPC Structure for TypeScript Example

### Installation
```sh
$ npm i
```

### Build
```sh
$ npm run build:proto # *.proto
$ npm run build # *.ts
```

### Server Start
```sh
$ node dist/server
# OR
$ npm start
```

### Client Test
```sh
$ node dist/client
# OR
$ npm run client
# Request Parameter
$ npm run client blahblahblah
# Request Error
$ npm run client error
# Request Stream
$ npm run client stream
```

#### node_modules
[package.json](package.json)

##### Documentation
* [Node.js gRPC](https://grpc.io/grpc/node/grpc.html)
* [Protocol Buffers](https://developers.google.com/protocol-buffers/docs/proto3?hl=ko#json)
* [TypeScript d.ts plugin for gRPC Tools](https://github.com/agreatfool/grpc_tools_node_protoc_ts)

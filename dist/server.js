"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = require("grpc");
const helloworld_grpc_pb_1 = require("../models/helloworld_grpc_pb");
const Greeter_1 = require("./package/helloworld/Greeter");
const server = new grpc_1.Server();
server.addService(helloworld_grpc_pb_1.GreeterService, new Greeter_1.Greeter());
server.bind('0.0.0.0:50051', grpc_1.ServerCredentials.createInsecure());
server.start();
//# sourceMappingURL=server.js.map
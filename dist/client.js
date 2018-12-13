"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = require("grpc");
const helloworld_grpc_pb_1 = require("../models/helloworld_grpc_pb");
const helloworld_pb_1 = require("../models/helloworld_pb");
const utils_1 = require("./utils");
const client = new helloworld_grpc_pb_1.GreeterClient('localhost:50051', grpc_1.credentials.createInsecure());
let user;
if (process.argv.length >= 3) {
    user = process.argv[2];
}
else {
    user = 'world';
}
const req = new helloworld_pb_1.HelloRequest();
req.setName(user);
client.sayHello(req, (err, res) => {
    if (err) {
        utils_1.logger.error(err);
    }
    utils_1.logger.info('Greeting:', res.getMessage());
});
//# sourceMappingURL=client.js.map
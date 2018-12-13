"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helloworld_pb_1 = require("../../../models/helloworld_pb");
class Greeter {
    sayHello(call, callback) {
        const res = new helloworld_pb_1.HelloReply();
        res.setMessage(`dddHello ${call.request.getName()}`);
        callback(null, res);
    }
}
exports.Greeter = Greeter;
//# sourceMappingURL=Greeter.js.map
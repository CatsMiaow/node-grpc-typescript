import { sendUnaryData, ServerUnaryCall } from 'grpc';
import { IGreeterServer } from '../../../models/helloworld_grpc_pb';
import { HelloReply, HelloRequest } from '../../../models/helloworld_pb';
export declare class Greeter implements IGreeterServer {
    sayHello(call: ServerUnaryCall<HelloRequest>, callback: sendUnaryData<HelloReply>): void;
}

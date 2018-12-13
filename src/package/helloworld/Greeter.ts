import { sendUnaryData, ServerUnaryCall } from 'grpc';
import { IGreeterServer } from '../../../models/helloworld_grpc_pb';
import { HelloReply, HelloRequest } from '../../../models/helloworld_pb';

/**
 * package helloworld
 * service Greeter
 */
export class Greeter implements IGreeterServer {
  /**
   * Implements the SayHello RPC method.
   */
  public sayHello(call: ServerUnaryCall<HelloRequest>, callback: sendUnaryData<HelloReply>): void {
    const res: HelloReply = new HelloReply();

    res.setMessage(`Hello ${call.request.getName()}`);

    callback(null, res);
  }
}

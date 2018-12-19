import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { IGreeterServer } from '../../../models/helloworld_grpc_pb';
import { HelloReply, HelloRequest } from '../../../models/helloworld_pb';
import { ServiceError } from '../../utils';

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
    const name: string = call.request.getName();

    if (name === 'error') {
      // https://grpc.io/grpc/node/grpc.html#.status__anchor
      callback(new ServiceError(status.INVALID_ARGUMENT, 'InvalidValue'), null);

      return;
    }

    res.setMessage(`Hello ${name}`);

    callback(null, res);
  }
}

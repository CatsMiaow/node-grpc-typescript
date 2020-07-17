import { credentials, Metadata, ServiceError } from 'grpc';

import { GreeterClient } from '../models/helloworld_grpc_pb';
import { HelloRequest, HelloResponse } from '../models/helloworld_pb';

/**
 * gRPC GreeterClient Service
 */
class ClientService { // https://github.com/grpc/grpc-node/issues/54
  private readonly client: GreeterClient = new GreeterClient('localhost:50051', credentials.createInsecure());

  public async sayHello(param: HelloRequest, metadata: Metadata = new Metadata()): Promise<HelloResponse> {
    return new Promise((resolve: Resolve<HelloResponse>, reject: Reject): void => {
      this.client.sayHello(param, metadata, (err: ServiceError | null, res: HelloResponse) => {
        if (err) {
          return reject(err);
        }

        resolve(res);
      });
    });
  }
}

export const clientService: ClientService = new ClientService();

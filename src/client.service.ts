import { credentials, Metadata } from '@grpc/grpc-js';
import { promisify } from 'util';

import { GreeterClient, HelloRequest, HelloResponse } from './models/helloworld';

/**
 * gRPC GreeterClient Service
 * https://github.com/grpc/grpc-node/issues/54
 */
class ClientService {
  private readonly client: GreeterClient = new GreeterClient('localhost:50051', credentials.createInsecure());

  public async sayHello(param: HelloRequest, metadata: Metadata = new Metadata()): Promise<HelloResponse> {
    return promisify<HelloRequest, Metadata, HelloResponse>(this.client.sayHello.bind(this.client))(param, metadata);
  }
}

export const clientService: ClientService = new ClientService();

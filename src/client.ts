import { credentials, ServiceError } from 'grpc';

import { GreeterClient } from '../models/helloworld_grpc_pb';
import { HelloReply, HelloRequest } from '../models/helloworld_pb';
import { logger } from './utils';

const client: GreeterClient = new GreeterClient('localhost:50051', credentials.createInsecure());

let user: string = 'world';
if (process.argv.length >= 3) {
  user = process.argv[2];
}

const param: HelloRequest = new HelloRequest();
param.setName(user);

client.sayHello(param, (err: ServiceError | null, res: HelloReply) => {
  if (err) {
    logger.error(`${err.name} / ${err.code} / ${err.message}`);

    return;
  }

  logger.info('Greeting:', res.getMessage());
});

// https://github.com/grpc/grpc-node/issues/54
const sayHello: Promise<HelloReply> = new Promise<HelloReply>((resolve: Function, reject: Function): void => {
  client.sayHello(param, (err: ServiceError | null, res: HelloReply) => {
    if (err) {
      reject(err);

      return;
    }

    resolve(res);
  });
});
sayHello.then((res: HelloReply) => {
  logger.info('SayHello:', res.getMessage());
}).catch((err: ServiceError) => logger.error(`${err.name} / ${err.code} / ${err.message}`));

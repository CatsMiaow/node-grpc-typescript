import { credentials, ServiceError } from 'grpc';

import { GreeterClient } from '../models/helloworld_grpc_pb';
import { HelloReply, HelloRequest } from '../models/helloworld_pb';
import { logger } from './utils';

const client: GreeterClient = new GreeterClient('localhost:50051', credentials.createInsecure());

let user: string;
if (process.argv.length >= 3) {
  user = process.argv[2];
} else {
  user = 'world';
}

const req: HelloRequest = new HelloRequest();
req.setName(user);

client.sayHello(req, (err: ServiceError | null, res: HelloReply) => {
  if (err) {
    logger.error(err);
  }

  logger.info('Greeting:', res.getMessage());
});

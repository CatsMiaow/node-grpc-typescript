import { Server, ServerCredentials } from '@grpc/grpc-js';

import { Greeter, GreeterService } from './services/Greeter';
import { Health, HealthService, healthStatus, ServingStatus } from './services/Health';
import { logger } from './utils';

// Do not use @grpc/proto-loader
const server = new Server({
  'grpc.max_receive_message_length': -1,
  'grpc.max_send_message_length': -1,
});

server.addService(GreeterService, new Greeter());
server.addService(HealthService, new Health());
server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), (err: Error | null, bindPort: number) => {
  if (err) {
    throw err;
  }

  logger.info(`gRPC:Server:${bindPort}`, new Date().toLocaleString());
  server.start();
});

// Change service health status
healthStatus.set('helloworld.Greeter', ServingStatus.NOT_SERVING);

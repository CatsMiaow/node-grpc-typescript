import { Server, ServerCredentials } from '@grpc/grpc-js';

import { Greeter, GreeterService } from './services/Greeter';
import { Health, HealthService, healthStatus, ServingStatus } from './services/Health';
import { logger } from './utils';

// https://github.com/grpc/grpc/issues/6976
// https://pm2.io/doc/en/runtime/guide/load-balancing/#cluster-environment-variable
let port = 50051;
if (process.env.NODE_APP_INSTANCE) {
  port += Number(process.env.NODE_APP_INSTANCE);
}

// Do not use @grpc/proto-loader
const server: Server = new Server({
  'grpc.max_receive_message_length': -1,
  'grpc.max_send_message_length': -1,
});

server.addService(GreeterService, new Greeter());
server.addService(HealthService, new Health());
server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err: Error | null, bindPort: number) => {
  if (err) {
    throw err;
  }

  logger.info(`gRPC:Server:${bindPort}`, new Date().toLocaleString());
  server.start();
});

// Change service health status
healthStatus.set('helloworld.Greeter', ServingStatus.NOT_SERVING);

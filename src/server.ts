import 'source-map-support/register';
import { Server, ServerCredentials } from '@grpc/grpc-js';

import { Greeter, GreeterService } from './services/Greeter';
import { Health } from './services/Health';
import { logger } from './utils';

// Do not use @grpc/proto-loader
const server = new Server({
  'grpc.max_receive_message_length': -1,
  'grpc.max_send_message_length': -1,
});

server.addService(GreeterService, new Greeter());
const health = new Health(server);

server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), (err: Error | null, bindPort: number) => {
  if (err) {
    throw err;
  }

  logger.info(`gRPC:Server:${bindPort}`, new Date().toLocaleString());

  // Change service health status
  health.setStatus('helloworld.Greeter', 'SERVING');

  server.start();
});

export { server, health };

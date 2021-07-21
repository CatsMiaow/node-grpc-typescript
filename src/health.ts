import { credentials, ServiceError } from '@grpc/grpc-js';

import { HealthClient } from '../models/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from '../models/health_pb';
import { logger } from './utils';

const health = new HealthClient('localhost:50051', credentials.createInsecure());
logger.info('gRPC:HealthClient', new Date().toLocaleString());

let argv = 'helloworld.Greeter';
if (process.argv.length >= 3) {
  [,,argv] = process.argv;
}

const param = new HealthCheckRequest();
param.setService(argv);

health.check(param, (err: ServiceError | null, res: HealthCheckResponse) => {
  if (err) {
    return logger.error('healthCheck:', err);
  }

  const status = res.getStatus();
  if (status !== HealthCheckResponse.ServingStatus.SERVING) {
    return logger.error('healthCheck:', status);
  }

  logger.info('healthCheck:', status);
});

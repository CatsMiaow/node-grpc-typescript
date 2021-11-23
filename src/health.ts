import 'source-map-support/register';
import { credentials, ServiceError } from '@grpc/grpc-js';

import { HealthClient, HealthCheckRequest, HealthCheckResponse, HealthCheckResponse_ServingStatus } from './models/health';
import { logger } from './utils';

const health = new HealthClient('localhost:50051', credentials.createInsecure());
logger.info('gRPC:HealthClient', new Date().toLocaleString());

let argv = 'helloworld.Greeter';
if (process.argv.length >= 3) {
  [,,argv] = process.argv;
}

const param: HealthCheckRequest = {
  service: argv,
};

health.check(param, (err: ServiceError | null, res: HealthCheckResponse) => {
  if (err) {
    return logger.error('healthCheck:', err);
  }

  const { status } = res;
  if (status !== HealthCheckResponse_ServingStatus.SERVING) {
    return logger.error('healthCheck:', status);
  }

  logger.info('healthCheck:', status);
});

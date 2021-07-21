import { sendUnaryData, ServerUnaryCall, status, UntypedHandleCall } from '@grpc/grpc-js';

import { HealthService, IHealthServer } from '../../models/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from '../../models/health_pb';
import { ServiceError } from '../utils';

const { ServingStatus } = HealthCheckResponse;
const healthStatus: Map<string, HealthCheckResponse.ServingStatus> = new Map(Object.entries({
  '': ServingStatus.SERVING,
  'helloworld.Greeter': ServingStatus.SERVING,
}));

/**
 * gRPC Health Check
 * https://github.com/grpc/grpc-node/tree/master/packages/grpc-health-check
 */
class Health implements IHealthServer {
  [method: string]: UntypedHandleCall;

  // public check: handleUnaryCall<HealthCheckRequest, HealthCheckResponse> = (call, callback) => {}
  public check(call: ServerUnaryCall<HealthCheckRequest, HealthCheckResponse>, callback: sendUnaryData<HealthCheckResponse>): void {
    const service = call.request.getService();

    const serviceStatus = healthStatus.get(service);
    if (!serviceStatus) {
      return callback(new ServiceError(status.NOT_FOUND, 'NotFoundService'), null);
    }

    const res: HealthCheckResponse = new HealthCheckResponse();
    res.setStatus(serviceStatus);

    callback(null, res);
  }
}

export {
  Health,
  HealthService,
  healthStatus,
  ServingStatus,
};

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
    const service: string = call.request.getService();

    if (!healthStatus.has(service)) {
      return callback(new ServiceError(status.NOT_FOUND, 'NotFoundService'), null);
    }

    const res: HealthCheckResponse = new HealthCheckResponse();
    res.setStatus(<HealthCheckResponse.ServingStatus>healthStatus.get(service));

    callback(null, res);
  }
}

export {
  Health,
  HealthService,
  healthStatus,
  ServingStatus,
};

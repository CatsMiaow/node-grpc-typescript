import { ServiceError as grpcServiceError, status } from 'grpc';

/**
 * https://grpc.io/grpc/node/grpc.html#~ServiceError__anchor
 */
export class ServiceError implements grpcServiceError {
  public name: string = 'ServiceError';

  constructor(public code: status, public message: string) {}
}

export function serviceError(code: status, message: string): grpcServiceError {
  return {
    name: 'ServiceError',
    code,
    message,
  };
}

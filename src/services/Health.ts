import type { Server } from '@grpc/grpc-js';
import { HealthImplementation, ServingStatus, ServingStatusMap } from 'grpc-health-check';

export class Health {
  private servingStatus: ServingStatusMap = {
    '': 'NOT_SERVING',
    'helloworld.Greeter': 'NOT_SERVING',
  };

  private healthImpl = new HealthImplementation(this.servingStatus);

  constructor(server: Server) {
    this.healthImpl.addToServer(server);
  }

  public setStatus(service: string, status: ServingStatus): void {
    this.healthImpl.setStatus(service, status);
  }
}

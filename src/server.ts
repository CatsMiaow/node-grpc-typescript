import { Server, ServerCredentials } from 'grpc';

import { GreeterService } from '../models/helloworld_grpc_pb';
import { Greeter } from './package/helloworld/Greeter';

// grpc-tools로 proto를 가공하기 때문에 @grpc/proto-loader로 동적 로드할 필요가 없음
const server: Server = new Server();
server.addService(GreeterService, new Greeter());
server.bind('0.0.0.0:50051', ServerCredentials.createInsecure());
server.start();

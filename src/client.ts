import { ListValue, Struct, Value } from 'google-protobuf/google/protobuf/struct_pb';
import { ClientDuplexStream, ClientReadableStream, ClientWritableStream, credentials, Metadata, ServiceError } from 'grpc';

import { GreeterClient } from '../models/helloworld_grpc_pb';
import { HelloRequest, HelloResponse } from '../models/helloworld_pb';
import { clientService } from './clientService';
import { logger } from './utils';

/* // https://github.com/grpc/grpc-node/issues/543#issuecomment-427487420
const baseCred: ChannelCredentials = credentials.createSsl();
const authCred: CallCredentials = credentials.createFromMetadataGenerator((params: { service_url: string }, callback: MetadataCallback) => {
  logger.info('createFromMetadataGenerator:', params);

  const metadata: Metadata = new Metadata();
  metadata.add('authorization', 'accessTokenValue');
  callback(null, metadata);
});
const client: GreeterClient = new GreeterClient('localhost:50051', credentials.combineChannelCredentials(baseCred, authCred));
*/

// https://github.com/grpc/grpc/blob/master/doc/keepalive.md
// https://cloud.ibm.com/docs/services/blockchain?topic=blockchain-best-practices-app#best-practices-app-connections
const client: GreeterClient = new GreeterClient('localhost:50051', credentials.createInsecure(), {
  'grpc.keepalive_time_ms': 120000,
  'grpc.http2.min_time_between_pings_ms': 120000,
  'grpc.keepalive_timeout_ms': 20000,
  'grpc.http2.max_pings_without_data': 0,
  'grpc.keepalive_permit_without_calls': 1,
});
logger.info('gRPC:GreeterClient', new Date().toLocaleString());

let argv = 'world';
if (process.argv.length >= 3) {
  [,,argv] = process.argv;
}

const param: HelloRequest = new HelloRequest();
param.setName(argv);
param.setParamStruct(Struct.fromJavaScript({ foo: 'bar', bar: 'foo' }));
param.setParamListValue(ListValue.fromJavaScript([{ foo: 'bar' }, { bar: 'foo' }]));
param.setParamValue(Value.fromJavaScript('Any Value'));

const metadata: Metadata = new Metadata();
metadata.add('foo', 'bar1');
metadata.add('foo', 'bar2');

async function example(): Promise<void> {
  /**
   * rpc sayHello with callback
   * https://github.com/grpc/grpc-node/issues/54
   */
  client.sayHello(param, (err: ServiceError | null, res: HelloResponse) => {
    if (err) {
      return logger.error('sayBasic:', err.message);
    }

    logger.info('sayBasic:', res.getMessage());
  });

  /**
   * rpc sayHello with Promise
   */
  const sayHello: HelloResponse = await clientService.sayHello(param);
  logger.info('sayHello:', sayHello.getMessage());
  logger.info('sayHelloStruct:', (<Struct>sayHello.getParamStruct()).toJavaScript());
  logger.info('sayHelloListValue:', (<ListValue>sayHello.getParamListValue()).toJavaScript());
  const value: Value | undefined = sayHello.getParamValue();
  if (value) {
    logger.info('sayHelloValue:', value.toJavaScript());
  }

  /**
   * rpc sayHello with Metadata
   */
  const sayHelloMetadata: HelloResponse = await clientService.sayHello(param, metadata);
  logger.info('sayHelloMetadata:', sayHelloMetadata.getMessage());
}

function exampleStream(): void {
  /**
   * rpc sayHelloStreamRequest
   */
  const streamRequest: ClientWritableStream<HelloRequest> = client.sayHelloStreamRequest((err: ServiceError | null, res: HelloResponse) => {
    if (err) {
      return logger.error('sayHelloStreamRequest:', err);
    }

    logger.info('sayHelloStreamRequest:', res.getMessage());
  });

  for (let i = 1; i <= 10; i += 1) {
    const req: HelloRequest = new HelloRequest();
    req.setName(`${argv}.${i}`);
    streamRequest.write(req);
  }
  streamRequest.end();

  /**
   * rpc sayHelloStreamResponse
   */
  const streamResponse: ClientReadableStream<HelloResponse> = client.sayHelloStreamResponse(param);

  const data: string[] = [];
  streamResponse.on('data', (res: HelloResponse) => {
    data.push(res.getMessage());
  }).on('end', () => {
    logger.info('sayHelloStreamResponse:', data.join('\n'));
  }).on('error', (err: Error) => {
    logger.error('sayHelloStreamResponse:', err);
  });

  /**
   * rpc sayHelloStream
   */
  const stream: ClientDuplexStream<HelloRequest, HelloResponse> = client.sayHelloStream();
  stream
    .on('data', (res: HelloResponse) => logger.info('sayHelloStream:', res.getMessage()))
    .on('end', () => logger.info('sayHelloStream: End'))
    .on('error', (err: Error) => logger.error('sayHelloStream:', err));

  for (let i = 1; i <= 10; i += 1) {
    const req: HelloRequest = new HelloRequest();
    req.setName(`${argv}.${i}`);
    stream.write(req);
  }
  stream.end();
}

(async (): Promise<void> => {
  try {
    if (argv === 'stream') {
      exampleStream();
      return;
    }

    await example();
  } catch (err) {
    logger.error(err);
  }
})();

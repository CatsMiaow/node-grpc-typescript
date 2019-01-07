import { ClientDuplexStream, ClientReadableStream, ClientWritableStream, credentials, Metadata, ServiceError } from 'grpc';

import { GreeterClient } from '../models/helloworld_grpc_pb';
import { HelloRequest, HelloResponse } from '../models/helloworld_pb';
import { logger } from './utils';
import { Struct, ListValue, Value } from 'google-protobuf/google/protobuf/struct_pb';

let argv: string = 'world';
if (process.argv.length >= 3) {
  argv = process.argv[2];
}

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
const client: GreeterClient = new GreeterClient('localhost:50051', credentials.createInsecure());
const metadata: Metadata = new Metadata();
metadata.add('foo', 'bar1');
metadata.add('foo', 'bar2');

const param: HelloRequest = new HelloRequest();
param.setName(argv);

if (argv !== 'stream') {
  param.setParamStruct(Struct.fromJavaScript({ foo: 'bar', bar: 'foo' }));
  param.setParamListValue(ListValue.fromJavaScript([{ foo: 'bar' }, { bar: 'foo' }]));
  param.setParamValue(Value.fromJavaScript('Any Value'));

  // rpc sayHello
  client.sayHello(param, (err: ServiceError | null, res: HelloResponse) => {
    if (err) {
      logger.error('sayHello:', `${err.name} / ${err.code} / ${err.message}`);

      return;
    }

    logger.info('sayHello:', res.getMessage());
    logger.info('sayHelloStruct:', (<Struct>res.getParamStruct()).toJavaScript());
    logger.info('sayHelloListValue:', (<ListValue>res.getParamListValue()).toJavaScript());

    const value: Value | undefined = res.getParamValue();
    if (value) {
      logger.info('sayHelloValue:', value.toJavaScript());
    }
  });
  // rpc sayHello with Metadata
  client.sayHello(param, metadata, (err: ServiceError | null, res: HelloResponse) => {
    if (err) {
      logger.error('sayHelloMetadata:', err.message);

      return;
    }

    logger.info('sayHelloMetadata:', res.getMessage());
  });

  // rpc sayHello with Promise, https://github.com/grpc/grpc-node/issues/54
  const sayHello: Promise<HelloResponse> = new Promise<HelloResponse>((resolve: Function, reject: Function): void => {
    client.sayHello(param, (err: ServiceError | null, res: HelloResponse) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(res);
    });
  });
  sayHello
    .then((res: HelloResponse) => logger.info('sayHelloPromise:', res.getMessage()))
    .catch((err: ServiceError) => logger.error('sayHelloPromise:', err.message));
} else {
  // rpc sayHelloStreamRequest
  const streamRequest: ClientWritableStream<HelloRequest> = client.sayHelloStreamRequest((err: ServiceError | null, res: HelloResponse) => {
    if (err) {
      logger.error('sayHelloStreamRequest:', err);

      return;
    }

    logger.info('sayHelloStreamRequest:', res.getMessage());
  });

  for (let i: number = 1; i <= 10; i += 1) {
    const req: HelloRequest = new HelloRequest();
    req.setName(`${argv}.${i}`);
    streamRequest.write(req);
  }
  streamRequest.end();

  // rpc sayHelloStreamResponse
  const streamResponse: ClientReadableStream<HelloResponse> = client.sayHelloStreamResponse(param);

  const data: string[] = [];
  streamResponse.on('data', (res: HelloResponse) => {
    data.push(res.getMessage());
  }).on('end', () => {
    logger.info('sayHelloStreamResponse:', data.join('\n'));
  }).on('error', (err: Error) => {
    logger.error('sayHelloStreamResponse:', err);
  });

  // rpc sayHelloStream
  const stream: ClientDuplexStream<HelloRequest, HelloResponse> = client.sayHelloStream();
  stream
    .on('data', (res: HelloResponse) => logger.info('sayHelloStream:', res.getMessage()))
    .on('end', () => logger.info('sayHelloStream: End'))
    .on('error', (err: Error) => logger.error('sayHelloStream:', err));

  for (let i: number = 1; i <= 10; i += 1) {
    const req: HelloRequest = new HelloRequest();
    req.setName(`${argv}.${i}`);
    stream.write(req);
  }
  stream.end();
}

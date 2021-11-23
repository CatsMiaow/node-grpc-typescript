import 'source-map-support/register';
import { credentials, Metadata, ServiceError } from '@grpc/grpc-js';

import { clientService } from './clientService';
import { GreeterClient, HelloRequest, HelloResponse } from './models/helloworld';
import { logger } from './utils';

// https://github.com/grpc/grpc/blob/master/doc/keepalive.md
// https://cloud.ibm.com/docs/blockchain-multicloud?topic=blockchain-multicloud-best-practices-app#best-practices-app-connections
const client = new GreeterClient('localhost:50051', credentials.createInsecure(), {
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

const param: HelloRequest = {
  name: argv,
  paramStruct: { foo: 'bar', bar: 'foo' },
  paramListValue: [{ foo: 'bar' }, { bar: 'foo' }],
  paramValue: 'Any Value',
};

const metadata = new Metadata();
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

    logger.info('sayBasic:', res.message);
  });

  /**
   * rpc sayHello with Promise
   */
  const sayHello = await clientService.sayHello(param);
  logger.info('sayHello:', sayHello.message);
  logger.info('sayHelloStruct:', sayHello.paramStruct);
  logger.info('sayHelloListValue:', sayHello.paramListValue);
  logger.info('sayHelloValue:', sayHello.paramValue);

  /**
   * rpc sayHello with Metadata
   */
  const sayHelloMetadata = await clientService.sayHello(param, metadata);
  logger.info('sayHelloMetadata:', sayHelloMetadata.message);
}

function exampleStream(): void {
  /**
   * rpc sayHelloStreamRequest
   */
  const streamRequest = client.sayHelloStreamRequest((err: ServiceError | null, res: HelloResponse) => {
    if (err) {
      return logger.error('sayHelloStreamRequest:', err);
    }

    logger.info('sayHelloStreamRequest:', res.message);
  });

  for (let i = 1; i <= 10; i += 1) {
    streamRequest.write({
      name: `${argv}.${i}`,
    });
  }
  streamRequest.end();

  /**
   * rpc sayHelloStreamResponse
   */
  const streamResponse = client.sayHelloStreamResponse(param);

  const data: string[] = [];
  streamResponse.on('data', (res: HelloResponse) => {
    data.push(res.message);
  }).on('end', () => {
    logger.info('sayHelloStreamResponse:', data.join('\n'));
  }).on('error', (err: Error) => {
    logger.error('sayHelloStreamResponse:', err);
  });

  /**
   * rpc sayHelloStream
   */
  const stream = client.sayHelloStream();
  stream
    .on('data', (res: HelloResponse) => logger.info('sayHelloStream:', res.message))
    .on('end', () => logger.info('sayHelloStream: End'))
    .on('error', (err: Error) => logger.error('sayHelloStream:', err));

  for (let i = 1; i <= 10; i += 1) {
    stream.write({
      name: `${argv}.${i}`,
    });
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

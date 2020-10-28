import { randomBytes } from 'crypto';
import { ListValue, Struct, Value } from 'google-protobuf/google/protobuf/struct_pb';
import { MetadataValue, sendUnaryData, ServerDuplexStream, ServerReadableStream, ServerUnaryCall, ServerWriteableStream,
  status } from 'grpc';

import { GreeterService, IGreeterServer } from '../../models/helloworld_grpc_pb';
import { HelloRequest, HelloResponse } from '../../models/helloworld_pb';
import { logger, ServiceError } from '../utils';

/**
 * package helloworld
 * service Greeter
 */
class Greeter implements IGreeterServer {
  /**
   * Implements the SayHello RPC method.
   */
  public sayHello(call: ServerUnaryCall<HelloRequest>, callback: sendUnaryData<HelloResponse>): void {
    logger.info('sayHello', Date.now());

    const res: HelloResponse = new HelloResponse();
    const name: string = call.request.getName();
    logger.info('sayHelloName:', name);

    if (name === 'error') {
      // https://grpc.io/grpc/node/grpc.html#.status__anchor
      return callback(new ServiceError(status.INVALID_ARGUMENT, 'InvalidValue'), null);
    }

    const metadataValue: MetadataValue[] = call.metadata.get('foo');
    logger.info('sayHelloMetadata:', metadataValue);

    res.setMessage(`Hello ${metadataValue.length > 0 ? metadataValue : name}`);

    const paramStruct: Struct | undefined = call.request.getParamStruct();
    const paramListValue: ListValue | undefined = call.request.getParamListValue();
    const paramValue: Value | undefined = call.request.getParamValue();
    logger.info('sayHelloStruct:', paramStruct?.toJavaScript());
    logger.info('sayHelloListValue:', paramListValue?.toJavaScript());
    logger.info('sayHelloValue:', paramValue?.toJavaScript());

    if (paramStruct) {
      // = res.setParamStruct(paramStruct);
      res.setParamStruct(Struct.fromJavaScript(paramStruct.toJavaScript()));
    }
    res.setParamListValue(paramListValue);
    res.setParamValue(paramValue);

    callback(null, res);
  }

  public sayHelloStreamRequest(call: ServerReadableStream<HelloRequest>, callback: sendUnaryData<HelloResponse>): void {
    logger.info('sayHelloStreamRequest:', call.getPeer());

    const data: string[] = [];
    call.on('data', (req: HelloRequest) => {
      data.push(`${req.getName()} - ${randomBytes(5).toString('hex')}`);
    }).on('end', () => {
      const res: HelloResponse = new HelloResponse();
      res.setMessage(data.join('\n'));

      callback(null, res);
    }).on('error', (err: Error) => {
      callback(new ServiceError(status.INTERNAL, err.message), null);
    });
  }

  public sayHelloStreamResponse(call: ServerWriteableStream<HelloRequest>): void {
    logger.info('sayHelloStreamResponse:', call.request.toObject());

    const name: string = call.request.getName();

    for (const text of Array(10).fill('').map(() => randomBytes(5).toString('hex'))) {
      const res: HelloResponse = new HelloResponse();
      res.setMessage(`${name} - ${text}`);
      call.write(res);
    }
    call.end();
  }

  public sayHelloStream(call: ServerDuplexStream<HelloRequest, HelloResponse>): void {
    logger.info('sayHelloStream:', call.getPeer());

    call.on('data', (req: HelloRequest) => {
      const res: HelloResponse = new HelloResponse();
      res.setMessage(`${req.getName()} - ${randomBytes(5).toString('hex')}`);
      call.write(res);
    }).on('end', () => {
      call.end();
    }).on('error', (err: Error) => {
      logger.error('sayHelloStream:', err);
    });
  }
}

export {
  Greeter,
  GreeterService,
};

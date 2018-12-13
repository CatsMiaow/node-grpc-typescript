// package: hellostreamingworld
// file: hellostreamingworld.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as hellostreamingworld_pb from "./hellostreamingworld_pb";

interface IMultiGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sayHello: IMultiGreeterService_IsayHello;
}

interface IMultiGreeterService_IsayHello extends grpc.MethodDefinition<hellostreamingworld_pb.HelloRequest, hellostreamingworld_pb.HelloReply> {
    path: string; // "/hellostreamingworld.MultiGreeter/sayHello"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<hellostreamingworld_pb.HelloRequest>;
    requestDeserialize: grpc.deserialize<hellostreamingworld_pb.HelloRequest>;
    responseSerialize: grpc.serialize<hellostreamingworld_pb.HelloReply>;
    responseDeserialize: grpc.deserialize<hellostreamingworld_pb.HelloReply>;
}

export const MultiGreeterService: IMultiGreeterService;

export interface IMultiGreeterServer {
    sayHello: grpc.handleServerStreamingCall<hellostreamingworld_pb.HelloRequest, hellostreamingworld_pb.HelloReply>;
}

export interface IMultiGreeterClient {
    sayHello(request: hellostreamingworld_pb.HelloRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<hellostreamingworld_pb.HelloReply>;
    sayHello(request: hellostreamingworld_pb.HelloRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<hellostreamingworld_pb.HelloReply>;
}

export class MultiGreeterClient extends grpc.Client implements IMultiGreeterClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sayHello(request: hellostreamingworld_pb.HelloRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<hellostreamingworld_pb.HelloReply>;
    public sayHello(request: hellostreamingworld_pb.HelloRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<hellostreamingworld_pb.HelloReply>;
}

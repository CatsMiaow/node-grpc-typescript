// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// https://developers.google.com/protocol-buffers/docs/proto3?hl=ko#json
'use strict';
var grpc = require('grpc');
var helloworld_pb = require('./helloworld_pb.js');

function serialize_helloworld_HelloRequest(arg) {
  if (!(arg instanceof helloworld_pb.HelloRequest)) {
    throw new Error('Expected argument of type helloworld.HelloRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_helloworld_HelloRequest(buffer_arg) {
  return helloworld_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_helloworld_HelloResponse(arg) {
  if (!(arg instanceof helloworld_pb.HelloResponse)) {
    throw new Error('Expected argument of type helloworld.HelloResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_helloworld_HelloResponse(buffer_arg) {
  return helloworld_pb.HelloResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreeterService = exports.GreeterService = {
  sayHello: {
    path: '/helloworld.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: helloworld_pb.HelloRequest,
    responseType: helloworld_pb.HelloResponse,
    requestSerialize: serialize_helloworld_HelloRequest,
    requestDeserialize: deserialize_helloworld_HelloRequest,
    responseSerialize: serialize_helloworld_HelloResponse,
    responseDeserialize: deserialize_helloworld_HelloResponse,
  },
  sayHelloStreamRequest: {
    path: '/helloworld.Greeter/SayHelloStreamRequest',
    requestStream: true,
    responseStream: false,
    requestType: helloworld_pb.HelloRequest,
    responseType: helloworld_pb.HelloResponse,
    requestSerialize: serialize_helloworld_HelloRequest,
    requestDeserialize: deserialize_helloworld_HelloRequest,
    responseSerialize: serialize_helloworld_HelloResponse,
    responseDeserialize: deserialize_helloworld_HelloResponse,
  },
  sayHelloStreamResponse: {
    path: '/helloworld.Greeter/SayHelloStreamResponse',
    requestStream: false,
    responseStream: true,
    requestType: helloworld_pb.HelloRequest,
    responseType: helloworld_pb.HelloResponse,
    requestSerialize: serialize_helloworld_HelloRequest,
    requestDeserialize: deserialize_helloworld_HelloRequest,
    responseSerialize: serialize_helloworld_HelloResponse,
    responseDeserialize: deserialize_helloworld_HelloResponse,
  },
  sayHelloStream: {
    path: '/helloworld.Greeter/SayHelloStream',
    requestStream: true,
    responseStream: true,
    requestType: helloworld_pb.HelloRequest,
    responseType: helloworld_pb.HelloResponse,
    requestSerialize: serialize_helloworld_HelloRequest,
    requestDeserialize: deserialize_helloworld_HelloRequest,
    responseSerialize: serialize_helloworld_HelloResponse,
    responseDeserialize: deserialize_helloworld_HelloResponse,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);

// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// https://developers.google.com/protocol-buffers/docs/proto3?hl=ko#json
'use strict';
var grpc = require('grpc');
var hellostreamingworld_pb = require('./hellostreamingworld_pb.js');

function serialize_hellostreamingworld_HelloReply(arg) {
  if (!(arg instanceof hellostreamingworld_pb.HelloReply)) {
    throw new Error('Expected argument of type hellostreamingworld.HelloReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hellostreamingworld_HelloReply(buffer_arg) {
  return hellostreamingworld_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hellostreamingworld_HelloRequest(arg) {
  if (!(arg instanceof hellostreamingworld_pb.HelloRequest)) {
    throw new Error('Expected argument of type hellostreamingworld.HelloRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hellostreamingworld_HelloRequest(buffer_arg) {
  return hellostreamingworld_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var MultiGreeterService = exports.MultiGreeterService = {
  // Sends multiple greetings
  sayHello: {
    path: '/hellostreamingworld.MultiGreeter/sayHello',
    requestStream: false,
    responseStream: true,
    requestType: hellostreamingworld_pb.HelloRequest,
    responseType: hellostreamingworld_pb.HelloReply,
    requestSerialize: serialize_hellostreamingworld_HelloRequest,
    requestDeserialize: deserialize_hellostreamingworld_HelloRequest,
    responseSerialize: serialize_hellostreamingworld_HelloReply,
    responseDeserialize: deserialize_hellostreamingworld_HelloReply,
  },
};

exports.MultiGreeterClient = grpc.makeGenericClientConstructor(MultiGreeterService);

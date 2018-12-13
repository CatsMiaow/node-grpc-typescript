// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
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

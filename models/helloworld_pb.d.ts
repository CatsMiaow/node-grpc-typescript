// package: helloworld
// file: helloworld.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class HelloRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): void;


    hasParamStruct(): boolean;
    clearParamStruct(): void;
    getParamStruct(): google_protobuf_struct_pb.Struct | undefined;
    setParamStruct(value?: google_protobuf_struct_pb.Struct): void;


    hasParamListValue(): boolean;
    clearParamListValue(): void;
    getParamListValue(): google_protobuf_struct_pb.ListValue | undefined;
    setParamListValue(value?: google_protobuf_struct_pb.ListValue): void;


    hasParamValue(): boolean;
    clearParamValue(): void;
    getParamValue(): google_protobuf_struct_pb.Value | undefined;
    setParamValue(value?: google_protobuf_struct_pb.Value): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HelloRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HelloRequest): HelloRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HelloRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HelloRequest;
    static deserializeBinaryFromReader(message: HelloRequest, reader: jspb.BinaryReader): HelloRequest;
}

export namespace HelloRequest {
    export type AsObject = {
        name: string,
        paramStruct?: google_protobuf_struct_pb.Struct.AsObject,
        paramListValue?: google_protobuf_struct_pb.ListValue.AsObject,
        paramValue?: google_protobuf_struct_pb.Value.AsObject,
    }
}

export class HelloResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): void;

    getSnakeCase(): boolean;
    setSnakeCase(value: boolean): void;


    hasParamStruct(): boolean;
    clearParamStruct(): void;
    getParamStruct(): google_protobuf_struct_pb.Struct | undefined;
    setParamStruct(value?: google_protobuf_struct_pb.Struct): void;


    hasParamListValue(): boolean;
    clearParamListValue(): void;
    getParamListValue(): google_protobuf_struct_pb.ListValue | undefined;
    setParamListValue(value?: google_protobuf_struct_pb.ListValue): void;


    hasParamValue(): boolean;
    clearParamValue(): void;
    getParamValue(): google_protobuf_struct_pb.Value | undefined;
    setParamValue(value?: google_protobuf_struct_pb.Value): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HelloResponse.AsObject;
    static toObject(includeInstance: boolean, msg: HelloResponse): HelloResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HelloResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HelloResponse;
    static deserializeBinaryFromReader(message: HelloResponse, reader: jspb.BinaryReader): HelloResponse;
}

export namespace HelloResponse {
    export type AsObject = {
        message: string,
        snakeCase: boolean,
        paramStruct?: google_protobuf_struct_pb.Struct.AsObject,
        paramListValue?: google_protobuf_struct_pb.ListValue.AsObject,
        paramValue?: google_protobuf_struct_pb.Value.AsObject,
    }
}

/// <reference path="typings/tsd.d.ts" />

export const grpc = require("grpc");

export const hello_proto = grpc.load(__dirname + "/helloworld.proto").helloworld;

export interface HelloRequest {
    a: number;
    b: number;
}

export interface HelloReply {
    c: number;
}

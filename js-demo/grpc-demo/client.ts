import * as types from "./types";

var client: {
  add: (request: types.HelloRequest, callback: (error: Error, reply: types.HelloReply) => void) => void
} = new types.hello_proto.Greeter("localhost:50051", types.grpc.credentials.createInsecure());

client.add({
  a: 11,
  b: 22
}, function (error, response) {
  console.log(response.c);
});

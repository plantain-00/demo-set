import * as types from "./types";

var server = new types.grpc.Server();

server.addProtoService(types.hello_proto.Greeter.service, {
  add: function (call: { request: types.HelloRequest }, callback: (error: Error, reply: types.HelloReply) => void) {
    callback(null, {
      c: call.request.a + call.request.b
    });
  }
});
server.bind("0.0.0.0:50051", types.grpc.ServerCredentials.createInsecure());
server.start();

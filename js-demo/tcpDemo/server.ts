import * as net from "net";

const server = net.createServer(socket => {
    console.log("connected");
    socket.on("close", () => {
        console.log("closed");
    });
    socket.on("data", data => {
        console.log(data.toString());
        socket.write(`you said ${data}`);
    });
    // socket.pipe(socket);
});

server.listen(9999);
console.log("started");
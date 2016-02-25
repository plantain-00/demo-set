import * as net from "net";

const client = new net.Socket();
client.connect(9999, "localhost", () => {
    client.write("test");
});

client.on("data", data => {
    console.log(`accepted: ${data}`);
    client.destroy();
});

client.on("close", () => {
    console.log("closed");
});

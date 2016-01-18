import express = require("express");

import bodyParser = require('body-parser');

var documents = require("./controllers/document");
import month_cards = require("./controllers/month_cards");
import times_cards = require("./controllers/times_cards");
import orders = require("./controllers/orders");
import routes = require("./controllers/routes");
import customers = require("./controllers/customers");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/v1", documents.select);

app.get("/api/v1/customers/:customer_id/month_cards", month_cards.select);
//app.post("/api/v1/customers/:customer_id/month_cards", month_cards.create);

app.get("/api/v1/customers/:customer_id/times_cards", times_cards.select);
app.get("/api/v1/customers/:customer_id/times_cards/:times_card_id", times_cards.get);
//app.post("/api/v1/customers/:customer_id/times_cards", times_cards.create);
//app.put("/api/v1/customers/:customer_id/times_cards/:times_card_id", times_cards.update);

app.get("/api/v1/customers/:customer_id/orders", orders.select);
app.get("/api/v1/customers/:customer_id/orders/:order_id", orders.get);
app.post("/api/v1/customers/:customer_id/orders", orders.create);
//app.put("/api/v1/customers/:customer_id/orders/:order_id", orders.update);

app.get("/api/v1/routes", routes.select);
app.get("/api/v1/routes/:route_id", routes.get);

app.get("/api/v1/customers/:weixin_id", customers.get);
app.post("/api/v1/customers", customers.create);
//app.put("/api/v1/customers/:customer_id", customers.update);

app.listen(8888, function () {
    console.log("Server has started at port: " + 8888);
});
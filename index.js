const express = require("express");
let app = express();

let port = 3000;

let home = require("./src/routes/home");
let products = require("./src/routes/products");
let users = require("./src/routes/users");
let orders = require("./src/routes/orders");

app.listen(port, () => {
  console.log("☆☆☆ Server ready to accept requests on port:", port, "☆☆☆");
});

app.use("/", home);
app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);

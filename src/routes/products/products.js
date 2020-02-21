const fs = require("fs");
const path = require("path");

const products = require("../../db/products/all-products.json");
const categorySearcher = require("./categorySearcher");
const idSearcher = require("./idSearcher");
const idsSearcher = require("./idsSearcher");

const productsRoute = (request, response) => {
  if (request.method === "GET" && request.url === "/products") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(products));
    response.end();
  } else if (request.method === "GET" && request.url.includes("category")) {
    categorySearcher(request, response);
  } else if (request.method === "GET" && request.url.includes("ids")) {
    idsSearcher(request, response);
  } else if (request.method === "GET" && request.url.lastIndexOf("/") !== 0) {
    idSearcher(request, response);
  }
};

module.exports = productsRoute;

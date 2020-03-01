const express = require("express");
let router = express.Router();
let productsDatabase = require("../db/all-products.json");

router.get("/", (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "application/json");
    res.send(productsDatabase);
    res.end();
    return;
  }

  if (
    req.query.ids.split(",").length < productsDatabase.length &&
    req.url.includes("ids")
  ) {
    let productsArr = [];
    const productsIdsArr = req.query.ids.split(",");

    productsIdsArr.map(item => {
      const getProductById = productsDatabase.find(
        element => element.id === Number(item)
      );
      if (getProductById) {
        const productObj = {
          id: getProductById.id,
          sku: getProductById.sku,
          name: getProductById.name,
          description: getProductById.description
        };
        productsArr.push(productObj);
      }
      if (productsArr.length === 0) {
        foundedProducts = {
          status: "no products",
          products: []
        };
      } else {
        foundedProducts = {
          status: "success",
          products: productsArr
        };
      }
    });

    res.setHeader("Content-Type", "application/json");
    res.send(foundedProducts);
    res.end();
    return;
  }
});

module.exports = router;

const express = require("express");
let router = express.Router();
let products = require("../db/all-products.json");

router.get("/*", (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "application/json");
    res.send(products);
    res.end();
    return;
  }

  if (req.url.includes("?")) {
    let productsArr = [];
    const productsIdsArr = req.query.ids.split(",");

    productsIdsArr.map(item => {
      const getProductById = products.find(
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

  let oneProductId = req.url.slice(req.url.lastIndexOf("/") + 1);
  const getOneProductById = products.find(
    item => item.id.toString() === oneProductId
  );
  if (getOneProductById) {
    res.setHeader("Content-Type", "application/json");
    res.send(getOneProductById);
    res.end();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({
        status: "no products",
        products: []
      })
    );
    res.end();
  }
});

module.exports = router;

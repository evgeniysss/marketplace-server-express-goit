const express = require("express");
let router = express.Router();

const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const bodyParser = require("body-parser");

let productsDataBase = require("../db/all-products.json");
let usersDataBase = require("../db/all-users.json");

const checkOrder = orderToCheck => {
  const user = orderToCheck.user;
  const products = orderToCheck.products;
  const deliveryType = orderToCheck.deliveryType;
  const deliveryAdress = orderToCheck.deliveryAdress;
  if (
    typeof user === "string" &&
    typeof products === "object" &&
    typeof deliveryType === "string" &&
    typeof deliveryAdress === "string"
  )
    return true;
  else return false;
};

const getProducts = productsOrder => {
  const productsOrderIds = productsOrder.products;
  const getProductsResult = [];

  productsOrderIds.map(item => {
    const getOneProduct = productsDataBase.find(
      element => element.id === Number(item)
    );
    if (getOneProduct) {
      getProductsResult.push(getOneProduct);
    }
  });

  return getProductsResult;
};

const makeOrderDir = order => {
  let getUserById;
  usersDataBase.map(user => {
    if (user.id === order.user) {
      getUserById = user;
    }
  });

  const userDirPath = path.join(
    __dirname,
    "../",
    "db/",
    "users",
    `/${getUserById.user}`,
    "/orders"
  );

  fs.mkdir(userDirPath, err => {
    if (err) {
      return console.log(err);
    }
  });

  let orderName = [];
  order.products.map(item => {
    let productSearch = productsDataBase.find(elem => elem.id === Number(item));

    if (productSearch) {
      orderName.push(productSearch.name);
    }
  });

  const orderDirPath = path.join(`${userDirPath}`, `${orderName}.json`);

  fs.writeFile(orderDirPath, JSON.stringify(order), err => {
    if (err) {
      return console.log(err);
    }
    console.log(`New order file "${orderName}.json" already created!`);
  });
};

router.post("/", (req, res) => {
  const orderList = req.body;
  // console.log("orderList :", orderList);
  orderList.id = shortid.generate();

  if (checkOrder(orderList)) {
    console.log("Show!!!");
    const foundedProd = getProducts(orderList);

    if (foundedProd.length === orderList.products.length) {
      makeOrderDir(orderList);
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ status: "success", order: orderList }));
      res.end();
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ status: "failed", order: null }));
      res.end();
    }
  } else {
    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({
        status: "failed, you must enter correct type of data",
        order: null
      })
    );
    res.end();
  }
});

module.exports = router;

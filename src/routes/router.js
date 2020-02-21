const mainRoute = require("./main/main");
const productsRoute = require("./products/products");
const motocycleRoute = require("./motocycle/motocycle");
const signUpRoute = require("./users/sign-up-route");

const router = {
  "/signup": signUpRoute,
  "/products": productsRoute,
  "/motocycle": motocycleRoute,
  default: mainRoute
};

module.exports = router;

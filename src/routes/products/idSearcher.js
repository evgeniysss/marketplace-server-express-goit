const products = require("../../db/products/all-products.json");
const url = require("url");

const idSearcher = (request, response) => {
  const urlObj = url.parse(request.url);
  console.log("urlObj :", urlObj);
  const idFromPath = getIdFromPath(urlObj.path);
  const idProd = products.filter(el => el.id === Number(idFromPath));
  let foundedProducts;

  if (idProd.length === 0 || !idProd) {
    foundedProducts = {
      status: "no products",
      products: []
    };
  } else {
    foundedProducts = {
      status: "success",
      products: idProd
    };
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify(foundedProducts));
  response.end();
};

const getIdFromPath = urlPath => {
  const urlPathLastIndex = urlPath.lastIndexOf("/");
  if (urlPathLastIndex !== -1) {
    return urlPath.substring(urlPathLastIndex + 1);
  }
};

module.exports = idSearcher;

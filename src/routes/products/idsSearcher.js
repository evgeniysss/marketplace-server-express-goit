const products = require("../../db/products/all-products.json");
const qs = require("querystring");

const idsSearcher = (request, response) => {
  let productsArraySearchResult = [];
  let productsToShow;

  const idsObj = qs.parse(request.url);
  const idsStringFromUrl = Object.values(idsObj)[0];
  const idsFirstIndex = idsStringFromUrl.indexOf("'");
  const idsLastIndex = idsStringFromUrl.lastIndexOf("'");
  const idsValue = idsStringFromUrl
    .slice(idsFirstIndex + 1, idsLastIndex)
    .split(",");
  console.table(idsValue);

  idsValue.map(item => {
    const productSearch = products.find(element => element.id === Number(item));
    if (productSearch) {
      const itemObj = {
        id: productSearch.id,
        sku: productSearch.sku,
        name: productSearch.name,
        description: productSearch.description
      };
      productsArraySearchResult.push(itemObj);
    }
    if (productsArraySearchResult.length !== 0) {
      productsToShow = {
        status: "success",
        products: productsArraySearchResult
      };
    } else {
      productsToShow = {
        status: "no products",
        products: []
      };
    }
  });
  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify(productsToShow));
  response.end();
};

module.exports = idsSearcher;

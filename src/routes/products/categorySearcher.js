const products = require("../../db/products/all-products.json");
const qs = require("querystring");

const categorySearcher = (request, response) => {
  let productsArrayForSearchResult = [];
  let searchResult;

  const categoryObj = qs.parse(request.url);
  const categoryStringFromUrl = Object.values(categoryObj)[0];
  const categoryFirstIndex = categoryStringFromUrl.indexOf('"');
  const categoryLastIndex = categoryStringFromUrl.lastIndexOf('"');
  const categoryValue = categoryStringFromUrl.slice(
    categoryFirstIndex + 1,
    categoryLastIndex
  );

  const productsFilter = products.filter(
    item => item.categories[0] === categoryValue
  );

  if (productsFilter.length === 0) {
    searchResult = {
      status: "no products",
      products: []
    };
  } else {
    productsFilter.map(item => {
      const itemObj = {
        id: item.id,
        sku: item.sku,
        name: item.name,
        description: item.description
      };
      productsArrayForSearchResult.push(itemObj);
      searchResult = {
        status: "success",
        products: productsArrayForSearchResult
      };
    });
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify(searchResult));
  response.end();
};

module.exports = categorySearcher;

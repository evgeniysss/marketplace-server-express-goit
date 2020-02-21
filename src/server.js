const http = require("http");
const url = require("url");

const morgan = require("morgan");
const router = require("./routes/router");

const logger = morgan("combined");

const routeHandler = require("./handlers/routeHandler");

const startServer = port => {
  const server = http.createServer((request, response) => {
    // Get route from the request
    const parsedUrl = url.parse(request.url);

    // Get router function
    // const func = router[parsedUrl.pathname] || router.default;
    const func = routeHandler(router, parsedUrl.pathname) || router.default;

    logger(request, response, () => func(request, response));
  });

  server.listen(port, () => {
    console.log("☆☆☆ Server ready to accept requests on port:", port, "☆☆☆");
  });
};

module.exports = startServer;

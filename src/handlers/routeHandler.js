const getIdFreeUrl = url => {
  const firstIndex = url.indexOf("/");
  const lastIndex = url.lastIndexOf("/");
  if (lastIndex === 0) {
    return url;
  }
  if (firstIndex !== -1 && lastIndex !== -1) {
    return url.slice(firstIndex, lastIndex);
  }
};

const routeHandler = (routerConfig, url) => {
  const idFreeUrl = getIdFreeUrl(url);
  return routerConfig[idFreeUrl];
};

module.exports = routeHandler;

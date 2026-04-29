const util = {
  delay: require("./delay"),
  fetcher: require("./fetcher"),
  isRoute: require("./isRoute"),
  jwt: require("./jwt"),
  log: require("./log"),
};

module.exports = util;

util
  .fetcher("https://jsonplaceholder.typicode.com/todos/1", {
    throwError: false,
    rateLimit: [10, 1000 * 60],
  })
  .then(console.log)
  .catch(console.error);

// Use CommonJS require below so we can dynamically import during build-time.
const store = (() => {
  let c;
  if (process.env.NODE_ENV === "production") {
    c = require("./configureStore.prod");
  } else {
    c = require("./configureStore.dev");
  }
  return c.default();
})();

export default store;
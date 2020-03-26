const app = require("./app");

app.listen(process.env.PORT || 5001, () =>
  console.log("API - Online  ", process.env.PORT, " PORTA")
);

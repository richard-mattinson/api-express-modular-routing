// API spec  https://boolean-uk.github.io/api-express-modular-routing/

const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");
const { users } = require("./data"); 
const { response } = require("express");

// SETUP MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// REQUIRE ROUTERS
const usersRouter = require ("./src/routers/users");

// ADD ROUTERS TO APP
app.use("/users", usersRouter);

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

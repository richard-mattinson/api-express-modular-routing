const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");
const { users } = require("./data") 

// SETUP MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// REQUIRE ROUTERS
// const usersRouter = require/Coding/08-August/api-express-modular-routing (main)re("./src/routers/users");

// ADD ROUTERS TO APP

app.get("/users/:id", (request, response) => {
  const foundUser = users.find(user => user.id === Number(request.params.id))

  if (!foundUser) {
    return response.status(404).json({
      error: "The user with the provided id does not exist"
    })
  }
  response.json({
    user: foundUser
  })
})


/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

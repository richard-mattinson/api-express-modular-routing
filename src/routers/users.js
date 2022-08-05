const express = require('express')
const { users } = require('../../data')

const usersRouter = express.Router()

usersRouter.get("/", (req, res) => {
    if(!users) {
        return res.status(404).json({
            error: "THE USERS ARE IN A DIFFERENT CASTLE",
        });
    }
    console.log("USERS GET!");
    res.json({ users });
});

usersRouter.get("/:id", (request, response) => {
  const foundUser = users.find((user) => user.id === Number(request.params.id));

  if (!foundUser) {
    return response.status(404).json({
      error: "I SIMPLY DO NOT KNOW WHO THAT IS",
    });
  }
  response.json({
    user: foundUser,
  });
});

module.exports = usersRouter
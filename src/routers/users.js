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
      console.log("USER GET!");

    if (!foundUser) {
      return response.status(404).json({
        error: "BETTER LUCK NEXT TIME PLUMBER!",
      });
    }
    response.json({
      user: foundUser,
  });
});

usersRouter.put("/", (request, response) => {
    console.log("USER PUT!");
    const newUser = request.body
    newUser.id = users.length + 1;
    users.push(newUser)
    response.status(201).json({ newUser })
})

usersRouter.delete("/:id", (request, response) => {
    const foundUser = users.find((user) => user.id === Number(request.params.id));
    console.log("USER GONE!");
    const index = users.indexOf(foundUser)
    const deleteUserRequest = users.splice(index, 1)
    response.json({ user: deleteUserRequest })
})

usersRouter.put("/:id", (request, response) => {
  const oldUser = users.find((user) => user.id === Number(request.params.id));
  console.log("USER CHANGE!");
  const index = users.indexOf(oldUser);

  users.splice(index, 1, { ...request.body, id: oldUser.id });

  const updatedUser = users.find(
    (user) => user.id === Number(request.params.id)
  );

  response.status(201).json({
    user: { ...updatedUser }
  });
});

module.exports = usersRouter
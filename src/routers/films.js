const { res } = require('express');
const express = require('express');
const { films } = require('../../data');

const filmsRouter = express.Router();

// GET ALL FILMS
filmsRouter.get("/", (req, res) => {
    if(!films) {
        return res.status(404).json({
            error: "THERE WAS A BLOCKBUSTER HERE ONCE, IT'S GONE NOW"
        });
    }
    console.log("BLOCKBUSTER GET");
    res.json({ films });
});
// GET A FILM BY ID
filmsRouter.get("/:id", (req, res) => {
    const foundFilm = films.find(film => film.id === Number(req.params.id));
    
    if(!foundFilm){
        return res.status(404).json({
            error: "SORRY, WE DON'T STOCK THAT ONE"
        });
    }
    res.json({
        film: foundFilm
    });
// ADD NEW FILM
filmsRouter.put("/", (req, res) => {
    const newFilm = req.body
    newFilm.id = films.length + 1;
    films.push(newFilm);
    res.status(201).json({ newFilm })
    })
});
// UPDATE A FILM BY ID
filmsRouter.put("/:id", (req, res) => {
  const oldFilm = films.find((film) => film.id === Number(req.params.id));
    
  if (!oldFilm) {
      return res.status(404).json({
        error: "CAN'T UPDATE A FILM WE DON'T HAVE",
      });
    }

  const index = films.indexOf(oldFilm);

  films.splice(index, 1, { ...req.body, id: oldFilm.id });

  const updatedFilm = films.find(
    (film) => film.id === Number(req.params.id)
  );

  res.status(201).json({
    film: { ...updatedFilm },
  });
});

// DELETE FILM BY ID
filmsRouter.delete("/:id", (req, res) => {
    const foundFilm = films.find(film => film.id === Number(req.params.id));

    if(!foundFilm) {
        return res.status(404).json({
            error: "SORRY, THAT FILM IS ALREADY GONE"
        });
    }
    const index = films.indexOf(foundFilm);
    const deleteFilmRequest = films.splice(index, 1)
    res.json({ user: deleteFilmRequest })
})

module.exports = filmsRouter;
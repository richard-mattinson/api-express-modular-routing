const { res } = require("express");
const express = require("express");
const { books } = require("../../data");

const booksRouter = express.Router();

booksRouter.get('/', (req, res) => {
    if(!books) {
        return res.status(404).json({
            error: "THEY PROBABLY ALREADY CLOSED THIS LIBRARY"
        })
    }
    res.json({ books })
})

booksRouter.get("/:id", (req, res) => {
    const foundBook = books.find(book => book.id === Number(req.params.id));

    if(!foundBook){
        return res.status(404).json({
            error: "NOT SURE WE HAVE THAT ONE"
        })
    }
    res.json({
        book: foundBook
    })
})

booksRouter.put("/", (req, res) => {
    const newBook = req.body
    newBook.id = books.length + 1
    books.push(newBook)
    res.status(201).json({ newBook })
})

booksRouter.put("/:id", (req, res) => {
    const oldBook = books.find(book => book.id === Number(req.params.id));

    if(!oldBook) {
        return res.status(404).json({
            error: "CAN'T UPDATE A BOOK WE DON'T HAVE"
        })
    }
    const index = books.indexOf(oldBook)

    books.splice(index, 1, { ...req.body, id: oldBook.id })

    const updatedBook = books.find(
        (book) => book.id === Number(req.params.id)
    )

    res.status(201).json({
        book: { ...updatedBook }
    })
})

booksRouter.delete("/:id", (req, res) => {
    const foundBook = books.find(book => book.id === Number(req.params.id));

    if(!foundBook) {
        return res.status(404).json({
            error: "CAN'T DELETE A BOOK WE DON'T HAVE BUB"
        })
    }
    const index = books.indexOf(foundBook)
    const deleteBookRequest = books.splice(index, 1)
    res.json({ book: deleteBookRequest })
})

module.exports = booksRouter
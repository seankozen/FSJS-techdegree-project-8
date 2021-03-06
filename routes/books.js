var express = require('express');
var router = express.Router();
const Book = require('../models').Book;


function asyncHandler(cb){
	return async(req, res, next) => {
		try {
			await cb(req, res, next)
		} catch(error){
			res.status(500).send(error);       
		}
	}
}

/* Show full list of books */
router.get("/", asyncHandler(async (req, res) => {
  const books = await Book.findAll({order: [['title', 'ASC']]});
  res.render("index", {books, title: "Books"} );
}));

/* Create new book form */
router.get("/new", (req, res) => {
  res.render("new-book", { book: {}, title: "New Book" });
	
});

/* Post new book to database */
router.post("/new", asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/");  
    } catch (error) {
        if (error.name === "SequelizeValidationError"){
          book = await Book.build(req.body);
          res.render("new-book", { book, errors: error.errors, title: "New Book"});
        } else {
          throw error;
        }
    }
}));

/* Shows book detail form */
router.get("/:id", asyncHandler(async (req, res) => {
  let book = await Book.findByPk(req.params.id);
  res.render("update-book", { book, title: "Update Book" });
}));

/* Updates existing book */
router.post("/:id", asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect("/");
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
      if (error.name === "SequelizeValidationError"){
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render("update-book", { book, errors: error.errors, title: "Update Book"});
      } else {
        throw error;
      }
  }
}));

/* Deletes a book */
router.post("/:id/delete", asyncHandler(async (req, res) => {
  let book;
  book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/"); 
  } else {
    res.sendStatus(404);
  }	
}));

module.exports = router;



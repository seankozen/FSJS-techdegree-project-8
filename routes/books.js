var express = require('express');
var router = express.Router();
const Book = require('../models').Book;


function asyncHandler(cb){
	return async(req, res, next) => {
		try {
			await cb(req, res, next)
		} catch(error){
			//res.status(500).send(error);
            next(error);
		}
	}

}


/* Home & Books route */

/* Show full list of books */
router.get("/", asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render("index", {books, title: "Books"} );
}));


/* Create new book form */
router.get("/new", (req, res) => {
  res.render("newbook", { book: {}, title: "New Book" });
	
});

/* Post new book to database */
router.post("/new", asyncHandler(async (req, res) => {
    
    
  
	
}));

/* Shows book detail form */
router.get("/:id", asyncHandler(async (req, res) => {
  let book = await Book.findByPk(req.params.id);
  res.render("update-book", { book, title: "Update Book" });
}));







/* Updates existing book */
router.post("/:id/edit", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect("/books/" + book.id);
	
}));

/* Deletes a book */
router.post("/:id/delete", asyncHandler(async (req, res) => {

	
}));


module.exports = router;



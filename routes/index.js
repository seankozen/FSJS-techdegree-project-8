var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
/*
router.get('/', async function(req, res, next) {
  //res.render('index', { title: 'Express' });
  const books = await Book.findAll();
  res.json(books);

});
*/


function asyncHandler(cb){
	return async(req, res, next) => {
		try {
			await cb(req, res, next)
		} catch(error){
			res.status(500).send(error);
		}
	}

}

/* Home & Books route */
router.get("/", asyncHandler(async (req, res) => {
	res.render("layout");
	res.redirect("/books");
}));

/* Show full list of books */
router.get("/books", asyncHandler(async (req, res) => {
  res.render("layout");
	
}));


/* Create new book form */
router.get("/books/new", asyncHandler(async (req, res) => {

	
}));


/* Post new book to database */
router.post("/books/new", asyncHandler(async (req, res) => {

	
}));

/* Shows book detail form */
router.get("/books/:id", asyncHandler(async (req, res) => {

	
}));

/* Updates existing book */
router.post("/books/:id", asyncHandler(async (req, res) => {

	
}));

/* Deletes a book */
router.post("/books/:id/delete", asyncHandler(async (req, res) => {

	
}));


module.exports = router;



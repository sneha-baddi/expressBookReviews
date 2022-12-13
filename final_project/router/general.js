const express = require('express');
const public_users = express.Router();
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "Customer with same username already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register customer."});
});
// Get the book list available in the shop
/*public_users.get('/',function (req, res) {
  res.send(JSON.stringify({books}, null, 4));
});*/

//Get the book list using PROMISE
public_users.get('/',function (req, res) {
    let rootPromise = new Promise((resolve,reject) => {
        res.send(JSON.stringify({books},null,4))
        resolve("book list done")
     });
    rootPromise.then((successMessage) => {
        console.log(successMessage)
    });
});

// Get book details based on ISBN
/*public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn])
 });*/

//Bookd details on ISBN using PROMISE
public_users.get('/isbn/:isbn',function (req, res) {
    let isbnPromise = new Promise((resolve,reject)=>{
        const isbn=req.params.isbn;
        res.send(books[isbn])
        resolve("ISBN processed")
    })
    isbnPromise.then((successMessage)=>{
        console.log(successMessage)
    });
 });

// Get book details based on author
/*public_users.get('/author/:author',function (req, res) {
  let booksbyauthor = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["author"] === req.params.author) {
      booksbyauthor.push({"isbn":isbn,
                          "title":books[isbn]["title"],
                          "reviews":books[isbn]["reviews"]});
    }
  });
  res.send(JSON.stringify({booksbyauthor}, null, 4));
});*/

public_users.get('/author/:author',function (req, res) {
    let authorPromise = new Promise((resolve,reject)=>{
      const author=req.params.author;
      filtered_books={};
      for (book in books){
         if (books[book]["author"]===author){
             filtered_books[book]=books[book];
            }
      }
      res.send(filtered_books);
      resolve("Author processed")
  });
    authorPromise.then((successMessage)=>{
      console.log(successMessage)
    });
  });

// Get all books based on title
/*public_users.get('/title/:title',function (req, res) {
  let booksbytitle = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["title"] === req.params.title) {
      booksbytitle.push({"isbn":isbn,
                          "author":books[isbn]["author"],
                          "reviews":books[isbn]["reviews"]});
    }
  });
  res.send(JSON.stringify({booksbytitle}, null, 4));
});*/

public_users.get('/title/:title',function (req, res) {
    let titlePromise = new Promise((resolve,reject)=>{
        const title=req.params.title;
        filtered_books={};
        for (book in books){
               if (books[book]["title"]===title){
                  filtered_books[book]=books[book];
                }
        }
        res.send(filtered_books);
        resolve("Title processed")
    });
    titlePromise.then((successMessage)=>{
        console.log(successMessage)
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"])
});
module.exports.general = public_users;
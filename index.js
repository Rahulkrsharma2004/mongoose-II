const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Welcome endpoint
app.get('/', (req, res) => {
  res.send('WELCOME TO BOOKSTORE MANAGEMENT SYSTEM');
});

// Endpoint to retrieve all books
app.get('/books', (req, res) => {
  // Logic to retrieve and display all books
  res.send('List of all books in the bookstore');
});

// Middleware for validating book details
const validator = (req, res, next) => {
  const { title, author, ISBN } = req.body;
  if (!title || !author || !ISBN) {
    res.status(400).send('Missing book details. Please provide title, author, and ISBN.');
  } else {
    next();
  }
};

// Endpoint to add a new book
app.post('/books/add', validator, (req, res) => {
  // Logic to add a new book
  res.send('Book added successfully');
});

// Endpoint to search for books
app.get('/books/search', (req, res) => {
  const query = req.query.q; // Assuming the search query is provided as a 'q' parameter
  // Logic to search and return matching books
  res.send(`Search results for "${query}"`);
});

// Endpoint to update a specific book
app.put('/books/update/:id', (req, res) => {
  const bookId = req.params.id;
  // Logic to update the book details
  res.send(`Book with ID ${bookId} updated successfully`);
});

// Endpoint to delete a specific book
app.delete('/books/delete/:id', (req, res) => {
  const bookId = req.params.id;
  // Logic to delete the book
  res.send(`Book with ID ${bookId} deleted successfully`);
});

// Handling invalid endpoints
app.use((req, res) => {
  res.status(404).send('Invalid endpoint. Please check the URL.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

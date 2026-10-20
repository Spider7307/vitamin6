const express = require('express');
const app = express();
const PORT = 3000;

// TODO: Allow your server to parse JSON bodies in requests
// Hint: look at express.json() middleware
app.use(express.json());

app.get('/', (req, res) => {
    // TODO: Send back a string that says "Hello World"
    res.send("Hello World");
});

let books = [
    { id: 1, title: "The Great Gatsby" },
    { id: 2, title: "1984" }
];

// GET: Fetch all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST: Add a new book
app.post('/books', (req, res) => {
    // TODO: Take the book title from req.body and add it to the books array
    // Then, return the new list with a 201 status code
    books.push({id:books.length+1,title:req.body.title});
    res.status(201).json(books);
});

// PATCH: Update a book's title by ID
app.patch('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;
    // TODO: Find the book with the matching id and update its title to the one requested in req.body
    // Return the updated book, or a 404 error if not found
    const book = books.find(b=>b.id===id);
    if (!book) {
        return res.status(404).json({error: "Book not found"});
    } else {
        book.title=title;
        return res.status(200).json({
            message:"Book updated successfully",
            book:book,
        });
    }
});

// DELETE: Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // TODO: Filter the books array to remove the book with the matching id
    // Return the updated array
    books=books.filter(b=>b.id!==id);
    res.status(200).json(books);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.set('view engine', 'ejs');
app.get('/books/view', (req, res) => {
    // TODO: Use res.render() to render 'books' template and pass the books array
    res.render('books',{books});
});
require('dotenv').config();

app.get('/secrets', (req, res) => {
    // TODO: Access the SPOTIFY_KEY from process.env and send it back to the client
    const spotifyKey = process.env.SPOTIFY_KEY;
    if (!spotifyKey) {
        return res.send("Error: SPOTIFY_KEY isn't defined properly!");
    }
    res.send(spotifyKey);
});
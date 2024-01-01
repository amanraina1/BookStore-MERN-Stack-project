import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to get all the books in the database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to get the one book in the database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route for a new entry in the databse
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.send(400).send({
        message: "Send all required fields : Title, Author, Publish Year",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route for updating the existing book details
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(500).send({
        message: "Send all required fields : Title, Author, Publish Year",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndupdate(id, req.body);

    if (!result) {
      return res.status(500).json({ message: "No Book found" });
    }

    return res.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//Route for deleting the book from the database
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(500).json({ message: "No Book found" });
    }
    return res.status(200).send({ message: "Book Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;

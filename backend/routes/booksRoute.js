import express from "express";
import { Book } from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
    };
    const book = await Book.create(newBook);
    res.send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message});
  }
})

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const book = await Book.findById(id);

    res.send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message});
  }
})

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      res.status(404).send({ message: 'Book not found' });
    }

    res.send({ message: 'Book updated successfully' });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send({ message: 'Book not found' });
    }

    res.send({ message: 'Book deleted successfully' });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message});
  }
})

export default router;
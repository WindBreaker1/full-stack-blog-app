import express from "express";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import postsRoute from "./routes/postsRoute.js";
import booksRoute from "./routes/booksRoute.js";
import usersRoute from "./routes/usersRoute.js";

const app = express();

// Middleware for parsing JSON from request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5555',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/posts', postsRoute);
app.use('/books', booksRoute);
app.use('/users', usersRoute); // Add this line to use usersRoute

mongoose.connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
import express from 'express';
import {Post} from '../models/postModel.js';

const router = express.Router();

// ========================== Create Post ========================== //

router.post('/create', async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      author: req.body.author,
      tags: req.body.tags,
      content: req.body.content,
    };
    const post = await Post.create(newPost);
    res.send(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ========================== Get All Posts ========================== //

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send({
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ========================== Get Single Post ========================== //

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    res.send({ data: post });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ========================== Update Post ========================== //

router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndUpdate
    (id, req.body);
    if (!result) {
      res.status(404).send({ message: 'Post not found' });
    }
    res.send({ message: 'Post updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ========================== Delete Post ========================== //

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);
    if (!result) {
      res.status(404).send({ message: 'Post not found' });
    }
    res.send({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
const express = require('express');

const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const validateUserId = require("../middleware/validateUserId");
const validateUser = require("../middleware/validateUser");
const validatePost = require("../middleware/validatePost");

const router = express.Router();


// POST requests
router.post('/', validateUser, (req, res) => {
  // do your magic!
  const body = req.body;
  userDb.insert(body)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Error adding a new user." })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;
  postDb.insert({ ...body, user_id: id })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Error saving a new post." })
    })
});

// GET requests
router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: "error retrieving users" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userDb.getById(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: "something went wrong", error })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userDb.getUserPosts(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: "error retrieving posts." })
    })
});

// DELETE requests
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userDb.remove(id)
    .then(deleted => {
      res.status(200).json({ message: "user has successfully been deleted", deleted })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "error removing user", error })
    })
});

// PUT requests
router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;
  userDb.update(id, body)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "error trying to update user." })
    })
});


module.exports = router;

const express = require('express');

const postDb = require("./postDb");

const validatePostId = require("../middleware/validatePostId");
const validatePost = require("../middleware/validatePost");

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({errorMessage: "error retrieving posts"})
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  postDb.getById(id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({errorMessage: "something went wrong!"})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  postDb.remove(id)
  .then(data => {
    res.status(200).json({Message:"post successfully deleted", data})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({errorMessage: "error deleting post"})
  })
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;
  postDb.update(id, body)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({errorMessage: "error updating post."})
  })
});

module.exports = router;

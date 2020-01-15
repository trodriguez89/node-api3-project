const express = require('express');

const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const logger = require("./middleware/logger");

server.use(express.json());
server.use(logger);
server.use("/api/user", userRouter);
server.use("/api/post", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;

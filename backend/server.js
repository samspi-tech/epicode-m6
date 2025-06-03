const cors = require('cors');
const express = require('express');
const startServer = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const PORT = 9099;

const authorsRoute = require('./routes/author.route');
const blogPostsRoute = require('./routes/blogPost.route');
const addressRoute = require('./routes/address.route');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/authors', authorsRoute);
server.use('/blogPosts', blogPostsRoute);
server.use('/address', addressRoute);

server.use(errorHandler);

startServer(PORT, server);

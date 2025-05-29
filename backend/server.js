const cors = require('cors');
const express = require('express');
const startServer = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const PORT = 9099;

const authorsRoute = require('./routes/author.route');
const blogPostsRoute = require('./routes/blogPost.route');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/', authorsRoute);
server.use('/', blogPostsRoute);

server.use(errorHandler);

startServer(PORT, server);

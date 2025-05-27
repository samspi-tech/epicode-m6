const cors = require('cors');
const express = require('express');
require('dotenv').config();

const PORT = 9099;
const startServer = require('./config/db');
const authorsRoute = require('./routes/author.route');
const blogPostsRoute = require('./routes/blogPost.route');
const errorHandler = require('./middlewares/errorHandler');
const server = express();

server.use(cors());

server.use(express.json());
server.use('/', authorsRoute);
server.use('/', blogPostsRoute);

server.use(errorHandler);

startServer(PORT, server);

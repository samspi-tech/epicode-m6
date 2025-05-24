const cors = require('cors');
const express = require('express');
require('dotenv').config();

const PORT = 9099;
const startServer = require('./config/db');
const usersRoute = require('./routes/user.route');
const blogPostsRoute = require('./routes/blogPost.route');
const server = express();

server.use(cors());

server.use(express.json());
server.use('/', usersRoute);
server.use('/', blogPostsRoute);

startServer(PORT, server);

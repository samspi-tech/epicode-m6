require('dotenv').config();
const cors = require('cors');
const express = require('express');
const startServer = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const verifiedToken = require('./middlewares/auth/verifiedToken');

const PORT = process.env.PORT || 9099;

const authorsRoute = require('./routes/author.route');
const blogPostsRoute = require('./routes/blogPost.route');
const commentRoute = require('./routes/comment.route');
const authRoute = require('./routes/auth.route');
const googleAuthRoute = require('./routes/google.route');

const server = express();

server.use(cors({
    origin: ['https://epicode-m6.vercel.app'],
    credentials: true
}));

server.use(express.json());

server.use(verifiedToken);

server.use('/authors', authorsRoute);
server.use('/blogPosts', blogPostsRoute);
server.use('/comments', commentRoute);
server.use('/auth', authRoute);
server.use('/', googleAuthRoute);

server.use(errorHandler);

startServer(PORT, server);

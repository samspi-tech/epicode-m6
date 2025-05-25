import './blogPostForm.css';
import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';

const BlogPostForm = () => {
    const { payload, handleBlogPostCreation, handleNestedObj, createBlogPost } =
        useContext(BlogPostContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        createBlogPost();
    };

    return (
        <Form onSubmit={handleSubmit} className="my-3 d-flex flex-column">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={payload.title}
                onChange={handleBlogPostCreation}
                className="blog-post-form text-center display-4 fw-bold w-100"
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={payload.category}
                onChange={handleBlogPostCreation}
                className="blog-post-form text-center fs-5 w-100"
                required
            />
            <input
                type="text"
                name="cover"
                value={payload.cover}
                onChange={handleBlogPostCreation}
                className="blog-post-form text-center fs-5 w-100"
                placeholder="Paste an image URL of your choice (you can find one for free using Unslpash)"
                required
            />
            <input
                type="text"
                name="author"
                value={payload.author}
                onChange={handleBlogPostCreation}
                className="blog-post-form text-center fs-5 w-100"
                placeholder="We need your email to share your post with other users"
                required
            />
            <div className="align-self-center">
                <input
                    type="number"
                    name="readTime"
                    value={payload.readTime.value}
                    onChange={handleNestedObj}
                    className="blog-post-form number text-end fs-5"
                    placeholder="How long is gonna take to read yout post (in minutes)"
                    required
                />
                <span className="ms-2">min read</span>
            </div>
            <textarea
                name="content"
                autoCorrect="on"
                value={payload.content}
                placeholder="Tell your story..."
                onChange={handleBlogPostCreation}
                className="blog-post-form textarea mt-5 fs-5 w-50 mx-auto"
                required
            />
            <Button size="lg" type="submit" className="align-self-center">
                Post
            </Button>
        </Form>
    );
};

export default BlogPostForm;

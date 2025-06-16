import './blogPostForm.css';
import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BlogPostContext } from '../../../contexts/BlogPostsContext.jsx';
import { AuthorsContext } from "../../../contexts/AuthorsContext.jsx";
import { isAuthorId } from "../../../middleware/ProtectedRoutes.jsx";

const BlogPostForm = () => {
    const authorId = isAuthorId();
    const { data } = useContext(AuthorsContext)
    const { payload, dispatch, createBlogPost } = useContext(BlogPostContext);

    console.log(authorId);

    const handleSubmit = (e) => {
        e.preventDefault();
        createBlogPost(authorId);
    };

    const handlePayload = (e) => {
        const { name, value } = e.target;
        const isNestedObj = name === 'readTime';

        const setPayload = {
            ...payload,
            [name]: isNestedObj ? { value } : value
        };

        dispatch({
            type: 'setPayload',
            payload: {
                ...setPayload,
                email: data.email
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="my-3 d-flex flex-column">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={payload.title}
                onChange={handlePayload}
                className="blog-post-form text-center display-4 fw-bold w-100"
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={payload.category}
                onChange={handlePayload}
                className="blog-post-form text-center fs-5 w-100"
                required
            />
            <input
                type="text"
                name="cover"
                value={payload.cover}
                onChange={handlePayload}
                className="blog-post-form text-center fs-5 w-100"
                placeholder="Paste an image URL of your choice (optional)"
            />
            <div className="align-self-center">
                <input
                    type="number"
                    name="readTime"
                    onChange={handlePayload}
                    value={payload.readTime.value}
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
                onChange={handlePayload}
                placeholder="Tell your story..."
                className="blog-post-form textarea mt-5 fs-5"
                required
            />
            <Button size="lg" type="submit" className="mt-2 align-self-center">
                Post
            </Button>
        </Form>
    );
};

export default BlogPostForm;

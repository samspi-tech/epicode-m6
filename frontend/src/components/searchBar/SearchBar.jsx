import './searchBar.css';
import { Search } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { isToken } from "../../middleware/ProtectedRoutes.jsx";
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';
import { SearchPostContext } from '../../contexts/SearchPostContext.jsx';

const SearchBar = () => {
    const token = isToken();
    const { query, handleInputChange } = useContext(SearchPostContext);
    const { page, title, dispatch, getAllBlogPosts } = useContext(BlogPostContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchQuery = query.trim().toLowerCase();
        dispatch({
            type: 'searchBlogPost',
            query: searchQuery
        });
    };

    useEffect(() => {
        getAllBlogPosts(token);
    }, [page, title, token]);

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="search-bar">
                <InputGroup.Text>
                    <button
                        type="submit"
                        className="border-0 p-0 bg-transparent"
                    >
                        <Search/>
                    </button>
                </InputGroup.Text>
                <Form.Control
                    name="query"
                    value={query}
                    type="search"
                    onChange={handleInputChange}
                    placeholder="Search by title"
                />
            </InputGroup>
        </Form>
    );
};

export default SearchBar;

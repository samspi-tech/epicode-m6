import './searchBar.css';
import { Search } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';
import { SearchPostContext } from '../../contexts/SearchPostContext.jsx';

const SearchBar = () => {
    const { query, handleInputChange } = useContext(SearchPostContext);
    const { data, page, setData, getAllBlogPosts } =
        useContext(BlogPostContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const filteredPost = data.blogPosts.filter((post) => {
            const { title } = post;
            const postTitle = title.trim().toLowerCase();
            const searchQuery = query.trim().toLowerCase();

            return postTitle.includes(searchQuery);
        });
        setData(filteredPost);
    };

    useEffect(() => {
        query === '' && getAllBlogPosts(page);
    }, [query, page]);

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="search-bar">
                <InputGroup.Text>
                    <button
                        type="submit"
                        className="border-0 p-0 bg-transparent"
                    >
                        <Search />
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

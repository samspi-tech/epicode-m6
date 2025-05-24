import './searchBar.css';
import { Search } from 'lucide-react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
    return (
        <Form>
            <InputGroup className="search-bar">
                <InputGroup.Text>
                    <Search />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Search" />
            </InputGroup>
        </Form>
    );
};

export default SearchBar;

import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';

const CustomPagination = () => {
    const { data, page, setPage } = useContext(BlogPostContext);
    const totalPages = data && data.totalPages;

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-auto mb-5">
            <Button size="sm" onClick={handlePrevPage}>
                -
            </Button>
            <span>{page}</span>
            <Button size="sm" onClick={handleNextPage}>
                +
            </Button>
        </div>
    );
};

export default CustomPagination;

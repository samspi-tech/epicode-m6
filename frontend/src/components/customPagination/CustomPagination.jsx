import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';

const CustomPagination = () => {
    const { state, page, dispatch } = useContext(BlogPostContext);

    const { data } = state;
    const totalPages = data && data.totalPages;

    const handlePrevPage = () => page > 1 && dispatch({ type: 'prevPage' });
    const handleNextPage = () => page < totalPages && dispatch({ type: 'nextPage' });

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

import { useContext } from 'react';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import BlogPosts from '../components/blogPosts/BlogPosts.jsx';
import { BlogPostContext } from '../contexts/BlogPostsContext.jsx';
import CustomPagination from '../components/customPagination/CustomPagination.jsx';

const Homepage = () => {
    const { title, data, status } = useContext(BlogPostContext);

    return (
        <BaseLayout>
            <BlogPosts/>
            {status === 'ready' && title === '' && data.blogPosts.length > 3 &&
                <CustomPagination/>
            }
        </BaseLayout>
    );
};

export default Homepage;

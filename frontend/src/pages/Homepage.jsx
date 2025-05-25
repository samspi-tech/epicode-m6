import { useContext } from 'react';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import BlogPosts from '../components/blogPosts/BlogPosts.jsx';
import { BlogPostContext } from '../contexts/BlogPostsContext.jsx';
import CustomPagination from '../components/customPagination/CustomPagination.jsx';

const Homepage = () => {
    const { blogPosts } = useContext(BlogPostContext);

    return (
        <BaseLayout>
            <BlogPosts />
            {blogPosts && blogPosts.length > 0 && <CustomPagination />}
        </BaseLayout>
    );
};

export default Homepage;

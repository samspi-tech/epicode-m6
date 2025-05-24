import BaseLayout from '../baseLayout/BaseLayout.jsx';
import BlogPosts from '../components/blogPosts/BlogPosts.jsx';

const Homepage = () => {
    return (
        <BaseLayout>
            <BlogPosts />
        </BaseLayout>
    );
};

export default Homepage;

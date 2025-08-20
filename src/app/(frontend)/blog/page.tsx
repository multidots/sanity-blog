import BlogListClient from './BlogListClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read the latest blog posts and insights on our blog.',
};

export default function BlogListPage() {
    return <BlogListClient />;
}
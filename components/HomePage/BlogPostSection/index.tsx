"use client";

import { useState } from 'react';

// Define a type for the blog post
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

// Type the props for BlogPostCard
const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <a
          href={`/blog/${post.slug}`}
          className="text-primary-color hover:underline"
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

const BlogPostSection: React.FC = () => {
  // Hardcoded array of blog posts
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "What is Corten Steel?",
      excerpt: "COR-TEN® Steel is a high strength steel with a high weathering resistance. COR-TEN® has been a trademarked name used to generalize Weathered Steel. ",
      image: "/images/what_is_corten_steel.jpg",
      slug: "what-is-corten-steel",
    },
{
      id: 2,
      title: "What is Corten Steel?",
      excerpt: "COR-TEN® Steel is a high strength steel with a high weathering resistance. COR-TEN® has been a trademarked name used to generalize Weathered Steel. ",
      image: "/images/what_is_corten_steel.jpg",
      slug: "what-is-corten-steel",
    },
{
      id: 3,
      title: "What is Corten Steel?",
      excerpt: "COR-TEN® Steel is a high strength steel with a high weathering resistance. COR-TEN® has been a trademarked name used to generalize Weathered Steel. ",
      image: "/images/what_is_corten_steel.jpg",
      slug: "what-is-corten-steel",
    },
    
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Latest Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPostSection; 
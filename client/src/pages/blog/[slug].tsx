import React from "react";
import { useRoute, useLocation } from "wouter";
import BlogPost from "@/components/blog/BlogPost";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function BlogPostPage() {
  // Get the blog post slug from the URL
  const [match, params] = useRoute("/blog/:slug");
  const [, navigate] = useLocation();
  
  if (!match || !params?.slug) {
    // Redirect to blog index if no slug is provided
    navigate("/blog");
    return null;
  }
  
  // Find the blog post with the matching slug
  const post = blogPosts.find(post => post.slug === params.slug);
  
  if (!post) {
    // Display a 404-style message if the post is not found
    return (
      <div className="bg-[#F3F4E6] min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Blog Post Not Found</h1>
          <p className="text-xl mb-8">
            We couldn't find the blog post you're looking for.
          </p>
          <Button 
            asChild
            className="bg-[#FFB375] hover:bg-[#FFD7B5] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Render the blog post
  return <BlogPost post={post} />;
}
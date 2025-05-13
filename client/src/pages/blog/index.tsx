import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types/blogTypes";

export default function BlogIndex() {
  return (
    <>
      <Helmet>
        <title>Car Detailing Tips & Guides | Hardy's Wash N' Wax Blog</title>
        <meta
          name="description"
          content="Expert car detailing tips, guides, and advice from Sacramento's mobile detailing specialists. Learn how to keep your vehicle looking its best."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "headline": "Hardy's Wash N' Wax Car Detailing Blog",
            "description": "Expert car detailing tips, guides, and advice from Sacramento's mobile detailing specialists.",
            "publisher": {
              "@type": "Organization",
              "name": "Hardy's Wash N' Wax",
              "logo": {
                "@type": "ImageObject",
                "url": "https://hardyswashnwax.com/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFB375] to-[#FFD7B5] py-16 md:py-24 border-b-2 border-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Car Detailing Tips & Guides
            </h1>
            <p className="text-xl text-gray-800 mb-8">
              Expert advice and insights to keep your vehicle looking its best, from Sacramento's trusted mobile detailing professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="py-16 bg-[#F3F4E6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post: BlogPost) => (
              <article key={post.slug} className="bg-white rounded-lg overflow-hidden shadow-md border-2 border-black">
                {post.coverImage && (
                  <div className="h-48 overflow-hidden border-b-2 border-black">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <time dateTime={post.date} className="text-sm text-gray-500 block mb-2">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="text-xl font-bold mb-3 hover:text-[#EE432C] transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Button
                    asChild
                    className="bg-[#FFD7B5] hover:bg-[#FFB375] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FFB375] py-12 border-y-2 border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">Ready for Professional Car Detailing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-800">
            Book your appointment today and experience premium mobile detailing service delivered right to your location.
          </p>
          <Link href="/booking">
            <Button className="bg-[#EE432C] hover:bg-[#d13a26] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-8 py-3 rounded text-lg font-bold transition-all">
              Book Your Detail
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
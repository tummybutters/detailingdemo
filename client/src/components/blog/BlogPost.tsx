import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { BlogPost as BlogPostType } from "@/types/blogTypes";
import { CalendarIcon, ClockIcon, TagIcon } from "lucide-react";

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  const { 
    title, 
    metaDescription, 
    date, 
    content, 
    coverImage, 
    readTime, 
    categories, 
    serviceLink,
    faqSchema,
    slug
  } = post;
  
  return (
    <>
      <Helmet>
        <title>{title} | Hardy's Wash N' Wax</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        {coverImage && <meta property="og:image" content={coverImage} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hardyswashnwax.com/blog/${slug}`} />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": metaDescription,
            "image": coverImage,
            "datePublished": date,
            "author": {
              "@type": "Organization",
              "name": "Hardy's Wash N' Wax"
            },
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
        
        {/* FAQ Schema */}
        {faqSchema && faqSchema.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqSchema.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })}
          </script>
        )}
      </Helmet>

      <article className="bg-[#F3F4E6] py-16">
        <div className="container mx-auto px-4">
          {/* Blog Header */}
          <div className="max-w-4xl mx-auto">
            {coverImage && (
              <div className="mb-8 rounded-lg overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <img 
                  src={coverImage} 
                  alt={title} 
                  className="w-full h-auto"
                />
              </div>
            )}
            
            <header className="mb-12">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              
              <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <time dateTime={date}>{formatDate(date)}</time>
                </div>
                
                {readTime && (
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{readTime} min read</span>
                  </div>
                )}
                
                {categories && categories.length > 0 && (
                  <div className="flex items-center flex-wrap gap-2">
                    <TagIcon className="h-4 w-4 mr-1" />
                    {categories.map((category, index) => (
                      <span 
                        key={index} 
                        className="bg-[#FFD7B5] text-black px-2 py-1 text-xs rounded-full border border-black"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>
            
            {/* Blog Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {typeof content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <div>
                  {content.map((section, index) => {
                    if (section.type === 'paragraph') {
                      return <p key={index}>{section.content}</p>;
                    } else if (section.type === 'heading') {
                      const HeadingTag = `h${section.level}` as keyof JSX.IntrinsicElements;
                      return <HeadingTag key={index}>{section.content}</HeadingTag>;
                    } else if (section.type === 'list') {
                      return (
                        <ul key={index} className="list-disc pl-5 space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      );
                    } else if (section.type === 'image') {
                      return (
                        <div key={index} className="my-8">
                          <img 
                            src={section.src} 
                            alt={section.alt || ''} 
                            className="w-full h-auto rounded-lg border-2 border-black"
                          />
                          {section.caption && (
                            <p className="text-center text-gray-600 mt-2">{section.caption}</p>
                          )}
                        </div>
                      );
                    } else if (section.type === 'quote') {
                      return (
                        <blockquote key={index} className="border-l-4 border-[#EE432C] pl-4 italic">
                          {section.content}
                          {section.author && (
                            <footer className="text-right mt-2">— {section.author}</footer>
                          )}
                        </blockquote>
                      );
                    } else if (section.type === 'component' && section.name) {
                      // This would need to be implemented based on your component system
                      // For now we'll just return a placeholder
                      return (
                        <div key={index} className="my-8 p-4 bg-[#FFD7B5] rounded-lg border-2 border-black">
                          [Custom Component: {section.name}]
                          {section.props && Object.keys(section.props).length > 0 && (
                            <pre className="text-xs mt-2">
                              {JSON.stringify(section.props, null, 2)}
                            </pre>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
            
            {/* FAQ Section (if applicable) */}
            {faqSchema && faqSchema.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqSchema.map((faq, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-6 rounded-lg shadow-md border-2 border-black"
                    >
                      <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* CTA Section */}
            {serviceLink && (
              <div className="bg-[#FFB375] p-8 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-bold mb-4">Ready to Experience Professional Detailing?</h2>
                <p className="mb-6">
                  Turn the knowledge from this article into action. Book your premium detailing service today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    asChild
                    className="bg-[#EE432C] hover:bg-[#d13a26] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <Link href="/booking">Book a Detail</Link>
                  </Button>
                  
                  <Button 
                    asChild
                    variant="outline" 
                    className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <Link href={serviceLink}>Learn About This Service</Link>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Button
                asChild
                variant="outline"
                className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Link href="/blog">← Back to All Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default BlogPost;
'use client';
import { useState, useEffect } from 'react';
import { Calendar, User, ChevronRight, Search, Tag, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link, useParams } from '@/components/RouterShim';
import axios from 'axios';
import { BLOGS_API } from '../utils/api';

export default function SingleBlogPage({ initialBlog = null, initialAllBlogs = [] }) {
  const { slug } = useParams();
  const [blog, setBlog] = useState(initialBlog);
  const [allBlogs, setAllBlogs] = useState(initialAllBlogs);
  const [loading, setLoading] = useState(!initialBlog);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialBlog && initialBlog.content && (initialBlog.slug === slug || !slug)) {
      setBlog(initialBlog);
      if (initialAllBlogs && initialAllBlogs.length > 0) {
        setAllBlogs(initialAllBlogs);
      }
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const [singleRes, listRes] = await Promise.all([
          axios.get(`${BLOGS_API}/${encodeURIComponent(slug || initialBlog?.slug || '')}`),
          axios.get(BLOGS_API)
        ]);
        setBlog(singleRes.data);
        setAllBlogs(listRes.data);
        setLoading(false);
      } catch (err) {
        setError('Blog not found');
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug, initialBlog, initialAllBlogs]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get recent 3 posts excluding current
  const recentPosts = allBlogs.filter(b => b._id !== blog?._id).slice(0, 3);

  // Get unique categories
  const categories = [...new Set(allBlogs.map(b => b.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h2>
        <p className="text-gray-500 mb-8 text-lg">The page you are looking for has been moved or deleted.</p>
        <Link to="/blog" className="bg-[#D4AF37] text-white px-8 py-3 rounded hover:bg-[#B8860B] transition-colors font-bold uppercase tracking-wide text-sm">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-0">

      {/* 1. Page Header / Banner */}
      <div className="bg-gray-900 text-white pt-36 pb-12 md:pt-48 md:pb-20 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#D4AF37]/10 skew-x-12 transform origin-bottom"></div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="w-full">
              {/* Breadcrumb */}
              <div className="flex items-center text-xs md:text-sm text-gray-400 font-medium mb-4 overflow-x-auto whitespace-nowrap">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
                <span className="text-[#D4AF37] truncate max-w-[150px] sm:max-w-xs">{blog.category || 'Article'}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                {blog.title}
              </h1>

              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs md:text-sm text-gray-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <span>{blog.author || 'S-Vastu Solution'}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600"></div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                {blog.category && (
                  <>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600"></div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-[#D4AF37]" />
                      <span className="uppercase tracking-wider">{blog.category}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content & Sidebar Layout */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT: Blog Content Area (70%) */}
          <div className="lg:w-[70%]">

            {/* Cover Image */}
            {blog.coverImage && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full max-h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="mb-10 text-xl text-gray-700 font-medium leading-relaxed border-l-4 border-[#D4AF37] pl-6 py-2 italic">
                {blog.excerpt}
              </div>
            )}

            {/* Article Body */}
            <article className="vastu-article mb-8">
              <div dangerouslySetInnerHTML={{ __html: blog.content?.replace(/(<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>\s*)+$/gi, '') }} />
            </article>

            {/* Share Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-b border-gray-200 gap-4">
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900">Share this wisdom:</span>
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`, '_blank')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>
                </button>
              </div>
            </div>

            {/* Author Block */}
            <div className="bg-[#FFF9EB] p-8 rounded-2xl mt-12 flex flex-col md:flex-row gap-6 items-center md:items-start border border-[#D4AF37]/20 shadow-sm">
              <div className="w-20 h-20 bg-gray-900 text-[#D4AF37] flex items-center justify-center font-black text-3xl rounded-full shrink-0 shadow-md">
                {(blog.author || 'S')[0]}
              </div>
              <div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">{blog.author || 'S-Vastu Solution'}</h4>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                  S-Vastu Solution provides expert Vastu consulting services for homes and businesses. We combine ancient architectural science with modern living to bring harmony, prosperity, and peace to your spaces.
                </p>
                <Link to="/contact-us" className="text-[#B8860B] font-bold hover:text-gray-900 transition-colors text-sm uppercase tracking-wider flex items-center gap-1">
                  Book a Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT: Sidebar (30%) */}
          <div className="lg:w-[30%]">
            <div className="sticky top-28 space-y-8 max-h-[calc(100vh-7rem)] overflow-y-auto pb-4 scrollbar-hide">

              {/* Search Widget */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">Search Blog</h3>
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-shadow"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Categories Widget */}
              {categories.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">Categories</h3>
                  <ul className="space-y-3 mt-2">
                    {categories.map((cat, i) => (
                      <li key={i}>
                        <Link to={`/blog?category=${cat}`} className="flex items-center justify-between text-gray-600 hover:text-[#B8860B] transition-colors group bg-white px-4 py-2 rounded-lg border border-gray-100">
                          <span className="font-medium flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                            {cat}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recent Posts Widget */}
              {recentPosts.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-lg text-gray-900 mb-6 border-b-2 border-[#D4AF37] pb-2 inline-block">Recent Insights</h3>
                  <div className="space-y-6 mt-2">
                    {recentPosts.map((post) => (
                      <Link to={`/${post.slug || post._id}`} key={post._id} className="flex gap-4 group items-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-xl shrink-0 overflow-hidden shadow-sm">
                          {post.coverImage && (
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug group-hover:text-[#B8860B] transition-colors mb-1.5">
                            {post.title}
                          </h4>
                          <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Widget */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl text-white text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>

                <h3 className="font-bold text-2xl mb-3 relative z-10">Vastu Consultation</h3>
                <p className="text-gray-300 text-sm mb-8 leading-relaxed relative z-10">Balance the energies of your home or office. Connect with our experts today.</p>
                <a href="https://wa.me/919817755699" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-[#D4AF37] hover:bg-[#B8860B] py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-colors mb-4 relative z-10 text-white shadow-md">
                  Book Now
                </a>
                <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-300 relative z-10">
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#D4AF37]" /> +91 98177 55699</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Styles for Article Content */}
      <style>{`
        .vastu-article {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #4b5563;
        }

        .vastu-article h2 {
          font-size: 1.875rem;
          font-weight: 800;
          color: #111827;
          margin: 3rem 0 1.25rem;
          line-height: 1.3;
        }

        .vastu-article h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 2.5rem 0 1rem;
        }

        .vastu-article p {
          margin-bottom: 1.75rem;
        }

        .vastu-article ul, .vastu-article ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .vastu-article li {
          margin-bottom: 0.75rem;
        }
        
        .vastu-article ul li {
          list-style-type: disc;
          color: #D4AF37;
        }
        .vastu-article ul li span, .vastu-article ul li p, .vastu-article ul li text {
          color: #4b5563;
        }
        
        .vastu-article a {
          color: #B8860B;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 600;
        }
        
        .vastu-article a:hover {
          color: #D4AF37;
        }

        .vastu-article blockquote {
          border-left: 4px solid #D4AF37;
          background: #FFF9EB;
          padding: 1.5rem 2rem;
          margin: 2.5rem 0;
          font-style: italic;
          color: #92400e;
          border-radius: 0 1rem 1rem 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .vastu-article img {
          max-width: 100%;
          border-radius: 1rem;
          margin: 2.5rem 0;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}


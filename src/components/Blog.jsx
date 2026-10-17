'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from './RouterShim';
import axios from 'axios';
import { BLOGS_API } from '../utils/api';

const cleanExcerpt = (post) => {
  const raw = post.excerpt || post.content || '';
  const stripped = raw.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  return stripped.length > 150 ? stripped.substring(0, 150) + '...' : stripped;
};

export default function Blog({ hideHeader = false, limit, showFilters = false, initialPosts = null }) {
  const hasInitial = Array.isArray(initialPosts) && initialPosts.length > 0;
  const [posts, setPosts] = useState(hasInitial ? initialPosts : []);
  const [loading, setLoading] = useState(!hasInitial);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (hasInitial) return;
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(BLOGS_API, { params: { _t: Date.now() } });
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [hasInitial]);

  const categories = ['All', ...new Set(posts.map(post => post.category || 'General'))];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => (post.category || 'General') === activeCategory);

  const displayedPosts = limit ? filteredPosts.slice(0, limit) : filteredPosts;
  const hasMore = limit && filteredPosts.length > limit;

  return (
    <section id="blog" className={`bg-slate-50 relative ${hideHeader ? 'py-10' : 'pt-0 pb-10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-6 pt-12">
            <span className="text-[#B8860B] font-serif italic tracking-wider text-2xl sm:text-3xl leading-none">Our Insights</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2 mb-4 leading-tight">
              Latest from the <span className="text-[#B8860B]">Blog</span>
            </h2>
            {/* <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full mb-4"></div> */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Stay updated with expert tips, scientific explanations, and practical remedies for everyday Vastu compliance.
            </p>
          </div>
        )}

        {/* Filters */}
        {showFilters && !loading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading blogs...</div>
        ) : displayedPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No blog posts found in this category.</div>
        ) : (
          <>
            {/* Desktop View: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPosts.map((post) => (
                <motion.div
                  key={post._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col group cursor-pointer"
                  whileHover={{ y: -8 }}
                >
                  <Link to={`/${post.slug}`} className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.coverImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain bg-slate-100 transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                        <span className="text-sm font-bold text-[#D4AF37]">
                          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#B8860B] transition-colors leading-tight line-clamp-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm line-clamp-3">
                        {cleanExcerpt(post)}
                      </p>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b-2 border-[#D4AF37] pb-1 self-start group-hover:text-[#B8860B] group-hover:border-[#B8860B] transition-colors">
                        Read Article
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile View: Infinite Animated Marquee */}
            <div className="md:hidden overflow-hidden relative w-full flex py-4">
              <motion.div
                className="flex gap-4 px-2"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: Math.max(15, displayedPosts.length * 6), repeat: Infinity }}
                style={{ width: "fit-content" }}
              >
                {[...displayedPosts, ...displayedPosts].map((post, index) => (
                  <motion.div
                    key={`mobile-${index}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group cursor-pointer w-[280px] shrink-0"
                    whileHover={{ y: -4 }}
                  >
                    <Link to={`/${post.slug}`} className="flex flex-col h-full">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.coverImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain bg-slate-100"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                          <span className="text-xs font-bold text-[#D4AF37]">
                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2 whitespace-normal">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 flex-1 text-sm line-clamp-2 whitespace-normal">
                          {cleanExcerpt(post)}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 border-b-2 border-[#D4AF37] pb-1 self-start">
                          Read Article
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        )}

        {/* View All Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-gray-900 font-bold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              View All Posts
            </Link>
          </div>
        )}

      </div>
    </section >
  );
}


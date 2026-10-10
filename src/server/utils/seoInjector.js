const fs = require('fs');
const path = require('path');
const Page = require('../models/Page');
const Blog = require('../models/Blog');
const Seo = require('../models/Seo');

const injectSEO = async (req, res, next) => {
  try {
    const indexPath = path.join(__dirname, '../../S-Vastu/dist/index.html');
    
    // Check if index.html exists (only in production)
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send('Frontend build not found. Please run npm run build in frontend.');
    }

    let htmlData = fs.readFileSync(indexPath, 'utf8');

    let metaTitle = 'S Vastu Solution - Expert Vastu Consultant';
    let metaDescription = 'Trusted Vastu Consultant in Zirakpur, Chandigarh. Expert in Residential, Commercial, and Industrial Vastu.';
    let metaKeywords = 'Vastu Consultant, S Vastu Solution, Chandigarh, Zirakpur, Numerology, Residential Vastu';
    let metaCanonical = 'https://svastusolution.com' + req.path;
    let metaRobots = 'index, follow';
    let metaOgImage = '';
    let scriptTags = '';

    // Fetch default SEO from Home to use as fallback
    let defaultSeo = null;
    try {
      defaultSeo = await Seo.findOne({ pageName: 'home' });
      if (defaultSeo && defaultSeo.ogImage) {
        metaOgImage = defaultSeo.ogImage;
      }
    } catch (e) {
      // ignore
    }

    const routePath = req.path;
    const parts = routePath.split('/').filter(Boolean);

    // Dynamic Route Resolution
    if (parts.length === 0) {
      // Home Page
      if (defaultSeo) {
        metaTitle = defaultSeo.title || metaTitle;
        metaDescription = defaultSeo.description || metaDescription;
        metaKeywords = defaultSeo.keywords || metaKeywords;
        metaCanonical = defaultSeo.canonical || metaCanonical;
        metaRobots = defaultSeo.robots || metaRobots;
        metaOgImage = defaultSeo.ogImage || metaOgImage;
        scriptTags = defaultSeo.scriptTags || scriptTags;
      }

      // Pre-render blog links on home page for search engines
      try {
        const blogs = await Blog.find({ isPublished: true }).select('title slug').sort({ createdAt: -1 }).limit(6);
        const homeBlogsHtml = `
          <div id="seo-prerender" style="display:block;">
            <section style="display:none;">
              <h2>Latest Vastu Insights & Articles</h2>
              <ul>
                ${blogs.map(b => `<li><a href="https://svastusolution.com/${b.slug}">${b.title}</a></li>`).join('')}
                <li><a href="https://svastusolution.com/blog">View All Blogs</a></li>
              </ul>
            </section>
          </div>
        `;
        htmlData = htmlData.replace('<div id="root"></div>', `<div id="root">${homeBlogsHtml}</div>`);
      } catch (err) {
        // ignore
      }
    } else if (parts[0] === 'about-us') {
      const seoData = await Seo.findOne({ pageName: 'about' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      }
    } else if (parts[0] === 'services') {
      const seoData = await Seo.findOne({ pageName: 'services' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      }
    } else if (parts[0] === 'blog' && parts.length === 1) {
      // Main Blog Listing Page (/blog)
      const seoData = await Seo.findOne({ pageName: 'blog' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || 'https://svastusolution.com/blog';
        metaRobots = seoData.robots || 'index, follow';
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      } else {
        metaTitle = 'Vastu & Astrology Insights | S Vastu Solution Blog';
        metaDescription = 'Explore ancient wisdom and practical tips on Vastu Shastra, Astrology, and Numerology for modern homes and businesses.';
        metaCanonical = 'https://svastusolution.com/blog';
      }

      // Pre-render published blogs list as HTML links so Googlebot discovers and references all single blog pages
      try {
        const blogs = await Blog.find({ isPublished: true }).select('title slug excerpt createdAt').sort({ createdAt: -1 });
        const blogListHtml = `
          <div id="seo-prerender" style="display:block;">
            <header style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
              <h1>Our Blog & Insights</h1>
              <p>${metaDescription}</p>
            </header>
            <main style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
              <ul style="list-style: none; padding: 0;">
                ${blogs.map(b => `
                  <li style="margin-bottom: 24px;">
                    <h2><a href="https://svastusolution.com/${b.slug}">${b.title}</a></h2>
                    <p>${b.excerpt || ''}</p>
                  </li>
                `).join('')}
              </ul>
            </main>
          </div>
        `;
        htmlData = htmlData.replace('<div id="root"></div>', `<div id="root">${blogListHtml}</div>`);
      } catch (err) {
        console.error('Error pre-rendering blog list:', err);
      }
    } else if (parts[0] === 'gallery') {
      const seoData = await Seo.findOne({ pageName: 'gallery' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      }
    } else if (parts[0] === 'contact') {
      const seoData = await Seo.findOne({ pageName: 'contact' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      }
    } else if (parts[0] === 'privacy-policy') {
      const seoData = await Seo.findOne({ pageName: 'privacy-policy' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      } else {
        metaTitle = 'Privacy Policy | S Vastu Solution';
        metaDescription = 'Read the Privacy Policy of S Vastu Solution. We protect your data and privacy while providing expert Vastu and Numerology consultations.';
      }
    } else if (parts[0] === 'terms-of-service') {
      const seoData = await Seo.findOne({ pageName: 'terms-of-service' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      } else {
        metaTitle = 'Terms of Service | S Vastu Solution';
        metaDescription = 'Terms of Service for S Vastu Solution. Understand the terms, conditions, and guidelines for using our Vastu and Numerology services.';
      }
    } else if (parts[0] === 'blog' && parts.length === 2) {
      // Single Blog Page under /blog/:slug
      const blogData = await Blog.findOne({ slug: parts[1] });
      if (blogData) {
        metaTitle = blogData.metaTitle || blogData.title;
        metaDescription = blogData.metaDescription || '';
        metaKeywords = blogData.metaKeywords || '';
        metaCanonical = blogData.metaCanonical || `https://svastusolution.com${req.path}`;
        metaRobots = blogData.metaRobots || metaRobots;
        metaOgImage = blogData.coverImage || metaOgImage;
      } else {
        metaRobots = 'noindex, nofollow';
      }
    } else if (parts.length === 1) {
      const slug = parts[0];
      // Check Blog first (since blogs are often directly at /:slug)
      const blogData = await Blog.findOne({ slug });
      if (blogData) {
        metaTitle = blogData.metaTitle || blogData.title;
        metaDescription = blogData.metaDescription || blogData.excerpt || '';
        metaKeywords = blogData.metaKeywords || '';
        metaCanonical = blogData.metaCanonical || `https://svastusolution.com/${slug}`;
        metaRobots = blogData.metaRobots || metaRobots;
        metaOgImage = blogData.coverImage || metaOgImage;

        // Pre-render blog content inside #root for search engine bots
        const preRenderedBlog = `
          <div id="seo-prerender" style="display:block;">
            <article style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
              <h1>${blogData.title || ''}</h1>
              ${blogData.excerpt ? `<p style="font-size: 1.1em; color: #555;">${blogData.excerpt}</p>` : ''}
              ${blogData.coverImage ? `<img src="${blogData.coverImage}" alt="${blogData.title || 'Blog'}" style="max-width: 100%; height: auto;" />` : ''}
              <div class="blog-content">
                ${blogData.content || ''}
              </div>
            </article>
          </div>
        `;
        htmlData = htmlData.replace('<div id="root"></div>', `<div id="root">${preRenderedBlog}</div>`);
      } else {
        // Check City Pages or Single Service Pages
        const pageData = await Page.findOne({ slug });
        if (pageData) {
          const formattedCity = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
          metaTitle = pageData.metaTitle || `Best Vastu Consultant & Astrologer in ${formattedCity} | S-Vastu`;
          metaDescription = pageData.metaDescription || `Looking for expert Vastu and Astrology services in ${formattedCity}? S-Vastu offers personalized consultations for home, business, and numerology.`;
          metaKeywords = pageData.metaKeywords || `vastu consultant ${formattedCity}, best astrologer ${formattedCity}, numerology ${formattedCity}`;
          metaCanonical = pageData.metaCanonical || `https://svastusolution.com/${slug}`;
          metaRobots = pageData.metaRobots || metaRobots;

          // Pre-render city description / custom content
          const preRenderedCity = `
            <div id="seo-prerender" style="display:block;">
              <header style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                <h1>Vastu Consultant in ${formattedCity}</h1>
                <p>${pageData.customText || metaDescription}</p>
              </header>
            </div>
          `;
          htmlData = htmlData.replace('<div id="root"></div>', `<div id="root">${preRenderedCity}</div>`);
        } else {
          // Known special single routes
          const staticRoutes = ['about-us', 'services', 'gallery', 'blog', 'contact-us', 'locations', 'privacy-policy', 'terms-of-service', 'admin'];
          if (!staticRoutes.includes(slug)) {
            metaRobots = 'noindex, nofollow';
            res.status(404);
          }
        }
      }
    }

    // Inject data into HTML
    htmlData = htmlData.replace(/<title data-rh="true">.*?<\/title>/g, `<title data-rh="true">${metaTitle}</title>`);
    htmlData = htmlData.replace(/<meta data-rh="true" name="description" content=".*?" \/>/g, `<meta data-rh="true" name="description" content="${metaDescription}" />`);
    htmlData = htmlData.replace(/<meta data-rh="true" name="keywords" content=".*?" \/>/g, `<meta data-rh="true" name="keywords" content="${metaKeywords}" />`);
    htmlData = htmlData.replace(/<link data-rh="true" rel="canonical" href=".*?" \/>/g, `<link data-rh="true" rel="canonical" href="${metaCanonical}" />`);
    htmlData = htmlData.replace(/<meta data-rh="true" name="robots" content=".*?" \/>/g, `<meta data-rh="true" name="robots" content="${metaRobots}" />`);
    htmlData = htmlData.replace(/<meta data-rh="true" property="og:title" content=".*?" \/>/g, `<meta data-rh="true" property="og:title" content="${metaTitle}" />`);
    htmlData = htmlData.replace(/<meta data-rh="true" property="og:description" content=".*?" \/>/g, `<meta data-rh="true" property="og:description" content="${metaDescription}" />`);
    
    if (metaOgImage) {
      htmlData = htmlData.replace(/<meta data-rh="true" property="og:image" content=".*?" \/>/g, `<meta data-rh="true" property="og:image" content="${metaOgImage}" />`);
    } else {
      htmlData = htmlData.replace(/<meta data-rh="true" property="og:image" content=".*?" \/>/g, ``);
    }
    htmlData = htmlData.replace(/<!-- S-VASTU-SCRIPTS -->/g, scriptTags || '');

    return res.send(htmlData);
  } catch (error) {
    console.error('Error injecting SEO:', error);
    next(error);
  }
};

module.exports = injectSEO;

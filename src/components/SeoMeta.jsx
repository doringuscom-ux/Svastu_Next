'use client';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { SEO_API } from '../utils/api';

export default function SeoMeta({ pageName }) {
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const { data } = await axios.get(`${SEO_API}/${pageName}`);
        setSeoData(data);
      } catch (error) {
        console.error('Error fetching SEO data for', pageName);
      }
    };
    fetchSeo();
  }, [pageName]);

  if (!seoData) return null;

  return (
    <Helmet>
      {seoData.title && <title>{seoData.title}</title>}
      {seoData.description && <meta name="description" content={seoData.description} />}
      {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
      
      {seoData.title && <meta property="og:title" content={seoData.title} />}
      {seoData.description && <meta property="og:description" content={seoData.description} />}
      {seoData.ogImage && <meta property="og:image" content={seoData.ogImage} />}

      {seoData.canonical ? (
        <link rel="canonical" href={seoData.canonical} />
      ) : (
        <link rel="canonical" href={typeof window !== 'undefined' ? `https://svastusolution.com${window.location.pathname}` : ''} />
      )}
      {seoData.robots && <meta name="robots" content={seoData.robots} />}

      {/* Render custom scripts if any are provided */}
      {seoData.scriptTags && (
        <script type="text/javascript">
          {seoData.scriptTags}
        </script>
      )}
    </Helmet>
  );
}


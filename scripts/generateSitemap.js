/**
 * Sitemap Generator Script
 * 
 * This script generates a sitemap.xml file that includes all pages and blog posts.
 * To update the sitemap, run: node scripts/generateSitemap.js
 */

const fs = require('fs');
const path = require('path');

// Import the blog posts data
const { blogPosts } = require('../client/src/data/blogPosts');

// Base URL for the website
const BASE_URL = 'https://hardyswashnwax.com';

// Main pages of the website
const MAIN_PAGES = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/services', changefreq: 'weekly', priority: 0.9 },
  { url: '/subscriptions', changefreq: 'monthly', priority: 0.8 },
  { url: '/booking', changefreq: 'monthly', priority: 0.9 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
];

// Service pages
const SERVICE_PAGES = [
  '/services/interior-detailing',
  '/services/exterior-detailing',
  '/services/ceramic-coating',
  '/services/paint-correction',
  '/services/interior-car-detailing',
  '/services/full-service-car-wash',
  '/services/car-wash-and-wax',
];

// Location pages
const LOCATION_PAGES = [
  '/davis-car-detailing',
  '/sacramento-car-detailing',
  '/elk-grove-car-detailing',
  '/roseville-car-detailing',
  '/folsom-car-detailing',
  '/west-sacramento-car-detailing',
  '/woodland-car-detailing',
];

// Generate sitemap XML
function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add main pages
  sitemap += '  <!-- Main Pages -->\n';
  MAIN_PAGES.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += `  </url>\n`;
  });
  
  // Add blog posts
  sitemap += '  \n  <!-- Blog Posts -->\n';
  if (blogPosts && blogPosts.length > 0) {
    blogPosts.forEach(post => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${BASE_URL}/blog/${post.slug}</loc>\n`;
      if (post.date) {
        sitemap += `    <lastmod>${post.date}</lastmod>\n`;
      }
      sitemap += `    <changefreq>monthly</changefreq>\n`;
      sitemap += `    <priority>0.7</priority>\n`;
      sitemap += `  </url>\n`;
    });
  }
  
  // Add service pages
  sitemap += '  \n  <!-- Service Pages -->\n';
  SERVICE_PAGES.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}${page}</loc>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.8</priority>\n`;
    sitemap += `  </url>\n`;
  });
  
  // Add location pages
  sitemap += '  \n  <!-- Location Pages -->\n';
  LOCATION_PAGES.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}${page}</loc>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.8</priority>\n`;
    sitemap += `  </url>\n`;
  });
  
  sitemap += '</urlset>';
  
  // Write the sitemap to the public directory
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

// Run the generator
generateSitemap();
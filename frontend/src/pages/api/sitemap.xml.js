/* eslint-disable import/no-anonymous-default-export */
export default (_req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
  
    <url>
      <loc>https://viptaximechelen.be/</loc>
      <lastmod>2023-10-06T11:38:41+00:00</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://viptaximechelen.be/Contact</loc>
      <lastmod>2023-10-06T11:38:41+00:00</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://viptaximechelen.be/AboutUs</loc>
      <lastmod>2023-10-06T11:38:41+00:00</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://viptaximechelen.be/Services/Services</loc>
      <lastmod>2023-10-06T11:38:41+00:00</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://viptaximechelen.be/Booking</loc>
      <lastmod>2023-10-06T11:38:41+00:00</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://viptaximechelen.be/Region</loc>
      <lastmod>2023-10-06T11:38:41+00:00</lastmod>
      <priority>0.80</priority>
    </url>
  
    </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();
};

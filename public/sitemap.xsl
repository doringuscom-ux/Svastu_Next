<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            margin: 0;
            padding: 40px;
            background-color: #f9fafb;
          }
          #content {
            max-width: 960px;
            margin: 0 auto;
            background: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          h1 {
            font-size: 24px;
            font-weight: 600;
            margin-top: 0;
            color: #111827;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 15px;
          }
          p {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            text-align: left;
            padding: 12px;
            font-size: 13px;
            font-weight: 600;
            color: #374151;
            background-color: #f3f4f6;
            border-bottom: 1px solid #e5e7eb;
          }
          td {
            padding: 12px;
            font-size: 14px;
            border-bottom: 1px solid #e5e7eb;
            color: #4b5563;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover {
            background-color: #f9fafb;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            text-decoration: underline;
          }
          .copy-btn {
            background-color: #e5e7eb;
            border: none;
            color: #374151;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: background-color 0.2s, color 0.2s;
          }
          .copy-btn:hover {
            background-color: #d1d5db;
          }
          .copy-btn.copied {
            background-color: #10b981;
            color: #fff;
          }
        </style>
        <script type="text/javascript">
          function copyToClipboard(elementId, btn) {
            var tempInput = document.createElement("input");
            tempInput.value = document.getElementById(elementId).innerText;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            
            var originalText = btn.innerText;
            btn.innerText = "Copied!";
            btn.classList.add("copied");
            setTimeout(function() {
              btn.innerText = originalText;
              btn.classList.remove("copied");
            }, 2000);
          }
        </script>
      </head>
      <body>
        <div id="content">
          <h1>Website Sitemap</h1>
          <p>
            This is an XML Sitemap generated for search engines and users. It contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
            You can easily copy the links below.
          </p>
          <table>
            <thead>
              <tr>
                <th style="width: 60%">URL</th>
                <th style="width: 20%">Last Modified</th>
                <th style="width: 20%">Action</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}" target="_blank" rel="noopener noreferrer">
                      <span id="url-{position()}"><xsl:value-of select="sitemap:loc"/></span>
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
                  </td>
                  <td>
                    <button class="copy-btn" onclick="copyToClipboard('url-{position()}', this)">Copy Link</button>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

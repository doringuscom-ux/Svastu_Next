const express = require('express');
const router = express.Router();

router.get('/shorts', async (req, res) => {
    try {
        // Fetching directly from the backend bypasses browser CORS issues completely
        const response = await fetch("https://www.youtube.com/@Svastusolution/shorts", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
        });
        const html = await response.text();
        
        // Extract video IDs from the raw YouTube HTML directly
        const videoIdMatches = [...html.matchAll(/"videoId":"([^"]{11})"/g)].map(m => m[1]);
        const uniqueIds = [...new Set(videoIdMatches)].slice(0, 15);
        
        if (uniqueIds.length > 0) {
            res.json({ success: true, data: uniqueIds });
        } else {
            res.status(404).json({ success: false, message: "No shorts found" });
        }
    } catch (error) {
        console.error("YouTube Fetch Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch from YouTube" });
    }
});

module.exports = router;

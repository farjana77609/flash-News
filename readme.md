# 📰 Flash News App

A modern, responsive news aggregation application that delivers breaking news from multiple categories in real-time. Built with vanilla JavaScript, Bootstrap 5, and the NewsData.io API.

## 🌟 Features

- **Multi-Category News**: Browse news from different categories:
  - 📚 Education
  - 🚔 Crime
  - 🏏 IPL (Sports)
  - 💰 Finance
  - 🏛️ Politics
  - 🎭 Entertainment

- **Search Functionality**: Search for news articles by keywords
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-Time Updates**: Fetch latest news from NewsData.io API
- **Interactive UI**: Card-based layout with smooth animations
- **Error Handling**: Graceful error messages
- **Performance Optimized**: Lazy loading with image fallbacks
- **Cross-Browser Compatible**: Works on all modern browsers
- **Zero Dependencies**: Pure vanilla JavaScript

## 📋 Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Structure |
| CSS3 | Styling & Animations |
| JavaScript (ES6+) | Interactivity |
| Bootstrap 5.3.3 | Responsive Framework |
| NewsData.io API | News Data Source |
| Netlify | Deployment & Hosting |

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- NewsData.io API key from [newsdata.io](https://newsdata.io/)

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/farjana77609/flash-News.git
   cd flash-News
   ```

2. **Configure API Key**
   Create `config.js` in the root directory:
   ```javascript
   const API_KEY = "your_api_key_here";
   ```

3. **Run Locally**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```
   Open `http://localhost:8000` in your browser

## 📁 Project Structure

```
flash-News/
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
├── style.css           # Custom styling
├── config.js           # API configuration
├── netlify.toml        # Netlify config
├── assets/             # Images & icons
│   ├── news-logo.svg
│   ├── hamburger.svg
│   ├── arrow-up.png
│   └── placeholder.avif
└── readme.md           # This file
```

## 🔧 How It Works

### Main Functions

**`fetchNews(query)`** - Fetches news articles
```javascript
fetchNews("education");  // Fetch category
fetchNews("AI");         // Search news
```

**`bindData(articles)`** - Renders articles as cards

**`fillDataInCard(cardClone, article)`** - Populates card data

**`onNavItemClick(id)`** - Handles category selection

**`reload()`** - Resets to default news

### Category Parameters
- `education`
- `crime`
- `entertainment`
- `finance`
- `politics`
- `ipl`

## 🎨 Design

- **Color Scheme**:
  - Primary: `#183b56`
  - Secondary: `#577592`
  - Accent: `#2294ed`
  - Accent Dark: `#1d69a3`

- **Responsive Breakpoints**:
  - Desktop: ≥1400px (Full nav)
  - Tablet: 768px - 1399px (Condensed)
  - Mobile: <768px (Hamburger menu)

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Supported |
| Firefox | 88+ | ✅ Supported |
| Safari | 14+ | ✅ Supported |
| Edge | 90+ | ✅ Supported |

## 📝 API Integration

The app uses NewsData.io API with the following endpoints:

**Local Development**: `https://newsdata.io/api/1/latest`  
**Production**: `/.netlify/functions/news` (serverless)

### Request Parameters
- `apikey`: Your API key
- `category`: News category (optional)
- `q`: Search query (optional)

### Response Format
```json
{
  "status": "success",
  "results": [
    {
      "title": "Article Title",
      "description": "Article description",
      "image_url": "https://example.com/image.jpg",
      "link": "https://example.com/article",
      "pubDate": "2026-06-08T10:00:00Z",
      "source_name": "Source"
    }
  ]
}
```

## 🔒 Security

- API key should be stored securely
- Production uses Netlify functions to protect API credentials
- Input validation on search queries
- CORS handled via Netlify routing

## ⚡ Performance

- Bootstrap & fonts served via CDN
- Image lazy loading with fallbacks
- Smooth animations using CSS transitions
- Minimal JavaScript bundle
- No external dependencies (vanilla JS)

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| News not loading | Verify API key, check internet |
| 403 Error | API quota exceeded or invalid key |
| Images missing | Clear cache, check network |
| Mobile layout broken | Clear browser cache |
| Slow load time | Check internet speed |

## 🎯 Usage Guide

1. **Browse News**: Click category in navigation
2. **Search**: Enter keyword and click "Search"
3. **Read Article**: Click any news card
4. **Back to Top**: Click the ↑ button

## 🚀 Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect repo to Netlify
3. Set environment variable: `API_KEY`
4. Deploy automatically on push

### Live URL
Visit [flash-news-app.netlify.app](https://flash-news-app.netlify.app/)

## 📚 Resources

- [NewsData.io API Docs](https://newsdata.io/docs/)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [GitHub Repository](https://github.com/farjana77609/flash-News)

## 🤝 Contributing

Contributions welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project however you like.

## 👨‍💻 Author

**Farjana**  
GitHub: [@farjana77609](https://github.com/farjana77609)

## 📞 Support

Need help? 
- Open a GitHub issue
- Check API documentation
- Review browser console for errors

---

**Version**: 1.0.0  
**Last Updated**: June 2026  
**Status**: Active Development

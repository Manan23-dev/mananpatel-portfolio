# Manan Patel Portfolio

Modern portfolio website showcasing software engineering expertise in distributed systems, AI/ML, and scalable architectures.

## Live Demo

[View Portfolio](https://manan23-dev.github.io/mananpatel-portfolio)

## Features

- **Responsive Design** - Optimized for all devices
- **Dark Theme** - Modern interface with dynamic animations
- **Interactive Background** - Animated elements and particle effects
- **Smooth Scrolling** - Seamless navigation experience
- **Contact Integration** - Direct email functionality
- **Performance Optimized** - Fast loading and efficient animations

## Tech Stack

- HTML5 with semantic markup
- CSS3 with custom properties and animations
- Vanilla JavaScript for interactivity
- Font Awesome icons
- Google Fonts (Inter & JetBrains Mono)

## Project Structure

```
mananpatel-portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── animations.css
│   ├── js/
│   │   ├── main.js
│   │   └── animations.js
│   └── images/
│       └── manan-profile.jpg
├── README.md
└── .gitignore
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Manan23-dev/mananpatel-portfolio.git
cd mananpatel-portfolio
```

2. Open index.html in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx live-server
```

## Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (main)
4. Site will be available at username.github.io/repository-name

### Netlify
1. Connect GitHub repository to Netlify
2. Deploy automatically on push

### Vercel
1. Import project from GitHub
2. Deploy with automatic HTTPS

## Customization

### Colors
Update CSS variables in `assets/css/styles.css`:
```css
:root {
    --main-orange: #ff9500;
    --main-purple: #8b5cf6;
    --main-blue: #3b82f6;
}
```

### Content
Edit sections in `index.html`:
- Personal information
- Skills and technologies
- Projects
- Experience
- Contact details

### Animations
Modify `assets/css/animations.css` and `assets/js/animations.js` for custom effects.

## Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## Performance

- Intersection Observer for efficient scroll animations
- Will-change properties for GPU acceleration
- Debounced scroll events
- Lazy loading support
- FPS monitoring with animation reduction

## Contact

**Manan Patel**
- Email: manan2301patel@gmail.com
- LinkedIn: [linkedin.com/in/mananpatel23](https://linkedin.com/in/mananpatel23)
- GitHub: [github.com/Manan23-dev](https://github.com/Manan23-dev)
- Phone: (510) 998-7785

## License

MIT License - see LICENSE file for details.
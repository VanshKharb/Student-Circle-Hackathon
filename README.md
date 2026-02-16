# 🌱 StudentCircle

**Share More. Waste Less.** - A sustainable campus platform for resource and ride sharing.

![StudentCircle](https://via.placeholder.com/1200x400/2f855a/ffffff?text=StudentCircle+-+Sustainable+Campus+Sharing)

---

## 🎯 About

StudentCircle connects college students to share resources and rides, promoting sustainability and reducing waste on campus. Built with pure HTML, CSS, and JavaScript - no frameworks needed.

### ✨ Features

- 📦 **Resource Sharing** - List and borrow items (books, cycles, electronics)
- 🚴 **Ride Sharing** - Split bike rides to save money and reduce carbon footprint
- 🔍 **Smart Search** - Filter by category, search by keywords
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- 🎨 **Modern UI** - Glassmorphism design with smooth animations

---

## 🚀 Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/studentcircle.git

# Navigate to folder
cd studentcircle

# Open index.html in your browser
# Or run a local server:
python3 -m http.server 8000
```

Visit `http://localhost:8000` and you're ready! 🎉

---

## 📁 Project Structure
```
StudentCircle/
├── index.html           # Homepage
├── resources.html       # Resource sharing
├── rides.html           # Ride sharing
├── css/                 # Stylesheets
│   ├── style.css
│   ├── navbar.css
│   ├── homepage.css
│   ├── resources.css
│   └── rides.css
├── js/                  # JavaScript
│   ├── main.js
│   ├── api.js          # Mock data (backend-ready)
│   ├── resources.js
│   └── rides.js
└── README.md
```

---

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling (Flexbox, Grid, Glassmorphism)
- **JavaScript** - Vanilla JS (no frameworks!)
- **Font Awesome** - Icons

---

## 🔌 Backend Integration

Currently uses mock data. To connect to your backend, update `js/api.js`:
```javascript
// Replace mock functions with real API calls
getAllResources: function() {
    return fetch('https://your-api.com/api/resources')
        .then(response => response.json());
}
```

**Expected API Endpoints:**
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Add new resource
- `GET /api/rides` - Get all rides
- `POST /api/rides` - Post new ride

---

## 🎨 Design

**Color Scheme:**
- Primary: `#2f855a` (Green)
- Accent: `#68d391` (Light Green)
- Background: `#f7fafc` (Off-white)

**Font:** Inter (Google Fonts)

---

## 📱 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400/2f855a/ffffff?text=Homepage)

### Resources Page
![Resources](https://via.placeholder.com/800x400/2f855a/ffffff?text=Resources+Page)

### Rides Page
![Rides](https://via.placeholder.com/800x400/2f855a/ffffff?text=Rides+Page)

---

## 🚧 Roadmap

- [ ] User authentication
- [ ] Real-time chat
- [ ] Image uploads
- [ ] Email notifications
- [ ] Mobile app

---

## 👥 Team

- **Frontend:** [Vansh Kharb](https://github.com/VanshKharb)
- **Backend:** [Kushpinder Singh](https://github.com/piratehunter-zoro1999)

---

## 📄 License

MIT License - feel free to use this project!

---

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

---

<p align="center">
  <strong>Built with 💚 for a sustainable future</strong><br>
  Share More. Waste Less. 🌱
</p>
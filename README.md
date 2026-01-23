# 🎵 MusicVibe

A modern full-stack music streaming platform built with React, TypeScript, and Laravel. Stream, discover, and organize your favorite music with a sleek Spotify-inspired interface.

![MusicVibe Banner](https://via.placeholder.com/1200x400/1a1a2e/9d4edd?text=MusicVibe+-+Your+Music,+Your+Vibe)

## 🚀 Live Demo
https://music-vibe-theta.vercel.app/

## ✨ Features

### 🎧 Music Streaming
- Stream unlimited free music via Jamendo API
- Real-time audio visualization with waveform analyzer
- Fullscreen player with modern UI
- Popular tracks and new releases discovery

### 👤 User Management
- Secure user registration and authentication
- JWT token-based authorization (Laravel Sanctum)
- Profile management and settings
- Password change and account deletion

### 📚 Personal Library
- Save favorite tracks to your library
- Remove tracks from library
- Check if tracks are favorited
- Organized library view

### 🔍 Music Discovery
- Search for tracks, artists, and albums
- Browse trending music
- Discover new releases
- Filter and sort options

### 🎨 Modern UI/UX
- Responsive design (mobile, tablet, desktop)
- Dark theme with gradient accents
- Smooth animations and transitions
- Intuitive navigation

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **Build Tool:** Vite (Rolldown)
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Backend
- **Framework:** Laravel 12
- **Language:** PHP 8.2
- **Authentication:** Laravel Sanctum
- **Database:** MySQL/PostgreSQL/SQLite
- **API:** RESTful API
- **Testing:** Pest PHP

### External APIs
- **Music Data:** Jamendo API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PHP** (8.2 or higher)
- **Composer**
- **MySQL/PostgreSQL** or **SQLite**

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/MusicVibe.git
cd MusicVibe
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env file
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=musicvibe
# DB_USERNAME=root
# DB_PASSWORD=

# Run migrations
php artisan migrate

# Start Laravel development server
php artisan serve
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env
echo "VITE_JAMENDO_CLIENT_ID=your_jamendo_client_id" >> .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Get Jamendo API Key

1. Go to [Jamendo Developer Portal](https://devportal.jamendo.com/)
2. Create a free account
3. Generate your API client ID
4. Add it to `frontend/.env` as `VITE_JAMENDO_CLIENT_ID`

## 📁 Project Structure

```
MusicVibe/
├── backend/                    # Laravel backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/   # API Controllers
│   │   └── Models/            # Eloquent Models
│   ├── database/
│   │   └── migrations/        # Database migrations
│   ├── routes/
│   │   └── api.php           # API routes
│   └── ...
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── config/          # API configuration
│   │   ├── functions/       # Utility functions
│   │   ├── interface/       # TypeScript interfaces
│   │   └── App.tsx          # Main app component
│   └── ...
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
```http
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
```

### User (Protected)
```http
GET    /api/user             # Get current user info
PUT    /api/user/password    # Update password
DELETE /api/user             # Delete account
```

### Library (Protected)
```http
GET    /api/library                      # Get user's library
POST   /api/library                      # Add track to library
DELETE /api/library/{jamendoId}          # Remove track from library
GET    /api/library/check/{jamendoId}    # Check if track is in library
GET    /api/library/track/{jamendoId}    # Get specific track
```

## 🎯 Usage

### Register/Login
1. Navigate to the homepage
2. Click "Get Started" or "Sign Up"
3. Fill in your details (name, email, password, etc.)
4. Login with your credentials

### Browse Music
1. After login, you'll land on the Dashboard
2. Browse "Popular Right Now" and "New Releases" sections
3. Click on any track to play it in fullscreen mode

### Search Music
1. Click on "Search" in the navigation
2. Enter artist, track, or album name
3. Browse results and play tracks

### Manage Library
1. Click the heart icon on any track to add to library
2. Go to "Library" page to see all saved tracks
3. Click heart again to remove from library

### Update Settings
1. Navigate to "Settings" page
2. Update your password or delete your account

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/Render)
```bash
cd backend
# Set environment variables in Railway/Render dashboard
# Deploy using Git integration
```

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_JAMENDO_CLIENT_ID=your_jamendo_client_id
```

**Backend (.env)**
```env
APP_URL=https://your-backend-url.com
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
SANCTUM_STATEFUL_DOMAINS=your-frontend-url.com
SESSION_DOMAIN=.your-domain.com
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Dušan** - [GitHub](https://github.com/your-username)

## 🙏 Acknowledgments

- [Jamendo](https://www.jamendo.com/) for providing free music API
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Laravel](https://laravel.com/) for backend framework
- [React](https://react.dev/) for frontend framework

---

Made with ❤️ and ☕ by Dušan

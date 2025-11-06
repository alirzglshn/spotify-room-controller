🎵 Music Rooms Controller

A real-time music room application built with Django REST Framework that integrates directly with the Spotify API. This project allows users to create music rooms, join existing rooms, and control music playback, all synced with their Spotify account.

Note: The frontend of this project is already implemented using Webpack (no API documentation needed here). You just need to connect your Spotify account to get started.

🚀 Features

Create & Join Rooms: Host your own music room or join someone else’s.

Spotify Integration: Play music directly in your Spotify account.

Control Playback: Play, pause, and manage the currently playing song.

Room Management: Hosts can allow guests to pause, skip songs, and vote on skipping.

Real-time Updates: See what’s currently playing in the room.

📦 Project Structure
backend/                # Django project root
│
├── core/               # Main app for room management
│   ├── models.py       # Room model
│   ├── serializers.py  # Serializers for Room CRUD operations
│   ├── views.py        # Room views (create, join, leave, update, get)
│   └── urls.py         # Core app URLs
│
├── spotify/            # Spotify integration app
│   ├── models.py       # SpotifyToken model
│   ├── util.py         # Helper functions for Spotify API
│   ├── views.py        # Spotify authentication and playback views
│   ├── credentials.py  # Spotify CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
│   └── urls.py         # Spotify app URLs
│
├── frontend/           # Frontend app (Webpack)
│   └── urls.py
│
├── backend/            # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── db.sqlite3          # SQLite database

⚡ How It Works

Create a Room

The creator becomes the host.

Host can configure room settings like allowing guests to pause or votes required to skip songs.

Join a Room

Use a unique room code to join an existing room.

Connect to Spotify

Log in to your Spotify account.

Music played in the room is synced with Spotify, meaning the songs are actually playing in your Spotify account.

Control Music

Hosts and allowed guests can play, pause, and skip tracks.

Real-time updates ensure everyone in the room sees the same song.

🔧 Technology Stack

Backend: Django 4.2, Django REST Framework

Frontend: Webpack

Database: SQLite

Authentication: Spotify OAuth2 API

APIs: Spotify Web API for playback control

🛠 Setup

Clone the repository

git clone https://github.com/alirzglshn/spotify-room-controller.git
cd spotify-room-controller


Create a virtual environment & install dependencies

python -m venv venv
source venv/bin/activate   # Linux / macOS
venv\Scripts\activate      # Windows
pip install -r requirements.txt


Configure Spotify credentials

Add your CLIENT_ID, CLIENT_SECRET, and REDIRECT_URI in spotify/credentials.py.

Run migrations

python manage.py migrate


Run the development server

python manage.py runserver


Access the frontend

The frontend is handled via the frontend app and Webpack. Open your browser at http://127.0.0.1:8000 to start using the app.

🎯 Endpoints Overview (Backend)

While you don’t need API docs for the frontend, here’s a quick reference:

Core App (/core/)

GET /room - List all rooms

POST /create-room - Create a new room

GET /get-room?code=<room_code> - Get a specific room

POST /join-room - Join a room

POST /leave-room - Leave a room

PATCH /update-room - Update room settings

GET /user-in-room - Check which room the user is in

Spotify App (/spotify/)

GET /get-auth-url - Get Spotify OAuth URL

GET /redirect - Spotify OAuth callback

GET /is-authenticated - Check Spotify authentication

GET /current-song - Get currently playing song

PUT /play - Play current song

PUT /pause - Pause current song

⚠ Notes

This project requires Spotify Premium to control playback.

The frontend is prebuilt and fully functional with the backend.

Sessions are used to track users and hosts for room functionality.



THANKS FOR VIEWING THIS REPOSITORY

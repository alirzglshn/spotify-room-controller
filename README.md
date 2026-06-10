# Music Rooms Controller

A Django REST Framework application that integrates with the Spotify API to let users create and join music rooms, control playback, and stay in sync with what others in the room are listening to.

The frontend is already implemented using Webpack — no additional setup needed on that end. You just need a Spotify account to get started.

---

## Features

- Create and join rooms using a unique room code
- Sync music playback directly through your Spotify account
- Hosts can play, pause, and skip tracks
- Guests can be granted permission to pause or vote on skipping
- Real-time view of the currently playing song

---

## Project Structure

```
backend/
├── core/                   # Room management
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── spotify/                # Spotify integration
│   ├── models.py
│   ├── util.py
│   ├── views.py
│   ├── credentials.py
│   └── urls.py
├── frontend/               # Webpack frontend
│   └── urls.py
├── backend/                # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── db.sqlite3
```

---

## How It Works

**Creating a room** — The user who creates the room becomes the host. Hosts can configure whether guests are allowed to pause playback and how many votes are needed to skip a song.

**Joining a room** — Any user can join an existing room using its unique code.

**Spotify connection** — Each user authenticates with their own Spotify account. Whatever plays in the room plays in your Spotify client.

**Playback control** — The host (and any guests with permission) can play, pause, and skip tracks. The currently playing song updates for everyone in the room.

---

## Tech Stack

- **Backend:** Django 4.2, Django REST Framework
- **Frontend:** Webpack
- **Database:** SQLite
- **Auth:** Spotify OAuth2
- **Music:** Spotify Web API

---

## Setup

**1. Clone the repository**

```bash
git clone https://github.com/alirzglshn/spotify-room-controller.git
cd spotify-room-controller
```

**2. Create a virtual environment and install dependencies**

```bash
python -m venv venv
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows
pip install -r requirements.txt
```

**3. Add your Spotify credentials**

Open `spotify/credentials.py` and fill in your `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI`.

**4. Run migrations**

```bash
python manage.py migrate
```

**5. Start the development server**

```bash
python manage.py runserver
```

Open `http://127.0.0.1:8000` in your browser.

---

## API Reference

### Core (`/core/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/room` | List all rooms |
| POST | `/create-room` | Create a new room |
| GET | `/get-room?code=<room_code>` | Get a specific room |
| POST | `/join-room` | Join a room |
| POST | `/leave-room` | Leave a room |
| PATCH | `/update-room` | Update room settings |
| GET | `/user-in-room` | Check which room the user is in |

### Spotify (`/spotify/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/get-auth-url` | Get the Spotify OAuth URL |
| GET | `/redirect` | Spotify OAuth callback |
| GET | `/is-authenticated` | Check authentication status |
| GET | `/current-song` | Get the currently playing song |
| PUT | `/play` | Resume playback |
| PUT | `/pause` | Pause playback |

---

## Notes

- Spotify Premium is required for playback control.
- Sessions are used to track users and identify room hosts.
- The frontend is prebuilt and works with the backend out of the box.

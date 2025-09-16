Sufra

Modern halal food discovery. Proof based. Item level. Community verified.

What is Sufra

Sufra is a halal food discovery platform built for trust. Think Zabihah + Waze. Each halal claim connects to real evidence and live community confirmations so Muslims can eat with confidence.

Core value

Proofs: certificate photos, fryer checks, receipts, short videos

Item level: verify menu items at a specific location

Live consensus: quick alerts others confirm or deny

Transparent Trust Score: recency of proofs + agreement from verified users

Who it serves

Everyday Muslims who want clear halal info fast

Power users who verify and moderate (Halal Scouts)

Restaurant owners who want a visible trust badge

Product scope
Key screens

Home / Feed

Search bar: “Find verified halal food near you…”

Card list: photo, name, cuisine, Trust Score badge (green, yellow, red)

Tag pills: Halal Cert, Separate Fryer, Pending

Buttons: View, Verify

Recent Verifications strip like Waze alerts

Map + Results

Pins: green verified, yellow mixed, red disputed

Click pin opens mini card with Trust Score and proof preview

Toggle list view or map view

Supports query param ?q=

Restaurant Detail

Hero image, name, cuisine, city

Trust Score with explanation

Item verification list (verified, pending, disputed)

Proof gallery grid

Community notes

Large Upload Proof call to action

Verification Flow

Upload image or video

Choose proof type: certificate, fryer, receipt, other

Optional notes

Submit creates a pending proof that affects score when confirmed

Alerts (Waze style)

Quick actions: verified here, fryer mixed, closed

Others confirm or deny with one tap

Alerts decay over time

Profile

Avatar, bio, city

Badges and points

History of proofs and confirmations

Settings

MVP plan

Two week target

P0

Pages: Home, Map, Restaurant Detail, Verify, Profile

Mock data first, then simple API routes

Search and list filtering

Upload flow that stores proof records

Trust Score function that updates deterministically

P1

Auth

Roles for Halal Scout and basic moderation

Owner claim flow

Acceptance checks

Search “wings” shows a verified place with a high score

Restaurant detail shows item statuses and proof gallery

Uploading a proof appears immediately and affects score

Dropping an alert shows up and others can confirm or deny

Reloading uses API data, not only client memory

Tech stack

React 18

Next.js 15, Pages Router

Tailwind CSS

PostCSS

ESLint

Node 18 or 20

Later

API routes under src/pages/api

Postgres or Supabase for data

S3 or Supabase Storage for media

Mapbox or Google Maps for map layer

Directory layout
src/
  pages/
    index.js              # Home / Feed
    map.js                # Map + results list
    restaurant/[id].js    # Restaurant detail
    verify.js             # Upload proof
    profile.js
    api/                  # Next API routes (mock first)
  components/
    Navbar.jsx
    SearchBar.jsx
    FeedCard.jsx
    TrustScoreBadge.jsx
    TagPill.jsx
    ProofUploader.jsx
    AlertStrip.jsx
    MapView.jsx
  lib/
    mockData.js
    score.js              # Trust Score calculation
  styles/
    globals.css
public/
  assets/                 # demo images

Data model draft
User {
  id, name, email, role: "user" | "scout" | "admin",
  points, city, createdAt
}

Restaurant {
  id, name, cuisine, city, lat, lng, heroUrl, createdAt
}

MenuItem {
  id, restaurantId, name
}

Proof {
  id, restaurantId, menuItemId? null if general,
  userId,
  type: "certificate" | "fryer" | "receipt" | "video" | "other",
  url, notes, status: "pending" | "approved" | "rejected",
  createdAt
}

VerificationVote {
  id, proofId, voterId, value: +1 | -1, createdAt
}

Alert {
  id, restaurantId, userId,
  kind: "verified" | "mixed" | "closed",
  expiresAt, createdAt
}

TrustScoreSnapshot {
  id, restaurantId, score, componentsJson, createdAt
}


Trust Score rule v0

Each approved proof is +20 up to 100

Proofs older than 6 months count at 50 percent

Net negative votes set that proof weight to 0

Active mixed alert caps score at 70

Active closed alert sets score to 0 until cleared

The constants can change later. Keep the score explainable.

API routes sketch
GET  /api/restaurants?q=
GET  /api/restaurants/:id
GET  /api/restaurants/:id/menu
GET  /api/restaurants/:id/proofs
POST /api/proofs                 { restaurantId, menuItemId?, type, url, notes }
POST /api/proofs/:id/vote        { value: 1 | -1 }
POST /api/alerts                 { restaurantId, kind }
GET  /api/search?q=

UI style

Modern, clean, readable

High contrast, lots of whitespace

Status uses color clearly: green verified, yellow pending or mixed, red disputed

Cards with soft shadows, rounded corners

Mobile first, responsive to desktop

Suggested palette: deep ink green, soft neutrals, and a single accent (coral or a purple-blue gradient). Do not overload color.

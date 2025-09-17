# 🍽️ Sufra

> **Modern halal food discovery. Proof based. Item level. Community verified.**

---

## 📖 What is Sufra?

Sufra is a halal food discovery platform built for trust. Think **Zabihah + Waze**. Each halal claim connects to real evidence and live community confirmations so Muslims can eat with confidence.

---

## 🎯 Core Values

- **📸 Proofs**: Certificate photos, fryer checks, receipts, short videos
- **🍴 Item Level**: Verify menu items at a specific location  
- **⚡ Live Consensus**: Quick alerts others confirm or deny
- **📊 Transparent Trust Score**: Recency of proofs + agreement from verified users

---

## 👥 Who It Serves

- **🕌 Everyday Muslims** who want clear halal info fast
- **🔍 Power Users** who verify and moderate (Halal Scouts)
- **🏪 Restaurant Owners** who want a visible trust badge

---

## 📱 Product Scope

### 🏠 Home / Feed
- **Search bar**: "Find verified halal food near you…"
- **Card list**: Photo, name, cuisine, Trust Score badge (🟢 green, 🟡 yellow, 🔴 red)
- **Tag pills**: Halal Cert, Separate Fryer, Pending
- **Buttons**: View, Verify
- **Recent Verifications** strip like Waze alerts

### 🗺️ Map + Results
- **Pins**: 🟢 verified, 🟡 mixed, 🔴 disputed
- **Click pin** opens mini card with Trust Score and proof preview
- **Toggle** list view or map view
- **Supports** query param `?q=`

### 🏪 Restaurant Detail
- **Hero image**, name, cuisine, city
- **Trust Score** with explanation
- **Item verification** list (verified, pending, disputed)
- **Proof gallery** grid
- **Community notes**
- **Large Upload Proof** call to action

### ✅ Verification Flow
- **Upload** image or video
- **Choose proof type**: certificate, fryer, receipt, other
- **Optional notes**
- **Submit** creates a pending proof that affects score when confirmed

### 🚨 Alerts (Waze style)
- **Quick actions**: verified here, fryer mixed, closed
- **Others confirm** or deny with one tap
- **Alerts decay** over time

### 👤 Profile
- **Avatar**, bio, city
- **Badges and points**
- **History** of proofs and confirmations
- **Settings**

---

## 🚀 MVP Plan

### ⏰ Two Week Target

#### 🔴 P0 (Priority 0)
- **Pages**: Home, Map, Restaurant Detail, Verify, Profile
- **Mock data** first, then simple API routes
- **Search and list** filtering
- **Upload flow** that stores proof records
- **Trust Score function** that updates deterministically

#### 🟡 P1 (Priority 1)
- **Auth**
- **Roles** for Halal Scout and basic moderation
- **Owner claim** flow
- **Acceptance checks**

#### ✅ Acceptance Criteria
- Search "wings" shows a verified place with a high score
- Restaurant detail shows item statuses and proof gallery
- Uploading a proof appears immediately and affects score
- Dropping an alert shows up and others can confirm or deny
- Reloading uses API data, not only client memory

---

## 🛠️ Tech Stack

### Current
- **React 18**
- **Next.js 15** (Pages Router)
- **Tailwind CSS**
- **PostCSS**
- **ESLint**
- **Node 18** or 20

### Later
- **API routes** under `src/pages/api`
- **Postgres** or Supabase for data
- **S3** or Supabase Storage for media
- **Mapbox** or Google Maps for map layer

---

## 📁 Directory Layout

```
src/
├── pages/
│   ├── index.js              # Home / Feed
│   ├── map.js                # Map + results list
│   ├── restaurant/[id].js    # Restaurant detail
│   ├── verify.js             # Upload proof
│   ├── profile.js
│   └── api/                  # Next API routes (mock first)
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── FeedCard.jsx
│   ├── TrustScoreBadge.jsx
│   ├── TagPill.jsx
│   ├── ProofUploader.jsx
│   ├── AlertStrip.jsx
│   └── MapView.jsx
├── lib/
│   ├── mockData.js
│   └── score.js              # Trust Score calculation
└── styles/
    └── globals.css

public/
└── assets/                   # demo images
```

---

## 🗄️ Data Model

### User
```typescript
{
  id: string
  name: string
  email: string
  role: "user" | "scout" | "admin"
  points: number
  city: string
  createdAt: Date
}
```

### Restaurant
```typescript
{
  id: string
  name: string
  cuisine: string
  city: string
  lat: number
  lng: number
  heroUrl: string
  createdAt: Date
}
```

### MenuItem
```typescript
{
  id: string
  restaurantId: string
  name: string
}
```

### Proof
```typescript
{
  id: string
  restaurantId: string
  menuItemId?: string | null  // null if general
  userId: string
  type: "certificate" | "fryer" | "receipt" | "video" | "other"
  url: string
  notes: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
}
```

### VerificationVote
```typescript
{
  id: string
  proofId: string
  voterId: string
  value: +1 | -1
  createdAt: Date
}
```

### Alert
```typescript
{
  id: string
  restaurantId: string
  userId: string
  kind: "verified" | "mixed" | "closed"
  expiresAt: Date
  createdAt: Date
}
```

### TrustScoreSnapshot
```typescript
{
  id: string
  restaurantId: string
  score: number
  componentsJson: object
  createdAt: Date
}
```

---

## 📊 Trust Score Rules (v0)

- **Each approved proof** is +20 up to 100
- **Proofs older than 6 months** count at 50%
- **Net negative votes** set that proof weight to 0
- **Active mixed alert** caps score at 70
- **Active closed alert** sets score to 0 until cleared

> 💡 *The constants can change later. Keep the score explainable.*

---

## 🔌 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/restaurants?q=` | Search restaurants |
| `GET` | `/api/restaurants/:id` | Get restaurant details |
| `GET` | `/api/restaurants/:id/menu` | Get restaurant menu |
| `GET` | `/api/restaurants/:id/proofs` | Get restaurant proofs |
| `POST` | `/api/proofs` | Upload new proof |
| `POST` | `/api/proofs/:id/vote` | Vote on proof |
| `POST` | `/api/alerts` | Create alert |
| `GET` | `/api/search?q=` | Global search |

---

## 🎨 UI Style Guide

- **Modern, clean, readable**
- **High contrast**, lots of whitespace
- **Status colors**: 🟢 verified, 🟡 pending/mixed, 🔴 disputed
- **Cards** with soft shadows, rounded corners
- **Mobile first**, responsive to desktop

### 🎨 Suggested Palette
- **Deep ink green**
- **Soft neutrals** 
- **Single accent** (coral or purple-blue gradient)

> ⚠️ *Do not overload color.*

---

<div align="center">

**Built with ❤️ for the Muslim community**

</div>

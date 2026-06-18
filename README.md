# ♻️ EcoRecycle - E-Waste Management & Recycling Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18.0.0-green.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.21.2-blue.svg?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.3.0-563D7C.svg?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

EcoRecycle is a responsive, full-stack web application designed to address the global e-waste crisis. It provides communities with tools to locate recycling centers, book item pickups, study electronic recycling guides, and track their recycling impact dynamically. 

Featuring a modern HSL-based styling system, system-wide Light/Dark mode toggle, secure session-based authentication, and dynamic dashboard metrics, EcoRecycle is a production-ready template designed for sustainability initiatives.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Screenshots](#-screenshots)
4. [Tech Stack](#-tech-stack)
5. [Folder Structure](#-folder-structure)
6. [Installation Guide](#-installation-guide)
7. [Environment Variables](#-environment-variables)
8. [API & Routing Table](#-api--routing-table)
9. [Deployment](#-deployment)
10. [Contribution Guidelines](#-contribution-guidelines)
11. [Future Roadmap](#-future-roadmap)
12. [License & Author](#-license--author)

---

## 📖 Project Overview

### The Problem
The global volume of electronic waste is growing five times faster than documented recycling channels. Millions of tons of discarded gadgets end up in landfills yearly, releasing toxic heavy metals (lead, mercury, cadmium) into the environment. Public awareness is limited, and scheduling local e-waste pickups remains difficult and disjointed.

### The Solution
**EcoRecycle** provides a consolidated hub that:
- **Educates Users**: Explains facts, reduction tips, and shares curated videos and articles.
- **Simplifies Logistics**: Features a built-in schedule picker for requesting e-waste pickups.
- **Visualizes Progress**: Rewards users with points and shows environmental impact stats (CO₂ saved, electronics recycled) in their account dashboard.

---

## ✨ Key Features

- 🌓 **Global Light/Dark Theme Switcher**: Toggle theme settings smoothly across the app with transition effects and localStorage persistence. Includes blocking scripts to prevent flash-on-load.
- 👤 **Secure User Authentication**: Custom registration and sign-in processes featuring bcrypt hashing, password visible toggle, and express-sessions.
- 📊 **Dynamic User Dashboard**: Renders logged-in user recycling analytics, including pickup histories and live reward points, queried directly from MongoDB.
- 🗓️ **E-Waste Pickup Scheduler**: Seamless booking page with multi-column guidelines, form validation, and pickup requests tracker.
- 📍 **Recycling Center Locator**: Features detailed directory profiles showing operational hours, contact information, and list of accepted electronics.
- 🎓 **Educational Hub**:
  - **Articles section**: Categorized articles list, reading duration indicators, and details views.
  - **Videos section**: A responsive video grid with category filtering, modal player popups, and empty state fallbacks.
  - **Facts & Tips**: Interactive lists citing environmental statistics.

---

## 📸 Screenshots

### Home Page
![Home Page Screenshot](https://raw.githubusercontent.com/Sanesh764/EcoRecycle/main/public/images/screenshots/home.png)
*Modern hero layout showcasing core recycling options, environmental impact statements, and navigation portals.*

### User Dashboard
![User Dashboard Screenshot](https://raw.githubusercontent.com/Sanesh764/EcoRecycle/main/public/images/screenshots/dashboard.png)
*Dynamic analytics displaying items recycled, CO₂ saved, and scheduled pickup request tables.*

### Educational Videos
![Videos Page Screenshot](https://raw.githubusercontent.com/Sanesh764/EcoRecycle/main/public/images/screenshots/videos.png)
*Premium video filter gallery displaying thumbnail modals and dynamic category filters.*

### Login Page
![Login Page Screenshot](https://raw.githubusercontent.com/Sanesh764/EcoRecycle/main/public/images/screenshots/login.png)
*Split-screen layout styling with gradient background panels and activity indicators.*

---

## 🛠️ Tech Stack

### Frontend & UI
- **Engine**: EJS (Embedded JavaScript Templates)
- **Framework**: Bootstrap 5 (Responsive Layouts)
- **Icons**: Font Awesome v6
- **Styling**: Vanilla CSS (HSL variables, custom scrollbars, glassmorphic navbar)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Session Manager**: Express-Session

### Database
- **Engine**: MongoDB
- **ODM**: Mongoose

---

## 📂 Folder Structure

```
-EcoRecycle/
├── config/             # DB Connection settings
│   └── db.js           # Mongoose configuration
├── controllers/        # Route controllers (Business Logic)
│   ├── authController.js       # Login, Register, Logout
│   ├── educationController.js  # Articles, Facts, Videos EJS rendering
│   ├── mainController.js       # Home and Dashboard views
│   └── recyclingController.js  # Pickup scheduling and center lookups
├── middleware/         # Security checks
│   └── auth.js         # Authentication route guard
├── models/             # Mongoose database schemas
│   ├── Pickup.js       # Request records schema
│   └── User.js         # Hashed credentials & points schema
├── public/             # Static assets
│   ├── css/            # Custom themes, dark variables & buttons
│   ├── js/             # Interactive alerts & theme togglers
│   └── images/         # Icons & site branding images
├── routes/             # Express route configuration
│   ├── education.js    # Fact pages, tips & article detail routes
│   ├── index.js        # Auth, Dashboard & Home page routes
│   └── recycling.js    # Pickup scheduler & centers routes
├── views/              # Template views
│   ├── pages/          # Individual screen content (login, dashboard, tips)
│   └── partials/       # Reusable blocks (header, footer, nav panels)
├── app.js              # Application bootstrapper
├── package.json        # Project configs & dependencies
└── README.md           # Documentation
```

---

## ⚙️ Installation Guide

Follow these instructions to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sanesh764/-EcoRecycle.git
   cd -EcoRecycle
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/e-waste-management
   SESSION_SECRET=your_eco_secret_key_here
   ```

4. **Start the database server**:
   Make sure your local MongoDB service is running:
   ```bash
   # Windows Command
   net start MongoDB
   ```

5. **Run the application**:
   - For production launch:
     ```bash
     npm start
     ```
   - For hot-reloads during development:
     ```bash
     npm run dev
     ```

6. **Browse localhost**:
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔑 Environment Variables

The application relies on the following configurations:

| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | Local network port the server listens on | `3000` |
| `MONGODB_URI` | MongoDB database connection endpoint | `mongodb://localhost:27017/e-waste-management` |
| `SESSION_SECRET` | Security key used to sign Express cookies | `your_eco_secret_key_here` |

---

## 🛣️ API & Routing Table

| HTTP Method | Route | Description | Access |
|---|---|---|---|
| **GET** | `/` | Renders the public Landing page | Public |
| **GET** | `/login` | Renders the Login page | Public |
| **POST** | `/login` | Authenticates credentials and starts user session | Public |
| **GET** | `/register` | Renders User Registration form | Public |
| **POST** | `/register` | Validates, encrypts, and registers a new User account | Public |
| **GET** | `/logout` | Destroys session and logs out user | Private |
| **GET** | `/dashboard` | User dashboard displaying stats & booked pickups | Private (Auth Guard) |
| **GET** | `/recycling` | Informative recycling guide page | Public |
| **GET** | `/recycling/centers` | Directories of e-waste collection sites | Public |
| **GET** | `/recycling/pickup` | Pickup scheduling form | Private (Auth Guard) |
| **POST** | `/recycling/pickup` | Saves the scheduled pickup record to DB | Private (Auth Guard) |
| **GET** | `/articles` | View lists of environmental educational posts | Public |
| **GET** | `/videos` | Responsive video gallery layout | Public |

---

## 🚀 Deployment

EcoRecycle can be deployed to platforms like **Render**, **Railway**, or **Heroku**:

1. **Procfile Configuration** (if required):
   Ensure your web dyno runs `npm start`.
2. **Database Clustering**:
   Swap your local `MONGODB_URI` with a cloud-managed connection string (e.g. MongoDB Atlas).
3. **Environment Settings**:
   Set `PORT` to default dynamic settings and input your private `SESSION_SECRET` on your hosting console.

---

## 🤝 Contribution Guidelines

Contributions are welcome! Please follow these steps to propose changes:

1. **Fork** the Repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Commit your changes with clear messages:
   ```bash
   git commit -m "feat: add rewards shop interface"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/awesome-feature
   ```
5. Open a **Pull Request** detailing your modifications.

---

## 🗺️ Future Roadmap

- [ ] **Real-time Map Integration**: Replace standard directory lookups with active Mapbox APIs.
- [ ] **Pickup Status Tracker**: Add interactive statuses (Scheduled, In Transit, Recycled).
- [ ] **E-Waste Rewards Shop**: Allow users to spend their points on eco-friendly coupons.
- [ ] **Admin Portal**: Create dedicated control routes for booking operators.

---

## 📄 License & Author

### License
This project is licensed under the **MIT License**. Feel free to use and distribute it.

### Author
- **Name**: Sanesh Kumar
- **Role**: Computer Science Engineering Student
- **Profile**: [@Sanesh764](https://github.com/Sanesh764)
- **Core Skills**: C++, JavaScript, Node.js, Express.js, MongoDB, DSA
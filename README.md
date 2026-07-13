<div align="center">

# 🏡 StayScape

### Discover your perfect stay

A full-stack vacation rental discovery platform for exploring, publishing, and reviewing unique stays.

[![Node.js](https://img.shields.io/badge/Node.js-22.14.0-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Passport.js](https://img.shields.io/badge/Passport.js-Authentication-34E27A?logo=passport&logoColor=white)](https://www.passportjs.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Render](https://img.shields.io/badge/Render-Deployment-46E3B7?logo=render&logoColor=white)](https://render.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white)](https://github.com/)

</div>

## ✨ Overview
StayScape is a full-stack vacation rental web application inspired by modern accommodation booking platforms. It enables users to discover unique stays, search destinations, publish listings, upload images, and share reviews through a secure and responsive interface.

## 🎯 Project Objective

StayScape was developed to provide a seamless platform for discovering and sharing vacation rentals while demonstrating full-stack web development concepts including authentication, authorization, cloud media storage, geolocation, and responsive UI design.

## 🌐 Live Demo

> **Live Website:** https://stayscape-keqb.onrender.com

## 🚀 Features

- Browse vacation rental listings in a responsive card grid.
- Search listings by title, location, or country.
- Filter stays by category, including trending, rooms, mountains, camping, farms, boats, and more.
- Toggle the display of the 18% GST amount on listing prices.
- Sign up, log in, and log out with session-based authentication.
- Create, edit, and delete listings; only the listing owner can modify or remove their listing.
- Upload listing images to Cloudinary.
- Validate listing and review input on the server with Joi, with client-side Bootstrap validation feedback.
- Geocode listing locations with Nominatim and display an interactive Leaflet/OpenStreetMap map on the listing page.
- Add 1–5 star reviews and comments to listings.
- Restrict review deletion to the review author.
- Show flash messages for successful actions and errors, plus custom 404/error handling.
- Provide Privacy and Terms pages.

## 🧰 Tech Stack

| Area | Technologies |
| --- | --- |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | Passport.js, passport-local, passport-local-mongoose |
| Views & UI | EJS, ejs-mate, Bootstrap 5, Font Awesome, custom CSS |
| Media uploads | Multer, Cloudinary, multer-storage-cloudinary |
| Maps & geocoding | Leaflet, OpenStreetMap, Nominatim, Axios |
| Sessions & notifications | express-session, connect-mongo, connect-flash |
| Deployment | Render |

## ⚙️ Installation

### Prerequisites

- Node.js 
- A MongoDB Atlas database
- A Cloudinary account

### Run locally

```bash
# Clone the repository
git clone https://github.com/adityabhakad/StayScape.git

# Enter the project directory
cd StayScape

# Install dependencies
npm install

# Create .env using the variables listed below, then start the server
npm start
```

The app runs at `http://localhost:8080`.

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
SECRET=replace-with-a-long-random-session-secret

CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

| Variable | Purpose |
| --- | --- |
| `ATLASDB_URL` | MongoDB Atlas connection string; also used by the Mongo-backed session store. |
| `SECRET` | Secret used to sign sessions and encrypt the session store payload. |
| `CLOUD_NAME` | Cloudinary cloud name. |
| `CLOUD_API_KEY` | Cloudinary API key. |
| `CLOUD_API_SECRET` | Cloudinary API secret. |

> Keep `.env` private. It is already excluded from version control by `.gitignore`.

## 🔮 Future Improvements

- Wishlist feature
- Booking functionality
- Online payment integration
- User profile page
- Multiple listing images
- Advanced filtering and sorting

## 👤 Author

## 👨‍💻 Author

**Aditya Bhakad**

GitHub:
https://github.com/adityabhakad



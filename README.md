📘 BeyondChats Article Automation Project
This project automates the process of scraping blog articles, enhancing them using AI, and displaying both original and updated versions in a modern frontend UI.
It is implemented in three phases using Laravel, Node.js, and React.js.
🔹 Project Overview

Phase 1 – Backend (Laravel)
Scrape the 5 oldest articles from the BeyondChats blog.
Store articles in a MySQL database.
Expose CRUD APIs for article management.

Phase 2 – Automation (Node.js)
Fetch the latest article from Laravel APIs.
Search the article title on the web.
Scrape two top-ranking reference articles.
Rewrite the article using an LLM.
Publish the updated article back to Laravel.
Store references at the bottom of the article.

Phase 3 – Frontend (React.js)
Display original and updated articles.
Responsive and professional UI.
Data fetched from Laravel APIs.

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Backend    | Laravel 10, MySQL          |
| Automation | Node.js                    |
| Scraping   | Playwright (browser-based) |
| AI         | OpenAI API (HTTP-based)    |
| Frontend   | React.js (Vite)            |
| Styling    | CSS / Flexbox / Grid       |

⚙️ Local Setup Instructions
1️⃣ Backend Setup (Laravel)
Prerequisites
PHP 8.1+
Composer
MySQL
XAMPP / Laravel Valet

Phase -1 Setup
Code:-Steps
   git clone https://github.com/your-username/beyondchats-api.git
   cd beyondchats-api
   composer install
   cp .env.example .env
   php artisan key:generate

Configure .env
  DB_DATABASE=beyondchats
  DB_USERNAME=root
  DB_PASSWORD=
  
Run migrations
  php artisan migrate

Scrape BeyondChats Articles
  php artisan scrape:beyondchats

Start server
  php artisan serve

Backend runs at:http://localhost:8000





Phase -2 Setup
Automation Setup (Node.js)
Prerequisites

Node.js v18+

Steps
cd article-automation
npm install

Update API URLs and OpenAI Key

Edit rewriteArticle.js and add your OpenAI API key.

Run Automation Script
node index.js

✔ Fetches latest article
✔ Searches reference articles
✔ Scrapes content
✔ Rewrites article
✔ Updates database




Phase -3 Setup
rontend Setup (React)
Steps:-
cd beyondchats-frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173




Data Flow / Architecture Diagram

┌────────────────────┐
│ BeyondChats Blog   │
│ (Public Website)   │
└─────────┬──────────┘
          │ Scraping
          ▼
┌────────────────────┐
│ Laravel Backend    │
│ MySQL Database     │
│ CRUD APIs          │
└─────────┬──────────┘
          │ Fetch Latest Article
          ▼
┌────────────────────┐
│ Node.js Automation │
│ - Web Search       │
│ - Article Scrape   │
│ - AI Rewrite       │
└─────────┬──────────┘
          │ Updated Content
          ▼
┌────────────────────┐
│ Laravel APIs       │
│ Updated Article    │
└─────────┬──────────┘
          │ API Fetch
          ▼
┌────────────────────┐
│ React Frontend     │
│ Original + Updated │
│ Articles Display  │
└────────────────────┘


   

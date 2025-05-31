# Autocomplete Search Component

An autocomplete search interface built using React (Vite) for the frontend and Flask for the backend. It allows users to search through a catalog of products with real-time suggestions, ranking, and pagination.

## Features

🔎 Search through product titles and brands \
📄 Pagination support with limit and skip \
📈 Ranking: Matches starting with the query are prioritized \
🔄 CORS-enabled backend for seamless frontend integration \
🖥️ Frontend (React + Vite)


## Setup
cd client
npm install
npm run dev

Backend (Flask)
cd backend
python app.py

## Key Components
Autocomplete.jsx: Main component with input, suggestion list, and debounce handling
Fetches results from /products/search?q=... endpoint

## Endpoint
GET /products/search
Query Parameters:

q (required): Search keyword (min. 2 characters)
limit (optional): Number of results to return (default: 10)
skip (optional): Number of results to skip (default: 0)
Example:

/products/search?q=phone&limit=5&skip=0

## Data

https://github.com/user-attachments/assets/2ce0c728-b108-4623-9a3e-0b06ec939c09


Static data is loaded from products.json on server startup.
Simple schema:
{
  "id": 1,
  "title": "Product Name",
  "brand": "Brand Name"
}

## Ranking Logic
Products whose titles start with the query get higher scores
Sorted in descending order of relevance:
if title.lower().startswith(query.lower()):
    score = 2
else:
    score = 1


## Demo Video

https://github.com/user-attachments/assets/7edbaa41-62d7-4dd3-9b21-be06d7bd116f




from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load products data once on startup
with open('products.json') as f:
    products = json.load(f)

def search_products(query, limit=10, skip=0):
    query_lower = query.lower()
    
    # Filter products where title or brand contains query (case-insensitive)
    filtered = [p for p in products if query_lower in p.get('title', '').lower() or query_lower in p.get('brand', '').lower()]

    
    # Basic scoring: titles starting with query get higher rank
    def score(p):
        title_lower = p['title'].lower()
        if title_lower.startswith(query_lower):
            return 2
        return 1
    
    filtered.sort(key=score, reverse=True)
    
    # Pagination
    return filtered[skip:skip+limit]

@app.route('/products/search')
def product_search():
    q = request.args.get('q', '').strip()
    limit = request.args.get('limit', 10)
    skip = request.args.get('skip', 0)

    # Validate inputs
    if len(q) < 2:
        return jsonify({"error": "Query parameter 'q' must be at least 2 characters long."}), 400

    try:
        limit = int(limit)
        skip = int(skip)
    except ValueError:
        return jsonify({"error": "'limit' and 'skip' must be integers."}), 400

    result = search_products(q, limit, skip)
    return jsonify({"products": result})

if __name__ == '__main__':
    app.run(debug=True)

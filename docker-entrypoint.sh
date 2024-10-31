#!/bin/bash

# Start Flask backend in background on port 5000
flask --app server run --host 0.0.0.0 --port 5000 &

# Start Next.js frontend in background on port 3000
npm install -g npx & npx next dev &

# Start Nginx in foreground
nginx -g "daemon off;"
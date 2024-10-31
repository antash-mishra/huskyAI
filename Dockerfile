# Backend Build Stage
ARG PYTHON_VERSION=3.12.0

FROM python:${PYTHON_VERSION}-slim AS backend-build

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3-venv \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Frontend Build Stage
FROM node:18 AS frontend-build

WORKDIR /app

# Copy package files
COPY snatched-crawler-client/package*.json ./

# Copy frontend code
COPY snatched-crawler-client/ .

# Install frontend dependencies
RUN npm install

# Build frontend
RUN npm run build

# Nginx + Backend Runtime Stage
FROM python:${PYTHON_VERSION}-slim

# Install nginx and system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Copy virtual environment from backend build
COPY --from=backend-build /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy backend files
WORKDIR /app
COPY --from=backend-build /app .

# Copy frontend build
COPY --from=frontend-build /app/.next ./.next
COPY --from=frontend-build /app/public ./public
COPY --from=frontend-build /app/package.json ./package.json
COPY --from=frontend-build /app/node_modules ./node_modules


# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80


# Startup script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Use entrypoint to start both backend and nginx
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
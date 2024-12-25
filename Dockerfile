# Backend Stage
ARG PYTHON_VERSION=3.12.0

# Backend Build Stage
FROM python:${PYTHON_VERSION}-slim AS backend-build

WORKDIR /app

# Install required system dependencies
<<<<<<< HEAD
RUN apt-get update && apt-get install -y python3-venv  && rm -rf /var/lib/apt/lists/*
=======
RUN apt-get update && apt-get install -y python3-venv && rm -rf /var/lib/apt/lists/*
>>>>>>> 0859a9c (deployment changes)

# Copy requirements first for better cache utilization
COPY requirements.txt .

# Create and activate virtual environment
RUN python -m venv venv
ENV PATH="/app/venv/bin:$PATH"

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application
COPY . .

EXPOSE 5000
<<<<<<< HEAD

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1
# Backend runtime command
CMD ["flask", "--app", "server", "run", "--host", "0.0.0.0", "--debug"]

=======
# Backend runtime command
CMD ["flask", "--app", "server", "run", "--host", "0.0.0.0", "--debug"]
>>>>>>> 0859a9c (deployment changes)

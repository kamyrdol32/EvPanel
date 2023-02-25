FROM python:3.11-alpine

# Create app directory
WORKDIR /backend

# Environment variables
ENV FLASK_APP=core.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV FLASK_RUN_PORT=5001

# Copy requirements.txt
COPY requirements.txt .

# Install app dependencies
RUN pip install -r requirements.txt

# Copy app source code
COPY ../../backend2 .

# Expose port 3000
EXPOSE 5000

# Run app
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "core:app"]


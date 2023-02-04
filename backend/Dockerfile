FROM python:3.9.0-slim-buster

# Create app directory
WORKDIR /backend

# Copy requirements.txt
COPY requirements.txt .

# Install app dependencies
RUN pip install -r requirements.txt

# Copy app source code
COPY . .

# Expose port 3000
EXPOSE 5000

# Run app
CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]


FROM node

# Create app directory
WORKDIR /frontend

# Copy package.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Build css
RUN npm run build-css

# Expose port 3000
EXPOSE 3000

# Run app
CMD [ "npm", "run", "dev" ]


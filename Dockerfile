# Use lightweight Node image
FROM node:18-alpine

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy application file
COPY server.js ./

# Expose port 3000
EXPOSE 3000

# Command to start the app inside the container
CMD ["node", "server.js"]
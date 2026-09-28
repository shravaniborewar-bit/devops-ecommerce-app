FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package requirements and server code
COPY server.js ./

# Install express directly inside the container
RUN npm init -y && npm install express

EXPOSE 3000

CMD ["node", "server.js"]
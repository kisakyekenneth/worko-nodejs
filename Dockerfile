FROM node:14.17.0-alpine3.13

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

COPY .env .

# Expose the port that the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]

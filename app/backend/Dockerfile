FROM node:latest

EXPOSE 3000

# Set the working directory
WORKDIR /usr/src/app

RUN rm -rf node_modules
RUN rm -rf dist

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the openapi.yml file into the Docker image
COPY app/presentation/express/docs dist/app/presentation/express/docs

# RUN npm run test
RUN npm run build

# RUN ls -R

CMD ["npm", "run", "start"]
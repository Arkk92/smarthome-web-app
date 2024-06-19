# Stage 1: Build the Vue.js app
FROM node:latest as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .

#RUN npm run test:unit
#RUN npm run test:e2e
RUN npm run build-only   

# Stage 2: Serve the app with Nginx
FROM nginx:latest

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built files from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]
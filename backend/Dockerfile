FROM node:latest

EXPOSE 3000

WORKDIR /app
COPY ./ /app

RUN npm i pm2 -g
RUN npm i

#RUN npm run test
RUN npm run build

CMD ["npm", "run", "pm2"]
FROM node:18.11.0-slim
   
WORKDIR /app
COPY package.json /app
RUN npm install 
COPY . .
EXPOSE 3000
 
CMD [ "npm", "run", "start"]
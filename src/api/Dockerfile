FROM node:18-alpine3.15
WORKDIR /app
COPY package.json .
RUN npm install 
# CMD ["ts-node", "src/firebase/writeServiceAccountJSON.ts"]
COPY . .
EXPOSE 6060
CMD ["npm", "run", "dev"]

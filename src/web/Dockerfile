FROM node:18-alpine3.15 as build
WORKDIR /app 
COPY package.json .
RUN npm install
COPY . .
ARG REACT_APP_API_URL
RUN npm run build

FROM nginx
EXPOSE 3000
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html


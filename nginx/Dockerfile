FROM nginx:stable-alpine

EXPOSE 80

RUN rm /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]

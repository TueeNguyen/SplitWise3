# $1: github sha

file_content="version: '3.4'
services:
  nginx:
    container_name: nginx
    image: tuedockerid1107/sw-nginx:$1
    ports:
      - 80:80
    depends_on:
      - api
      - web
    restart: always

  web:
    container_name: web
    image: tuedockerid1107/sw-web:$1
    restart: always

  api:
    container_name: api
    image: tuedockerid1107/sw-api:$1
    environment:
      - ADMIN_TYPE
      - ADMIN_PROJECT_ID
      - ADMIN_PRIVATE_KEY_ID
      - ADMIN_PRIVATE_KEY
      - ADMIN_CLIENT_EMAIL
      - ADMIN_CLIENT_ID
      - ADMIN_AUTH_URI
      - ADMIN_TOKEN_URI
      - ADMIN_AUTH_PROVIDER_X509_CERT_URL
      - ADMIN_CLIENT_X509_CERT_URL
      - FB_API_KEY
      - FB_AUTH_DOMAIN
      - FB_PROJECT_ID
      - FB_STORAGE_BUCKET
      - FB_MESSAGING_SENDER_ID
      - FB_APP_ID
      - FB_MEASUREMENT_ID
      - NODE_ENV
    restart: always
"

echo "$file_content"

AWS_DOCKER_COMPOSE="./aws/docker-compose.yml"
if [ -f $AWS_DOCKER_COMPOSE ]; then
   rm $AWS_DOCKER_COMPOSE
   echo "$AWS_DOCKER_COMPOSE is removed"
fi

touch $AWS_DOCKER_COMPOSE
echo "$file_content" >> $AWS_DOCKER_COMPOSE

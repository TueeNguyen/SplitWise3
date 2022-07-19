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

  api:
    container_name: api
    image: tuedockerid1107/sw-api:$1
"

echo "$file_content"
AWS_DOCKER_COMPOSE="./aws/docker-compose.yml"
if [ -f $AWS_DOCKER_COMPOSE ]; then
   rm $AWS_DOCKER_COMPOSE
   echo "$AWS_DOCKER_COMPOSE is removed"
fi

touch $AWS_DOCKER_COMPOSE
echo "$file_content" >> $AWS_DOCKER_COMPOSE

# $1: github sha

file_content="version: '3.4'
services:
  nginx:
    container_name: nginx
    image: 503112169699.dkr.ecr.us-east-1.amazonaws.com/sw-nginx:$1
    ports:
      - 80:80
    depends_on:
      - api
      - web
    restart: always

  web:
    container_name: web
    image: 503112169699.dkr.ecr.us-east-1.amazonaws.com/sw-web:$1
    restart: always

  api:
    container_name: api
    image: 503112169699.dkr.ecr.us-east-1.amazonaws.com/sw-api:$1
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

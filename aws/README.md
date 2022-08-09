Write `aws/docker-compose.yml` to check for lint issues and uniformity with the script at `scripts\write_aws_docker_compose.sh`.

We only use this for production

## Workflow:

- Write to `aws/docker-compose.yml`
- Copy its content to `scripts\write_aws_docker_compose.sh`
- `$1` means interpolating environment variable in bash

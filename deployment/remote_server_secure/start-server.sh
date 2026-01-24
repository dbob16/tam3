#!/bin/bash

mkdir -p nginx/certs
echo "This part will ask you a bunch of questions for the self-signed cert. Answer them, I can't control it. For common name put the name or IP of the server which the clients can access it."
openssl req -x509 -newkey rsa:4096 -keyout nginx/certs/nginx.key -out nginx/certs/nginx.crt -sha256 -days 3650 -nodes

gen_password=$(cat /dev/urandom | tr -dc A-Za-z0-9 | head -c 32)

echo "DB_LOCATION=./tam3-db" > .env
echo "DB_PASSWORD=${gen_password}" >> .env
echo "TAM3_VERSION=0.3.0"

if [ -x "$(command -v docker)" ]; then
docker compose up -d
elif [ -x "$(command -v podman)" ]; then
podman compose up -d
else
echo "Neither Docker nor Podman are installed. Please install whichever you prefer and try again."
exit 1
fi

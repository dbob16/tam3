#!/bin/bash

gen_password=$(cat /dev/urandom | tr -dc A-Za-z0-9 | head -c 32)

echo "DB_LOCATION=./tam3-db" > .env
echo "DB_PASSWORD=${gen_password}" >> .env

if [ -x "$(command -v docker)" ]; then
docker compose up -d
elif [ -x "$(command -v podman)"]; then
podman compose up -d
else
echo "Neither Docker nor Podman are installed. Please install whichever you prefer and try again."
exit 1
fi
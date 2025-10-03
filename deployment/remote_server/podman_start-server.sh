#!/bin/bash

gen_password=$(cat /dev/urandom | tr -dc A-Za-z0-9 | head -c 32)

echo "DB_LOCATION=./tam3-db" > .env
echo "DB_PASSWORD=${gen_password}" >> .env

podman compose up -d
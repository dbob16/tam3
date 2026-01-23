#!/bin/bash

source ../common.sh

if [ -x "$(command -v docker)" ]; then
docker save dbob16/tam3-api:${tam3_version} | gzip > tam3-api.tar.gz
docker save dbob16/tam3-db:${tam3_version} | gzip > tam3-db.tar.gz
elif [ -x "$(command -v podman)" ]; then
podman save dbob16/tam3-api:${tam3_version} | gzip > tam3-api.tar.gz
podman save dbob16/tam3-db:${tam3_version} | gzip > tam3-db.tar.gz
else
echo "Neither Docker nor Podman are installed. Please install whichever you prefer and try again."
exit 1
fi

tar -cvzf tam3-server-offline-images_${tam3_version}.tar.gz tam3-api.tar.gz tam3-db.tar.gz server-load.sh

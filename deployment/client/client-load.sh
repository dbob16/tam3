#!/bin/bash

if [ -x "$(command -v docker)" ]; then
docker load -i tam3-webclient.tar.gz
elif [ -x "$(command -v podman)" ]; then
podman load -i tam3-webclient.tar.gz
else
echo "Neither Docker nor Podman are installed. Please install whichever you prefer and try again."
exit 1
fi
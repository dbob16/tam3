#!/bin/bash

npm run build

source ../deployment/common.sh

docker build -t dbob16/tam3-webclient:${tam3_version} .
docker tag dbob16/tam3-webclient:${tam3_version} dbob16/tam3-webclient:latest

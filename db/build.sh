#!/bin/bash

source ../deployment/common.sh

docker build -t dbob16/tam3-db:${tam3_version} .
docker tag dbob16/tam3-db:${tam3_version} dbob16/tam3-db:latest

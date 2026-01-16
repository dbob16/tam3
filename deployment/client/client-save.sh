#!/bin/bash

source ../common.sh

docker save dbob16/tam3-webclient:${tam3_version} | gzip > tam3-webclient.tar.gz

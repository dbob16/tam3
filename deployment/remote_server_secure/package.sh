#!/bin/bash

source ../common.sh

tar -cvzf tam3-remote-server-secure_${tam3_version}.tar.gz compose.yml delete-key.sh generate-key.sh list-keys.sh start-server.sh nginx/

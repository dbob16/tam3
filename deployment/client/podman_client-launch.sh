#!/bin/bash

mkdir -p ~/.config/TAM3/data

read -p "Do you want to connect to a remote server? [y or n] " rmserver
read -p "Enter the short venue name: " venuename

if [ $rmserver = "y" -o $rmserver = "Y" ]; then
read -p "Enter the protocol, server host/ip, and port like "https://ip_or_host:8443" w/o quotes: " serveraddr
read -p "Paste in (Ctrl + Shift + V on most terminal emulators) or enter the api key you generated for your server: " serverapi
podman run -d --name=tam3-webclient --restart=always -v ~/.config/TAM3/data:/data:rw,z -e TAM3_REMOTE=$serveraddr -e TAM3_REMOTE_KEY=$serverapi -e NODE_TLS_REJECT_UNAUTHORIZED=0 -e PUBLIC_TAM3_VENUE="$venuename" -p 127.0.0.1:8300:3000 docker.io/dbob16/tam3-webclient:0.1.0
else
podman run -d --name=tam3-webclient --restart=always -v ~/.config/TAM3/data:/data:rw,z -e PUBLIC_TAM3_VENUE="$venuename" -p 127.0.0.1:8300:3000 docker.io/dbob16/tam3-webclient:0.1.0
fi
#!/bin/bash

mkdir -p ~/.config/TAM3/data

read -p "Do you want to connect to a remote server? [y or n] " rmserver
read -p "Enter the short venue name: " venuename

if [ $rmserver = "y" -o $rmserver = "Y" ]; then
read -p "Enter the protocol, server host/ip, and port like "https://ip_or_host:8443" w/o quotes: " serveraddr
read -p "Paste in (Ctrl + Shift + V on most terminal emulators) or enter the api key you generated for your server: " serverapi
if [ -x "$(command -v docker)" ]; then
docker run -d --name=tam3-webclient --restart=always -v ~/.config/TAM3/data:/data:rw,z -e TAM3_REMOTE=$serveraddr -e TAM3_REMOTE_KEY=$serverapi -e PUBLIC_TAM3_VENUE="$venuename" -p 127.0.0.1:8300:3000 docker.io/dbob16/tam3-webclient:0.1.1
elif [ -x "$(command -v podman)" ]; then
podman run -d --name=tam3-webclient --restart=always -v ~/.config/TAM3/data:/data:rw,z -e TAM3_REMOTE=$serveraddr -e TAM3_REMOTE_KEY=$serverapi -e PUBLIC_TAM3_VENUE="$venuename" -p 127.0.0.1:8300:3000 docker.io/dbob16/tam3-webclient:0.1.1
runin_podman="true"
else
echo "Neither Docker nor Podman are installed. Please install whichever you prefer and try again."
exit 1
fi
else
if [ -x "$(command -v docker)" ]; then
docker run -d --name=tam3-webclient --restart=always -v ~/.config/TAM3/data:/data:rw,z -e PUBLIC_TAM3_VENUE="$venuename" -p 127.0.0.1:8300:3000 docker.io/dbob16/tam3-webclient:0.2.0
elif [ -x "$(command -v podman )" ]; then
podman run -d --name=tam3-webclient --restart=always -v ~/.config/TAM3/data:/data:rw,z -e PUBLIC_TAM3_VENUE="$venuename" -p 127.0.0.1:8300:3000 docker.io/dbob16/tam3-webclient:0.2.0
runin_podman="true"
else
echo "Neither Docker nor Podman are installed. Please install whichever you prefer and try again."
exit 1
fi
fi

echo "TAM3 should be running on your computer. It is available at http://localhost:8300/, you should be able to create a bookmark or desktop shortcut to it."

if [ -n "$runin_podman" ]; then
echo ""
echo "This script detected that you are running Podman instead of Docker."
echo "If that is the case you will want to either enable podman 'systemctl enable podman' and podman-restart 'systemctl enable podman-restart' on your system."
echo "OR add a command to whichever autostart/login startup script process you prefer which runs the command 'podman start tam3-webclient'."
echo ""
fi
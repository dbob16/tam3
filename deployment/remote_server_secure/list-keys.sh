if [ -x "$(command -v docker)" ]; then
docker compose exec tam3-api /app/key.py list
elif [ -x "$(command -v podman)" ]; then
podman compose exec tam3-api /app/key.py list
else
echo "Neither Docker nor Podman are installed. Please install whichever you prefer and try again."
fi
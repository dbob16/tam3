read -p "Enter the key that you want to delete: " apikey

if [ -x "$(command -v docker)" ]; then
docker compose exec tam3-api /app/key.py delete $apikey
elif [ -x "$(command -v podman)" ]; then
podman compose exec tam3-api /app/key.py delete $apikey
else
echo "Neither Docker nor Podman are installed. Please install whichever you prefer, then try again."
exit 1
fi

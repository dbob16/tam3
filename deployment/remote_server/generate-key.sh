read -p "Enter the name of the computer you plan to use the key on: " pcname

if [ -x "$(command -v docker)" ]; then
docker compose exec tam3-api /app/key.py generate $pcname
elif [ -x "$(command -v podman)" ]; then
podman compose exec tam3-api /app/key.py generate $pcname
else
echo "Neither Docker nor Podman are installed. Please install whichever you prefer, then try again."
exit 1
fi

echo "Note the key above this line. You can use that for the computer."
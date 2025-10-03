read -p "Enter the name of the computer you plan to use the key on: " pcname

docker compose exec tam3-api /app/key.py generate $pcname

echo "Note the key above this line. You can use that for the computer."
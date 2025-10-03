FROM docker.io/python:3-slim

WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 80

CMD ["fastapi", "run", "main.py", "--port", "80", "--proxy-headers"]
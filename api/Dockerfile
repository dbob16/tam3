FROM python:3

WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=5s --retries=3 --start-period=10s \
  CMD python healthcheck.py http://localhost/api/ || exit 1

CMD ["fastapi", "run", "main.py", "--port", "80", "--proxy-headers"]
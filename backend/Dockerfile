FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt requirements.txt
RUN apt-get update && \
    apt-get install -y gcc python3-dev libpq-dev && \
    pip3 install --no-cache-dir -r requirements.txt && \
    apt-get purge -y --auto-remove gcc python3-dev && \
    rm -rf /var/lib/apt/lists/*
COPY . .
CMD ["sh", "-c", "python3 init_db.py && python3 -m flask run --host=0.0.0.0"]
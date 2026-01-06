FROM python:3.11-slim

RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -M -s /sbin/nologin appuser

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=appuser:appgroup ./app .

USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4", "--proxy-headers"]
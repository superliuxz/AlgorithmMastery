FROM python:3.7.4-alpine

EXPOSE 10101

RUN apk add --no-cache \
    musl-dev \
    python3-dev \
    gcc \
    postgresql-dev \
    supervisor \
    nginx

# Nginx
RUN rm -rf /etc/nginx/sites-enabled /etc/nginx/sites-available
RUN mkdir /run/nginx /etc/nginx/sites-enabled /etc/nginx/sites-available
COPY conf/nginx/nginx.conf /etc/nginx/
COPY conf/nginx/sites-available/app.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/app.conf

# supervisor
RUN mkdir -p /etc/supervisor /var/log/supervisor
COPY conf/supervisor /etc/supervisor/

WORKDIR /app
RUN mkdir -p /app/algo_mastery
COPY algo_mastery /app/algo_mastery
COPY manage.py /app
COPY requirements.txt /app
RUN pip install -r requirements.txt

CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
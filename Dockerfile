FROM nginx:alpine
COPY . /usr/share/nginx/html
# Criar configuração Nginx com timeout aumentado
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    client_header_timeout 60s; \
    client_body_timeout 60s; \
    send_timeout 60s; \
    \
    location ~* \.js$ { \
        add_header Content-Type application/javascript; \
        try_files $uri =404; \
    } \
    \
    location ~* \.css$ { \
        add_header Content-Type text/css; \
    } \
    \
    location /assets/ { \
        try_files $uri =404; \
    } \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

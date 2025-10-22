FROM nginx:alpine

# Copiar arquivos da aplicação
COPY . /usr/share/nginx/html

# Configuração básica do Nginx
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Headers para arquivos JS \
    location ~* \.js$ { \
        add_header Content-Type application/javascript; \
        try_files $uri =404; \
    } \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

# ✅ CORRETO: Nginx como processo principal
CMD ["nginx", "-g", "daemon off;"]

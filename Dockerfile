FROM nginx:alpine

COPY . /usr/share/nginx/html/

RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen $PORT;  # Koyeb injeta variável PORT
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    # Configurações otimizadas
    sendfile on;
    tcp_nopush on;
    keepalive_timeout 65;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Variável de ambiente para Koyeb
ENV PORT 80

EXPOSE 80
CMD ["sh", "-c", "nginx -g 'daemon off;'"]
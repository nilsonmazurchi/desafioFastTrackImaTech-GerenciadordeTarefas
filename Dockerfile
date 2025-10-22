FROM nginx:alpine

# Copiar arquivos
COPY . /usr/share/nginx/html/

# Configuração que evita cache problemático
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Headers de segurança RELAXADOS para Koyeb
    add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    
    # Configurações de performance
    sendfile on;
    tcp_nopush on;
    keepalive_timeout 65;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Configuração ESPECIAL para JavaScript
    location ~* \.js$ {
        add_header Content-Type "application/javascript; charset=utf-8";
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Access-Control-Allow-Origin "*";
        add_header Access-Control-Allow-Methods "GET, OPTIONS";
        add_header Access-Control-Allow-Headers "Content-Type";
        try_files $uri =404;
    }
    
    # CSS
    location ~* \.css$ {
        add_header Content-Type "text/css; charset=utf-8";
        add_header Cache-Control "no-cache";
        try_files $uri =404;
    }
    
    # Imagens
    location ~* \.(webp|jpg|jpeg|png|gif|ico)$ {
        add_header Cache-Control "public, max-age=3600";
        try_files $uri =404;
    }
}
EOF

RUN mkdir -p /run/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
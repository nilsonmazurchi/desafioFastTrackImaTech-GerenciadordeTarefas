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

    # Configurações de segurança
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Desabilitar cache durante desenvolvimento
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires "0";
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Headers específicos para JavaScript
    location ~* \.js$ {
        add_header Content-Type application/javascript;
        add_header Cache-Control "no-cache";
        add_header Access-Control-Allow-Origin "*";
        try_files $uri =404;
    }
    
    location ~* \.css$ {
        add_header Content-Type text/css;
        add_header Cache-Control "no-cache";
        try_files $uri =404;
    }
    
    location ~* \.(webp|jpg|jpeg|png|gif|ico)$ {
        add_header Cache-Control "no-cache";
        try_files $uri =404;
    }
}
EOF

RUN mkdir -p /run/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
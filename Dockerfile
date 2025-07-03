# Etapa 1: Build da aplicação
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servir o app com NGINX
FROM nginx:alpine

#COPY --from=builder /app/dist/first-decision-cad-usuario /usr/share/nginx/html
COPY --from=builder /app/dist/first-decision-cad-usuario/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
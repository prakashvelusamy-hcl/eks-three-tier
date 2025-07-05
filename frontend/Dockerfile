# Build Stage
FROM node:18 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime Stage with env injection
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

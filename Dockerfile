FROM node:18-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --dev

COPY . .
RUN npm run build

FROM nginx:1.21-alpine

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

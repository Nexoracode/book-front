# --- build ---
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
# متغیر پابلیکِ فرانت را از CapRover به باندل تزریق کن:
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# --- serve with nginx ---
FROM nginx:alpine
# کانفیگ SPA (history API fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80

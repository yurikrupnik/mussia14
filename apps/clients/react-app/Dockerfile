FROM nginx:1.20-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

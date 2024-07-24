FROM nginx:1.26.1-alpine3.19
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

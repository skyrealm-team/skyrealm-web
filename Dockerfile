FROM nginx:stable-alpine

COPY --chown=root build /usr/share/nginx/html
COPY --chown=root nginx.conf /etc/nginx/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

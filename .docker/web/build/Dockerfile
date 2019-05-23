FROM node:10.15

LABEL maintainer="tiennguyenhoang339@gmail.com"

WORKDIR /var/www/app

COPY . .

RUN npm install -g pm2 && \
    npm install

ENTRYPOINT [".docker/web/build/entrypoint.sh"]

CMD ["pm2", "start", "index.js", "--watch", "--no-daemon"]

EXPOSE 3000

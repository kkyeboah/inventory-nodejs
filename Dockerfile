FROM node:6

MAINTAINER "Kelvin" <kelvinkyeboah@gmail.com>

RUN mkdir -p /usr/src/inventory-app
WORKDIR /usr/src/inventory-app

COPY . /usr/src/inventory-app

EXPOSE 80

RUN npm install

CMD [ "npm", "start" ]
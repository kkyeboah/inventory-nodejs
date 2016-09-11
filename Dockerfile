FROM node:6

MAINTAINER "Kelvin" <kelvinkyeboah@gmail.com>

# default is 'dumb'. that cripples less, vim, coloring, et al
ENV TERM xterm-256color

# install mongodb : reference https://docs.mongodb.com/v2.6/tutorial/install-mongodb-on-debian/
# data does not persist | this is for testing purposes | a separate DB server should be used otherwise
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10 \
    && echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list \
    && apt-get update \
    && apt-get install -y mongodb-org \
    && apt-get clean

RUN apt-get update \
    && apt-get install -y \
        vim-tiny \
    && apt-get clean

RUN mkdir -p /usr/src/inventory-app
WORKDIR /usr/src/inventory-app

COPY . /usr/src/inventory-app

EXPOSE 3000

RUN mkdir -p /data/db/ \
    && echo "\nsmallfiles = true" >> /etc/mongod.conf \
    && npm install

ENTRYPOINT ["/usr/src/inventory-app/docker/bin/start.sh"]
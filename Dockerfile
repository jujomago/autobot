FROM node:5.8.0
MAINTAINER Enrique <enrique@autoboxcorp.com>

ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production && mkdir -p /usr/src/appx && cp -a /tmp/node_modules /usr/src/appx/
COPY /dist /usr/src/appx
COPY env_setup.sh /usr/src/appx/server
#WORKDIR /usr/src/appx
WORKDIR /usr/src/appx/server

EXPOSE 8081

CMD ["./env_setup.sh"]

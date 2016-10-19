FROM node:5.8.0
MAINTAINER Enrique <enrique@autoboxcorp.com>

ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production && mkdir -p /usr/src/appx && cp -a /tmp/node_modules /usr/src/appx/
COPY /dist /usr/src/appx
RUN sed -i 's@http://u19212546.onlinehome-server.com:9999/api@'"$API_ACCESS_URL"'@' /usrxxxx/configs/config.json
#WORKDIR /usr/src/appx
WORKDIR /usr/src/appx/server

EXPOSE 8081

CMD ["npm","start"]
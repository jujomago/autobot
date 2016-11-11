FROM node:5.8.0
MAINTAINER Enrique <enrique@autoboxcorp.com>

ARG API_ACCESS_URL

ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production && mkdir -p /usr/src/appx && cp -a /tmp/node_modules /usr/src/appx/
COPY /dist /usr/src/appx
RUN find /usr/src/appx/client/app -name 'app*.js' -exec sed -i -e 's@http://u19212546.onlinehome-server.com:9999/api@'"$API_ACCESS_URL"'@' {} \;
#WORKDIR /usr/src/appx
WORKDIR /usr/src/appx/server

EXPOSE 8081

CMD ["npm","start"]
#!/usr/bin/env bash

echo "Replacing API URL"
find /usr/src/appx/client/app -name 'app*.js' -exec sed -i -e 's@http://localhost:9999/api@'"$API_ACCESS_URL"'@' {} \;
echo "npm start"
cd /usr/src/appx/server && npm start

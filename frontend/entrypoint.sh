#!/bin/sh
# Create env.js with runtime values
echo "window._env_ = {" > /usr/share/nginx/html/env.js
echo "  REACT_APP_API_BASE_URL: \"${REACT_APP_API_BASE_URL}\"" >> /usr/share/nginx/html/env.js
echo "};" >> /usr/share/nginx/html/env.js

exec "$@"

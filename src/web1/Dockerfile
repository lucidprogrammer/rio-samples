FROM node:13.3.0-alpine3.10

RUN apk add --no-cache --virtual .build-deps binutils-gold curl g++ gcc gnupg libgcc linux-headers make python
WORKDIR /web
COPY package.json /web

RUN npm install
COPY *.js /web
RUN apk del .build-deps
CMD ["node","/web/index.js"]

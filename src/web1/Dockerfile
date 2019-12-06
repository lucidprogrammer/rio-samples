FROM node:12.10.0-alpine

RUN apk add --no-cache --virtual .build-deps binutils-gold curl g++ gcc gnupg libgcc linux-headers make python
WORKDIR /web
COPY . /web

RUN npm install
RUN apk del .build-deps
CMD ["node","/web/index.js"]

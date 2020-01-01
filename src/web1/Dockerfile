FROM node:13.3.0-alpine3.10

ARG COMMIT_HASH
ENV REVISION ${COMMIT_HASH}

RUN apk add --no-cache tini

RUN mkdir /web
WORKDIR /web
COPY package.json /web

RUN cd /web && npm install
COPY *.js /web

ENTRYPOINT [ "tini","--" ]
CMD ["node","--prof","/web/index.js"]

FROM node:13.3.0-alpine3.10 as prod
ENV NODE_ENV=production
ARG COMMIT_HASH
RUN apk add --no-cache tini
RUN mkdir /web
WORKDIR /web
COPY package.json package-lock.json /web/
RUN cd /web && npm install --only=production && npm cache clean --force
COPY . /web
ENV COMMIT_HASH ${COMMIT_HASH}
LABEL COMMIT_HASH="${COMMIT_HASH}"
ENTRYPOINT [ "tini","--" ]
CMD ["node","index.js"]

FROM prod as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["node_modules/.bin/nodemon", "index.js"]

FROM dev as test
ENV NODE_ENV=development
RUN npm test

FROM prod



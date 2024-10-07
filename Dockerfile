FROM node:21.4.0

ARG API_URI
ARG WS_URI

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 4173

CMD [ "yarn", "preview" ]

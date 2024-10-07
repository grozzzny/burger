FROM node:21.4.0

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 4173

CMD [ "yarn", "preview" ]

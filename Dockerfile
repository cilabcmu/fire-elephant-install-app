FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

EXPOSE 4173

EXPOSE 3000

CMD ["yarn", "vite", "preview"]
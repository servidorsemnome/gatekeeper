FROM node:16-alpine

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN yarn install --frozen-lockfile --non-interactive

RUN yarn prisma generate

RUN yarn build

EXPOSE 3000

CMD ["node", "build"]
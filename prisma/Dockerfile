# stage build
FROM node:16-alpine
WORKDIR /app
COPY . ./prisma
RUN rm -rf node_modules
RUN yarn global add prisma
ENV DATABASE_URL ${DATABASE_URL}
CMD ["prisma", "migrate", "deploy"]

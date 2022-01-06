FROM node:lts-alpine as build
WORKDIR /src
COPY ./ /src/
RUN npm install --production

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /src /app
ENV LOG_LEVEL=INFO
HEALTHCHECK CMD ["pidof", "node"]
ENTRYPOINT [ "node", "app.js" ]
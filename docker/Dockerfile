FROM node:latest

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000
WORKDIR /app/src

RUN apt-get update && \
    apt-get install -y --no-install-recommends vim && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY ./src/* ./
RUN npm install

CMD ["node", "app.js"]

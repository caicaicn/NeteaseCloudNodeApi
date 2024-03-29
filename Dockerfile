FROM node:latest

RUN mkdir -p /webfile/NeteaseCloudNodeApi

WORKDIR /webfile/NeteaseCloudNodeApi/

COPY . /webfile/NeteaseCloudNodeApi/

RUN npm install

CMD ["npm", "start"]
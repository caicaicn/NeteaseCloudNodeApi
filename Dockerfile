FROM node:latest

COPY . /webfile/NeteaseCloudNodeApi

WORKDIR /webfile/NeteaseCloudNodeApi

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
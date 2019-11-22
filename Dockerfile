FROM node:latest

WORKDIR /webfile/NeteaseCloudNodeApi

COPY . /webfile/NeteaseCloudNodeApi

RUN npm install

# EXPOSE 3000

CMD ["npm", "start"]
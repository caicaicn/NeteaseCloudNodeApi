FROM node:latest

RUN mkdir -p /webfile/NeteaseCloudNodeApi

WORKDIR /webfile/NeteaseCloudNodeApi/

COPY . /webfile/NeteaseCloudNodeApi/

RUN npm install

# EXPOSE 3000docker 

CMD ["npm", "start"]
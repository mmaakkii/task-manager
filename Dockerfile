# Base Image
FROM node:14-alpine

WORKDIR /usr/app

COPY package.json .

# Install dependencies
RUN npm install ts-node --save-dev
RUN npm install typescript -g 
RUN npm install

COPY . .

#  Default command
CMD ["npm", "run", "start:dev" "--", "--env=production"]
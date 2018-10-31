FROM node:10-alpine as base

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install -g typescript


FROM base

COPY src src
COPY tsconfig.json .

RUN tsc

#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]
FROM node:9.8.0-alpine
MAINTAINER Max Krivich <maxkrivich@gmail.com>

# Set locale
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

# install dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

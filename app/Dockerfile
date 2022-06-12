FROM node:14.19
ARG NODE_ENV=development
RUN apt-get update -y
# Installing libvips-dev for sharp compatability
# RUN apt-get install libvips-dev -y
ENV NODE_ENV=${NODE_ENV}
WORKDIR /srv
COPY ./package.json ./
# COPY ./package-lock.json ./
RUN npm config set fetch-retry-maxtimeout 60000 -g
RUN npm i
ENV PATH=/srv/node_modules/.bin:$PATH
WORKDIR /srv/app
COPY ./ .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "develop"]
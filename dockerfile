FROM node:21

# set working directory
WORKDIR /

COPY src/. .

RUN npm i

EXPOSE 80

# start app
CMD ["npm", "start"]
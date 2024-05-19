FROM node:21

# set working directory
WORKDIR /

COPY src/. .

RUN npm i

EXPOSE 80

# start app
# CMD ["npm", "run", "build;", "npm", "install", "-g", "serve;", "npm", "start"]
CMD ["npm", "start"]
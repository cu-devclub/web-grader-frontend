FROM node:21

# set working directory
WORKDIR /

COPY src/. .

RUN npm install
RUN npm install react-scripts -g

EXPOSE 80

# start app
CMD ["npm", "start"]
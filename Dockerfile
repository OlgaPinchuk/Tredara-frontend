# get the base node image
FROM node:18-alpine

# envionment variables
ENV VITE_API_URL=

# set the working dir for container
WORKDIR /frontend

# ENV PATH="./node_modules/.bin:$PATH"

COPY package.json .
COPY vite.config.js .
RUN npm install 

# copy other project files
COPY . .
# install npm dependencies
# RUN npm install 
RUN npm run build
EXPOSE 5173
# build the folder
CMD [ "npm", "run" , "preview" ]
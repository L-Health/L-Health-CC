FROM node:20
WORKDIR /usr/src/app
ENV PORT=8000
<<<<<<< HEAD
ENV MODEL_URL=https://storage.googleapis.com/model-health/model.json
COPY . . 
RUN npm install
EXPOSE 8000
=======
COPY . . 
RUN npm install
>>>>>>> d8aff3604d31a0ac917323d3dce57f45bda50b66
COPY package*.json ./
CMD [ "npm", "run", "start" ]

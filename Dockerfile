FROM node:20
WORKDIR /usr/src/app
ENV PORT=8000
ENV MODEL_URL=https://storage.googleapis.com/model-health/model.json
COPY . . 
RUN npm install
EXPOSE 8000
COPY package*.json ./
CMD [ "npm", "run", "start" ]

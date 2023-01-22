FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g react-native-cli
COPY . .
EXPOSE 8081
CMD npm start
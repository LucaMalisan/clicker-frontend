FROM node:23-alpine

WORKDIR /usr/src/app

# Kopiere package.json und package-lock.json zuerst, um npm install zu optimieren
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

# Kopiere den Rest der Anwendung
COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0", "--configuration=production"]
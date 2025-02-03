FROM node:lts
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install 
EXPOSE 5000
CMD ["npm", "run", "cstart"]
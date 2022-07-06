FROM node:16 as base
#Argument that is passed from docer-compose.yml file
ARG NODE_PORT
#Echo the argument to check passed argument loaded here correctly
RUN echo "Argument port is : ${NODE_PORT}"
# Create app directory
WORKDIR /app
#Copy . .
COPY package*.json /app/
#Install deps into container
RUN npm install
#Copy everything fron current directory into container directory
COPY . /app/
#Expose port
EXPOSE ${NODE_PORT}
#Command to run/execute our code into the container
CMD ["npm", "run", "dev"]
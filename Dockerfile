FROM node:20-alpine
WORKDIR /app
COPY api ./api
WORKDIR /app/api
RUN npm install
EXPOSE 4101
CMD ["npm","start"]

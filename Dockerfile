FROM node:20

WORKDIR /app
COPY . .

RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy

CMD ["npm", "run", "start:dev"]
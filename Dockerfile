FROM node:20

WORKDIR /app
COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run predeploy
RUN npm run build
# RUN npx prisma migrate deploy

CMD ["npm", "run", "start:instance"]
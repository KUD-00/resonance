FROM node:20 as builder

WORKDIR /app

COPY frontend/package.json .

RUN npm install

COPY frontend/public/ public/
COPY frontend/src/ src/
COPY frontend/grpc/ grpc/

COPY frontend/tailwind.config.js .
COPY frontend/postcss.config.js .
COPY frontend/tsconfig.json .

RUN npm run build

RUN [ -d "/app/dist" ] || exit 1

EXPOSE 8080

CMD ["npm", "run", "start"]

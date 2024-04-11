FROM node:21

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/utils ./utils
COPY frontend/app ./app
COPY frontend/grpc ./grpc
COPY frontend/public ./public
COPY frontend/next.config.mjs ./next.config.mjs
COPY frontend/tailwind.config.ts ./tailwind.config.ts
COPY frontend/tsconfig.json ./tsconfig.json

RUN npm run build

RUN [ -d "/app/.next" ] || exit 1

EXPOSE 3000

CMD ["npm", "run", "dev"]
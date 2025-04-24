# STEP 1
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm i -g pnpm

COPY package.json ./

RUN pnpm i

COPY . .

RUN pnpm run build


# STEP 2
FROM node:20-alpine

WORKDIR /app

# Reinstall pnpm in the second stage
RUN npm i -g pnpm

COPY --from=builder /app/package.json /app/

COPY --from=builder /app/dist /app/dist

COPY --from=builder /app/src/server.js /app/

RUN pnpm i --prod

EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
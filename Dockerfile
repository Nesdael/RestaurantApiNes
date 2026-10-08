#----build stage ------------------------------
FROM node:24-alpine AS build

WORKDIR /app

COPY . .
RUN npm run build

# ---- rutine stage ----------------------------
FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
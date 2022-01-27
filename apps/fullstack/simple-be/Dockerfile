


#FROM yurikrupnik/mussia14-builder AS builder
#
#FROM node:16-alpine AS runner
#WORKDIR /app
#ENV NODE_ENV=$NODE_ENV
#
#ARG path=''
#RUN echo $path
#
#COPY --from=builder ./app/$path ./
#RUN npm install --production
#
#ENV PORT=3333
#EXPOSE ${PORT}
#
#CMD ["node", "main.js"]

FROM node:17-alpine AS builder

WORKDIR /app

ENV NODE_ENV=$NODE_ENV
COPY ./dist .
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production

CMD ["node", "main.js"]

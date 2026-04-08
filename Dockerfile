FROM oven/bun:1-alpine

ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --update --no-cache \
      nodejs

RUN addgroup -S -g 1000 app && \
    adduser -S -h /app -s /sbin/nologin -u 1000 -G app app && \
    chown -R app:app /app

WORKDIR /app

COPY package.json bun.lock /app/
RUN bun install --frozen-lockfile

COPY . .

RUN bun run next:build

USER app:app

FROM oven/bun:1-alpine

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /home/bun/app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run next:build

USER bun

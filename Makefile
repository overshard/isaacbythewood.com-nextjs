.PHONY: install run build push resume

run:
	bun start

install:
	bun install

build:
	bun run next:build

push:
	git push origin
	git push server

resume:
	bun run resume

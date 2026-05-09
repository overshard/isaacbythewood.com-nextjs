export NEXT_TELEMETRY_DISABLED=1

.PHONY: install run build push resume clean

run:
	bun start

install:
	bun install

build:
	bun run next:build

push:
	git remote | xargs -I R git push R master

resume:
	bun run resume

clean:
	rm -rf .next node_modules

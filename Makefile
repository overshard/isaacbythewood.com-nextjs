.PHONY: run push resume

run:
	yarn start

push:
	git push origin
	git push server

resume:
	yarn resume

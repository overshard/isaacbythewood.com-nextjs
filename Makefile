.PHONY: run push

run:
	yarn start

push:
	git push origin
	git push server

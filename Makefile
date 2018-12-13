install:
	npm install

start:
	DEBUG=events npm run dev

build:
	npm run build

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test

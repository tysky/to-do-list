install:
	npm install

start:
	DEBUG=events npm run dev

build:
	npm run build

test:
	npm test
	
lint:
	npx eslint .

publish:
	npm publish

.PHONY: test

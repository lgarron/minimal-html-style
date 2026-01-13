.PHONY: lint
lint: setup
	bun x -- bun-dx --package @biomejs/biome biome -- check
	bun run -- script/update-readme.ts --check-only
	bun x -- bun-dx --package typescript tsc -- --project .

.PHONY: format
format: setup
	bun x -- bun-dx --package @biomejs/biome biome -- check --write

.PHONY: setup
setup:
	bun install --frozen-lockfile

.PHONY: update-README.md
update-README.md:
	bun run -- script/update-readme.ts

.PHONY: clean
clean:
	# no-op

.PHONY: reset
reset: clean
	rm -rf ./node_modules/

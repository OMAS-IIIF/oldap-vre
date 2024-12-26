.PHONY: help run test coverage

help:
	@echo "Usage: make [target] ..."
	@echo ""
	@echo "Available targets:"
	@echo "  help     Show this help message"
	@echo "  run    Build the distribution package"
	@echo "  test     Run all tests"
	@echo "  coverage Get the coverage rate of the unittests"

run:
	npm run dev

test:
	npx vitest




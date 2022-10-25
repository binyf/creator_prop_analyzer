SHELL := /bin/bash

# Target section and Global definitions
# -----------------------------------------------------------------------------
install: generate_dot_env
	pip install --upgrade pip
	pip install poetry
	poetry install

run:
	PYTHONPATH=app/ poetry run python app/main.py

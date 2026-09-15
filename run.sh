#!/usr/bin/env bash
set -e
# Load .env if present (exports variables into the shell)
if [ -f .env ]; then
  set -a
  # disable history expansion in interactive shells that might expand '!'
  set +o histexpand 2>/dev/null || true
  source .env
  set +a
fi
# Run application via mvnw
./mvnw spring-boot:run

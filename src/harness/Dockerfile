# Sandbox for running Agent Skills with Claude Code against a local model.
#
# The agent gets a shell, Python, and MkDocs, and can touch only the run
# directory mounted at /work. Build it on the DGX with your own user and
# group ids so files written to /work belong to you:
#
#   docker build -t dgx-eval-harness \
#     --build-arg UID=$(id -u) --build-arg GID=$(id -g) src/harness
FROM python:3.12-slim-bookworm

ARG UID=1000
ARG GID=1000
# Pinned so every run uses the same harness. Change it deliberately.
ARG CLAUDE_CODE_VERSION=2.1.246

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      bash ca-certificates curl git jq less ripgrep zstd \
 && rm -rf /var/lib/apt/lists/*

# What the skills call: MkDocs to build the book, PyYAML to check frontmatter.
RUN pip install --no-cache-dir mkdocs-material pyyaml

RUN groupadd -g "$GID" agent \
 && useradd -m -u "$UID" -g "$GID" -s /bin/bash agent
USER agent
ENV HOME=/home/agent
ENV PATH=/home/agent/.local/bin:$PATH

# Anthropic's installer: verifies a checksum and installs under $HOME.
RUN curl -fsSL https://claude.ai/install.sh | bash -s -- "$CLAUDE_CODE_VERSION" \
 && claude --version

WORKDIR /work

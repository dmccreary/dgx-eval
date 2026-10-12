# References: Running the Textbook Benchmark

1. [Benchmark (computing)](https://en.wikipedia.org/wiki/Benchmark_(computing)) - Wikipedia - Describes how benchmarks run standard tests to compare systems, and lists principles including relevance, repeatability, and transparency. It frames this chapter's fixed Algebra I textbook benchmark and why every run must start from the same input.

2. [Rsync](https://en.wikipedia.org/wiki/Rsync) - Wikipedia - Covers the rsync tool and its delta-transfer algorithm, which sends only new and changed data, with usage examples. It explains how this chapter's run output retrieval copies run directories from the DGX without resending everything.

3. [JSON streaming](https://en.wikipedia.org/wiki/JSON_streaming) - Wikipedia - Compares ways to stream a sequence of JSON values, including newline-delimited JSON (JSON Lines) with one object per line. It explains the format of this chapter's run event stream and why it can be read mid-run.

4. Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation (1st Edition) - Jez Humble and David Farley - Addison-Wesley Professional - Develops the deployment pipeline, an automated sequence of stages from check-in to release in which each stage builds on the last and a failure stops the line. It clarifies this chapter's stage chaining and fail-fast stage gates.

5. The Art of Computer Systems Performance Analysis (1st Edition) - Raj Jain - Wiley - Widely praised for opening with a catalog of common performance-evaluation mistakes, such as no goals, biased goals, and unrepresentative workloads, followed by a systematic approach. It guides the benchmark discipline this chapter applies.

6. [timeout invocation (GNU Coreutils)](https://www.gnu.org/software/coreutils/manual/html_node/timeout-invocation.html) - GNU Project - Documents the timeout command, which stops a command after a time limit, with signal and kill-after options and exit status 124 on timeout. It matches this chapter's run time limit, where a timeout is recorded as a result.

7. [Run Claude Code programmatically](https://code.claude.com/docs/en/headless) - Claude Code Documentation - Explains non-interactive runs with the -p flag, exit codes, and the stream-json output format that emits one JSON event per line. It describes how this chapter's runner can feed a stage prompt unattended and capture every event.

8. [Bind mounts](https://docs.docker.com/engine/storage/bind-mounts/) - Docker Documentation - Explains how a host directory is mounted into a container with --mount or -v, including read-only mounts. It underlies this chapter's runner, which mounts a fresh copy of the run directory into the harness container.

9. [tmux Wiki](https://github.com/tmux/tmux/wiki) - tmux Project - Introduces tmux as a terminal multiplexer whose programs can be detached to keep running in the background and reattached from another terminal. It supports this chapter's named bench and watchdog sessions that survive a dropped connection.

10. [Command Line Interface](https://www.mkdocs.org/user-guide/cli/) - MkDocs Documentation - Documents the mkdocs build command and its strict mode, which aborts the build on any warning. It is the command behind this chapter's build success metric, where a strict build must exit with no errors.

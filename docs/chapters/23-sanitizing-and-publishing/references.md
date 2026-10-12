# References: Sanitizing Evaluation Artifacts and Publishing the Report

1. [Redaction](https://en.wikipedia.org/wiki/Redaction) - Wikipedia - Covers removing sensitive information from documents, with failures such as text left under black boxes in PDFs and data kept in revision history. It supports this chapter's cropping, solid fills, and review of redacted artifacts.

2. [List of reserved IP addresses](https://en.wikipedia.org/wiki/List_of_reserved_IP_addresses) - Wikipedia - Tabulates IPv4 and IPv6 blocks set aside for special uses, including the documentation ranges 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24, and 2001:db8::/32. It lists the safe example addresses this chapter uses in place of real ones.

3. [Data loss prevention software](https://en.wikipedia.org/wiki/Data_loss_prevention_software) - Wikipedia - Describes tools that detect and block unauthorized disclosure of sensitive data, including content-aware detection and the problem of false positives. It frames this chapter's pre-commit scan, whose hits need human reading.

4. Threat Modeling: Designing for Security (1st Edition) - Adam Shostack - Wiley - Introduces a four-question framework for threat modeling: what are you building, what can go wrong, what should you do about it, and did you do a decent job of analysis. It maps onto this chapter's catalog, methods, and review.

5. Pro Git (2nd Edition) - Scott Chacon and Ben Straub - Apress - Widely praised for explaining Git as a set of snapshots stored as linked objects, with a chapter on internals. It clarifies why this chapter's leaked file stays in history after a later commit deletes it.

6. [Gitleaks](https://github.com/gitleaks/gitleaks) - GitHub - README for the open-source scanner that finds passwords, API keys, and tokens, with git, dir, and stdin scan modes, a pre-commit hook, and --redact. It documents the secret scanner this chapter names, and the newer commands replacing detect.

7. [Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) - GitHub Docs - Explains rewriting history with git-filter-repo, its side effects on forks and cached views, and the advice to treat exposed credentials as compromised and revoke or rotate them. It supports this chapter's git history persistence rules.

8. [githooks](https://git-scm.com/docs/githooks) - Git Documentation - Reference for Git hooks, including pre-commit, which runs before a commit is created and aborts it on a non-zero exit, and the --no-verify bypass. It documents the mechanism behind this chapter's pre-commit scan script.

9. [Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) - OWASP Cheat Sheet Series - Covers keeping secrets out of code and logs, rotation and revocation, detecting secrets with pre-commit checks, and responding when one is exposed. It supports this chapter's rules for keys and tokens.

10. [Tailnet names and types](https://tailscale.com/docs/concepts/tailnet-name) - Tailscale Documentation - Explains the tailnet DNS name ending in .ts.net, the per-device machine name, and the tailnet ID. It shows why this chapter treats the tailnet name and hostnames as device-identifying details to replace with placeholders.

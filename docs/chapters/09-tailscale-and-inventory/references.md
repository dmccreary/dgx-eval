# References: Installing Tailscale and Taking a Read-Only Inventory

1. [Tailscale](https://en.wikipedia.org/wiki/Tailscale) - Wikipedia - Covers the company and its open-source WireGuard-based mesh VPN, including NAT traversal, DERP relay fallback, and addresses from the RFC 6598 carrier-grade NAT space. It gives background for the chapter's installation and connectivity steps.

2. [Access-control list](https://en.wikipedia.org/wiki/Access-control_list) - Wikipedia - Defines an ACL as a list of permissions attached to a resource that says which subjects may perform which operations, and compares ACLs with role-based access control. It underlies the chapter's tailnet access rules.

3. [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System) - Wikipedia - Explains the hierarchical naming system that maps names to IP addresses, with sections on structure, operation, and resource records. It provides the background for MagicDNS names that resolve only inside the tailnet.

4. The Unix Programming Environment (1st Edition, 1984) - Brian W. Kernighan and Rob Pike - Prentice Hall - Argues that a system's power comes from the relationships among small programs, which filters and pipes connect. It is the classic grounding for the chapter's habit of piping a local script through SSH to a remote shell.

5. Zero Trust Networks: Building Secure Systems in Untrusted Networks (2nd Edition) - Razi Rais, Christina Morillo, Evan Gilman, and Doug Barth - O'Reilly Media - Explains networks that grant access through authentication, authorization, and encryption on every connection instead of network location. It is the model behind a tailnet's identity-based access rules.

6. [Tailscale CLI](https://tailscale.com/kb/1080/cli) - Tailscale - Reference for the tailscale command, including up, status, and ping, with status described as the state of your connections to other devices. It is the reference for the commands in the chapter's connectivity test.

7. [MagicDNS](https://tailscale.com/kb/1081/magicdns) - Tailscale - Explains how each device gets a DNS name, a short name through search domains, and a fully qualified name ending in the tailnet's ts.net domain. It documents the naming behavior the chapter relies on.

8. [Manage permissions using ACLs](https://tailscale.com/kb/1018/acls) - Tailscale - Describes the tailnet policy file and directional accept rules built from action, src, and dst, where devices cannot communicate unless a rule allows it. It matches the chapter's minimal access rule example.

9. [Auth keys](https://tailscale.com/kb/1085/auth-keys) - Tailscale - Explains pre-authentication keys for joining devices without a browser sign-in, with one-off, reusable, ephemeral, and pre-approved options, expiry, and storage guidance. It supports the chapter's warning to treat an auth key like a password.

10. [lscpu(1)](https://man.archlinux.org/man/lscpu.1) - Arch Linux manual pages - Manual page for the util-linux tool that reports CPU architecture, counts, sockets, and cache sizes, with JSON output for parsing. It documents one of the read-only inventory commands in the chapter's table.

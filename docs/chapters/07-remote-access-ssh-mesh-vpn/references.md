# References: Remote Access, SSH, and Mesh VPN Concepts

1. [Secure Shell](https://en.wikipedia.org/wiki/Secure_Shell) - Wikipedia - Describes the SSH protocol, its replacement of Telnet and rlogin, public-key authentication, and architecture. It supports the chapter's coverage of encrypted remote login, host keys, and key-based unattended access.

2. [WireGuard](https://en.wikipedia.org/wiki/WireGuard) - Wikipedia - Covers the UDP-based VPN protocol, its design goals compared with IPsec and OpenVPN, and its inclusion in Linux 5.6. It supports the chapter's account of the encryption layer beneath Tailscale.

3. [Network address translation](https://en.wikipedia.org/wiki/Network_address_translation) - Wikipedia - Explains how routers map private addresses to public ones, with a section on NAT types and NAT traversal. It underlies the chapter's explanation of why a home router drops unsolicited connections.

4. Computer Networking: A Top-Down Approach (9th Edition) - James F. Kurose and Keith W. Ross - Pearson - The authors describe their book as breaking new ground by teaching networking top-down, starting at the application layer and working toward physical links. That order makes NAT, VPNs, and SSH concrete before the plumbing beneath them.

5. SSH, The Secure Shell: The Definitive Guide (2nd Edition) - Daniel J. Barrett, Richard E. Silverman, and Robert G. Byrnes - O'Reilly Media - A widely used book-length reference on the SSH-2 protocol, covering key management, agents, and port forwarding. It is the deeper treatment behind the chapter's key pair, unattended login, and port-forward sections.

6. [How Tailscale Works](https://tailscale.com/blog/how-tailscale-works) - Tailscale - Avery Pennarun's 2020 post explains the WireGuard data plane, the coordination server that distributes public keys, NAT traversal, and DERP relays. It is the primary source for the chapter's coordination-plane versus data-plane distinction.

7. [How NAT Traversal Works](https://tailscale.com/blog/how-nat-traversal-works) - Tailscale - David Anderson's article walks through stateful firewalls, NAT, STUN, and hole punching, with relays as the fallback. It gives the step-by-step mechanism behind the chapter's simultaneous-send explanation of peer-to-peer connections.

8. [Protocol & Cryptography](https://www.wireguard.com/protocol/) - WireGuard - The project's own overview of WireGuard's primitives (ChaCha20 with Poly1305, Curve25519, BLAKE2s), UDP transport, and Noise-based handshake. It backs the chapter's description of WireGuard's encryption and its key-based handshake.

9. [ssh(1) manual page](https://man.openbsd.org/ssh) - OpenBSD manual pages (OpenSSH) - Official OpenSSH client manual documenting options such as -L port forwarding, -N, and -o, plus known_hosts handling and host key verification. It is the authoritative reference for the commands the chapter shows.

10. [RFC 4251: The Secure Shell (SSH) Protocol Architecture](https://datatracker.ietf.org/doc/html/rfc4251) - IETF - Standards-track description of SSH's transport, user authentication, and connection layers, with a discussion of host keys and the risk on first connection. It grounds the chapter's host key fingerprint warning.

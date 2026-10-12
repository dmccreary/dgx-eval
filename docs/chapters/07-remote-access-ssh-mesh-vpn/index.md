---
title: "Remote Access, SSH, and Mesh VPN Concepts"
description: "How a laptop reaches a machine on another network: SSH, key pairs and unattended login, and how a WireGuard-based mesh VPN such as Tailscale separates coordination from data transfer."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:04:41"
version: 1.11
---

# Remote Access, SSH, and Mesh VPN Concepts

## Summary

This chapter teaches how to reach a remote machine securely. It covers SSH, key pairs, and unattended login, then explains how a WireGuard-based mesh VPN works and how Tailscale and the tailnet separate coordination from data transfer. Students finish able to describe the connection path between a laptop and a DGX.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Remote Access | 210 |
| SSH | 31 |
| Mesh VPN | 170 |
| Home Router | 39 |
| SSH Key Pair | 15 |
| SSH Port Forward | 2 |
| Host Key Fingerprint | 1 |
| WireGuard | 85 |
| Ed25519 Key | 4 |
| ssh-copy-id | 3 |
| NAT Traversal | 3 |
| Host Hygiene | 1 |
| Tailscale | 81 |
| Passphrase-Free Key | 3 |
| Tailnet | 61 |
| Data Plane | 3 |
| Unattended SSH Login | 2 |
| Coordination Plane | 1 |
| Peer-to-Peer Connection | 1 |
| DERP Relay | 1 |
| BatchMode | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 6: Cost, Price, and Quality](../06-cost-price-quality/index.md)

---

!!! mascot-welcome "Reaching the Machine Without Opening a Door"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The DGX is in one building and you are in another, with two home routers between you that neither of you controls. By the end of this chapter you will be able to describe the exact path a command takes from your laptop to the machine, and say what each party on that path can see. Measure first, then decide!

## What This Chapter Covers

Everything after this chapter happens on a machine you reach over a network. If that connection is fragile, insecure, or impossible to script, every later step inherits the problem. The chapter therefore teaches the connection itself before any software is installed on the DGX.

It has two layers. The first is **SSH**, the protocol you use to run commands on a remote machine, and the key-based login that lets scripts and agents use it without a person typing a password. The second is the **mesh VPN**, the network layer that makes a machine behind someone else's router reachable at all. Chapter 9 installs and configures Tailscale. This chapter explains why it works, so the installation steps make sense.

## Remote Access

### Remote Access

**Remote access** is the ability to use a computer that is not in front of you: to log in, run commands, move files, and watch its output. Every DGX evaluation needs it, because the machine is in a lab, a server room, or someone else's home, and the work of the evaluation runs for hours.

There are three common ways to arrange it, and they differ in what they expose to the public internet.

| Approach | How it works | What is exposed | Main drawback |
|---|---|---|---|
| Port forwarding | The router forwards a public port to the machine | The machine's login service, to everyone on the internet | Constant automated attacks, and it needs router access |
| A conventional VPN | Both sides connect to a central VPN server | The VPN server | All traffic passes through one point, and someone must run it |
| A mesh VPN | Each machine connects directly to the others | Nothing on the machine's own address | Depends on a coordination service |

A worked decision shows how the three compare against this evaluation's actual constraints. The laptop and the DGX are on different home networks. Nobody involved controls both routers, and the person running the benchmark has no access to the DGX's router at all. Scripts and an AI agent must log in with no person present. And the machine must not become reachable by strangers, because it belongs to someone else.

| Constraint | Port forwarding | Conventional VPN | Mesh VPN |
|---|---|---|---|
| No access to the DGX's router | Fails: it needs a router change | Works if the server is reachable | Works |
| Scripts must connect unattended | Works | Works | Works |
| Must not be reachable by strangers | Fails: the login port is public | Works | Works |
| No new server to run and patch | Works | Fails: someone runs the hub | Works |

Only the mesh VPN passes every row, which is why the Administrator chose Tailscale and why the rest of this chapter explains how it works.

Port forwarding is the approach a tutorial reaches for first, and it is the one this course does not use. A login service open to the whole internet receives guessing attempts within minutes of appearing, and exposing a DGX that way endangers the machine and the network it sits on.

### Home Router

A **home router** is the device that connects a local network to the internet and gives the devices behind it private addresses. It also performs network address translation, or NAT: many devices on the private side share one public address, and the router keeps a table that records which internal device each outgoing conversation belongs to.

NAT has a consequence that explains the whole chapter. A reply to a conversation you started is allowed back in, because the router remembers it. A new connection that arrives unprompted has no entry in the table, so the router drops it. Two machines behind two routers therefore cannot simply connect to each other: each router sees an unsolicited connection and refuses it.

| Step | What happens | Result |
|---|---|---|
| 1 | The laptop at `192.0.2.10` opens a connection to a website | The router records the conversation and sends it out under its public address |
| 2 | The website replies | The router finds the record and forwards the reply to the laptop |
| 3 | A stranger sends a packet to the router's public address | There is no record, so the router drops it |
| 4 | The DGX's router receives an unsolicited connection from the laptop's router | Also no record, so it is dropped |

The addresses in this chapter come from the ranges reserved for documentation, such as `192.0.2.0/24` and `198.51.100.0/24`. A real address never appears in this book.

## SSH

### SSH

**SSH**, short for Secure Shell, is a protocol for logging in to another computer and running commands there over an encrypted connection. The machine you want to reach runs an SSH server, your machine runs an SSH client, and the two negotiate encryption before anything is sent. The server listens on port 22 by default, and it is what runs underneath nearly every remote administration task on Linux.

The simplest use is a single command run on the remote machine, with its output printed on yours. The command below logs in as `<user>` on `<dgx-host>`, runs `hostname`, prints the result, and returns. The two angle-bracketed names are placeholders, and the book uses them for every login and every address.

```bash
ssh <user>@<dgx-host> hostname
```

The first time you connect, the client asks whether you trust the server's key, and later sessions skip the question. That prompt is the subject of the next concept, because answering it carelessly defeats the point of the protocol.

### Host Key Fingerprint

A **host key fingerprint** is a short value derived from the server's public key that identifies the server. The first time you connect, your client shows the fingerprint and asks you to accept it. It stores the key in a file called `known_hosts`, and on every later connection it checks that the server presents the same key.

The check protects against someone placing themselves between you and the server. If the key suddenly differs, the client refuses to continue and prints a loud warning. The warning has two ordinary causes and one serious one: the machine was reinstalled, its disk image was cloned onto another machine, or something is intercepting the connection. A fingerprint is useful only if you compare it, once, with a value the administrator gave you through another channel.

### SSH Key Pair

An **SSH key pair** is two linked files: a private key that stays on your machine and a public key that you give to servers. A server holding your public key can check that you hold the matching private key without the private key ever crossing the network. The check replaces a password, and it cannot be guessed by trying passwords against a login prompt.

The public key goes into a file on the server named `authorized_keys`. Anyone who holds the private key can log in as you, so the private key is the secret, and the public key is safe to share.

### Ed25519 Key

An **Ed25519 key** is a key using a modern elliptic-curve signature scheme. It produces short keys, which are 68 characters when printed, it is fast, and it is the default recommendation for new SSH keys. The older RSA type is still accepted but needs far longer keys for comparable strength. Create one with `ssh-keygen -t ed25519`.

The command writes two files in `~/.ssh`: `id_ed25519`, the private key, and `id_ed25519.pub`, the public key. The permissions on the private file matter, and SSH refuses a key that other users on the machine can read.

### ssh-copy-id

**`ssh-copy-id`** installs your public key on a server's `authorized_keys` file. It logs in once with your password, appends the key, and sets the correct permissions. It is the standard way to move from password login to key login.

```bash
ssh-copy-id <user>@<dgx-host>
```

Run it once for each machine you want to reach. After it succeeds, the next login needs no password.

### Passphrase-Free Key

A **passphrase** is a password that encrypts the private key file on disk, so a stolen file is useless without it. A **passphrase-free key** has no such protection: the file alone is enough to log in. It is what makes unattended login possible, since a script cannot type a passphrase.

This is a trade, not a mistake, and the design choice in this evaluation was made knowingly. The scripts and the agent that ran the benchmark logged in unattended, so the key had no passphrase. The price is that the file on the laptop is as sensitive as a password.

!!! mascot-warning "A Key With No Passphrase Is a Password in a File"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Anyone who copies the private key file can log in as you from anywhere, with nothing to guess. Keep it only on the machine that needs it, never commit it to a repository, and tell the administrator that you installed a key on their machine so they can remove it when the project ends.

### Unattended SSH Login and BatchMode

**Unattended SSH login** is a login that needs no person: the client authenticates with the key and runs the command. **BatchMode** is the SSH option that makes this explicit. It tells the client never to prompt for a password or a passphrase, and to fail at once if a prompt would be needed.

That failure is the useful property. A script that hangs waiting for a prompt nobody can see wastes hours, and a script that fails with an error in a second does not. The command below is also the standard test that key login works.

```bash
ssh -o BatchMode=yes <user>@<dgx-host> hostname
```

If it prints the machine's name, key login works. If it prints `Permission denied`, the key is not installed or is not the one the client offered.

!!! mascot-tip "Always Test Key Login With BatchMode"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A normal `ssh` can fall back to asking for a password and appear to work, which hides a broken key. Add `-o BatchMode=yes` to the test and it either succeeds silently or tells you which part failed.

### SSH Port Forward

An **SSH port forward** carries traffic for one network port through an SSH connection, so a service on the remote machine appears as though it were on your own. In the first benchmark runs the model server on the DGX listened only on that machine's own loopback address, which no other machine can reach. A forward made it reachable from the laptop.

The command has three parts that need explaining before you read it. `-N` tells SSH not to run a remote command and only hold the tunnel open. `-L` creates the forward and takes the form `local-port:destination:destination-port`. The destination is resolved on the remote side, so `127.0.0.1` there means the DGX itself.

```bash
ssh -N -L 11434:127.0.0.1:11434 <user>@<dgx-host>
```

While that command runs, a request to port 11434 on the laptop reaches the model server on the DGX, and the traffic travels inside the encrypted SSH connection. Port 11434 is the port the Ollama model server uses by default. Chapter 13 sets it up.

### Host Hygiene

**Host hygiene** is the set of habits that keep a remote-access setup from becoming a liability. For this course five are enough.

- **Keep private keys private.** Never copy `id_ed25519` to another machine, a chat, or a repository.
- **Use one key per purpose.** A separate key for the DGX project can be revoked without affecting anything else.
- **Remove what you added.** When the project ends, delete your public key from the server's `authorized_keys` and ask the administrator to remove the account.
- **Tell the owner.** Installing a key on a machine you do not own is a change to their security, and they are entitled to know.
- **Read the output before saving it.** A pasted SSH session contains hostnames and addresses. Chapter 23 builds the review that catches them.

## Mesh VPNs

### Mesh VPN

A **VPN**, or virtual private network, is an encrypted virtual network built on top of the internet, so that devices far apart behave as if they shared one private local network. A **mesh VPN** is one in which every device can connect directly to every other device, with no central machine that all traffic must pass through.

The structure matters because a conventional VPN is hub-and-spoke: every device connects to one server, and traffic between two devices goes through it. A mesh removes the middle. The comparison below uses the three machines of this evaluation: the laptop and two DGX units.

| | Hub-and-spoke VPN | Mesh VPN |
|---|---|---|
| Path from laptop to a DGX | Laptop → hub → DGX | Laptop → DGX |
| Number of hops | Two | One |
| What fails if one machine fails | The hub takes everything down | Only that machine |
| Who runs central infrastructure | You | A coordination service, which carries no traffic |
| Direct links among 3 devices | 3, all via the hub | 3, each direct |

The number of possible links among \( n \) devices is \( n(n-1)/2 \). Three devices have 3 pairs and ten devices have 45, which is why configuring a mesh by hand does not scale and why the coordination step in the next sections exists.

### WireGuard

**WireGuard** is a VPN protocol built around a small set of modern cryptographic choices and a short code base. Each device has a key pair, and a connection is defined by listing the other device's public key and the address to reach it at. It runs over UDP, it encrypts with ChaCha20-Poly1305, and it has been part of the Linux kernel since version 5.6, so on a current DGX OS the protocol is already present.

A minimal configuration shows what WireGuard asks of a person. Three things need defining before you read it. The `[Interface]` block describes this device, and its `Address` is the private address it takes inside the VPN. A `[Peer]` block describes one other device, identified by its public key. `AllowedIPs` lists the addresses that may be sent to that peer, and `Endpoint` is where the peer can be reached on the real network.

```ini
[Interface]
PrivateKey = <laptop-private-key>
Address    = 100.x.y.z/32

[Peer]
PublicKey  = <dgx-public-key>
AllowedIPs = 100.x.y.z/32
Endpoint   = <dgx-public-address>:51820
```

Every placeholder above is a value that someone has to generate, copy to the right place, and keep current. For two devices behind home routers it is worse: the `Endpoint` line assumes the DGX has a fixed public address that accepts connections, which a device behind a home router does not. WireGuard secures the connection and leaves finding and keying the peers to you.

### Tailscale

**Tailscale** is a service and a set of client programs that build a WireGuard mesh automatically. It does the work the configuration above asks of a person: it generates each device's keys, distributes the public keys to the devices that should have them, discovers each device's current address, and arranges the connection across the routers. The client software is open source, and the coordination service that ties devices together is hosted.

A device joins by signing in with an identity, and from then on the other devices in the same network can find it by name or by a private address. In this evaluation the laptop signed in with an account the Administrator had invited, and the two DGX units were already members, so a single status command listed all three. Chapter 9 performs those steps.

| What you would do by hand with WireGuard | What Tailscale does |
|---|---|
| Generate a key pair on each device | The client generates it at first start |
| Copy each public key to every peer | The coordination service distributes it |
| Find each peer's current public address | The coordination service tracks it |
| Open a path through two routers | The clients negotiate it, with a relay as fallback |
| Write and update a config file per device | None, the clients keep it current |

### Tailnet

A **tailnet** is a private network of devices and users managed together under one Tailscale account or organization. Devices in a tailnet get stable private addresses from a reserved range that starts `100.`, and they get names that resolve only inside the tailnet. Only members can reach one another, and the administrator of the tailnet controls who is a member and what each may reach.

A tailnet also has a name, in the form `<tailnet-name>.ts.net`, which is part of every machine's full name. Like an address, it is a detail that helps a stranger locate the network, so it is a placeholder in this book.

Membership gives a device four things, and each one is a place where a setting can go wrong later.

- **A stable private address.** The device keeps it as it moves between networks, so a script written against the address or name keeps working from a coffee shop or an office.
- **A name.** Names resolve only inside the tailnet, through a feature called MagicDNS that Chapter 9 configures.
- **Access rules.** The tailnet's administrator can restrict which devices and users may reach which machines and ports, using an access control list.
- **A key that expires.** A device's credentials last for a period and then must be renewed, so a machine that has not been touched in months may have silently dropped off the network.

The machines in this evaluation sat in a tailnet that the Administrator ran. That is the fact behind two later cautions: the Administrator decides who joins, and the evaluator's laptop is a guest on a network the evaluator does not control.

## How the Connection Is Built

### Coordination Plane and Data Plane

Tailscale's design separates two jobs that a conventional VPN combines. The **coordination plane** is the exchange of information needed to set up connections: who the devices are, their public keys, where they can currently be reached, and which devices are allowed to reach which. The **data plane** is the traffic itself: the packets that carry your commands, your prompts, and a model's replies.

The two planes use different paths. Coordination goes between each device and the coordination service. Data goes between the devices, and does not pass through the service.

| | Coordination plane | Data plane |
|---|---|---|
| Carries | Public keys, addresses, access rules | Your SSH sessions, prompts, and replies |
| Goes between | A device and the coordination service | The two devices |
| Volume | Tiny | As much as you send |
| What the service learns | Identities, keys, and addresses | Nothing about the content |

!!! mascot-thinking "The Service Introduces You and Then Steps Aside"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of the coordination service as a mutual friend who tells two strangers each other's names and phone numbers, then leaves the room. It knows who talked to whom, and it never hears the conversation. The privacy of your prompts rests on that second half, and it is why the data plane has to be encrypted device to device.

### NAT Traversal and the Peer-to-Peer Connection

**NAT traversal** is the set of techniques for opening a direct path between two devices that are each behind a router performing NAT. Recall that a router drops a connection nobody inside asked for, and that it accepts replies to conversations that started from inside. The traversal exploits that rule.

Following the sequence shows how it works. Each device learns, from the coordination service, the other's public address. Both then send a packet to the other's address at about the same moment. Each router sees an outgoing packet and records an entry for it, and each incoming packet from the other side now matches that entry and is let through. The result is a **peer-to-peer connection**: the two devices exchange packets directly, with no one between them.

The data plane then carries every packet encrypted by WireGuard, so the routers on the path see only that two public addresses exchanged data.

### DERP Relay

Sometimes the direct path cannot be opened: a strict firewall may block outgoing UDP, or a router may allocate a different port for each destination in a way the technique cannot predict. For those cases Tailscale runs relay servers called **DERP** servers, short for Designated Encrypted Relay for Packets. The two devices connect outward to a relay, and the relay forwards their packets.

Two properties make the relay safe to use. The packets are already encrypted by the devices, so the relay forwards data it cannot read. And the relay is only a fallback: the clients keep probing, and as soon as a direct path becomes possible they switch to it. A relayed connection is slower, because the traffic takes a longer route, and the status listing marks such connections so you can see which one you have.

The evaluation's laptop reached the DGX units across two home routers, and the status listing for one unit showed a relay in use instead of a direct connection. Chapter 9 shows how to read that listing.

#### Diagram: Tailscale Connection Path


<iframe src="../../sims/tailscale-connection-path/main.html" width="100%" height="604px" scrolling="no"></iframe>
[Run Tailscale Connection Path Fullscreen](../../sims/tailscale-connection-path/main.html)

<details markdown="1">
<summary>Tailscale Connection Path</summary>
Type: microsim
**sim-id:** tailscale-connection-path<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain how two devices behind NAT build an encrypted connection by predicting the path for 3 scenarios and assigning 3 messages to the coordination plane or the data plane, with at least 5 of 6 correct.

**Prerequisites:** home router, NAT traversal, peer-to-peer connection, DERP relay, coordination plane, data plane (all defined in the sections above this block).

**Evidence of Mastery:** The learner first steps through the five connection steps listed in Content. The learner then answers 6 items before any answer is revealed: three path predictions ("Direct" or "Relay") and three message assignments ("Coordination plane" or "Data plane"). An item is correct when the choice equals the Correct answer column. Mastery is 5 of 6 correct on the first attempt. Stepping through is exploration, not evidence.

**Misconceptions:** (1) The coordination service carries or can read the traffic. (2) A relay can read the traffic it forwards. (3) Two devices behind routers can never connect directly. (4) A relayed connection is not encrypted.

**Instructional Rationale:** Understand-level explaining needs the learner to predict an outcome from the mechanism, so the path items are cases where the correct answer follows from the NAT and UDP rules of the chapter. Separating the planes in a second set of items checks that the learner assigns each message to the right path.

**Content:**

The five steps the learner steps through, in order:

1. Both devices sign in to the coordination service and give it their public keys.
2. The service gives each device the other's public key and its candidate addresses.
3. Each device sends packets to the other's addresses at the same moment, so each router creates a table entry for the conversation.
4. If those packets get through, the devices talk directly. If they do not, both connect outward to a relay.
5. Everything the devices exchange is encrypted by the devices themselves, so neither the relay nor the service can read it.

The six items:

| # | Item shown to the learner | Choices | Correct answer | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Laptop and DGX are each behind an ordinary home router. | Direct or Relay | Direct | Ordinary NAT allows the simultaneous-send technique to open both routers. |
| 2 | The laptop is on a network whose firewall blocks all outgoing UDP. | Direct or Relay | Relay | The direct path uses UDP, so the encrypted packets go through a relay instead. |
| 3 | Laptop and DGX are on the same local network. | Direct or Relay | Direct | They can reach each other's local addresses without leaving the network. |
| 4 | A device uploads its public key. | Coordination plane or Data plane | Coordination plane | It is setup information exchanged with the service. |
| 5 | A packet carrying part of a model's reply. | Coordination plane or Data plane | Data plane | It is traffic between the two devices. |
| 6 | The list of which devices may reach which. | Coordination plane or Data plane | Coordination plane | Access rules are distributed by the service to the devices. |

**Provenance:** The items are synthetic, written for this exercise, and the sim labels them "synthetic example". The mechanism comes from the sections of this chapter above.

**Rules:** A connection is Direct when a UDP path can be opened between the two devices, and Relay otherwise. A relay forwards only encrypted packets. Items are shown in the fixed order 1 to 6, and each item allows one final choice.

**Learner Activity:**

1. The learner presses Next to move through the five steps, with the devices, routers, service, and relay shown and the current step's message highlighted.
2. After step 5 the learner begins the six items and reads item 1.
3. For each item the learner chooses one of the two answers and confirms.
4. The sim shows the correct answer and the Why text, and marks the item correct or incorrect.
5. After item 6 the sim shows the score and the misconception behind each miss.

**Feedback:** Six items, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct answer and the Why text. The final score reads "n of 6 correct".

**Starting State:** The five-step walkthrough is at step 1 with the two devices, their routers, and the coordination service shown, and the question on screen is "How do these two devices end up able to talk?"

**Chapter Anchors:** The chapter states that a router drops unsolicited connections, that NAT traversal makes both routers create entries by sending at the same moment, that a relay forwards packets it cannot read, and that coordination carries keys, addresses, and rules while data carries content.
</details>

## What Each Party Can See

The reason to understand the path is to know who can see what. The table assigns each party on the way from the laptop to the DGX to its role.

| Party | What it can see | Why |
|---|---|---|
| The laptop's router | That encrypted packets go to a public address | It forwards packets and sees no content |
| The coordination service | Which devices exist, their public keys, and addresses | It runs the coordination plane |
| A DERP relay, if used | Encrypted packets and the two endpoints | It forwards without the keys |
| The DGX's router | That encrypted packets arrive from a public address | Same as the first router |
| The two devices | Everything | They hold the keys |

## Chapter Summary

Remote access to a machine behind a home router fails by default, because the router drops connections nobody inside asked for. SSH gives an encrypted login, and a key pair gives a login that a script can use, at the price of a private key that must be protected like a password. A mesh VPN solves the routing problem: WireGuard provides the encryption, and Tailscale automates the key distribution, address discovery, and NAT traversal, falling back to an encrypted relay when a direct path cannot be opened. The coordination plane sets up the connection and the data plane carries the traffic, and the two are separate paths.

!!! mascot-celebration "You Can Trace the Whole Path"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now follow a command from your laptop through two routers to the DGX, say which party sees what, and explain why the privacy of your prompts does not depend on trusting the coordination service. Chapter 8 builds the Python environment that the tooling will live in.

[See Annotated References](./references.md)

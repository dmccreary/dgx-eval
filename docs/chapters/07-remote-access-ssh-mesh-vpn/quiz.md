# Quiz: Remote Access, SSH, and Mesh VPN Concepts

Test your understanding of SSH, key-based login, mesh VPNs, and the connection path between a laptop and a DGX with these review questions.

---

#### 1. What distinguishes a mesh VPN from a hub-and-spoke VPN?

<div class="upper-alpha" markdown>
1. Each device connects directly to the others, with no central hub
2. All traffic passes through one central server that someone must run
3. The router forwards a public port to each member device
4. Devices connect without encryption inside a private range
</div>

??? question "Show Answer"
    The correct answer is **A**. A mesh VPN is one in which every device can connect directly to every other device, with no central machine that all traffic must pass through. A conventional VPN is hub-and-spoke: traffic between two devices goes through one server, and if the hub fails everything goes down. In a mesh the path from laptop to DGX is one hop, and the coordination service that sets up connections carries no traffic.

    **Concept Tested:** Mesh VPN

    **See:** [Mesh VPN](index.md#mesh-vpn)

---

#### 2. In an SSH key pair, which key is the secret, and where does the other one go?

<div class="upper-alpha" markdown>
1. The public key is secret; the private key goes in `known_hosts`
2. Both keys are secret and both stay in `~/.ssh` on the laptop
3. The private key is secret; the public key goes in `authorized_keys`
4. The private key is copied to the server; the public key stays on the laptop
</div>

??? question "Show Answer"
    The correct answer is **C**. An SSH key pair is two linked files. The private key stays on your machine and is the secret: anyone who holds it can log in as you. The public key is safe to share and goes into the server's `authorized_keys` file. The server uses it to check that you hold the matching private key, without the private key ever crossing the network. `known_hosts` is a different file, where the client stores server keys.

    **Concept Tested:** SSH Key Pair

    **See:** [SSH Key Pair](index.md#ssh-key-pair)

---

#### 3. What is a tailnet?

<div class="upper-alpha" markdown>
1. A relay server that forwards encrypted packets between peers
2. A private network of devices and users under one Tailscale account
3. A WireGuard configuration file listing each peer's public key
4. A public address range that home routers assign to devices
</div>

??? question "Show Answer"
    The correct answer is **B**. A tailnet is a private network of devices and users managed together under one Tailscale account or organization. Its devices get stable private addresses from a reserved range that starts `100.` and names that resolve only inside the tailnet. Only members can reach one another, and the tailnet's administrator controls who is a member and what each may reach. A relay that forwards encrypted packets is a DERP server, a separate idea.

    **Concept Tested:** Tailnet

    **See:** [Tailnet](index.md#tailnet)

---

#### 4. Why can two machines behind two home routers not simply connect to each other?

<div class="upper-alpha" markdown>
1. Home routers block all encrypted traffic by default
2. Each router drops incoming connections it has no record of
3. The two machines are assigned the same private address
4. SSH servers refuse logins that arrive from another network
</div>

??? question "Show Answer"
    The correct answer is **B**. A home router performs NAT: many private devices share one public address, and the router keeps a table of the conversations that started from inside. A reply to such a conversation is let back in. A new connection that arrives unprompted has no entry in the table, so the router drops it. Two machines behind two routers each look like an unsolicited connection to the other's router, so neither gets through.

    **Concept Tested:** Home Router

    **See:** [Home Router](index.md#home-router)

---

#### 5. What does Tailscale add to WireGuard?

<div class="upper-alpha" markdown>
1. Automatic key distribution, address discovery, and NAT traversal
2. A stronger encryption scheme that replaces WireGuard's own
3. A central server through which all device traffic is routed
4. Password-based login for devices that have no key pair
</div>

??? question "Show Answer"
    The correct answer is **A**. WireGuard secures a connection and leaves finding and keying the peers to you: someone must generate keys, copy public keys, and know each peer's reachable address. Tailscale builds a WireGuard mesh automatically. It generates each device's keys, distributes the public keys, discovers current addresses, and arranges the connection across the routers. It does not replace WireGuard's encryption, and its coordination service carries no device traffic.

    **Concept Tested:** Tailscale

    **See:** [Tailscale](index.md#tailscale)

---

#### 6. Why does the privacy of your prompts not depend on trusting the coordination service?

<div class="upper-alpha" markdown>
1. Data travels encrypted between the devices, not through the service
2. The service deletes every prompt as soon as it has finished forwarding it
3. The service runs on hardware that the tailnet's owner controls
4. Prompts are sent only while the coordination service is offline
</div>

??? question "Show Answer"
    The correct answer is **A**. Tailscale separates two jobs. The coordination plane exchanges setup information between each device and the service: public keys, addresses, and access rules. The data plane carries your SSH sessions, prompts, and replies directly between the two devices, encrypted by WireGuard, and it does not pass through the service. The service learns identities, keys, and addresses, and nothing about the content. It knows who talked to whom and never hears the conversation.

    **Concept Tested:** Data Plane

    **See:** [Coordination Plane and Data Plane](index.md#coordination-plane-and-data-plane)

---

#### 7. You want to confirm that key login works before a script depends on it. Which command is the standard test?

<div class="upper-alpha" markdown>
1. `ssh-copy-id <user>@<dgx-host>`, then enter the password
2. `ssh <user>@<dgx-host> hostname`, with no extra options
3. `ssh -o BatchMode=yes <user>@<dgx-host> hostname`
4. `ssh-keygen -t ed25519`, then read the files in `~/.ssh`
</div>

??? question "Show Answer"
    The correct answer is **C**. BatchMode tells the SSH client never to prompt for a password or passphrase and to fail at once if a prompt would be needed. The command prints the machine's name if key login works and `Permission denied` if the key is not installed or is not the one offered. A plain `ssh` can fall back to asking for a password and appear to work, which hides a broken key, so it is not a reliable test.

    **Concept Tested:** BatchMode

    **See:** [Unattended SSH Login and BatchMode](index.md#unattended-ssh-login-and-batchmode)

---

#### 8. While `ssh -N -L 11434:127.0.0.1:11434 <user>@<dgx-host>` runs, where does a request to port 11434 on the laptop go?

<div class="upper-alpha" markdown>
1. To port 11434 on the laptop itself, since `127.0.0.1` is local
2. To port 22 on the DGX, where the SSH server answers it
3. To the coordination service, which then relays it to the DGX
4. To the model server on the DGX, through the SSH connection
</div>

??? question "Show Answer"
    The correct answer is **D**. An SSH port forward carries traffic for one port through an SSH connection. `-N` holds the tunnel open without running a remote command, and `-L` takes the form `local-port:destination:destination-port`. The destination is resolved on the remote side, so `127.0.0.1` there means the DGX itself, not the laptop. A request to port 11434 on the laptop therefore reaches the model server on the DGX, traveling inside the encrypted SSH connection.

    **Concept Tested:** SSH Port Forward

    **See:** [SSH Port Forward](index.md#ssh-port-forward)

---

#### 9. A status listing shows that your laptop reaches a DGX unit through a DERP relay instead of a direct connection. What should you conclude?

<div class="upper-alpha" markdown>
1. The relay can read the session, so stop sending prompts
2. The coordination service is now carrying all of the traffic
3. The unit's device key has expired and must be renewed
4. The traffic is still encrypted by the devices but is slower
</div>

??? question "Show Answer"
    The correct answer is **D**. A DERP relay is the fallback when a direct path cannot be opened, for example when a firewall blocks outgoing UDP. The packets are already encrypted by the devices, so the relay forwards data it cannot read. A relayed connection is slower because the traffic takes a longer route, and the clients keep probing and switch to a direct path as soon as one becomes possible. The coordination service still carries no traffic.

    **Concept Tested:** DERP Relay

    **See:** [DERP Relay](index.md#derp-relay)

---

#### 10. The person running the benchmark cannot change the DGX's router, and the machine must not be reachable by strangers. Why does port forwarding fail both constraints?

<div class="upper-alpha" markdown>
1. It cannot carry SSH traffic, which a mesh VPN can carry
2. It needs a router change and exposes the login port publicly
3. It requires a central hub that someone has to run and keep patched
4. It prevents scripts from connecting when no person is present to log in
</div>

??? question "Show Answer"
    The correct answer is **B**. Remote access can be arranged by port forwarding, a conventional VPN, or a mesh VPN, and they differ in what they expose. Port forwarding needs a change on the DGX's router, which the evaluator cannot make, and it opens the machine's login service to everyone on the internet, where guessing attempts arrive within minutes. Running a hub is the drawback of a conventional VPN. Only the mesh VPN passed every constraint in this evaluation.

    **Concept Tested:** Remote Access

    **See:** [Remote Access](index.md#remote-access_1)

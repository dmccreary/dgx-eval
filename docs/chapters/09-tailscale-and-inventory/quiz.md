# Quiz: Installing Tailscale and Taking a Read-Only Inventory

Test your understanding of installing Tailscale, signing in, proving the connection, and taking a read-only inventory with these review questions.

---

#### 1. Which two conda-forge packages does this course's Tailscale installation need?

<div class="upper-alpha" markdown>
1. `tailscale`, the client, and `tailscaled`, the daemon
2. `tailscale`, the client, and `wireguard`, the protocol
3. `tailscaled`, the daemon, and `openssh`, the login server
4. `tailscale`, the client, and `magicdns`, the name service
</div>

??? question "Show Answer"
    The correct answer is **A**. Tailscale installation here means installing the open-source command-line client and its daemon into a dedicated conda environment, so the tooling for reaching the DGX is isolated and removable. The two conda-forge packages are `tailscale`, the client, and `tailscaled`, the daemon. The client does nothing without the daemon, so install both at the same version. The test is that `tailscale version` and `tailscaled --version` print the same number.

    **Concept Tested:** Tailscale Installation

    **See:** [Tailscale Installation](index.md#tailscale-installation)

---

#### 2. What is a read-only inventory?

<div class="upper-alpha" markdown>
1. A backup of the machine's disk taken before any install
2. A list of the packages in a conda environment, with builds
3. A survey made with commands that change nothing on the machine
4. A log of every command an administrator has run on the unit
</div>

??? question "Show Answer"
    The correct answer is **C**. A read-only inventory is a survey of a machine's hardware and software made with commands that change nothing and need no administrator rights. It is the first thing to do on any machine you do not know, and the right first step on one that belongs to someone else, because it answers the hardware questions without asking permission to install anything. Commands such as `uname -srm`, `free -h`, and `df -h /` print a few lines and write nothing.

    **Concept Tested:** Read-Only Inventory

    **See:** [Read-Only Inventory](index.md#read-only-inventory)

---

#### 3. What does MagicDNS provide?

<div class="upper-alpha" markdown>
1. A name for each tailnet device that resolves to its private address
2. A public DNS record that lets anyone find the device online
3. A pre-generated credential that joins a device with no browser sign-in
4. A policy document listing who may reach which machine and port
</div>

??? question "Show Answer"
    The correct answer is **A**. MagicDNS gives every device in a tailnet a name that resolves to its private address, so you type a name and not an address. Names are stable even if the address changes, so a script written against the name keeps working. A short name resolves only from inside the tailnet, and names appear as placeholders in anything published. A pre-generated credential is an auth key, and a policy document is an access control list.

    **Concept Tested:** MagicDNS

    **See:** [MagicDNS](index.md#magicdns)

---

#### 4. Why must a Tailscale auth key be handled like a password?

<div class="upper-alpha" markdown>
1. It encrypts every packet exchanged inside the tailnet
2. It lets a device join the tailnet with no one signing in
3. It grants administrator rights on every machine in the tailnet
4. It can never be limited to one use or given an expiry
</div>

??? question "Show Answer"
    The correct answer is **B**. A Tailscale auth key is a pre-generated credential that lets a device join a tailnet without a person signing in through a browser. It exists for machines nobody sits at. Because it is equivalent to a password for joining the network, it must never go in a repository, a chat, a screenshot, or a log. Keys can be limited to one use and can expire, and a key that expires soon and works once is the one to prefer.

    **Concept Tested:** Tailscale Auth Key

    **See:** [Tailscale Auth Key](index.md#tailscale-auth-key)

---

#### 5. Why is `tailscale ping` a stronger test than `tailscale status`?

<div class="upper-alpha" markdown>
1. Ping proves that key-based SSH login works without a prompt
2. Ping restarts the daemon whenever a device shows as offline
3. Ping shows packets reach the device; status only lists it
4. Ping checks the SSH server; status checks the access rules
</div>

??? question "Show Answer"
    The correct answer is **C**. `tailscale status` lists the devices you can see with their address, owner, and connection state, so it shows that a device is listed. Tailscale ping tests the connection at the tailnet layer, below SSH: it sends a probe and reports the path used and the time taken, which shows that packets actually reach the device. Neither one proves the login works. That takes the third step, an SSH command run with BatchMode.

    **Concept Tested:** Tailscale Ping

    **See:** [Tailscale Ping and the Connectivity Test](index.md#tailscale-ping-and-the-connectivity-test)

---

#### 6. Why is piping a script over SSH the right method for an inventory?

<div class="upper-alpha" markdown>
1. It is read from standard input, so nothing is written to disk
2. The script runs with administrator rights on the remote machine
3. The script is installed permanently, so later runs start faster
4. The output is saved on the DGX, where the administrator can read it
</div>

??? question "Show Answer"
    The correct answer is **A**. Piping a script over SSH runs a local file on a remote machine without copying it there first. The shell on the DGX reads the script from its standard input, so nothing is written to the machine's disk, and the output is saved on your own machine. That suits an inventory because it leaves no trace and needs no permission to write anywhere. It does not grant administrator rights.

    **Concept Tested:** Piping Scripts Over SSH

    **See:** [Piping Scripts Over SSH](index.md#piping-scripts-over-ssh)

---

#### 7. `tailscale status` reports that it cannot connect to the daemon. What should you do first?

<div class="upper-alpha" markdown>
1. Ask the administrator to restart the DGX unit
2. Sign in again with the account that was invited
3. Reboot the home router to clear its NAT table
4. Check that `tailscaled` is running and restart it
</div>

??? question "Show Answer"
    The correct answer is **D**. The Tailscale daemon is the background process that creates the network interface, holds the encryption keys, and maintains the connections; the client only talks to it. If `tailscale status` cannot connect to the daemon, the cause is almost always that `tailscaled` is not running, for example after a reboot or a closed tab. Restart it in its own tab, with `sudo` and the full path to the binary, before suspecting the DGX, the router, or your account.

    **Concept Tested:** Tailscale Daemon

    **See:** [Tailscale Daemon](index.md#tailscale-daemon)

---

#### 8. After you run `tailscale up` and sign in, `tailscale status` lists only your own laptop. What should you check?

<div class="upper-alpha" markdown>
1. Whether the DGX's device key expired 180 days ago
2. Whether you signed in with the account that was invited
3. Whether `tailscaled` was started with the full binary path
4. Whether your SSH public key was installed with `ssh-copy-id`
</div>

??? question "Show Answer"
    The correct answer is **B**. Tailscale authentication proves who you are to the coordination service so that your device is added to the right tailnet. Signing in with a different account than the one the administrator invited creates or joins a different tailnet, and the DGX will not appear in your device list. If the listing shows only your own laptop, compare the account on the sign-in page with the one the invitation was sent to. An expired key would show a listed device as offline.

    **Concept Tested:** Tailscale Authentication

    **See:** [Tailscale Authentication](index.md#tailscale-authentication)

---

#### 9. Before a large model download, you want to know how much disk space is free and whether your account is in the `docker` group. Which pair of commands answers both?

<div class="upper-alpha" markdown>
1. `free -h` and `docker --version`
2. `lscpu` and `uname -srm`
3. `df -h /` and `id -nG`
4. `nvidia-smi` and `free -h`
</div>

??? question "Show Answer"
    The correct answer is **C**. The Linux inventory commands each answer one question and write nothing. `df -h /` reports the disk's size and free space, and `id -nG` lists your groups, which shows whether `docker` is among them. `free -h` reports memory, not disk, and `docker --version` only shows whether Docker is present. Running these before a long download is how you learn in five minutes whether a plan is possible.

    **Concept Tested:** Linux Inventory Commands

    **See:** [Linux Inventory Commands](index.md#linux-inventory-commands)

---

#### 10. In the three-step connectivity test, `tailscale status` lists the DGX and `tailscale ping` gets replies, but the BatchMode SSH command prints `Permission denied`. Which layer is at fault?

<div class="upper-alpha" markdown>
1. Your Tailscale daemon or your account
2. The network path between the two routers
3. The tailnet's access control list
4. The SSH server or your key
</div>

??? question "Show Answer"
    The correct answer is **D**. The connectivity test has three steps, each proving something the previous did not, so a failure tells you which layer to inspect. Status passing shows the device is listed and not offline, which clears your daemon and account. Ping passing shows packets reach the device, which clears the network path and the access rules. A failure at the third step, the BatchMode login, therefore points to the SSH server or your key.

    **Concept Tested:** Connectivity Test

    **See:** [Tailscale Ping and the Connectivity Test](index.md#tailscale-ping-and-the-connectivity-test)

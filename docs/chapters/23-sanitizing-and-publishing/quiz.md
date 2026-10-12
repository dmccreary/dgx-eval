# Quiz: Sanitizing Evaluation Artifacts and Publishing the Report

Test your understanding of device-identifying details, placeholders and redaction, scanning, git history, and the publication safety review with these review questions.

---

#### 1. What is the goal of sanitization, stated in terms of the reader?

<div class="upper-alpha" markdown>
1. The reader learns the method and findings, not how to reach the machine
2. The reader can reproduce the run on the same physical machine
3. The reader sees every raw log in full, with only the passwords taken out
4. The reader can verify each result by logging in to the device
</div>

??? question "Show Answer"
    The correct answer is **A**. Sanitization is the process of removing or replacing the details in an artifact that could identify, locate, or give access to a device or a person, so the artifact can be shared. The goal is stated in terms of the reader: someone who reads the artifact should learn how the evaluation was done and what it found, and nothing that makes the tested machine easier to find, reach, or log in to. It is a pipeline step with its own checks, not a final polish.

    **Concept Tested:** Sanitization

    **See:** [Sanitization](index.md#sanitization)

---

#### 2. What are documentation address ranges?

<div class="upper-alpha" markdown>
1. Addresses that a tailnet assigns to its member devices
2. Addresses that home routers give to devices behind them
3. Addresses that a scanner skips when it reads a repository
4. Addresses reserved so that examples never point at a real machine
</div>

??? question "Show Answer"
    The correct answer is **D**. Documentation address ranges are blocks of addresses reserved so that examples never point at a real machine. When an example needs an address that looks concrete, use one of them, such as `192.0.2.0/24` or `198.51.100.0/24`. A placeholder in angle brackets is clearer for a name, and a documentation range is clearer for an address that must still parse as one. A fake value that looks real is worse, because someone will eventually try it and a scan cannot tell it from a leak.

    **Concept Tested:** Documentation Address Ranges

    **See:** [Placeholder Conventions and Documentation Address Ranges](index.md#placeholder-conventions-and-documentation-address-ranges)

---

#### 3. Why must a serial number be redacted even though it grants no access?

<div class="upper-alpha" markdown>
1. It can be used in place of a password at the SSH login prompt
2. It identifies the physical unit and ties the document to it
3. It reveals which ports are open on the machine's firewall
4. It lets a stranger join the tailnet without needing an invitation
</div>

??? question "Show Answer"
    The correct answer is **B**. Hardware identifiers are values that identify a physical unit: serial numbers, GPU unique identifiers, and network card addresses. They are not secrets that give access, but they are identifying details that tie a document to one machine. A serial number sits in a system file on the machine, and a GPU's identifier is printed by a common command, so both slip into captured output easily. Open ports and firewall rules are a different category, access configuration.

    **Concept Tested:** Hardware Identifiers

    **See:** [Hardware Identifiers](index.md#hardware-identifiers)

---

#### 4. Why does this project keep raw run output in a directory outside the repository?

<div class="upper-alpha" markdown>
1. Nothing has to be removed, because it never entered the repository
2. The repository has a size limit that run logs would exceed
3. Git cannot store files that are written in JSON lines format
4. The logs must stay on the DGX so that the Administrator can read them
</div>

??? question "Show Answer"
    The correct answer is **A**. Raw output isolation is keeping unsanitized output in a place that is never published, so that nothing has to be removed from the repository because it never entered it. In this project, run output lives under a directory in the home folder, outside the repository, and only a script that copies selected, safe files can bring anything in. This matters because git history persists: a file that was committed once stays readable in earlier commits.

    **Concept Tested:** Raw Output Isolation

    **See:** [Raw Output Isolation and Gitignore Rules](index.md#raw-output-isolation-and-gitignore-rules)

---

#### 5. You are sanitizing a status line that shows a tailnet address, the machine's full name, the administrator's account, and a remote endpoint that must still read as an address. Which replacements follow the book's conventions?

<div class="upper-alpha" markdown>
1. Invented values that look realistic, for all four of the fields
2. `100.x.y.z`, `<dgx-host>`, `<admin>`, and a documentation-range address
3. A blur over all four fields in a screenshot of the terminal
4. The real tailnet address, since it works only from inside the tailnet itself
</div>

??? question "Show Answer"
    The correct answer is **B**. Redaction replaces a detail in a specific artifact with a placeholder or removes it. Following the conventions, the tailnet address becomes `100.x.y.z`, the full name becomes `<dgx-host>`, and the administrator's account becomes `<admin>`. The remote endpoint takes an address from a documentation range, because a placeholder there would not read as an address. Invented realistic values are worse than placeholders, and a tailnet address still names a specific device in a specific network.

    **Concept Tested:** Redaction

    **See:** [Redaction and Sanitized Sample Output](index.md#redaction-and-sanitized-sample-output)

---

#### 6. You need a screenshot of a terminal for the report. Which steps should you follow?

<div class="upper-alpha" markdown>
1. Crop first, cover with a solid fill, then check at full size
2. Blur the prompt, then shrink the image so that details are small
3. Keep the full window, and cover only the password line
4. Capture the whole screen, and rely on the secret scanner
</div>

??? question "Show Answer"
    The correct answer is **A**. Screenshot redaction removes identifying details from an image, which carries more than the lines you meant to show: window titles, tab names, and a prompt with the username and hostname. Three rules cover most of it. Crop first, to the smallest region that makes the point. Cover with a solid fill, not a blur, because a blur can be partly reversed. And check the result at full size, including the edges, where a prompt line is easy to miss.

    **Concept Tested:** Screenshot Redaction

    **See:** [Screenshot Redaction](index.md#screenshot-redaction)

---

#### 7. A repository passes a `gitleaks` scan with no findings, yet a figure caption in a chapter contains the machine's hostname. Why did the scanner miss it?

<div class="upper-alpha" markdown>
1. The scanner reads only the files listed in `.gitignore`
2. The `--redact` flag removed the hostname from the report
3. The scanner checks only the commits older than the current one
4. A hostname in prose has no credential shape for it to match
</div>

??? question "Show Answer"
    The correct answer is **D**. Secret scanning runs a tool over files or history that looks for strings with the shape of a credential, and gitleaks has built-in rules for the common key and token formats. A scanner finds credentials with a known shape. It does not find an IP address in a paragraph or a hostname in a caption, so it is one layer and not the whole defense. A person's publication safety review exists to catch what patterns cannot.

    **Concept Tested:** Secret Scanning

    **See:** [Secret Scanning and gitleaks](index.md#secret-scanning-and-gitleaks)

---

#### 8. A log file was committed last week. Today you add `*.log` to `.gitignore`, but git still tracks the file and its changes. Why?

<div class="upper-alpha" markdown>
1. The pattern must list each log file by its full name
2. The `.gitignore` file applies only to the deployed site
3. A gitignore does nothing for a file that is already tracked
4. The pre-commit scan re-adds any files that match its patterns
</div>

??? question "Show Answer"
    The correct answer is **C**. Gitignore rules list patterns that git will refuse to add, so a careless `git add .` cannot pick up a log. A gitignore is a safety net and not a control. It does nothing for a file that is already tracked, and it will not stop an explicit `git add -f`. The committed log also remains in the repository's history, so adding the pattern afterward neither untracks the file nor removes what was already recorded.

    **Concept Tested:** Gitignore Rules

    **See:** [Raw Output Isolation and Gitignore Rules](index.md#raw-output-isolation-and-gitignore-rules)

---

#### 9. A log excerpt has had every hostname and address replaced, yet it still reveals an account name on dozens of lines. Where is the name coming from?

<div class="upper-alpha" markdown>
1. The model tag that appears on each line of the run log
2. The documentation-range addresses left in the excerpt
3. The version numbers of the driver and the server
4. The home directory paths on lines that touch a file
</div>

??? question "Show Answer"
    The correct answer is **D**. A home directory path is a file path that begins with a user's home directory, and it carries the username. A run log shows `/home/<user>/...` on every line that touches a file, so a single excerpt can reveal an account name dozens of times even after hostnames and addresses are gone. Replace the home directory with a placeholder, or prefer paths relative to the project root, which carry no account at all.

    **Concept Tested:** Home Directory Paths

    **See:** [Home Directory Paths](index.md#home-directory-paths)

---

#### 10. An access token was committed and pushed to the public repository an hour ago. Which response is best justified?

<div class="upper-alpha" markdown>
1. Delete the file in a new commit and push it at once
2. Rewrite history with a force-push and tell no one
3. Stop, tell the repository's owner, and rotate the token
4. Add the file's pattern to `.gitignore` and carry on
</div>

??? question "Show Answer"
    The correct answer is **C**. Git history persistence means a commit stays in history after a later commit removes its content, and clones, forks, and the deployed site keep their own copies. So the order of operations is fixed: stop and tell the person responsible for the repository, and do not try to hide the leak with a quick follow-up commit. Treat the credential as compromised and rotate it, because removing it from history does not un-expose it. Rewriting history is a last resort.

    **Concept Tested:** Git History Persistence

    **See:** [Git History Persistence](index.md#git-history-persistence)

# Concept List

The numbered concepts below are the nodes of the learning graph for
*DGX Evaluation for Textbook Generation*. Each number is the ConceptID used in
`learning-graph.csv`. Most sections follow the 16 topics in the
[course description](../course-description.md). Three sections hold concepts
taken from the book's own pages: *Prerequisite Skills*, *Candidate Models Under
Evaluation*, and *Testing Architecture and Containment*.

The course is DGX-model-agnostic, so the hardware concepts list both branches of
each variation (CPU architecture and memory layout) and not the specifications
of any one DGX model.

## Prerequisite Skills

1. Command Line Basics
2. Python Scripting Basics
3. Git Version Control
4. GitHub Repository
5. Generative AI Assistant Use

## Intelligent Textbooks and the Generation Pipeline

6. Intelligent Textbook
7. Levels of Intelligent Textbooks
8. Course Description
9. Learning Graph
10. Concept Dependency
11. Directed Acyclic Graph
12. Concept Taxonomy
13. Chapter Content
14. MicroSim
15. Glossary
16. FAQ
17. Quiz
18. ibook-skills Skill Chain
19. MkDocs Material
20. Markdown Source Files
21. Static Site Build
22. Bloom's Taxonomy
23. Learning Outcomes
24. Course Description Quality Score
25. Concept Impact Score
26. Elaboration Budget
27. Word-Count Targets
28. Anti-Padding Rules
29. Content Generation Guide
30. AGENTS.md File
31. Learning Graph Viewer
32. Foundational Concepts
33. MkDocs Navigation
34. Lesson Plan
35. MicroSim Status Levels
36. p5.js
37. vis-network
38. Iframe Embedding
39. Data-Driven MicroSim

## Small Language Models

40. Generative AI Model
41. Large Language Model
42. Frontier Model
43. Small Language Model
44. Parameter Count
45. Token
46. Tokenizer
47. Context Window
48. Inference
49. Open-Weight Model
50. Open-Source License
51. Model License Terms
52. Model Family
53. Llama Family
54. Qwen Family
55. Gemma Family
56. Mistral Family
57. Phi Family
58. Model Card
59. Long-Form Writing
60. Structured Output
61. Tool Calling
62. Code Generation
63. Instruction Following
64. Multimodal Model
65. Image Input
66. Reasoning Mode
67. Tokens per Word

## Local SLMs Versus Cloud LLM Services

68. Local Model Deployment
69. Cloud LLM Service
70. Anthropic Claude
71. OpenAI ChatGPT
72. Google Antigravity
73. Devin
74. Agentic Framework
75. Privacy
76. Data Sovereignty
77. Rate Limits
78. Service Availability
79. Vendor Lock-In
80. Version Pinning
81. Operational Burden
82. Hybrid Workflow
83. Cloud Baseline
84. Frontier Model Capability Gap
85. Model Deprecation
86. Offline Operation
87. Data Egress Trace
88. Supervision Data Exposure

## Cost, Price, and Quality Tradeoffs

89. Cost
90. Price
91. Quality
92. Capital Cost
93. Depreciation
94. Electricity Cost
95. Administration Time
96. Per-Token Pricing
97. Subscription Pricing
98. Per-Seat Pricing
99. Total Cost of Ownership
100. Fixed Costs
101. Variable Costs
102. Cost per Chapter
103. Break-Even Volume
104. Quality-Adjusted Cost
105. Cost Model
106. Utilization Rate
107. Hardware Lifespan
108. Sensitivity Analysis
109. Setup Labor
110. Operations Labor
111. Idle Power Draw
112. Cost per Textbook
113. Books per Year
114. Profit Margin
115. Margin Versus Markup
116. Service Price Calculation
117. Human Review Cost
118. Whole-Book Time Estimate

## NVIDIA DGX Hardware Architecture

119. NVIDIA DGX
120. DGX Product Family
121. CPU Architecture
122. x86_64 Architecture
123. aarch64 Architecture
124. CPU Core Count
125. System RAM
126. GPU
127. GPU Configuration
128. Multi-GPU System
129. Dedicated GPU Memory
130. Unified Memory
131. Memory Bandwidth
132. Storage Capacity
133. Storage Read Speed
134. NVMe Storage
135. Power Draw
136. Thermal Design Power
137. Thermals
138. DGX OS
139. NVIDIA Driver
140. CUDA
141. Compute Capability
142. Hardware Variation Branching
143. DGX Spark
144. NVIDIA GB10
145. Blackwell Architecture
146. CUDA Cores

## Secure Remote Access with Tailscale

147. Remote Access
148. Mesh VPN
149. WireGuard
150. Tailscale
151. Tailnet
152. Coordination Plane
153. Data Plane
154. Peer-to-Peer Connection
155. DERP Relay
156. Tailscale Installation
157. Tailscale Authentication
158. Tailscale Auth Key
159. Device Key Expiry
160. MagicDNS
161. SSH
162. SSH Key Pair
163. Tailscale SSH
164. Access Control List
165. Tailscale Status Command
166. Tailscale Ping
167. Connectivity Test
168. Tailscale Serve
169. Endpoint Sharing
170. Host Hygiene
171. Tailscale Daemon
172. Tailscale Up Command
173. Tailnet Invitation
174. Node Sharing
175. Host Key Fingerprint
176. Ed25519 Key
177. Passphrase-Free Key
178. ssh-copy-id
179. Unattended SSH Login
180. BatchMode
181. SSH Port Forward
182. NAT Traversal
183. Home Router
184. Administrator Privileges
185. System Administrator

## Reproducible Python Environments with Conda

186. Python Environment
187. Environment Isolation
188. Miniforge
189. Conda
190. pip
191. Conda Create Command
192. Conda Activate Command
193. Conda List and Export
194. Conda Remove Command
195. Python Version Pinning
196. Conda Versus pip
197. environment.yml
198. requirements.txt
199. Package Channel
200. Architecture-Specific Wheels
201. PyTorch
202. CUDA-Enabled PyTorch
203. Environment Rebuild
204. Reproducibility
205. Install Script
206. Dedicated Tool Environment

## Python Hardware Probes

207. Hardware Probe
208. Probe Script
209. psutil
210. nvidia-smi
211. nvidia-smi Output
212. NVML
213. NVML Python Bindings
214. CPU Probe
215. RAM Probe
216. Storage Probe
217. Disk Read Benchmark
218. GPU Probe
219. GPU Memory Total and Free
220. Driver Version Probe
221. CUDA Version Probe
222. GPU Temperature
223. GPU Power Draw
224. Machine-Readable Report
225. JSON Report
226. Probe Suite
227. Redacted-by-Default Fields
228. PyTorch CUDA Check
229. Probe Verification Test
230. Unified Memory Probe
231. Read-Only Inventory
232. Linux Inventory Commands
233. Standard-Library-Only Python
234. Piping Scripts Over SSH
235. Vitals Logging

## Model Sizing and Model Fit

236. Model Weights
237. Dense Model
238. Mixture of Experts
239. Active Parameters
240. Numeric Precision
241. Bytes per Weight
242. FP16 and BF16
243. Quantization
244. Quantization Level
245. 8-Bit Quantization
246. 4-Bit Quantization
247. GGUF Format
248. Safetensors Format
249. Size on Disk
250. KV Cache
251. Context Length Memory
252. Runtime Overhead
253. Safety Headroom
254. Memory Estimation Formula
255. Model-Fit Calculation
256. Model-Fit Calculator
257. Fit Verdict
258. Unified Memory Fit
259. Bits per Parameter
260. Memory for Weights
261. Quantized File Overhead

## Selecting and Installing an Open-Weight Model

262. Model Selection Criteria
263. Hugging Face Hub
264. Model Repository
265. License Review
266. Model Download
267. Checksum Verification
268. Storage Management
269. Model Shortlist
270. Model Leaderboard
271. Tool-Calling Reliability
272. Writing Quality
273. Model Comparison
274. Gated Model Access
275. Access Token Handling
276. Model Cache Directory
277. Ollama Model Library
278. Apache 2.0 License
279. Commercial Use Terms
280. Publisher Provenance
281. Public Benchmark Score
282. Publisher Claims
283. Exclusion Rationale

## Candidate Models Under Evaluation

284. qwen3.8:27b
285. gemma4:31b
286. muse-glimmer:30b
287. qwen3.6:35b
288. gemma4:26b
289. nemotron-3.5-lightning:30b
290. mistral-medium-3.5:128b
291. gpt-oss:120b
292. devstral-small-2:24b
293. granite4.2:30b
294. Nemotron Family
295. gpt-oss Family
296. Granite Family

## Inference Servers

297. Inference Server
298. Ollama
299. llama.cpp
300. vLLM
301. Runtime Installation
302. Runtime Configuration
303. GPU Offload
304. Model Loading
305. Local API Endpoint
306. OpenAI-Compatible API
307. Chat Completions Endpoint
308. localhost Binding
309. curl Request
310. Python Client
311. First-Prompt Smoke Test
312. Server Logs
313. Background Service
314. Model Keep-Alive
315. User-Space Installation
316. Release Archive
317. tmux Session
318. Anthropic-Compatible API
319. Batched Serving
320. Prompt Re-Reading

## AI Agent Harnesses and Skills

321. AI Agent Harness
322. Agent Loop
323. Tool Definition
324. File Editing Tool
325. Shell Execution Tool
326. Permission Model
327. Context Management
328. Context Compaction
329. System Prompt
330. Subagent
331. Agent Skill
332. SKILL.md Format
333. Skill Loading
334. Skill Installation
335. Claude Code
336. OpenCode
337. Codex CLI
338. Goose
339. Local Endpoint Connection
340. Harness Configuration
341. Skill Execution Verification
342. Harness Compatibility Test
343. Harness Prompt Overhead
344. Skill Defect Correction

## Testing Architecture and Containment

345. Orchestrator
346. Role Separation
347. Harness on Laptop
348. Harness on DGX
349. Docker
350. Docker Group Membership
351. NVIDIA Container Toolkit
352. Harness Container
353. Container Sandbox
354. Non-Root Container User
355. Read-Only Skill Mount
356. Placeholder Credential
357. Telemetry Disabled
358. Host Network Mode
359. Network Sandbox Gap
360. Network Boundary
361. Packet Capture Verification
362. Memory Watchdog
363. System Freeze

## Optimizing SLM Performance

364. Performance Optimization
365. Quantization Tradeoffs
366. Context Length Setting
367. Batch Size
368. Concurrency
369. Prompt Caching
370. Sampling Parameters
371. Temperature Setting
372. Top-p and Top-k
373. Tokens per Second
374. Time to First Token
375. Prompt Processing Speed
376. Throughput
377. Latency
378. Model Load Time
379. GPU Utilization
380. GPU Monitoring
381. Thermal Throttling
382. Memory Pressure
383. Out-of-Memory Error
384. Turn Overhead
385. Agent Turn
386. Peak Context Size
387. Context Truncation

## Objective Evaluation Methodology

388. Evaluation Question
389. Independent Variable
390. Controlled Variables
391. Uncontrolled Variable
392. Fixed Inputs
393. Repeated Runs
394. Run Variance
395. Sample Size
396. Metric Selection
397. Scoring Rubric
398. Logging
399. Bias in Evaluation
400. LLM-as-Judge
401. Blind Human Review
402. Reproducible Experiment
403. Baseline Comparison
404. Fair Comparison
405. Experimental Design Critique
406. Limitations Statement
407. Explicit Assumptions
408. Measured Versus Assumed Values
409. Provisional Results
410. Design Decision Record
411. Decision Attribution
412. Negative Result Reporting
413. Two-Layer Testing
414. Model-Only Test
415. Harness Smoke Test
416. Control Run
417. Scoring Check Calibration
418. Structural Checks
419. Automated Quality Score
420. Human Quality Score
421. Retest After Fix
422. Evaluation Status Tracking
423. Run Time Limit
424. Long-Context Recall Test
425. Schema-Constrained JSON
426. Reading Level Measure
427. Faithfulness to Description
428. Dependency Reasoning
429. Markdown Validity
430. MicroSim Code Correctness
431. Mathematical Notation

## Running the Textbook Benchmark and Reporting

432. Textbook Benchmark
433. Benchmark Runner
434. Pipeline Stage
435. Stage Sensitivity
436. Per-Stage Metrics
437. Skill Completion Rate
438. Tool-Call Success Rate
439. Build Success
440. Structural Validity
441. Wall-Clock Time
442. Time Breakdown
443. Energy per Textbook
444. Failure Diagnosis
445. Context Overflow
446. Malformed Tool Call
447. Harness Misconfiguration
448. Baseline Textbook
449. Textbook Preview
450. DGX Sufficiency Judgment
451. Evaluation Report
452. Report Structure
453. Recommendation
454. Local Cloud or Hybrid Decision
455. Capstone Evaluation
456. Algebra I Benchmark
457. Benchmark Workspace Template
458. Stage Prompt
459. Standing Approval Answer
460. Stage Chaining
461. Per-Chapter Generation Run
462. Chapter Completion Criterion
463. Chapter Dependency Check
464. Reference Book for Scale
465. Run Event Stream
466. Run Report
467. Tool Call Count
468. Failed Tool Calls
469. Duplicate Concept Labels
470. Orphaned Concepts
471. Dependency Cycle Check
472. CSV-JSON Agreement
473. Label Length Limit
474. Required Output Files
475. Navigation Entries
476. Strict Site Build
477. Run Output Retrieval
478. Results Publishing
479. Text-Emitted Tool Call
480. Premature Turn Termination
481. Task Loss

## Sanitizing Evaluation Artifacts Before Publication

482. Sanitization
483. Device-Identifying Details
484. IP Address
485. Hostname
486. Tailnet Name
487. Usernames and Passwords
488. Keys and Tokens
489. Hardware Identifiers
490. Access Configuration
491. Redaction
492. Placeholder Conventions
493. Documentation Address Ranges
494. Secret Scanning
495. gitleaks
496. Pre-Commit Scan
497. Git History Persistence
498. Screenshot Redaction
499. Publication Safety Review
500. Sanitized Sample Output
501. Raw Output Isolation
502. Hosts via Environment Variable
503. Public Repository Risk
504. Gitignore Rules
505. Identifiers in System Files
506. Home Directory Paths

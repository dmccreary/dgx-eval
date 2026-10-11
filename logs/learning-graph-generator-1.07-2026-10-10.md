# Learning Graph Generator Session Log

- **Skill:** learning-graph-generator, version 1.07
- **Date:** 2026-10-10
- **Book:** DGX Evaluation for Textbook Generation
- **Result:** 506 concepts, 824 dependencies, 14 taxonomy categories

## Program Versions

| Program | Version | Role |
|---|---|---|
| `csv-to-json.py` | 1.05 | CSV to `learning-graph.json`, with CIS scores |
| `analyze-graph.py` | no version string in file | Quality metrics report |
| `taxonomy-distribution.py` | no version string in file | Distribution report |
| `validate-learning-graph.py` | no version string in file | JSON Schema validation |
| `add-taxonomy.py` | not used | The taxonomy was assigned by section, with a one-off script kept in the session scratchpad |

The skill's programs were run in place from the skill directory, with this
book's files passed as paths. They were not copied into `docs/learning-graph/`,
because `AGENTS.md` keeps code out of `docs/`.

## Steps

1. **Step 1, course description assessment:** skipped. `quality_score` in the
   course description frontmatter is 100, above the 85 threshold.
2. **Step 2, concept list:** 331 concepts from the course description, in 16
   topic sections. The author then asked for a scan of the existing markdown
   files; 175 concepts were added from the book's own pages, giving 506. The
   generated Algebra I output under `docs/models/` was excluded.
3. **Step 3, dependencies:** written by label and resolved to IDs by a script,
   which rejects unknown labels, self-dependencies, and unmapped concepts.
   Result: 12 foundational concepts and 824 edges.
4. **Step 4, quality validation:** valid DAG, no cycles, no orphans, one
   connected component, 38.1% terminal nodes, longest chain 16, average 1.67
   dependencies per concept.
5. **Steps 5 to 6, taxonomy:** 14 categories, none above 10% of concepts.
   `taxonomy-names.json` and `color-config.json` written.
6. **Steps 7 to 9, JSON:** `metadata.json` written; `learning-graph.json`
   generated and validated against the schema. The top concepts by CIS are
   Large Language Model, Parameter Count, Inference, Small Language Model,
   Local Model Deployment, and Command Line Basics, all genuinely foundational.
7. **Step 10, distribution report:** every category passes the 30% threshold.
8. **Step 11, index page:** `index.md` built from the template.
9. **Navigation:** the four generated pages were added to `nav:` in
   `mkdocs.yml`.

## Decisions Recorded

- The concept list is the source of truth for IDs. Any change to it after the
  CSV was built requires rebuilding the CSV, because dependencies are keyed by
  number.
- Candidate model names and the DGX Spark hardware appear as concepts because
  the book's own pages report them. Remove them from the concept list to make
  the graph model-agnostic.
- No address, hostname, login, or token appears in any generated file.

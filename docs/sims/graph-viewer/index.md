---
title: Learning Graph Viewer
description: An interactive viewer for the learning graph each model generated in the benchmark, with search, category filters, and a chooser to switch between models.
status: built
hide:
  - toc
---
# Learning Graph Viewer

[Open Learning Graph Viewer Fullscreen (recommended)](./main.html){ .md-button .md-button--primary }

<iframe src="./main.html" width="100%" height="700px" scrolling="no"></iframe>

This viewer shows the learning graph a model generated for the Algebra I
benchmark. Choose a model in the sidebar to load its graph.

## Choosing a Graph

The viewer reads the name of the graph from its address:

| Address | Graph shown |
|---|---|
| `main.html?model=gemma4-26b` | The graph that model produced, from `docs/models/gemma4-26b/learning-graph/learning-graph.json` |
| `main.html` | This book's own graph. If the book has none, the first model in the list |

A model's id is its name with the colon written as a hyphen. The list of
models with a graph is in `docs/models/models.json`, which
`src/reporting/publish_results.py` writes.

## Using the Viewer

1. **Search for concepts.** Type in the search box, then click a result to
   focus on that node.
2. **Filter by category.** Use the checkboxes to show or hide a group of
   concepts. "Check All" and "Uncheck All" change every group at once.
3. **Move around the graph.** Drag to pan and scroll to zoom. Click a node to
   highlight its connections. The menu button collapses the sidebar.
4. **Read the statistics.** The sidebar counts the visible nodes, the visible
   edges, and the foundational concepts.

## Graph Structure

- **Foundational concepts** have no prerequisites.
- **Edges** point from a concept to the concepts it depends on.
- **Larger boxes** are concepts that more of the course depends on.

The viewer is the standard one from the `book-installer` skill, version 1.04,
with the model parameter and chooser added for this book.

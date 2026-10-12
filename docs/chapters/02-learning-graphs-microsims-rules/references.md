# References: Learning Graphs, MicroSims, and Content Generation Rules

1. [Directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Wikipedia - Defines DAGs and covers their mathematical properties, computational problems, and applications. Explains the structure of a learning graph, in which no concept may depend on itself through any chain of prerequisites.

2. [Topological sorting](https://en.wikipedia.org/wiki/Topological_sorting) - Wikipedia - Describes ordering a DAG's vertices so every edge points forward, with Kahn's algorithm and depth-first search. Shows why any valid chapter order is derived from dependencies rather than authored.

3. [Knowledge space](https://en.wikipedia.org/wiki/Knowledge_space) - Wikipedia - Summarizes the mathematical model in which a prerequisite partial order defines states of knowledge and the fringe of what a learner is ready to study next. Gives theoretical grounding for storing concept dependencies as data.

4. Introduction to Algorithms (3rd Edition) - Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein - MIT Press - Teaches topological sort through the recurring example of Professor Bumstead putting on his clothes in a valid order, a dependency example many courses reuse. It makes prerequisite ordering and cycle detection concrete.

5. On Writing Well (30th Anniversary Edition) - William Zinsser - HarperCollins - Widely praised for its Simplicity and Clutter chapters, which show how cutting words that do no work strengthens prose. It is the human discipline behind the anti-padding rules, which prefer dense sections to word-target inflation.

6. [Directed Acyclic Graphs](https://networkx.org/documentation/stable/reference/algorithms/dag.html) - NetworkX Documentation - Reference for Python functions that test whether a graph is a DAG and compute topological order, ancestors, and descendants. Shows how a script can check a learning graph for cycles and trace which concepts depend on a given concept.

7. [The Theory Underlying Concept Maps and How to Construct and Use Them](https://cmap.ihmc.us/docs/theory-of-concept-maps) - IHMC - Novak and Cañas explain concept maps, in which concepts joined by labeled linking phrases form propositions organized around a focus question. Gives the educational background for representing a course's concepts and their relationships as a graph.

8. [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) - vis.js - Documents the canvas-based Network library, including nodes, edges, layout, physics, interaction options, and events. Describes the library that draws this book's interactive learning graph viewer from a list of nodes and edges.

9. [createSlider()](https://p5js.org/reference/p5/createSlider/) - p5.js Reference - Reference entry for the built-in slider control, with its minimum, maximum, value, and step parameters. Shows the kind of built-in control that this book requires in MicroSims instead of hand-drawn widgets.

10. [Creating Exams](https://www.cmu.edu/teaching/assessment/assesslearning/creatingexams.html) - Carnegie Mellon University Eberly Center - Advice on writing multiple-choice items, including one best answer, plausible distractors drawn from common student errors, and matching item types to learning objectives. Applies to the quiz rules that tie each question to a concept.

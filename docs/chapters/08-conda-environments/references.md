# References: Reproducible Python Environments with Conda

1. [Conda (package manager)](https://en.wikipedia.org/wiki/Conda_%28package_manager%29) - Wikipedia - Describes conda as a cross-platform package and environment manager, its channels, and its relation to Anaconda, Miniconda, and Miniforge. It frames the chapter's choice of conda and Miniforge for isolated environments.

2. [Pip (package manager)](https://en.wikipedia.org/wiki/Pip_%28package_manager%29) - Wikipedia - Explains pip as Python's package installer that fetches packages from the Python Package Index, with its history and command-line interface. It supports the chapter's conda-versus-pip rule and its requirements.txt discussion.

3. [Dependency hell](https://en.wikipedia.org/wiki/Dependency_hell) - Wikipedia - Describes how packages needing incompatible versions of a shared library break one another, and lists solutions. It is the problem that the chapter's environment isolation and one-environment-per-tool rule solve.

4. Effective Python: 125 Specific Ways to Write Better Python (3rd Edition) - Brett Slatkin - Addison-Wesley - Item 117 makes a self-contained case for virtual environments that give isolated and reproducible dependencies, in the book's short numbered-item format. It is a concise rationale for the chapter's disposable, rebuildable environments.

5. Deep Learning with PyTorch - Eli Stevens, Luca Antiga, and Thomas Viehmann - Manning Publications - A widely used PyTorch introduction that starts from the tensor and includes a section on moving tensors to the GPU. It clarifies the CPU-versus-GPU distinction behind the chapter's CUDA-enabled PyTorch check.

6. [Managing environments](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html) - conda documentation - Official guide to creating, activating, cloning, exporting, and removing environments, including environment.yml files and the --from-history flag. It is the reference for every conda command in the chapter.

7. [Miniforge](https://github.com/conda-forge/miniforge) - conda-forge - README for the minimal conda installer that makes conda-forge its default and only channel, including a Linux aarch64 build. It documents the installer the chapter uses on the Arm-based DGX.

8. [A brief introduction to conda-forge](https://conda-forge.org/docs/user/introduction/) - conda-forge - Explains the community channel, how to add it with strict channel priority, and which platforms it builds for. It supports the chapter's rule to name the channel explicitly in every specification.

9. [Get Started Locally](https://pytorch.org/get-started/locally/) - PyTorch - Official installer selector that offers CUDA, ROCm, or CPU builds with matching pip commands, and shows how to check a GPU with torch.cuda.is_available(). It is the source for the chapter's CUDA-enabled PyTorch check.

10. [Platform compatibility tags](https://packaging.python.org/en/latest/specifications/platform-compatibility-tags/) - Python Packaging User Guide - Specifies the Python, ABI, and platform tag triple, including manylinux tags, that installers use to choose a compatible wheel. It explains the filename anatomy behind the chapter's architecture-specific wheels.

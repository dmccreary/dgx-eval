#!/bin/bash
# Build script for the SLM textbook-generation paper
# Uses Tectonic for modern LaTeX compilation (same as the MicroSims paper)
#
#   ./build.sh          build main.pdf
#   ./build.sh clean    remove build artifacts
#   ./build.sh numbers  regenerate figures and data/paper-numbers.json first
#
# The figure and number generator lives in src/reporting/ because it reads the
# evaluation's scored output; see src/README.md.

set -e  # Exit on error

# Change to the paper directory
cd "$(dirname "$0")"

echo "Building SLM textbook-generation paper..."
echo "========================================="
echo ""

# Check if tectonic is installed
if ! command -v tectonic &> /dev/null; then
    echo "Error: Tectonic is not installed."
    echo "Install with: brew install tectonic"
    exit 1
fi

if [ "$1" == "clean" ]; then
    echo "Cleaning build artifacts..."
    rm -f main.pdf main.aux main.log main.out main.bbl main.blg
    echo "Clean complete."
    exit 0
fi

if [ "$1" == "numbers" ]; then
    echo "Regenerating figures and numbers..."
    /usr/local/Caskroom/miniforge/base/envs/mkdocs/bin/python ../../src/reporting/make_paper_figures.py
    echo ""
fi

# Run tectonic
echo "Running tectonic..."
tectonic main.tex

# Check if PDF was generated
if [ -f "main.pdf" ]; then
    echo ""
    echo "Success! PDF generated: main.pdf"
    echo ""
    echo "File size: $(du -h main.pdf | cut -f1)"
    echo "Page count: $(pdfinfo main.pdf 2>/dev/null | grep Pages | awk '{print $2}')"
    echo ""
    echo "To view the PDF:"
    echo "  open main.pdf"
else
    echo ""
    echo "Error: PDF generation failed!"
    exit 1
fi

#!/bin/bash

ng build --output-path docs --base-href /portfolio/
# Angular separates distribution into browser and server folders.
# In order to serve on GitHub Pages, index.html and dependencies must
# be in root of docs folder.
mv docs/browser/* docs
rm -r docs/browser
rm -r docs/server
git add .
git commit -m "Build $(date +"%s")"
git push

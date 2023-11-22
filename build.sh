#!/bin/bash

ng build --output-path docs --base-href /portfolio/
# Override GitHub's 404 page with index.html so it routes to
# the application's own 404 page.
cp docs/index.html docs/404.html
# Push commit to be built with GitHub Pages
git add .
git commit -m "Build $(date +"%Y-%m-%d %H:%M:%S")"
git push

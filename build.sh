#!/bin/bash

ng build --output-path docs --base-href /portfolio/
cp docs/browser/index.html docs/404.html
git add .
git commit -m "Build $(date +"%s")"
git push

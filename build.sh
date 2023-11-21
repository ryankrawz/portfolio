#!/bin/bash

ng build --output-path docs --base-href /portfolio/browser/
git add .
git commit -m "Build $(date +"%s")"
git push

#!/bin/bash

ng build --output-path docs --base-href /portfolio/
git add .
git commit -m "Build $(date +"%s")"
git push

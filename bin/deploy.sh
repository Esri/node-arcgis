#!/bin/bash
git branch -D gh-pages
git checkout -b gh-pages
npm run doc -- --PRD
git add -f doc-built/
git commit -m "deploy"
git push upstream `git subtree split --prefix doc-built gh-pages`:gh-pages --force
git reset --hard HEAD~1
git checkout master
git branch -D gh-pages
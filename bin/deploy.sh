#!/bin/bash
git branch -D gh-pages
git checkout -b gh-pages
npm run doc -- --PRD
git add -f doc-built/
git commit -m "deploy"
git subtree push --prefix doc-built upstream gh-pages -f
git reset --hard HEAD~1
git checkout master
git branch -D gh-pages
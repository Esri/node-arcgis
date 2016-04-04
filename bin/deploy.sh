#!/bin/bash
git branch -D gh-pages
git checkout -b gh-pages
npm run doc -- --PRD
cp -r docs/ ./
git add -f index.html
git add -f css/**.*
git add -f js/**.*
git add -f fonts/**.*
git add -f img/**.*
git add -f calcite-ui.*
git commit -m "deploy"
git push upstream gh-pages -f
git reset --hard HEAD~1
git checkout master
git branch -D gh-pages
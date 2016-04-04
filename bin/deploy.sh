#!/bin/bash
git branch -D gh-pages
git checkout -b gh-pages
npm install
npm run doc -- --PRD
cp -r docs/ ./
rm -r node_modules
git add -f *
git commit -m "deploy"
git push origin gh-pages -f
git reset --hard HEAD~1
git checkout master
git branch -D gh-pages
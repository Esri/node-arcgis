#!/bin/bash
git branch -D gh-pages
git checkout -b gh-pages
npm install
npm run build -- --PRD
npm run cp
npm run sass
cp -r build/ ./
rm -r node_modules
git add -f *
git commit -m "deploy"
git push origin gh-pages -f
git reset --hard HEAD~1
git checkout master
git branch -D gh-pages
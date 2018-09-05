#!/bin/bash
cd ..
repo=$(git remote get-url --push origin)
rm -rf .git
git init
git add --all
git commit -m "first commit with new code base"
git remote add origin ${repo}
git branch --set-upstream-to origin/master
git config --global credential.helper cache
# https://stackoverflow.com/questions/6565357/git-push-requires-username-and-password
git push --force origin master


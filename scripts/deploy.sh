#!/bin/bash
echo "Starting deployment"
echo "Target: gh-pages branch"

CURRENT_COMMIT=`git rev-parse HEAD`

echo "Compiling new static content"
mkdir /tmp/__temp_static_content
harp compile . /tmp/__temp_static_content
cp .gitignore /tmp/__temp_static_content

echo "Checking out gh-pages branch"
git checkout -B gh-pages

echo "Removing old static content"
git rm -rf '*'

echo "Copying newly generated static content"
cp -r /tmp/__temp_static_content/* . || exit 1
cp /tmp/__temp_static_content/.gitignore . || exit 1

echo "Pushing new content back to gh-pages"
git config user.name "Travis-CI"
git config user.email "travis@jvandemo.com"

git add -A .
git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
git push --force --quiet origin gh-pages > /dev/null 2>&1 || exit 1

echo "Cleaning up temp files"
rm -Rf /tmp/__temp_static_content

echo "Deployed successfully."
exit 0

#!/bin/bash
echo "Starting deployment"
echo "Target: gh-pages branch"

CURRENT_COMMIT=`git rev-parse HEAD`
ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_URL_WITH_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GH_TOKEN@github.com}

echo "Compiling new static content"
mkdir /tmp/__temp_static_content || exit 1
harp compile . /tmp/__temp_static_content || exit 1
cp .gitignore /tmp/__temp_static_content || exit 1

echo "Checking out gh-pages branch"
git checkout -B gh-pages || exit 1

echo "Removing old static content"
git rm -rf . || exit 1

echo "Copying newly generated static content"
cp -r /tmp/__temp_static_content/* . || exit 1
cp /tmp/__temp_static_content/.gitignore . || exit 1

echo "Pushing new content to $ORIGIN_URL_WITH_CREDENTIALS"
git config user.name "Travis-CI" || exit 1
git config user.email "travis@jvandemo.com" || exit 1

git add -A . || exit 1
git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
git push --force --quiet "$ORIGIN_URL_WITH_CREDENTIALS" gh-pages > /dev/null 2>&1

echo "Cleaning up temp files"
rm -Rf /tmp/__temp_static_content

echo "Deployed successfully."
exit 0

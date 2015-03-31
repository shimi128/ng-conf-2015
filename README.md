ng-conf 2015 website
====================

## Development

You need a recent version of node.js / npm installed on your machine.

1. Run `npm i -g gulp` to install gulp
2. Run `npm install` in the project directory
3. Run `gulp` to start a local development server with SASS task

Edit `web/index.html`, `src/styles.scss`.

## Deployment

To deploy run the following command:

    git subtree push --prefix web origin gh-pages


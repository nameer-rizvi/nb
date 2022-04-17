# nb

Node.js boilerplate. Features an opinionated project structure for hosting assets, database clients & controllers, jobs, an Express server and shared utility functions.

## Getting Started

As opinionated as the boilerplate code is, a trail of comments have been left to help make initial configuration settings changes easier so that there isn't a need to go through every single file before getting started.

`Ctrl/Cmd + F` on the "/src" folder for: `// --starterKit-flag`

## NPM Scripts

`npm run test`

Placeholder script to run tests.

`npm run lint`

Run ESLint on all JavaScript files and return a report on syntax warnings/errors.

_Recommended for maintaining code quality._

`npm run job-todo`

Manually run the todo job.

`npm run server`

Start Express server in development mode.

`npm run server-watch`

Start Express server in development mode with nodemon watching for file changes.

`npm run start`

Start Express server in production mode.

`npm run pm2-start`

Start 'forever' processes defined in ecosystem.config.js

`npm run pm2-restart`

Restart 'forever' processes defined in ecosystem.config.js

_[Click here to learn how to configure a PM2 ecosystem config.](https://pm2.keymetrics.io/docs/usage/application-declaration/)_

## Useful Packages

- To limit size of pm2 logs: https://github.com/keymetrics/pm2-logrotate

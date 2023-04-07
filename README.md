# nb

Node.js boilerplate. Features an opinionated project structure for hosting assets, database clients & controllers, cron jobs, an Express server and shared utility functions.

## Getting started

As opinionated as the boilerplate code is, a trail of comments have been left to help make initial configuration settings changes easier so that there isn't a need to go through every single file before getting started.

`Ctrl/Cmd + F` on the "/src" folder for: `// --starterKit-flag`

## Yarn scripts

`yarn test`

Placeholder script to run tests.

`yarn lint`

Run ESLint on all JavaScript files and return a report on syntax warnings/errors.

_Recommended for maintaining code quality._

`JOB=JOB_NAME yarn job`

Manually run a job.

`yarn server`

Start Express server in development mode.

`yarn server-watch`

Start Express server in development mode with nodemon watching for file changes.

`yarn start`

Start Express server in production mode.

`yarn pm2-start`

Start 'forever' processes defined in ecosystem.config.js

`yarn pm2-restart`

Restart 'forever' processes defined in ecosystem.config.js

## PM2 links

-   [Installation guide.](https://pm2.io/docs/runtime/guide/installation/)

-   [Configuring an ecosystem config.](https://pm2.keymetrics.io/docs/usage/application-declaration/)

-   [Log rotator.](https://github.com/keymetrics/pm2-logrotate)

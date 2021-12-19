# nb

Node.js boilerplate. Features an opinionated project structure for hosting database clients & controllers, microservices, an Express server and shared utility functions.

## Getting Started

As opinionated as the boilerplate code is, a trail of comments have been left to help make initial configuration settings changes easier so that there isn't a need to go through every single file before getting started.

`Ctrl/Cmd + F` on the "/src" folder for: `// --starterKit-flag`

## NPM Scripts

`npm run lint`

Run ESLint on all JavaScript files and return a report on syntax warnings/errors.

_Recommended for maintaining code quality._

`npm run microservice`

Start microservices.

`npm run server`

Start express server in development mode.

`npm run server-watch`

Start express server in development mode with nodemon watching for file changes.

`npm run start`

Start express server in production mode.

`npm run pm2-start`

Start 'forever' processes defined in ecosystem.config.js

`npm run pm2-restart`

Restart 'forever' processes defined in ecosystem.config.js

_[Click here to see how to configure a pm2 ecosystem config.](https://pm2.keymetrics.io/docs/usage/application-declaration/)_

# nb

**Node.js Boilerplate** – An opinionated project structure with batteries included.

## Yarn Scripts

### Update Dependencies

Update all dependencies in `package.json` that are specified with a version range (e.g., `^` or `~`).

```console
yarn update
```

### Lint Source Code

Run ESLint on the `/src` directory to check for syntax warnings and errors.

```console
yarn lint
```

### Run Tests

Execute the test suite. Customize this command to match your project's testing framework and configuration (e.g., Jest, Mocha).

```console
yarn test
```

### Test Database Client

Run tests for the database client class, verifying the functionality of all database-related methods.

```console
yarn test-db
```

### Start Redis Server

Start the Redis server. Ensure Redis is installed and configured on your system.

```console
yarn redis
```

### Run Custom Scripts

Execute custom scripts by specifying the script names as a comma-separated environment variable.

```console
SCRIPT=<script-names> yarn script
```

### Build Stylesheet

Compile the Tailwind CSS stylesheet and output it to `/server/router.static/css`. This command generates the CSS file based on the project's Tailwind configuration.

```console
yarn tw
```

### Run Tailwind CSS Server

Run the Tailwind CSS server in watch mode to automatically compile changes to the stylesheet in `/server/router.static/css` as you edit styles.

```console
yarn tw-dev
```

### Start Express Server

Start the Express server.

```console
yarn server
```

### Run Express Server in Development Mode

Start the Express server in `development` mode with `nodemon` watching for file changes.

```console
yarn server-dev
```

### Run Workers

Run workers defined in `/server/workers.js` or specified as comma-separated environment variables.

```console
CRONJOB=<cronjob-names> JOB=<job-names> yarn worker
```

### Run Workers in Development Mode

Run workers defined in `/server/workers.js` or specified as comma-separated environment variables in `development` mode with `nodemon` watching for file changes.

```console
yarn worker-dev
```

### PM2 Scripts

Start or restart 'forever' processes defined in ecosystem.config.js.

- Start processes:

```console
yarn pm2-start
```

- Restart processes:

```console
yarn pm2-restart
```

## Helpful Links

### Redis

- [Official Documentation](https://redis.io/docs/latest/)

- [Installation Guide](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)

- [Node.js and Redis](https://redis.io/learn/develop/node)

- ["Error: ECONNREFUSED"](https://stackoverflow.com/questions/8754304/redis-connection-to-127-0-0-16379-failed-connect-econnrefused)

### Nginx & Certbot

- [Nginx Documentation](https://nginx.org/en/docs/)

- [Certbot Setup for Nginx on Linux](https://certbot.eff.org/instructions?ws=nginx&os=pip)

- [Install Nginx on Amazon Linux 2023](https://awswithatiq.com/how-to-install-nginx-in-amazon-linux-2023/)

### PM2

- [PM2 Installation Guide](https://pm2.io/docs/runtime/guide/installation/)

- [Ecosystem Configuration](https://pm2.keymetrics.io/docs/usage/application-declaration/)

- [Log Rotation Setup](https://github.com/keymetrics/pm2-logrotate)

## Configuration Example

Example configuration for PM2:

```js
// ecosystem.config.js
const ecosystemConfig = {
  apps: [
    {
      name: "app",
      script: "./src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        TZ: "America/New_York",
      },
    },
  ],
};

module.exports = ecosystemConfig;
```

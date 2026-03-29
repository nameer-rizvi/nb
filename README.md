# nb

**Node.js Boilerplate** – An opinionated, batteries-included project structure for building Express servers and background workers.

## Features

- **Express 5** server with compression, CORS, Helmet security headers, and JWT auth
- **Tailwind CSS 4** with a CLI build step and watch mode
- **Redis** client integration
- **Worker** system with cron job support
- **PM2** ecosystem config for production process management
- **ESLint** for linting, **nodemon** for hot reloading in development

---

## Getting Started

```bash
git clone https://github.com/nameer-rizvi/nb.git
cd nb
yarn
```

Copy `.env.example` to `.env` and fill in your environment variables before running the server.

---

## Scripts

### Development

| Command           | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| `yarn dev`        | Run the Tailwind watcher and Express server concurrently in development mode |
| `yarn server-dev` | Run the Express server in development mode (nodemon)                         |
| `yarn tw-dev`     | Run the Tailwind CSS watcher                                                 |
| `yarn worker-dev` | Run workers in development mode (nodemon)                                    |

### Production

| Command       | Description                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| `yarn server` | Start the Express server                                                      |
| `yarn worker` | Run workers defined in `/src/worker/index.js`                                 |
| `yarn tw`     | Compile the Tailwind CSS stylesheet to `/src/server/router.static/css/tw.css` |

### Workers & Scripts

Run specific workers by passing names as environment variables:

```bash
CRONJOB=<cronjob-names> JOB=<job-names> yarn worker
```

Run custom scripts by specifying their names:

```bash
SCRIPT=<script-names> yarn script
```

### Utilities

| Command        | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| `yarn update`  | Update all `^`/`~` versioned dependencies in `package.json` |
| `yarn lint`    | Run ESLint on the project                                   |
| `yarn test`    | Run the test suite                                          |
| `yarn test-db` | Run database client tests                                   |
| `yarn redis`   | Start the Redis server                                      |

### PM2

Install and start all processes defined in `ecosystem.config.js`:

```bash
yarn pm2-start
```

Restart processes and pick up environment variable changes:

```bash
yarn pm2-restart
```

**Example `ecosystem.config.js`:**

```js
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

---

## References

### Redis

- [Documentation](https://redis.io/docs/latest/)
- [Installation](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)
- [Installing on AWS EC2](https://stackoverflow.com/a/78246670)
- [Node.js + Redis](https://redis.io/learn/develop/node)
- [Fix: `ECONNREFUSED` error](https://stackoverflow.com/questions/8754304/redis-connection-to-127-0-0-16379-failed-connect-econnrefused)

### Nginx & Certbot

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Certbot Setup for Nginx](https://certbot.eff.org/instructions?ws=nginx&os=pip)
- [Install Nginx on Amazon Linux 2023](https://awswithatiq.com/how-to-install-nginx-in-amazon-linux-2023/)

### PM2

- [Installation](https://pm2.io/docs/runtime/guide/installation/)
- [Ecosystem Config](https://pm2.keymetrics.io/docs/usage/application-declaration/)
- [Log Rotation](https://github.com/keymetrics/pm2-logrotate)

---

## License

MIT

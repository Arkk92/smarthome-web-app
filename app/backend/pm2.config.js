module.exports = {
  apps: [
    {
      name: "Smart Home Project",
      script: "./dist/app/presentation/express/settings/server.js",
      node_args: "-r ts-node/register -r tsconfig-paths/register",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

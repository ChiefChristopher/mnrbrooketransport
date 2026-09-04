module.exports = {
  apps: [
    {
      name: 'mnrbrooketransport',
      script: 'node_modules/.bin/vite',
      args: 'preview --port 3050 --host',
      cwd: './',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
    }
  ]
}

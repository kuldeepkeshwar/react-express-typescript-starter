const envDefaults = require('./env');

const env = Object.assign(envDefaults, {});
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'src', 'static', 'tools', 'types'],
      cwd: './dist',
      args: 'config=./../environment/config.json',
      env,
    },
  ],
};

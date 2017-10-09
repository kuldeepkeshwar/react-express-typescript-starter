const envDefaults = require('./env');

const env = Object.assign(envDefaults, {});
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/index.js',
      cwd: './dist',
      env,
    },
  ],
};

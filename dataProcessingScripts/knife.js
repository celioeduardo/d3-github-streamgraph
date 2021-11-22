const util = require('util');
const exec = util.promisify(require('child_process').exec);
const depends = require('./depends');

const knife = async () => {
  createDataDir();
  const commands = depends.map((repo) => gitLogCmd(repo));
  return Promise.all(commands);
};

const createDataDir = async () => {
  try {
    await exec('mkdir data');
  } catch {}
};

const gitLogCmd = async (repo) => {
  let command = `git log --pretty=format:"☕%h🔪%ad🔪%an🔪%s🔪%b" --date="iso" --no-merges --compact-summary > ../../data/${repo}.001.🔪sv`;
  return exec(command, { cwd: `repositories/${repo}` });
};

// Alternative way using await
const knife_await = async () => {
  createDataDir();
  for (i in depends) {
    const repo = depends[i];
    const command = `git log --pretty=format:"☕%h🔪%ad🔪%an🔪%s🔪%b" --date="iso" --no-merges --compact-summary > ../../data/${repo}.001.🔪sv`;
    await exec(command, { cwd: `repositories/${repo}` });
  }
};

module.exports = knife;

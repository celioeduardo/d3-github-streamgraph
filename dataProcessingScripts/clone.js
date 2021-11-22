const util = require('util');
const exec = util.promisify(require('child_process').exec);
const depends = require('./depends');

const clone = async () => {
  try {
    await exec('mkdir repositories');
  } catch {}

  const commands = depends.map((repo) => cloneCommand(repo));
  return Promise.all(commands);
};

cloneCommand = async (repo) => {
  let command = `git clone https://github.com/d3/${repo}.git`;
  return exec(command, { cwd: './repositories' })
    .then(() => console.log(`${command}`))
    .catch(() => console.log(`${command}`));
};

module.exports = clone;

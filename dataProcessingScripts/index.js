const clone = require('./clone');
const knife = require('./knife');
const json = require('./json');
const combine = require('./combine');
const aggregate = require('./aggregate');

// Clone the repositories
const run = async () => {
  console.log('Cloning...');
  await clone();

  // Convert to kniveSV files
  console.log('Knifing...');
  await knife();

  console.log('Converting to JSON...');
  json();

  console.log('Combining the output file...');
  combine();

  // Aggregate by week
  console.log('Aggregating...');
  aggregate();
};

run().then((_) => console.log('Done!'));

const fs = require('fs');
const d3 = require('d3');

const {
  timeParse,
  timeFormat,
  utcWeek,
  utcWeeks,
  group,
  stack,
  extent,
  stackOffsetWiggle,
  stackOrderAppearance,
} = d3;

const parseDate = timeParse('%Y-%m-%d');
const formatDate = timeFormat('%Y-%m-%d');

const layer = (d) => d.repo;

const aggregate = () => {
  // Load all commits
  const dataString = fs.readFileSync('data/all-d3-commits.json');
  let data = JSON.parse(dataString);

  console.log(`${data.length} commits loaded`);

  //data = data.filter(d => d.repo !== 'd3');
  data.forEach((d) => {
    d.date = utcWeek.floor(parseDate(d.date.split(' ')[0]));
  });

  // Aggregate by week and repository.
  const groupedData = group(data, (d) => d.date, layer);

  const layerGroupedData = group(data, layer);

  const layers = Array.from(layerGroupedData.keys());

  const [start, stop] = extent(data, (d) => d.date);

  console.log('Date range', start, stop);

  const allWeeks = utcWeeks(start, stop);

  const dataBylayer = new Map();

  const aggregatedData = {
    dates: allWeeks.map(formatDate),
    repositories: {},
  };
  for (let layer of layers) {
    const layerData = allWeeks.map((date) => {
      const value = groupedData.get(date);
      const commits = value ? value.get(layer) : null;
      const commitCount = commits ? commits.length : 0;
      return commitCount;
    });
    aggregatedData.repositories[layer] = layerData;
  }

  fs.writeFileSync(
    `../docs/aggregatedData.json`,
    JSON.stringify(aggregatedData)
  );
};

module.exports = aggregate;

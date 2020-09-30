d3.csv('cities.csv', (d) => {
  return {
    ...d, // spread operator
    eu: d.eu === 'true', // convert to boolean
    population: +d.population,
    x: +d.x,
    y: +d.y,
  };
}).then((data) => {
  data = data.filter((d) => d.eu == true);
  console.log('cities', data);

  d3.select('.city-count').text('Number of Cities: ' + data.length);

  const width = 700;
  const height = 550;
  const svg = d3
    .select('.population-plot')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  svg
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
      return d.x;
    })
    .attr('cy', function (d) {
      return d.y;
    })
    .attr('r', function (d) {
      if (d.population < 1000000) return 4;
      else return 8;
    })
    .attr('fill', 'skyblue');

  svg
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', (d, i) => d.x)
    .attr('y', (d, i) => d.y)
    .text((d, i) => {
      if (d.population >= 1000000) return d.country;
    })
    .attr('font-size', 11)
    .attr('text-anchor', 'middle')
    .attr('dy', -10);

  console.log('HELLO');
});

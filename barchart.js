d3.csv('buildings.csv', d3.autoType).then((data) => {
  data.sort((a, b) => {
    return b.height_ft - a.height_ft;
  });

  const width = 500;
  const height = 500;

  const svg = d3
    .select('.barchart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', (d) => {
      console.log('px', d.height_px);
      return d.height_px;
    })
    .attr('height', 40)
    .attr('x', (d, i) => {
      return 220;
    })
    .attr('y', (d, i) => {
      console.log(d);
      return (i * height) / data.length;
    })
    .attr('fill', 'orange');

  const labels = svg.selectAll('text').data(data).enter();

  // add Building name
  labels
    .append('text')
    .attr('x', 0)
    .attr('y', (d, i) => {
      console.log((i * height) / data.length);
      return (i * height) / data.length + 25;
    })
    .text((d) => {
      return d.building;
    });

  // add height label
  labels
    .append('text')
    .attr('x', (d) => 220 + d.height_px - 10)
    .attr('y', (d, i) => {
      return (i * height) / data.length + 25;
    })
    .text((d) => {
      return d.height_ft + ' ft';
    })
    .attr('text-anchor', 'end');
});

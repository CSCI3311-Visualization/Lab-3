d3.csv('buildings.csv', d3.autoType).then((data) => {
  data.sort((a, b) => {
    return b.height_ft - a.height_ft;
  });

  const width = 500;
  const height = 500;
  const maxHeight = data[0].height_px;

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
      return (d.height_px / maxHeight) * 250;
    })
    .attr('height', 40)
    .attr('x', 250)
    .attr('y', (d, i) => {
      return (i * height) / data.length;
    })
    .attr('fill', 'orange')
    .on('click', function (e, d) {
      d3.select('.image').attr('src', 'img/' + d.image);
      d3.select('.building').text(d.building).attr('font-size', 100);
      d3.select('.height').text(d.height_ft + ' ft');
      d3.select('.city').text(d.city);
      d3.select('.country').text(d.country);
      d3.select('.floors').text(d.floors);
      d3.select('.completed').text(d.completed);
    });

  // default load to Burj Khalifa
  d3.select('.image').attr('src', 'img/1.jpg');
  d3.select('.building').text('Burj Khalifa').attr('font-size', 100);
  d3.select('.country').text('United Arab Emirates');
  d3.select('.city').text('Dubai');
  d3.select('.height').text('2717 ft');
  d3.select('.floors').text('163');
  d3.select('.completed').text('2010');

  const labels = svg.selectAll('text').data(data).enter();

  // add Building name
  labels
    .append('text')
    .attr('x', 0)
    .attr('y', (d, i) => {
      return (i * height) / data.length + 25;
    })
    .text((d) => {
      return d.building;
    });

  // add height label
  labels
    .append('text')
    .attr('x', (d) => 250 + (d.height_px / maxHeight) * 250 - 10)
    .attr('y', (d, i) => {
      return (i * height) / data.length + 25;
    })
    .text((d) => {
      return d.height_ft + ' ft';
    })
    .style('fill', 'white')
    .attr('text-anchor', 'end');
});

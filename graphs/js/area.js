var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1515 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
/*var parseDate = d3.time.format("%y").parse;*/
var x = d3.scale.linear()
    .range([0, width]);
  
var y = d3.scale.linear()
    .range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
var area = d3.svg.area()
    .x(function(d) { return x(d.year); })
    .y0(height)
    .y1(function(d) { return y(d.value); });
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
function draw(data) {
//var data = data[country];
// format the data
data.forEach(function(d) {
   d.year = d.year;
   d.value = +d.value;
});


  x.domain(d3.extent(data, function(d) { return d.year/*>2500 ? d.year:2500;*/ }));
  //x.domain(data.map(function(d){return d.year;}));
  y.domain([0, d3.max(data, function(d) { return d.value>5 ? d.value:5; })]);
  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("values");
}
      d3.json("../../json/Part2.json", function(error, data) {
if (error) throw error;
// trigger render
draw(data)
})

var initStackedBarChart = {
	draw: function(config) {
		me = this,
		domEle = config.element,
		stackKey = config.key,
		data = config.data,
		margin = {top: 20, right: 20, bottom: 30, left: 100},
		parseDate = d3.timeParse("%m/%Y"),
		width = 4000 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom,
		xScale = d3.scaleBand().range([0, width]).padding(0.1),
		yScale = d3.scaleLinear().range([height, 0]),
		color = d3.scaleOrdinal(d3.schemeCategory20),
		xAxis = d3.axisBottom(xScale),
		yAxis =  d3.axisLeft(yScale),
		svg = d3.select("#"+domEle).append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var stack = d3.stack()
			.keys(stackKey)
			.order(d3.stackOrderNone)
			.offset(d3.stackOffsetNone);
	
		var layers= stack(data);
			/*data.sort(function(a, b) { return b.rural - a.rural; });*/
			xScale.domain(data.map(function(d) { return d.country; }));
			/*yScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return +d[0] + (+d[1]); }) ]).nice();*/
yScale.domain([0, d3.max(data, function (d) { return d.v > 60000000000 ? d.v : 60000000000; }) ]);
		var layer = svg.selectAll(".layer")
			.data(layers)
			.enter().append("g")
			.attr("class", "layer")
			.style("fill", function(d, i) { return color(i); });

		  layer.selectAll("rect")
			  .data(function(d) { return d; })
			.enter().append("rect")
			  .attr("x", function(d) { return xScale(d.data.country); })
			  .attr("y", function(d) { return yScale(+d[1]); })
			  .attr("height", function(d) { return yScale(+d[0]) - yScale(+d[1]); })
			  .attr("width", xScale.bandwidth());

			svg.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + (height+5) + ")")
			.call(xAxis);


			svg.append("g")
			.attr("class", "axis axis--y")
			.attr("transform", "translate(0,0)")
			.call(yAxis);							
	}
}

var key = ["rural", "urban"];

var data = d3.json("../../json/Part3.json", function(error, dat) {

data = dat;

initStackedBarChart.draw({
	data: data,
	key: key,
	element: 'stacked-bar'
})
})

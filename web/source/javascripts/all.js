//= require lodash
//= require d3
//= require angular
//= require_tree .

$(function () {

  var width = 400,
      height = width/2,
      radius = width/2,
      duration = 750

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(100);

  var pie = d3.layout.pie()
      .sort(null)
      .startAngle(-Math.PI/2)
      .endAngle(Math.PI/2)
      .value(function(d) { return d.probability });

  var svg = d3.select('svg#prediction')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height + ')');

  function update(data) {
      var arcs = svg.selectAll('.arc').data(pie(data));

      // create new elements

      var new_arcs = arcs.enter().append('g')
          .attr('class', function(d) { return 'arc ' + d.data.party })
          .each(function(d) { this._current = d });

      new_arcs.append('path')
          .attr('d', arc);

      new_arcs.append('text')
          .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')' })
          .attr('dy', '.35em')
          .style('text-anchor', 'middle')
          .text(function(d) { return d.data.party });

      // update existing elements

      arcs.select('path')
          .transition()
          .duration(duration)
          .attrTween('d', arcTween);

      arcs.select('text')
          .text(function(d) { return d.data.party })
          .transition()
          .duration(duration)
          .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')' });

      // remove elements without data

      arcs.exit().remove();
  }

  d3.select('#submit_text').on('click', function() {
      var text = d3.select('#text_query').node().value;
      console.log(text);
      d3.json('/predict')
          .header("Content-Type", "application/x-www-form-urlencoded")
          .post("text="+text, function(error, data) {
              console.log(data)
                  data = data.prediction
                  data.forEach(function(d) {
                      d.probability += d.probability
                  })

              update(data)
          });
  });

  d3.select('#submit_url').on('click', function() {
      var text = d3.select('#url_query').node().value;
      console.log(text)
      d3.json('/predict')
          .header("Content-Type", "application/x-www-form-urlencoded")
          .post("url="+text, function(error, data) {
              console.log(data)
                  data = data.prediction
                  data.forEach(function(d) {
                      d.probability += d.probability
                  })

              update(data)
          });
  });

  function arcTween(a) {
      var dataNode = d3.select(this.parentNode).node();
      var i = d3.interpolate(dataNode._current, a);
      dataNode._current = i(0);
      return function(t) {
          return arc(i(t));
      }
  }

});

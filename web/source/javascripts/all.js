//= require lodash
//= require victor
//= require d3
//= require jquery
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

  var svg = d3.select('#prediction svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height + ')');

  function update(data) {
      var arcs = svg.selectAll('.arc').data(pie(data));

      // create new elements

      var new_arcs = arcs.enter().append('g')
          .attr('class', function(d) { return 'arc ' + d.data.party })

      new_arcs.append('path')
          .attr('d', arc)
          .each(function(d) { this._current = d }); // for arc tween

      new_arcs.append('text')
          .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')' })
          .attr('dy', '.35em')
          .style('text-anchor', 'middle')
          .text(function(d) { return d.data.party });

      // update existing elements

      arcs.attr('class', function(d) { return 'arc ' + d.data.party })
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
      d3.json('/api/predict')
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
      if (!/^http/.test(text)) text = 'http://'+text;
      d3.select('#url_query').node().value = text;
      d3.json('/api/predict')
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

  update([
      {probability: 0.25, party: '?'},
      {probability: 0.25, party: '?'},
      {probability: 0.25, party: '?'},
      {probability: 0.25, party: '?'}
  ]);

  function arcTween(d, i, a) {
      var i = d3.interpolate(this._current, d);
      this._current = i(0);
      return function(t) {
          return arc(i(t));
      }
  }

});


app = angular.module 'pp', []

app.factory 'Network', ($q) ->
   $q.when
      articles: [
        {
          title: "Eins",
          url: "http://cdu.de",
          prediction: [{ party: "cdu", probability: 0.5 }, { party: "spd", probability: 0.2}, { party: "gruene", probability: 0.2}, { party: "linke", probability: 0.1}],
          predictedLabel: 'cdu'
        }
        {
          title: "Zwei",
          url: "http://spd.de",
          prediction: [{ party: "cdu", probability: 0.2 }, { party: "spd", probability: 0.4}, { party: "gruene", probability: 0.2}, { party: "linke", probability: 0.2}],
          predictedLabel: 'spd'
        }
        {
          title: "drei",
          url: "http://gruene.de",
          prediction: [{ party: "cdu", probability: 0.1 }, { party: "spd", probability: 0.1}, { party: "gruene", probability: 0.8}, { party: "linke", probability: 0.0}],
          predictedLabel: 'gruene'
        }
        {
          title: "vier",
          url: "http://linke.de",
          prediction: [{ party: "cdu", probability: 0.1 }, { party: "spd", probability: 0.1}, { party: "gruene", probability: 0.2}, { party: "linke", probability: 0.6}],
          predictedLabel: 'linke'
        }
      ],
      distances: [
        [0, 1, 0.3], # cdu zu spd
        [0, 2, 0.6], # cdu zu gruene
        [0, 3, 0.9], # cdu zu linke
        [1, 2, 0.2], # spd zu gruene
        [1, 3, 0.3], # spd zu linke
        [2, 3, 0.6], # gruene zu linke
      ]

app.directive 'networkChart', (Network) ->
  link: (scope, elem, attrs) ->
    # preparing
    width = 500
    height = 500

    diag = Math.sqrt(width**2+height**2)
    svg = d3.select(elem[0]).append('svg')
      .attr('width', width)
      .attr('height', height)
    force = d3.layout.force()
      .gravity(.05)
      .charge(-100)
      .size([width, height])
    # preparing the pies
    pie = d3.layout.pie()
      .sort(null)
      .startAngle(-Math.PI/2*0.9)
      .endAngle(Math.PI/2*0.9)
      .value((d) -> d.probability)
    # loading the data
    Network.then (network) ->
      console.log(network)
      nodes = network.articles
      links = for entry in network.distances
        source: entry[0]
        target: entry[1]
        distance: entry[2]
      maxDistance = _.max(links, 'distance').distance
      num = nodes.length
      circleSize = 8
      innerRadius = circleSize * 1.5
      outerRadius = circleSize * 3
      arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
      force
        .linkDistance((l) -> l.distance/maxDistance*diag/nodes.length)
        .nodes(nodes)
        .links(links)
        .start()

      link = svg.selectAll('.link').data(links).enter().append('line').attr('class', 'link')
      node = svg.selectAll('.node').data(nodes).enter().append('g').attr('class', (d) -> 'node ' + d.predictedLabel).call(force.drag)
      arcs = node.each (article) ->
        slices = d3.select(@).selectAll('.slice').data(pie(article.prediction))
        slices.enter().append('g')
          .attr('class', (d) -> 'slice ' + d.data.party)
          .append('path')
          .attr('d', arc)

      node.append('circle').attr('cx', 0).attr('cy', 0).attr('r', circleSize)
      node.append('a').attr('xlink:href', (d) -> d.url)
        .append('text').attr('dx', 0).attr('dy', innerRadius).attr('text-anchor', 'middle').attr('dominant-baseline', 'hanging').text (d) ->
          d.title
      force.on 'tick', ->
        link.attr('x1', (d) ->
          d.source.x
        ).attr('y1', (d) ->
          d.source.y
        ).attr('x2', (d) ->
          d.target.x
        ).attr 'y2', (d) ->
          d.target.y
        node.attr 'transform', (d) ->
          'translate(' + d.x + ',' + d.y + ')'

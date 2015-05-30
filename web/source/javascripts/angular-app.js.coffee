app = angular.module 'pp', []

pairwise = (list) ->
  if list.length < 2 then return []
  first = _.first list
  rest = _.rest list
  pairs = _.map rest, (x) -> [first, x]
  pairs.concat pairwise(rest)

window.article = do ->
  i = 1
  ->
    i = i + 1
    nums = _.times(4, -> Math.random())
    sum = _.sum(nums)
    probs = _.map(nums, (num) -> num/sum)
    prediction = _.zipWith ["cdu", "spd", "gruene", "linke"], probs, (party, probability) ->
      party: party
      probability: probability
    predictedLabel = _.max(prediction, (p) -> p.probability).party

    title: "Artikel #{i}"
    url: "http://#{predictedLabel}.de"
    prediction: prediction
    predictedLabel: predictedLabel


NUM = 100

app.factory 'Network', ($q, $http) ->
  # articles = _.times(NUM, article)
  # indexes = [0...articles.length]
  # distances = _.map pairwise(indexes), (pair) ->
  #   # using manhattan distance for speed
  #   vecs = _.map pair, (index) -> _.map(articles[index].prediction, 'probability')
  #   pair.concat [_.sum(_.zipWith(vecs..., (a, b) -> Math.abs(a-b)))]
  #
  # $q.when
  #   articles: articles
  #   distances: distances

  $http.get('distances.json').then (response) -> response.data

app.directive 'networkChart', (Network) ->
  link: (scope, elem, attrs) ->
    # preparing
    width = 800
    height = 800
    diag = Math.sqrt(width**2+height**2)
    minSide = Math.min(width, height)

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
      byParty = _.groupBy nodes, 'predictedLabel'
      links = for entry in network.distances
        source: entry[0]
        target: entry[1]
        distance: entry[2]
      maxDistance = _.max(links, 'distance').distance
      fitScale = 1
      num = nodes.length
      circleSize = 20/Math.log2(nodes.length)
      innerRadius = circleSize * 1.5
      outerRadius = circleSize * 3
      arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
      force
        .linkDistance((l) -> l.distance)
        .charge((n) -> if n.active then -600 else -30) # fush nodes away from selected node
        # TODO try friction based on mouse distance
        .nodes(nodes)
        .links(links)
        .start()

      # voronoi
      voronoi = d3.geom.voronoi().x((n) -> n.x).y((n) -> n.y)
      calculateVoronoi = ->
        _.zipWith(nodes, voronoi(nodes), (node, patch) -> node.voronoiArea = patch)
      calculateVoronoi()

      # hulls
      hulls = svg.selectAll('.hull').data(_.pairs(byParty)).enter().append('path').attr('class', (d) -> [party, articles] = d; "hull #{party}")
      hull = d3.geom.hull().x((node) -> node.x).y((node) -> node.y)
      hullArea = d3.svg.line().x((n) -> n.x).y((n) -> n.y).interpolate('basis-closed')
      updateActive = ->
        node.classed('active', (d) -> d.active)
        voronoiPatches.classed('active', (d) -> d.active)

      # link = svg.selectAll('.link').data(links).enter().append('line').attr('class', 'link')
      node = svg.selectAll('.node').data(nodes).enter().append('g').attr('class', (d) -> 'node ' + d.predictedLabel).call(force.drag)
      node.append('circle').attr('class', 'selectionIndicator').attr('cx', 0).attr('cy', 0).attr('r', circleSize * 4)
      node
        .append('text').attr('dx', 0).attr('dy', innerRadius).attr('text-anchor', 'middle').attr('dominant-baseline', 'hanging').text (d) ->
          d.title
      arcs = node.each (article) ->
        slices = d3.select(@).selectAll('.slice').data(pie(article.prediction))
        slices.enter().append('g')
          .attr('class', (d) -> 'slice ' + d.data.party)
          .append('path')
          .attr('d', arc)

      node.append('circle').attr('class', 'partyIndicator').attr('cx', 0).attr('cy', 0).attr('r', circleSize)

      # voronoi selectors
      voronoiPatches = svg.selectAll('.voronoi-patch').data(nodes)
        .enter().append('a').attr('class', 'voronoi-patch').attr('xlink:href', (d) -> d.url).append('path')
      # voronoiPatches = node.append('path').attr('class', 'voronoi-patch')
      voronoiPatches
        .on('mouseover', (d) ->
          d.active = true
          d.fixed = true
          force.start()
          updateActive()
        )
        .on('mouseout', (d) ->
          d.active = false
          d.fixed = false
          updateActive()
        )

      updateScale = ->
        diameter = _.max _.map(pairwise(d3.geom.hull().x((node) -> node.x).y((node) -> node.y)(nodes)), (pair) ->
          [a,b] = pair
          Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2)
        )
        target = minSide * 0.8
        diff = target - diameter
        rate = 0.1
        tolerance = 0.05
        if Math.abs(diff) > target*tolerance
          fitScale = fitScale + rate*Math.tanh(diff) 
          force.linkDistance((l) -> l.distance*fitScale).start()

      calculateVoronoiThrottled = _.throttle(calculateVoronoi, 200)

      force.on 'tick', ->
        # link.attr('x1', (d) ->
        #   d.source.x
        # ).attr('y1', (d) ->
        #   d.source.y
        # ).attr('x2', (d) ->
        #   d.target.x
        # ).attr 'y2', (d) ->
        #   d.target.y
        node.attr 'transform', (d) ->
          'translate(' + d.x + ',' + d.y + ')'

        hulls.attr "d", (d) ->
          [party, articles] = d
          hullArea(hull(articles))

        # update voronoi patches
        calculateVoronoiThrottled()
        voronoiPatches.attr('d', (d) -> d3.svg.line()(d.voronoiArea))

        updateScale()

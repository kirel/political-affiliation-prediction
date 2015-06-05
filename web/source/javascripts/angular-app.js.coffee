app = angular.module 'pp', []

pairwise = (list) ->
  if list.length < 2 then return []
  first = _.first list
  rest = _.rest list
  pairs = _.map rest, (x) -> [first, x]
  pairs.concat pairwise(rest)

vAdd = (vs...) -> _.reduce( vs, (v, w) -> _.zipWith(v, w, _.add))
vSub = (v, w) -> vAdd(v, vScale(-1.0, w))
vScale = (scalar, v) -> _.map(v, (e) -> e*scalar)
vDot = (v, w) -> _.sum(_.zipWith(v, w, (a, b) -> a*b))
vNorm = (v) -> Math.sqrt(_.reduce(_.map(v, (e) -> e**2), _.add))
euclideanDistance = (v, w) -> vNorm(vSub(v, w))
d = euclideanDistance

gaussian = (mean = 0, sigma = 1) -> (x) ->
  gaussianConstant = 1 / Math.sqrt(2 * Math.PI)
  x = (x - mean) / sigma
  gaussianConstant * Math.exp(-.5 * x * x) / sigma

sgn = Math.sign
sigmoid = (x) -> 1/(1 + Math.E**(-x))

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
        .charge((n) -> if n.active then -150 else -30) # fush nodes away from selected node
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
      hullArea = d3.svg.line().x((n) -> n.x).y((n) -> n.y).interpolate('linear-closed')
      updateActive = ->
        node.sort((d, o) -> +d.active * 2 - 1) # map true, false to 1 and -1
        voronoiPatches.classed('active', (d) -> d.active)
        _.delay -> node.classed('active', (d) -> d.active) # delay to ensure css animations still work

      # link = svg.selectAll('.link').data(links).enter().append('line').attr('class', 'link')
      node = svg.selectAll('.node').data(nodes).enter().append('g').attr('class', (d) -> 'node ' + d.predictedLabel).call(force.drag)
      node.append('circle').attr('class', 'selectionIndicator').attr('cx', 0).attr('cy', 0).attr('r', circleSize * 4)
      titles = node.append('g').attr('class', 'title')
      titles
        .append('text') # faux shadow text
          .attr('class', 'faux-shadow')
          .attr('dx', 1).attr('dy', outerRadius*1.5+1)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'hanging')
          .text((d) -> d.title)
      titles
        .append('text') # real text
          .attr('dx', 0).attr('dy', outerRadius*1.5)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'hanging')
          .text((d) -> d.title)
      titles
        .insert('rect', 'text').attr('class', 'text-background').each((d) -> d3.select(@).attr(@parentNode.getBBox()))
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

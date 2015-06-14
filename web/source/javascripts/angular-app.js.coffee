app = angular.module 'pp', []

subsetsOf2 = (list) ->
  if list.length < 2 then return []
  first = _.first list
  rest = _.rest list
  pairs = _.map rest, (x) -> [first, x]
  pairs.concat subsetsOf2(rest)

vAdd = (vs...) -> _.reduce( vs, (v, w) -> _.zipWith(v, w, _.add))
vSub = (v, w) -> vAdd(v, vScale(-1.0, w))
vScale = (scalar, v) -> _.map(v, (e) -> e*scalar)
vDot = (v, w) -> _.sum(_.zipWith(v, w, (a, b) -> a*b))
vNorm = (v) -> Math.sqrt(_.reduce(_.map(v, (e) -> e**2), _.add))
vNormalized = (v) -> vScale(1/vNorm(v), v)
euclideanDistance = (v, w) -> vNorm(vSub(v, w))

# calculate angle in 2d
angle = (vec, other) ->
  vec.x = -> @[0]
  vec.y = -> @[1]
  other.x = -> @[0]
  other.y = -> @[1]
  diff = vSub([vec.x, vec.y], [other.x, other.y])
  unitDiff = vScale(1/vNorm(diff), diff)
  alpha = Math.acos(vDot([0, 1], unitDiff)) / Math.PI * 180
  alpha = if diff[0] <= 0 then alpha else 360 - alpha

# offsets polygons - expects clockwise convex polygons
polygonOffset = (offset, polygon) ->
  return polygon if polygon.length < 2
  copy = polygon.slice()
  first = copy.shift()
  copy.push first

  pairs = _.zip(polygon, copy)
  offsetPairs = for [v, w] in pairs
    normal = vScale offset, vNormalized [-v[1] + w[1], v[0] - w[0]] # rotate 90deg counterclockwise
    [vAdd(v, normal), vAdd(w, normal)]

  _.flatten offsetPairs

window.polygonOffset = polygonOffset


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

app.controller 'Main', ($scope, Network) ->

  $scope.controls =
    showGroups: true
    showLinks: false
    linkPercentage: 0.05

  Network.then (network) ->
    $scope.network = network
    $scope.selectableDistances = network.distances
    $scope.selectableClusterings = network.clusterings
    $scope.controls.selectedDistance = _.first($scope.selectableDistances)
    $scope.controls.selectedClustering = _.last($scope.selectableClusterings)

app.factory 'Network', ($q, $http) ->
  $http.get('distances.json').then (response) -> response.data

app.directive 'networkChart', (Network) ->
  scope:
    network: '='
    selectedDistance: '='
    selectedClustering: '='
    showLinks: '='
    showGroups: '='
    disconnectGroups: '='
    showVoronoi: '='
    linkPercentage: '='
    selectedArticle: '='
  template: '<svg ng-class="{\'show-links\': showLinks, \'show-groups\': showGroups, \'show-voronoi\': showVoronoi}"></svg>'
  link: (scope, elem, attrs) ->
    # preparing
    width = 800
    height = 800
    diag = Math.sqrt(width**2+height**2)
    minSide = Math.min(width, height)
    border = 100
    # prepare scales
    xScale = d3.scale.linear().range([border, width-border])
    yScale = d3.scale.linear().range([border, height-border])
    xScaleD = (doc) -> xScale(doc.x)
    yScaleD = (doc) -> yScale(doc.y)
    dScale = d3.scale.linear().clamp(true).range([1,0])
    dScaleColor = d3.scale.linear().clamp(true).range(['firebrick','black'])

    svg = d3.select(elem[0]).select('svg')
      .attr('width', width)
      .attr('height', height)

    # layers
    clusterGroup = svg.append('g').attr('class', 'cluster-group')
    linkGroup = svg.append('g').attr('class', 'link-group')
    nodeGroup = svg.append('g').attr('class', 'node-group')
    selectionGroup = svg.append('g').attr('class', 'selection-group')


    force = d3.layout.force()
      .gravity(.5)
      # .charge(-30)
      .size([width, height])

    # preparing the pies
    pie = d3.layout.pie()
      .sort(null)
      .startAngle(-Math.PI/2*0.9)
      .endAngle(Math.PI/2*0.9)
      .value((d) -> d.probability)

    # reload when data changes
    scope.$watch 'network', (network) ->
      return unless network
      update(network, scope.selectedDistance, scope.selectedClustering, scope.showLinks, scope.showGroups)

    scope.$watch 'selectedDistance', (selectedDistance) ->
      return unless selectedDistance
      update(scope.network, scope.selectedDistance, scope.selectedClustering, scope.showGroups, scope.showLinks)

    scope.$watch 'selectedClustering', (selectedClustering) ->
      return unless selectedClustering
      article.cluster = null for article in scope.network.articles # reset clusters
      for cluster in scope.selectedClustering.clusters
        cluster.memberArticles = _.at(scope.network.articles, cluster.members)
        for member in cluster.memberArticles
          member.cluster = cluster

      update(scope.network, scope.selectedDistance, scope.selectedClustering, scope.showGroups, scope.showLinks)

    update = (network, selectedDistance, selectedClustering, showLinks, showGroups) ->
      nodes = network.articles

      allLinks = for entry in selectedDistance.distances # TODO make selectable
        source: nodes[entry[0]]
        target: nodes[entry[1]]
        distance: entry[2]
        key: entry[0]*nodes.length+entry[1]

      [minDist, maxDist] = d3.extent(allLinks, (l) -> l.distance)
      linkPercentage = .05
      links = _.filter(allLinks, (l) -> l.distance < (minDist + maxDist)*linkPercentage)
      links = _.filter(links, (l) -> l.source.cluster == l.target.cluster) if scope.disconnectGroups # FIXME

      circleSize = 20/Math.log2(nodes.length)
      innerRadius = circleSize * 1.5
      outerRadius = circleSize * 3

      arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)

      force
        .linkDistance((l) -> l.distance)
        .nodes(nodes)
        .links(links)
        .start()

      # update scales
      xScale.domain(d3.extent(nodes, (n) -> n.x))
      yScale.domain(d3.extent(nodes, (n) -> n.y))

      dScale.domain([minDist, (minDist+maxDist)*linkPercentage])
      dScaleColor.domain([minDist, (minDist+maxDist)*linkPercentage])

      # voronoi
      voronoi = d3.geom.voronoi().x(xScaleD).y(yScaleD)
      calculateVoronoi = -> # adds the voronoi patch to the node model
        _.zipWith(nodes, voronoi(nodes), (node, patch) -> node.voronoiArea = patch)
      calculateVoronoi()

      clusterColor = d3.scale.category20()
      # hulls TODO switch to actual groups
      clusterGroup.selectAll('*').remove()
      hulls = clusterGroup.selectAll('g.hull-group').data(selectedClustering.clusters, (c) -> selectedClustering.name+c.name)
      hullGroup = hulls.enter().append('g').attr('class', (cluster) -> "hull-group #{cluster.name}")
      hullGroup.append('path').attr('class', (cluster) -> "hull #{cluster.name}")
        .attr 'fill', (cluster) -> clusterColor(cluster.name)
        .attr 'stroke', (cluster) -> d3.rgb(clusterColor(cluster.name))#.darker(2)
      hullGroup.append('path').attr('class', 'description-anchor-path').attr('id', (c) -> c.name.replace(' ', '-'))
      hullGroup.append('text').attr 'stroke', (cluster) -> d3.rgb(clusterColor(cluster.name))#.darker(2)
        .append('textPath').attr('xlink:href', (c) -> "##{c.name.replace(' ', '-')}").text((c) -> c.description)
      hullGeom = d3.geom.hull().x((n) -> n.x).y((n) -> n.y)
      hullArea = d3.svg.line().x(xScaleD).y(yScaleD).interpolate('basis-closed')
      hullTextPath = d3.svg.line().x(xScaleD).y(yScaleD).interpolate('basis-closed')

      updateHulls = (hulls) ->
        # TODO precalculate offsetPolys in one loop here
        hulls.selectAll('path.hull')
          .attr "d", (cluster) ->
            articles = _.at(nodes, cluster.members)
            hullArticles = if articles.length > 2
              hullGeom(articles).reverse()
            else
              articles
            polygon = ([a.x, a.y] for a in hullArticles)
            offsetPoly = polygonOffset(6, polygon)
            offsetPoly.forEach (p) ->
              p.x = p[0]
              p.y = p[1]
            hullArea(offsetPoly)
        hulls.selectAll('path.description-anchor-path')
          .attr "d", (cluster) ->
            articles = _.at(nodes, cluster.members)
            hullArticles = if articles.length > 2
              hullGeom(articles).reverse()
            else
              articles
            polygon = ([a.x, a.y] for a in hullArticles)
            offsetPoly = polygonOffset(8, polygon)
            offsetPoly.forEach (p) ->
              p.x = p[0]
              p.y = p[1]
            hullTextPath(offsetPoly)

      # interaction
      updateActive = ->
        voronoiPatches.classed('active', (d) -> d.active)
        hulls.classed('active', (d) -> d.active)
        _.delay (-> node.classed('active', (d) -> d.active)) # delay to ensure css animations still work

      link = linkGroup.selectAll('line.link').data(links, (d) -> d.key)
      link.exit().remove()
      link.enter().append('line').attr('class', 'link')

      updateLinks = (link) ->
        link
          .attr('opacity', (d) -> dScale(d.distance))
          .attr('stroke', (d) ->
            dScaleColor(d.distance)
          ).attr('stroke-width', (d) ->
            dScale(d.distance)*2
          )
          .attr('x1', (d) ->
            xScaleD d.source
          ).attr('y1', (d) ->
            yScaleD d.source
          ).attr('x2', (d) ->
            xScaleD d.target
          ).attr('y2', (d) ->
            yScaleD d.target
          )

      scope.$watch 'disconnectGroups', ->
        links = _.filter(allLinks, (l) -> l.distance < (minDist + maxDist)*scope.linkPercentage)
        links = _.filter(links, (l) -> l.source.cluster == l.target.cluster) if scope.disconnectGroups # FIXME

        link = linkGroup.selectAll('line.link').data(links, (d) -> d.key)
        link.exit().remove()
        link.enter().append('line').attr('class', 'link')

        force.links(links)
        force.start()

        updateLinks(link) if scope.showLinks


      scope.$watch 'linkPercentage', (linkPercentage) ->
        return unless linkPercentage
        scope.linkPercentage = parseFloat(linkPercentage)

        dScale = d3.scale.linear().domain([minDist, (minDist+maxDist)*scope.linkPercentage]).clamp(true).range([1,0])
        dScaleColor = d3.scale.linear().domain([minDist, (minDist+maxDist)*scope.linkPercentage]).clamp(true).range(['firebrick','black'])

        links = _.filter(allLinks, (l) -> l.distance < (minDist + maxDist)*scope.linkPercentage)
        links = _.filter(links, (l) -> l.source.cluster == l.target.cluster) if scope.disconnectGroups # FIXME

        link = linkGroup.selectAll('line.link').data(links, (d) -> d.key)
        link.exit().remove()
        link.enter().append('line').attr('class', 'link')

        force.links(links)
        force.start()

        updateLinks(link) if scope.showLinks

      node = nodeGroup.selectAll('.node').data(nodes, (a) -> a.url)
      enterNodeGroup = node.enter().append('g')
      enterNodeGroup.attr('class', (d) -> 'node ' + d.predictedLabel).call(force.drag)
      enterNodeGroup.append('circle').attr('class', 'selection-indicator').attr('cx', 0).attr('cy', 0).attr('r', circleSize * 4)
      enterNodeGroup.append('circle').attr('class', 'party-indicator').attr('cx', 0).attr('cy', 0).attr('r', circleSize)
      titles = enterNodeGroup.append('g').attr('class', 'title')
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
      arcs = node.each (article) ->
        slices = d3.select(@).selectAll('.slice').data(pie(article.prediction))
        slices.enter().append('g') # FIXME subenter
          .attr('class', (d) -> 'slice ' + d.data.party)
          .append('path')
          .attr('d', arc)

      updateNodes = (node) ->
        node.attr 'transform', (d) ->
          'translate(' + xScaleD(d) + ',' + yScaleD(d) + ')'

      # voronoi selectors
      voronoiPatches = selectionGroup.selectAll('.voronoi-patch').data(nodes)
      voronoiPatches.enter().append('a').attr('class', 'voronoi-patch').attr('xlink:href', (d) -> d.url).append('path')
      voronoiPatches.exit().remove()

      voronoiPatches
        .on('mouseover', (d) ->
          scope.$apply -> scope.selectedArticle = d
          d.active = true
          d.cluster?.active = true

          scaleD = (other) ->
            selectedPos = [xScale(d.x), yScale(d.y)]
            pos = [xScale(other.x), yScale(other.y)]
            diff = vSub(pos, selectedPos)
            dist = vNorm(diff)
            theShift = 2*outerRadius*shift(outerRadius/2)(dist/outerRadius)
            _.object ['x','y'], vAdd(pos, vScale(theShift/dist, diff))

          xScaleD = (d) -> scaleD(d).x
          yScaleD = (d) -> scaleD(d).y

          hullArea.x(xScaleD).y(yScaleD)
          hullTextPath.x(xScaleD).y(yScaleD)

          duration = 500

          updateNodes(
            node
              .sort((doc, other) ->
                # sort by distance to selected
                d3.descending(euclideanDistance([d.x, d.y], [doc.x, doc.y]), euclideanDistance([d.x, d.y], [other.x, other.y])))
              .transition()
                .duration(duration)
          )

          updateLinks(link.transition().duration(duration)) if scope.showLinks
          updateHulls(hulls.transition().duration(duration)) if scope.showGroups

          updateActive()
        )
        .on('mouseout', (d) ->
          d.active = false
          d.cluster?.active = false
          updateActive()
        )

      # x + sign(x)*2(1-sigmoid(|x|))
      shift = (offset) -> (x) ->
        if x < 1e-10
          0
        else
          Math.sign(x)*2*(1-sigmoid(Math.abs(x)-offset))

      calculateVoronoiThrottled = _.throttle(calculateVoronoi, 200)

      force.on 'tick', ->
        # smooth the layout change with inertia
        rate = 0.8
        smooth = (previous, next) -> (1 - rate) * previous + rate * next
        xScale.domain(_.zipWith(xScale.domain(), d3.extent(nodes, (n) -> n.x), smooth))
        yScale.domain(_.zipWith(yScale.domain(), d3.extent(nodes, (n) -> n.y), smooth))

        updateNodes(node)
        updateLinks(link) if scope.showLinks
        updateHulls(hulls) if scope.showGroups

        # update voronoi patches
        calculateVoronoiThrottled()

        voronoiPatches.selectAll('path').attr('d', (d) -> d3.svg.line()(d.voronoiArea))

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

angle = (doc, other) ->
  diff = vSub([doc.x, doc.y], [other.x, other.y])
  unitDiff = vScale(1/vNorm(diff), diff)
  alpha = Math.acos(vDot([0, 1], unitDiff)) / Math.PI * 180
  alpha = if diff[0] <= 0 then alpha else 360 - alpha

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

  Network.then (network) ->
    $scope.network = network
    $scope.selectableDistances = network.distances
    $scope.selectableClusterings = network.clusterings
    $scope.selectedDistance = _.first($scope.selectableDistances)
    $scope.selectedClustering = _.first($scope.selectableClusterings)

  $scope.controls =
    showGroups: true
    showLinks: true
    linkPercentage: 0.05

app.factory 'Network', ($q, $http) ->
  $http.get('distances.json').then (response) -> response.data

app.directive 'networkChart', (Network) ->
  scope:
    network: '='
    selectedDistance: '='
    selectedClustering: '='
    showLinks: '='
    showGroups: '='
    showVoronoi: '='
    linkPercentage: '='
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
      # .gravity(.1)
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

    scope.$watch 'selectedClustering', (selectedClustering) ->
      return unless selectedClustering
      update(scope.network, scope.selectedDistance, scope.selectedClustering, scope.showGroups, scope.showLinks)

    update = (network, selectedDistance, selectedClustering, showLinks, showGroups) ->
      nodes = network.articles

      allLinks = for entry in selectedDistance.distances # TODO make selectable
        source: entry[0]
        target: entry[1]
        distance: entry[2]
        key: [entry[0],entry[1]]

      [minDist, maxDist] = d3.extent(allLinks, (l) -> l.distance)
      linkPercentage = .05
      links = _.filter(allLinks, (l) -> l.distance < (minDist + maxDist)*linkPercentage)

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

      # hulls TODO switch to actual groups
      hulls = clusterGroup.selectAll('.hull').data(selectedClustering.clusters, (c) -> c.name)
      hulls.exit().remove()
      hulls.enter().append('path').attr('class', (cluster) -> "hull #{cluster.name}")
      hullGeom = d3.geom.hull().x((n) -> n.x).y((n) -> n.y)
      hullArea = d3.svg.line().x(xScaleD).y(yScaleD).interpolate('linear-closed')

      clusterColor = d3.scale.category20()
      updateHulls = (hulls, transition = false) ->
        hulls
          .attr 'fill', (cluster) -> clusterColor(cluster.name)
          .attr 'stroke', (cluster) -> clusterColor(cluster.name)
          .attr "d", (cluster) ->
            articles = _.at(nodes, cluster.members)
            hullArea(hullGeom(articles))

      scope.$watch 'showGroups', -> updateHulls(hulls)

      # interaction
      updateActive = ->
        voronoiPatches.classed('active', (d) -> d.active)
        _.delay (-> node.classed('active', (d) -> d.active)) # delay to ensure css animations still work

      link = linkGroup.selectAll('.link').data(links, (d) -> d.key)

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

      scope.$watch 'showLinks', -> updateLinks(link)

      scope.$watch 'linkPercentage', (linkPercentage) ->
        linkPercentage = parseFloat(linkPercentage)
        return unless linkPercentage

        dScale = d3.scale.linear().domain([minDist, (minDist+maxDist)*linkPercentage]).clamp(true).range([1,0])
        dScaleColor = d3.scale.linear().domain([minDist, (minDist+maxDist)*linkPercentage]).clamp(true).range(['firebrick','black'])
        links = _.filter(allLinks, (l) -> l.distance < (minDist + maxDist)*linkPercentage)
        link = link.data(links, (d) -> d.key)
        link.exit().remove()
        link.enter().append('line').attr('class', 'link')

        force.links(links)
        force.start()

        updateLinks(link)

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
          d.active = true

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

          duration = 500

          updateNodes(
            node
              .sort((doc, other) ->
                # sort by distance to selected
                d3.descending(euclideanDistance([d.x, d.y], [doc.x, doc.y]), euclideanDistance([d.x, d.y], [other.x, other.y])))
              .transition()
                .duration(duration)
          )

          updateLinks(link.transition().duration(duration))
          updateHulls(hulls.transition().duration(duration), true)

          updateActive()
        )
        .on('mouseout', (d) ->
          d.active = false
          # d.fixed = false
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

        updateLinks(link)
        updateNodes(node)

        updateHulls(hulls)

        # update voronoi patches
        calculateVoronoiThrottled()

        voronoiPatches.selectAll('path').attr('d', (d) -> d3.svg.line()(d.voronoiArea))

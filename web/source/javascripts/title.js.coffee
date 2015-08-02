gaussian = (mu, sigma) -> (x) ->
  gaussianConstant = 1 / Math.sqrt(2 * Math.PI)
  x = (x - mu) / sigma;
  gaussianConstant * Math.exp(-.5 * x * x) / sigma

$ ->
  canvas = document.getElementById("pp--title")
  ctx = canvas.getContext('2d')
  console.log ctx

  w = 800
  h = 600
  DEBUG = 1

  canvas.width = w
  canvas.height = h

  load = (srcs...) ->
    for src in srcs
      do ->
        promise = $.Deferred()
        img = new Image()
        img.src = src
        img.onload = -> promise.resolve(img)
        promise

  # sample a point from imagedata according to alpha values
  alphaSample = (data, maxTries = 10000) ->
    tries = 0
    while tries < maxTries
      x = Math.floor(Math.random() * w)
      y = Math.floor(Math.random() * h)
      [r, g, b, a] = getRGBA(data, x, y)
      return [x, y] if a > Math.random() * 255
      tries += 1
    throw new Error # will this ever happen?

  getRGBA = (data, x, y) ->
    [r, g, b, a] = [data[(w*y*4)+4*x],data[(w*4*y)+4*x+1],data[(w*4*y)+4*x+2],data[(w*4*y)+4*x+3]]

  fontSizeScale = d3.scale.linear().domain([0, 10]).range([8,12])
  clampX = d3.scale.linear().domain([0,w-1]).range([0,w-1]).clamp(true)
  clampY = d3.scale.linear().domain([0,h-1]).range([0,h-1]).clamp(true)

  $.when( load('images/parl.jpg', 'images/source.png', 'images/target.png')... ).done (img, source, target) ->
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(source, 0, 0, w, h)
    sourceData = ctx.getImageData(0, 0, w, h)
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(target, 0, 0, w, h)
    targetData = ctx.getImageData(0, 0, w, h)
    ctx.drawImage(img, 0, 0, w, h)

    # create force field
    # for each point create a unit vector pointing to a random target point
    makeForceField = ->
      dest = Victor.fromArray(alphaSample(targetData.data))
      angle = if Math.random() < 0.5 then 75 else -75
      dFn = (x) ->
        c = 400
        Math.max(0, 1-x/c)
      for i in [0...w*h]
        x = i%w
        y = Math.floor(i/w)
        pos = new Victor(x, y)
        speedup = 2
        dir = dest.clone().subtract(pos).normalize().clone().multiply(new Victor(speedup + speedup*Math.random(), speedup + speedup*Math.random()))
        # mess with dir based on how close pos is to targetPoint
        dir = dir.rotateDeg(angle*dFn(pos.distance(dest)))

    numForceFields = 5
    changeForceFieldProb = 0.01
    # forceFields = (_.zipWith(makeForceField(), makeForceField(), (a, b) -> a.mix(b)) for i in [1..numForceFields])
    forceFields = (makeForceField() for i in [1..numForceFields])
    forceField = forceFields[Math.floor(Math.random()*numForceFields)]

    console.log 'done force'

    force = (x, y) ->
      forceField[Math.floor(clampY(y))*w+Math.floor(clampX(x))]

    # set up agents
    agents = []
    maxAgents = 800
    numAdd = 5
    update = ->
      # new agents
      for i in [1..numAdd]
        [x, y] = alphaSample(sourceData.data)
        [r, g, b] = getRGBA(sourceData.data, x, y)
        agents.push
          pos: new Victor(x, y)
          dir: force(x, y)
          str: if Math.random() < 0.5 then '0' else '1'
          r: r
          g: g
          b: b
          a: 1
          color: -> "rgba(#{@r}, #{@g}, #{@b}, #{@a})"
      # move angents
      for agent, i in agents
        agent.a = _.min([i*10/agents.length,1,(i-agents.length)*10/-agents.length]) # close to 0 and close to agents.length should fade to 0
        agent.dir = agent.dir.mix(force(agent.pos.x, agent.pos.y), 0.1)
        agent.pos = agent.pos.add(agent.dir)
      # remove agents
      agents.shift() while agents.length > maxAgents

      # low chance of new forcefield
      forceField = forceFields[Math.floor(Math.random()*numForceFields)] if Math.random() < changeForceFieldProb

    draw = ->
      ctx.drawImage(img, 0, 0, w, h)
      if DEBUG?
        ctx.drawImage(target, 0, 0, w, h)
        ctx.drawImage(source, 0, 0, w, h)

      # draw the force field
      if DEBUG?
        for i in [0...w*h]
          x = i%w
          y = Math.floor(i/w)
          dir = force(x, y)
          continue unless x % 10 == 0 and y % 10 == 0
          ctx.fillStyle = "rgba(200,200,200,.5)"
          ctx.strokeStyle = "rgba(200,200,200,.5)"
          ctx.fillRect(x-1, y-1, 3, 3)
          ctx.beginPath()
          ctx.moveTo(x, y)
          dest = new Victor(x, y).add(dir.clone().multiply(new Victor(4,4)))
          ctx.lineTo(dest.x, dest.y)
          ctx.stroke()

      for agent in agents
        ctx.fillStyle = agent.color()
        ctx.font = "#{Math.floor(fontSizeScale(agent.dir.lengthSq()))}px Arial"
        ctx.fillText(agent.str, agent.pos.x, agent.pos.y)

    setInterval(->
      update()
      draw()
      false
    , 1000/25)

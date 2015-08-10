angular.module('data', [])
  .factory 'Network', ($q, $http) ->
    $http.get('api/distances.json').then (response) -> response.data

## news listing

app = angular.module 'news', ['data']

app.controller 'newsCtrl', ($scope, Network) ->

  $scope.controls =
    showGroups: true
    showLinks: false
    linkPercentage: 0.05

  Network.then (network) ->
    $scope.network = network
    $scope.selectableClusterings = network.clusterings
    $scope.controls.selectedClustering = _.last($scope.selectableClusterings)
    $scope.controls.sortRightToLeft = true
    for article in $scope.network.articles
      article.domain = article.url.split(/\//)[0..2].join('/')

  $scope.scoreLeftRight = (index) ->
    article = $scope.network.articles[index]
    # calculate left right score from article
    weights = {linke: -1, gruene: -0.5, spd: 0.5, cdu: 1}
    _.sum article.prediction.map((p) -> p.probability * weights[p.party])

app.directive 'articlePolitics', ->
  scope:
    article: '='
  template: '''
    <ul>
      <li ng-repeat='p in article.prediction' style='width: {{p.probability*100}}%;' class='{{p.party}}'>&nbsp;</li>
    </ul>
  '''
  link: (scope, elem, attr) ->

/* global alert */
'use strict';

angular.module('worldCupStandingsApp')
  .directive('reloadLink', ['$route','$interval','$http',function ($route,$interval,$http) {
    return {
      template: '<a class="reload_link" style="text-align:center;cursor:pointer;position:fixed;bottom:5px;right:15px;color:#999;" ng-click="reloadScores()">{{reloadLink}}</a>',
      restrict: 'E',
      transclude: true,
      link: function(scope) {
        scope.reloadLink = '♻';
        var reloadable = true;

        var animationInterval;
        var animate = function(start){
          if(start){
            var chars = ['⋮','⋰','⋯','⋱'];
            var cChar = 0;
            animationInterval = $interval(function(){
              if (cChar === chars.length) {
                cChar = 0;
              }
              scope.reloadLink = chars[cChar++];
            },100);
          } else if(animationInterval) {
            $interval.cancel(animationInterval);
            animationInterval = null;
          }
        };
        scope.reloadScores = function(){
          animate(true);
          $http({method: 'GET', url: '/api/reloadStandings'}).
            success(function() {
              animate(false);
              $route.reload();
              scope.reloadLink = '✓';
              reloadable = false;
              setTimeout(function(){
                scope.reloadLink = '♻';
                reloadable = true;
              },10000);
            }).
            error(function(data) {
              animate(false);
              alert(data || 'error reloading scores...');
              scope.reloadLink = '✗';
              setTimeout(function(){
                scope.reloadLink = '♻';
                reloadable = true;
              },10000);
            });
        };
      }
    };
  }]);

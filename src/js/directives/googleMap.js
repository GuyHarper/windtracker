/* global google */

angular
  .module('darkSky')
  .directive('googleMap', googleMap);

function googleMap() {
  return {
    restrict: 'E',
    template: '<div id="map"></div>',
    replace: true,
    scope: {
      center: '=',
      position: '='
    },
    controller: 'WeatherShowCtrl',
    link($scope, $element) {
      const markers = [];

      const map = new google.maps.Map($element[0], {
        zoom: 2
      });

      $scope.changeLocation = function(originalPosition) {
        console.log('originalPosition: ', originalPosition);
        $scope.$emit('changeLocation', originalPosition);
      };

      function animateMapZoomTo(map, targetZoom) {
        const currentZoom = arguments[2] || map.getZoom();
        if (currentZoom !== targetZoom) {
          google.maps.event.addListenerOnce(map, 'zoom_changed', () => {
            animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
          });
          setTimeout(() => map.setZoom(currentZoom), 100);
        }
      }

      map.addListener('click', (e) => {
        $scope.originalPosition = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        const marker = new google.maps.Marker({
          map: map,
          position: $scope.originalPosition
        });
        map.setCenter($scope.originalPosition);
        markers.push(marker);
        animateMapZoomTo(map, 19);
        $scope.changeLocation($scope.originalPosition);
      });

      $scope.$watch('center', () => {
        console.log('center watch', $scope.center);
        if(!$scope.center) return false;
        map.setCenter($scope.center);
      });

      $scope.$watch('position', () => {
        console.log('in position watch');
        if(!$scope.position) return false;
        const marker = new google.maps.Marker({
          map: map,
          position: $scope.position
        });
        markers.push(marker);
        map.panTo($scope.position);
      });


    }
  };
}

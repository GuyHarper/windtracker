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
    link($scope, $element) {
      const markers = [];

      const map = new google.maps.Map($element[0], {
        zoom: 14
      });

      map.addListener('click', (e) => {
        $scope.position = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        console.log($scope.position);
      });

      const centreMarker = new google.maps.Marker({
        map: map
      });

      $scope.$watch('center', () => {
        console.log('center watch', $scope.center);
        if(!$scope.center) return false;
        map.setCenter($scope.center);
        centreMarker.setPosition($scope.center);
      });

      $scope.$watch('position', () => {
        console.log('position watch', $scope.position);
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

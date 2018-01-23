/* global google */

angular
  .module('darkSky')
  .controller('WeatherShowCtrl', WeatherShowCtrl);

WeatherShowCtrl.$injects = ['$http', '$scope'];
function WeatherShowCtrl($http, $scope) {
  const vm = this;
  let lat = 0;
  let lng = 0;
  let windSpeed = 0;
  let radianWindBearing = 0;
  let time = 0;
  vm.center = { lat, lng };
  vm.position = null;

  $scope.$on('changeLocation', function(event, position) {
    lat = position.lat;
    lng = position.lng;
    vm.position = { lat, lng };
    window.setInterval(getWeather, 2000);
  });

  function getWeather() {
    $http.get('/api/weather', { params: { lat, lng }})
      .then((response) => {
        const timeEnsued = response.data.currently.time - time;
        time = response.data.currently.time;
        windSpeed = response.data.currently.windSpeed;
        radianWindBearing = response.data.currently.windBearing * Math.PI / 180;
        if(response.data.currently.windBearing < 90) {
          const changeX = -windSpeed * Math.sin(radianWindBearing) * timeEnsued;
          lat += 1/(111132.954 - 559.822 * Math.cos( 2 * changeX ) + 1.175 * Math.cos( 4 * changeX));
          const changeY = -windSpeed * Math.cos(radianWindBearing) * timeEnsued;
          lng += 1/(111132.954 * Math.cos( changeY ));
        } else if(response.data.currently.windBearing < 180) {
          const changeX = -windSpeed * Math.cos(radianWindBearing - Math.PI/2) * timeEnsued;
          lat += 1/(111132.954 - 559.822 * Math.cos( 2 * changeX ) + 1.175 * Math.cos( 4 * changeX));
          const changeY = windSpeed * Math.sin(radianWindBearing - Math.PI/2) * timeEnsued;
          lng += 1/(111132.954 * Math.cos( changeY ));
        } else if(response.data.currently.windBearing < 270) {
          const changeX = windSpeed * Math.cos(3 * Math.PI/2 - radianWindBearing) * timeEnsued;
          lat += 1/(111132.954 - 559.822 * Math.cos( 2 * changeX ) + 1.175 * Math.cos( 4 * changeX));
          const changeY = windSpeed * Math.sin(3 * Math.PI/2 - radianWindBearing) * timeEnsued;
          lng += 1/(111132.954 * Math.cos( changeY ));
        } else if(response.data.currently.windBearing < 360) {
          const changeX = windSpeed * Math.sin(2 * Math.PI - radianWindBearing) * timeEnsued;
          lat += 1/(111132.954 - 559.822 * Math.cos( 2 * changeX ) + 1.175 * Math.cos( 4 * changeX));
          const changeY = -windSpeed * Math.cos(2 * Math.PI - radianWindBearing) * timeEnsued;
          lng += 1/(111132.954 * Math.cos( changeY ));
        }

        vm.position = { lat, lng };

        vm.center = { lat, lng };
        vm.windSpeed = windSpeed;
        vm.bearing = response.data.currently.windBearing;
      });
  }
}

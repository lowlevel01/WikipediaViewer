var app = angular.module("weatherProject",[]);
app.controller("allPage",function($scope,$http,$timeout){
	var lat=0;
	var long=0;
	var jsonLink;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat += Math.round(position.coords.latitude);
			long += Math.round(position.coords.longitude);
			console.log(lat,long);
			$timeout(function(){
				$scope.longitude = long;
				$scope.latitude = lat;
			});
			var jsonLink = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;
			$http.get(jsonLink).then(function(data){
				var dataObject = data.data;
				var imgLink = dataObject.weather[0].icon;
				//if(!(imgLink)){
				//	window.location.reload();
				//}
				var currentWeather = dataObject.weather[0].main;
				var currentWeatherDesc = dataObject.weather[0].description;
				var currentTemp = dataObject.main.temp;
				var unitTemp = "C";
				var antiUnitTemp = "F";
				var windSpeed = dataObject.wind.speed;
				var WindDeg = dataObject.wind.deg;
				console.log(WindDeg);
				var clouds = dataObject.clouds.all;
				var pressure = dataObject.main.pressure;
				var humidity = dataObject.main.humidity;
				var sea_level = dataObject.main.sea_level;
				var country = dataObject.sys.country;
				var place = dataObject.name;
				console.log(dataObject);
				$timeout(function(){
					$scope.imgLink = imgLink;
					console.log(imgLink);
					$scope.currentWeather = currentWeather;
					$scope.currentWeatherDesc = currentWeatherDesc;
					$scope.windSpeed = windSpeed;
					$scope.WindDeg = WindDeg;
					$scope.clouds = clouds;
					$scope.pressure = pressure;
					$scope.humidity = humidity;
					$scope.sea_level = sea_level;
					$scope.country = country;
					$scope.place = place;
					$scope.currentTemp = currentTemp;
					$scope.unitTemp = unitTemp;
					$scope.antiUnitTemp = antiUnitTemp;
					$scope.toggleTemp = function(){
						if(unitTemp == "C"){
							currentTemp = (currentTemp*1.8)+32;
							unitTemp = "F";
							antiUnitTemp = "C";
							$scope.currentTemp = Math.round(currentTemp).toFixed(2);
							$scope.unitTemp = unitTemp;
							$scope.antiUnitTemp = antiUnitTemp;
						}else{
							currentTemp = (currentTemp-32)/1.8;
							unitTemp = "C";
							antiUnitTemp = "F";
							$scope.currentTemp = Math.round(currentTemp).toFixed(2);
							$scope.unitTemp = unitTemp;
							$scope.antiUnitTemp = antiUnitTemp;
						}
					}	
				});
			});
		});
	}else{
		alert("REFRESHING ...")
		window.location.reload();
	}
});
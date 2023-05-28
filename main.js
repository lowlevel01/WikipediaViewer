var app = angular.module("wikiProject",[]);
app.controller("wikiPage",function($scope,$http,$timeout){
	$scope.findQuery = function(){
		var searchQuery = $scope.searchQuery;
		if(searchQuery){
			var jsonLink = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch="+searchQuery;
			console.log(jsonLink);
			$http.get(jsonLink).then(function(data){
				console.log(data);
				var myQueries = data.data.query.pages;
				$scope.myQueries = myQueries;
			});
		}else{
			alert("it's empty :v");
		}
	}
});

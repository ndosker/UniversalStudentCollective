/*global angular*/
/*global $scope*/
var app = angular.module('uscApp',[]);
app.controller('SignupCtrl', ['$scope', function($scope){
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.email = "";
    $scope.college = "";
    $scope.address = [];
    $scope.dogNum = "";
    $scope.catNum = "";
    $scope.update = function(user) {
        $scope.firstName = angular.copy(user.firstName);
        $scope.lastName = angular.copy(user.lastName);
        $scope.email = angular.copy(user.email);
        $scope.college = angular.copy(user.college);
        
        var address = angular.copy(user.address);
        $scope.address = address.split(",");
        $scope.dogNum = angular.copy(user.dogNum);
        $scope.catNum = angular.copy(user.catNum);
        $scope.otherPet = angular.copy(user.otherPet);
        $scope.otherNum = angular.copy(user.otherNum);
    }
    $scope.submit = function(){
        var data = $.param({
            user: JSON.stringify({
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: "uscRocks",
                college: $scope.college,
                address: $scope.address,
                dogNum: $scope.dogNum,
                catNum: $scope.catNum
            })
        });
        
        $http.post('/api/profile/', data).success(function(data, status) {
            console.log('New user created successfully');
        })
    }
}])
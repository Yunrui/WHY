// 登录页面控制器
var app = angular.module("RegisterApp", []);
app.controller("RegisterController", ["$scope", "$http", function ($scope, $http) {

  $scope.register = function () {
    // if neither of username, password and nickname are empty, set error message
    if (!$scope.username || !$scope.password || !$scope.nickname) {
      $scope.error = "用户名、密码和昵称不能为空";
      return;
    }

    var data = {
      username: $scope.username,
			// if password is undefined, it will be set to empty string
			password: $scope.password || "",
      nickname: $scope.nickname || "",
    };

    $http.post("http://api.yyds-ai.com/register", data).then(
      function (response) {
        if (response.data.isOK) {
          window.location.href = "login.html";
        } else {
          $scope.error = response.data.message;
        }
      },
      function (error) {
				$scope.error = "注册失败";
      }
    );
  };
}]);
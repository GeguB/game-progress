(function()
{
    angular
        .module("GameProgress")
        .controller("LoginCtrl", LoginCtrl);
    
    function LoginCtrl($scope, $location, $rootScope, UserService)
    {
        $scope.login = login;

        function login(user)
        {
            if(user)
            UserService
                .login(user)
                .then(
                    function(response)
                    {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
  
})();

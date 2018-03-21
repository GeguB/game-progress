(function() {
    angular.module("GameProgress")
        .config(function($routeProvider, $httpProvider) {
            $routeProvider
              .when('/home', {
                  templateUrl: 'views/home/home.view.html',
                  controller: 'HomeController',
                  resolve: {
                      loggedin: checkCurrentUser
                  }
              })
              .when('/profile', {
                  templateUrl: 'views/profile/profile.view.html',
                  controller: 'ProfileCtrl',
                  resolve: {
                      loggedin: checkLoggedin
                  }
              })
              .when('/admin', {
                  templateUrl: 'views/admin/admin.view.html',
                  controller: 'AdminController',
                  resolve: {
                      loggedin: checkAdmin
                  }
              })
              .when('/login', {
                  templateUrl: 'views/login/login.view.html',
                  controller: 'LoginCtrl',
                  controllerAs: 'model'
              })
              .when('/register', {
                  templateUrl: 'views/register/register.view.html',
                  controller: 'RegisterCtrl',
                  controllerAs: 'model'
              })
              .when('/game', {
                  templateUrl: 'views/newGame/newGame.view.html',
                  controller: 'NewGameCtrl',
                  controllerAs: 'model'
              })
                .when('/games', {
                    templateUrl: 'views/allGames/allGames.view.html',
                    controller: 'AllGamesCtrl',
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when('/user/games', {
                    templateUrl: 'views/usersGames/usersGames.view.html',
                    controller: 'UsersGamesCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/list/user/:id', {
                    templateUrl: 'views/otherUsersList/otherUsersList.view.html',
                    controller: 'OtherUsersListCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
              .otherwise({
                  redirectTo: '/home'
              });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
    
        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });
        
        return deferred.promise;
    };
    
    
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
    
        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });
        
        return deferred.promise;
    };
    
    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
    
        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });
        
        return deferred.promise;
    };

  
})();


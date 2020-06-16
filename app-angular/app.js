const appJS = angular.module('appJS', ['ngStorage', 'ngRoute']);

//Configuração das rotas
appJS.config(function ($routeProvider) {

    $routeProvider
        .when('/clientes', {
            templateUrl: 'app/view/cliente.view.html',
            controller: 'ClienteController'
        })
        .when('/estados', {
            templateUrl: 'app/view/estado.view.html',
            controller: 'EstadoController'
        })
        .when('/signin', {
            templateUrl: 'app/view/signin.view.html',
            controller: 'SignController'
        })
        .when('/signup', {
            templateUrl: 'app/view/signup.view.html',
            controller: 'SignController'
        })
        .otherwise({ redirectTo: '/clientes' });

});

//Define que acontecerá na execução da aplicação
appJS.run(function ($rootScope, $location, $sessionStorage) {

    $rootScope.$on('$locationChangeStart', function () {

        if ($location.path().indexOf('sign') < 0) {
            //Verifica se o usuário entrou
            if (!$sessionStorage.logado) {
                $location.path('/signin');
            }
        }
    });

});
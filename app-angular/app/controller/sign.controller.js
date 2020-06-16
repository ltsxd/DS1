(function (app) {
    'use strict';

    app.controller('SignController', function ($scope, SignService, $location) {
        //Variaveis para o signin
        $scope.username = '';
        $scope.password = '';

        //Variaveis para o signup
        $scope.usuario = {
            nome: '',
            username: '',
            password: ''
        }

        //Metodo disparado pelo botão ENTRAR
        $scope.signin = function () {
            //Limpar a variavel de controle
            $scope.userFail = false;
            $scope.passFail = false;

            SignService.entrar($scope.username, $scope.password)
                .then(function (result) {
                    $location.path('/clientes');
                })
                .catch(function (error) {  
                    if (error == 'password-fail') {
                        $scope.passFail = true;
                    } else {
                        $scope.userFail = true;
                    }
                });
        }

        //Metodo disparado pelo botão CASDASTRAR-SE
        $scope.signup = function () {
            //Limpar a variavel de controle
            $scope.userFail = false;

            SignService.cadastrar($scope.usuario)
                .then(function (result) {
                    $location.path('/signin');
                })
                .catch(function (error) {
                    $scope.userFail = true;
                    console.log('Deu pau: ' + error)
                });

        }
    });

})(appJS)
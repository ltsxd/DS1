(function( app ){
   'use strict';
   
   app.controller('ClienteController', function( $scope, ClienteService, EstadoService, $rootScope ){
    
    //Sinaliza a página ativa
    $rootScope.menuAtivo = 'clientes';
    
    //Controle para OrderBy e Filter
    $scope.decrescente = false;
    $scope.selectedColumn = 'id';

    //Controle de exibição da tabela/formulario
    $scope.showTable = true;

    //Seta a coluna para ser filtrada/ordenada
    $scope.setColumn = function ( columnName ){
        $scope.selectedColumn = columnName;

        //determina o ordenação decrescente (false)
        $scope.decrescente = !$scope.decrescente;
    }

    //Retornar para o FILTER qual a coluna será utilizada na ordenação/filtro
    $scope.filter = function() {
        var filtro = {};

        filtro[$scope.selectedColumn] = $scope.textFilter;

        return filtro;
    }

    //Prepara a tela para um novo cadastro
    $scope.novo = function() {
        //Representar o cliente atual
        $scope.cliente = {
            nome: '',
            email: '',
            cidade: '',
            estado: ''
        }

        $scope.showTable = false;
    }

    //Cancelar a inclusao/edicao
    $scope.cancelar = function () {
        $scope.showTable = true;
    }

    //Salvar a inclusão/edição do cliente
    $scope.salvar = function() {
        ClienteService.salvar($scope.cliente).then(function( result) {
            $scope.showTable = true;
        });
        
    }

    //Editar o cliente selecionado
    $scope.editar = function(cliente) {
        $scope.cliente = cliente;
        $scope.showTable = false;
    }

    //Excluir o cliente selecionado
    $scope.excluir = function() {
        ClienteService.remover($scope.cliente).then(function(result){
            $scope.showTable = true;
        });
    }

    //Carrega uma lista de clientes
    ClienteService.listar().then(function( result ){
        $scope.estados = [];
        $scope.clientes = result.data;

        //Carrega os estados cadastrados
        EstadoService.listar().then(function(result2){
            $scope.estados = result2.data;
        });
    });

   });

})( appJS );
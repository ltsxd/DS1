(function( app ){
   'use strict';
   
   app.controller('EstadoController', function( $scope, EstadoService, $rootScope ){
    //Sinaliza a página ativa
    $rootScope.menuAtivo = 'estados';

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
        //Representar o estado atual
        $scope.estado = {
            nome: ''
        }

        $scope.showTable = false;
    }

    //Cancelar a inclusao/edicao
    $scope.cancelar = function () {
        $scope.showTable = true;
    }

    //Salvar a inclusão/edição do estado
    $scope.salvar = function() {
        EstadoService.salvar($scope.estado).then(function( result) {
            $scope.showTable = true;
        });
        
    }

    //Editar o estado selecionado
    $scope.editar = function(estado) {
        $scope.estado = estado;
        $scope.showTable = false;
    }

    //Excluir o estado selecionado
    $scope.excluir = function() {
        EstadoService.remover($scope.estado).then(function(result){
            $scope.showTable = true;
        });
    }

    //Carrega uma lista de estados
    EstadoService.listar().then(function( result ){
        $scope.estados = result.data;
    });

   });

})( appJS );
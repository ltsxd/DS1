(function (app) {
    'use strict';

    app.service('ClienteService', function ($q, $localStorage) {
        const deferred = $q.defer();

        function loadJSON() {
            deferred.resolve({ data: $localStorage.clientes || [] });

            return deferred.promise;
        }

        function save(cliente) {
            var dados = $localStorage.clientes || [];

            if (!cliente.id) {
                //Pega o ultimo registro
                var ultimo = dados[dados.length - 1];

                //Incrementa o valor de ID o ultimo registro
                cliente.id = ultimo ? ultimo.id + 1 : 1;

                //Adiciona o cliente no vetor
                dados.push(cliente);

                //Devolve o vetor para o localstorage
                $localStorage.clientes = dados;
            }

            deferred.resolve(cliente);

            return deferred.promise;
        }

        function remove( cliente ) {
            var dados = $localStorage.clientes;

            //Procura o index do cliente que está vindo por parametro
            var index = dados.indexOf( cliente );

            //Remove a partir do indice uma qtdade de elementos, no caso 1
            dados.splice(index, 1)

            //Atualioza local storage
            $localStorage.clientes = dados;

            deferred.resolve({data: dados});
            return deferred.promise;
        }

        return {
            listar: loadJSON,
            salvar: save,
            remover: remove
        }

    });

})(appJS);
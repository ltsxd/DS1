(function (app) {
    'use strict';

    app.service('EstadoService', function ($q, $localStorage) {
        const deferred = $q.defer();

        function loadJSON() {
            deferred.resolve({ data: $localStorage.estados || [] });

            return deferred.promise;
        }

        function save(estado) {
            var dados = $localStorage.estados || [];

            if (!estado.id) {
                //Pega o ultimo registro
                var ultimo = dados[dados.length - 1];

                //Incrementa o valor de ID o ultimo registro
                estado.id = ultimo ? ultimo.id + 1 : 1;

                //Adiciona o estado no vetor
                dados.push(estado);

                //Devolve o vetor para o localstorage
                $localStorage.estados = dados;
            }

            deferred.resolve(estado);

            return deferred.promise;
        }

        function remove( estado ) {
            var dados = $localStorage.estados;

            //Procura o index do estado que está vindo por parametro
            var index = dados.indexOf( estado );

            //Remove a partir do indice uma qtdade de elementos, no caso 1
            dados.splice(index, 1)

            //Atualioza local storage
            $localStorage.estados = dados;

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
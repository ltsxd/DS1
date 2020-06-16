(function(app) {
    'use strict';

    app.service('SignService', function($q, $localStorage, $sessionStorage) {
        
        //Procura um username que já esteja cadastrando, encontrando devolve o usuário (objeto)
        function find(username) {
            let usuarios = $localStorage.usuarios || [];

            for (let i = 0; i < usuarios.length; i++) {
                let usuario = usuarios[i];
                
                if (username == usuario.username) {
                    return usuario;
                }
            }

            return false;
        }

        //Cadastra um novo usuário
        function createUser(usuario) {
            const deferred = $q.defer();

            let usuarios = $localStorage.usuarios || [];

            //Adiciona o usuario no vetor
            usuarios.push(usuario);

            //Devolve o vetor para a storage
            $localStorage.usuarios = usuarios;

            //Retorna para que chamou o metodo o usuario recém cadastrado
            deferred.resolve(usuario);

            return deferred.promise;
        }

        function signin(username, password) {
            const deferred = $q.defer();

            let usuario = find(username);

            //Se usuario for FALSE, significa que o usuároi não exite (ou seja, inválido)
            if (usuario) {
            
                //Comparar a senha do parametro (PASSWORD) com a senha do objeto usuario
                if (password == usuario.password) {
                    //Gravar usuário logado na sessão
                    $sessionStorage.logado = usuario;

                    deferred.resolve(usuario);
                } else {
                    deferred.reject('password-fail');
                }
            } else {
                deferred.reject('Usuário inválido');
            }


            return deferred.promise;
        }
        function signup(novousuario) {
            const deferred = $q.defer();

            let usuario = find(novousuario.username);

            //Primeiro valida se não existe um usuário com o mesmo username
            if (!usuario) {
                return createUser(novousuario);
            } else {
                deferred.reject('Usuário já existe');
            }

            return deferred.promise;
        }
        function logout() {
            const deferred = $q.defer();
            
            //Remove o usuário logado da sessão
            $sessionStorage.$reset({
                logado: false
            });

            return deferred.promise;
        }

        return {
            entrar: signin,
            cadastrar: signup,
            sair: logout
        }
    });

})( appJS );
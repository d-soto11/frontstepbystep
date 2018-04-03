(function (ng) {
    var mod = ng.module("authorModule");
    mod.constant("authorsContext", "api/authors");
    mod.controller('authorCtrl', ['$scope', '$http', 'authorsContext',
        /**
         * @ngdoc controller
         * @name authors.controller:authorCtrl
         * @description
         * Definición del controlador de Angular del módulo Autores. 
         * Se crea el controlador con el cual se maneja el módulo.
         * En el controlador se definen los atributos y métodos que pueden
         * ser accedidos desde el HTML utilizando el $scope.
         * @param {Object} $scope Referencia injectada al Scope definida para este
         * controlador, el scope es el objeto que contiene las variables o 
         * funciones que se definen en este controlador y que son utilizadas 
         * desde el HTML.
         * @param {Object} $http Objeto injectado para la manejar consultas HTTP
         * @param {Object} authorsContext Constante injectada que contiene la ruta
         * donde se encuentra el API de Autores en el Backend.
         */
        function ($scope, $http, authorsContext) {
            /**
             * @ngdoc function
             * @name getAuthors
             * @methodOf authors.controller:authorCtrl
             * @description
             * Esta función utiliza el protocolo HTTP para obtener el recurso 
             * donde se encuentran los autores en formato JSON. El recurso
             * puede ser un archivo o un API Rest. La función se ejecuta
             * automáticamente cuando el controlador es accedido desde el
             * navegador.
             * @param {String} URL Dirección donde se encuentra el recurso
             * de los autores o API donde se puede consultar.
             */
            $http.get('data/authors.json').then(function (response) {
                $scope.authorsRecords = response.data;
            });
        }
    ]);
}
)(window.angular);
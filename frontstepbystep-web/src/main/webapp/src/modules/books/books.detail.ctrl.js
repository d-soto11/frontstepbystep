(function (ng) {
    var mod = ng.module("bookModule");
    mod.constant("booksContext", "api/books");
    mod.controller('bookDetailCtrl', ['$scope', '$http', 'booksContext', '$state',
        /**
         * @ngdoc controller
         * @name books.controller:bookDetailCtrl
         * @description
         * Definición de un controlador auxiliar del módulo Libros. 
         * Se crea el controlador con el cual se manejan las vistas de detalle
         * del módulo.
         * @param {Object} $scope Referencia injectada al Scope definida para este
         * controlador, el scope es el objeto que contiene las variables o 
         * funciones que se definen en este controlador y que son utilizadas 
         * desde el HTML.
         * @param {Object} $http Objeto injectado para la manejar consultas HTTP
         * @param {Object} booksContext Constante injectada que contiene la ruta
         * donde se encuentra el API de Libros en el Backend.
         * @param {Object} $state Dependencia injectada en la que se recibe el 
         * estado actual de la navegación definida en el módulo.
         */
        function ($scope, $http, booksContext, $state) {           
            if (($state.params.bookId !== undefined)&& ($state.params.bookId !== null)) {
             /**
             * @ngdoc function
             * @name getBookID
             * @methodOf books.controller:bookDetailCtrl
             * @description
             * Esta función utiliza el protocolo HTTP para obtener el recurso 
             * donde se encuentra el libro por ID en formato JSON.
             * @param {String} URL Dirección donde se encuentra el recurso
             * del libro o API donde se puede consultar.
             */
                $http.get(booksContext + '/' + $state.params.bookId).then(function (response) {
                    $scope.currentBook = response.data;
                });
            }
        }
    ]);
}
)(window.angular);
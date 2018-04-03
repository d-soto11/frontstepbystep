(function (ng) {
    var mod = ng.module("reviewModule");
    mod.constant("reviewsContext", "reviews");
    mod.constant("booksContext", "api/books");
    mod.controller('reviewsCtrl', ['$scope', '$http', 'booksContext', '$state', 'reviewsContext',
        /**
         * @ngdoc controller
         * @name reviews.controller:reviewsCtrl
         * @description
         * Definición del controlador de Angular del módulo Reseñas. 
         * Se crea el controlador con el cual se maneja el módulo.
         * En el controlador se definen los atributos y métodos que pueden
         * ser accedidos desde el HTML utilizando el $scope.
         * @param {Object} $scope Referencia injectada al Scope definida para este
         * controlador, el scope es el objeto que contiene las variables o 
         * funciones que se definen en este controlador y que son utilizadas 
         * desde el HTML.
         * @param {Object} $http Objeto injectado para la manejar consultas HTTP
         * @param {Object} booksContext Constante injectada que contiene la ruta
         * donde se encuentra el API de Libros en el Backend.
         * @param {Object} $state Dependencia injectada en la que se recibe el 
         * estado actual de la navegación definida en el módulo.
         * @param {Object} reviewsContext Constante injectada que contiene la ruta
         * donde se encuentra el API de Reseñas en el Backend.
         */
        function ($scope, $http, booksContext, $state, reviewsContext) {
            $http.get(booksContext + '/' + $state.params.bookId + '/' + reviewsContext).then(function (response) {
                $scope.reviewsRecords = response.data;
            });
        }
    ]);
}
)(window.angular);
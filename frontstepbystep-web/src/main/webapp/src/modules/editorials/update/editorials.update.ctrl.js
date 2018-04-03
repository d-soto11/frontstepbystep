(function (ng) {
    var mod = ng.module("editorialModule");
    mod.constant("editorialsContext", "api/editorials");
    mod.constant("booksContext", "api/books");
    mod.controller('editorialUpdateCtrl', ['$scope', '$http', 'editorialsContext', '$state', 'booksContext', '$rootScope',
        /**
         * @ngdoc controller
         * @name editorials.controller:editorialUpdateCtrl
         * @description
         * Definición del controlador auxiliar para actualizar Editoriales. 
         * @param {Object} $scope Referencia injectada al Scope definida para este
         * controlador, el scope es el objeto que contiene las variables o 
         * funciones que se definen en este controlador y que son utilizadas 
         * desde el HTML.
         * @param {Object} $http Objeto injectado para la manejar consultas HTTP
         * @param {Object} editorialContext Constante injectada que contiene la ruta
         * donde se encuentra el API de Editoriales en el Backend.
         * @param {Object} $state Dependencia injectada en la que se recibe el 
         * estado actual de la navegación definida en el módulo.
         * @param {Object} booksContext Constante injectada que contiene la ruta
         * donde se encuentra el API de Libros en el Backend.
         */
        function ($scope, $http, editorialsContext, $state, booksContext, $rootScope) {
            $rootScope.edit = true;

            $scope.data = {};

            var idEditorial = $state.params.editorialId;

            /**
             * @ngdoc function
             * @name getEditorialID
             * @methodOf editorials.controller:editorialUpdateCtrl
             * @description
             * Esta función utiliza el protocolo HTTP para obtener el recurso 
             * donde se encuentra la editorial por ID en formato JSON.
             * @param {String} URL Dirección donde se encuentra el recurso
             * de la editorial o API donde se puede consultar.
             */
            $http.get(editorialsContext + '/' + idEditorial).then(function (response) {
                var editorial = response.data;
                $scope.data.name = editorial.name;
            });

            /**
             * @ngdoc function
             * @name createEditorial
             * @methodOf editorials.controller:editorialUpdateCtrl
             * @description
             * Esta función utiliza el protocolo HTTP para actualizar la editorial 
             * por ID en formato JSON.
             * @param {String} id El ID de la editorial a actualizar.
             * @param {Object} editorial Objeto con la información nueva de la editorial.
             */
            $scope.createEditorial = function () {
                $http.put(editorialsContext + "/" + idEditorial, $scope.data).then(function (response) {
                    $state.go('editorialsList', {editorialId: response.data.id}, {reload: true});
                });
            }
        }]);
}
)(window.angular);
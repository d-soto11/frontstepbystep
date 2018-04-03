(function (ng) {
    var mod = ng.module("editorialModule");
    mod.constant("editorialsContext", "api/editorials");
    mod.controller('editorialDeleteCtrl', ['$scope', '$http', 'editorialsContext', '$state',
        /**
         * @ngdoc controller
         * @name editorials.controller:editorialDeleteCtrl
         * @description
         * Definición del controlador auxiliar para eliminar Editoriales. 
         * @param {Object} $scope Referencia injectada al Scope definida para este
         * controlador, el scope es el objeto que contiene las variables o 
         * funciones que se definen en este controlador y que son utilizadas 
         * desde el HTML.
         * @param {Object} $http Objeto injectado para la manejar consultas HTTP
         * @param {Object} editorialContext Constante injectada que contiene la ruta
         * donde se encuentra el API de Editoriales en el Backend.
         * @param {Object} $state Dependencia injectada en la que se recibe el 
         * estado actual de la navegación definida en el módulo.
         */
        function ($scope, $http, editorialssContext, $state) {
            var idEditorial = $state.params.editorialId;
            /**
             * @ngdoc function
             * @name deleteEditorial
             * @methodOf editorials.controller:editorialDeleteCtrl
             * @description
             * Esta función utiliza el protocolo HTTP para eliminar la editorial.
             * @param {String} id El ID de la editorial a eliminar.
             */
            $scope.deleteEditorial = function () {
                $http.delete(editorialssContext + '/' + idEditorial, {}).then(function (response) {
                    $state.go('editorialsList', {editorialsId: response.data.id}, {reload: true});
                });
            };
        }
    ]);
}
)(window.angular);
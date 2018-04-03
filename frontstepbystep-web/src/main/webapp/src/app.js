/**
 * @ngdoc overview
 * @name mainApp.module:mainApp
 * @description
 * Definición del módulo principal de Angular. El módulo encapsula todos los
 * módulos de la aplicación incluyendo los módulos externos que son injectados
 * dentro de otros módulos (como Bootstrap y el Router). Este módulo inicia la
 * aplicación al momento de ingresar a cualquier página de la aplicación por
 * primera vez.
 */
(function (ng) {
    var app = angular.module('mainApp', [
        // External dependencies
        'ui.router',
        'ui.bootstrap',
        // Internal modules dependencies       
        'bookModule',
        'authorModule',
        'editorialModule',
        'reviewModule'

    ]);
    // Resuelve problemas de las promesas
    app.config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);
})(window.angular);

/**
 * @ngdoc overview
 * @name books.module:bookModule
 * @description
 * Definición del módulo de Angular de Libros. El módulo encapsula todos los 
 * controladores y los templates HTML que estén relacionados con los Libros 
 * directamente. En la configuración del módulo se injecta la dependencia de 
 * ui.router que es la que se utiliza para la configuración de las URLs bajo las
 * cuales se accede al módulo. Por ejemplo, para mostrar los libros en la 
 * URL: 'localhost:8080/books/list' es necesario configurar el router por 
 * medio del stateProvider que informa a AngularJS de la relación entre la URL, 
 * un estado definido (estado de mostrar libros), el controlador y la vista 
 * correspondiente.
 */
(function (ng) {
    // Definición del módulo
    var mod = ng.module("bookModule", ['ui.router']);
    // Configuración de los estados del módulo
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            // En basePath se encuentran los templates y controladores de módulo
            var basePath = 'src/modules/books/';
            // Mostrar la lista de libros será el estado por defecto del módulo
            $urlRouterProvider.otherwise("/booksList");
            // Definición del estado 'booksList' donde se listan los libros
            $stateProvider.state('booksList', {
                // Url que aparecerá en el browser
                url: '/books/list',
                 views: {
                    'mainView': {
                        templateUrl: basePath + 'books.list.html',
                        controller: 'bookCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            });
        }
    ]);
})(window.angular);

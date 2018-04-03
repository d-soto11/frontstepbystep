/**
 * @ngdoc overview
 * @name reviews.module:reviewModule
 * @description
 * Definición del módulo de Angular de Editorial. El módulo encapsula todos los 
 * controladores y los templates HTML que estén relacionados con la Reseña 
 * directamente. En la configuración del módulo se injecta la dependencia de 
 * ui.router que es la que se utiliza para la configuración de las URLs bajo las
 * cuales se accede al módulo. Por ejemplo, para mostrar las editoriales en la 
 * URL: 'localhost:8080/reviews/list' es necesario configurar el router por 
 * medio del stateProvider que informa a AngularJS de la relación entre la URL, 
 * un estado definido (estado de mostrar editoriales), el controlador y la vista 
 * correspondiente. Los estados definidos en este modulo son:
 * ```
 * | ESTADO          | URL                        | VISTAS                 |
 * |-----------------|----------------------------|------------------------|
 * | reviews         | /reviews                   | mainView:              |
 * |                 |                            | reviews.html           |
 * |                 |                            |                        |
 * | reviewsList     | /list                      | listView:              |
 * |                 |                            | reviews.list.html      |
 * |                 |                            |                        |
 * |-----------------|----------------------------|------------------------|
 *```
 */
(function (ng) {
    var mod = ng.module("reviewModule", ['bookModule', 'ui.router']);
    mod.constant("reviewsContext", "reviews");
    mod.constant("booksContext", "api/books");

    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/reviews/';
            $urlRouterProvider.otherwise("/reviewsList");

            $stateProvider.state('reviews', {
                url: '/reviews',
                abstract: true,
                parent: 'bookDetail',
                views: {
                    childrenView: {
                        templateUrl: basePath + 'reviews.html'
                    }
                }
                ,
                data: {
                    requireLogin: false,
                    roles: []
                }
            }).state('reviewsList', {
                url: '/list',
                parent: 'reviews',
                views: {
                    'listView': {
                        templateUrl: basePath + 'reviews.list.html',
                        controller: 'reviewsCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            });
        }]);
})(window.angular);
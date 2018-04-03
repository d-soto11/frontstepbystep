/**
 * @ngdoc overview
 * @name authors.module:authorModule
 * @description
 * Definición del módulo de Angular de Autores. El módulo encapsula todos los 
 * controladores y los templates HTML que estén relacionados con los Autores 
 * directamente. En la configuración del módulo se injecta la dependencia de 
 * ui.router que es la que se utiliza para la configuración de las URLs bajo las
 * cuales se accede al módulo. Por ejemplo, para mostrar los autores en la 
 * URL: 'localhost:8080/authors/list' es necesario configurar el router por 
 * medio del stateProvider que informa a AngularJS de la relación entre la URL, 
 * un estado definido (estado de mostrar autores), el controlador y la vista 
 * correspondiente. Los estados definidos en este modulo son:
 * ```
 * | ESTADO          | URL                        | VISTAS                 | DESCRIPCIÓN        |
 * |-----------------|----------------------------|------------------------|--------------------|
 * | authors         | /authors                   | mainView:              | Estado definido    |
 * |                 |                            | authors.html           | para la vista ini- |
 * |                 |                            |                        | cial de autores.   |
 * | authorsList     | /list                      | listView:              | Estado definido    |
 * |                 |                            | authors.list.html      | para la lista de   |
 * |                 |                            |                        | autores general.   |
 * | authorDetail    | /{authorId:int}/detail     | listView:              | Estado definido    |
 * |                 |                            | authors.list.html      | para las vistas del| 
 * |                 |                            | detailView:            | detalle de un autor|
 * |                 |                            | authors.detail.html    |                    |
 * |-----------------|----------------------------|------------------------|--------------------|
 *```
 */
(function (ng) {
    var mod = ng.module("authorModule", ['ui.router']);
    mod.constant("authorsContext", "api/authors");
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/authors/';
            var basePathBooks = 'src/modules/books/';
            $urlRouterProvider.otherwise("/authorsList");

            $stateProvider.state('authors', {
                url: '/authors',
                abstract: true,
                views: {
                    'mainView': {
                        templateUrl: basePath + 'authors.html',
                        controller: 'authorCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            }).state('authorsList', {
                url: '/list',
                parent: 'authors',
                views: {
                    'listView': {
                        templateUrl: basePath + 'authors.list.html'
                    }
                }
            }).state('authorDetail', {
                url: '/{authorId:int}/detail',
                parent: 'authors',
                param: {
                    authorId: null
                },
                views: {
                    'listView': {
                        templateUrl: basePathBooks + 'books.list.html',
                        controller: 'authorDetailCtrl',
                        controllerAs: 'ctrl'
                    },
                    'detailView': {
                        templateUrl: basePath + 'authors.detail.html',
                        controller: 'authorDetailCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            });
        }]);
})(window.angular);
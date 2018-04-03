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
 * correspondiente. Los estados definidos en este modulo son:
 * ```
 * | ESTADO          | URL                        | VISTAS                 |
 * |-----------------|----------------------------|------------------------|
 * | books           | /books                     | mainView:              |
 * |                 |                            | books.html             |
 * |                 |                            |                        |
 * | booksList       | /list                      | listView:              |
 * |                 |                            | books.list.html        |
 * |                 |                            |                        |
 * | bookDetail      | /{bookId:int}/detail       | listView:              |
 * |                 |                            | books.list.html        |
 * |                 |                            | detailView:            |
 * |                 |                            | books.detail.html      |
 * |-----------------|----------------------------|------------------------|
 *```
 */
(function (ng) {
    var mod = ng.module("bookModule", ['ui.router']);
    mod.constant("booksContext", "api/books");
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/books/';
            $urlRouterProvider.otherwise("/booksList");

            $stateProvider.state('books', {
                url: '/books',
                abstract: true,
                views: {
                    'mainView': {
                        templateUrl: basePath + 'books.html',
                        controller: 'bookCtrl',
                        controllerAs: 'ctrl'
                    }
                }
                ,
                data: {
                    requireLogin: false,
                    roles: []
                }
            }).state('booksList', {
                url: '/list',
                parent: 'books',
                views: {
                    'listView': {
                        templateUrl: basePath + 'books.list.html'
                    }
                }
            }).state('bookDetail', {
                url: '/{bookId:int}/detail',
                parent: 'books',
                param: {
                    bookId: null
                },
                views: {
                    'listView': {
                        templateUrl: basePath + 'books.list.html',
                        controller: 'bookDetailCtrl',
                        controllerAs: 'ctrl'
                    },
                    'detailView': {
                        templateUrl: basePath + 'books.detail.html',
                        controller: 'bookDetailCtrl',
                        controllerAs: 'ctrl'
                    }

                }

            });
        }]);
})(window.angular);

/**
 * @ngdoc overview
 * @name editorials.module:editorialModule
 * @description
 * Definición del módulo de Angular de Editorial. El módulo encapsula todos los 
 * controladores y los templates HTML que estén relacionados con la Editorial 
 * directamente. En la configuración del módulo se injecta la dependencia de 
 * ui.router que es la que se utiliza para la configuración de las URLs bajo las
 * cuales se accede al módulo. Por ejemplo, para mostrar las editoriales en la 
 * URL: 'localhost:8080/editorials/list' es necesario configurar el router por 
 * medio del stateProvider que informa a AngularJS de la relación entre la URL, 
 * un estado definido (estado de mostrar editoriales), el controlador y la vista 
 * correspondiente. Los estados definidos en este modulo son:
 * ```
 * | ESTADO           | URL                        | VISTAS                 |
 * |------------------|----------------------------|------------------------|
 * | editorials       | /editorials                | mainView:              |
 * |                  |                            | editorials.html        |
 * | editorialsList   | /list                      | listView:              |
 * |                  |                            | editorials.list.html   |
 * | editorialDetail  | /{editorialsId:int}/detail | listView:              |
 * |                  |                            | books.list.html        |
 * |                  |                            | detailView:            |
 * |                  |                            | editorials.detail.html |
 * | editorialsCreate | /create                    | detailView: (/new)     |
 * |                  |                            | /editorials.new.html   |
 * | editorialUpdate  | /update/{editorialId:int}  | detailView: (/new)     |
 * |                  |                            | /editorials.new.html   |
 * | editorialDelete  | /delete/{editorialId:int}  | detailView: (/delete)  |
 * |                  |                            | /editorials.delete.html|
 * |------------------|----------------------------|------------------------|
 *```
 */
(function (ng) {
    var mod = ng.module("editorialModule", ['ui.router']);
    mod.constant("editorialsContext", "api/editorials");
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/editorials/';
            var basePathBooks = 'src/modules/books/';
            $urlRouterProvider.otherwise("/editorialsList");
            $stateProvider.state('editorials', {
                url: '/editorials',
                abstract: true,
                views: {
                    'mainView': {
                        templateUrl: basePath + 'editorials.html',
                        controller: 'editorialCtrl',
                        controllerAs: 'ctrl'
                    }
                }
                ,
                data: {
                    requireLogin: false,
                    roles: ['admin', 'assistant']
                }
            }).state('editorialsList', {
                url: '/list',
                parent: 'editorials',
                views: {
                    'listView': {
                        templateUrl: basePath + 'editorials.list.html'
                    }
                }
            }).state('editorialDetail', {
                url: '/{editorialsId:int}/detail',
                parent: 'editorials',
                param: {
                    editorialsId: null
                },
                views: {
                    'listView': {
                        templateUrl: basePathBooks + 'books.list.html',
                        controller: 'editorialDetailCtrl',
                        controllerAs: 'ctrl'
                    },
                    'detailView': {
                        templateUrl: basePath + 'editorials.detail.html',
                        controller: 'editorialDetailCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            }).state('editorialsCreate', {
                url: '/create',
                parent: 'editorials',
                views: {
                    'detailView': {
                        templateUrl: basePath + '/new/editorials.new.html',
                        controller: 'editorialNewCtrl'
                    }
                }
                ,
                data: {
                    requireLogin: true,
                    roles: ['admin']
                }
            }).state('editorialUpdate', {
                url: '/update/{editorialId:int}',
                parent: 'editorials',
                param: {
                    editorialId: null
                },
                views: {
                    'detailView': {
                        templateUrl: basePath + '/new/editorials.new.html',
                        controller: 'editorialUpdateCtrl'
                    }
                }
                ,
                data: {
                    requireLogin: true,
                    roles: ['admin']
                }
            }).state('editorialDelete', {
                url: '/delete/{editorialId:int}',
                parent: 'editorials',
                param: {
                    editorialId: null
                },
                views: {
                    'detailView': {
                        templateUrl: basePath + '/delete/editorials.delete.html',
                        controller: 'editorialDeleteCtrl'
                    }
                }
                ,
                data: {
                    requireLogin: true,
                    roles: ['admin', 'assistant']
                }
            });
        }]);
})(window.angular);

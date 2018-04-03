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
 * | ESTADO          | URL                        | VISTAS                 |
 * |-----------------|----------------------------|------------------------|
 * | editorials      | /editorials                | mainView:              |
 * |                 |                            | editorials.html        |
 * |                 |                            |                        |
 * | editorialsList  | /list                      | listView:              |
 * |                 |                            | editorials.list.html   |
 * |                 |                            |                        |
 * | editorialDetail | /{editorialsId:int}/detail | listView:              |
 * |                 |                            | books.list.html        |
 * |                 |                            | detailView:            |
 * |                 |                            | editorials.detail.html |
 * |-----------------|----------------------------|------------------------|
 *```
 */
(function (ng) {
    // Definición del módulo
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
            });
        }]);
})(window.angular);

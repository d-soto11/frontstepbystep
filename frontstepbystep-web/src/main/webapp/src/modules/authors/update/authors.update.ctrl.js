(function (ng) {
    var mod = ng.module("authorModule");
    mod.constant("authorsContext", "api/authors");
    mod.constant("booksContext", "api/books");
    mod.controller('authorUpdateCtrl', ['$scope', '$http', 'authorsContext', '$state', 'booksContext', '$rootScope',
        /**
         * @ngdoc controller
         * @name authors.controller:authorUpdateCtrl
         * @description
         * Definición del controlador auxiliar para actualizar Autores. 
         * @param {Object} $scope Referencia injectada al Scope definida para este
         * controlador, el scope es el objeto que contiene las variables o 
         * funciones que se definen en este controlador y que son utilizadas 
         * desde el HTML.
         * @param {Object} $http Objeto injectado para la manejar consultas HTTP
         * @param {Object} authorsContext Constante injectada que contiene la ruta
         * donde se encuentra el API de Autores en el Backend.
         * @param {Object} $state Dependencia injectada en la que se recibe el 
         * estado actual de la navegación definida en el módulo.
         * @param {Object} booksContext Constante injectada que contiene la ruta
         * donde se encuentra el API de Libros en el Backend.
         * @param {Object} $filter Dependencia injectada para hacer filtros sobre
         * arreglos.
         */
        function ($scope, $http, authorsContext, $state, booksContext, $rootScope) {
            $rootScope.edit = true;

            $scope.data = {};

            $scope.selectedItems = [];

            $scope.availableItems = [];

            var idAuthor = $state.params.authorId;

            //Consulto el autor a editar.
            $http.get(authorsContext + '/' + idAuthor).then(function (response) {
                var author = response.data;
                $scope.data.name = author.name;
                $scope.data.birthDate = new Date(author.birthDate);
                $scope.data.description = author.description;
                $scope.data.image = author.image;
                $scope.getBooks(author.books);
            });

            /**
             * @ngdoc function
             * @name getBooks
             * @methodOf authors.controller:authorUpdateCtrl
             * @description
             * Esta función recarga la información de los libros del autor.
             * @param {[Object]} books Los libros a actualizar del autor
             */
            $scope.getBooks = function (books) {

                $http.get(booksContext).then(function (response) {

                    $scope.allBooks = response.data;
                    $scope.booksAuthor = books;

                    var filteredBooks = $scope.allBooks.filter(function (book) {
                        return $scope.booksAuthor.filter(function (bookAuthor) {
                            return bookAuthor.id === book.id;
                        }).length === 0;
                    });

                    var unFilteredBooks = $scope.allBooks.filter(function (book) {
                        return $scope.booksAuthor.filter(function (bookAuthor) {
                            return bookAuthor.id === book.id;
                        }).length !== 0;
                    });

                    if ($scope.booksAuthor.length === 0) {

                        $scope.availableItems = $scope.allBooks;

                    } else {

                        $scope.selectedItems = unFilteredBooks;
                        $scope.availableItems = filteredBooks;
                    }


                });
            };

            /**
             * @ngdoc function
             * @name createAuthor
             * @methodOf authors.controller:authorUpdateCtrl
             * @description
             * Crea un nuevo autor con los libros nuevos y la información del
             * $scope.
             */
            $scope.createAuthor = function () {
                $http.put(authorsContext + "/" + idAuthor, $scope.data).then(function (response) {
                    if ($scope.selectedItems.length >= 0) {
                        $http.put(authorsContext + "/" + response.data.id + "/books", $scope.selectedItems).then(function (response) {
                        });
                    }
                    //Author created successfully
                    $state.go('authorsList', {authorId: response.data.id}, {reload: true});
                });
            };
        }
    ]);
}
)(window.angular);
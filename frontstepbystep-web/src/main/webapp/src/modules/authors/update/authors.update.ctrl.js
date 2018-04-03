(function (ng) {
    var mod = ng.module("authorModule");
    mod.constant("authorsContext", "api/authors");
    mod.constant("booksContext", "api/books");
    mod.controller('authorUpdateCtrl', ['$scope', '$http', 'authorsContext', '$state', 'booksContext', '$rootScope', '$filter',
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
        function ($scope, $http, authorsContext, $state, booksContext, $rootScope, $filter) {
            $rootScope.edit = true;

            var idAuthor = $state.params.authorId;

            // Este arreglo guardara los ids de los books asociados y por asociar al autor.
            var idsBook = [];

            // Este arreglo mostrará los books una vez esten filtrados visualmente por lo que el autor ya tiene asociado.
            $scope.allBooksShow = [];

            //Consulto el autor a editar.
            $http.get(authorsContext + '/' + idAuthor).then(function (response) {
                var author = response.data;
                $scope.authorName = author.name;
                $scope.authorBirthDate = new Date(author.birthDate);
                $scope.authorDescription = author.description;
                $scope.authorImage = author.image;
                $scope.allBooksAuthor = author.books;
                $scope.mergeBooks($scope.allBooksAuthor);
            });

            /**
             * @ngdoc function
             * @name mergeBooks
             * @methodOf authors.controller:authorUpdateCtrl
             * @description
             * Esta función añade los ids de los books que ya tiene el autor asociado.
             * @param {[Object]} books Los libros asociados al autor
             */
            $scope.mergeBooks = function (books) {
                for (var item in books) {
                    idsBook.push("" + books[item].id);
                }
                $scope.getBooks(books);
            };

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
                    $scope.Allbooks = response.data;
                    $scope.booksAuthor = books;

                    var filteredBooks = $scope.Allbooks.filter(function (Allbooks) {
                        return $scope.booksAuthor.filter(function (booksAuthor) {
                            return booksAuthor.id == Allbooks.id;
                        }).length == 0
                    });

                    $scope.allBooksShow = filteredBooks;

                });
            };


            //funciones para el drag and drop de HTML5 nativo
            $scope.allowDrop = function (ev) {
                ev.preventDefault();
            };

            $scope.drag = function (ev) {
                ev.dataTransfer.setData("text", ev.target.id);
            };

            $scope.dropAdd = function (ev) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                ev.target.appendChild(document.getElementById(data));
                //Cuando un book se añade al autor, se almacena su id en el array idsBook
                idsBook.push("" + data);
            };

            $scope.dropDelete = function (ev) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                ev.target.appendChild(document.getElementById(data));
                //Para remover el book que no se va asociar, por eso se usa el splice que quita el id del book en el array idsBook
                var index = idsBook.indexOf(data);
                if (index > -1) {
                    idsBook.splice(index, 1);
                }
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
                /*Se llama a la función newBooks() para buscar cada uno de los ids de los books
                 en el array que tiene todos los books y así saber como queda la lista final de los books asociados al autor.
                 */
                $scope.newBooks();
                $http.put(authorsContext + "/" + idAuthor, {
                    name: $scope.authorName,
                    birthDate: $scope.authorBirthDate,
                    description: $scope.authorDescription,
                    image: $scope.authorImage
                }).then(function (response) {
                    if (idsBook.length >= 0) {
                        $http.put(authorsContext + "/" + response.data.id + "/books", $scope.allBooksAuthor).then(function (response) {
                        });
                    }
                    //Author created successfully
                    $state.go('authorsList', {authorId: response.data.id}, {reload: true});
                });
            };

            /**
             * @ngdoc function
             * @name newBooks
             * @methodOf authors.controller:authorUpdateCtrl
             * @description
             * Busca los nuevos libros en el $scope.
             */
            $scope.newBooks = function () {
                $scope.allBooksAuthor = [];
                for (var ite in idsBook) {
                    for (var all in $scope.Allbooks) {
                        if ($scope.Allbooks[all].id === parseInt(idsBook[ite])) {
                            $scope.allBooksAuthor.push($scope.Allbooks[all]);
                        }
                    }
                }
            };
        }
    ]);
}
)(window.angular);
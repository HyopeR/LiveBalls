app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages = [];

    $scope.init = () => {
        const username = prompt('Please enter username.');

        if (username)
            initSocket(username);
        else
            return false;
    };

    function initSocket(userame) {

        const connectionOptions = {
            reconnectionAttempts: 3,
            reconnectionDelay: 600
        };

        indexFactory.connectSocket('http://localhost:3000', connectionOptions)
            .then((socket) => {
                socket.emit('newUser', { userame });

                socket.on('newUser', (data) => {
                    const messageData = {
                        type: {
                            code: 0, // Server or user massage
                            message: 1 // Login or disconnect message
                        }, // info
                        username: data.userame
                    };

                    $scope.messages.push(messageData);
                    $scope.$apply();
                });

                socket.on('disUser', (data) => {
                    const messageData = {
                        type: {
                            code: 0,
                            message: 0
                        },
                        username: data.userame
                    };

                    $scope.messages.push(messageData);
                    $scope.$apply();
                });

            }).catch((err) => {
                console.log(err)
            });

    }

}]);

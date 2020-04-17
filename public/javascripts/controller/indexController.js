app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages = [];
    $scope.players = {};

    $scope.init = () => {
        const username = prompt('Please enter username.');

        if (username)
            initSocket(username);
        else
            return false;
    };

    function initSocket(username) {

        const connectionOptions = {
            reconnectionAttempts: 3,
            reconnectionDelay: 600
        };

        indexFactory.connectSocket('http://localhost:3000', connectionOptions)
            .then((socket) => {
                socket.emit('newUser', { username });

                socket.on('initPlayers', (players) => {
                    $scope.players = players;
                    $scope.$apply();
                });

                socket.on('newUser', (data) => {
                    const messageData = {
                        type: {
                            code: 0, // Server or user massage
                            message: 1 // Login or disconnect message
                        }, // info
                        username: data.username
                    };

                    $scope.messages.push(messageData);
                    $scope.players[data.id] = data;
                    $scope.$apply();
                });

                socket.on('disUser', (data) => {
                    const messageData = {
                        type: {
                            code: 0,
                            message: 0
                        },
                        username: data.username
                    };

                    $scope.messages.push(messageData);
                    delete $scope.players[data.id];
                    $scope.$apply();
                });

                let animate = false;
                $scope.onClickPlayer = ($event) => {
                    // console.log($event.offsetX, $event.offsetY);
                    if(!animate) {
                        animate = true;
                        $('#' + socket.id).animate({
                            'left': $event.offsetX,
                            'top': $event.offsetY
                        }, () => {
                            animate = false;
                        });
                    }
                }

            }).catch((err) => {
                console.log(err)
            });

    }

}]);

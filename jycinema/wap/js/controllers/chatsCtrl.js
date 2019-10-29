/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('ChatsCtrl', ['$scope', 'Chats', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
}]);

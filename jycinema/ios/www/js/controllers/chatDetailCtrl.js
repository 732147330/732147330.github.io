/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('chatDetailCtrl', ['$scope', '$stateParams', 'Chats', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
}]);

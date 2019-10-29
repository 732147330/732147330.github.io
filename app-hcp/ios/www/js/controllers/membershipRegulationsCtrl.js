'use strict';
app.controller('membershipRegulationsCtrl', function ($scope, $rootScope, httpService, JYApi, $state, $stateParams, $timeout, $location, $ionicPopup, $ionicBackdrop, $ionicModal, $ionicHistory) {

    $scope.confirmFlag = true;

    //滚动到底部判断
    // var rulesDocument = document.getElementsByClassName('rules-hook');
    // rulesDocument[0].addEventListener('onScroll' , function(){
    //     console.log(11111221)
    // });

    //同意并继续
    $scope.agree = function () {
        $rootScope.$broadcast('post-confirmRegulationsFlag', {confirmRegulationsFlag: true});
        $ionicHistory.goBack();
    }
});

'use strict';
app.controller('membershipRegulationsCtrl', function ($scope, $rootScope, httpService, JYApi, $state, $stateParams, $timeout, $location, $ionicPopup, $ionicBackdrop, $ionicModal, $ionicHistory, $sce) {

    $scope.confirmFlag = true;

    $scope.articleType = "MEMBERSHIP_RULES";
    $scope.articleId = "3321";
    $scope.title = "金逸会员章程";
    if($stateParams.articleType && $stateParams.articleId && $stateParams.articleTitle) {
        $scope.articleType = $stateParams.articleType;
        $scope.articleId = $stateParams.articleId;
        $scope.title = $stateParams.articleTitle;
    }

    $scope.findJy = function () {
        httpService.getData(JYApi.findJy, 'post', {
            params: JSON.stringify({
                "type": "QUERY_JY_ARTICLE",
                "articleType": $scope.articleType,
                "articleId": $scope.articleId
            })
        }, function (res) {
            $scope.jydtTit = $sce.trustAsHtml(res.data[0].articleContent);
        })
    };
    $scope.findJy();

    //同意并继续
    $scope.agree = function () {
        var confirmRegulationsFlag = 0;
        if($scope.articleType === "MEMBERSHIP_RULES") {
            confirmRegulationsFlag = 0;
        }else if($scope.articleType === "EQUITYCARD_INTERESTS") {
            confirmRegulationsFlag = 1;
        }
        $rootScope.$broadcast('post-confirmRegulationsFlag', {confirmRegulationsFlag: confirmRegulationsFlag});
        $ionicHistory.goBack();
    }
});

/**
 * 2017.09.19 增加礼品卡激活功能
 */
'use strict';
app.controller('giftCardsListCtrl', function($scope,$rootScope,httpService,JYApi, $ionicPopup,$timeout,$state,$ionicHistory) {


    $scope.$on('$ionicView.enter',function () {
        $scope.queryGiftCards();

    });

    //查询
    $scope.queryGiftCards=function(){
        httpService.getData(JYApi.findItemGiftCard, 'post', {
            params:JSON.stringify({
                pageIndex:1,
                pageRows:50
            })
        }, function (res) {
            $scope.giftCardsListData=res.data;

        },2);
    };







});

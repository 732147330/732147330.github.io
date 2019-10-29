/**
 * 2017.09.19 增加礼品卡激活功能
 */
'use strict';
app.controller('giftCardsCtrl', function($scope,$rootScope,httpService,JYApi, $ionicPopup,$timeout,$state,$ionicHistory) {

    $scope.gift={};
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);

    //清空卡号
    $scope.clearCard=function () {
        $scope.gift.chipNumber='';
    };

    //清空密码
    $scope.clearPassword=function () {
        $scope.gift.paymentPassword='';
    };

    //清空手机号
    $scope.clearCardPhoneNumber=function () {
        $scope.gift.cardPhoneNumber=''
    };

    $scope.$on('$ionicView.enter',function () {
        $scope.gift.cardNum='';
        $scope.gift.password='';
        $scope.gift.cardPhoneNumber=JSON.parse(localStorage.userInfo).mobileNumber?JSON.parse(localStorage.userInfo).mobileNumber:'';
    });

    //激活
    $scope.doActive=function(obj){
        if(!obj.$invalid) {
            httpService.getData(JYApi.updateItemGiftCard, 'post', {
                params: JSON.stringify({
                    cardPhoneNumber: $scope.gift.cardPhoneNumber,
                    chipNumber: $scope.gift.chipNumber,
                    paymentPassword: $scope.gift.paymentPassword
                })
            }, function (res) {
                if (res.status == "S") {
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: '激活成功!'
                    });
                    $timeout(function () {
                        myPopup.close();
                        $state.go('giftCardsList');
                    }, 2000);
                } else {
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: res.msg,
                        buttons: [
                            {
                                text: '知道了',
                                type: 'button-calm',
                                onTap: function (e) {
                                    myPopup.close();
                                }
                            }
                        ]
                    });
                }
            }, 2);
        }
    };







});

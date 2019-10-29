/**
 * 2017.09.19 增加礼品卡激活功能
 */
'use strict';
app.controller('giftCardsCtrl', function($scope,$rootScope,httpService,JYApi, $ionicPopup,$timeout,$state,$ionicHistory) {

    $scope.gift={};
    if(localStorage.userInfo){
        $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    }
    // {"birthDay":"247680000000","emailAddress":"","encrypatedPassword":"96E79218965EB72C92A549DD5A330112","level":"钻石卡","memberId":272,"mmbName":"千千万万","mmbType":"CARDHOLDER","mobileNumber":"18078145791","sex":"Male","ticketTime":"5","token":"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3RDk5RDY5QzgxRkQ1Q0I4NDkzMTQ1M0ZBQjMxNkY2RCIsImlhdCI6MTUwNzQyODYzNCwic3ViIjoie1wiYmlydGhEYXlcIjpcIjI0NzY4MDAwMDAwMFwiLFwiZW1haWxBZGRyZXNzXCI6XCJcIixcImVuY3J5cGF0ZWRQYXNzd29yZFwiOlwiOTZFNzkyMTg5NjVFQjcyQzkyQTU0OURENUEzMzAxMTJcIixcImxldmVsXCI6XCLpkrvnn7PljaFcIixcIm1lbWJlcklkXCI6MjcyLFwibW1iTmFtZVwiOlwi5Y2D5Y2D5LiH5LiHXCIsXCJtbWJUeXBlXCI6XCJDQVJESE9MREVSXCIsXCJtb2JpbGVOdW1iZXJcIjpcIjE4MDc4MTQ1NzkxXCIsXCJzZXhcIjpcIk1hbGVcIixcInRpY2tldFRpbWVcIjpcIjVcIn0iLCJleHAiOjE1MDc0MzU4Mzl9.NzHB0wOv936O-K851pIVVqpj6ZNQS7-WKCbOUWlczPE"}


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
                    // cardPhoneNumber: $scope.gift.cardPhoneNumber,
                    mobileNumber: $scope.gift.cardPhoneNumber,
                    chipNumber: $scope.gift.chipNumber,
                    paymentPassword: $scope.gift.paymentPassword,
                    mmbName: $rootScope.userInfo.mmbName,
                    cardType:"TYRANT_CARD"
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

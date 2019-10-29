/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('bindCardCtrl', function ($scope, $interval, $cordovaToast, httpService, JYApi, $rootScope, $ionicPopup, $timeout, $state) {
    $rootScope.userInfo = JSON.parse(localStorage.userInfo);
    $scope.yzmFlag = true;
    $scope.leftTime = 60;
    //绑定变量
    $scope.cardInfo = {
        cardNum: "",
        password: "",
        phoneNumber: "",
        captcha: ""
    };
    //这里应该把获取验证码封装成一个指令
    $scope.paracont = languageSetting.getYzm;
    $scope.timePromise = null;
    //点击获取按钮判断手机号格式
    $scope.yzmLogic = function () {
        httpService.getData(JYApi.sendMg, 'post', {
            params: JSON.stringify({
                "mobileNumber": $scope.cardInfo.phoneNumber,
                sendType:'bdCard'
            })
        }, function (res) {
            $scope.yzm = res.numCode;
            $scope.yzmFlag = false;
            $scope.djs = $interval(function () {
                if ($scope.leftTime > 0) {
                    $scope.leftTime--
                } else {
                    $interval.cancel($scope.djs);
                    $scope.yzmFlag = true;
                    $scope.leftTime=60;
                }
            }, 2000);
        });
    };
    //绑定会员卡
    $scope.bingCard = function () {
        httpService.getData(JYApi.bindingMemberCard, 'post', {
            params: JSON.stringify({
                "memberId": $rootScope.userInfo.memberId,
                "paymentPassword": $scope.cardInfo.password,
                "cardPhoneNumber": $scope.cardInfo.phoneNumber,
                "numCode": $scope.cardInfo.captcha
            })
        }, function (res) {
            if (res.status == "S") {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.bindSuccess
                });
                $timeout(function () {
                    myPopup.close();
                    $interval.cancel($scope.djs);
                    $scope.yzmFlag = true;
                    $scope.leftTime=60;
                    $state.go("myVipHome");
                }, 2000);
            } else {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template:  res.msg
                });
                $timeout(function () {
                    myPopup.close();
                    $interval.cancel($scope.djs);
                    $scope.yzmFlag = true;
                    $scope.leftTime=60;
                }, 2000);
            }
        },2);
    }
});
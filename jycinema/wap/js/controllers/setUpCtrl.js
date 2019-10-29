/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('setUpCtrl', function ($scope, $rootScope, httpService, JYApi, $ionicPlatform, $ionicViewSwitcher, $state, $timeout, $ionicLoading, $ionicPopup, $interval) {
    $scope.data={loginFlag:localStorage.userInfo?true:false};
    var vm = $scope.vm = {
        htmlSource: "",
        showErrorType: "2",
        showDynamicElement: true,
        dynamicName: "dynamicName",
        entity: {}
    };
//每个表单的配置，如果不设置，默认和全局配置相同
    vm.validateOptions = {
        blurTrig: false,
        showError: false
    };
    // $scope.alertError = function (errorMsg) {
    //     $cordovaToast.showShortCenter(errorMsg);
    //     return;
    // };
    $scope.loginOut = function () {
        var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: languageSetting.isExit+'?',
            buttons: [
                {
                    text: languageSetting.cancel,
                    type: 'button-default',
                    onTap: function () {
                        myPopup.close();
                    }
                },
                {
                    text: languageSetting.confirm,
                    type: 'button-calm',
                    onTap: function (e) {
                        myPopup.close();
                        httpService.getData(JYApi.logout, 'post', {}, function (res) {
                            if (res.status == "S") {
                                localStorage.removeItem('userInfo');
                                $rootScope.userInfo = null;
                                $ionicViewSwitcher.nextDirection("back");
                                $state.go('account');
                            }
                        },1,languageSetting.exiting);
                    }
                }
            ]
        });
    };
    $scope.cleanCache = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: false,
            showDelay: 0,
        });
        $timeout(function () {
            $ionicLoading.hide();
            // $cordovaToast.showShortCenter(languageSetting.cacheSuccess);
        }, 1000);
    };
    $scope.user = {
        complaintContent: '',
        emailAddress: '',
        phoneNumber: '',
        picture: ""
    };
    // 上传图片
    $scope.readalbum = function () {
        if (!window.imagePicker) {
            return;
        }
        var options = {
            maximumImagesCount: 1,
            width: 800,
            height: 800,
            quality: 80
        };
        // $cordovaImagePicker.getPictures(options).then(function (results) {
        //     var uri = results[0];
        //     var name = uri;
        //     $scope.user.picture = name;
        // }, function (err) {
        //
        // });
    };
    //提交反馈
    $scope.submit = function () {
        httpService.getData(JYApi.save, 'post', {
            params: JSON.stringify({
                "instId": "21",
                "memberId": "110",
                "sourceIp": "1.1.1.1",
                "complaintContent": $scope.user.complaintContent,
                "emailAddress": $scope.user.emailAddress,
                "phoneNumber": $scope.user.phoneNumber
            })
        }, function (res) {
            if (res.status == "S") {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.submitSuccess+'!'
                });
                $timeout(function () {
                    myPopup.close();
                    $scope.user.complaintContent = '';
                    $scope.user.emailAddress = '';
                    $scope.user.phoneNumber = '';
                }, 1000);
            }
        });
    };
    //清除缓存
    $scope.clearCache = function () {
        if($rootScope.isMobile){
            $ionicPlatform.ready(function () {
                window.cache.clear(function (status) {
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: languageSetting.cacheSuccess+'!'
                    });
                    $timeout(function () {
                        myPopup.close();
                    }, 1000);
                }, function (status) {

                });
            });
        }
    };
});

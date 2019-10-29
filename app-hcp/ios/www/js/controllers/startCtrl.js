/**
 * Created by xiong on 16/8/18.
 */
'use strict';
app.controller('startCtrl', function($scope,$rootScope,$http,$timeout,httpService,JYApi,$state,$ionicViewSwitcher) {
  $scope.exitApp=function () {
    ionic.Platform.exitApp();
  }
    $rootScope.goHome=function () {
        //获取启动宣传图
        $rootScope.hasData=false;
        if(localStorage.userInfo && JSON.parse(localStorage.userInfo).level=='上市纪念卡'){
            $rootScope.carouseStartlData=[
                {
                    url:'./img/splash_tuhao.jpg'
                }
            ];
            $rootScope.hasData=true;
            //location.replace('#/home');
            $state.go('home');
            $ionicViewSwitcher.nextDirection("none")

        }else {
            $http({
                url: JYApi.findAdvertisImageInfo,
                method: 'post',
                data: $.param({
                    params: JSON.stringify({
                        "adverPosition": "APP_AD_START",
                        "cityName": ""
                    })
                }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "token": localStorage.userInfo ? JSON.parse(localStorage.userInfo).token : ''
                },
                timeout: 500
            }).success(function (res) {
                if (res.status == "S" && res.data.length > 0) {
                    $rootScope.carouseStartlData = res.data;
                    $rootScope.hasData=true;
                } else {
                    $rootScope.hasData = false;
                }
                //location.replace('#/home');
                $state.go('home');
                $ionicViewSwitcher.nextDirection("none")


            }).error(function (err) {
                $rootScope.hasData = false;
                //location.replace('#/home');
                $state.go('home');
                $ionicViewSwitcher.nextDirection("none")

            });
        }
    };

    //热更新检查
    $rootScope.startTip='';
    var appupdate = {
        initialize: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            document.addEventListener('chcp_updateIsReadyToInstall', this.onUpdateReady, false);
        },
        onDeviceReady: function() {
            chcp.fetchUpdate(appupdate.fetchUpdateCallback);
        },
        fetchUpdateCallback: function(error, data) {
            if (error) {
                $rootScope.goHome();
                return;
            }
            $timeout(function () {
                $rootScope.startTip='正在下载更新...';
            },0);
        },
        onUpdateReady:function () {
            $timeout(function () {
                $rootScope.startTip = '正在安装更新...';
                chcp.installUpdate(appupdate.installationCallback);
            },0);
        },
        installationCallback:function (error) {
            if(error){
                $timeout(function () {
                    $rootScope.startTip='安装失败!';
                },0);
            }else{
                $timeout(function () {
                    $rootScope.startTip = '安装成功!';
                },0);
            }
        }
    };
    if (locals.isMobile) {
        appupdate.initialize();
    }else{
        $rootScope.goHome();
    }


});

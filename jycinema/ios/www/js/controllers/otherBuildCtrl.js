/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('otherBuildCtrl', function($scope,httpService,JYApi,$http,$ionicPopup,$timeout) {
    //判断绑定状态
    $scope.isBind=function(){
        httpService.getData(JYApi.findExtLoginAccess,'post',{
            params: JSON.stringify({
                memberId:JSON.parse(localStorage.userInfo).memberId
            })
        },function(res) {
            if(res.status=='S'){
                $scope.qqBindStatus=false;
                $scope.wxBindStatus=false;
                $scope.weiboBindStatus=false;
                $scope.zfbBindStatus=false;
                angular.forEach(res.data,function(value,key){
                    if(value.accessTypeCode=='QQ_LOGIN'){
                        $scope.qqBindStatus=true;
                        $scope.qqAccessId=value.accessId;
                    }else if(value.accessTypeCode=='WX_LOGIN'){
                        $scope.wxBindStatus=true;
                        $scope.wxAccessId=value.accessId;
                    }else if(value.accessTypeCode=='ALI_LOGIN'){
                        $scope.zfbBindStatus=true;
                        $scope.zfbAccessId=value.accessId;
                    }else if(value.accessTypeCode=='SINA_LOGIN'){
                        $scope.weiboBindStatus=true;
                        $scope.weiboAccessId=value.accessId;
                    }
                });
            }
        });
    };
    $scope.$on("$ionicView.enter", function (event, data) {
        $scope.isBind();
    });

    //qq绑定
    $scope.qqBind=function(){
        if($scope.qqBindStatus){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template:languageSetting.cancelBindQQ+'？',
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
                            //解绑qq
                            httpService.getData(JYApi.unbundling, 'post', {
                                params: JSON.stringify({
                                    memberId:JSON.parse(localStorage.userInfo).memberId,
                                    accessId:$scope.qqAccessId
                                })
                            }, function (res) {
                                if (res.status == "S") {
                                    $scope.isBind();
                                }else{
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert jyAlert1',
                                        template: languageSetting.cancelBindFail+'!'
                                    });
                                    $timeout(function(){
                                        myPopup.close();
                                    },2000);
                                }
                            },2);
                        }
                    }
                ]
            });
        }else{
            YCQQ.logout(function(){
                console.log('logout success');
            },function(failReason){
                console.log(failReason);
            });
            var checkClientIsInstalled = 1;
            YCQQ.ssoLogin(function(args){
                httpService.getData(JYApi.qqlogin,'post',{
                    platform:'APP_ANDROID',
                    code:args.access_token
                },function(res){
                    $http({
                        url: JYApi.loginQqAPP+'?openid='+res.openid+'&memberId='+JSON.parse(localStorage.userInfo).memberId,
                        method: 'get',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                        timeout: 20000
                    }).success(function (res) {
                        if(res.status=='E'){
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template:languageSetting.otherBindSuccess+'!'
                            });
                            $timeout(function(){
                                myPopup.close();
                            },2000);
                        }else if(res.status=="S"){
                            $scope.qqBindStatus=true;
                            $scope.isBind();
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template:languageSetting.bindSuccess
                            });
                            $timeout(function(){
                                myPopup.close();
                            },2000);
                        }else{
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template:res.msg
                            });
                            $timeout(function(){
                                myPopup.close();
                            },2000);
                        }
                    });
                },2);
            },function(failReason){
                console.log(failReason);
            },checkClientIsInstalled);
        }
    };

    //wx绑定
    $scope.wxBind=function(){
        if($scope.wxBindStatus){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template:languageSetting.cancelBindWX+'？',
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
                            httpService.getData(JYApi.unbundling, 'post', {
                                params: JSON.stringify({
                                    memberId:JSON.parse(localStorage.userInfo).memberId,
                                    accessId:$scope.wxAccessId
                                })
                            }, function (res) {
                                if (res.status == "S") {
                                    $scope.isBind();
                                }else{
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert jyAlert1',
                                        template: languageSetting.cancelBindFail+'!'
                                    });
                                    $timeout(function(){
                                        myPopup.close();
                                    },2000);
                                }
                            });
                        }
                    }
                ]
            });
        }else {
            var scope = "snsapi_userinfo";
            var state = "_" + (+new Date());
            Wechat.auth(scope, state, function (response) {
                if (response.code) {
                    var params = {platform: 'APP', code: response.code};
                    $http({
                        url: JYApi.getWechatUserinfo,
                        method: 'post',
                        data: $.param(params),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                        timeout: 20000
                    }).success(function (res) {
                        $http({
                            url: JYApi.loginAPP + '?unionid=' + res.unionid + '&memberId=' + JSON.parse(localStorage.userInfo).memberId,
                            method: 'get',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                            },
                            timeout: 20000
                        }).success(function (res) {
                            if(res.status=="E"){
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template:languageSetting.otherBindSuccess+'!'
                                });
                                $timeout(function(){
                                    myPopup.close();
                                },2000);
                            }else if(res.status=='S'){
                                $scope.wxBindStatus=true;
                                $scope.isBind();
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template: languageSetting.bindSuccess
                                });
                                $timeout(function () {
                                    myPopup.close();
                                }, 2000);
                            }else{
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template:res.msg
                                });
                                $timeout(function(){
                                    myPopup.close();
                                },2000);
                            }
                        });
                    }, 2);
                }
            }, function (reason) {
                alert(reason);
            });
        }
    };

    //weibo绑定
    $scope.weiboBind=function(){
        if($scope.weiboBindStatus){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template:languageSetting.cancelBindSINA+'？',
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
                            httpService.getData(JYApi.unbundling, 'post', {
                                params: JSON.stringify({
                                    memberId:JSON.parse(localStorage.userInfo).memberId,
                                    accessId:$scope.weiboAccessId
                                })
                            }, function (res) {
                                if (res.status == "S") {
                                    $scope.isBind();
                                }else{
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert jyAlert1',
                                        template: languageSetting.cancelBindFail+'!'
                                    });
                                    $timeout(function(){
                                        myPopup.close();
                                    },2000);
                                }
                            });
                        }
                    }
                ]
            });
        }else {
            YCWeibo.logout(function(){
                console.log('logout success');
            },function(failReason){
                console.log(failReason);
            });
            YCWeibo.ssoLogin(function (args) {
                httpService.getData(JYApi.getSinaUserinfo, 'post', {
                    platform: 'APP_ANDROID',
                    accessToken: args.access_token,
                    userId: args.userid
                }, function (res) {
                    $http({
                        url: JYApi.loginSinaAPP + '?openid=' + res.openid + '&memberId=' + JSON.parse(localStorage.userInfo).memberId,
                        method: 'get',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                        timeout: 20000
                    }).success(function (res) {
                        $scope.weiboBindStatus=true;
                        $scope.isBind();
                        var myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: languageSetting.bindSuccess
                        });
                        $timeout(function () {
                            myPopup.close();
                        }, 2000);
                    });
                });
            }, function (failReason) {
                alert(failReason);
            });
        }
    };
});


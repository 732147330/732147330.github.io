/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('otherBuildCtrl', function($scope,httpService,JYApi,$http,$ionicPopup,$timeout,$rootScope) {
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

    //获取会员基础信息
    $scope.findMember=function(memberId,openId){
        // alert(memberId);
        httpService.getData(JYApi.findMember, 'post', {
            params:JSON.stringify({
                "memberId":memberId
            })
        }, function (res) {
            // alert(JSON.stringify(res));
            if(res.status=="S"){
                var userInfo=res.data;
                userInfo.token= JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo=JSON.stringify(userInfo);
                $rootScope.userInfo=userInfo;
                if($scope.viewName){
                    $state.go($scope.viewName,$scope.urlParams);
                }else{
                    $state.go("account");
                }
            }else{
                $cordovaToast.showShortCenter('获取会员信息失败失败');
            }
        });
    };

    $scope.$on('$ionicView.enter',function(){

        var url=window.location.href;
        if (url.indexOf('?code') > 0) {
            var code = url.split('?')[1].split('&')[0].split('=')[1];
            if (url.split('state=')[1] == 'qqBind') {
                $http({
                    url: 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=100428733&client_secret=45407995dd079f568d3e9247b81fbb58&code='+code+'&redirect_uri=http://www.jycinema.com/wap/#/otherBuild',
                    method: 'get',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    timeout: 20000
                }).success(function (res) {
                    var access_token = res.split('&')[0].split('=')[1];
                    httpService.getData(JYApi.qqlogin,'post',{
                        code:access_token
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
                });

            } else if (url.split('state=')[1] == 'STATE#/otherBuild') {
                var params = {platform: 'WX_LOGIN', code: code};
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
                        if (res.status == "E") {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: languageSetting.otherBindSuccess + '!'
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        } else if (res.status == 'S') {
                            $scope.wxBindStatus = true;
                            $scope.isBind();
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: languageSetting.bindSuccess
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: res.msg
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        }
                    });
                });
            }
        }
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
            location.href='https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100428733&state=qqBind&redirect_uri='+encodeURIComponent('http://www.jycinema.com/wap/#/otherBuild');

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
            location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5d69bdaaa9765cda&redirect_uri='+encodeURIComponent('http://www.jycinema.com/wap/#/otherBuild')+'&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect';
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

    //判断是否微信浏览器
    $scope.isWeixin=function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            $scope.weixinFlag=true;
        } else {
            $scope.weixinFlag=false;
        }
    };
    $scope.isWeixin();


});


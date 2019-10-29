/**
 */
'use strict';
app.controller('activityDetailCtrl', function($scope,$rootScope,$stateParams,$ionicPopup,$ionicViewSwitcher,$ionicLoading,$timeout,httpService,$state,JYApi,$sce,$location,$interval) {

  $scope.activityGroupId=$stateParams.activityGroupId;
    $scope.channelCode=$stateParams.channelCode;
    if( $scope.activityGroupId==188){
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?a44b0f70abf543e4a7ab8f16dcef8b50";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }
    if($scope.channelCode=='420a29' && $scope.activityGroupId==235){
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?a2d7d08a95be948f7bd93d5a6fd486d0";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }else if($scope.channelCode=='dec00e'&& $scope.activityGroupId==235){
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?31dbb729e6ccc2c755a68c4527e56b04";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }

    //密码加密
    $scope.getEncryption=function (value) {
        var val = Base64.encode(value);
        var arr = [];
        for(var i=0;i<val.length;i++){
            arr.push(val.charAt(i));
            if(i%2){
                var num1 =  Math.floor(10*Math.random());
                arr.push(num1);
                var num2 =  Math.floor(10*Math.random());
                arr.push(num2);
                var num3 =  Math.floor(10*Math.random());
                arr.push(num3)
            }
        }
        return arr.join("");
    };

  //活动详情
  $scope.activityDetail=function(){
    httpService.getData(JYApi.findActivityGuidanceInfo, 'post', {
      params:JSON.stringify({
        cityName:localStorage.currentCity?localStorage.currentCity:'广州',
        imgChannel:"APP",
        activityGroupId:$scope.activityGroupId
      })
    }, function (res) {
      if(res.status=="S"){
        $scope.findActivityGuidanceInfoData=res.data;
          for(var j=0;j<$scope.findActivityGuidanceInfoData.length;j++){
              if ($scope.activityGroupId == $scope.findActivityGuidanceInfoData[j].activityGroupId) {
                  $scope.currentData = $scope.findActivityGuidanceInfoData[j];
                  if ($scope.currentData.imgDate.length > 0) {
                      for (var i = 0; i < $scope.currentData.imgDate.length; i++) {
                          if ($scope.currentData.imgDate[i].targetType == 'ACTIVITY_BANNER') {
                              $scope.currentData.banner = $scope.currentData.imgDate[i].url;
                              break;
                          }
                      }
                  }
                  $scope.content=$sce.trustAsHtml($scope.findActivityGuidanceInfoData[j].activityContentDetails);
                  if ($scope.currentData.flag == 'NOT_START') {
                      var leftDay = Math.floor(($scope.currentData.startDateActive - new Date().getTime()) / (1000 * 60 * 60 * 24));
                      var leftHour = Math.ceil(($scope.currentData.startDateActive - new Date().getTime()) / (1000 * 60 * 60) - leftDay * 24);
                      $scope.currentData.leftTime = leftDay + '天' + leftHour + '小时后开始';
                  } else if ($scope.currentData.flag == 'START') {
                      var leftDay = Math.floor(($scope.currentData.endDateActive - new Date().getTime()) / (1000 * 60 * 60 * 24));
                      var leftHour = Math.ceil(($scope.currentData.endDateActive - new Date().getTime()) / (1000 * 60 * 60) - leftDay * 24);
                      $scope.currentData.leftTime = leftDay + '天' + leftHour + '小时后结束';
                  }
                  $scope.isWeixin();
                  break;
              }
          }
      }
    },2);
  };
  $scope.activityDetail();

    $scope.getEncryption=function (value) {
        var val = Base64.encode(value);
        var arr = [];
        for(var i=0;i<val.length;i++){
            arr.push(val.charAt(i));
            if(i%2){
                var num1 =  Math.floor(10*Math.random());
                arr.push(num1);
                var num2 =  Math.floor(10*Math.random());
                arr.push(num2);
                var num3 =  Math.floor(10*Math.random());
                arr.push(num3)
            }
        }
        return arr.join("");
    };
    $scope.$on("$ionicView.enter", function (event, data) {

    });
    //wap微信分享
    //$scope.absurl = $location.absUrl();
    $scope.weixin=function(){
        httpService.getData(JYApi.generateConfigSignature, 'post', {
            url:encodeURIComponent(location.href)
        }, function (res) {
            $scope.appId=res.appId;
            $scope.nonceStr=res.nonceStr;
            $scope.timestamp=res.timestamp;
            $scope.signature=res.signature;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: $scope.appId, // 必填，公众号的唯一标识
                timestamp: $scope.timestamp , // 必填，生成签名的时间戳
                nonceStr: $scope.nonceStr, // 必填，生成签名的随机串
                signature:  $scope.signature,// 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
    };
    //$scope.weixin();

    $scope.isWeixin=function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            wx.ready(function(){
                $scope.shareTime=new Date().getTime();
                if(localStorage.userInfo){
                    $scope.shareCode=JSON.parse(localStorage.userInfo).memberId+$scope.shareTime;
                }
                //分享朋友圈
                if($scope.currentData){
                    wx.onMenuShareTimeline({
                        title:$scope.currentData.promotionalCopy,// 分享标题
                        link: locals.returnUrl() + "/?from=singlemessage#/activityDetail?activityGroupId="+$scope.activityGroupId+'&sourceId='+$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId)+'&shareCode='+ $scope.getEncryption($scope.shareCode),
                        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: $scope.currentData.imgDate[0].url,// 分享图标
                        success: function () {
                            httpService.getData(JYApi.shareInfo,'post',{
                                params:JSON.stringify({
                                    "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                                    "shareCode":$scope.getEncryption($scope.shareCode)
                                })
                            },function(res){
                                if(res.status=='noLogin'){
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert',
                                        template: '小主，登录可以分享有奖哦!',
                                        buttons: [
                                            {
                                                text: languageSetting.cancel,
                                                type: 'button-default',
                                                onTap: function () {
                                                    myPopup.close();
                                                }
                                            },
                                            {
                                                text: languageSetting.login,
                                                type: 'button-calm',
                                                onTap: function (e) {
                                                    myPopup.close();
                                                    $state.go('login', {viewName: 'movieDetail', urlParams: JSON.stringify($stateParams)});
                                                }
                                            }
                                        ]
                                    });
                                }
                                if(res.status=='S'){
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert',
                                        template: res.msg,
                                        buttons: [
                                            {
                                                text: '确定',
                                                type: 'button-calm',
                                                onTap: function (e) {
                                                    myPopup.close();
                                                }
                                            }
                                        ]
                                    });
                                }
                            });
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    //分享朋友
                    wx.onMenuShareAppMessage({
                        title: $scope.currentData.promotionalCopy,// 分享标题
                        desc:$scope.currentData.activityGroupDesc, // 分享描述
                        link: locals.returnUrl() + "/?from=singlemessage#/activityDetail?activityGroupId="+$scope.activityGroupId,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: $scope.currentData.imgDate[0].url, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享qq
                    wx.onMenuShareQQ({
                        title: $scope.currentData.promotionalCopy,// 分享标题
                        desc: $scope.currentData.activityGroupDesc, // 分享描述
                        link: locals.returnUrl() + "/?from=singlemessage#/activityDetail?activityGroupId="+$scope.activityGroupId,// 分享链接
                        imgUrl: $scope.currentData.imgDate[0].url,// 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                }
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        } else {
        }
    };




    //分享进来必须登录
    $scope.shareCodeFlag=$stateParams.shareCode?true:false;
    if($scope.shareCodeFlag==true){
        $scope.joinFlag=true;
    }else{
        $scope.joinFlag=false;
    }
    $scope.join=function(){
        if(localStorage.userInfo){
            if($scope.currentData.sourceType=='GUESS'&& $scope.currentData.flag=='START'){
                $state.go('worldCup')
            }else{
                //$state.go('activity')
                $scope.joinFlag=false;
            }
        }else{
            $scope.needBind=true;
        }
    };
    $scope.hide=function () {
        $scope.needBind=false;
    };
    //if($scope.shareCodeFlag==true) {
    //    $scope.needBind=true;
    //}
    //生成登录交易信息--忠诚度计划
    $scope.getLoginCount=function () {
        $.ajax({
            type:'POST',
            url:JYApi.saveLytTxn,
            data:{
                params:JSON.stringify({
                    planId:3,
                    txnType:'LOGIN',
                    subType:'WAP',
                    status:'PENDING',
                    MemberCardNumber:JSON.parse(localStorage.userInfo).chipNumber?JSON.parse(localStorage.userInfo).chipNumber:'',
                    memberId:JSON.parse(localStorage.userInfo).memberId
                })
            },
            success:function () {
            }
        });
    };
    //获取会员基础信息
    $scope.findMember=function(memberId){
        httpService.getData(JYApi.findMember, 'post', {
            params:JSON.stringify({
                "memberId":memberId
            })
        }, function (res) {
            if(res.status=="S"){
                var userInfo=res.data;
                userInfo.token= JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo=JSON.stringify(userInfo);
                localStorage.cacheTime=new Date().getTime();
                $scope.getLoginCount();
                $rootScope.userInfo=userInfo;
                //$state.go("activity");
                //$ionicViewSwitcher.nextDirection("none")
            }else{
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };

    $scope.bindPhone={};
    $scope.sendYzmFlag='获取验证码';
    $scope.sendYzm=function () {
        if(!$scope.bindPhone.mobileNumber){
            $rootScope.showTip('请输入手机号码');
        }else{
            if (!(/^1[34578]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
                $rootScope.showTip('手机号码格式不正确');
            }else{
                if($scope.sendYzmFlag=='获取验证码'){
                    httpService.getData(JYApi.sendMg, 'post', {
                        params: JSON.stringify({
                            "mobileNumber": $scope.bindPhone.mobileNumber,
                            sendType: 'login'
                        })
                    }, function (res) {
                        if (res.status == 'S') {
                            $scope.sendYzmFlag=60;
                            var djs = $interval(function () {
                                if ($scope.sendYzmFlag > 1) {
                                    $scope.sendYzmFlag--;
                                } else {
                                    $interval.cancel(djs);
                                    $scope.sendYzmFlag = '获取验证码';
                                }
                            }, 1000);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '<i class="iconTip ion-close-circled"></i>' + res.msg
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        }
                    },2);
                }
            }
        }
    };
    $scope.getCode=function(){
        $scope.yzmCode=locals.baseUrl()+'/frontUIWebapp/appserver/validateCodeService/createImage?id='+Math.random();
    };
    $scope.getCode();
    $scope.login=function(){
        httpService.getData(JYApi.lockSeatLogin, 'post', {
            params: JSON.stringify({
                "mobileNumber":$scope.bindPhone.mobileNumber,
                "numCode":$scope.bindPhone.vertifyCode,
                imgCode:$scope.bindPhone.captcha1,
                sourceId:$stateParams.sourceId,
                shareCode:$stateParams.shareCode
            })
        }, function (res) {
            if(res.status=='200'){
                $scope.needBind=false;
                if(res.data.memberId){
                    res.data.token=res.token;
                    localStorage.userInfo=JSON.stringify(res.data);
                    $scope.findMember(res.data.memberId);
                }
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: res.msg
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }
        })
    };
    $scope.goLogin=function(){
        $scope.needBind=false;
        $state.go('login', {viewName: 'activity'});
        $ionicViewSwitcher.nextDirection("none")
    };
    //$scope.goActivity=function(){
    //    window.location.href=locals.returnUrl() +"/?from=timeline#/activity/";
    //};
    $scope.goliantong=function(){
        window.location.href='https://txwk.10010.com/KCard/wxCommon/goto?state=WX_KCARD_JY_MOVIE_CARD_CINEMA';
    };
});

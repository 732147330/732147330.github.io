/**
 */
'use strict';
app.controller('activityDetailCtrl', function($scope,$rootScope,$stateParams,$ionicPopup,$ionicModal,$ionicBackdrop,$cordovaInAppBrowser,$ionicLoading,$cordovaGeolocation,$state,$timeout,httpService,JYApi,$sce) {
  $scope.activityGroupId=$stateParams.activityGroupId;
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
            break;
          }
        }
      }
    },2);
  };

  $scope.$on("$ionicView.enter", function (event, data) {
    $scope.activityDetail();
  });

  $scope.$on('$ionicView.afterEnter', function(event,data){
    if(locals.isMobile){
      $cordovaStatusbar.style(0);
    }
  });


  $scope.showShare = function (e) {
    if(!localStorage.userInfo){
      var myPopup = $ionicPopup.show({
        title: languageSetting.tip,
        cssClass: 'jyAlert',
        template: '登录后才可以使用分享功能',
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
              $state.go('login', {viewName: 'activityDetail', urlParams: JSON.stringify($stateParams)});
            }
          }
        ]
      });
      return;
    }
    $scope.modal.show();
    $ionicBackdrop.retain();
    e.stopPropagation();
    $(document).bind("click", function (e) {
      $scope.hideShare(e);
    });
  };

  $scope.hideShare = function (e) {
    $scope.modal.hide();
    $timeout(function(){
      $ionicBackdrop.release();
    },500);
    e.stopPropagation();
  };

  $scope.$on("$ionicView.beforeEnter", function (event, data) {
    $ionicModal.fromTemplateUrl('templates/sharePage.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
  });

      $scope.$on('$ionicView.leave',function(event,data){
        $(document).unbind("click");
      });

        $scope.shareTime=new Date().getTime();
        if(localStorage.userInfo){
          $scope.shareCode=JSON.parse(localStorage.userInfo).memberId+$scope.shareTime;
        }
        //微信好友分享
        $scope.shareWechat = function () {

          Wechat.share({
            message: {
              title: $scope.currentData.promotionalCopy,
              description: $scope.currentData.activityGroupDesc,
              thumb: $scope.currentData.imgDate[0].url,
              media: {
                type: Wechat.Type.WEBPAGE,
                webpageUrl: locals.returnUrl() + "/#/activityDetail?activityGroupId=" + $scope.activityGroupId
              }
            },
            scene: Wechat.Scene.SESSION
          }, function () {

          }, function (reason) {

          });
        };

        //微信朋友圈分享
        $scope.shareWechatFriend = function () {
          Wechat.share({
            message: {
              title: $scope.currentData.promotionalCopy,
              description: $scope.currentData.activityGroupDesc,
              thumb: $scope.currentData.imgDate[0].url,
              media: {
                type: Wechat.Type.WEBPAGE,
                webpageUrl: locals.returnUrl() + "/#/activityDetail?activityGroupId=" + $scope.activityGroupId+'&sourceId='+$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId)+'&shareCode='+ $scope.getEncryption($scope.shareCode)
              }
            },
            scene: Wechat.Scene.Timeline
          }, function () {
            httpService.getData(JYApi.shareInfo,'post',{
              params:JSON.stringify({
                "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                "shareCode":$scope.getEncryption($scope.shareCode)
              })
            },function(res){
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
          }, function (reason) {

          });

        };
        //微博分享
        $scope.shareWeibo = function () {
          var args = {};
          args.url = locals.returnUrl()  + "/#/activityDetail?activityGroupId=" + $scope.activityGroupId+'&sourceId='+$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId)+'&shareCode='+ $scope.getEncryption($scope.shareCode);
          args.title = $scope.currentData.promotionalCopy;
          args.description = $scope.currentData.activityGroupDesc;
          //args.imageUrl = $scope.currentData.imgDate[0].url;
          args.imageUrl =  'http://file.jycinema.com:9680/group1/M00/00/D4/wKgoalpxpfSAGPYrAAA6gkLzRRs788.jpg';
          args.defaultText = languageSetting.jydy;
          YCWeibo.shareToWeibo(function () {
            //httpService.getData(JYApi.shareInfo,'post',{
            //  params:JSON.stringify({
            //    "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            //    "shareCode":$scope.getEncryption($scope.shareCode)
            //  })
            //},function(res){
            //  if(res.status=='S'){
            //    var myPopup = $ionicPopup.show({
            //      title: languageSetting.tip,
            //      cssClass: 'jyAlert',
            //      template: res.msg,
            //      buttons: [
            //        {
            //          text: '确定',
            //          type: 'button-calm',
            //          onTap: function (e) {
            //            myPopup.close();
            //          }
            //        }
            //      ]
            //    });
            //  }
            //});
          }, function (failReason) {

          }, args);

        };

        //qq分享
        $scope.shareQq = function () {
          var args = {};
          args.url = locals.returnUrl()  + "/#/activityDetail?activityGroupId=" + $scope.activityGroupId;
          args.title = $scope.currentData.promotionalCopy;
          args.description = $scope.currentData.activityGroupDesc;
          args.imageUrl = $scope.currentData.imgDate[0].url;
          args.appName = languageSetting.jydy;
          YCQQ.shareToQQ(function () {

          }, function (failReason) {

          }, args);
        };

  $scope.goliantong=function(){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '请您使用“金逸电影”微信公众号参加活动！',
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

  };
  $scope.worldCup=function(){
    if(!localStorage.userInfo){
      var myPopup = $ionicPopup.show({
        title: languageSetting.tip,
        cssClass: 'jyAlert',
        template: languageSetting.unlogin,
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
              $state.go('login', {viewName: 'activityDetail', urlParams: JSON.stringify($stateParams)});
            }
          }
        ]
      });
    }else{
      $state.go('worldCup')
    }
  }

});

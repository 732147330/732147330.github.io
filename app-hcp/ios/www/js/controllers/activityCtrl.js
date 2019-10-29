/**
 */
'use strict';
app.controller('activityCtrl', function ($scope, $rootScope, $ionicPopup, $state, $stateParams, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicLoading, $interval, $cordovaStatusbar, $cordovaGeolocation, $timeout, httpService, JYApi, $cordovaToast, $ionicPlatform, $ionicModal, $ionicBackdrop) {

  $scope.pageSize = 10;
  $scope.page = 1;
  $scope.noMorePage = false;

  $scope.$on('$ionicView.afterEnter', function (event, data) {
    if (locals.isMobile) {
      $cordovaStatusbar.style(0);
    }
  });

  $scope.$on("$ionicView.enter", function (event, data) {
    $scope.$watch('currentCity', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.page = 1;
        $ionicScrollDelegate.scrollTop();
        $scope.getCarouselByCity();
        $timeout(function () {
          $scope.findActivityGuidanceInfo($scope.page, $scope.pageSize);
        }, 500);
      }
    });
  });

  //密码加密
  $scope.getEncryption = function (value) {
    var val = Base64.encode(value);
    var arr = [];
    for (var i = 0; i < val.length; i++) {
      arr.push(val.charAt(i));
      if (i % 2) {
        var num1 = Math.floor(10 * Math.random());
        arr.push(num1);
        var num2 = Math.floor(10 * Math.random());
        arr.push(num2);
        var num3 = Math.floor(10 * Math.random());
        arr.push(num3)
      }
    }
    return arr.join("");
  };

  //活动轮播
  $scope.getCarouselByCity = function () {
    httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
      params: JSON.stringify({
        adverPosition: "APP_AD_ACTIVITY",
        cityName: localStorage.currentCity ? localStorage.currentCity : '广州'
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.activityResData = res.data;
        $timeout(function () {
          $scope.swiper = new Swiper('.swiper-container-activity', {
            observer: true,
            observeParents: true
          });
        }, 0);
      }
    });
  };
  $scope.getCarouselByCity();

  $scope.index = $stateParams.obj ? $stateParams.obj : 0;
  $rootScope.userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '';
  $scope.activeIndex = $scope.index;
  $scope.getCurrentData = function (index) {
    $scope.activeIndex = index;
    $ionicSlideBoxDelegate.update();
  };
  $scope.slideHasChanged = function (index) {
    $scope.activeIndex = index;
    $ionicSlideBoxDelegate.update();
  };
  $scope.slideTo = function () {
    return $scope.activeIndex;
  };

  //活动列表
  $scope.findActivityGuidanceInfo = function (page, pageSize, isDorefresh) {
    console.log(page);
    httpService.getData(JYApi.findActivityGuidanceInfo, 'post', {
      params: JSON.stringify({
        cityName: localStorage.currentCity ? localStorage.currentCity : '广州',
        imgChannel: "APP",
        pageIndex: page,
        pageRows: pageSize
      })
    }, function (res) {
      if (res.status == "S" && res.data.length > 0) {
        if ($scope.page == 1) {
          $scope.findActivityGuidanceInfoData = [];
        }
        angular.forEach(res.data, function (value, key) {
          if (value.imgDate && value.imgDate.length > 0) {
            for (var i = 0; i < value.imgDate.length; i++) {
              if (value.imgDate[i].targetType == 'ACTIVITY_THUMBNAIL') {
                value.THUMBNAIL = value.imgDate[i].url;
                break;
              }
            }
          }
          if (value.flag == 'NOT_START') {
            var leftDay = Math.floor((value.startDateActive - new Date().getTime()) / (1000 * 60 * 60 * 24));
            var leftHour = Math.ceil((value.startDateActive - new Date().getTime()) / (1000 * 60 * 60) - leftDay * 24);
            value.leftTime = leftDay + '天' + leftHour + '小时后开始';
          } else if (value.flag == 'START') {
            var leftDay = Math.floor((value.endDateActive - new Date().getTime()) / (1000 * 60 * 60 * 24));
            var leftHour = Math.ceil((value.endDateActive - new Date().getTime()) / (1000 * 60 * 60) - leftDay * 24);
            value.leftTime = leftDay + '天' + leftHour + '小时后结束';
          }
          $scope.findActivityGuidanceInfoData.push(value);
        });
        if (res.data.length < $scope.pageSize) {
          $scope.noMorePage = true;
        }
        //$scope.$broadcast('scroll.infiniteScrollComplete');
      } else {
        $scope.noMorePage = true;
      }

    }, 1, languageSetting.loading, isDorefresh);
  };

  $scope.findActivityGuidanceInfo($scope.page, $scope.pageSize);

  //抽奖列表
  $scope.getAwardList = function (page, pageSize, isDorefresh) {
    httpService.getData(JYApi.findLotteryDrawGuidance, 'post', {
      params: JSON.stringify({
        pageIndex: page,
        pageRows: pageSize
      })
    }, function (res) {
      if (res.status == "S" && res.data.length > 0) {
        $scope.awardList = res.data;
        angular.forEach($scope.awardList, function (value, key) {
          if (value.lotteryActivityStatus == 'NOTSTART') {
            var leftDay = Math.floor((value.startDateActive - new Date().getTime()) / (1000 * 60 * 60 * 24));
            var leftHour = Math.ceil((value.startDateActive - new Date().getTime()) / (1000 * 60 * 60) - leftDay * 24);
            value.leftTime = leftDay + '天' + leftHour + '小时后开始';
          } else if (value.lotteryActivityStatus == 'ACTIVE') {
            var leftDay = Math.floor((value.endDateActive - new Date().getTime()) / (1000 * 60 * 60 * 24));
            var leftHour = Math.ceil((value.endDateActive - new Date().getTime()) / (1000 * 60 * 60) - leftDay * 24);
            value.leftTime = leftDay + '天' + leftHour + '小时后结束';
          }
        })
      }
    });
  };
  $scope.getAwardList(1, 10);

  $scope.goAward = function (index) {
    var lotteryType = $scope.awardList[index].lotteryType;
    if (lotteryType == 'turntable') {
      var goUrl = 'awardBigWheel';
    } else if (lotteryType == 'scratchCard') {
      var goUrl = 'awardGuagua';
    } else if (lotteryType == 'goldenEgg') {
      var goUrl = 'awardGoldenEggs';
    } else if (lotteryType == 'bandit') {
      var goUrl = 'awardTiger';
    }
    if (!localStorage.userInfo) {
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
              $state.go('login', {viewName: 'activity', urlParams: JSON.stringify($stateParams)});
            }
          }
        ]
      });
    } else {
      $state.go(goUrl, {lotteryDrawHeaderId: $scope.awardList[index].lotteryDrawHeaderId});
    }


  };

  //下拉刷新
  $scope.doRefresh = function () {
    //刷新数据
    $scope.page = 1;
    $scope.getCarouselByCity();
    $scope.findActivityGuidanceInfo($scope.page, $scope.pageSize, true);
    $scope.getAwardList($scope.page, $scope.pageSize);
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000)
  };

  //上拉加载更多
  $scope.loadMore = function () {
    $scope.page++;
    $scope.findActivityGuidanceInfo($scope.page, $scope.pageSize);
  };

  $scope.showShare = function (index, e, item) {
    $scope.currentIndex = index;
    $scope.currentData = item;
    console.log(item)
    if (!localStorage.userInfo) {
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
              $state.go('login', {viewName: 'activity'});
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
    $timeout(function () {
      $ionicBackdrop.release();
    }, 500);
    e.stopPropagation();
  };

  $scope.$on("$ionicView.beforeEnter", function (event, data) {
    $ionicModal.fromTemplateUrl('templates/shareList.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
  });

  $scope.$on('$ionicView.leave', function (event, data) {
    $(document).unbind("click");
  });

  $scope.shareTime = new Date().getTime();
  if (localStorage.userInfo) {
    $scope.shareCode = JSON.parse(localStorage.userInfo).memberId + $scope.shareTime;
  }
  //微信好友分享
  $scope.shareWechat = function () {
    if ($scope.currentData.activityGroupId) {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.activityGroupDesc,
          thumb: $scope.currentData.imgDate[0].url,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/activityDetail?activityGroupId=" + $scope.currentData.activityGroupId
          }
        },
        scene: Wechat.Scene.SESSION
      }, function () {

      }, function (reason) {

      });
    } else if ($scope.currentData.lotteryType == "turntable") {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.lotteryActivityDesc,
          thumb: $scope.currentData.lotteryDrawPic,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/awardBigWheel?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId
          }
        },
        scene: Wechat.Scene.SESSION
      }, function () {

      }, function (reason) {

      });
    } else if ($scope.currentData.lotteryType == "scratchCard") {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.lotteryActivityDesc,
          thumb: $scope.currentData.lotteryDrawPic,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/awardGuagua?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId
          }
        },
        scene: Wechat.Scene.SESSION
      }, function () {

      }, function (reason) {

      });
    } else if ($scope.currentData.lotteryType == "goldenEgg") {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.lotteryActivityDesc,
          thumb: $scope.currentData.lotteryDrawPic,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/awardGoldenEggs?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId
          }
        },
        scene: Wechat.Scene.SESSION
      }, function () {

      }, function (reason) {

      });
    }

  };

  //微信朋友圈分享
  $scope.shareWechatFriend = function () {
    if ($scope.currentData.activityGroupId) {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.activityGroupDesc,
          thumb: $scope.currentData.imgDate[0].url,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/activityDetail?activityGroupId=" + $scope.currentData.activityGroupId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode)
          }
        },
        scene: Wechat.Scene.Timeline
      }, function () {
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "shareCode": $scope.getEncryption($scope.shareCode)
          })
        }, function (res) {
          if (res.status == 'S') {
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
    } else if ($scope.currentData.lotteryType == "turntable") {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.lotteryActivityDesc,
          thumb: $scope.currentData.lotteryDrawPic,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/awardBigWheel?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode)
          }
        },
        scene: Wechat.Scene.Timeline
      }, function () {
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "shareCode": $scope.getEncryption($scope.shareCode)
          })
        }, function (res) {
          if (res.status == 'S') {
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
    } else if ($scope.currentData.lotteryType == "scratchCard") {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.lotteryActivityDesc,
          thumb: $scope.currentData.lotteryDrawPic,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/awardGuagua?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode)
          }
        },
        scene: Wechat.Scene.Timeline
      }, function () {
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "shareCode": $scope.getEncryption($scope.shareCode)
          })
        }, function (res) {
          if (res.status == 'S') {
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
    } else if ($scope.currentData.lotteryType == "goldenEgg") {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.lotteryActivityDesc,
          thumb: $scope.currentData.lotteryDrawPic,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/awardGoldenEggs?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode)
          }
        },
        scene: Wechat.Scene.Timeline
      }, function () {
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "shareCode": $scope.getEncryption($scope.shareCode)
          })
        }, function (res) {
          if (res.status == 'S') {
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
    }


  };
  //微博分享
  $scope.shareWeibo = function () {
    if ($scope.currentData.activityGroupId) {
      var args = {};
      args.url = locals.returnUrl() + "/#/activityDetail?activityGroupId=" + $scope.currentData.activityGroupId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode);
      args.title = $scope.currentData.promotionalCopy;
      args.description = $scope.currentData.activityGroupDesc;
      //args.imageUrl = $scope.currentData.imgDate[0].url;
      args.imageUrl = 'http://file.jycinema.com:9680/group1/M00/00/D4/wKgoalpxpfSAGPYrAAA6gkLzRRs788.jpg';
      args.defaultText = languageSetting.jydy;
      YCWeibo.shareToWeibo(function () {
      }, function (failReason) {
      }, args);
    } else if ($scope.currentData.lotteryType == "turntable") {
      var args = {};
      args.url = locals.returnUrl() + "/#/awardBigWheel?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode);
      args.title = $scope.currentData.promotionalCopy;
      args.description = $scope.currentData.lotteryActivityDesc;
      //args.imageUrl = $scope.currentData.imgDate[0].url;
      args.imageUrl = 'http://file.jycinema.com:9680/group1/M00/00/D4/wKgoalpxpfSAGPYrAAA6gkLzRRs788.jpg';
      args.defaultText = languageSetting.jydy;
      YCWeibo.shareToWeibo(function () {
      }, function (failReason) {
      }, args);
    } else if ($scope.currentData.lotteryType == "scratchCard") {
      var args = {};
      args.url = locals.returnUrl() + "/#/awardGuagua?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode);
      args.title = $scope.currentData.promotionalCopy;
      args.description = $scope.currentData.lotteryActivityDesc;
      //args.imageUrl = $scope.currentData.imgDate[0].url;
      args.imageUrl = 'http://file.jycinema.com:9680/group1/M00/00/D4/wKgoalpxpfSAGPYrAAA6gkLzRRs788.jpg';
      args.defaultText = languageSetting.jydy;
      YCWeibo.shareToWeibo(function () {
      }, function (failReason) {
      }, args);
    } else if ($scope.currentData.lotteryType == "goldenEgg") {
      var args = {};
      args.url = locals.returnUrl() + "/#/awardGoldenEggs?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode);
      args.title = $scope.currentData.promotionalCopy;
      args.description = $scope.currentData.lotteryActivityDesc;
      //args.imageUrl = $scope.currentData.imgDate[0].url;
      args.imageUrl = 'http://file.jycinema.com:9680/group1/M00/00/D4/wKgoalpxpfSAGPYrAAA6gkLzRRs788.jpg';
      args.defaultText = languageSetting.jydy;
      YCWeibo.shareToWeibo(function () {
      }, function (failReason) {
      }, args);
    }


  };

  //qq分享
  $scope.shareQq = function () {
    if ($scope.currentData.activityGroupId) {
      var args = {};
      args.url = locals.returnUrl() + "/#/activityDetail?activityGroupId=" + $scope.currentData.activityGroupId;
      args.title = $scope.currentData.promotionalCopy;
      args.description = $scope.currentData.activityGroupDesc;
      args.imageUrl = $scope.currentData.lotteryDrawPic;
      args.appName = languageSetting.jydy;
      YCQQ.shareToQQ(function () {
      }, function (failReason) {
      }, args);
    } else if ($scope.currentData.lotteryType == "turntable") {
      var args = {};
      args.url = locals.returnUrl() + "/#/awardBigWheel?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId;
      args.title = $scope.currentData.promotionalCopy;
      args.description = $scope.currentData.lotteryActivityDesc;
      args.imageUrl = $scope.currentData.lotteryDrawPic;
      args.appName = languageSetting.jydy;
      YCQQ.shareToQQ(function () {
      }, function (failReason) {
      }, args);
    } else if ($scope.currentData.lotteryType == "scratchCard") {
      var args = {};
      args.url = locals.returnUrl() + "/#/awardGuagua?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId;
      args.title = $scope.currentData.promotionalCopy;
      args.description = $scope.currentData.lotteryActivityDesc;
      args.imageUrl = $scope.currentData.lotteryDrawPic;
      args.appName = languageSetting.jydy;
      YCQQ.shareToQQ(function () {
      }, function (failReason) {
      }, args);
    } else if ($scope.currentData.lotteryType == "goldenEgg") {
      var args = {};
      args.url = locals.returnUrl() + "/#/awardGoldenEggs?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId;
      args.title = $scope.currentData.promotionalCopy;
      args.description = $scope.currentData.lotteryActivityDesc;
      args.imageUrl = $scope.currentData.lotteryDrawPic;
      args.appName = languageSetting.jydy;
      YCQQ.shareToQQ(function () {
      }, function (failReason) {
      }, args);
    }

  };


});

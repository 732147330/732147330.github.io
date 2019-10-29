/**
 */
'use strict';
app.controller('activityCtrl', function ($scope, $rootScope, $ionicPopup, $state, $stateParams, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicLoading, $interval, $timeout, httpService, JYApi, $ionicPlatform, $ionicModal, $ionicBackdrop) {
  $scope.pageSize = 10;
  $scope.page = 1;
  $scope.noMorePage = false;
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

  //活动列表
  $scope.findActivityGuidanceInfo = function (page, pageSize, isDorefresh) {
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
            //var leftDay = Math.floor((new Date(value.startDateActive).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            //var leftHour = Math.ceil((new Date(value.startDateActive).getTime() - new Date().getTime()) / (1000 * 60 * 60) - leftDay * 24);
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
      //window.location.href=locals.returnUrl() +"/?from=timeline#/"+goUrl+"/"+$scope.awardList[index].lotteryDrawHeaderId;
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

  $scope.showShare = function (index, e) {
    $scope.currentIndex = index;
    $scope.currentData = $scope.findActivityGuidanceInfoData[$scope.currentIndex];
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

  //$scope.goActivityDtail=function(id){
  //    window.location.href=locals.returnUrl() +"/?from=timeline#/activityDetail?activityGroupId="+id;
  //}

});

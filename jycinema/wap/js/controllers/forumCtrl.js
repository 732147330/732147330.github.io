/**
 * Created by pgr on 2017/11/7.
 */
'use strict';
app.controller('forumCtrl', function ($scope, $rootScope, $stateParams, $state, $location, $ionicScrollDelegate, httpService, $ionicBackdrop, $ionicModal, $ionicPlatform, $ionicSlideBoxDelegate, $ionicPopup, $http, JYApi, $timeout, $interval, $localForage) {
  $rootScope.$on('$stateChangeSuccess', function () {
    if ($location.$$search.index) $scope.activeIndex = $location.$$search.index
  })

  $scope.channelCode = $stateParams.channelCode;
  if ($scope.channelCode == '420a29') {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?b3aaf7080fec6780ad272356835f35a1";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  } else if ($scope.channelCode == 'dec00e') {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?3db2305720ac6b08f600f5426e2fdd8a";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }
  else if ($scope.channelCode == 'c4112a') {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?3b2a27c3d41c36d5ac3ddb80f6e99e59";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }
  //轮播
  $scope.getCarouselByCity = function () {
    $scope.carouselData = [];
    httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
      params: JSON.stringify({
        "adverPosition": "APP_FCRITIC_BANNER",
        "cityName": localStorage.currentCity
      })
    }, function (res) {
      if (res.status == "S") {
        if (!res.data || res.data.length == 0) {
          //获取默认轮播数据
          httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
            params: JSON.stringify({
              "adverPosition": "APP_FCRITIC_BANNER",
              "cityName": ''
            })
          }, function (res) {
            if (res.status == "S") {
              $scope.carouselData = res.data;
              $timeout(function () {
                var swiper = new Swiper('.swiper-container-focus', {
                  autoplay: 4000,
                  loop: true,
                  observer: true,
                  observeParents: true
                });
              }, 0);
            } else {
              var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: res.msg
              });
              $timeout(function () {
                myPopup.close();
              }, 2000);
            }
          });
        } else {
          $scope.carouselData = res.data;
          //console.log($scope.carouselData);
          $timeout(function () {
            var swiper = new Swiper('.swiper-container-focus', {
              autoplay: 4000,
              loop: true,
              observer: true,
              observeParents: true
            });
          }, 0);
        }
      }
    }, function (error) {

    });
  };
  $scope.getCarouselByCity();

  //初始化设置
  $scope.index = $stateParams.index ? $stateParams.index : 0;

  $scope.activeIndex = $location.$$search.index || $scope.index;
  $scope.pageSize = 10;
  $scope.pageSize1 = 5;
  $scope.page = 1;
  $scope.page1 = 1;
  $scope.noMorePage1 = false;
  $scope.noMorePage = true;
  $scope.hotActivityList = [];
  $rootScope.currentCity = localStorage.currentCity ? localStorage.currentCity : languageSetting.defaultCity;

  $scope.cashData = [
    {data: []},
    {data: []},
    {data: []}
  ];
  $scope.getCurrentData = function (index) {
    $scope.activeIndex = index;
    $ionicSlideBoxDelegate.update();
  };
  $scope.slideHasChanged = function (index) {
    $scope.activeIndex = index;
    $ionicSlideBoxDelegate.update();
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
    //$scope.$broadcast('scroll.refreshComplete');
    $scope.doRefresh();
  };
  $scope.slideTo = function () {
    return $scope.activeIndex;
  };
  //查询文章
  $scope.findArt = function (type, page, pageSize) {
    httpService.getData(JYApi.findArt, 'post', {
        params: JSON.stringify({
          commentCat: type,
          type: "QUERY_RELEVANT_ARTICLE",
          commentPageDisplays: 'Y',
          pageIndex: page,
          pageRows: pageSize
        })
      }, function (res) {
        if (res.status == "S" && res.data.length > 0) {
          $scope.jytjFlag = true;
          if ($scope.page == 1) {
            $scope.artData = [];
          }
          angular.forEach(res.data, function (v, k) {
            v.strs = [];
            if (v.laber) {
              v.strs = v.laber.split(","); //字符分割
            }
            v.date = v.creationDate.substring(0, 10);
            $scope.artData.push(v);
          });
          if (res.data.length < $scope.pageSize) {
            $scope.noMorePage = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {
          $scope.noMorePage = true;
        }
      }
    )
  };
  $scope.findArt('FILM_REVIEW', 1, $scope.pageSize);
  $scope.findArtDetail = function (code) {
    $scope.findArt(code, 1, $scope.pageSize);
  };

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
        if ($scope.page1 == 1) {
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
        if (res.data.length < $scope.pageSize1) {
          $scope.noMorePage1 = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {
        $scope.noMorePage1 = true;
        //console.log(22)
      }

    });
  };

  $scope.findActivityGuidanceInfo($scope.page1, $scope.pageSize1);

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
  //下拉刷新
  $scope.doRefresh = function () {
    //刷新数据
    $scope.page = 1;
    $scope.page1 = 1;
    $scope.getCarouselByCity();
    $scope.findActivityGuidanceInfo(1, $scope.pageSize1);
    $scope.findArt('FILM_REVIEW', 1, $scope.pageSize);
    $scope.getAwardList(1, $scope.pageSize);
    if ($scope.activeIndex == 0) {
      $scope.noMorePage1 = false;
      $scope.noMorePage = true;


    } else if ($scope.activeIndex == 2) {
      $scope.noMorePage1 = true;
      $scope.noMorePage = false;


    } else if ($scope.activeIndex == 1) {

    }
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000)

  };
  //上拉加载更多
  $scope.loadMore = function () {
    if ($scope.activeIndex == 0) {
      $scope.page1++;
      $scope.findActivityGuidanceInfo($scope.page1, $scope.pageSize1);
      console.log(333)
    } else if ($scope.activeIndex == 1) {
      //if($scope.awardList.length<$scope.count2){
      //    $scope.page2++;
      //    $scope.getAwardList($scope.page2,$scope.pageSize,function (res) {
      //        if(res.status=="S" && res.data.length>0){
      //            res.data.filter(function (item,index) {
      //                $scope.awardList.push(item);
      //            });
      //        }
      //    });
      //}else{
      //    $scope.noMorePage2=true;
      //    $scope.noMorePage=true;
      //}
    } else if ($scope.activeIndex == 2) {
      $scope.page++;
      $scope.findArt('FILM_REVIEW', $scope.page, $scope.pageSize);
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
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
  $scope.sougou = function () {
    if (sessionStorage.newcurrentLineList == 'undefined') {
      var myPopup = $ionicPopup.show({
        title: languageSetting.tip,
        cssClass: 'jyAlert',
        template: '小主，您所在的城市没有金逸影院!请您切换到有金逸影院的城市进行选购吧！'
      });
      $timeout(function () {
        myPopup.close();
      }, 2000);
    } else {
      $scope.newcinemaData = sessionStorage.newcinemaData ? JSON.parse(sessionStorage.newcinemaData) : '';
      $scope.newcurrentLineList = sessionStorage.newcurrentLineList ? JSON.parse(sessionStorage.newcurrentLineList) : '';
      console.log($scope.newcinemaData)
      console.log($scope.newcurrentLineList)
      $state.go('schedule', {'movieId': $scope.newcurrentLineList.filmId, theatreId: $scope.newcinemaData.cinemaId})
    }
  }

});

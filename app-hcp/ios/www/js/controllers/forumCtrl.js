/**
 * Created by pgr on 2017/11/7.
 */
'use strict';
app.controller('forumCtrl', function ($scope, $rootScope, $stateParams, $state, $location, $ionicScrollDelegate, httpService, $ionicBackdrop, $ionicModal, $ionicPlatform, $ionicSlideBoxDelegate, $ionicPopup, $http, JYApi, $timeout, $interval, $localForage) {

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
          console.log($scope.carouselData);
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
        console.log(22)
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
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
        scene: Wechat.Scene.SESSION
      }, function () {
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
        scene: Wechat.Scene.SESSION
      }, function () {
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
        scene: Wechat.Scene.SESSION
      }, function () {
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
    } else if ($scope.currentData.lotteryType == "bandit") {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.lotteryActivityDesc,
          thumb: $scope.currentData.lotteryDrawPic,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/awardTiger?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode)
          }
        },
        scene: Wechat.Scene.SESSION
      }, function () {
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
  $scope.shareTime = new Date().getTime();
  if (localStorage.userInfo) {
    $scope.shareCode = JSON.parse(localStorage.userInfo).memberId + $scope.shareTime;
  }
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
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
    } else if ($scope.currentData.lotteryType == "bandit") {
      Wechat.share({
        message: {
          title: $scope.currentData.promotionalCopy,
          description: $scope.currentData.lotteryActivityDesc,
          thumb: $scope.currentData.lotteryDrawPic,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: locals.returnUrl() + "/#/awardTiger?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode)
          }
        },
        scene: Wechat.Scene.Timeline
      }, function () {
        httpService.getData(JYApi.shareInfo, 'post', {
          params: JSON.stringify({
            "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
            "lotteryDrawHeaderId": $scope.currentData.lotteryDrawHeaderId,
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
    } else if ($scope.currentData.lotteryType == "bandit") {
      var args = {};
      args.url = locals.returnUrl() + "/#/awardTiger?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode);
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
    } else if ($scope.currentData.lotteryType == "bandit") {
      var args = {};
      args.url = locals.returnUrl() + "/#/awardTiger?lotteryDrawHeaderId=" + $scope.currentData.lotteryDrawHeaderId;
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

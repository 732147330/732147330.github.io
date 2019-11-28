/**
 * Created by xiongshengzhong on 16/8/18.
 * 2017.1.17 增加影片合并逻辑
 * 2017.3.14
 */
'use strict';
app.controller('scheduleCtrl', function ($scope, $stateParams, $timeout, $ionicModal, $ionicBackdrop, $ionicPopup, $ionicScrollDelegate, httpService, JYApi, $filter, myhrefService, $ionicSlideBoxDelegate, $state) {
  $scope.movieId = $stateParams.movieId >= 0 ? $stateParams.movieId : '';
  $scope.theatreId = $stateParams.theatreId;
  $scope.activeIndex = {status: 0};
  $scope.Number = Number;
  $scope.week = [languageSetting.sunday, languageSetting.monday, languageSetting.thuday, languageSetting.wedday, languageSetting.thrday, languageSetting.friday, languageSetting.satday];
  $scope.weekData = [];
  $scope.mvIndex = 0;

  $scope.newShow = true
  $scope.scrollContent = function () {
    var top = $ionicScrollDelegate.getScrollPosition().top;
    if (top < 0) {
      $scope.newShow = false
    } else {
      $scope.newShow = true
    }
    if (top > 250) {
      $scope.fixFLag = true;
    } else {
      $scope.fixFLag = false;
    }
    $scope.$apply();
  };
  //下拉刷新
  $scope.doRefresh = function () {
    //刷新数据
    console.log($scope.activeIndex.status)
    $scope.getCurrentData($scope.activeIndex.status);
  };
  //格式化时间戳
  $scope.formatTime = function (timeStr) {
    var tim = new Date(parseInt(timeStr));
    var year = tim.getFullYear(); //年
    var month = tim.getMonth() + 1; //月
    month = month < 10 ? '0' + month : month;
    var day = tim.getDate();//日
    day = day < 10 ? '0' + day : day;
    return year + '-' + month + '-' + day;
  };
  //影院基本信息
  $scope.getCinemaInfo = function () {
    httpService.getData(JYApi.findCinema, 'post', {
      params: JSON.stringify({
        "cinemaId": $scope.theatreId,
        "type": "queryAll"
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.cinemaInfo = res.data[0];
      }
    });
  };
  //查影片排期
  $scope.getFilmSchedule = function (filmId, cinemaId, date, suc) {
    if (sessionStorage.getItem(`${filmId}${cinemaId}${date}`)) {
      var FilmScheduleData = JSON.parse(sessionStorage.getItem(`${filmId}${cinemaId}${date}`));
      suc(FilmScheduleData);
      httpService.getData(JYApi.findItemSku, 'post', {
        params: JSON.stringify({
          "cinemaId": cinemaId,
          "filmIdAlt": filmId,
          "type": "queryItemSku",
          "showtime": date,
          "memberLevelName": localStorage.userInfo ? JSON.parse(localStorage.userInfo).level : ''
        })
      }, function (res) {
        if (res.status == "S" && res.data.length > 0) {
          if (date == $scope.filmData[$scope.mvIndex].showDateArray[$scope.activeIndex.status].showDate) {
            suc(res);
            sessionStorage.setItem(`${filmId}${cinemaId}${date}`, JSON.stringify(res));
            $scope.$broadcast('scroll.refreshComplete');
          }
        }
      });
    } else {
      httpService.getData(JYApi.findItemSku, 'post', {
        params: JSON.stringify({
          "cinemaId": cinemaId,
          "filmIdAlt": filmId,
          "type": "queryItemSku",
          "showtime": date,
          "memberLevelName": localStorage.userInfo ? JSON.parse(localStorage.userInfo).level : ''
        })
      }, function (res) {
        if (res.status == "S" && res.data.length > 0) {
          suc(res);
          sessionStorage.setItem(`${filmId}${cinemaId}${date}`, JSON.stringify(res));
          $scope.$broadcast('scroll.refreshComplete');
        }
      }, 2);
    }
  };
  $scope.slidesTo = function (index) {
    $scope.swiper.slideTo(index);
  };

  //获取排期
  $scope.getSchedule = function (movieId, theatreId, showDate) {
    $scope.getFilmSchedule(movieId, theatreId, showDate, function (res) {
      $scope.scheduleData = res.data;
      // $scope.activityData=res.activityInfo?res.activityInfo:'';//活动数据
      // $scope.currentSchedule=[];
      $scope.currentScheduleTemp = []
      angular.forEach($scope.scheduleData, function (value, key) {
        value.showtime1 = $scope.formatTime(value.showtime);
        // $scope.scheduleTime.push(value.showtime1);
      });
      // $scope.scheduleTime=_.union($scope.scheduleTime);
      angular.forEach($scope.scheduleTime, function (value, key) {
        $scope.currentScheduleTemp[key] = {data: []};
        angular.forEach($scope.scheduleData, function (v, k) {
          if (v.showtime1 == value) {
            $scope.currentScheduleTemp[key].data.push(v);
          }
        });
      });


      //显示太阳月亮
      angular.forEach($scope.currentScheduleTemp, function (value, key) {
        angular.forEach(value.data, function (v, k) {
          if (v.activityInfo && v.activityInfo.length > 0) {
            v.activityLowPrice = _.min(v.activityInfo, function (item) {
              return item.newPriceincents;
            });
          }

          angular.forEach($scope.theatreIconType, function (v1, k1) {
            if (v.screenTypeInfo == v1.name) {
              v.iconType = v1.code;
              if (v.iconType == '&#xe669;') {
                v.iconClass = 'jyicon';
              } else {
                v.iconClass = 'iconfont';
              }
            }
          });
          var date = new Date(Number(v.showtime)).getHours();
          if (date >= 8 && date < 18) {
            v.flag = 'Y'
          } else {
            v.flag = 'N'
          }
          if (v.activityFlag == 'Y') {
            value.promotionalCopy = v.promotionalCopy;
          }
        });
        $scope.currentSchedule = $scope.currentScheduleTemp

      });


      //初始化展示最新一条活动数据
      $scope.getActivityData(0);
      $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
      $scope.flag = false;
      // $scope.activeIndex.status=0;
      $scope.scheduT = $scope.scheduleTime[0];
      $timeout(function () {
        $scope.s = $('.schedule-item-a').outerWidth();
      }, 0);
    });
  }

  //查找影院下影片
  $scope.filmByCinema = function () {
    $scope.swipperNum = screen.width > 680 ? 6 : 4;
    $scope.flag = true;
    httpService.getData(JYApi.findCurrentFilm, 'post', {
      params: JSON.stringify({
        "cinemaId": $scope.theatreId,
        type: 'quickTicket',
        cityName: localStorage.currentCity ? localStorage.currentCity : '广州',
        status: 'HOT',
        statusRE: 'RELEASE'
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.filmData = res.data;
        //去重by filmIdAlt
        var tempArr = [];
        var tempFilmData = [];
        angular.forEach($scope.filmData, function (value, key) {
          tempArr.push(value.filmIdAlt);
        });
        tempArr = _.union(tempArr);
        angular.forEach(tempArr, function (value, key) {
          for (var i = 0; i < $scope.filmData.length; i++) {
            if ($scope.filmData[i].filmIdAlt == value) {
              tempFilmData[key] = $scope.filmData[i]
            }
          }
        });
        $scope.filmData = tempFilmData;

        if (!$scope.movieId) {
          $scope.mvIndex = 0;
        } else {
          angular.forEach(res.data, function (value, key) {
            if ($scope.movieId == value.filmId) {
              $scope.mvIndex = key;
            }
          });
        }
        $scope.initialSlide = $scope.mvIndex;

        $timeout(function () {
          $scope.swiper = new Swiper('.schedule-swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: $scope.swipperNum,
            centeredSlides: true,
            initialSlide: $scope.initialSlide,
            slidesTo: function (index) {
              $scope.swiper.slideTo(index);
            },
            observer: true,
            onTransitionEnd: function (swiper) {
              if ($scope.flag || $scope.mvIndex != swiper.activeIndex) {
                $scope.mvIndex = swiper.activeIndex;
                $scope.activeIndex.status = 0;
                $ionicSlideBoxDelegate.update();
                $scope.movieId = $scope.filmData[$scope.mvIndex].filmIdAlt;

                //获取当前影片的全部排期数据
                $scope.scheduleTime = [];
                console.log($scope.filmData)
                angular.forEach($scope.filmData[$scope.mvIndex].showDateArray, function (value, key) {
                  $scope.scheduleTime.push(value.showDate)
                })


                //获取排期
                $scope.getSchedule($scope.movieId, $scope.theatreId, $scope.filmData[$scope.mvIndex].showDateArray[0].showDate);

              }
            }
          });
        }, 100);
      }
    });
  };

  //获取活动数据方法
  $scope.getActivityData = function (index) {
    $scope.activityCurrentData = [];//清空
    $scope.activityCurrentDataTemp = [];
    $scope.activityCurrentDataIds = [];//清空
    angular.forEach($scope.scheduleData, function (value, key) {
      if (value.activityInfo && value.activityInfo.length > 0) {
        angular.forEach(value.activityInfo, function (v1, k1) {
          $scope.activityCurrentData.push(v1);
        });
      }
    });
    angular.forEach($scope.activityCurrentData, function (v2, k2) {
      $scope.activityCurrentDataIds.push(v2.activityGroupId);
    });
    $scope.activityCurrentDataIds = _.uniq($scope.activityCurrentDataIds);

    for (var i = 0; i < $scope.activityCurrentDataIds.length; i++) {
      for (var j = 0; j < $scope.activityCurrentData.length; j++) {
        if ($scope.activityCurrentDataIds[i] == $scope.activityCurrentData[j].activityGroupId) {
          $scope.activityCurrentDataTemp.push($scope.activityCurrentData[j]);
          break;
        }
      }
    }
    $scope.activityCurrentData = $scope.activityCurrentDataTemp;
    //ruleDesc自动换行
    angular.forEach($scope.activityCurrentData, function (value, key) {
      value.ruleDesc = value.ruleDesc.split("\n");
      for (var i = 0; i < value.ruleDesc.length; i++) {
        value.ruleDesc[i] = value.ruleDesc[i] + '<br>';
      }
      value.ruleDesc = value.ruleDesc.join('');
    });

    //取priority最大值
    $scope.activityCurrentDataNew = _.max($scope.activityCurrentData, function (item) {
      return item.priority;
    });

  };

  // $scope.slideHasChanged=function(index){
  //     var s=$('.schedule-item-a').Width();
  //     var index=index?index:0;
  //     $scope.scheduT=$scope.scheduleTime[$scope.activeIndex.status];
  //     $ionicScrollDelegate.$getByHandle('titleScroll').scrollTo(s*index,0,true);
  //     //获取切换时间活动数据
  //     $scope.getActivityData(index);
  // };

  $scope.filmByCinema();
  $scope.getCinemaInfo();
  $scope.theatreIconType = [
    {id: 'BEDHALL', name: languageSetting.bed, code: '&#xe67d;'},
    {id: 'LOVERSHALL', name: languageSetting.couple, code: '&#xe669;'},
    {id: 'SOUNDHALL', name: languageSetting.soundHall, code: '&#xe672;'},
    {id: '4DHALL', name: languageSetting.hall4D, code: '&#xe686;'},
    {id: 'DOUBLE', name: languageSetting.doubleHall, code: '&#xe69a;'},
    {id: 'SCREEN_TYPE', name: languageSetting.hugeScreen, code: '&#xe687;'},
    {id: 'IMAX', name: languageSetting.imax, code: '&#xe63a;'},
    {id: 'VIP', name: languageSetting.vip, code: '&#xe69e;'},
    {id: 'COMMON', name: languageSetting.common, code: ''},
    {id: 'MX4D', name: languageSetting.mx4D, code: '&#xe686'}
  ];
  //跳转动画
  $scope.myHref = function (id) {
    myhrefService.goPage('movieDetail', [{"name": "id", value: id}]);
  };
  $scope.getCurrentData = function (index, e) {
    $scope.activeIndex.status = index;
    $scope.scheduT = $scope.scheduleTime[$scope.activeIndex.status];
    $scope.getSchedule($scope.movieId, $scope.theatreId, $scope.scheduleTime[index], index);
    $ionicScrollDelegate.$getByHandle('titleScroll').scrollTo($scope.s * index, 0, true);
  };
  //影院公告
  $scope.findCmsNoticeMessage = function () {
    httpService.getData(JYApi.findCmsNoticeMessage, 'post', {
      params: JSON.stringify({
        "cinemaId": $scope.theatreId
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.notice = res.data;
        $scope.noticeTime = [];
        angular.forEach(res.data, function (value, key) {
          $scope.noticeTime.push(value.creationDate);
        });
        $scope.endNoticeTime = Math.max.apply(null, $scope.noticeTime);
        $scope.endNoticeTime += 3 * 24 * 60 * 60 * 1000;
        $scope.nowDate = new Date().getTime();
      }
    });
  };
  $scope.findCmsNoticeMessage();

  //展示活动相关数据
  $scope.showActivity = function (e) {
    $scope.modal.show();
    $ionicBackdrop.retain();
  };
  $scope.$on("$ionicView.enter", function (event, data) {
    $ionicModal.fromTemplateUrl('activityModal', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
  });
  $scope.hideShare = function () {
    $scope.modal.hide();
    $timeout(function () {
      $ionicBackdrop.release();
    }, 50);
  };
  $scope.toggleActivityDetail = function (index) {
    $scope.activityCurrentData[index].activityFlag = !$scope.activityCurrentData[index].activityFlag;
    angular.forEach($scope.activityCurrentData, function (value, key) {
      if ($scope.activityCurrentData[index].activityFlag && index != key) {
        $scope.activityCurrentData[key].activityFlag = false;
      }
    });
  };
  $scope.theatrego = function () {
    $state.go('theatre', {'movieId': $scope.movieId})
  }
});

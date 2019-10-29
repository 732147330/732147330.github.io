/**
 * Created by xiongshengzhong on 16/8/18.
 * 2016.12.16 更新影城获取逻辑 v1.2版需更新内容
 * 2017.1.10 修改影院筛选数据为空提示
 */
'use strict';
app.controller('theatreCtrl', function ($scope, $rootScope, $stateParams, $ionicLoading, $timeout, httpService, JYApi, $ionicPlatform, $ionicModal, $ionicBackdrop) {
  $scope.Number = Number;
  $scope.movieId = $stateParams.movieId;
  $scope.activeIndex = 0;
  $scope.currentData = [];
  $scope.currentData['area'] = {cAreaId: ''};
  $scope.currentData['theatre'] = {name: ''};
  $rootScope.currentCity = localStorage.currentCity ? localStorage.currentCity : languageSetting.defaultCity;
  localStorage.currentCity = localStorage.currentCity ? localStorage.currentCity : $rootScope.currentCity;
  $scope.showFilter = function (e) {
    $scope.modalFlag = true;
    $scope.modal.show();
  };
  $scope.hideFilter = function () {
    $scope.modalFlag = false;
    $scope.modal.hide();
  };

  //获取当前城市归属区
  $scope.getCurrentArea = function () {
    if (localStorage.currentCity) {
      $scope.pareaname = localStorage.currentCity;
    } else {
      if (sessionStorage.gpsInfo) {
        $scope.pareaname = JSON.parse(sessionStorage.gpsInfo).city;
      } else {
        $scope.pareaname = '广州市';
      }
    }

    httpService.getData(JYApi.findSaafAreasViewService, 'post', {
      params: JSON.stringify({
        "parealevel": 2,
        "pareaname": $scope.pareaname
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.areaData = res.data;
      }
    });
  };
  //获取活动海报
  $scope.getCarouselByCity = function (cityName) {
    httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
      params: JSON.stringify({
        "adverPosition": "APP_AD_CINEMA",
        "cityName": cityName
      })
    }, function (res) {
      if (res.status == "S" && res.data.length > 0) {
        $scope.theatreBanner = res.data[0].url;
      }
    });
  };

  httpService.getData(JYApi.findImages, 'post', {
    params: JSON.stringify({
      targetType: 'FILM_AD_FOR_APP',
      imgChannel: 'APP',
      "targetId": $scope.movieId
    })
  }, function (res) {
    if (res.status == "S" && res.data.length > 0) {
      $scope.theatreBanner = res.data[0].url;
    }
  });

  $scope.$on("$ionicView.enter", function (event, data) {
    $scope.noData = false;
    $ionicModal.fromTemplateUrl('templates/modal2.html', {
      scope: $scope,
      animation: 'slide-in-down'
    }).then(function (modal) {
      $scope.modal = modal;
    });
  });
  $scope.getCurrentData = function (index) {
    $scope.activeIndex = index;

  };
  $scope.slideHasChanged = function (index) {
    $scope.activeIndex = index
  };
  $scope.theatreData = [
    {id: 'BEDHALL', name: languageSetting.bed, code: '&#xe67d;'},
    {id: 'LOVERSHALL', name: languageSetting.couple, code: '&#xe686;'},
    {id: 'SOUNDHALL', name: languageSetting.soundHall, code: '&#xe672;'},
    {id: '4DHALL', name: languageSetting.hall4D, code: '&#xe686;'},
    {id: 'DOUBLE', name: languageSetting.doubleHall, code: '&#xe69a;'},
    {id: 'SCREEN_TYPE', name: languageSetting.hugeScreen, code: '&#xe687;'},
    {id: 'IMAX', name: languageSetting.imax, code: '&#xe63a;'},
    {id: 'VIP', name: languageSetting.vip, code: '&#xe69e;'},
    {id: 'COMMON', name: languageSetting.common, code: ''},
    {id: 'MX4D', name: languageSetting.mx4D, code: '&#xe686'}
  ];
  $scope.slideTo = function () {
    return $scope.activeIndex;
  };


  //排序函数
  $scope.sortNumber = function (a, b) {
    return a - b;
  };
  //$scope.resortData=function(){
  //    httpService.getData(JYApi.findCuxMemCinmeasInfo, 'post', {
  //        params:JSON.stringify({
  //            "cityName":localStorage.currentCity
  //        })
  //    }, function (res) {
  //        if(res.status=='S'){
  //            angular.forEach(res.data,function(v,k){
  //                angular.forEach($scope.theatreListBySort,function(v1,k1){
  //                    if(v.cinemaId==v1.cinemaId){
  //                        $scope.resort=v1;
  //                        $scope.theatreListBySort.splice(k1,1);
  //                    }
  //                })
  //            })
  //        }
  //    })
  //};

  //获取附近影城
  $scope.getCityCinema = function (screenType, areaId, isRefresh) {
    $scope.getTheatreData = function () {
      if ($scope.movieId >= 0) {
        $scope.params = {
          filmId: $scope.movieId,
          type: "findCinemaByFilmIdNew",
          cityName: localStorage.currentCity,
          areaId: areaId,
          screenType: screenType
        };
        $scope.url = JYApi.findCurrentFilm;
      } else {
        $scope.params = {
          type: "queryAll",
          cityId: $rootScope.currentCityId,
          cityName: localStorage.currentCity,
          areaId: areaId,
          screenType: screenType
        };
        $scope.url = JYApi.findCinema;
      }
      httpService.getData($scope.url, 'post', {
        params: JSON.stringify($scope.params)
      }, function (res) {
        if (res.status == "S" && res.data.length > 0) {
          $scope.noData = false;
          $scope.theatreList = res.data;
          var num = [];
          $scope.theatreListBySort = [];
          angular.forEach($scope.theatreList, function (value, key) {
            value.screenTypeCode = [];
            if (value.screenTypeInfo) {
              $scope.screenTypes = value.screenTypeInfo.split(',');
              angular.forEach($scope.screenTypes, function (v1, k1) {
                angular.forEach($scope.theatreData, function (v2, k2) {
                  if (v1 == v2.name) {
                    value.screenTypeCode.push({
                      code: v2.code
                    });
                  }
                });
              });
            }
          });

          if (sessionStorage.gpsInfo) {
            angular.forEach($scope.theatreList, function (value, key) {
              var map = new BMap.Map("allmap");
              value.distance = map.getDistance(new BMap.Point(value.longitude, value.latitude), new BMap.Point(JSON.parse(sessionStorage.gpsInfo).long, JSON.parse(sessionStorage.gpsInfo).lat));
              num[key] = value.distance;
              num.sort($scope.sortNumber);
              angular.forEach(num, function (value, key) {
                for (var i = 0; i < $scope.theatreList.length; i++) {
                  if ($scope.theatreList[i].distance == value) {
                    $scope.theatreListBySort[key] = $scope.theatreList[i];
                  }
                }
              });
            });
          } else {
            $scope.theatreListBySort = $scope.theatreList;
          }
        }
        //if(localStorage.userInfo){
        //    $scope.resortData();
        //}
      });
    };

    var geolocation = new BMap.Geolocation();
    $scope.gpsFlag = true;
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var point = new BMap.Point(r.point.lng, r.point.lat);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(point, function (res) {
          $scope.gpsFlag = false;
          var gpsInfo = res.addressComponents;
          $scope.gpsTip = true;
          $scope.address = res.address;
          gpsInfo.lat = res.point.lat;
          gpsInfo.long = res.point.lng;
          sessionStorage.gpsInfo = JSON.stringify(gpsInfo);
          localStorage.currentCity = localStorage.currentCity ? localStorage.currentCity : gpsInfo.city;
          $scope.params = {
            "type": "queryAll",
            "cityName": localStorage.currentCity,
            "areaId": areaId,
            "screenType": screenType
          };
          $scope.url = JYApi.findCinema;
          $scope.getCurrentArea();//获取区域
          $scope.getTheatreData();
        });

      } else {
        $scope.gpsFlag = false;
        $scope.address = '定位失败,点击刷新';
        $scope.gpsTip = true;
        $scope.$apply();
        localStorage.currentCity = '广州市';
        $scope.params = {
          "type": "queryAll",
          "cityName": localStorage.currentCity,
          "areaId": areaId,
          "screenType": screenType
        };
        $scope.url = JYApi.findCinema;
        $scope.getCurrentArea();//获取区域
        $scope.getTheatreData();
      }
    }, {enableHighAccuracy: true})
  };

  //获取我的位置
  $scope.getGPSInfo = function () {
    $scope.address = '正位中...';
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var point = new BMap.Point(r.point.lng, r.point.lat);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(point, function (res) {
          $scope.gpsFlag = false;
          var gpsInfo = res.addressComponents;
          $scope.gpsTip = true;
          $scope.address = res.address;
          $scope.$apply();
          gpsInfo.lat = res.point.lat;
          gpsInfo.long = res.point.lng;
          sessionStorage.gpsInfo = JSON.stringify(gpsInfo);
          localStorage.currentCity = localStorage.currentCity ? localStorage.currentCity : gpsInfo.city;
        });

      } else {
        $scope.gpsFlag = false;
        $scope.address = '定位失败,点击刷新';
        $scope.gpsTip = true;
        $scope.$apply();
        localStorage.currentCity = '广州市';
      }
    }, {enableHighAccuracy: true})
  };


  $scope.$on('$ionicView.enter', function () {
    $scope.getCityCinema('', '');
  });

  $scope.getCondition = function (obj) {
    $scope.currentData = obj;
  };

  //筛选影院
  $scope.searchTheatre = function () {
    $scope.hideFilter();
    $scope.currentData['area'].cAreaId = $scope.currentData['area'].cAreaId ? $scope.currentData['area'].cAreaId : '';
    $scope.getCityCinema($scope.currentData['theatre'].name, $scope.currentData['area'].cAreaId);
  };

  //下拉刷新
  $scope.doRefresh = function () {
    //刷新数据
    $scope.getCityCinema('', '', 1);
    $scope.$broadcast('scroll.refreshComplete');
  };
})

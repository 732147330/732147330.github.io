/**
 * Created by xiongshengzhong on 16/8/18.
 * 2016.12.16 更新热映电影图片放大问题  v1.2版需更新内容
 * 2016.12.23 金逸推荐增加上拉加载更多功能
 * 2016.12.28 增加热更新功能
 */
'use strict';
app.controller('homeCtrl', function ($scope, $rootScope, $state, $location, httpService, $ionicBackdrop, $ionicModal, $ionicPlatform, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicPopup, $http, JYApi, $timeout, $interval, $localForage) {
  //初始化设置
  $scope.currentQty = 20;
  $scope.pageSize = 10;
  $scope.page = 1;
  $scope.moreData = true;
  $scope.noMorePage = false;
  $scope.gpsInfoFlag = false;
  $scope.hotActivityList = [];
  $rootScope.currentCity = localStorage.currentCity ? localStorage.currentCity : languageSetting.defaultCity;
  localStorage.currentCity = localStorage.currentCity ? localStorage.currentCity : $rootScope.currentCity;

    var weChatApi = function () {
        httpService.getData(JYApi.generateConfigSignature, 'post', {
            url: encodeURIComponent(location.href)
        }, function (res) {
            alert(res)
            $scope.appId = res.appId;
            $scope.nonceStr = res.nonceStr;
            $scope.timestamp = res.timestamp;
            $scope.signature = res.signature;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: $scope.appId, // 必填，公众号的唯一标识
                timestamp: $scope.timestamp, // 必填，生成签名的时间戳
                nonceStr: $scope.nonceStr, // 必填，生成签名的随机串
                signature: $scope.signature,// 必填，签名，见附录1
                jsApiList: [
                    'downloadImage',
                    'chooseImage',
                    'uploadImage',
                    'getLocalImgData',
                    'scanQRCode',
                    'getLocation',
                    'openLocation',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'checkJsApi'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
    };
    var isWeChat= function(){
        return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
    }
    $scope.$on("$ionicView.enter", function (event, data) {
        if(isWeChat()){
            weChatApi();
            wx.checkJsApi({
                jsApiList: [
                    'getLocation'
                ],
                success: function (res) {
                    if (res.checkResult.getLocation == false) {
                        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                        return;
                    }
                }
            });

            wx.ready(function () {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        alert(res);
                    }
                });

                //如果不支持则不会执行
                // wx.getLocation({
                //     success: function (res) {
                //         // 用户同意后,将获取的位置基础信息(经度和纬度信息)请求到控制器
                //         //控制器中利用百度的api请求返回地理位置信息数据
                //         $.get("/index/user/map",{ 'res':res },function(data){
                //             alert(data.result.addressComponent);
                //             if(data.status == 0){
                //                 $('#wx_location').html(data.result.addressComponent.city);
                //             }else{
                //                 $('#wx_location').html('未知城市');
                //             }
                //         });
                //     },
                //     cancel: function (res) {
                //         alert('用户拒绝授权获取地理位置');
                //     }
                // });

            });

            wx.error(function (res) {
                alert(res.errMsg);
            });
        }else {
            if(BMap) {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {

                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var point = new BMap.Point(r.point.lng, r.point.lat);
                        var geoc = new BMap.Geocoder();
                        geoc.getLocation(point, function (res) {
                            //console.log('定位接口返回的信息')
                            //console.log(res)
                            var gpsInfo = res.addressComponents;
                            gpsInfo.lat = res.point.lat;
                            gpsInfo.long = res.point.lng;
                            sessionStorage.gpsInfo = JSON.stringify(gpsInfo);
                            //alert(JSON.stringify(res))
                            //alert(JSON.stringify(gpsInfo))
                            //gpsInfo.city='茂名市'
                            if (localStorage.currentCity != gpsInfo.city) {
                                //检查该城市是否有金逸影城
                                httpService.getData(JYApi.findCinema, 'post', {
                                    params: JSON.stringify({
                                        "type": "queryAll",
                                        "cityName": gpsInfo.city
                                    })
                                }, function (res) {
                                    //console.log('开始打印检查该城市是否有金逸影城的接口')
                                    //console.log(res)
                                    if (res.status == "S" && res.data.length > 0) {
                                        $timeout(function () {
                                            var myPopup = $ionicPopup.show({
                                                title: languageSetting.tip,
                                                cssClass: 'jyAlert pgrMap',
                                                template: languageSetting.gpsPositionFront + gpsInfo.city + languageSetting.gpsPositionBack,
                                                buttons: [
                                                    {
                                                        text: languageSetting.gpsPositionDisAgree,
                                                        type: 'button-default',
                                                        onTap: function () {
                                                            myPopup.close();
                                                            $scope.getCityCinema('', '');
                                                            //$scope.showVersionDesc();
                                                        }
                                                    },
                                                    {
                                                        text: languageSetting.gpsPositionAgree,
                                                        type: 'button-calm',
                                                        onTap: function (e) {
                                                            localStorage.currentCity = gpsInfo.city;
                                                            $rootScope.currentCity = gpsInfo.city;
                                                            //$scope.showVersionDesc();
                                                            $scope.getCityCinema('', '');
                                                        }
                                                    }
                                                ]
                                            });
                                        }, 0);
                                    } else {
                                        $timeout(function () {
                                            var myPopup = $ionicPopup.show({
                                                title: languageSetting.tip,
                                                cssClass: 'jyAlert pgrMap',
                                                template: '小主，你所在城市没有影城，是否穿越回广州，约吗？',
                                                buttons: [
                                                    {
                                                        text: languageSetting.gpsPositionDisAgree,
                                                        type: 'button-default',
                                                        onTap: function () {
                                                            localStorage.currentCity = gpsInfo.city;
                                                            $rootScope.currentCity = gpsInfo.city;
                                                            myPopup.close();
                                                            //$scope.showVersionDesc();
                                                            $scope.getCityCinema('', '');
                                                        }
                                                    },
                                                    {
                                                        text: languageSetting.gpsPositionAgree,
                                                        type: 'button-calm',
                                                        onTap: function (e) {
                                                            localStorage.currentCity = '广州市';
                                                            $rootScope.currentCity = '广州市';
                                                            //$scope.showVersionDesc();
                                                            $scope.getCityCinema('', '');
                                                        }
                                                    }
                                                ]
                                            });
                                        }, 0);
                                    }
                                });
                            } else {
                                //$scope.showVersionDesc();
                            }
                            //正式获取到定位
                            if (gpsInfo) {
                                $timeout(function () {
                                    $scope.gpsInfoFlag = true;
                                }, 500);
                            }
                        });
                    } else {
                        $timeout(function () {
                            $scope.gpsInfoFlag = true;
                        }, 500);
                        //$scope.showVersionDesc();
                    }
                }, {enableHighAccuracy: true});
            }else {
                if(!localStorage.currentCity||localStorage.currentCity.length === 0) {
                    localStorage.currentCity = '广州市';
                    $rootScope.currentCity = '广州市';
                    $scope.getCityCinema('', '');
                }
            }
        }
    });




  //考虑有些浏览器没有执行定位方法
  $timeout(function () {
    $scope.gpsInfoFlag = true;
  }, 5000);
  //版本热更新说明
  //$scope.showVersionDesc=function () {
  //    $localForage.getItem('versionInfo').then(function (data) {
  //        if (!data) {
  //            $scope.versionInfo = {title:'版本更新说明',read:'N',version:locals.version,html:`<p>1.金逸折扣卡，立减券多种优惠方式</p><p>2.卖品，衍生品，多种商品便捷购买</p><p>3.新的升级体制，享受更加贴心服务</p><p>4.各种影票，卖品，衍生品活动上线</p>`};
  //        } else {
  //            $scope.versionInfo = JSON.parse(data);
  //            if($scope.versionInfo.version!=locals.version){
  //                $scope.versionInfo.read='N';
  //                $scope.versionInfo.version=locals.version;
  //            }
  //        }
  //        if($scope.versionInfo.read=='N'){
  //             var myPopup = $ionicPopup.show({
  //                 title: $scope.versionInfo.title,
  //                 cssClass: 'jyAlert jyVersion',
  //                 template: $scope.versionInfo.html,
  //                 buttons: [
  //                     {
  //                         text: '确定',
  //                         type: 'button-calm',
  //                         onTap: function (e) {
  //                             myPopup.close();
  //                         }
  //                     }
  //                 ]
  //             });
  //            $scope.versionInfo.read='Y';
  //            $localForage.setItem('versionInfo', JSON.stringify($scope.versionInfo)).then(function () {
  //                $localForage.getItem('versionInfo').then(function (data) {
  //                    $scope.versionInfo=JSON.parse(data);
  //                })
  //            });
  //        }
  //    });
  //};

  //轮播
  $scope.getCarouselByCity = function () {
    $scope.carouselData = [];
    httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
      params: JSON.stringify({
        "adverPosition": "APP_AD_BANNER",
        "cityName": localStorage.currentCity
      })
    }, function (res) {
      if (res.status == "S") {
        if (!res.data || res.data.length == 0) {
          //获取默认轮播数据
          httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
            params: JSON.stringify({
              "adverPosition": "APP_AD_BANNER",
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
  //正在热映
  $scope.findFilms = function (city) {
    $scope.spaceBetween = screen.width > 680 ? 25 : 10;
    $scope.swipperNum = screen.width > 680 ? 5 : 3.5;
    httpService.getData(JYApi.findCurrentFilm, 'post', {
      params: JSON.stringify({
        status: 'HOT',
        type: 'queryFilm',
        cityName: city,
        DBType: "mongoDB"
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.hotFlag = true;
        $scope.isActivity = res.isActivity ? res.isActivity : 0;
        $scope.currentLineList = res.data;
        $scope.currentLineList = $scope.currentLineList.slice(0, $scope.currentQty);
        sessionStorage.newcurrentLineList = JSON.stringify($scope.currentLineList[0]);
        $timeout(function () {
          var swiper = new Swiper('.swiper-container-hot', {
            pagination: '.swiper-pagination',
            slidesPerView: $scope.swipperNum,
            paginationClickable: true,
            spaceBetween: $scope.spaceBetween,
            freeMode: true,
            observer: true
          });
        }, 100);
      }
    });
  };
  //金逸推荐
  $scope.getHotActive = function (page, pageSize) {
    if (!$scope.noMorePage) {
      httpService.getData(JYApi.findArticle, 'post', {
        params: JSON.stringify({
          articleType: 'RECOMMEND',
          type: 'filmTypeHot',
          pageIndex: page,
          pageRows: pageSize
        })

      }, function (res) {
        if (res.status == "S" && res.data.length > 0) {
          $scope.jytjFlag = true;
          if ($scope.page == 1) {
            $scope.hotActivityList = [];
          }
          angular.forEach(res.data, function (v, k) {
            v.strs = [];
            if (v.laber) {
              v.strs = v.laber.split(","); //字符分割
            }
            v.date = v.creationDate.substring(0, 10);
            $scope.hotActivityList.push(v);
          });
          if (res.data.length < $scope.pageSize) {
            $scope.noMorePage = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {
          $scope.noMorePage = true;
        }
      });
    }
  };
  $scope.getCarouselByCity();
  $scope.findFilms(localStorage.currentCity);
  $scope.getHotActive(1, $scope.pageSize);

  $scope.$on("$ionicView.enter", function (event, data) {
    //检查第三方登陆
    var url = window.location.href;
    if (!localStorage.userInfo) {
      if (url.indexOf('memberId') > 0) {
        url = url.substr(0, url.length - 6);
        url = url.split('?');
        url = url[1];
        url = url.split('&');
        var params1 = url[0].split('=');
        var params2 = url[1].split('=');
        var memberId = params1[1];
        var token = params2[1];
        var params = {
          params: JSON.stringify({
            "memberId": memberId
          })
        };
        $http({
          url: JYApi.findMember,
          method: 'post',
          data: $.param(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "token": token
          },
          timeout: 20000
        }).success(function (res) {
          var userInfo = res.data;
          userInfo.token = token;
          localStorage.userInfo = JSON.stringify(userInfo);
          window.location.href = locals.baseUrl() + '/wap#/account';
        });
      }
    }
  });

  //获取用户导航
  if (localStorage.yesChannel) {
    $scope.yesChannel = JSON.parse(localStorage.yesChannel);
  } else {
    $scope.yesChannel = [
      {
        isDefault: 'Y',
        name: '首页',
        href: 'home'
      },
      {
        isDefault: 'Y',
        name: '购票',
        href: 'currentLine'
      },
      {
        isDefault: 'Y',
        name: '影院',
        href: 'theatre'
      }
    ];
  }
  if (localStorage.noChannel) {
    $scope.noChannel = JSON.parse(localStorage.noChannel);
  } else {
    $scope.noChannel = [
      {name: '走进金逸', href: 'business'}
    ];
  }

  //监听当前城市
  $scope.$watch('currentCity', function (newValue, oldValue) {
    if (newValue != oldValue) {
      $timeout(function () {
        $scope.getCarouselByCity();
        $scope.findFilms(localStorage.currentCity);
        $scope.getHotActive(1, $scope.pageSize);
      }, 500);
    }
  });
  //下拉刷新
  $scope.doRefresh = function () {
    //刷新数据
    $scope.getCarouselByCity();
    $scope.findFilms(localStorage.currentCity);
    $scope.getHotActive(1, $scope.pageSize);
    $scope.getCityCinema('', '');
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
    //$scope.$broadcast('scroll.refreshComplete');
  };
  //上拉加载更多
  $scope.loadMore = function () {
    //console.log('load');
    $scope.page++;
    $scope.getHotActive($scope.page, $scope.pageSize);
  };


  //自定义频道
  $scope.$on("$ionicView.beforeEnter", function (event, data) {
    $ionicModal.fromTemplateUrl('templates/modal0.html', {
      scope: $scope,
      animation: 'slide-in-down'
    }).then(function (modal) {
      $scope.modal0 = modal;
    });
  });

  $scope.goCurrentLine = function () {
    $state.go('currentLine');
  };
  $scope.showChannel = function (e) {
    $scope.modal0.show();
    $ionicBackdrop.retain();
    e.stopPropagation();
    $(document).one("click", function () {
      $scope.selChannel = $scope.yesChannel;
      $scope.modal0.hide();
      $ionicBackdrop.release();
    });
  };
  $scope.hideChannel = function (e) {
    $scope.selChannel = $scope.yesChannel;
    $scope.modal0.hide();
    $ionicBackdrop.release();
  };
  $scope.changeChannel = function (index, type) {
    switch (type) {
      case 1:
        if ($scope.yesChannel[index].isDefault == 'Y') return;
        $scope.noChannel.push(
          {
            name: $scope.yesChannel[index].name,
            href: $scope.yesChannel[index].href
          }
        );
        $scope.yesChannel.splice(index, 1);
        break;
      case 2:
        $scope.yesChannel.push(
          {
            name: $scope.noChannel[index].name,
            href: $scope.noChannel[index].href
          }
        );
        $scope.noChannel.splice(index, 1);
        break;
    }
    localStorage.yesChannel = JSON.stringify($scope.yesChannel);
    localStorage.noChannel = JSON.stringify($scope.noChannel);
  };

  //二维码扫描
  $scope.scan = function () {
    $ionicPlatform.ready(function () {
      $cordovaBarcodeScanner
        .scan()
        .then(function (barcodeData) {
          if (barcodeData.text) {

          }
        }, function (error) {

        });
    });
  };

  //自定义splash淡出
  $timeout(function () {
    if (!$rootScope.hasData) {
      $scope.splashLeftTime = 3;
      $scope.skip = function () {
        $scope.skipStatus = true;
        $timeout(function () {
          $scope.skipStatusOver = true;
          $rootScope.hasData = true;
          //if($scope.showNewYear=='Y'){
          //    $scope.RedBadFlag=false;
          //    $scope.redBad.show();
          //    //$ionicBackdrop.retain();
          //}
        }, 300);
        $interval.cancel($scope.djs);
      };

      $scope.djs = $interval(function () {
        if ($scope.splashLeftTime > 1) {
          $scope.splashLeftTime--;
        } else {
          $scope.skipStatus = true;
          $timeout(function () {
            $scope.skipStatusOver = true;
            $rootScope.hasData = true;
            //if($scope.showNewYear=='Y'){
            //    $scope.RedBadFlag=false;
            //    $scope.redBad.show();
            //    //$ionicBackdrop.retain();
            //}
          }, 30);
          $interval.cancel($scope.djs);
        }
      }, 1000);
    }
  }, 300);

  //新需求
  //推荐卖品
  $scope.getRecommend = function (page, pageSize, recommendType, suc) {
    httpService.getData(JYApi.findIrs, 'post', {
      params: JSON.stringify({
        type: "ALL",
        recommendType: recommendType,
        pageIndex: page,
        pageRows: pageSize
      })
    }, function (res) {
      suc(res);
    })
  };
  $scope.getRecommend(1, 100, 'HOME_GOODS_RECOMMEND', function (res) {
    $scope.guessData = res.data;
  });

  $scope.activeIndex = 0;
  $scope.getCurrentData = function (index) {
    $scope.activeIndex = index;
    $ionicSlideBoxDelegate.update();
  };
  $scope.slideHasChanged = function (index) {
    $scope.activeIndex = index;
    //$ionicScrollDelegate.scrollTop();
    $ionicSlideBoxDelegate.update();
  };
  $scope.slideTo = function () {
    return $scope.activeIndex;
  };
  //即将上映
  $scope.getFutrueMovieList = function () {
    httpService.getData(JYApi.findFilms, 'post', {
      params: JSON.stringify({
        status: 'RELEASE',
        type: 'ordinary'
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.futrueMovieData = res.data;
      }
    });
  };
  $scope.getFutrueMovieList();

  $scope.findReceivingCenterInfo = function () {
    httpService.getData(JYApi.findReceivingCenterInfo, 'post', {
      params: JSON.stringify({})
    }, function (res) {
      if (res.status == 'S') {
        $scope.showNewYear = 'Y';
        $scope.findReceivingCenterInfoData = res.data;
        if ($rootScope.hasData) {
          $scope.RedBadFlag = false;
          $scope.redBad.show();
          //$ionicBackdrop.retain();
        }
      } else {
        $scope.showNewYear = 'N';
      }

    });
  };
  $scope.findReceivingCenterInfoAngain = function () {
    httpService.getData(JYApi.findReceivingCenterInfo, 'post', {
      params: JSON.stringify({})
    }, function (res) {
      if (res.status == 'S') {
        $scope.showNewYear = 'Y';
        //$scope.findReceivingCenterInfoData = res.data;
      } else {
        $scope.showNewYear = 'N';
      }

    });
  };
  $scope.$on("$ionicView.enter", function (event, data) {
    //$ionicModal.fromTemplateUrl('templates/redBad.html', {
    //    scope: $scope
    //}).then(function (modal) {
    //    $scope.redBad = modal;
    //});
    if (localStorage.userInfo) {
      $rootScope.userInfo = JSON.parse(localStorage.userInfo);
    }

  });

  $scope.showRedBad = function () {
    $scope.RedBadFlag = true;
  };
  $scope.choose = function (item) {
    $scope.chooseActiveData = item;
    angular.forEach($scope.findReceivingCenterInfoData[0].rcLineList, function (v, k) {
      if (item == v) {
        v.active = false
      } else {
        v.active = true
      }
    });
  };
  $scope.chooseActiveFlag = false;
  //$scope.chooseActive=function(){
  //    if($scope.chooseActiveData==null){
  //        var myPopup = $ionicPopup.show({
  //            title: languageSetting.tip,
  //            cssClass: 'jyAlert jyAlert1',
  //            template: '请您任选一张礼券！'
  //        });
  //        $timeout(function(){
  //            myPopup.close();
  //        },1000);
  //    }else{
  //        httpService.getData(JYApi.receiveGift,'post',{
  //            params:JSON.stringify({
  //                "receivingCenterHeaderId":  $scope.chooseActiveData.receivingCenterHeaderId,
  //                "receivingCenterLineId":  $scope.chooseActiveData.receivingCenterLineId
  //            })
  //        },function(res){
  //            if(res.status=='S'){
  //                $scope.chooseActiveFlag=true;
  //                $scope.findReceivingCenterInfoAngain();
  //                $timeout(function(){
  //                    $scope.redBad.hide();
  //                    $ionicBackdrop.release();
  //                },3000);
  //            }else{
  //
  //            }
  //        });
  //    }
  //};
  //$scope.hideRed=function(){
  //    $scope.redBad.hide();
  //    $ionicBackdrop.release();
  //};
  //$scope.$on("$ionicView.leave", function (event, data) {
  //    $scope.redBad.hide();
  //    $ionicBackdrop.release();
  //});
  //$scope.goArticleDetail=function(id){
  //    window.location.href=locals.returnUrl() +"/?from=timeline#/articleDetail?id="+id;
  //};
  //$scope.goMovieDtail=function(id){
  //    window.location.href=locals.returnUrl() +"/?from=timeline#/movieDetail?movieId="+id;
  //}
  //wap微信分享
  //$scope.absurl = $location.absUrl();
  $scope.scan = function () {
    //判断是否已登录
    if (!localStorage.userInfo) {
      location.href = '#/login';
      return
    }
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        if (result.length == 12 && /[a-z]/.test(result)) {
          httpService.getData(JYApi.updateVoucherMember, 'post', {
            params: JSON.stringify({
              voucherExchangeCode: result
            })
          }, function (res) {
            var myPopup = $ionicPopup.show({
              title: languageSetting.tip,
              cssClass: 'jyAlert jyAlert2',
              template: res.msg
            });
            $timeout(function () {
              myPopup.close();
              $scope.doRefresh();
            }, 2000);
          });
        } else {
          if (/^http:|^https:/.test(result)) location.href = result;
        }
      }
    });
  }

  //猜你喜欢
  $scope.findRecommend = function () {
    httpService.getData(JYApi.findRecommend, 'post', {
      params: JSON.stringify({
        "type": "recommendGoods",
        "recommendType": "HOME_GOODS_RECOMMEND",
        "pageIndex": 1,
        "pageRows": 4,
        "cityName": localStorage.currentCity
      })
    }, function (res) {
      if (res.status == 'S') {
        $scope.recommendData = res.data;
      } else {
      }
    });
  };

  $scope.$on("$ionicView.enter", function (event, data) {
    $scope.findRecommend();
  });
  $scope.recommendGo = function (item) {
    if (item.sourceType == 'GOODS') {
      $state.go('productDetail', {skuId: item.sourceId})
    } else if (item.sourceType == 'FILM') {
      $state.go('movieDetail', {movieId: item.sourceId})
    }
  };
  $scope.newShow = true;
  $scope.scrollContent = function () {
    $ionicScrollDelegate.getScrollPosition();
    if ($ionicScrollDelegate.getScrollPosition().top < 0) {
      $scope.newShow = false
    } else {
      $scope.newShow = true
    }
    if ($ionicScrollDelegate.getScrollPosition().top >= 100) {
      $scope.colorFlag = true;
      $scope.$apply();
    } else if ($ionicScrollDelegate.getScrollPosition().top < 100) {
      $scope.colorFlag = false;
      $scope.$apply();
    }
  };

  //获取附近影城
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
  $scope.getCityCinema = function (screenType, areaId, isRefresh) {
    $scope.getTheatreData = function () {
      httpService.getData(JYApi.findCinema, 'post', {
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
            sessionStorage.newcinemaData = JSON.stringify(_.min($scope.theatreListBySort, function (item) {
              return item.distance
            }));
          } else {
            $scope.theatreListBySort = $scope.theatreList;
            sessionStorage.newcinemaData = JSON.stringify($scope.theatreListBySort[0]);
          }
          //console.log($scope.theatreListBySort)
          //console.log(_.min($scope.theatreListBySort,function(item){return item.distance}));
          //sessionStorage.newcinemaData = JSON.stringify($scope.theatreListBySort[0]);
          //sessionStorage.newcinemaData = JSON.stringify(_.min($scope.theatreListBySort,function(item){return item.distance}));
          $rootScope.newcinemaData = sessionStorage.newcinemaData ? JSON.parse(sessionStorage.newcinemaData) : '';
        } else {
          sessionStorage.newcinemaData = ''
        }
      });
    };
    $scope.params = {
      "type": "queryAll",
      "cityName": localStorage.currentCity
    };
    $scope.getTheatreData();
  };
  $scope.getCityCinema('', '');


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
      //console.log($scope.newcinemaData)
      //console.log($scope.newcurrentLineList)
      $state.go('schedule', {'movieId': $scope.newcurrentLineList.filmId, theatreId: $scope.newcinemaData.cinemaId})
    }

  }

});

/**
 * Created by xiongshengzhong on 16/8/18.
 * 2016.12.16 更新热映电影图片放大问题  v1.2版需更新内容
 * 2016.12.23 金逸推荐增加上拉加载更多功能
 * 2016.12.28 增加热更新功能
 * 2017.4.12 缓存首页数据
 */
'use strict';
app.controller('homeCtrl', function ($scope, $rootScope, $interval, $cordovaStatusbar, $state, $cordovaDevice, $ionicScrollDelegate, $cordovaGeolocation, $cordovaBarcodeScanner, $ionicViewSwitcher, $cordovaInAppBrowser, $ionicActionSheet, $ionicLoading, $cordovaFileTransfer, $http, $cordovaFileOpener2, $cordovaAppVersion, httpService, $ionicBackdrop, $ionicModal, $ionicPlatform, $ionicSlideBoxDelegate, $ionicPopup, JYApi, $timeout, $localForage) {
    //初始化设置
    //$scope.$on('$ionicView.beforeEnter', function (event, data) {
    //    if (locals.isMobile) {
    //        $cordovaStatusbar.style(1);
    //    }
    //});
    $scope.gpsInfoFlag = false;
    $scope.currentQty = 20;
    $scope.pageSize = 10;
    $scope.page = 1;
    $scope.moreData = true;
    $scope.noMorePage = false;
    $scope.hotActivityList = [];
    $rootScope.currentCity = localStorage.currentCity ? localStorage.currentCity : languageSetting.defaultCity;
    localStorage.currentCity = localStorage.currentCity ? localStorage.currentCity : $rootScope.currentCity;
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
                    console.log($scope.theatreListBySort)
                    //console.log(_.min($scope.theatreListBySort,function(item){return item.distance}));
                    //sessionStorage.newcinemaData = JSON.stringify($scope.theatreListBySort[0]);
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
    //轮播
    $scope.getCarouselByCity = function () {
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
                            // localStorage.cacheTime=new Date().getTime();//缓存时间
                            // localStorage.carouseCacheData=JSON.stringify($scope.carouselData);//缓存轮播数据
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
                    $timeout(function () {
                        var swiper = new Swiper('.swiper-container-focus', {
                            autoplay: 4000,
                            loop: true,
                            observer: true,
                            observeParents: true
                        });
                    }, 0);
                    // localStorage.cacheTime=new Date().getTime();//缓存时间
                    // localStorage.carouseCacheData=JSON.stringify($scope.carouselData);//缓存轮播数据
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

                // localStorage.cacheTime=new Date().getTime();//缓存时间
                // localStorage.currentCacheLineList=JSON.stringify(res);//缓存热映数据
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

                    if ($scope.page == 1) {
                        // localStorage.cacheTime=new Date().getTime();//缓存时间
                        // localStorage.hotCacheActivityList=JSON.stringify(res);//缓存金逸推荐数据
                    }
                } else {
                    $scope.noMorePage = true;
                }
            });
        }
    };

    //缓存处理2017.4.12
    $scope.testTime = 360;//设置缓存时间
    $scope.dealCacheCarousel = function () {
        $scope.carouselData = JSON.parse(localStorage.carouseCacheData);
        $timeout(function () {
            var swiper = new Swiper('.swiper-container-focus', {
                autoplay: 4000,
                loop: true,
                observer: true,
                observeParents: true
            });
        }, 0);
    };
    $scope.dealCacheFilms = function () {
        $scope.spaceBetween = screen.width > 680 ? 25 : 10;
        $scope.swipperNum = screen.width > 680 ? 5 : 3.5;
        $scope.currentCacheLineList = JSON.parse(localStorage.currentCacheLineList);
        $scope.hotFlag = true;
        $scope.isActivity = $scope.currentCacheLineList.isActivity ? $scope.currentCacheLineList.isActivity : 0;
        $scope.currentLineList = $scope.currentCacheLineList.data;
        $timeout(function () {
            var swiper = new Swiper('.swiper-container-hot', {
                pagination: '.swiper-pagination',
                slidesPerView: $scope.swipperNum,
                paginationClickable: true,
                spaceBetween: $scope.spaceBetween,
                freeMode: true,
                observer: true
            });
        }, 0);
    };
    $scope.dealCacheHotActive = function () {
        $scope.hotCacheActivityList = JSON.parse(localStorage.hotCacheActivityList);
        $scope.jytjFlag = true;
        if ($scope.page == 1) {
            $scope.hotActivityList = [];
        }
        angular.forEach($scope.hotCacheActivityList.data, function (v, k) {
            $scope.hotActivityList.push(v);
        });
        if ($scope.hotCacheActivityList.data.length < $scope.pageSize) {
            $scope.noMorePage = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    // if(!localStorage.cacheTime || (new Date().getTime()-localStorage.cacheTime)/60000>$scope.testTime){
    $scope.getCarouselByCity();
    $scope.findFilms(localStorage.currentCity);
    $scope.getHotActive(1, $scope.pageSize);
    // }else{
    //   $scope.dealCacheCarousel();
    //   $scope.dealCacheFilms();
    //   $scope.dealCacheHotActive();
    // }

    $scope.showUpdateConfirm = function () {
        var myPopup = $ionicPopup.show({
            cssClass: 'jyAlert jyAlert1',
            title: languageSetting.appVersionUpdate,
            subTitle: $scope.versionRemark,
            buttons: [
                {
                    text: languageSetting.updateNow,
                    type: 'button-calm',
                    onTap: function (e) {
                        var options = {
                            location: 'yes',
                            clearcache: 'yes',
                            toolbar: 'no'
                        };
                        document.addEventListener("deviceready", function () {
                            $cordovaInAppBrowser.open($scope.appStoreUrl, '_blank', options)
                                .then(function (event) {

                                })
                                .catch(function (event) {

                                });
                        }, false);
                        myPopup.show();
                    }
                }
            ]
        });
    };

    //版本热更新说明
    //$scope.showVersionDesc=function () {
    //  $localForage.getItem('versionInfo').then(function (data) {
    //    if (!data) {
    //      $scope.versionInfo = {title:'版本更新说明',read:'N',version:locals.version,html:`<p>1.金逸折扣卡，立减券多种优惠方式</p><p>2.卖品，衍生品，多种商品便捷购买</p><p>3.新的升级体制，享受更加贴心服务</p><p>4.各种影票，卖品，衍生品活动上线</p>`};
    //    } else {
    //      $scope.versionInfo = JSON.parse(data);
    //      if($scope.versionInfo.version!=locals.version){
    //        $scope.versionInfo.read='N';
    //        $scope.versionInfo.version=locals.version;
    //      }
    //    }
    //    if($scope.versionInfo.read=='N'){
    //      // var myPopup = $ionicPopup.show({
    //      //   title: $scope.versionInfo.title,
    //      //   cssClass: 'jyAlert jyVersion',
    //      //   template: $scope.versionInfo.html,
    //      //   buttons: [
    //      //     {
    //      //       text: '确定',
    //      //       type: 'button-calm',
    //      //       onTap: function (e) {
    //      //         myPopup.close();
    //      //       }
    //      //     }
    //      //   ]
    //      // });
    //      $scope.versionInfo.read='Y';
    //      $localForage.setItem('versionInfo', JSON.stringify($scope.versionInfo)).then(function () {
    //        $localForage.getItem('versionInfo').then(function (data) {
    //          $scope.versionInfo=JSON.parse(data);
    //        })
    //      });
    //    }
    //  });
    //};

    //GPS定位
    $scope.getGpsPosition = function () {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        console.log(1111)
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                    var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
                    var geoc = new BMap.Geocoder();
                    geoc.getLocation(point, function (res) {
                        var gpsInfo = res;
                        gpsInfo.lat = position.coords.latitude;
                        gpsInfo.long = position.coords.longitude;
                        sessionStorage.gpsInfo = JSON.stringify(gpsInfo);
                        if (localStorage.currentCity != gpsInfo.addressComponents.city) {
                            $timeout(function () {
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert pgrMap',
                                    template: languageSetting.gpsPositionFront + gpsInfo.addressComponents.city + languageSetting.gpsPositionBack,
                                    buttons: [
                                        {
                                            text: languageSetting.gpsPositionDisAgree,
                                            type: 'button-default',
                                            onTap: function () {
                                                myPopup.close();
                                                //$scope.showVersionDesc();
                                                $scope.getCityCinema('', '');
                                            }
                                        },
                                        {
                                            text: languageSetting.gpsPositionAgree,
                                            type: 'button-calm',
                                            onTap: function (e) {
                                                localStorage.currentCity = gpsInfo.addressComponents.city;
                                                $rootScope.currentCity = gpsInfo.addressComponents.city;
                                                //$scope.showVersionDesc();
                                                $scope.getCityCinema('', '');
                                            }
                                        }
                                    ]
                                });
                            }, 0);
                        } else {
                            $scope.getCityCinema('', '');
                            //$scope.showVersionDesc();
                        }
                        //正式获取到定位
                        if (gpsInfo) {
                            $timeout(function () {
                                $scope.gpsInfoFlag = true;
                            }, 500);
                        }
                    });
                }, function (err) {
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1 pgrMap',
                        template: languageSetting.iosGpsFail,
                        buttons: [
                            {
                                text: languageSetting.confirm,
                                type: 'button-calm',
                                onTap: function (e) {
                                    myPopup.close();
                                    //$scope.showVersionDesc();
                                    if (localStorage.currentCity) {

                                    } else {
                                        localStorage.currentCity = '广州';
                                        $rootScope.currentCity = '广州';
                                    }
                                    $scope.getCityCinema('', '');
                                }
                            }
                        ]
                    });
                    //定位失败
                    $timeout(function () {
                        $scope.gpsInfoFlag = true;
                    }, 500);
                }
            );
    };

    //考虑无网络情况
    $timeout(function () {
        $scope.gpsInfoFlag = true;
    }, 5000);
    $scope.checkVersion = function () {
        $ionicPlatform.ready(function () {
            $cordovaAppVersion.getVersionNumber().then(function (version) {
                $scope.currentVersion = version;
                var params = {
                    params: JSON.stringify({
                        type: 'queryAll',
                        productName: 'IOSAPP'
                    })
                };

                $http({
                    url: JYApi.findVersion,
                    method: 'post',
                    data: $.param(params),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    timeout: 10000
                }).success(function (res) {
                    if (res.status == 'S' && res.data.length > 0) {
                        $scope.newVersion = res.data[0].versionNumber;
                        $scope.versionRemark = res.data[0].versionRemark;
                        $scope.appStoreUrl = res.data[0].downloadUrl;
                        //if($scope.newVersion>$scope.currentVersion){
                        //    $scope.showUpdateConfirm();
                        //}else{
                        $scope.getGpsPosition();
                        //}
                    } else {
                        $scope.getGpsPosition();
                    }
                });
            });
        });
    };

    $scope.$on("$ionicView.enter", function (event, data) {
        $scope.selChannel = $scope.yesChannel;
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
                $scope.findFilms(localStorage.currentCity);
            }, 0);
        }
    });
    //下拉刷新
    $scope.doRefresh = function (isDoRefresh) {
        //刷新数据
        $scope.getCarouselByCity();
        $scope.findFilms(localStorage.currentCity);
        $scope.getHotActive(1, $scope.pageSize);
        $scope.getCityCinema('', '');
        $timeout(function () {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
    //上拉加载更多
    $scope.loadMore = function () {
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
        if (!localStorage.userInfo) {
            $state.go('login');
            return
        }
        $ionicPlatform.ready(function () {
            console.log($cordovaBarcodeScanner)
            $cordovaBarcodeScanner
                .scan()
                .then(function (barcodeData) {
                    if (barcodeData.text) {
                        if (barcodeData.text.indexOf('mealList') > 0) {
                            var url = barcodeData.text.split('wap/');//正式地址切换
                            //var url=barcodeData.text.split('wapprivate/');//私有独立节点
                            url = url[1];
                            url = url.split('/');
                            $state.go('mealList', {cinemaOutId: url[2], screenName: url[3], seatDeatilMessage: url[4], scanCodeFlag: url[5]});
                        } else if (barcodeData.text.indexOf('register') > 0) {
                            var url = barcodeData.text.split('wap/');//正式地址切换
                            //var url=barcodeData.text.split('wapprivate/');//私有独立节点
                            url = url[1];
                            url = url.split('/');
                            $state.go('register', {invitationCode: url[2]});
                        } else if (barcodeData.text.indexOf('invitedScan') > 0) {
                            var url = barcodeData.text.split('wap/');//正式地址切换
                            //var url=barcodeData.text.split('wapprivate/');//私有独立节点
                            url = url[1];
                            url = url.split('=');
                            $state.go('invitedScan', {employeeNumber: url[1]});
                        } else if (barcodeData.text.indexOf('productDetail') > -1) {
                            $scope.qcCodeUrlGo(barcodeData.text);
                        } else if (barcodeData.text.length == 12 && /[a-z]/.test(barcodeData.text)) {
                            httpService.getData(JYApi.updateVoucherMember, 'post', {
                                params: JSON.stringify({
                                    voucherExchangeCode: barcodeData.text
                                })
                            }, function (res) {
                                $scope.myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert2',
                                    template: res.msg
                                });
                                $timeout(function () {
                                    $scope.myPopup.close();
                                }, 2000);
                            });
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '未知扫码,无法识别！'
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 1000);
                        }
                    }
                }, function (error) {
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: '未知扫码,无法识别！'
                    });
                    $timeout(function () {
                        myPopup.close();
                    }, 1000);
                });
        });
    };

    $timeout(function () {
        var swiper = new Swiper('.swiper-container-start', {
            loop: false,
            noSwiping: true
        });

    }, 0);
    //自定义splash淡出
    $timeout(function () {
        if ($rootScope.hasData) {
            $scope.splashLeftTime = 3;
            $scope.skip = function () {
                $scope.skipStatus = true;
                $timeout(function () {
                    $scope.skipStatusOver = true;
                    $rootScope.hasData = true;
                    if ($scope.showNewYear == 'Y') {
                        $scope.RedBadFlag = false;
                        //$scope.redBad.show();
                        //$ionicBackdrop.retain();
                    }
                }, 300);
                $interval.cancel($scope.djs);
                if (locals.isMobile) {
                    $scope.checkVersion();
                }
            };

            $scope.djs = $interval(function () {
                if ($scope.splashLeftTime > 1) {
                    $scope.splashLeftTime--;
                } else {
                    $scope.skipStatus = true;
                    $timeout(function () {
                        $scope.skipStatusOver = true;
                        $rootScope.hasData = true;
                        if ($scope.showNewYear == 'Y') {
                            $scope.RedBadFlag = false;
                            //$scope.redBad.show();
                            //$ionicBackdrop.retain();
                        }
                    }, 30);
                    $interval.cancel($scope.djs);
                    if (locals.isMobile) {
                        $scope.checkVersion();
                    }
                }
            }, 1000);
        } else {
            if (locals.isMobile) {
                $scope.checkVersion();
            }
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


    //$scope.findReceivingCenterInfo=function(){
    //    httpService.getData(JYApi.findReceivingCenterInfo,'post',{
    //        params:JSON.stringify({})
    //    },function(res){
    //        if(res.status=='S'){
    //            $scope.showNewYear='Y';
    //            $scope.findReceivingCenterInfoData = res.data;
    //            if($scope.skipStatusOver){
    //                $scope.RedBadFlag=false;
    //                $scope.redBad.show();
    //                //$ionicBackdrop.retain();
    //            }
    //        }else{
    //            $scope.showNewYear='N';
    //        }
    //
    //    });
    //};
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
        $scope.chooseActiveFlag = false;
        if (localStorage.userInfo) {
            $rootScope.userInfo = JSON.parse(localStorage.userInfo);
            $scope.RedBadFlag = false;
            //$scope.findReceivingCenterInfo();
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
    }
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

    $scope.sougou = function () {
        console.log(sessionStorage)
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
            //console.log( $scope.newcinemaData)
            //console.log($scope.newcurrentLineList)
            $state.go('schedule', {'movieId': $scope.newcurrentLineList.filmId, theatreId: $scope.newcinemaData.cinemaId})
        }
    }

    /*
     *  二维码扫描地址跳转
     *  参数格式：
     *  ?param=value
     *  ?param1=value1&param2=value2
     *  ?param1=value1&param2=value2&param3=value3
     *  .....
     */
    $scope.qcCodeUrlGo = function (paramUrl) {
        var url = paramUrl.split('wap/');//正式地址切换
        //var url = paramUrl.split('wapprivate/');//私有独立节点
        url = url[1];
        var paramNameArr = [];
        var paramValueArr = [];
        var pageName = url.split('?')[0].split('/')[1];
        if(url.indexOf('=') > -1 && url.indexOf('&') === -1) {//单个参数
            url = url.split('=');
            paramNameArr.push(url[0].split('?')[1]);
            paramValueArr.push(url[1]);
        }else if(url.indexOf('=') > -1 && url.indexOf('&') > -1) {//多个参数
            url = url.split('&');
            for(var i = 0; i < url.length; i++){
                var arr = url[i].split('=');
                if(url[i].indexOf('?') > -1){
                    paramNameArr.push(arr[0].split('?')[1]);
                    paramValueArr.push(arr[1]);
                }else {
                    paramNameArr.push(arr[0]);
                    paramValueArr.push(arr[1]);
                }
            }
        }
        var paramObj = {};
        for(var i = 0; i < paramNameArr.length; i++) {
            paramObj[paramNameArr[i]] = paramValueArr[i];
        }
        $state.go(pageName, paramObj);
    }
});

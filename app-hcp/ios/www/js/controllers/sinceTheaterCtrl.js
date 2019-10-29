/**
 * Created by pgr on 17/8/31.
 */
'use strict';
app.controller('sinceTheaterCtrl', function ($scope, $rootScope, $stateParams, $ionicLoading, $ionicViewSwitcher, $ionicPopup, $interval, $timeout, $state, httpService, JYApi, $location, $ionicPlatform, $ionicModal, $ionicBackdrop) {

    $rootScope.currentCity = localStorage.currentCity ? localStorage.currentCity : languageSetting.defaultCity;

    $scope.data = {};

    //获取自提影院
    $scope.getCinema = function () {
        $scope.params = {
            "type": "queryAll",
            "cityName": localStorage.currentCity,
            "areaId": '',
            "screenType": ''
        };

        httpService.getData(JYApi.findCinema, 'post', {
            params: JSON.stringify($scope.params)
        }, function (res) {
            if (res.status == "S") {
                $scope.sinceTheaterData = res.data;
                if ($stateParams.status == "edit") {
                    $scope.data.selSinceTheater = JSON.parse(sessionStorage.selSinceTheater).cinemaId;
                }
                //console.log(JSON.parse(sessionStorage.selSinceTheater));
            }
        })
    };

    $scope.$on('$ionicView.enter', function () {
        sessionStorage.removeItem('cinemaBySkuData');
        if ($stateParams.itemId && $stateParams.skuId) {
            $scope.itemId = $stateParams.itemId;
            $scope.skuId = $stateParams.skuId;
            $scope.addressData();
        } else {
            $scope.getCinema();
        }

    });
    //地面卖品自提影院地址
    $scope.addressData = function () {
        httpService.getData(JYApi.findCinemaBySku, 'post', {
            params: JSON.stringify({
                type: "GET_CINEMA_BY_SKU",
                itemId: $stateParams.itemId,
                cityName: localStorage.currentCity
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.cinemaBySkuData = res.data;
                console.log($scope.cinemaBySkuData)
            }
        });
    };

    $scope.querySel = function (index) {
        if ($stateParams.itemId && $stateParams.skuId) {
            sessionStorage.cinemaBySkuData = JSON.stringify($scope.cinemaBySkuData[index]);
        } else {
            sessionStorage.selSinceTheater = JSON.stringify($scope.sinceTheaterData[index]);
        }
        if ($stateParams.status == "edit") {
            $state.go('addressStep2', {addressStatus: 'edit', id: $stateParams.id, product: $stateParams.product, status: 'product', addressId: $stateParams.addressId});
        } else if ($stateParams.status == "add") {
            $state.go('addressStep2', ({addressStatus: "add", product: $stateParams.product, id: $stateParams.id, status: 'product'}));
        } else if ($stateParams.itemId && $stateParams.skuId) {
            httpService.getData(JYApi.findItemSkuCopy, 'post', {
                params: JSON.stringify({
                    pageIndex: 1,
                    pageRows: 10,
                    itemId: $scope.cinemaBySkuData[index].itemId,
                    cinemaOuterId: $scope.cinemaBySkuData[index].cinemaOuterId
                })
            }, function (res) {
                if (res.status == "S") {
                    $scope.productDetailData = res.data[0];
                    var obj = JSON.parse(sessionStorage.productDetailData);
                    obj.skuId = $scope.productDetailData.skuId;
                    var _obj = Object.assign({}, obj, res.data[0])
                    sessionStorage.productDetailData = JSON.stringify(_obj);
                }
            });
            if (!localStorage.userInfo) {
                $scope.needBind = true;
            } else {
                if (!localStorage.hasAddress) {
                    $state.go('mallOrder', {status: 'product'});

                } else {
                }
            }
            //$state.go('productDetail',({skuId:$stateParams.skuId}));
        }

    };

    //轮播
    $scope.getCarouselByCity = function () {
        $scope.carouselData = [];
        httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
            params: JSON.stringify({
                "adverPosition": "APP_SHOP_CINEMA",
                "cityName": localStorage.currentCity
            })
        }, function (res) {
            if (res.status == "S") {
                if (!res.data || res.data.length == 0) {
                    //获取默认轮播数据
                    httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
                        params: JSON.stringify({
                            "adverPosition": "APP_SHOP_CINEMA",
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

    //生成登录交易信息--忠诚度计划
    $scope.getLoginCount = function () {
        $.ajax({
            type: 'POST',
            url: JYApi.saveLytTxn,
            data: {
                params: JSON.stringify({
                    planId: 3,
                    txnType: 'LOGIN',
                    subType: 'WAP',
                    status: 'PENDING',
                    MemberCardNumber: JSON.parse(localStorage.userInfo).chipNumber ? JSON.parse(localStorage.userInfo).chipNumber : '',
                    memberId: JSON.parse(localStorage.userInfo).memberId
                })
            },
            success: function () {
            }
        });
    };
    //获取会员基础信息
    $scope.findMember = function (memberId) {
        httpService.getData(JYApi.findMember, 'post', {
            params: JSON.stringify({
                "memberId": memberId
            })
        }, function (res) {
            if (res.status == "S") {
                var userInfo = res.data;
                userInfo.token = JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo = JSON.stringify(userInfo);
                localStorage.cacheTime = new Date().getTime();
                $scope.getLoginCount();
                $rootScope.userInfo = userInfo;

            } else {
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };
    $scope.hide = function () {
        $scope.needBind = false;
    };
    $scope.bindPhone = {};
    $scope.sendYzmFlag = '获取验证码';
    $scope.sendYzm = function () {
        if (!$scope.bindPhone.mobileNumber) {
            $rootScope.showTip('请输入手机号码');
        } else {
            if (!(/^1[34578]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
                $rootScope.showTip('手机号码格式不正确');
            } else {
                if ($scope.sendYzmFlag == '获取验证码') {
                    httpService.getData(JYApi.sendMg, 'post', {
                        params: JSON.stringify({
                            "mobileNumber": $scope.bindPhone.mobileNumber,
                            sendType: 'login'
                        })
                    }, function (res) {
                        if (res.status == 'S') {
                            $scope.sendYzmFlag = 60;
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
                    }, 2);
                }
            }
        }
    };
    $scope.getCode = function () {
        $scope.yzmCode = locals.baseUrl() + '/frontUIWebapp/appserver/validateCodeService/createImage?id=' + Math.random();
    };
    $scope.getCode();
    $scope.login = function () {
        httpService.getData(JYApi.lockSeatLogin, 'post', {
            params: JSON.stringify({
                "mobileNumber": $scope.bindPhone.mobileNumber,
                "numCode": $scope.bindPhone.vertifyCode,
                imgCode: $scope.bindPhone.captcha1
            })
        }, function (res) {
            if (res.status == '200') {
                $scope.needBind = false;
                if (res.data.memberId) {
                    res.data.token = res.token;
                    localStorage.userInfo = JSON.stringify(res.data);
                    $scope.findMember(res.data.memberId);
                    $state.go('mallOrder', {status: 'product'});
                }
            } else {
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
    $scope.goLogin = function () {
        $scope.needBind = false;
        $state.go('login', {viewName: 'sinceTheater', urlParams: JSON.stringify($stateParams)});
        $ionicViewSwitcher.nextDirection("none")
    };
    $scope.$on('$ionicView.leave', function () {
        //sessionStorage.removeItem('cinemaBySkuData');
    });

});

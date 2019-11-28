/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('productDetailCtrl', function ($scope, $rootScope, $ionicViewSwitcher, $ionicModal, $interval, $stateParams, $ionicBackdrop, $timeout, $ionicPopup, $state, $location, httpService, JYApi, $ionicScrollDelegate, $http) {
    $scope.address = {}
    $scope.goLogin = function () {
        $scope.needBind = false;
        $state.go('login', {viewName: 'productDetail', urlParams: JSON.stringify($stateParams)});
        $ionicViewSwitcher.nextDirection("none")
    };

    $scope.qty = 1;
    $scope.currentIndex = 0;
    $scope.tabs = [{name: '图文详情'}, {name: '规格参数'}, {name: '购买须知'}];
    $scope.tabsCon = [{content: ''}, {content: ''}, {content: ''}];
    $scope.text = "请选择" + $scope.chooseName + "分类";
    $scope.productDetailModalData = [];
    $scope.skuId = $stateParams.skuId;
    $scope.getCurrentIndex = function (index) {
        $scope.currentIndex = index;
        $timeout(function () {
            $ionicScrollDelegate.resize();
        }, 10);
    };
    $scope.address = {};
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $ionicModal.fromTemplateUrl('productDetail', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $ionicModal.fromTemplateUrl('activityModal2', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.activityModal = modal;
        });
    });
    $scope.$on('$ionicView.enter', function () {
        if (sessionStorage.cinemaBySkuData) {
            $scope.cinemaBySkuData = JSON.parse(sessionStorage.cinemaBySkuData);
            console.log($scope.cinemaBySkuData)
            $scope.address.selCinemaName = $scope.cinemaBySkuData.cinemaName;
            $scope.address.selCinemaAddress = $scope.cinemaBySkuData.address1;
            $scope.address.cinemaOuterId = $scope.cinemaBySkuData.cinemaOuterId;
            $scope.address.itemId = $scope.cinemaBySkuData.itemId ? $scope.cinemaBySkuData.itemId : $scope.itemId;
            $scope.itemId = $scope.address.itemId;
            //$scope.getDatabyskuParams();
        } else {
            $scope.address = {}
        }
        if (localStorage.userInfo) {
            $scope.findCartInfo();
            $scope.getProductDetail();
        }

    });

    $scope.$on('$ionicView.leave', function () {
        //sessionStorage.removeItem('cinemaBySkuData');
        if ($scope.modal) {
            $scope.modal.hide();
            $ionicBackdrop.release();
        }
    });

    //查询购物车
    $scope.findCartInfo = function () {
        httpService.getData(JYApi.findCartInfo, 'post', {
            params: JSON.stringify({})
        }, function (res) {
            if (res.status == "S") {
                $scope.cartData = res.data;
                $scope.num = 0;
                angular.forEach($scope.cartData, function (value, key) {
                    $scope.num += $scope.cartData[key].quantity
                });
                $scope.cartNum = $scope.num
            }
        });
    };

    $scope.showShare = function () {
        $scope.modal.show();
        $ionicBackdrop.retain();
    };
    $scope.hideShare = function (e) {
        $scope.modal.hide();
        $timeout(function () {
            $ionicBackdrop.release();
        }, 500);
        e.stopPropagation();
    };

    //购物数量控制
    $scope.add = function () {
        $scope.qty++;
    };
    $scope.reduce = function (index) {
        if ($scope.qty > 0) {
            $scope.qty--;
        }
    };

    //获取getDatabyskuParams
    $scope.getDatabyskuParams = function () {
        $scope.propValueIdSet = '';
        $scope.selectArr = [];
        $scope.attributesData.filter(function (item, index) {
            item.value.filter(function (subItem, subIndex) {
                if (subItem.active) {
                    $scope.propValueIdSet += (subItem.propValueId) + ',';
                    $scope.selectArr.push(subItem)
                }
            });
        });

        //更新sku数据
        httpService.getData(JYApi.findItemSkuCopy, 'post', {
            params: JSON.stringify({
                propValueIdSet: $scope.propValueIdSet,
                pageIndex: 1,
                pageRows: 10,
                itemId: $scope.itemId,
                skuId: $stateParams.skuId,
                cinemaOuterId: $scope.address.cinemaOuterId
            })
        }, function (res) {
            if (res.status == "S" && res.data.length != 0) {
                $scope.activityCurrent = {};
                $scope.activityCurrentData = [];
                $scope.productDetailModalData = res.data[0];
                $scope.productDetailData = res.data[0];
                $scope.activityCurrentData = res.data[0].activityInfo;
                $scope.activityCurrent = _.max($scope.activityCurrentData, function (item) {
                    return item.priority;
                });
                $scope.productFocusData = res.data[0].appDetailImgSet.split(',');
                console.log($scope.productFocusData);
                //$scope.productDetailData = res.data[0];
                //if(typeof($scope.productDetailData.skuPropValueIdSet)=='number'){
                //    $scope.defaultValue= [];
                //    $scope.defaultValue.push($scope.productDetailData.skuPropValueIdSet);
                //}else if(typeof($scope.productDetailData.skuPropValueIdSet)=='string'){
                //    $scope.defaultValue=$scope.productDetailData.skuPropValueIdSet.split(',');
                //}else{
                //    $scope.defaultValue=[];
                //}
                //console.log($scope.defaultValue);
                //$scope.productFocusData=$scope.productDetailData.appDetailImgSet.split(',');
                //$timeout(function () {
                //    var swiper = new Swiper('.swiper-container-mall-productDetail', {
                //        pagination: '.swiper-pagination-product',
                //        paginationClickable: true,
                //        freeMode: true,
                //        observer: true
                //    });
                //},0);
                //$scope.tabsCon[0].content=res.data[0].appDetailImgSet.split(',');
                //$scope.itemId=res.data[0].itemId;
                //$scope.getAttributes();
                //$scope.specifications();
            }
        });
    };
    $scope.chooseFlag = false;
    $scope.getActiveStatus = function (selfIndex, parentIndex) {
        $scope.attributesData[parentIndex].value.filter(function (item, index) {
            if (index == selfIndex) {
                item.active = true;

            } else {
                item.active = false;
            }
        });
        $scope.chooseFlag = true;
        $scope.chooseNameActive = '';
        if ($scope.attributesData[1]) {
            $scope.chooseNameActive = '已选' + $scope.attributesData[0].value[selfIndex].propValue + ',' + $scope.attributesData[1].value[parentIndex].propValue;
        } else {
            $scope.chooseNameActive = '已选' + $scope.attributesData[0].value[selfIndex].propValue
        }
        $scope.getDatabyskuParams();
    };


    $scope.confirm = function (e) {
        if (!$scope.currentColorIndex) {
            $scope.tipFlag = true;
            $timeout(function () {
                $scope.tipFlag = false;
            }, 2000);
            e.preventDefault();
        }
    };

    //加入购物车
    $scope.addToCart = function () {

        //隐藏模态框
        $scope.modal.hide();
        $timeout(function () {
            $ionicBackdrop.release();
        }, 500);

        if (!$scope.propValueIdSet) {
            $scope.showShare();
            return;
        }

        if (!localStorage.userInfo) {
            $scope.needBind = true;
            $scope.buyFalg = 'cart';
        } else {

            httpService.getData(JYApi.addShopsToCart, 'post', {
                params: JSON.stringify({
                    skuId: $scope.productDetailData.skuId,
                    quantity: $scope.qty
                })
            }, function (res) {
                if (res.status == "S") {
                    $scope.cartNum = $scope.cartNum ? $scope.cartNum + $scope.qty : 1;
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 加入购物车成功'
                    });
                    $timeout(function () {
                        myPopup.close();
                    }, 2000);
                }
            });


        }
    };

    //立即购买
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

                if ($scope.buyFalg == 'cart') {
                    $scope.addToCart();
                } else if ($scope.buyFalg == 'buy') {
                    $scope.buy();
                }

            } else {
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };
    $scope.hide = function () {
        $scope.needBind = false;
        $scope.WXneedBind = false;
    };
    $scope.bindPhone = {};
    $scope.sendYzmFlag = '获取验证码';
    $scope.sendYzm = function () {
        if (!$scope.bindPhone.mobileNumber) {
            $rootScope.showTip('请输入手机号码');
        } else {
            if (!(/^1[3456789]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
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
    //绑定手机2017.10.20
    $scope.bindPhoneFn = function () {
        if (!(/^1[3456789]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
            $rootScope.showTip('手机号码格式不正确');
        } else if (!$scope.bindPhone.vertifyCode || $scope.bindPhone.vertifyCode.length != 6) {
            $rootScope.showTip('验证码格式不正确');
        } else {
            httpService.getData(JYApi.loginAPPNew + '?unionid=' + $scope.unionid + '&mobileNumber=' + $scope.bindPhone.mobileNumber + '&numCode=' + $scope.bindPhone.vertifyCode + '&channelCode=J0001', 'get', {}, function (res) {
                if (res.status == '200') {
                    $scope.WXneedBind = false;
                    var userInfo = res.data;
                    userInfo.token = res.token;
                    $rootScope.userInfo = userInfo;
                    localStorage.userInfo = JSON.stringify(userInfo);
                    localStorage.cacheTime = new Date().getTime();//缓存时间
                    $scope.findMember(res.data.memberId);
                } else {
                    $rootScope.showTip(res.msg);
                }
            }, 2);
        }
    };
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
    $scope.buy = function () {
        if ($scope.productDetailData.skuItemType == 'ONLINE_VIRTUAL_SPREAD_GOODS') {
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '请您使用“金逸电影”微信公众号购买此商品！',
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
            return;
        }
        if (!$scope.propValueIdSet && $scope.productDetailData.skuItemType != 'GROUND_GOODS') {
            $scope.showShare();
            return;
        }
        if (!localStorage.userInfo) {
            $scope.needBind = true;
            $scope.buyFalg = 'buy';
            $scope.modal.hide();
            $ionicBackdrop.release();
        } else {
            if (!$scope.address.selCinemaName && !$scope.propValueIdSet) {
                $scope.productDetailData.qty = $scope.qty;
                $scope.productDetailData.cinemaOuterId = $scope.address.cinemaOuterId;
                sessionStorage.selectArr = JSON.stringify($scope.selectArr);
                sessionStorage.productDetailData = JSON.stringify($scope.productDetailData);
                $state.go('sinceTheater', {itemId: $scope.itemId, skuId: $scope.skuId});
                return;
            }
            if (!localStorage.hasAddress) {
                $scope.modal.hide();
                $ionicBackdrop.release();
                $scope.productDetailData.qty = $scope.qty;
                $scope.productDetailData.cinemaOuterId = $scope.address.cinemaOuterId;
                sessionStorage.selectArr = JSON.stringify($scope.selectArr);
                sessionStorage.productDetailData = JSON.stringify($scope.productDetailData);
                var cinemaId = $stateParams.cinemaId;
                var openChannel = $stateParams.openChannel;
                var ruleHeaderIdList = $stateParams.ruleHeaderIdList;
                var skuId = $stateParams.skuId;
                var cardId = $stateParams.cardId;
                var cardRenewalFlag = $stateParams.cardRenewalFlag || 'N';
                //去生成订单详情页
                $state.go('mallOrder', {status: 'product',ruleHeaderIdList: ruleHeaderIdList,skuId: skuId,cardId: cardId,cardRenewalFlag: cardRenewalFlag,cinemaId: cinemaId,openChannel:  openChannel});
                //$location.path('/mallOrder',{status:'aa'});
            } else {
                //跳转收货地址维护界面
            }
        }
    };

    //商品详情
    $scope.getProductDetail = function () {
        httpService.getData(JYApi.findItemSkuCopy, 'post', {
            params: JSON.stringify({
                skuId: $stateParams.skuId,
                pageIndex: 1,
                pageRows: 10
            })
        }, function (res) {
            if (res.status == "S") {
                if(res.data.length === 0) {
                    $state.go('category');
                    return;
                }
                $scope.activityCurrent = {};
                $scope.activityCurrentData = [];
                $scope.productDetailData = res.data[0];
                $scope.activityCurrentData = res.data[0].activityInfo;
                $scope.activityCurrent = _.max($scope.activityCurrentData, function (item) {
                    return item.priority;
                });
                if (typeof($scope.productDetailData.skuPropValueIdSet) == 'number') {
                    $scope.defaultValue = [];
                    $scope.defaultValue.push($scope.productDetailData.skuPropValueIdSet);
                } else if (typeof($scope.productDetailData.skuPropValueIdSet) == 'string') {
                    $scope.defaultValue = $scope.productDetailData.skuPropValueIdSet.split(',');
                } else {
                    $scope.defaultValue = [];
                }
                $scope.productFocusData = $scope.productDetailData.appDetailImgSet.split(',');

                $timeout(function () {
                    var swiper = new Swiper('.swiper-container-mall-productDetail', {
                        pagination: '.swiper-pagination-product',
                        paginationClickable: true,
                        observer: true
                    });
                }, 0);
                $scope.tabsCon[0].content = res.data[0].appDetailImgSet.split(',');
                $scope.itemId = res.data[0].itemId;
                $scope.getAttributes();
                $scope.specifications();
                $scope.productDetailModalData = $scope.productDetailData;
            }
        })
    };
    $scope.getProductDetail();


    //商品属性
    $scope.getAttributes = function (itemId) {
        httpService.getData(JYApi.getFindItemSpecIndex, 'post', {
            params: JSON.stringify({
                itemId: $scope.itemId,
                type: "ALL"
            })
        }, function (res) {
            $scope.attributesData = res.data;
            $scope.chooseName = '';
            res.data.filter(function (item, index) {
                $scope.chooseName += ('已选' + item.value[0].propValue);
                item.value.filter(function (subItem, subIndex) {
                    if (subItem.propValueId == $scope.defaultValue[index]) {
                        subItem.active = true;
                    } else {
                        subItem.active = false;
                    }
                });
            });
            $scope.getDatabyskuParams();
            $scope.selectArr = [];
            $scope.propValueIdSet = '';
            $scope.attributesData.filter(function (item, index) {
                item.value.filter(function (subItem, subIndex) {
                    if (subItem.active) {
                        $scope.propValueIdSet += (subItem.propValueId) + ',';
                        $scope.selectArr.push(subItem)
                    }
                });
            });


        });
    };

    //规格参数
    $scope.specifications = function () {
        httpService.getData(JYApi.findItemNatureProps, 'post', {
            params: JSON.stringify({
                itemId: $scope.itemId
            })
        }, function (res) {
            $scope.specificationsData = res;
        })
    };

    //展示活动相关数据
    $scope.showActivity = function (e) {
        $scope.activityModal.show();
        $ionicBackdrop.retain();
    };
    $scope.hideShare2 = function () {
        $scope.activityModal.hide();
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

    $scope.goMallOrder = function () {
        $scope.productDetailData.qty = $scope.qty;
        $scope.productDetailData.cinemaOuterId = $scope.address.cinemaOuterId;
        sessionStorage.selectArr = JSON.stringify($scope.selectArr);
        sessionStorage.productDetailData = JSON.stringify($scope.productDetailData);
        $state.go('sinceTheater', {itemId: $scope.itemId, skuId: $scope.skuId})
    }


    //第三方微信登陆
    $scope.weixinLogin = function () {
        var scope = "snsapi_userinfo";
        var state = "_" + (+new Date());
        Wechat.auth(scope, state, function (response) {
            if (response.code) {
                var params = {platform: 'APP', code: response.code};
                $http({
                    url: JYApi.getWechatUserinfo,
                    method: 'post',
                    data: $.param(params),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    timeout: 20000
                }).success(function (res) {
                    $scope.unionid = res.unionid;
                    if ($scope.unionid) {
                        $http({
                            url: JYApi.loginAPPNew + '?unionid=' + $scope.unionid + '&channelCode=' + "J0001",
                            method: 'get',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                            },
                            timeout: 20000
                        }).success(function (res) {
                            if (res.status == '200') {
                                var userInfo = res.data;
                                userInfo.token = res.token;
                                $rootScope.userInfo = userInfo;
                                localStorage.userInfo = JSON.stringify(userInfo);
                                $scope.needBind = false;
                                $scope.findMember(res.data.memberId);
                            } else if (res.status == '201') {
                                $scope.needBind = false;
                                $scope.WXneedBind = true;
                            } else {
                                $cordovaToast.showShortCenter('登录失败');
                            }
                        }, 2);
                    } else {
                        $cordovaToast.showShortCenter('获取unionid失败');
                    }
                }, 1, languageSetting.loading);
            }
        }, function (reason) {
            $cordovaToast.showShortCenter(languageSetting.authorFail);
        });
    };
});


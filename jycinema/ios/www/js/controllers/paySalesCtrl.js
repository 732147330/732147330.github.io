/**
 * 2017.5.3新增支付界面
 **/
'use strict';
app.controller('paySalesCtrl', function ($scope, $rootScope, $ionicBackdrop, $ionicViewSwitcher, $stateParams, $interval, $ionicModal, httpService, JYApi, $http, $cordovaInAppBrowser, myhrefService, $state, $timeout, $ionicHistory, $ionicPopup, $filter) {
    $scope.$on('$ionicView.leave', function () {
        sessionStorage.removeItem('cinemaBySkuData');
        sessionStorage.removeItem('productDetailData');
        sessionStorage.removeItem('selectArr');
    });
    $scope.String = String;
    $scope.ordNum = $stateParams.ordNum;

    $rootScope.userInfo = JSON.parse(localStorage.userInfo);
    $scope.user = {
        mobileNumber: $rootScope.userInfo.mobileNumber
    };
    $scope.ticketTime = $rootScope.userInfo.ticketTime * 60;
    $scope.showtime2 = new Date().getTime();
    //获取影片信息
    $scope.Number = Number;

    $scope.userData = {tel: JSON.parse(localStorage.userInfo).mobileNumber};


    //清除手机号码
    $scope.clearText = function () {
        $scope.user.mobileNumber = '';
    };

    //修改接收短信手机号码
    $scope.changeReceivePhoneNumber = function () {
        if ($scope.user.mobileNumber && $scope.user.mobileNumber != $rootScope.userInfo.cardPhonenumber) {
            httpService.getData(JYApi.updateReceivePhoneNumber, 'post', {
                params: JSON.stringify({
                    "orderCode": $scope.ordNum,
                    "receivePhoneNumber": $scope.user.mobileNumber
                })
            }, function (res) {

            });
        }
    };

    //获取订单时间
    // $scope.getOrderTime = function () {
    //   httpService.getData(JYApi.findOrder, 'post', {
    //     params: JSON.stringify({
    //       orderCode: $scope.ordNum,
    //       memberId: JSON.parse(localStorage.userInfo).memberId
    //     })
    //   }, function (res) {
    //     $scope.getOrderTimeFlag = true;
    //     $scope.orderInfo = res.data[0];
    //     $scope.needPay=$scope.orderInfo.totalAmount;
    //   });
    // };

    //获取订单时间
    $scope.getOrderTime = function () {
        httpService.getData(JYApi.findConfirmOrderPage, 'post', {
            params: JSON.stringify({
                orderCode: $scope.ordNum,
                memberId: JSON.parse(localStorage.userInfo).memberId
            })
        }, function (res) {
            $scope.getOrderTimeFlag = true;
            $scope.orderInfo = res.data[0];
            $scope.needPay = $scope.orderInfo.totalAmount;

            $scope.validCodeFlag = res.data[0].validCodeFlag == 'Y' || (function () {
                    var _flag = false
                    if (res.data[0].goods && res.data[0].goods.length > 0) {
                        res.data[0].goods.forEach(function (_item) {
                            if (_item.validCodeFlag == 'Y') _flag = true
                        })
                    }
                    return _flag
                })();

            if ($scope.needPay == '0' && $scope.orderInfo.bookingType == 'VOUCHER_FREE') {
                $scope.voucherCard = true;
            } else if ($scope.needPay == '0' && $scope.orderInfo.bookingType == 'INTEGRAL_FEE_BUY') {
                $scope.integralPay = true;
            } else if ($scope.needPay == '0' && $scope.orderInfo.bookingType == 'INTEGRAL_FEE_RENEWAL') {
                $scope.integralPay = true;
            } else if ($scope.needPay == '0' && $scope.orderInfo.bookingType == 'INTEGRAL_FEE') {
                $scope.integralPay = true;
            }
            if ($scope.orderInfo.orderType == "MOVIE") {
                $scope.orderName = $scope.orderInfo.cinemaName + '-APP-电影:' + $scope.orderInfo.filmName;
                $scope.orderBody = "APP电影票支付订单"
            } else if ($scope.orderInfo.orderType == "CARD_VOU_ORDER") {
                $scope.orderName = "APP-金逸权益卡";
                $scope.orderBody = "APP权益卡支付订单"
            } else if ($scope.orderInfo.orderType == "GOODS") {
                $scope.orderName = $scope.orderInfo.cinemaName + '-APP-卖品';
                $scope.orderBody = "APP卖品支付订单"
            } else if ($scope.orderInfo.orderType == "ONLINE_GOODS") {
                $scope.orderName = '-APP-衍生品';
                $scope.orderBody = "APP衍生品支付订单"
            } else if ($scope.orderInfo.orderType == "GIFT_CARD") {
                $scope.orderName = '购买礼品卡-APP';
                $scope.orderBody = "APP购买礼品卡支付订单"
            }
        });
    };

    $scope.$on("$ionicView.enter", function (event, data) {
        $scope.isPay = false;
        $scope.getOrderTime();
        $ionicModal.fromTemplateUrl('templates/paySmemberCard.html', {
            scope: $scope,
            animation: 'none'
        }).then(function (modal) {
            $scope.modal = modal;
        });
    });

    $scope.getCurrentData = function (index) {
        $scope.payIndex = index;
    };
    $scope.checkOrder = function () {
        $scope.myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert',
            template: languageSetting.cancelPaying,
            buttons: [
                {
                    text: languageSetting.error,
                    type: 'button-default',
                    onTap: function () {
                        $scope.myPopup.close();
                    }
                },
                {
                    text: languageSetting.confirm,
                    type: 'button-calm',
                    onTap: function (e) {
                        $scope.myPopup.close();
                        $state.go('home');
                    }
                }
            ]
        });
    };

    $scope.$on("$ionicView.leave", function (event, data) {
        if ($scope.myPopup) {
            $scope.myPopup.close();
        }
        if ($scope.modal) {
            $scope.modal.hide();
        }

    });




    //会员卡支付验证码逻辑
    $scope.yzmLogicPay = function () {
        $scope.yzmFlagPay = false;
        httpService.getData(JYApi.sendMg, 'post', {
            params: JSON.stringify({
                "mobileNumber": JSON.parse(localStorage.userInfo).cardPhonenumber,
                sendType: 'pay'
            })
        }, function (res) {
            if (res.status == 'S') {
                $scope.djs = $interval(function () {
                    if ($scope.leftTimePay > 1) {
                        $scope.leftTimePay--;
                    } else {
                        $interval.cancel($scope.djs);
                        $scope.yzmFlagPay = true;
                        $scope.leftTimePay = 60;
                    }
                }, 1000);
            } else {
                $scope.myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="iconTip ion-close-circled"></i>' + res.msg
                });
                $timeout(function () {
                    $scope.myPopup.close();
                    $scope.yzmFlagPay = true;
                    $scope.leftTimePay = 60;
                }, 2000);
            }
        });
    };

    $scope.goSuccessPage = function () {
        $scope.isPay = true;
        $scope.myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: '<i class="iconTip color-green ion-checkmark-circled"></i>' + languageSetting.paySuccess + '!'
        });
        $timeout(function () {
            $scope.myPopup.close();
            if ($scope.orderInfo.orderType == "ONLINE_GOODS") {
                $state.go('myGoods');
            } else if ($scope.orderInfo.orderType == "GIFT_CARD") {
                $state.go('account');
            } else if ($scope.orderInfo.orderType != "GIFT_CARD" && $scope.orderInfo.orderType != "ONLINE_GOODS") {
                $state.go('getOrderTicket', {
                    ordNum: $scope.ordNum,
                    orderType: $scope.orderInfo.orderType
                });
            }
        }, 3000);
    };

    $scope.showModal = function () {
        $scope.modal.show();
        $ionicBackdrop.retain();
    };

    $scope.hideModal = function () {
        $scope.modal.hide();
        $ionicBackdrop.release();
    };


    $scope.paySubmit = function (obj) {
        if ($scope.payIndex >= 0) {
            switch ($scope.payIndex) {
                case 0:
                    //会员卡支付
                    $scope.currentShowIndex = 0;
                    if (!JSON.parse(localStorage.userInfo).cardPhonenumber) {
                        $scope.myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: languageSetting.unBindCard
                        });
                        $timeout(function () {
                            $scope.myPopup.close();
                        }, 2000);
                        return;
                    }
                    $scope.cardPhonenumber = JSON.parse(localStorage.userInfo).cardPhonenumber;
                    //查询会员卡余额
                    httpService.getData(JYApi.getCardInfo, 'post', {
                        params: JSON.stringify({
                            memberId: JSON.parse(localStorage.userInfo).memberId
                        })
                    }, function (res) {
                        if (res.status == "S") {
                            var userInfo = res.data;
                            userInfo.token = JSON.parse(localStorage.userInfo).token;
                            localStorage.userInfo = JSON.stringify(userInfo);
                            $scope.remainPay = JSON.parse(localStorage.userInfo).cardBalance - $scope.needPay;
                            if ($scope.remainPay >= 0) {
                                $scope.yzmFlagPay = true;
                                $scope.leftTimePay = 60;
                                $scope.data = {};
                                $scope.showModal();
                            } else {
                                $scope.myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template: languageSetting.lowBalance,
                                    buttons: [
                                        {
                                            text: languageSetting.cancel,
                                            type: 'button-default',
                                            onTap: function () {
                                                $scope.myPopup.close();
                                            }
                                        },
                                        {
                                            text: languageSetting.charge,
                                            type: 'button-calm',
                                            onTap: function (e) {
                                                $state.go('recharge', {fromPage: 'queryOrder'});
                                            }
                                        }
                                    ]
                                });
                            }
                        } else if (res.status == "NOTOKEN") {
                            $scope.myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '登录失效,请重新登录'
                            });
                            httpService.getData(JYApi.logout, 'post', {}, function (res) {
                            });//自动请求服务退出session
                            $timeout(function () {
                                $scope.myPopup.close();
                                localStorage.removeItem('userInfo');
                                $rootScope.userInfo = null;
                                $ionicViewSwitcher.nextDirection("back");
                                $state.go('login');
                            }, 2000);
                        }
                    }, 2);
                    break;
                case 1:
                    //支付宝支付
                    $scope.currentShowIndex = 1;
                    if ($scope.validCodeFlag) {
                        $scope.data = {};
                        if (!JSON.parse(localStorage.userInfo).cardPhonenumber) {
                            $scope.myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: languageSetting.unBindCard
                            });
                            $timeout(function () {
                                $scope.myPopup.close();
                            }, 2000);
                            return;
                        }
                        $scope.cardPhonenumber = JSON.parse(localStorage.userInfo).cardPhonenumber;
                        httpService.getData(JYApi.getCardInfo, 'post', {
                            params: JSON.stringify({
                                memberId: JSON.parse(localStorage.userInfo).memberId
                            })
                        }, function (res) {
                            if (res.status == "S") {
                                var userInfo = res.data;
                                userInfo.token = JSON.parse(localStorage.userInfo).token;
                                localStorage.userInfo = JSON.stringify(userInfo);
                                $scope.yzmFlagPay = true;
                                $scope.leftTimePay = 60;
                                $scope.showModal();
                            }
                        }, 2);
                    } else {
                        $scope.zfbPay(true);
                    }
                    break;
                case 2:
                    //微信支付
                    $scope.currentShowIndex = 2;
                    if ($scope.validCodeFlag) {
                        $scope.data = {};
                        if (!JSON.parse(localStorage.userInfo).cardPhonenumber) {
                            $scope.myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: languageSetting.unBindCard
                            });
                            $timeout(function () {
                                $scope.myPopup.close();
                            }, 2000);
                            return;
                        }
                        $scope.cardPhonenumber = JSON.parse(localStorage.userInfo).cardPhonenumber;
                        httpService.getData(JYApi.getCardInfo, 'post', {
                            params: JSON.stringify({
                                memberId: JSON.parse(localStorage.userInfo).memberId
                            })
                        }, function (res) {
                            if (res.status == "S") {
                                var userInfo = res.data;
                                userInfo.token = JSON.parse(localStorage.userInfo).token;
                                localStorage.userInfo = JSON.stringify(userInfo);
                                $scope.yzmFlagPay = true;
                                $scope.leftTimePay = 60;
                                $scope.showModal();
                            }
                        }, 2);
                    } else {
                        $scope.wxPay(true);
                    }
                    break;
                case 3:
                    //卡卷0元支付
                    $scope.currentShowIndex = 3;
                    $scope.data = {};
                    if ($scope.validCodeFlag) {
                        if (!JSON.parse(localStorage.userInfo).cardPhonenumber) {
                            $scope.myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: languageSetting.unBindCard
                            });
                            $timeout(function () {
                                $scope.myPopup.close();
                            }, 2000);
                            return;
                        }
                        $scope.cardPhonenumber = JSON.parse(localStorage.userInfo).cardPhonenumber;
                        //查询会员卡余额
                        httpService.getData(JYApi.getCardInfo, 'post', {
                            params: JSON.stringify({
                                memberId: JSON.parse(localStorage.userInfo).memberId
                            })
                        }, function (res) {
                            if (res.status == "S") {
                                var userInfo = res.data;
                                userInfo.token = JSON.parse(localStorage.userInfo).token;
                                localStorage.userInfo = JSON.stringify(userInfo);
                                $scope.yzmFlagPay = true;
                                $scope.leftTimePay = 60;
                                $scope.showModal();
                            }
                        }, 2);
                    } else {
                        $scope.zeroPay();
                    }
                    break;
                case 4:
                    //积分支付
                    $scope.currentShowIndex = 4;
                    $scope.data = {};
                    $scope.zeroPay();
                    break;
            }
        } else {
            $scope.myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '<i class="iconTip ion-close-circled"></i>' + '请选择支付方式'
            });
            $timeout(function () {
                $scope.myPopup.close();
            }, 2000);
        }
    };
    //支付宝支付
    $scope.zfbPay = function (flag) {
        httpService.getData(JYApi.getNotifyUrl + '?payType=' + 'ALI_APP_PAY&tradeNo=' + $scope.orderInfo.paymentBankNumber +'&numCode='+ (flag ? '' : $scope.data.yzm)+'&mobileNumber='+JSON.parse(localStorage.userInfo).cardPhonenumber, 'get', {}, function (res) {
            if (res.status == "S") {
                $scope.notifyUrl = res.data;
                window.alipay.pay({
                    tradeNo: $scope.orderInfo.paymentBankNumber,
                    subject: $scope.orderName,
                    body: '支付宝' + $scope.orderBody,
                    price: $scope.needPay,
                    notifyUrl: $scope.notifyUrl ? $scope.notifyUrl : ''
                }, function (res) {
                    if (res.resultStatus == '9000') {
                        $scope.goSuccessPage();
                    } else if (res.resultStatus == '6001') {
                        $scope.myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: languageSetting.userCancelOrder,
                            buttons: [
                                {
                                    text: languageSetting.confirm,
                                    type: 'button-calm',
                                    onTap: function () {
                                        $scope.myPopup.close();
                                    }
                                }
                            ]
                        });
                    }
                }, function (errorResults) {
                    $scope.myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: languageSetting.payFail + '!'
                    });
                    $timeout(function () {
                        $scope.myPopup.close();
                    }, 3000);
                });
            } else {
                $scope.myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="iconTip ion-close-circled"></i>' + res.msg
                });
                $timeout(function () {
                    $scope.myPopup.close();
                }, 3000);
            }
        });
    };
    //微信支付
    $scope.wxPay = function (flag) {
        Wechat.isInstalled(function (installed) {
            if (installed) {
                httpService.getData(JYApi.payurl, 'post', {
                    payType: 'WX_PAY',
                    subject: $scope.orderName,
                    body: '微信' + $scope.orderBody,
                    totalFee: $scope.needPay,
                    tradeNo: $scope.orderInfo.paymentBankNumber,
                    platform: 'APP',
                    numCode: flag ? '' : $scope.data.yzm,
                    mobileNumber: JSON.parse(localStorage.userInfo).cardPhonenumber
                }, function (res) {
                    if (res.status == "S") {
                        var params = {
                            partnerid: res.data.mch_id, // merchant id
                            prepayid: res.data.prepay_id, // prepay id
                            noncestr: res.data.nonce_str, // nonce
                            timestamp: res.data.timestamp, // timestamp
                            sign: res.data.sign // signed string
                        };
                        Wechat.sendPaymentRequest(params, function () {
                            $scope.goSuccessPage();
                        }, function (reason) {

                        });
                    } else {
                        $scope.myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: '<i class="iconTip ion-close-circled"></i>' + res.msg
                        });
                        $timeout(function () {
                            $scope.myPopup.close();
                        }, 3000);
                    }
                }, 2);
            } else {
                $scope.myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '您还没有安装微信客户端,请先下载微信客户端',
                    buttons: [
                        {
                            text: languageSetting.cancel,
                            type: 'button-default',
                            onTap: function () {
                                $scope.myPopup.close();
                            }
                        },
                        {
                            text: '去下载',
                            type: 'button-calm',
                            onTap: function () {
                                var options = {
                                    location: 'yes',
                                    clearcache: 'yes',
                                    toolbar: 'no'
                                };
                                document.addEventListener("deviceready", function () {
                                    $cordovaInAppBrowser.open('https://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8', '_blank', options)
                                        .then(function (event) {

                                        })
                                        .catch(function (event) {

                                        });
                                }, false);
                            }
                        }
                    ]
                });
            }
        }, function (reason) {

        });
    }
    //0元支付
    $scope.zeroPay = function () {
        $interval.cancel($scope.djs);
        httpService.getData(JYApi.zeroPay, 'post', {
            params: JSON.stringify({
                tradeNo: $scope.orderInfo.paymentBankNumber,
                memberId: JSON.parse(localStorage.userInfo).memberId,
                mobileNumber: JSON.parse(localStorage.userInfo).cardPhonenumber,
                numCode: $scope.data.yzm,
                //payPwd: $scope.getEncryption($scope.data.cardPassword),
                //equitycardCode: $scope.orderInfo.equitycardCode,
                channelCode: "J0005",
                channelId: 7
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.hideModal();
                $scope.goSuccessPage();
            } else {
                $scope.errorTip = true;
                $scope.errorTipMsg = res.msg;
                $timeout(function () {
                    $scope.errorTip = false;
                }, 2000);
            }
        }, 1, '正在支付');
    };

    //会员卡支付
    $scope.memberCardPay = function () {
        $interval.cancel($scope.djs);
        httpService.getData(JYApi.memberPay, 'post', {
            tradeNo: $scope.orderInfo.paymentBankNumber,
            memberNo: JSON.parse(localStorage.userInfo).cardPhonenumber,
            mmeberPwd: $scope.data.cardPassword,
            numCode: $scope.data.yzm,
            totalFee: $scope.needPay,
            channelCode: "J0001"
        }, function (res) {
            if (res.status == "S") {
                $scope.hideModal();
                $scope.goSuccessPage();
                //更新会员卡号
                httpService.getData(JYApi.updateMemberCardInfo, 'post', {
                    params: JSON.stringify({
                        orderCode: $scope.ordNum,
                        cardNumber: JSON.parse(localStorage.userInfo).chipNumber,
                        payMethodCode: 'CARD',
                        channelId: 2,
                        channelCode: "J0001",
                        memberId: localStorage.userInfo ? JSON.parse(localStorage.userInfo).memberId : ''
                    })
                }, function (res) {

                })

            } else {
                $scope.errorTip = true;
                $scope.errorTipMsg = res.msg;
                //$timeout(function () {
                //  $scope.errorTip=false;
                //},2000);
            }
        }, 1, '正在支付');
    };
    $scope.hideTip = function () {
        $scope.errorTip = false;
    };
    //取消支付
    $scope.cancelPay = function () {
        $scope.myPopup = $ionicPopup.show({
            cssClass: 'jyAlert jyAlert1',
            title: "您确定要取消支付吗？",
            subTitle: $scope.versionRemark,
            buttons: [
                {
                    text: languageSetting.cancel,
                    type: 'button-default',
                    onTap: function (e) {
                        $scope.myPopup.close();
                    }
                },
                {
                    text: languageSetting.confirm,
                    type: 'button-calm',
                    onTap: function (e) {
                        $scope.myPopup.close();
                        $state.go('home');
                    }
                }
            ]
        });
    };


});

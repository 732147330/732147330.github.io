// /**
//  * 2017.5.3新增支付界面
//  **/
// 'use strict';
app.controller('wxPayCtrl', function ($scope, $rootScope, $stateParams, $ionicBackdrop, $interval, $ionicModal, httpService, JYApi, $http, myhrefService, $state, $timeout, $ionicHistory, $ionicPopup) {

    $scope.ordNum = $stateParams.ordNum;
    var url = location.href;

    //判断是否是微信浏览器
    $scope.isWeixin = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            $scope.weixinFlag = true;
            $scope.str = url.substring(url.indexOf('?') + 1);
            $scope.code = $scope.str.split('&')[0].split('=')[1];

        } else {
            $scope.weixinFlag = false;
        }
    };
    $scope.isWeixin();

    $scope.goSuccessPage = function () {
        $scope.isPay = true;
        var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: '<i class="iconTip color-green ion-checkmark-circled"></i>' + languageSetting.paySuccess + '!'
        });
        $timeout(function () {
            myPopup.close();
            if ($scope.orderInfo.orderType == 'RECHARGE') {
                $state.go('rechargeRecord');
            } else if ($scope.orderInfo.orderType == "ONLINE_GOODS") {
                $state.go('myGoods');
            } else if ($scope.orderInfo.scanCodeFlag == "CREATE_CARD") {
                window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5MDI0NDMzOQ==&scene=124#wechat_redirect';
            } else if ($scope.orderInfo.orderType == "GIFT_CARD" && $scope.orderInfo.scanCodeFlag != "CREATE_CARD" && $scope.orderInfo.bookingType != "ONLINE_BRANDED_CARD") {
                $state.go('account');
            } else if ($scope.orderInfo.orderType != "GIFT_CARD" && $scope.orderInfo.orderType != "ONLINE_GOODS" && $scope.orderInfo.orderType != 'RECHARGE') {
                $state.go('getOrderTicket', {
                    ordNum: $scope.ordNum,
                    orderType: $scope.orderInfo.orderType
                });
            } else if ($scope.orderInfo.orderType == "GIFT_CARD" && $scope.orderInfo.bookingType == "ONLINE_BRANDED_CARD") {
                $state.go('getOrderTicket', {
                    ordNum: $scope.ordNum,
                    paymentBankNumber: $scope.orderInfo.paymentBankNumber,
                    orderType: $scope.orderInfo.orderType
                });
            }
        }, 3000);
    };

    httpService.getData(JYApi.findOrder, 'post', {
        params: JSON.stringify({
            orderCode: $scope.ordNum,
            memberId: JSON.parse(localStorage.userInfo).memberId
        })
    }, function (res) {
        if (res.status == "S") {
            $scope.orderInfo = res.data[0];
            res.data[0].orderTime = res.data[0].orderTime.replace(/-/g, '/');
            $scope.OrderTime = new Date(res.data[0].orderTime).getTime();
            $scope.needPay = res.data[0].totalAmount;

            // if($scope.weixinFlag){
            if ($scope.orderInfo.orderType == 'RECHARGE') {
                var payParams = {
                    payType: 'WX_PAY',
                    subject: '充值订单',
                    body: JSON.parse(localStorage.userInfo).chipNumber,
                    totalFee: $scope.needPay,
                    tradeNo: $scope.orderInfo.paymentBankNumber,
                    orderTime: $scope.orderInfo.orderTime,
                    code: $scope.code,
                    platform: 'WAP'
                }
            } else if ($scope.orderInfo.orderType == "ONLINE_GOODS") {
                var payParams = {
                    payType: 'WX_PAY',
                    subject: '-WAP-衍生品',
                    body: '微信WAP衍生品订单',
                    totalFee: $scope.needPay,
                    tradeNo: $scope.orderInfo.paymentBankNumber,
                    orderTime: $scope.orderInfo.orderTime,
                    platform: 'WAP',
                    code: $scope.code
                };
            } else if ($scope.orderInfo.orderType == "GIFT_CARD") {
                var payParams = {
                    payType: 'WX_PAY',
                    subject: '购买礼品卡-WAP',
                    body: '微信WAP卖品订单',
                    totalFee: $scope.needPay,
                    tradeNo: $scope.orderInfo.paymentBankNumber,
                    orderTime: $scope.orderInfo.orderTime,
                    platform: 'WAP',
                    code: $scope.code
                };
            } else if ($scope.orderInfo.orderType == "GOODS") {
                var payParams = {
                    payType: 'WX_PAY',
                    subject: $scope.orderInfo.cinemaName + '-WAP-卖品',
                    body: 'WAP卖品支付订单',
                    totalFee: $scope.needPay,
                    tradeNo: $scope.orderInfo.paymentBankNumber,
                    orderTime: $scope.orderInfo.orderTime,
                    platform: 'WAP',
                    code: $scope.code
                };
            } else {
                var payParams = {
                    payType: 'WX_PAY',
                    subject: $scope.orderInfo.cinemaName + '-WAP-电影:' + $scope.orderInfo.filmName,
                    body: '微信WAP电影票订单',
                    totalFee: $scope.needPay,
                    tradeNo: $scope.orderInfo.paymentBankNumber,
                    orderTime: $scope.orderInfo.orderTime,
                    platform: 'WAP',
                    code: $scope.code
                };
            }
            httpService.getData(JYApi.payurl, 'post', payParams, function (res) {
                $scope.onBridgeReady = function () {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            appId: "wx5d69bdaaa9765cda",
                            timeStamp: JSON.stringify(res.data.timeStamp),
                            nonceStr: res.data.nonce_str,
                            package: "prepay_id=" + res.data.prepay_id,
                            signType: "MD5",
                            paySign: res.data.paySign
                        },
                        function (res) {

                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                if ($scope.orderInfo.orderType == 'RECHARGE') {
                                    $state.go('rechargeRecord');
                                } else {
                                    $scope.goSuccessPage();
                                }
                            } else {
                                if ($scope.orderInfo.orderType == 'MOVIE') {
                                    $state.go('pay', {ordNum: $scope.ordNum});
                                } else if ($scope.orderInfo.orderType == 'GOODS' || $scope.orderInfo.orderType == 'GIFT_CARD') {
                                    $state.go('paySales', {ordNum: $scope.ordNum});
                                } else if ($scope.orderInfo.orderType == 'RECHARGE') {
                                    $state.go('rechargeRecord');
                                }

                            }
                        }
                    );
                };
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', $scope.onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', $scope.onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', $scope.onBridgeReady);
                    }
                } else {
                    $scope.onBridgeReady();
                }

            }, 2);
            // }else{
            //     if($scope.orderInfo.orderType=='RECHARGE'){
            //         var payParams= {
            //             payType: 'WX_PAY',
            //             subject: '充值订单',
            //             body: JSON.parse(localStorage.userInfo).chipNumber,
            //             totalFee: $scope.needPay,
            //             tradeNo: $scope.orderInfo.paymentBankNumber,
            //             orderTime: $scope.orderInfo.orderTime,
            //             platform:'WAP_H5'
            //         }
            //     }else{
            //         var payParams={
            //             payType: 'WX_PAY',
            //             subject: $scope.orderInfo.cinemaName + '-WAP-电影:' + $scope.orderInfo.filmName,
            //             body: '微信WAP电影票订单',
            //             totalFee: $scope.needPay,
            //             tradeNo: $scope.orderInfo.paymentBankNumber,
            //             orderTime: $scope.orderInfo.orderTime,
            //             platform:'WAP_H5'
            //         };
            //     }
            //     httpService.getData(JYApi.payurl, 'post', payParams, function (res) {
            //         alert(JSON.stringify(res));
            //         if(res.status=="S"){
            //             $scope.showIsPay=true;
            //             location.href= res.data.mweb_url+'&redirect_url='+encodeURIComponent('http://www.jycinema.com/wxpay#/wxPay/')+$scope.ordNum;
            //         }
            //     });
            //
            // }
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
    });

    $scope.closePay = function () {
        $scope.showIsPay = false;
    };


});



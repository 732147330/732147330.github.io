/**
 * 2018.3.12新增支付界面
 **/
'use strict';
app.controller('payCardCtrl', function ($scope, $rootScope,$ionicBackdrop,$ionicViewSwitcher, $stateParams, $interval, $ionicModal,httpService, JYApi, $http, myhrefService, $state, $timeout, $ionicHistory, $ionicPopup, $ionicScrollDelegate) {
    $scope.paymentBankNumber=$stateParams.paymentBankNumber;
    $scope.totalAmount=$stateParams.totalAmount;
    $scope.getCurrentData = function (index) {
        $scope.payIndex = index;
    };
    $scope.$on("$ionicView.leave", function (event, data) {
        if($scope.myPopup){
            $scope.myPopup.close();
        }
    });

    //支付宝支付
    $scope.zfbPay = function () {
        httpService.getData(JYApi.payurl, 'post',{
            payType:'ALI_PAY',
            subject:'购买礼品卡-WAP',
            body:'支付宝WAP购买礼品卡支付订单',
            totalFee:$scope.totalAmount,
            tradeNo: $scope.paymentBankNumber,
            orderTime:new Date().getTime(),
            timeout:240000
        }, function (res) {
            if(res.status=="S"){
                location.href=res.data;
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
                $state.go('getOrderTicket', {
                    ordNum: $scope.ordNum,
                    orderType: $scope.orderInfo.orderType
                });
        }, 3000);
    };

    $scope.showModal=function () {
        $scope.modal.show();
        $ionicBackdrop.retain();
    };

    $scope.hideModal=function () {
        $scope.modal.hide();
        $ionicBackdrop.release();
    };

    $scope.paySubmit = function (obj) {
        if ($scope.payIndex >= 0) {
            switch ($scope.payIndex) {
                case 0:
                    //支付宝支付
                    $scope.zfbPay();
                    break;
                case 1:
                    //微信支付
                    if($scope.weixinFlag){
                        //微信公众号支付
                        location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5d69bdaaa9765cda&redirect_uri='+encodeURIComponent(locals.returnUrl()+'/#/wxPay/'+$stateParams.ordNum)+'&response_type=code&scope=snsapi_base&state='+$stateParams.ordNum+'&connect_redirect=1#wechat_redirect'
                    }else{
                        //微信H5支付
                        var payParams={
                            payType: 'WX_PAY',
                            subject: '购买礼品卡-WAP',
                            body: '微信WAP购买礼品卡支付订单',
                            totalFee: $scope.totalAmount,
                            tradeNo: $scope.paymentBankNumber,
                            orderTime: new Date().getTime(),
                            platform:'WAP_H5'
                        };
                        httpService.getData(JYApi.payurl, 'post', payParams, function (res) {
                            if(res.status=="S"){
                                location.href= res.data.mweb_url+'&redirect_url='+encodeURIComponent(locals.returnUrl()+'/#/payCard/')+$scope.ordNum+'?payReturn=Y';
                            }
                        });
                    }
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

    //密码加密
    $scope.getEncryption=function (value) {
        var val = Base64.encode(value);
        var arr = [];
        for(var i=0;i<val.length;i++){
            arr.push(val.charAt(i));
            if(i%2){
                var num1 =  Math.floor(10*Math.random());
                arr.push(num1);
                var num2 =  Math.floor(10*Math.random());
                arr.push(num2);
                var num3 =  Math.floor(10*Math.random());
                arr.push(num3)
            }
        }
        return arr.join("");
    };


    //取消支付
    $scope.cancelPay = function () {
        $scope.myPopup = $ionicPopup.show({
            cssClass: 'jyAlert jyAlert1',
            title: "您确定要取消支付吗？",
            subTitle: '',
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

    $scope.isWeixin=function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            $scope.weixinFlag=true;
        } else {
            $scope.weixinFlag=false;
        }
    };
    $scope.isWeixin();


});

/**
 * Created by Administrator on 2016/9/14.
 */'use strict';
app.controller('chargePaymentCtrl', function($scope,$stateParams,httpService,JYApi,$timeout,$state,$ionicPopup) {
    $scope.fromPage=$stateParams.fromPage;
    $scope.num=$stateParams.num;
    $scope.price=$stateParams.totalAmount;
    $scope.payIndex = 0;
    $scope.getCurrentData=function(index){
        $scope.payIndex=index;
    };

    $scope.$on("$ionicView.enter", function(event, data){
        $scope.isWeixin();
    });

    //获取会员基础信息
    $scope.findMember=function(memberId,openId){
        httpService.getData(JYApi.findMember, 'post', {
            params:JSON.stringify({
                "memberId":JSON.parse(localStorage.userInfo).memberId
            })
        }, function (res) {
            if(res.status=="S"){
                var userInfo=res.data;
                userInfo.token= JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo=JSON.stringify(userInfo);
                if($scope.fromPage=='pay' || $scope.fromPage=='paySales'){
                    $state.go('myTickets',{obj:2});
                }else{
                    $state.go('rechargeRecord');
                }
            }
        });
    };

    //支付宝支付
    $scope.zfbPay=function(){
        httpService.getData(JYApi.payurl, 'post',{
            payType:'ALI_PAY',
            subject:'wap充值订单',
            body:JSON.parse(localStorage.userInfo).chipNumber,
            totalFee:$scope.price,
            tradeNo:$scope.payNum
        }, function (res) {
            if(res.status=="S"){
                location.href=res.data;
            }
        });
    };

    //微信支付
    $scope.wechat=function(){
        if($scope.weixinFlag){
            //微信公众号支付
            location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5d69bdaaa9765cda&redirect_uri='+encodeURIComponent(locals.returnUrl()+'/#/wxPay/')+$scope.ordNum+'&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect'
        }else{
            //微信H5支付
            var payParams={
                payType: 'WX_PAY',
                subject: '-WAP-充值-电影:',
                body: '微信WAP电影票订单',
                totalFee: $scope.price,
                tradeNo: $scope.payNum,
                // orderTime: $scope.orderInfo.orderTime,
                platform:'WAP_H5'
            };
            httpService.getData(JYApi.payurl, 'post', payParams, function (res) {
                if(res.status=="S"){
                    location.href= res.data.mweb_url+'&redirect_url='+encodeURIComponent(locals.returnUrl()+'/#/chargePayment/')+$stateParams.totalAmount+'/'+$stateParams.num+'/'+$stateParams.fromPage+'?payReturn=Y&ordNum='+$scope.ordNum;
                }
            });
        }
    };

    //提交支付
    $scope.paySubmit=function(){
        httpService.getData(JYApi.rechargeOrder, 'post', {
            params:JSON.stringify({
                memberId: JSON.parse(localStorage.userInfo).memberId,
                memberName: JSON.parse(localStorage.userInfo).mmbName,
                totalAmount: $scope.price,
                cardId: JSON.parse(localStorage.userInfo).memberCardId,
                cardNumber: JSON.parse(localStorage.userInfo).chipNumber,
                cardType: JSON.parse(localStorage.userInfo).level,
                receivePhoneNumber: JSON.parse(localStorage.userInfo).mobileNumber,
                num:$scope.num,
                versionNumber:'1.23',
                fromPage:$scope.fromPage
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.payNum=res.data.paymentBankNumber;
                $scope.ordNum=res.data.orderCode;
                if($scope.payIndex==0){
                    $scope.zfbPay();
                }else if($scope.payIndex==1){
                    $scope.wechat();
                }
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.submitFail+'!'
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }
        },1,languageSetting.loading);
    };

    $scope.isWeixin=function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            $scope.weixinFlag=true;
        } else {
            $scope.weixinFlag=false;
        }
        if($scope.weixinFlag){

        }else{
            if(location.href.indexOf('?')>0 && location.href.split('?')[1].split('=')[1]=='Y'){
                $scope.showIsPay=true;
            }
        }
    };
    $scope.isWeixin();
    $scope.checkOrder=function () {
        $scope.showIsPay=false;
        $state.go('rechargeRecord');
    };
    $scope.closePay=function () {
        $scope.showIsPay=false;
    };
});

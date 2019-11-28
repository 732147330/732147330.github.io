/**
 * Created by Administrator on 2016/9/14.
 */'use strict';
app.controller('chargePaymentCtrl', function($scope,$stateParams,httpService,JYApi,$timeout,$state,$ionicPopup) {
    $scope.params=$stateParams.params;
    $scope.fromPage=JSON.parse($scope.params).fromPage;
    $scope.price=JSON.parse($stateParams.params).totalAmount;
    $scope.payIndex = 0;
    $scope.getCurrentData=function(index){
        $scope.payIndex=index;
    };

  //获取会员基础信息
  $scope.findMember=function(memberId,openId){
    httpService.getData(JYApi.findMember, 'post', {
      params:JSON.stringify({
        "memberId":JSON.parse(localStorage.userInfo).memberId
      })
    }, function (res) {
      if(res.status=="S"){
        var userInfo = res.data;
        userInfo.token = JSON.parse(localStorage.userInfo).token;
        localStorage.userInfo = JSON.stringify(userInfo);
        if($scope.fromPage=='queryOrder'){
          $state.go('myTickets',{obj:2});
        }else{
          $state.go('rechargeRecord');
        }
      }
    });
  };


    //支付宝支付
    $scope.zfbPay=function(){
        httpService.getData(JYApi.getNotifyUrl+'?payType='+'ALI_APP_PAY&tradeNo='+$scope.payNum, 'get',{}, function (res) {
            if(res.status=="S"){
                $scope.notifyUrl=res.data;
                window.alipay.pay({
                    tradeNo: $scope.payNum,
                    subject: languageSetting.rechargeOrder,
                    body: '金逸影视传媒-APP-充值:'+JSON.parse(localStorage.userInfo).chipNumber,
                    price:$scope.price,
                    notifyUrl: $scope.notifyUrl?$scope.notifyUrl:''
                }, function(res){
                    if(res.resultStatus=='9000'){
                        var myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: languageSetting.rechargeSuccess+'!'
                        });
                        $timeout(function(){
                            myPopup.close();
                            $scope.findMember();
                        },2000);
                    }
                }, function(errorResults){

                });
            }
        });
    };

    //微信支付
    $scope.wechat=function(){
        httpService.getData(JYApi.payurl, 'post', {
            payType:'WX_PAY',
            subject:languageSetting.rechargeOrder,
            body: '金逸影视传媒-APP-充值:'+JSON.parse(localStorage.userInfo).chipNumber,
            totalFee:$scope.price ,
            tradeNo:$scope.payNum,
            platform:'APP'
        }, function (res) {

            if(res.status=="S"){
                var params = {
                    partnerid: res.data.mch_id, // merchant id
                    prepayid: res.data.prepay_id, // prepay id
                    noncestr: res.data.nonce_str, // nonce
                    timestamp: res.data.timestamp, // timestamp
                    sign: res.data.sign // signed string
                };
                Wechat.sendPaymentRequest(params, function () {
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: languageSetting.paySuccess+'!'
                    });
                    $timeout(function () {
                        myPopup.close();
                        $scope.findMember();
                    }, 2000);
                }, function (reason) {
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: reason
                    });
                    $timeout(function () {
                        myPopup.close();
                    }, 2000);
                });
            }else{

            }
        });
    };

    //提交支付
    $scope.paySubmit=function(){
        httpService.getData(JYApi.rechargeOrder, 'post', {
            params:$scope.params
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
});

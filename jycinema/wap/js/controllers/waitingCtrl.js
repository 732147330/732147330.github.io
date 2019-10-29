/**
 * 2018.5.17 增加取票码轮询页面
 */
'use strict';
app.controller('waitingCtrl', function ($scope, $rootScope,$timeout,$state,httpService,JYApi,$stateParams,$ionicViewSwitcher) {
    $scope.paymentBankNumber=$stateParams.paymentBankNumber;

    //获取订单详情
    $scope.findMyOrderInfo=function(){
            $scope.params=JSON.stringify({
                paymentBankNumber:$scope.paymentBankNumber
            });
        httpService.getData(JYApi.findMyOrderInfo, 'post', {
            params:$scope.params
        }, function (res) {
            if(res.status == "S") {
                //微信公众号支付
                location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5d69bdaaa9765cda&redirect_uri='+encodeURIComponent(locals.returnUrl()+'/#/wxPay/'+res.orderCode)+'&response_type=code&scope=snsapi_base&state='+res.orderCode+'&connect_redirect=1#wechat_redirect'
            }
        },2);
    };
    $scope.$on("$ionicView.enter",function(event, data){
        $scope.findMyOrderInfo();
    });

    $scope.doRefresh=function(){
        $scope.findMyOrderInfo();
        $scope.$broadcast('scroll.refreshComplete');
    };
});

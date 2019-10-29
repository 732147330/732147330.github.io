/**
 * 2017.2.13 增加取票码轮询页面
 */
'use strict';
app.controller('getOrderTicketCtrl', function ($scope, $rootScope,$timeout,$state,httpService,JYApi,$stateParams,$ionicViewSwitcher) {
    $scope.ordNum=$stateParams.ordNum;
    $scope.orderType=$stateParams.orderType;
    $scope.paymentBankNumber=$stateParams.paymentBankNumber;
    if($scope.orderType=='CARD_VOU_ORDER'){
        $scope.title='订购权益卡';
        $scope.tip='支付成功，正在订购...';
        $scope.tip2='若遇到影院系统导致订购失败，请联系客服';
    }else if($scope.orderType=='GOODS'){
        $scope.title='订购卖品';
        $scope.tip='支付成功,正在生成取货码';
        $scope.tip2='若遇到影院系统导致生成取货码失败，请联系客服';
    }else if($scope.orderType=='GIFT_CARD'){
        $scope.title='等待开卡';
        $scope.tip='支付成功,等待开卡...';
        $scope.tip2='若遇到影院系统导致开卡失败，请联系客服';
    }else{
        $scope.title='订购出票';
        $scope.tip='支付成功,正在出票';
        $scope.tip2='若遇到影院系统导致出票失败，请联系客服';
    }
    //获取订单详情,获取取票码
    $scope.findOrderDetailInfo=function(){
        if($scope.orderType=='GOODS'){
            $scope.params=JSON.stringify({
                orderStatus:'PAID',
                orderCode:$scope.ordNum
            });
        }else if($scope.orderType=='CARD_VOU_ORDER' || $scope.orderType=='GIFT_CARD'){
            $scope.params=JSON.stringify({
                orderStatus:'PAID',
                orderCode:$scope.ordNum,
                type:'CARD_VOU_ORDER'
            });
        }else{
            $scope.params=JSON.stringify({
                orderCode:$scope.ordNum,
                type:'untake'
            })
        }
        httpService.getData(JYApi.findOrderDetailInfo, 'post', {
            params:$scope.params
        }, function (res) {
            if(res.status == "S" && res.data.length>0) {
                $scope.resData=res.data[0];
                if($scope.resData.vistaBookingId){
                    if($scope.resData.bookingType=="ONLINE_BRANDED_CARD"){
                        $timeout(function(){
                            $state.go('myVipHome');
                        },3000);
                        $ionicViewSwitcher.nextDirection("none");
                    }else{
                        $timeout(function(){
                            $state.go('orderSuccessfully', {
                                ordNum:$scope.ordNum
                            });
                        },3000);
                        $ionicViewSwitcher.nextDirection("none");
                    }

                }
            }
        },2);
    };
    $scope.findVistaBookingId=function(){
            $scope.params=JSON.stringify({
                paymentBankNumber:$scope.paymentBankNumber
            });
        httpService.getData(JYApi.findVistaBookingId, 'post', {
            params:$scope.params
        }, function (res) {
            if(res.status == "S") {
                $timeout(function(){
                    $state.go('myVipHome');
                },3000);
                $ionicViewSwitcher.nextDirection("none");
            }
        },2);
    };
    $scope.findOrder=function(){
        if($scope.orderType=='GIFT_CARD'){
            $scope.findVistaBookingId();
        }else{
            $scope.findOrderDetailInfo();
        }
    };
    $scope.$on("$ionicView.enter",function(event, data){
        if($scope.orderType=='GIFT_CARD'){
            $scope.findVistaBookingId();
        }else{
            $scope.findOrderDetailInfo();
        }

    });

    $scope.doRefresh=function(){
        if($scope.orderType=='GIFT_CARD'){
            $scope.findVistaBookingId();
        }else{
            $scope.findOrderDetailInfo();
        }
        $scope.$broadcast('scroll.refreshComplete');
    };
});

/**
 * 2017.2.13 增加取票码轮询页面
 */
'use strict';
app.controller('getOrderTicketCtrl', function ($scope, $rootScope,$timeout,$state,httpService,JYApi,$stateParams,$ionicViewSwitcher) {
    $scope.ordNum=$stateParams.ordNum;
    $scope.orderType=$stateParams.orderType;
    if($scope.orderType=='CARD_VOU_ORDER'){
      $scope.title='订购权益卡';
      $scope.tip='支付成功，正在订购...';
      $scope.tip2='若遇到影院系统导致订购失败，请联系客服';
    }else if($scope.orderType=='GOODS'){
      $scope.title='订购卖品';
      $scope.tip='支付成功,正在生成取货码';
      $scope.tip2='若遇到影院系统导致生成取货码失败，请联系客服';
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
      }else if($scope.orderType=='CARD_VOU_ORDER'){
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
                    $timeout(function(){
                        $state.go('orderSuccessfully', {
                            ordNum:$scope.ordNum,
                            pingfen:'S'
                        });
                    },3000);
                    $ionicViewSwitcher.nextDirection("none");
                }
            }
        },2);
    };
    $scope.$on("$ionicView.enter",function(event, data){
        $scope.findOrderDetailInfo();
    });

    $scope.doRefresh=function(){
        $scope.findOrderDetailInfo();
        $scope.$broadcast('scroll.refreshComplete');
    };
});

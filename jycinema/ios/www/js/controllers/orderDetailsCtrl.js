/**
 * Created by pgr on 17/9/24.
 */
'use strict';
app.controller('orderDetailsCtrl', function($scope,$rootScope,$stateParams, $ionicLoading,$timeout,httpService,JYApi,$ionicPlatform,$ionicModal,$ionicBackdrop) {

    //查询订单详情
    $scope.findOrderDetails=function () {
        httpService.getData(JYApi.findDerivativeOrders, 'post', {
            params:JSON.stringify({
                tid:$stateParams.tid
            })
        }, function (res) {
            if(res.status=="S"){
           $scope.OrderDetailData=res.data;
            }else{
               
            }
        });
    };
    $scope.findOrderDetails();


});

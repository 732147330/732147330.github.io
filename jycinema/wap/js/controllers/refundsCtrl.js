/**
 * Created by pgr on 18/01/04.
 */
'use strict';
app.controller('refundsCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$timeout,$ionicPopup,$state,$ionicActionSheet) {
    $scope.findOrderDetails=function () {
        httpService.getData(JYApi.findDerivativeOrders, 'post', {
            params:JSON.stringify({
                tid:$stateParams.tid
                //oid:$stateParams.oid
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.OrderDetailData=res.data;
                $scope.OrderDetailData[0].lineInfoList.filter(function (item,index) {
                    if(item.oid==$stateParams.oid){
                        $scope.currentOrderDetailData=item;
                        $scope.selReason.refund=item.expressCode;
                        $scope.selReason.code=item.deliveryOrderCode
                    }
                });
            }else{

            }
        });
    };
    $scope.findOrderDetails();

    $scope.findLookupCode=function(){
        httpService.getData(JYApi.findLookupCode, 'post', {
            params:JSON.stringify({
                "type":"ordinary",
                lookupType:'LOGISTICS_COMPANY'
            })
        }, function (res) {
            if(res.status=='S'){
                $scope.refundData=res.data;
            }
        });
    };
    $scope.findLookupCode();

    $scope.selReason={};
    $scope.refunds=function () {
        $scope.refundData.map(function(item){
            if(item.lookupCode==$scope.selReason.refund){
                $scope.selReason.expressName=item.description
            }
        });
        if(!$scope.selReason.refund){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: '请选择快递公司',
                buttons: [
                    {
                        text: '确定',
                        type: 'button-calm',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            return;
        }
        if(!$scope.selReason.code){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: '请输入快递单号',
                buttons: [
                    {
                        text: '确定',
                        type: 'button-calm',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            return;
        }
        httpService.getData(JYApi.updateLogisticsInfo, 'post', {
            params:JSON.stringify({"tid":$stateParams.tid,"oid":$stateParams.oid,"trackingNumber":$scope.selReason.code,"expressCode":$scope.selReason.code,"expressName":$scope.selReason.expressName})
        }, function (res) {
            if(res.status=="S"){
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: res.msg
                });
                $timeout(function () {
                    myPopup.close();
                    $state.go('myGoods');
                }, 2000);

            }else{

            }
        },2);
    }

});


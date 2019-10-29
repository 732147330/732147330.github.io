/**
 * Created by pgr on 2017/8/23.
 */
'use strict';
app.controller('buyRightsDetailCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state,$stateParams) {

        if($stateParams.status == 'renewalcard'){
        $scope.status = "立即续卡";
            $scope.cardRenewalFlag="Y";
            $scope.equitycardInfoId=$stateParams.equitycardInfoId;
        }else if($stateParams.status == 'newcard'){
          $scope.status = "立即开卡";
            $scope.cardRenewalFlag="N"
        }
        //当前权益卡
        $scope.findRightsDetail=function(){
          httpService.getData(JYApi.findMoreRigghts, 'post', {
              params:JSON.stringify({
                skuId:$stateParams.skuId,
                "imgChannel":"APP",
                "type":"DEATILS"
              })
            }, function (res) {
              if(res.status=="S") {
                $scope.rightsDetailData = res.data;
                //遍历
                $scope.rightsDetailData.map(function(item){
                  item.sales=(item.salePrice/100).toFixed(2);
                  if(item.startDateActive == undefined) return;
                  item.timeData="有效期：" + item.startDateActive +"~"+ item.endDateActive;
                });
                //var rightsArray = [];
                //rightsArray = $scope.rightsDetailData[0].specInfoSku.split("。");//字符分割
                //$scope.rightsMeaningData = rightsArray;
              }
            }
          )};
        $scope.findRightsDetail();

    //生成权益卡订单
    $scope.buildRightsSales=function () {
        //判断是否登录
        if(!localStorage.userInfo){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: languageSetting.unlogin,
                buttons: [
                    {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                            myPopup.close();
                        }
                    },
                    {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                            $state.go('login', {viewName: 'buyRightsDetail', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
            return;
        }else{
            $scope.userInfo = JSON.parse(localStorage.userInfo);
        }
        if($scope.rightsDetailData.length>0){
                var params=JSON.stringify({
                    memberId:$scope.userInfo.memberId?$scope.userInfo.memberId:'',
                    receivePhoneNumber:$scope.userInfo.mobileNumber?$scope.userInfo.mobileNumber:'',
                    memberName:$scope.userInfo.mmbName?$scope.userInfo.mmbName:'',
                    skuItemType:"ONLINE_VIRTUAL_GOODS",
                    cardRenewalFlag:$scope.cardRenewalFlag,
                    equitycardInfoId:$scope.equitycardInfoId,
                    buyNowData:[{"skuId": $stateParams.skuId}]
                });
            httpService.getData(JYApi.mallOrders, 'post', {
                params:params
            }, function (res) {
                if(res.status=="S"){
                    $state.go('paySales',{ordNum:res.orderCode});
                }else if(res.status=="F"){
                    var myPopup = $ionicPopup.show({
                        title: '',
                        cssClass: 'jyAlert jyAlert1',
                        template: res.msg,
                        buttons: [{
                            text: '确定',
                            type: 'button-positive',
                            onTap: function() {
                                myPopup.close();
                            }}]
                    });
                }else if(res.status=="E"){
                    var myPopup = $ionicPopup.show({
                        title: '',
                        cssClass: 'jyAlert jyAlert1',
                        template: res.msg,
                        buttons: [{
                            text: '确定',
                            type: 'button-positive',
                            onTap: function() {
                                myPopup.close();
                            }}]
                    });
                }
            },1,'生成订单');
        }else{

        }
    };


});

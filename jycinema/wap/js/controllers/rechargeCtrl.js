/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('rechargeCtrl', function($scope,$ionicPopup,httpService,JYApi,$state,$rootScope,$stateParams) {
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.rechargeArr=[100,200,300,500];
    $scope.rechargeByInput={num:''};
    $scope.fromPage=$stateParams.fromPage;

    //充值逻辑
    $scope.rechargeSubmit = function(obj) {
        if(!obj.$invalid){
            $scope.params=JSON.stringify({
                // memberId: $rootScope.userInfo.memberId,
                // memberName: $rootScope.userInfo.mmbName,
                totalAmount: $scope.rechargeByType || $scope.rechargeByInput.num,
                // cardId: $rootScope.userInfo.memberCardId,
                // cardNumber: $rootScope.userInfo.chipNumber,
                // cardType: $rootScope.userInfo.level,
                // receivePhoneNumber: $rootScope.userInfo.mobileNumber,
                num:$scope.rechargeByType/100 || $scope.rechargeByInput.num/100,
                // versionNumber:'1.23',
                fromPage:$scope.fromPage
            });
            $state.go("chargePayment", {totalAmount:$scope.rechargeByType || $scope.rechargeByInput.num,num:$scope.rechargeByType/100 || $scope.rechargeByInput.num/100,fromPage:$scope.fromPage});
        }
    };

    $scope.clearRechargeByType=function(){
        $scope.rechargeByType='';
        $('.rechargeTit a.active').removeClass('active');
    };

    $scope.getCurrentData=function(index){
        $scope.rechargeByType=$scope.rechargeArr[index];
        $scope.rechargeByInput.num='';
    };
});


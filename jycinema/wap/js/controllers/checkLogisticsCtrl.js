/**
 * Created by pgr on 18/1/04.
 */
'use strict';
app.controller('checkLogisticsCtrl', function($scope,$rootScope,$stateParams, $ionicLoading,$timeout,httpService,JYApi,$ionicPlatform,$ionicModal,$ionicBackdrop) {

    $scope.accessPath=$stateParams.accessPath;
    $scope.checkLogistics=function(){
        httpService.getData(JYApi.findKdniaoTrackQuery, 'post', {
            params:JSON.stringify({"ShipperCode":$stateParams.expressCode,"LogisticCode":$stateParams.deliveryOrderCode})
        }, function (res) {
            if(res.status=='S'){
                $scope.LogisticCode=res.data.LogisticCode;
                $scope.logisticsCompany=res.data.logisticsCompany;
                $scope.transportState=res.data.transportState;
                $scope.tracesData=res.data.Traces;
            }
        })
    };
    $scope.checkLogistics();
});

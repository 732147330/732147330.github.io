/**
 * Created by pgr on 17/9/01.
 */
'use strict';
app.controller('pickUpProgressCtrl', function($scope,$rootScope,$stateParams, $ionicLoading,$timeout,httpService,JYApi,$ionicPlatform,$ionicModal,$ionicBackdrop) {

    $scope.findDeliverySchedule=function(){
        httpService.getData(JYApi.findDeliverySchedule, 'post', {
            params:JSON.stringify({"oid":$stateParams.oid})
        }, function (res) {
            if(res.status=='S'){
                $scope.deliveryScheduleData=res.data[0];
            }
        })
    };
    $scope.findDeliverySchedule();
});

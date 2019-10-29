/**
 * Created by pgr on 2017/10/9.
 */
'use strict';
app.controller('memberBenefitsCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi) {
    $scope.userInfo = JSON.parse(localStorage.userInfo);
    $scope.findLytLevel=function(){
        httpService.getData(JYApi.findLytLevel, 'post', {
            params:JSON.stringify({})
        }, function (res) {
            $scope.leveData=res;
            console.log(res)
        });
    };
    $scope.findLytMmbLevelL=function(){
        httpService.getData(JYApi.findLytMmbLevelL, 'post', {
            params:JSON.stringify({
                memberId:$scope.userInfo.memberId,
                type:'QUERY_MEMBER_LEVEL'
            })
        }, function (res) {
            $scope.currentleve=res.data;
            //console.log($scope.currentleve)
        });
    };
    $scope.findLytMmbLevelL();
    $scope.findLytLevel();

});
/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('rechargeRecordCtrl', function($scope,httpService,JYApi,$rootScope) {
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.findRecord=function(){
      httpService.getData(JYApi.findRechargeOrder, 'post', {
        params:JSON.stringify({
          "memberId":$rootScope.userInfo.memberId
        })
      }, function (res) {
        if(res.status=="S"){
          $scope.rechargeData=res.data;
        }
      });
    };
    $scope.findRecord();

  $scope.doRefresh=function(){
    $scope.findRecord();
    $scope.$broadcast('scroll.refreshComplete');
  };



});

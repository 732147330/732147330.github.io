/**
 * Created by pgr on 2017/10/9.
 */
'use strict';
app.controller('memberCheatsCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi) {

  $scope.findLookupCode=function(){
    httpService.getData(JYApi.findLookupCode, 'post', {
      params:JSON.stringify({
        "type":"ordinary",
        lookupType:'MEMBER_KM'
      })
    }, function (res) {
      $scope.growData=res.data;
      console.log($scope.growData)
    });
  };
  $scope.findLookupCode();


});

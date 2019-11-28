/**
 * Created by pgr on 2017/8/21.
 */
'use strict';
app.controller('myRightsCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state,$stateParams) {

      $scope.rightsDetailData=JSON.parse(sessionStorage.rightsMeaning);
      //var rightsArray = [];
      //rightsArray =  $scope.rightsDetailData[0].specInfoSku.split("。");//字符分割
      //$scope.rightsMeaningData = rightsArray;


});

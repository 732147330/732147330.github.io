/**
 * Created by pgr on 2017/8/21.
 */
'use strict';
app.controller('myRightsCardDetailCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state,$stateParams) {

    //当前卡
    $scope.timeData= "";
    $scope.findRightsDetail=function(){
    httpService.getData(JYApi.findRightsCardDetail, 'post', {
      params:JSON.stringify({
          type: "EQUITYCARDINFOALL",
          memberId: $stateParams.memberId,
          equitycardInfoId: $stateParams.equitycardInfoId
      })
    }, function (res) {
        $scope.rightsDetailData = res.data[0];
        // sessionStorage.rightsMeaning=JSON.stringify(res.data);
        if($scope.rightsDetailData.startDateActive === undefined || $scope.rightsDetailData.startDateActive === '') return;
        $scope.timeData = "有效期：" + $scope.rightsDetailData.startDateActive.substr(0, 4) + "/" + $scope.rightsDetailData.startDateActive.substr(5, 2) + "/" + $scope.rightsDetailData.startDateActive.substr(8, 2) + "~"+ $scope.rightsDetailData.endDateActive.substr(0, 4) + "/" + $scope.rightsDetailData.endDateActive.substr(5, 2) + "/" + $scope.rightsDetailData.endDateActive.substr(8, 2);
    })
  };

    $scope.findRightsDetail();

});

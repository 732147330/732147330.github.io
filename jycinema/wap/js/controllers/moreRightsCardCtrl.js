/**
 * Created by pgr on 2017/8/21.
 */
'use strict';
app.controller('moreRightsCardCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state) {

      //获取更多权益卡
      $scope.findMoreRigghts=function(isDoRefresh){
      httpService.getData(JYApi.findMoreRigghts, 'post', {
      params:JSON.stringify({
        imgChannel:"APP",
        type:"MORE"
      })
       }, function (res) {
      if(res.status=="S") {
       $scope.moreRightsData = res.data;
        //遍历
        $scope.moreRightsData.map(function(item){
            item.sales=(item.salePrice/100).toFixed(2);
          if(item.startDateActive == undefined) return;
          item.timeData="有效期：" + item.startDateActive +"~"+ item.endDateActive;
        })
      }else{
        var myPopup = $ionicPopup.show({
          title: languageSetting.tip,
          cssClass: 'jyAlert',
          template: '请求失败!'
        });
        $timeout(function(){
          myPopup.close();
        },2000);
      }
      },1,'加载中',isDoRefresh);

      };
     $scope.findMoreRigghts();

  $scope.doRefresh=function(){
    $scope.findMoreRigghts(true);
    $scope.$broadcast('scroll.refreshComplete');
  };

});

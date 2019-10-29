/**
 * Created by pgr on 2017/10/9.
 */
'use strict';
app.controller('roadCourseCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi,$stateParams,$ionicSlideBoxDelegate) {

  $scope.index=0;
  $rootScope.userInfo=JSON.parse(localStorage.userInfo);
  $scope.activeIndex=$scope.index;
  $scope.getCurrentData=function(index){
    $scope.activeIndex=index;
    $ionicSlideBoxDelegate.update();
  };
  $scope.slideHasChanged=function(index){
    $scope.activeIndex=index;
    $ionicSlideBoxDelegate.update();
  };
  $scope.slideTo=function(){
    return $scope.activeIndex;
  };
  $rootScope.userInfo=JSON.parse(localStorage.userInfo);
  $scope.findLytTxnPointValue=function(flag,suc,isDorefresh){
    httpService.getData(JYApi.findLytTxnPointValue, 'post', {
      params:JSON.stringify({
        memberId:$rootScope.userInfo.memberId,
        pointTypeId:flag,
        pageIndex:1,
        pageRows:1000
      })
    }, function (res) {
      //console.log(res)
      //if(res.status=="S"){
      suc(res);

      //}
    },2,'',isDorefresh);
  };

  $scope.$on('$ionicView.enter',function(){
    //未领取
    $scope.findLytTxnPointValue(1,function(res){
      $scope.untakeData=res.data;

    });
    //已领取
    $scope.findLytTxnPointValue(2,function(res){
      $scope.takedData=res.data;

    });
  });

  //下拉刷新
  $scope.doRefresh = function () {
    //刷新数据
    if($scope.activeIndex==0){
      $scope.findLytTxnPointValue(1,function(res){
        $scope.untakeData=res.data;
      },true);
    }else if($scope.activeIndex==1){
      $scope.findLytTxnPointValue(2,function(res){
        $scope.takedData=res.data;
      },true);
    }
    $scope.$broadcast('scroll.refreshComplete');
  };


});

/**
 * Created by pgr on 2017/10/9.
 */
'use strict';
app.controller('memberCenterCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi,$ionicActionSheet, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
  $scope.userInfo = JSON.parse(localStorage.userInfo);
  $scope.findLookupCode=function(id){
    httpService.getData(JYApi.findLookupCode, 'post', {
      params:JSON.stringify({
        "type":"ordinary",
        lookupType:'MMB_LEVEL_POINT_MAP_'+id
      })
    }, function (res) {
      $scope.leveGrowData=res.data;
      $scope.findPlan(id);
    });
  };
  $scope.findPlan=function(id){
    httpService.getData(JYApi.findPlan, 'post', {
      params:JSON.stringify({
        planId:id
      })
    }, function (res) {
      if(res.status=='S'){
        $scope.memberLevelData=res.data.memberLevel;
        $scope.planData=res.data.plan;
        $scope.pointData=res.data.point;
        $scope.high=false;
        if(0<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=$scope.leveGrowData[0].tag){
          $scope.pp=$scope.leveGrowData[0].tag-$scope.pointData[0].pointValue==0?1:$scope.leveGrowData[0].tag-$scope.pointData[0].pointValue;
          $scope.ppLevel=$scope.leveGrowData[1].lookupCode;
          $scope.progress=($scope.pointData[0].pointValue/($scope.leveGrowData[0].tag/0.22)*100)
        }else if($scope.leveGrowData[0].tag<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=$scope.leveGrowData[1].tag){
          $scope.pp=$scope.leveGrowData[1].tag-$scope.pointData[0].pointValue==0?1:$scope.leveGrowData[1].tag-$scope.pointData[0].pointValue;
          $scope.ppLevel=$scope.leveGrowData[2].lookupCode;
          $scope.progress=(22+$scope.pointData[0].pointValue/($scope.leveGrowData[1].tag/0.22)*100)
        }else if($scope.leveGrowData[1].tag<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=$scope.leveGrowData[2].tag){
          $scope.pp=$scope.leveGrowData[2].tag-$scope.pointData[0].pointValue==0?1:$scope.leveGrowData[2].tag-$scope.pointData[0].pointValue;
          $scope.ppLevel=$scope.leveGrowData[3].lookupCode;
          $scope.progress=(40+$scope.pointData[0].pointValue/($scope.leveGrowData[2].tag/0.23)*100)
        }else if($scope.leveGrowData[2].tag<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=$scope.leveGrowData[3].tag){
          $scope.pp=$scope.leveGrowData[3].tag-$scope.pointData[0].pointValue==0?1:$scope.leveGrowData[3].tag-$scope.pointData[0].pointValue;
          $scope.ppLevel=$scope.leveGrowData[4].lookupCode;
          $scope.progress=(50+$scope.pointData[0].pointValue/($scope.leveGrowData[3].tag/0.32)*100)
        }else if($scope.leveGrowData[3].tag<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=9999999){
          $scope.high=true;
          $scope.progress=90;
        }
      }
    });
  };
  $scope.findAllPlan=function(){
    httpService.getData(JYApi.findAllPlan, 'post', {
      params:JSON.stringify({})
    }, function (res) {
      $scope.identityData=[];
      $scope.identityData.push(res.data[0]);
      angular.forEach($scope.identityData,function(value,key){
        value.text=value.description;
      })
    });
  };


  //修改身份
  $scope.show = function() {
    $ionicActionSheet.show({
      buttons:$scope.identityData,
      cancelText: languageSetting.cancel,
      buttonClicked: function(index) {
        $scope.findLookupCode($scope.identityData[index].planId);
        return true;
      }
    });
  };

  $scope.syncMmbInfo=function(){
    httpService.getData(JYApi.syncMmbInfo, 'post', {
      params:JSON.stringify({})
    }, function (res) {
      $scope.findAllPlan();
      $scope.findLookupCode(3);
    });
  };
  $scope.syncMmbInfo();

    //会员卡滑动
    $scope.activeIndex = 0;
    $scope.startDate = "2019-01-01";
    $scope.endDate = "2019-12-31";
    $scope.slideHasChanged=function(index){
        $scope.activeIndex=index;
        console.log(index)
        $ionicSlideBoxDelegate.update();
        $ionicScrollDelegate.scrollTop();
        if(index === 0){
            $scope.startDate = "2019-01-01";
            $scope.endDate = "2019-12-31";
        }else {
            $scope.startDate = "2020-01-01";
            $scope.endDate = "2020-12-31";
        }
    };
    $scope.slideTo=function(){
        return $scope.activeIndex;
    };
});

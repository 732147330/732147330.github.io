/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('setMyRightsCardCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state,$interval) {
  $scope.rightsDetailData=JSON.parse(sessionStorage.rightsMeaning)[0];
  $scope.user={
    newPassword:'',
    oldPassword:'',
    reNewPassword:'',
    changeYzm:''
  };
  $scope.yzmFlag=true;
  $scope.leftTime=60;
  $scope.getYzm=function(){
    httpService.getData(JYApi.sendMg, 'post', {
      params:JSON.stringify({
        "mobileNumber":  $scope.rightsDetailData.mobileNumber
      })
    }, function (res) {
      $scope.yzmFlag=false;
      var djs=$interval(function(){
        if($scope.leftTime>0){
          $scope.leftTime--
        }else{
          djs=null;
          $scope.yzmFlag=true;
        }
      },1000);
    });
  };

  //密码加密
  $scope.getEncryption=function(target){
    var targetStr=Base64.encode(target);
    var targetArr=targetStr.split('');
    var temArr=[];
    var rds=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    $scope.getRandom=function(){
      return rds[Math.floor(Math.random()*rds.length)];
    };
    angular.forEach(targetArr,function(value,key){
      temArr.push(value);
      if((key+1)%2==0){
        var str1=$scope.getRandom();
        var str2=$scope.getRandom();
        var str3=$scope.getRandom();
        var randomStr= str1+str2+str3;
        temArr.push(randomStr);
      }
    });
    return temArr.join().replace(/,/g,'');
  };

  //修改密码流程
  $scope.changePassword = function(){
    if($scope.user.newPassword != $scope.user.reNewPassword){
      var myPopup = $ionicPopup.show({
        title: languageSetting.tip,
        cssClass: 'jyAlert jyAlert1',
        template: "密码与确认密码不一致"
      });
      $timeout(function(){
        myPopup.close();
      },1000);
    }else {
      httpService.getData(JYApi.updateEquitycardInfo, 'post', {
        params: JSON.stringify({
          "equitycardInfoId": $scope.rightsDetailData.equitycardInfoId,
          "equitycardPayPassword": $scope.getEncryption($scope.user.newPassword),
          "numCode": $scope.user.changeYzm,
          "mobileNumber": $scope.rightsDetailData.mobileNumber
        })
      }, function (res) {
        if (res.status == "S") {
          var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: languageSetting.changePasswordSuccess
          });
          $timeout(function () {
            myPopup.close();
            $state.go('myRightsCardDetail', {equitycardInfoId: $scope.rightsDetailData.equitycardInfoId});
          }, 1000);
        } else {
          var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: res.msg
          });
          $timeout(function () {
            myPopup.close();
          }, 1000);
        }
      });
    }
  };
});


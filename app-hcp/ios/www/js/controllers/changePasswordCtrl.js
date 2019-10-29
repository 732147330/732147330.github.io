/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('changePasswordCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state,$interval) {
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
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
                "mobileNumber": $rootScope.userInfo.mobileNumber
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
    //修改密码流程
    $scope.changePassword = function(){
        if($scope.user.newPassword!=$scope.user.reNewPassword){
            $rootScope.showTip('确认密码与新密码不一致!');
            return;
        }
       httpService.getData(JYApi.changePassword, 'post', {
           params:JSON.stringify({
               "memberId":JSON.parse(localStorage.userInfo).memberId,
               "oldPassword":$scope.user.oldPassword,
               "newPassword":$scope.user.newPassword,
               "numCode":$scope.user.changeYzm,
               "mobileNumber":JSON.parse(localStorage.userInfo).mobileNumber
           })
       }, function (res) {
           if(res.status=="S"){
               var myPopup = $ionicPopup.show({
                   title: languageSetting.tip,
                   cssClass: 'jyAlert jyAlert1',
                   template: languageSetting.changePasswordSuccess
               });
               $timeout(function(){
                   myPopup.close();
                   $state.go("personalInformation");
               },1000);
           }else{
               var myPopup = $ionicPopup.show({
                   title: languageSetting.tip,
                   cssClass: 'jyAlert jyAlert1',
                   template: res.msg
               });
               $timeout(function(){
                   myPopup.close();
               },1000);
           }
       });
    };
});


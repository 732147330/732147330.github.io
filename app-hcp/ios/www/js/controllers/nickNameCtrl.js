/**
 * Created by pgr on 16/9/12.
 */
'use strict';
app.controller('nickNameCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state) {
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.saveName=function(){
       httpService.getData(JYApi.updateMember, 'post', {
           params:JSON.stringify({
               "memberId":$rootScope.userInfo.memberId,
               "mmbName":$rootScope.userInfo.mmbName
           })
       }, function (res) {
           if(res.status=="S"){
               localStorage.userInfo=JSON.stringify($rootScope.userInfo);
               var myPopup = $ionicPopup.show({
                   title: languageSetting.tip,
                   cssClass: 'jyAlert jyAlert1',
                   template: languageSetting.changeNicknameSuccess+'!'
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
               },2000);
           }
       });
    };
});
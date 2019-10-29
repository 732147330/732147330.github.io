/**
 * Created by pgr on 16/10/08.
 */
'use strict';
app.controller('changeEmailCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state) {
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.user={
        email:$rootScope.userInfo.emailAddress
    };
   $scope.save=function(){
       httpService.getData(JYApi.updateMember, 'post', {
           params:JSON.stringify({
               "memberId":$rootScope.userInfo.memberId,
               "emailAddress":$scope.user.email?$scope.user.email:''
           })
       }, function (res) {
           if(res.status=="S"){
               var myPopup = $ionicPopup.show({
                   title: languageSetting.tip,
                   cssClass: 'jyAlert jyAlert1',
                   template: languageSetting.changeEmailSuccess
               });
               $timeout(function(){
                   myPopup.close();
                   $rootScope.userInfo.emailAddress=$scope.user.email;
                   localStorage.userInfo=JSON.stringify($rootScope.userInfo);
                   $state.go("personalInformation");
               },1000);
           }else{
               var myPopup = $ionicPopup.show({
                   title: languageSetting.tip,
                   cssClass: 'jyAlert jyAlert1',
                   template: res.msg
               });
               $timeout(function() {
                   myPopup.close();
               });
           }
       });
   };
});


/**
 * Created by pgr on 2016/10/8.
 */
'use strict';
app.controller('changeSignatureCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state) {
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.user={selfIntroduction:$rootScope.userInfo.selfIntroduction};
    $scope.saveSignature=function(){
       httpService.getData(JYApi.updateMember, 'post', {
           params:JSON.stringify({
               "memberId":$rootScope.userInfo.memberId,
               "selfIntroduction":$scope.user.selfIntroduction
           })
       }, function (res) {
           if(res.status=="S"){
               var myPopup = $ionicPopup.show({
                   title: languageSetting.tip,
                   cssClass: 'jyAlert jyAlert1',
                   template: languageSetting.changeSignSuccess
               });
               $timeout(function(){
                   myPopup.close();
                   $rootScope.userInfo.selfIntroduction=$scope.user.selfIntroduction;
                   localStorage.userInfo=JSON.stringify($rootScope.userInfo);
                   $state.go("personalInformation");
               },1000);
           }
       });
    };
});
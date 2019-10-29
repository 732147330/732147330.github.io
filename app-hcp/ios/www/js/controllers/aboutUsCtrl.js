/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('aboutUsCtrl', function($scope,httpService,JYApi,$ionicPopup,$ionicPlatform,$cordovaToast,$cordovaInAppBrowser,$cordovaAppVersion) {
    //App version
    $scope.getAppVersion=function(){
        $ionicPlatform.ready(function(){
            $cordovaAppVersion.getVersionNumber().then(function (version) {
                $scope.appVersion = version;
            },function(err){

            });
        });
    };
    $scope.getAppNewVersion=function(){
        httpService.getData(JYApi.findVersion, 'post', {
            params:JSON.stringify({
                type:'queryAll',
                productName:'IOSAPP'
            })
        }, function (res) {
            $scope.appNewVersion=res.data[0].versionNumber;
        });
    };
    $scope.getAppVersion();
    $scope.getAppNewVersion();

    $scope.isUpdate=function(){
        httpService.getData(JYApi.findVersion, 'post', {
            params:JSON.stringify({
                type:'queryAll',
                productName:'IOSAPP'
            })
        }, function (res) {
            $scope.appStoreUrl=res.data[0].downloadUrl;
           if(res.data[0].versionNumber>$scope.appVersion){
               var myPopup = $ionicPopup.show({
                   cssClass: 'jyAlert jyAlert1',
                   title: languageSetting.appVersionUpdate,
                   subTitle: res.data[0].versionRemark,
                   buttons: [
                       {
                           text: languageSetting.updateNow,
                           type: 'button-calm',
                           onTap: function (e) {
                               var options = {
                                   location: 'yes',
                                   clearcache: 'yes',
                                   toolbar: 'no'
                               };
                               document.addEventListener("deviceready", function () {
                                   $cordovaInAppBrowser.open($scope.appStoreUrl, '_blank', options)
                                       .then(function(event) {

                                       })
                                       .catch(function(event) {

                                       });
                               }, false);
                           }
                       }
                   ]
               });
           }else{
               $cordovaToast
                   .show(languageSetting.isNewVersion, 'long', 'center')
                   .then(function(success) {

                   }, function (error) {

                   });
           }
        });
    };

});
/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('aboutUsCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup) {
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
                            }
                        }
                    ]
                });
            }
        });
    };
});
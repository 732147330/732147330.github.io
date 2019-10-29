/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('findPasswordCtrl', function ($scope, $rootScope,$ionicPopup,$interval,$state,JYApi,httpService,$timeout) {
    $scope.yzmFlag=true;
    $scope.leftTime=60;
    $scope.findPasswordData = {
        tel:'',
        captcha:'',
        password:'',
        repassword:''
    };


    $scope.findPasswordSubmit=function(obj){
        if($scope.findPasswordData.password==$scope.findPasswordData.repassword){
            httpService.getData(JYApi.forgetPassword, 'post', {
                params:JSON.stringify({
                    "mobileNumber":$scope.findPasswordData.tel,
                    "numCode":$scope.findPasswordData.captcha,
                    "encryptedPassword":$scope.findPasswordData.password
                })
            }, function (res) {
                if(res.status=="S"){
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: languageSetting.changePasswordSuccess
                    });
                    $timeout(function(res){
                        myPopup.close();
                        $state.go("login");
                    },2000);
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
            },2);
        }else{
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.rePasswordError+'!'
            });
            $timeout(function(){
                myPopup.close();
            },2000);
        }
    };
    $scope.getYzm=function(){
        if($scope.findPasswordData.tel){
            $scope.yzmFlag=false;
            //checkPhoneNumber
            httpService.getData(JYApi.checkPhoneNumber, 'post', {
                params:JSON.stringify({
                    mobileNumber:$scope.findPasswordData.tel
                })
            }, function (res) {
                if(res.status=="S"){
                    httpService.getData(JYApi.sendMg, 'post', {
                        params:JSON.stringify({
                            "mobileNumber":$scope.findPasswordData.tel,
                            sendType:'forget'
                        })
                    }, function (res) {
                        if(res.status=="S"){
                            var djs=$interval(function(){
                                if($scope.leftTime>1){
                                    $scope.leftTime--;
                                }else{
                                    djs=null;
                                    $scope.yzmFlag=true;
                                }
                            },2000);
                        }else{
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '<i class="iconTip ion-close-circled"></i>'+res.msg
                            });
                            $timeout(function(){
                                myPopup.close();
                            },2000);
                        }
                    });
                }else{
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: languageSetting.telHasRigster+'!'
                    });
                    $timeout(function(){
                        myPopup.close();
                    },2000);
                }
            });
        }
    };
});
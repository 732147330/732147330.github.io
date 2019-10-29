/**
 * Created by OuYongQiang on 16/9/13.
 * 2017.1.17 修改注册流程,增加密码、性别、生日字段
 */
'use strict';
app.controller('registerCtrl', function($scope,$rootScope,$cordovaStatusbar,$ionicPlatform,$interval,$stateParams,$cordovaDatePicker,$cordovaToast,httpService,JYApi,$ionicPopup,$timeout,$state) {
    $scope.leftTime=60;
    $scope.yzmFlag=true;
    $scope.invitationCode=$stateParams.invitationCode;
    $scope.sourceId=$stateParams.sourceId;
    $scope.ruleHeaderId=$stateParams.ruleHeaderId;
    $scope.$on('$ionicView.afterEnter', function(event,data){
        if($rootScope.isMobile){
            $cordovaStatusbar.style(1);
        }
        $scope.hasChecked=sessionStorage.hasChecked?true:false;
    });
    $scope.registerData={
        tel:'',
        password:'',
        captcha:'',
        repeatpassword:'',
        inviteCode:'',
        birthDay:'',
        encryptedPassword:''
    };
    $scope.agreedProtocal= {
        status:true
    };
    $scope.getYzm=function(){
        httpService.getData(JYApi.checkNumber, 'post', {
            params:JSON.stringify({
                "mobileNumber":$scope.registerData.tel
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.yzmFlag=false;
                if($scope.registerData.tel){
                    httpService.getData(JYApi.sendMg, 'post', {
                        params:JSON.stringify({
                            "mobileNumber":$scope.registerData.tel,
                            sendType:"reg"
                        })
                    }, function (res) {
                        if(res.status=="S"){
                            $scope.djs=$interval(function(){
                                if($scope.leftTime>1){
                                    $scope.leftTime--;
                                }else{
                                    $interval.cancel($scope.djs);
                                    $scope.yzmFlag=true;
                                    $scope.leftTime=60;
                                }
                            },1000);
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
                    },1,'发送中');
                }
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.hasRegister
                });
                $timeout(function(){
                    myPopup.close();
                },2000);
            }
        },1,'加载中');
    };

    //效验注册
    $scope.register = function(obj){
        if(!obj.$invalid) {
            if(sessionStorage.hasChecked){
                $state.go('registerNext',{
                    params:JSON.stringify({
                        mobileNumber:$scope.registerData.tel,
                        numCode:$scope.registerData.captcha,
                        invitationCode: $scope.registerData.inviteCode
                    })
                });
            }else{
                //效验手机是否已经注册
                httpService.getData(JYApi.checkPhoneNumber,'post',{
                    params:JSON.stringify({
                        mobileNumber:$scope.registerData.tel
                    })
                },function(res){
                    if(res.status=='F'){
                        //效验验证码是否正确
                        httpService.getData(JYApi.checkPhoneNum,'post',{
                            params:JSON.stringify({
                                mobileNumber:$scope.registerData.tel,
                                numCode:$scope.registerData.captcha,
                                reg:"Y"
                            })
                        },function(res){
                            if(res.status=="S"){
                                sessionStorage.hasChecked=true;
                                $state.go('registerNext',{
                                    params:JSON.stringify({
                                        mobileNumber:$scope.registerData.tel,
                                        numCode:$scope.registerData.captcha,
                                        invitationCode: $scope.invitationCode,
                                        sourceId: $scope.sourceId,
                                        ruleHeaderId: $scope.ruleHeaderId
                                    })
                                });
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
                        },1,'加载中');
                    }else{
                        var myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: languageSetting.hasRegister
                        });
                        $timeout(function(){
                            myPopup.close();
                        },2000);
                    }
                },1,'加载中');
            }
        }
    };

    //修改生日
    $scope.showDatePicker=function(){
        var options = {
            date: new Date(),
            mode: 'date', // or 'time'
            allowOldDates: true,
            allowFutureDates: true,
            doneButtonLabel: languageSetting.confirm,
            doneButtonColor: '#998278',
            cancelButtonLabel: languageSetting.cancel,
            cancelButtonColor: '#000000'
        };
        $ionicPlatform.ready(function(){
            $cordovaDatePicker.show(options).then(function(date){
                $scope.registerData.birthDay=date;
            });
        });
    };

    $scope.checkPassword=function(){
        var encryptedPassword=$scope.registerData.encryptedPassword;
        var regNumber=/[0-9]/g;
        var regStr=/[a-zA-Z]/g;
        var regSpecial=/[!@#$%&*._~{}-]/g;
        var grade=0;
        if(regNumber.test(encryptedPassword)){grade++}
        if(regStr.test(encryptedPassword)){grade++}
        if(regSpecial.test(encryptedPassword)){grade++;}
        if($scope.registerData.encryptedPassword && $scope.registerData.encryptedPassword.length>=6){
            if(grade==1){
                $scope.gradeText='弱';
                $scope.gradeProcess='gradeProcess_low'
            }else if(grade==2){
                $scope.gradeText='中';
                $scope.gradeProcess='gradeProcess_mid'
            }else if(grade==3){
                $scope.gradeText='强';
                $scope.gradeProcess='gradeProcess_high'
            }else{
                $scope.registerData.encryptedPassword='';
            }
        }else{
            $scope.gradeText='';
            $scope.gradeProcess='';
        }
    };
});

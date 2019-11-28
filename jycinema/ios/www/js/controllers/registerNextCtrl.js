/**
 * Created by OuYongQiang on 16/9/13.
 */
'use strict';
app.controller('registerNextCtrl', function($scope,$rootScope,$cordovaStatusbar,$ionicPlatform,$interval,$stateParams,$cordovaDatePicker,$cordovaToast,httpService,JYApi,$ionicPopup,$timeout,$state) {
    $scope.leftTime=60;
    $scope.yzmFlag=true;
    $scope.params=JSON.parse($stateParams.params);
    $scope.registerData={
        encryptedPassword:'',
        birthDay:'',
        captcha:$scope.params.numCode,
        mobileNumber:$scope.params.mobileNumber,
        inviteCode:$scope.params.invitationCode,
        ruleHeaderId:$scope.params.ruleHeaderId,
        sourceId:$scope.params.sourceId
    };
    $scope.sex={type:'MALE'};//默认性别是男
    //获取会员基础信息
    $scope.findMember=function(memberId){
        httpService.getData(JYApi.findMember, 'post', {
            params:JSON.stringify({
                "memberId":memberId
            })
        }, function (res) {
            if(res.status=="S"){
              var userInfo = res.data;
              userInfo.token = JSON.parse(localStorage.userInfo).token;
              localStorage.userInfo = JSON.stringify(userInfo);
              localStorage.cacheTime=new Date().getTime();//缓存时间
              $rootScope.userInfo=userInfo;
                $state.go("account");

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
                if(date){
                    $scope.registerData.birthDay=date;
                }
            });
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

    //提交注册
    $scope.submitRegister=function(){
        httpService.getData(JYApi.createMember, 'post', {
            params: JSON.stringify({
                "mobileNumber": $scope.registerData.mobileNumber,
                "encryptedPassword": $scope.getEncryption($scope.registerData.encryptedPassword),
                "numCode": $scope.registerData.captcha,
                "sex":$scope.sex.type,
                invitationCode: $scope.registerData.inviteCode,
                "mmbType": "PERSON",
                "type": "APP",
                "birthDay":$scope.registerData.birthDay,
                sourceId:$scope.registerData.sourceId,
                ruleHeaderId:$scope.registerData.ruleHeaderId
            })
        }, function (res) {
            if (res.status == "S") {
                sessionStorage.removeItem('hasChecked');
                sessionStorage.removeItem('sourceId');
                $scope.memberId=res.memberId;
                $scope.userInfoData=[
                    {
                        memberId:res.memberId,
                        token:res.token
                    }
                ];
                //res.data[0].memberId=res.memberId;
                //res.data[0].token=res.token;
                localStorage.userInfo=JSON.stringify($scope.userInfoData[0]);
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.registerSuccess+'!'
                });
                $timeout(function(){
                    myPopup.close();
                    $scope.findMember($scope.memberId);
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
        },1,'加载中');
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

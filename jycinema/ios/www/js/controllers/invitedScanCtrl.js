/**
 * Created by pgr on 18/3/12.
 */
'use strict';
app.controller('invitedScanCtrl', function($scope,$rootScope,httpService,JYApi,$ionicActionSheet,$timeout,$ionicPopup,$state,$interval,$stateParams) {
    $scope.yzmFlag=true;
    $scope.leftTime=60;
    $scope.loginData={};
    $scope.employeeNumber=$stateParams.employeeNumber?$stateParams.employeeNumber:'';
    //点击获取验证码
    $scope.yzmLogic = function(mobileNumber){
        $scope.yzmFlag=false;
        httpService.getData(JYApi.sendMg, 'post', {
            params:JSON.stringify({
                "mobileNumber":mobileNumber,
                sendType:'login'
            })
        }, function (res) {
            if(res.status=='S'){
                var djs=$interval(function(){
                    if($scope.leftTime>1){
                        $scope.leftTime--;
                    }else{
                        $interval.cancel(djs);
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
                var djs=$interval(function(){
                    if($scope.leftTime>1){
                        $scope.leftTime--;
                    }else{
                        $interval.cancel(djs);
                        $scope.yzmFlag=true;
                        $scope.leftTime=60;
                    }
                },1000);
            }
        });
    };
    //开卡类型
    $scope.find=function(){
        httpService.getData(JYApi.findCardTypeInfo, 'post', {
            params:JSON.stringify({})
        }, function (res) {
            $scope.identityData=res.data;
            angular.forEach($scope.identityData,function(value,key){
                value.text=value.cardLevelName+'('+value.denomination+'元'+')';
            })
        });
    };
    $scope.find();
    $scope.show = function() {
        $ionicActionSheet.show({
            buttons:$scope.identityData,
            cancelText: languageSetting.cancel,
            buttonClicked: function(index) {
                $scope.loginData.tip=$scope.identityData[index].text;
                $scope.loginData.cardLevelCode=$scope.identityData[index].cardLevelCode;
                return true;
            }
        });
    };
    //生成登录交易信息--忠诚度计划
    $scope.getLoginCount=function () {
        $.ajax({
            type:'POST',
            url:JYApi.saveLytTxn,
            data:{
                params:JSON.stringify({
                    planId:3,
                    txnType:'LOGIN',
                    subType:'WAP',
                    status:'PENDING',
                    MemberCardNumber:JSON.parse(localStorage.userInfo).chipNumber?JSON.parse(localStorage.userInfo).chipNumber:'',
                    memberId:JSON.parse(localStorage.userInfo).memberId
                })
            },
            success:function () {
            }
        });
    };
    //获取会员基础信息
    $scope.findMember=function(memberId){
        httpService.getData(JYApi.findMember, 'post', {
            params:JSON.stringify({
                "memberId":memberId
            })
        }, function (res) {
            if(res.status=="S"){
                var userInfo=res.data;
                userInfo.token= JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo=JSON.stringify(userInfo);
                localStorage.cacheTime=new Date().getTime();
                $scope.getLoginCount();
                $rootScope.userInfo=userInfo;
            }else{
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };
    $scope.buy=function(){
        if (!(/^1[3456789]\d{9}$/.test($scope.loginData.tel2))) {
            $rootScope.showTip('手机号码格式不正确');
        }else if(!$scope.loginData.captcha){
            $rootScope.showTip('请输入验证码');
        }else if(!$scope.loginData.tip){
            $rootScope.showTip('请选择开卡类型');
        }else{
            httpService.getData(JYApi.scanCodeCreateCardOrders, 'post', {
                mobileNumber:$scope.loginData.tel2,
                numCode:$scope.loginData.captcha,
                cardType:$scope.loginData.cardLevelCode,
                inviteCode:$scope.employeeNumber,
                channelId:"7",
                channelCode:'J0005'
            }, function (res) {
                if(res.status=='S'){
                    if(res.data.memberId){
                        res.data.token=res.token;
                        localStorage.userInfo=JSON.stringify(res.data);
                        $scope.findMember(res.data.memberId);
                        $state.go('paySales',{ordNum:res.orderCode})
                    }
                }else{
                    $rootScope.showTip(res.msg);
                }
            });
        }

    }

});


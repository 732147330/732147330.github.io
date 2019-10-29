/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('worldCup-quizCtrl', function ($scope, $rootScope, httpService, JYApi, $ionicPlatform, $ionicViewSwitcher, $state, $timeout, $ionicLoading, $ionicPopup, $interval) {


    //查询竞猜场次
    $scope.findMatchInfos=function(){
            httpService.getData(JYApi.findMatchInfos, 'post', {
                params: JSON.stringify({})
            }, function (res) {
                    if(res.status=='S'){
                        $scope.currentGuessingTimes=res.currentGuessingTimes;
                        $scope.flag=res.flag;
                        $scope.MatchInfosData=_.sortBy(res.data, function(item){ return item.num; });
                    }else{
                        var myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: res.msg
                        });
                        $timeout(function () {
                            myPopup.close();
                        }, 2000);
                    }
            }
    )};
    $scope.$on("$ionicView.enter", function (event, data) {
        $scope.findMatchInfos();
    });


    $scope.choose=function(row,choose){
        if(localStorage.userInfo){

        }else{
            $scope.needBind=true;
            return
        }
        if($scope.flag=='Y'){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: ' 小逸需要你的个人信息，才能精准得把大奖送到哟，请前往个人资料处添加吧！',
                buttons: [{
                    text: '确定',
                    type: 'button-positive',
                    onTap: function() {
                        myPopup.close();
                        $state.go('personalInformation')
                    }}]
            });
            return
        }
        if($scope.currentGuessingTimes==0){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: ' 今天竞猜机会您暂已使用完，每天可通过登录签到、分享、充值消费等途径获取竞猜机会，单日最高5次！',
                buttons: [{
                    text: '确定',
                    type: 'button-positive',
                    onTap: function() {
                        myPopup.close();
                    }}]
            });
            return
        }
        if(row.isAllowJoin=='N'){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '您已参与过此场次的竞猜！'
            });
            $timeout(function () {
                myPopup.close();
            }, 2000);
            return
        }
        if(row.active && row.active==choose){
            row.active=''
        }else{
            row.active=choose;
        }
    };
    $scope.sure=function(){
        $scope.showFlagtt=2;
        angular.forEach($scope.MatchInfosData,function(v,k){
            angular.forEach(v.value,function(v1,k1){
                if(v1.active){
                    $scope.showFlagtt=1;
                }
            })
        });
        if($scope.showFlagtt==1){
            $scope.showFlag=true;
        }else{
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '请您选择竞猜信息'
            });
            $timeout(function () {
                myPopup.close();
            }, 2000);
        }

    };
    $scope.chooseAgain=function(){
        $scope.showFlag=false;
    };
    $scope.submissionOptions=function(){
        $scope.guessingData=[];
        angular.forEach($scope.MatchInfosData,function(v,k){
            angular.forEach(v.value,function(v1,k1){
                if(v1.active){
                    var obj ={
                        matchInfoId:v1.matchInfoId,
                        playerTeamId:v1.active==1?v1.playerTeamIdMain:v1.playerTeamIdSecond,
                        guessingResult:v1.active=='IN_DRAW'?'IN_DRAW':'WIN'
                    };
                    $scope.guessingData.push(obj)
                }
            })
        });
        httpService.getData(JYApi.submissionOptions, 'post', {
            params: JSON.stringify({
                guessingData:$scope.guessingData
            })
        }, function (res) {
            if(res.status=='S'){

                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: res.msg
                });
                $timeout(function () {
                    myPopup.close();
                    $scope.showFlag=false;
                    $state.go('worldCup-detail')
                }, 2000);

            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: res.msg
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }
        })
    }


    $scope.myWorld=function(){
        if(localStorage.userInfo){
            $state.go('worldCup-detail')
        }else{
            $scope.needBind=true;
        }
    }
    $scope.hide=function () {
        $scope.needBind=false;
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
                $scope.findMatchInfos();
                //$state.go("activity");
                //$ionicViewSwitcher.nextDirection("none")
            }else{
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };

    $scope.bindPhone={};
    $scope.sendYzmFlag='获取验证码';
    $scope.sendYzm=function () {
        if(!$scope.bindPhone.mobileNumber){
            $rootScope.showTip('请输入手机号码');
        }else{
            if (!(/^1[34578]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
                $rootScope.showTip('手机号码格式不正确');
            }else{
                if($scope.sendYzmFlag=='获取验证码'){
                    httpService.getData(JYApi.sendMg, 'post', {
                        params: JSON.stringify({
                            "mobileNumber": $scope.bindPhone.mobileNumber,
                            sendType: 'login'
                        })
                    }, function (res) {
                        if (res.status == 'S') {
                            $scope.sendYzmFlag=60;
                            var djs = $interval(function () {
                                if ($scope.sendYzmFlag > 1) {
                                    $scope.sendYzmFlag--;
                                } else {
                                    $interval.cancel(djs);
                                    $scope.sendYzmFlag = '获取验证码';
                                }
                            }, 1000);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '<i class="iconTip ion-close-circled"></i>' + res.msg
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        }
                    },2);
                }
            }
        }
    };
    $scope.getCode=function(){
        $scope.yzmCode=locals.baseUrl()+'/frontUIWebapp/appserver/validateCodeService/createImage?id='+Math.random();
    };
    $scope.getCode();
    $scope.login=function(){
        httpService.getData(JYApi.lockSeatLogin, 'post', {
            params: JSON.stringify({
                "mobileNumber":$scope.bindPhone.mobileNumber,
                "numCode":$scope.bindPhone.vertifyCode,
                imgCode:$scope.bindPhone.captcha1,
            })
        }, function (res) {
            if(res.status=='200'){
                $scope.needBind=false;
                if(res.data.memberId){
                    res.data.token=res.token;
                    localStorage.userInfo=JSON.stringify(res.data);
                    $scope.findMember(res.data.memberId);
                }
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: res.msg
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }
        })
    };
    $scope.goLogin=function(){
        $scope.needBind=false;
        $state.go('login', {viewName: 'worldCup'});
        $ionicViewSwitcher.nextDirection("none")
    };
});

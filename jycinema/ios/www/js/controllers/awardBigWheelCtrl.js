/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('awardBigWheelCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state,$stateParams,$cordovaToast) {
    $scope.lotteryDrawHeaderId=$stateParams.lotteryDrawHeaderId;
    $scope.findLotteryPageConfig=function () {
        httpService.getData(JYApi.findLotteryPageConfig, 'post', {
            params:JSON.stringify({
                lotteryCategoryCode:'turntable',
                lotteryDrawHeaderId:$scope.lotteryDrawHeaderId
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.remainingFrequency=res.remainingFrequency;
                $scope.ruleText= $scope.autoRow(res.data.ruleText);
                $scope.winText= $scope.autoRow(res.data.winText);
                $scope.resData=res.data;
                $scope.prizeInfos=res.data.prizeInfos;
                $scope.prizeInfos=$scope.prizeInfos.splice(0,6);
                $('.wheelObj .scoll').css('background',$scope.resData.bgColor);
                $scope.wheelObj={
                  "background":$scope.resData.bgColor
                };
                $scope.wheelBgObj={
                    "background":"url("+$scope.resData.bgImg+")",
                    "width":"100%",
                    "height":"1000px",
                    "background-size":"100%",
                    "background-repeat":"no-repeat"
                };
                $scope.wheelCenterObj={
                    "background":"url("+$scope.resData.outerPic+")",
                    "background-size":"cover",
                };
            }
        },2);
    };

    $scope.$on('$ionicView.enter',function(){
        $scope.findLotteryPageConfig();
    });
    $scope.$on('$ionicView.leave',function () {
        if($scope.myPopup){
            $scope.myPopup.close();
        }
    });


    //自动换行
    $scope.autoRow=function (str) {
        str=str.split("\n");
        for(var i=0;i<str.length;i++){
            str[i]=str[i]+'<br>';
        }
        str=str.join('');
        return str;
    };

    $scope.showTip=function (prizeId,prizeType,isJump,tit,template) {
        if(prizeId>0){
            if(isJump=="NONE_JUMP"){
                $scope.buttonsData=[
                    {
                        text: "继续抽奖",
                        type: 'button-default',
                        onTap: function (e) {
                            $scope.myPopup.close();
                            $scope.show=true;
                        }
                    },
                    {
                        text: "去查看",
                        type: 'button-calm',
                        onTap: function (e) {
                            $scope.myPopup.close();
                            $scope.show=true;
                            if(prizeType=='SPECIAL_PRIZES'){
                                $state.go('messageCenter')
                            }else{
                                $state.go('yhj')
                            }

                        }
                    }
                ]
            }else if(isJump=='JUMP_TO_CONFIRM'){
                $scope.buttonsData=[
                    {
                        text: "继续抽奖",
                        type: 'button-default',
                        onTap: function (e) {
                            $scope.myPopup.close();
                            $scope.show=true;
                        }
                    },
                    {
                        text: "确认收货地址",
                        type: 'button-calm',
                        onTap: function (e) {
                            $scope.myPopup.close();
                            $scope.show=true;
                            $state.go('address',{person:'person'})
                        }
                    }
                ]
            }else if(isJump=='JUMP_TO_ADD'){
                $scope.buttonsData=[
                    {
                        text: "继续抽奖",
                        type: 'button-default',
                        onTap: function (e) {
                            $scope.myPopup.close();
                            $scope.show=true;
                        }
                    },
                    {
                        text: "填写收货地址",
                        type: 'button-calm',
                        onTap: function (e) {
                            $scope.myPopup.close();
                            $scope.show=true;
                            $state.go('addressStep3',{addressStatus:'add',product:'product'})
                        }
                    }
                ]
            }
        }else{
            $scope.buttonsData=[
                {
                    text: "继续抽奖",
                    type: 'button-calm',
                    onTap: function (e) {
                        $scope.myPopup.close();
                        $scope.show=true;
                    }
                }
            ]
        }
        $scope.myPopup = $ionicPopup.show({
            title: tit,
            cssClass: 'jyAlert jyAlert1',
            template: template,
            buttons:$scope.buttonsData
        });
    };

    $scope.disabledBtn=false;
    $scope.wheelInnerRotateObj={
        transition:"all ease-in-out 1000ms"
    };

    //开始抽奖
    $scope.time=0;
    $scope.show=true;
    $scope.startDrawLottery=function() {
        $scope.show=false;
      if($scope.resData.lotteryActivityStatus=='ACTIVE'){
        $scope.time++;
        var promise=new Promise(function (resolve,reject) {
          if(!localStorage.userInfo){
            $scope.myPopup = $ionicPopup.show({
              title: languageSetting.tip,
              cssClass: 'jyAlert',
              template: '亲，您还没登陆不能使用抽奖功能!',
              buttons: [
                {
                  text: '取消',
                  type: 'button-default',
                  onTap: function () {
                    $scope.myPopup.close();
                      $scope.show=true;
                  }
                },
                {
                  text: '立即登陆',
                  type: 'button-calm',
                  onTap: function (e) {
                    $scope.myPopup.close();
                      $scope.show=true;
                    $state.go('login',{viewName:'awardBigWheel', urlParams: JSON.stringify($stateParams)});
                  }
                }
              ]
            });
          }else{
            if($scope.remainingFrequency>0){
              httpService.getData(JYApi.startDrawLottery, 'post', {
                params:JSON.stringify({
                  "lotteryDrawHeaderId": $scope.resData.lotteryDrawHeaderId,
                  "lotteryDrawLineId": $scope.resData.lotteryDrawLineId,
                  "ruleHeaderId": $scope.resData.ruleHeaderId
                })
              }, function (res) {
                if(res.status=="S"){
                  resolve(res.data);
                }else{
                  reject(res.msg);
                }
              });
            }else{
              $scope.myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: '亲，您未获得有抽奖机会!',
                buttons: [
                  {
                    text: '确定',
                    type: 'button-calm',
                    onTap: function (e) {
                      $scope.myPopup.close();
                        $scope.show=true;
                    }
                  }
                ]
              });
            }
          }

        });
        promise.then(function (value) {
          if(!$scope.disabledBtn){
            $scope.disabledBtn=true;
            $scope.default=$scope.time*1800;//默认旋转角度 1800X5圈
            for(var i=0;i<$scope.prizeInfos.length;i++){
              if(value.prizeId==$scope.prizeInfos[i].prizeId){
                $scope.prizeIndex=i;
                break;
              }
            }
            var resultDeg =330-($scope.prizeIndex)*60+ Math.round(Math.random()*60);
            console.log(resultDeg);
            $scope.deg=$scope.default+resultDeg;
            $('.wheelInnerObj').css({'transform':"rotate("+$scope.deg +"deg)"});
            $scope.remainingFrequency--;
              if(value.prizeId>0){
                  $scope.tipHead='恭喜你，中奖了！';
              }else{
                  $scope.tipHead='很遗憾，没有中奖！'
              }
              $timeout(function(){
                  //$scope.showTip('<div class="prizeImg"><img src='+$scope.prizeInfos[$scope.prizeIndex].accessPath+'></div>'+$scope.prizeInfos[$scope.prizeIndex].prizeName);
                  $scope.showTip(value.prizeId,value.prizeType,value.isJump,'<div class="prizeTip">'+$scope.tipHead+'</div><div class="prizeImg"><img src='+$scope.prizeInfos[$scope.prizeIndex].accessPath+'></div>');
                  $scope.disabledBtn=false;
              },1200);
          }

        },function (error) {
          console.log(error);
          $scope.myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert',
            template: error,
            buttons: [
              {
                text: '确定',
                type: 'button-calm',
                onTap: function (e) {
                  $scope.myPopup.close();
                    $scope.show=true;
                }
              }
            ]
          });
        });
      }else{
        $cordovaToast
          .show('🉐️已暂停或已结束', 'long', 'center')
          .then(function(success) {
                $scope.show=true;
          }, function (error) {

          });
      }

    };







});

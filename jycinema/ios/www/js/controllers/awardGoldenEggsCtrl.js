/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('awardGoldenEggsCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$state,$timeout,$stateParams,$cordovaToast) {
  $scope.lotteryDrawHeaderId=$stateParams.lotteryDrawHeaderId;
    //自动换行
    $scope.autoRow=function (str) {
        str=str.split("\n");
        for(var i=0;i<str.length;i++){
            str[i]=str[i]+'<br>';
        }
        str=str.join('');
        return str;
    };
    $scope.findLotteryPageConfig=function () {
        httpService.getData(JYApi.findLotteryPageConfig, 'post', {
            params:JSON.stringify({
                lotteryCategoryCode:'goldenEgg',
                lotteryDrawHeaderId:$scope.lotteryDrawHeaderId
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.resData=res.data;
                $scope.eggrr=[
                    {
                        eggPic:$scope.resData.eggPic,
                        brokenEggPic:$scope.resData.brokenEggPic,
                        hammerFlag:false,
                        egg:{
                            width:"100px",
                            height:"100px",
                            transition:"all ease-in 0ms",
                            background:"url("+$scope.resData.eggPic+") no-repeat",
                            "background-size":"100%"
                        }
                    },
                    {
                        hammerFlag:false,
                        egg:{
                            width:"100px",
                            height:"100px",
                            transition:"all ease-in 0ms",
                            background:"url("+$scope.resData.eggPic+") no-repeat",
                            "background-size":"100%"
                        }
                    },
                    {
                        hammerFlag:false,
                        egg:{
                            width:"100px",
                            height:"100px",
                            transition:"all ease-in 0ms",
                            background:"url("+$scope.resData.eggPic+") no-repeat",
                            "background-size":"100%"
                        }
                    },
                    {
                        hammerFlag:false,
                        egg:{
                            width:"100px",
                            height:"100px",
                            transition:"all ease-in 0ms",
                            background:"url("+$scope.resData.eggPic+") no-repeat",
                            "background-size":"100%"
                        }
                    },
                    {
                        hammerFlag:false,
                        egg:{
                            width:"100px",
                            height:"100px",
                            transition:"all ease-in 0ms",
                            background:"url("+$scope.resData.eggPic+") no-repeat",
                            "background-size":"100%"
                        }
                    },
                    {
                        hammerFlag:false,
                        egg:{
                            width:"100px",
                            height:"100px",
                            transition:"all ease-in 0ms",
                            background:"url("+$scope.resData.eggPic+") no-repeat",
                            "background-size":"100%"
                        }
                    }
                ];
                $scope.prizeInfos=res.data.prizeInfos;
                $scope.outerPic=$scope.resData.outerPic;
                $scope.guaguaObj={
                    "background":$scope.resData.bgColor
                };
                $scope.guaguaBgObj={
                    "background":`url(${$scope.resData.bgImg})`,
                    "background-size":"100%",
                    "background-repeat":"no-repeat"
                };
                $scope.remainingFrequency=res.remainingFrequency;
                $scope.ruleText= $scope.autoRow(res.data.ruleText);
                $scope.winText= $scope.autoRow(res.data.winText);
            }
        },2);
    };

    $scope.$on('$ionicView.enter',function(){
        $scope.findLotteryPageConfig();
    });

    $scope.startDrawLottery=function(index) {
      if($scope.resData.lotteryActivityStatus=='ACTIVE') {
        var promise = new Promise(function (resolve, reject) {
          if (!localStorage.userInfo) {
            var myPopup = $ionicPopup.show({
              title: languageSetting.tip,
              cssClass: 'jyAlert',
              template: '亲，您还没登陆不能使用砸金蛋功能!',
              buttons: [
                {
                  text: '取消',
                  type: 'button-default',
                  onTap: function () {
                    myPopup.close();
                  }
                },
                {
                  text: '立即登陆',
                  type: 'button-calm',
                  onTap: function (e) {
                    myPopup.close();
                    $state.go('login', {viewName: 'awardGoldenEggs', urlParams: JSON.stringify($stateParams)});
                  }
                }
              ]
            });
          } else {
            if ($scope.remainingFrequency > 0) {
              $scope.hammerClick(index);
              httpService.getData(JYApi.startDrawLottery, 'post', {
                params: JSON.stringify({
                  "lotteryDrawHeaderId": $scope.resData.lotteryDrawHeaderId,
                  "lotteryDrawLineId": $scope.resData.lotteryDrawLineId,
                  "ruleHeaderId": $scope.resData.ruleHeaderId
                })
              }, function (res) {
                if (res.status == "S") {
                  resolve(res.data);
                } else {
                  reject(res.msg);
                }
              });
            } else {
              var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: '亲，您未获得有砸金蛋机会!',
                buttons: [
                  {
                    text: '确定',
                    type: 'button-calm',
                    onTap: function (e) {
                      myPopup.close();
                    }
                  }
                ]
              });
            }
          }
        });
        promise.then(function (value) {
          $scope.prizePic = value.accessPath;
          $scope.prizeText = value.prizeName;
          $scope.remainingFrequency--;
            $scope.isJump=value.isJump;
            $scope.prizeType=value.prizeType;
            $scope.prizeId=value.prizeId;
          $timeout(function () {
            $scope.flag = true;
          }, 0);
        }, function (error) {
          var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert',
            template: error,
            buttons: [
              {
                text: '确定',
                type: 'button-calm',
                onTap: function (e) {
                  myPopup.close();
                }
              }
            ]
          });
        });
      }else{
        $cordovaToast
          .show('🉐️已暂停或已结束', 'long', 'center')
          .then(function(success) {

          }, function (error) {

          });
      }
    };

    //砸金蛋
    $scope.hammerClick=function (index) {
        $scope.eggrr[index].hammerFlag=true;
        $scope.eggrr[index].egg.background="url("+$scope.resData.brokenEggPic+") no-repeat";
    };

    $scope.restart=function () {
        $timeout(function () {
            $('.showPrize').hide();
            $scope.flag=false;
        },0);
        $scope.findLotteryPageConfig();
    };
    $scope.look=function () {
        $timeout(function () {
            $('.showPrize').hide();
            $scope.flag=false;
        },0);
        $scope.findLotteryPageConfig();
        if($scope.prizeType=='SPECIAL_PRIZES'){
            $state.go('messageCenter')
        }else{
            $state.go('yhj')
        }
    };
    $scope.goAddress=function () {
        $timeout(function () {
            $('.showPrize').hide();
            $scope.flag=false;
        },0);
        $scope.findLotteryPageConfig();
        if($scope.isJump=='JUMP_TO_CONFIRM'){
            $state.go('address',{person:'person'})
        }else if($scope.isJump=='JUMP_TO_ADD'){
            $state.go('addressStep3',{addressStatus:'add',product:'product'})
        }
    }



});

/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('awardGuaguaCtrl', function ($scope, $rootScope, httpService, JYApi, $ionicPopup, $state, $timeout, $stateParams, $cordovaToast) {
  $scope.lotteryDrawHeaderId = $stateParams.lotteryDrawHeaderId;
  $scope.flag = false;
  //自动换行
  $scope.autoRow = function (str) {
    str = str.split("\n");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i] + '<br>';
    }
    str = str.join('');
    return str;
  };

  $scope.findLotteryPageConfig = function () {
    httpService.getData(JYApi.findLotteryPageConfig, 'post', {
      params: JSON.stringify({
        lotteryCategoryCode: 'scratchCard',
        lotteryDrawHeaderId: $scope.lotteryDrawHeaderId
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.resData = res.data;
        $scope.prizeInfos = res.data.prizeInfos;
        $scope.outerPic = $scope.resData.outerPic;
        $scope.beforeLotteryPic = $scope.resData.beforeLotteryPic;
        $scope.afterLotteryPic = $scope.resData.afterLotteryPic;
        $scope.guaguaObj = {
          "background": $scope.resData.bgColor
        };
        $scope.guaguaBgObj = {
          "background": `url(${$scope.resData.bgImg})`,
          "background-size": "100%",
          "background-repeat": "no-repeat"
        };
        $scope.remainingFrequency = res.remainingFrequency;
        $scope.ruleText = $scope.autoRow(res.data.ruleText);
        $scope.winText = $scope.autoRow(res.data.winText);

      }
    }, 2);
  };

  $scope.$on('$ionicView.enter', function () {
    $scope.findLotteryPageConfig();
  });

  //剩余次数文字大小自适应
  $scope.winWidth = $(window).width();
  window.onresize = function (e) {
    var hdWidth = $(window).width();
    var textWidth = parseInt($('body').eq(0).css('font-size')) + 3;
    $('.hd-text').eq(0).css('font-size', parseInt(textWidth * hdWidth / $scope.winWidth) + 'px');
  }

  $scope.startDrawLottery = function () {
    if ($scope.resData.lotteryActivityStatus == 'ACTIVE') {
      var promise = new Promise(function (resolve, reject) {
        if (!localStorage.userInfo) {
          var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert',
            template: '亲，您还没登陆不能使用刮奖功能!',
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
                  $state.go('login', {viewName: 'awardGuagua', urlParams: JSON.stringify($stateParams)});
                }
              }
            ]
          });
        } else {
          if ($scope.remainingFrequency > 0) {
            $scope.flag = true;
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
              template: '亲，您未获得有刮奖机会!',
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
        $scope.isJump = value.isJump;
        $scope.prizeType = value.prizeType;
        $scope.prizeId = value.prizeId;
        $scope.$apply();
        $timeout(function () {
          $('#redux').eraser({
            progressFunction: function (p) {
              //var per=Math.round(p * 100);
            }
          });
        }, 0);
        $scope.restart = function () {
          $('#redux').hide();
          $scope.flag = false;
        };
        $scope.look = function () {
          $('#redux').hide();
          $scope.flag = false;
          if ($scope.prizeType == 'SPECIAL_PRIZES') {
            $state.go('messageCenter')
          } else {
            $state.go('yhj')
          }
        };
        $scope.goAddress = function () {
          $('#redux').hide();
          $scope.flag = false;
          if ($scope.isJump == 'JUMP_TO_CONFIRM') {
            $state.go('address', {person: 'person'})
          } else if ($scope.isJump == 'JUMP_TO_ADD') {
            $state.go('addressStep3', {addressStatus: 'add', product: 'product'})
          }
        };

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
    } else {
      $cordovaToast
        .show('🉐️已暂停或已结束', 'long', 'center')
        .then(function (success) {

        }, function (error) {

        });
    }

  }

});

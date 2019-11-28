/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('awardTigerCtrl', function ($scope, $rootScope, httpService, JYApi, $ionicPopup, $state, $timeout, $stateParams, $ionicViewSwitcher, $interval) {
  $scope.lotteryDrawHeaderId = $stateParams.lotteryDrawHeaderId;
  $scope.channelCode = $stateParams.channelCode;
  if ($scope.channelCode == '420a29') {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?68320bc7b9c82b57df4ff3c452bf56da";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  } else if ($scope.channelCode == 'dec00e') {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?6d5800c13e8d35abce9e65bd7b849de9";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }
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
        lotteryCategoryCode: 'bandit',
        lotteryDrawHeaderId: $scope.lotteryDrawHeaderId
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.resData = res.data;
        $scope.scrollArr = $scope.resData.prizeInfos
        $scope.prizeInfos = res.data.prizeInfos;
        $scope.outerPic = $scope.resData.outerPic;
        $scope.guaguaObj = {
          "background-color": $scope.resData.bgColor
        };
        $scope.guaguaBgObj = {
          "background": `url(${$scope.resData.bgImg})`,
          "background-size": "100%",
          "background-repeat": "no-repeat"
        };
        $scope.tigerBg = {
          "background": `url(${$scope.resData.bgPic})`,
          "background-size": "100%",
          "background-repeat": "no-repeat"
        };
        $scope.btnStyle = {
          "background": `url(${$scope.resData.btnPic})`,
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

  $scope.disabledBtn = false;
  $scope.startDrawLottery = function (index) {
    if ($scope.disabledBtn) return
    $scope.disabledBtn = true
    if ($scope.resData.lotteryActivityStatus == 'ACTIVE') {
      var promise = new Promise(function (resolve, reject) {
        if (!localStorage.userInfo) {
          var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert',
            template: '亲，您还没登陆不能使用老虎机功能!',
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

            httpService.getData(JYApi.startDrawLottery, 'post', {
              params: JSON.stringify({
                "lotteryDrawHeaderId": $scope.resData.lotteryDrawHeaderId,
                "lotteryDrawLineId": $scope.resData.lotteryDrawLineId,
                "ruleHeaderId": $scope.resData.ruleHeaderId
              })
            }, function (res) {
              if (res.status == "S") {
                resolve(res.data);
                $scope.prizeId = res.data.prizeId
                $scope.accessPath = res.data.accessPath
                $scope.scrollFunc(res.data);
              } else {
                reject(res.msg);
              }
            });
          } else {
            var myPopup = $ionicPopup.show({
              title: languageSetting.tip,
              cssClass: 'jyAlert',
              template: '亲，您未获得有老虎机机会!',
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
        $scope.disabledBtn = false;

      }, function (error) {
        //console.log(error);
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
                $scope.show = true;
                $scope.disabledBtn = false;
              }
            }
          ]
        });
      });
    } else {
      $scope.myPopup = $ionicPopup.show({
        title: languageSetting.tip,
        cssClass: 'jyAlert',
        template: '️已暂停或已结束',
        buttons: [
          {
            text: '确定',
            type: 'button-calm',
            onTap: function (e) {
              $scope.myPopup.close();
              $scope.disabledBtn = false;
            }
          }
        ]
      });
    }
  };

  $scope.showTip = function (prizeId, prizeType, isJump, tit, template) {
    if (prizeId > 0) {
      if (isJump == "NONE_JUMP") {
        $scope.buttonsData = [
          {
            text: "继续抽奖",
            type: 'button-default',
            onTap: function (e) {
              $scope.myPopup.close();
              $scope.show = true;
              $scope.disabledBtn = false
            }
          },
          {
            text: "去查看",
            type: 'button-calm',
            onTap: function (e) {
              $scope.myPopup.close();
              $scope.show = true;
              if (prizeType == 'SPECIAL_PRIZES') {
                $state.go('messageCenter')
              } else {
                $state.go('yhj')
              }
            }
          }
        ]
      } else if (isJump == 'JUMP_TO_CONFIRM') {
        $scope.buttonsData = [
          {
            text: "继续抽奖",
            type: 'button-default',
            onTap: function (e) {
              $scope.myPopup.close();
              $scope.show = true;
              $scope.disabledBtn = false
            }
          },
          {
            text: "确认收货地址",
            type: 'button-calm',
            onTap: function (e) {
              $scope.myPopup.close();
              $scope.show = true;
              $state.go('address', {person: 'person'})
            }
          }
        ]
      } else if (isJump == 'JUMP_TO_ADD') {
        $scope.buttonsData = [
          {
            text: "继续抽奖",
            type: 'button-default',
            onTap: function (e) {
              $scope.myPopup.close();
              $scope.show = true;
              $scope.disabledBtn = false
            }
          },
          {
            text: "填写收货地址",
            type: 'button-calm',
            onTap: function (e) {
              $scope.myPopup.close();
              $scope.show = true;
              $state.go('addressStep3', {addressStatus: 'add', product: 'product'})
            }
          }
        ]
      }
    } else {
      $scope.buttonsData = [
        {
          text: "继续抽奖",
          type: 'button-calm',
          onTap: function (e) {
            $scope.myPopup.close();
            $scope.show = true;
            $scope.disabledBtn = false
          }
        }
      ]
    }
    $scope.myPopup = $ionicPopup.show({
      title: tit,
      cssClass: 'jyAlert jyAlert1',
      template: template,
      buttons: $scope.buttonsData
    });
  };

  //抽奖开始
  $scope.scrollFunc = function (value) {
    var speed1 = 50
    var speed2 = 50
    var speed3 = 50
    var index1, index2, index3, scrollFlag1 = false, scrollFlag2 = false, scrollFlag3 = false
    if (s01) clearInterval(s01)
    if (s02) clearInterval(s02)
    if (s03) clearInterval(s03)
    var len = $('#col1').children("li").length

    function getOrderSequence(prizeId) {
      var i
      $scope.prizeInfos.forEach((v, k) => {
        if (v.prizeId == prizeId) i = k
      })
      if (i == 0) i = len - 1
      else i = i - 1
      return i
    }

    function scoll1(id) {
      $("#" + id).children("li").first().animate({"margin-top": -80}, speed1, 'linear', function () {
        var $li = $(this);
        $li.css("margin-top", 0).appendTo($("#" + id));
        index1 = $("#" + id).children("li").first().attr('aa') * 1
        if (!scrollFlag1) scoll1(id)
      });
    }

    function scoll2(id) {
      $("#" + id).children("li").first().animate({"margin-top": -80}, speed2, 'linear', function () {
        var $li = $(this);
        $li.css("margin-top", 0).appendTo($("#" + id));
        index2 = $("#" + id).children("li").first().attr('aa') * 1
        if (!scrollFlag2) scoll2(id)
      });
    }

    function scoll3(id) {
      $("#" + id).children("li").first().animate({"margin-top": -80}, speed3, 'linear', function () {
        var $li = $(this);
        $li.css("margin-top", 0).appendTo($("#" + id));
        index3 = $("#" + id).children("li").first().attr('aa') * 1
        if (!scrollFlag3) scoll3(id)
        else {
          $timeout(function () {
            $scope.flag = true;
          }, 200);
        }
      });
    }

    var s01 = setInterval(function () {
      if (speed1 <= 100) {
        speed1 += 50;
      } else {
        if (index1 == getOrderSequence($scope.prizeId)) {
          scrollFlag1 = true
          clearInterval(s01)
          speed1 = 50;
        }
      }
    }, 300);
    var s02 = setInterval(function () {
      if (speed2 <= 100) {
        speed2 += 50;
      } else {
        if (scrollFlag1) {
          if (index2 == getOrderSequence($scope.prizeId)) {
            scrollFlag2 = true
            clearInterval(s02)
            speed2 = 50;
          }
        }
      }
    }, 200);
    var s03 = setInterval(function () {
      if (speed3 <= 100) {
        speed3 += 50;
      } else {
        if (scrollFlag2) {
          if (index3 == getOrderSequence($scope.prizeId)) {
            scrollFlag3 = true
            clearInterval(s03)
            speed3 = 50;
            $scope.scrollFinish(value)
          }
        }
      }
    }, 100);
    scoll1('col1')
    scoll2('col2')
    scoll3('col3')
  }

  //抽奖完成
  $scope.scrollFinish = function (value) {
    for (var i = 0; i < $scope.prizeInfos.length; i++) {
      if (value.prizeId == $scope.prizeInfos[i].prizeId) {
        $scope.prizeIndex = i;
        break;
      }
    }
    $scope.remainingFrequency--;
    if (value.prizeId > 0) {
      $scope.tipHead = '恭喜你，中奖了！';
    } else {
      $scope.tipHead = '很遗憾，没有中奖！'
    }
    $timeout(function () {
      //$scope.showTip('<div class="prizeImg"><img src='+$scope.prizeInfos[$scope.prizeIndex].accessPath+'></div>'+$scope.prizeInfos[$scope.prizeIndex].prizeName);
      $scope.showTip(value.prizeId, value.prizeType, value.isJump, '<div class="prizeTip">' + $scope.tipHead + '</div><div class="prizeImg"><img src=' + $scope.accessPath + '></div>');
    }, 1200);
  }
});

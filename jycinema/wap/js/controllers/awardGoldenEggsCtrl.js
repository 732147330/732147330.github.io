/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('awardGoldenEggsCtrl', function ($scope, $rootScope, httpService, JYApi, $ionicPopup, $state, $timeout, $stateParams, $ionicViewSwitcher, $interval) {
  $scope.lotteryDrawHeaderId = $stateParams.lotteryDrawHeaderId;
  $scope.channelCode = $stateParams.channelCode;


  if ($scope.channelCode == '420a29') {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?ec3093d1b1738f838ecd79455a9fb707";
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
        lotteryCategoryCode: 'goldenEgg',
        lotteryDrawHeaderId: $scope.lotteryDrawHeaderId
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.resData = res.data;
        $scope.eggrr = [
          {
            eggPic: $scope.resData.eggPic,
            brokenEggPic: $scope.resData.brokenEggPic,
            hammerFlag: false,
            egg: {
              width: "100px",
              height: "100px",
              transition: "all ease-in 0ms",
              background: "url(" + $scope.resData.eggPic + ") no-repeat",
              "background-size": "100%"
            }
          },
          {
            hammerFlag: false,
            egg: {
              width: "100px",
              height: "100px",
              transition: "all ease-in 0ms",
              background: "url(" + $scope.resData.eggPic + ") no-repeat",
              "background-size": "100%"
            }
          },
          {
            hammerFlag: false,
            egg: {
              width: "100px",
              height: "100px",
              transition: "all ease-in 0ms",
              background: "url(" + $scope.resData.eggPic + ") no-repeat",
              "background-size": "100%"
            }
          },
          {
            hammerFlag: false,
            egg: {
              width: "100px",
              height: "100px",
              transition: "all ease-in 0ms",
              background: "url(" + $scope.resData.eggPic + ") no-repeat",
              "background-size": "100%"
            }
          },
          {
            hammerFlag: false,
            egg: {
              width: "100px",
              height: "100px",
              transition: "all ease-in 0ms",
              background: "url(" + $scope.resData.eggPic + ") no-repeat",
              "background-size": "100%"
            }
          },
          {
            hammerFlag: false,
            egg: {
              width: "100px",
              height: "100px",
              transition: "all ease-in 0ms",
              background: "url(" + $scope.resData.eggPic + ") no-repeat",
              "background-size": "100%"
            }
          }
        ];
        $scope.prizeInfos = res.data.prizeInfos;
        $scope.outerPic = $scope.resData.outerPic;
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
        $scope.isWeixin();
      }
    }, 2);
  };

  $scope.$on('$ionicView.enter', function () {
    $scope.findLotteryPageConfig();
  });

  $scope.startDrawLottery = function (index) {
    if ($scope.resData.lotteryActivityStatus == 'ACTIVE') {
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
        $scope.isJump = value.isJump;
        $scope.prizeType = value.prizeType;
        $scope.prizeId = value.prizeId;
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
            }
          }
        ]
      });
    }
  };

  //砸金蛋
  $scope.hammerClick = function (index) {
    $scope.eggrr[index].hammerFlag = true;
    $scope.eggrr[index].egg.background = "url(" + $scope.resData.brokenEggPic + ") no-repeat";
  };


  $scope.restart = function () {
    $timeout(function () {
      $('.showPrize').hide();
      $scope.flag = false;
    }, 0);
    $scope.findLotteryPageConfig();
  };
  $scope.look = function () {
    $timeout(function () {
      $('.showPrize').hide();
      $scope.flag = false;
    }, 0);
    $scope.findLotteryPageConfig();
    if ($scope.prizeType == 'SPECIAL_PRIZES') {
      $state.go('messageCenter')
    } else {
      $state.go('yhj')
    }
  };
  $scope.goAddress = function () {
    $timeout(function () {
      $('.showPrize').hide();
      $scope.flag = false;
    }, 0);
    $scope.findLotteryPageConfig();
    if ($scope.isJump == 'JUMP_TO_CONFIRM') {
      $state.go('address', {person: 'person'})
    } else if ($scope.isJump == 'JUMP_TO_ADD') {
      $state.go('addressStep3', {addressStatus: 'add', product: 'product'})
    }
  };

  $scope.weixin = function () {
    httpService.getData(JYApi.generateConfigSignature, 'post', {
      url: encodeURIComponent(location.href)
    }, function (res) {
      $scope.appId = res.appId;
      $scope.nonceStr = res.nonceStr;
      $scope.timestamp = res.timestamp;
      $scope.signature = res.signature;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: $scope.appId, // 必填，公众号的唯一标识
        timestamp: $scope.timestamp, // 必填，生成签名的时间戳
        nonceStr: $scope.nonceStr, // 必填，生成签名的随机串
        signature: $scope.signature,// 必填，签名，见附录1
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    })
  };

  //wap微信分享
  $scope.isWeixin = function () {
    $scope.weixin();
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //console.log(111111)
      wx.ready(function () {
        //console.log(2222222)
        $scope.shareTime = new Date().getTime();
        if (localStorage.userInfo) {
          $scope.shareCode = JSON.parse(localStorage.userInfo).memberId + $scope.shareTime;
        }
        //分享朋友圈
        if ($scope.resData) {
          wx.onMenuShareTimeline({
            title: '金逸电影-抽奖活动',// 分享标题
            link: locals.returnUrl() + "/?from=singlemessage#/awardGoldenEggs?lotteryDrawHeaderId=" + $scope.resData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode),
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: $scope.resData.bgImg,// 分享图标
            success: function (res) {
              console.log('分享朋友圈成功')
              console.log(res)
              httpService.getData(JYApi.shareInfo, 'post', {
                params: JSON.stringify({
                  "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                  "shareCode": $scope.getEncryption($scope.shareCode),
                  "lotteryDrawHeaderId": $scope.resData.lotteryDrawHeaderId,
                  "souType": "CIRCLE"
                })
              }, function (res) {
                if (res.status == 'noLogin') {
                  var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: '小主，登录可以分享有奖哦!',
                    buttons: [
                      {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                          myPopup.close();
                        }
                      },
                      {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                          myPopup.close();
                          $state.go('login', {viewName: 'movieDetail', urlParams: JSON.stringify($stateParams)});
                        }
                      }
                    ]
                  });
                }
                if (res.status == 'S') {
                  var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: res.msg,
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
                } else if (res.status == 'E') {
                  var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: res.msg,
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
              });
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              //console.log(444444444)
            }
          });

          //分享朋友
          wx.onMenuShareAppMessage({
            title: '金逸电影-抽奖活动',// 分享标题
            desc: $scope.resData.activityGroupDesc, // 分享描述
            link: locals.returnUrl() + "/?from=singlemessage#/awardGoldenEggs?lotteryDrawHeaderId=" + $scope.resData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode),// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: $scope.resData.bgImg, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
              console.log('分享好友成功')
              console.log(res)
              httpService.getData(JYApi.shareInfo, 'post', {
                params: JSON.stringify({
                  "sourceId": $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                  "shareCode": $scope.getEncryption($scope.shareCode),
                  "lotteryDrawHeaderId": $scope.resData.lotteryDrawHeaderId,
                  "souType": "COMPAN"
                })
              }, function (res) {
                if (res.status == 'noLogin') {
                  var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: '小主，登录可以分享有奖哦!',
                    buttons: [
                      {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                          myPopup.close();
                        }
                      },
                      {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                          myPopup.close();
                          $state.go('login', {viewName: 'movieDetail', urlParams: JSON.stringify($stateParams)});
                        }
                      }
                    ]
                  });
                }
                if (res.status == 'S') {
                  var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: res.msg,
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
                } else if (res.status == 'E') {
                  var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: res.msg,
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
              });
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          //分享qq
          wx.onMenuShareQQ({
            title: '金逸电影-抽奖活动',// 分享标题
            desc: $scope.resData.activityGroupDesc, // 分享描述
            link: locals.returnUrl() + "/?from=singlemessage#/awardGoldenEggs?lotteryDrawHeaderId=" + $scope.resData.lotteryDrawHeaderId + '&sourceId=' + $scope.getEncryption(JSON.parse(localStorage.userInfo).memberId) + '&shareCode=' + $scope.getEncryption($scope.shareCode),// 分享链接
            imgUrl: $scope.resData.bgImg,// 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        }
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
      wx.error(function (res) {
        console.log('error')
        console.log(res)
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    } else {
    }
  };

  //分享进来必须登录
  $scope.shareCodeFlag = $stateParams.shareCode ? true : false;
  if ($scope.shareCodeFlag == true) {
    $scope.joinFlag = true;
  } else {
    $scope.joinFlag = false;
  }
  $scope.join = function () {
    if (localStorage.userInfo) {
      //$state.go('activity')
      $scope.joinFlag = false;
    } else {
      //$scope.needBind = true;
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
              $scope.show = true;
            }
          },
          {
            text: '立即登陆',
            type: 'button-calm',
            onTap: function (e) {
              $scope.myPopup.close();
              $scope.show = true;
              $state.go('login', {viewName: 'awardGoldenEggs', urlParams: JSON.stringify($stateParams)});
            }
          }
        ]
      });
    }
  };
  $scope.hide = function () {
    $scope.needBind = false;
  };
  //if($scope.shareCodeFlag==true) {
  //    $scope.needBind=true;
  //}
  //生成登录交易信息--忠诚度计划
  $scope.getLoginCount = function () {
    $.ajax({
      type: 'POST',
      url: JYApi.saveLytTxn,
      data: {
        params: JSON.stringify({
          planId: 3,
          txnType: 'LOGIN',
          subType: 'WAP',
          status: 'PENDING',
          MemberCardNumber: JSON.parse(localStorage.userInfo).chipNumber ? JSON.parse(localStorage.userInfo).chipNumber : '',
          memberId: JSON.parse(localStorage.userInfo).memberId
        })
      },
      success: function () {
      }
    });
  };
  //获取会员基础信息
  $scope.findMember = function (memberId) {
    httpService.getData(JYApi.findMember, 'post', {
      params: JSON.stringify({
        "memberId": memberId
      })
    }, function (res) {
      if (res.status == "S") {
        var userInfo = res.data;
        userInfo.token = JSON.parse(localStorage.userInfo).token;
        localStorage.userInfo = JSON.stringify(userInfo);
        localStorage.cacheTime = new Date().getTime();
        $scope.getLoginCount();
        $rootScope.userInfo = userInfo;
        $scope.joinFlag = false;
        //$state.go("activity");
        //$ionicViewSwitcher.nextDirection("none")
      } else {
        $rootScope.showTip('获取会员信息失败');
      }
    });
  };

  $scope.bindPhone = {};
  $scope.sendYzmFlag = '获取验证码';
  $scope.sendYzm = function () {
    if (!$scope.bindPhone.mobileNumber) {
      $rootScope.showTip('请输入手机号码');
    } else {
      if (!(/^1[34578]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
        $rootScope.showTip('手机号码格式不正确');
      } else {
        if ($scope.sendYzmFlag == '获取验证码') {
          httpService.getData(JYApi.sendMg, 'post', {
            params: JSON.stringify({
              "mobileNumber": $scope.bindPhone.mobileNumber,
              sendType: 'login'
            })
          }, function (res) {
            if (res.status == 'S') {
              $scope.sendYzmFlag = 60;
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
          }, 2);
        }
      }
    }
  };
  $scope.getCode = function () {
    $scope.yzmCode = locals.baseUrl() + '/frontUIWebapp/appserver/validateCodeService/createImage?id=' + Math.random();
  };
  $scope.getCode();
  $scope.login = function () {
    httpService.getData(JYApi.lockSeatLogin, 'post', {
      params: JSON.stringify({
        "mobileNumber": $scope.bindPhone.mobileNumber,
        "numCode": $scope.bindPhone.vertifyCode,
        imgCode: $scope.bindPhone.captcha1,
        sourceId: $stateParams.sourceId,
        shareCode: $stateParams.shareCode
      })
    }, function (res) {
      if (res.status == '200') {
        $scope.needBind = false;
        if (res.data.memberId) {
          res.data.token = res.token;
          localStorage.userInfo = JSON.stringify(res.data);
          $scope.findMember(res.data.memberId);
        }
      } else {
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
  $scope.goLogin = function () {
    $scope.needBind = false;
    $state.go('login', {viewName: 'awardGoldenEggs', urlParams: JSON.stringify($stateParams)});
    $ionicViewSwitcher.nextDirection("none")
  };


});

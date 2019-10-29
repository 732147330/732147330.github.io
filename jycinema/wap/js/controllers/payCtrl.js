// /**
//  * 2017.5.3新增支付界面
//  **/
// 'use strict';
app.controller('payCtrl', function ($scope, $rootScope, $stateParams, $ionicBackdrop, $ionicViewSwitcher, $interval, $ionicModal, $location, httpService, JYApi, $http, myhrefService, $state, $timeout, $ionicHistory, $ionicPopup, $ionicScrollDelegate) {

  $scope.String = String;
  $scope.ordNum = $stateParams.ordNum;

  $rootScope.userInfo = JSON.parse(localStorage.userInfo);
  $scope.user = {
    mobileNumber: $rootScope.userInfo.mobileNumber
  };
  //获取影片信息
  $scope.Number = Number;

  $scope.userData = {tel: JSON.parse(localStorage.userInfo).mobileNumber};

  //挂起的应用重新激活
  $scope.resumeFn = function () {
    $timeout(function () {
      $scope.getOrderTime();
    }, 10);
  };
  document.addEventListener("deviceready", function () {
    document.addEventListener("resume", $scope.resumeFn, false);
  }, false);


  $scope.$on("$ionicView.enter", function (event, data) {
    $ionicModal.fromTemplateUrl('templates/memberCard.html', {
      scope: $scope,
      animation: 'none'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.pathUrl = $location.path();
    //获取订单时间
    $scope.getOrderTime = function () {
      $timeout.cancel($scope.queryDjs);
      httpService.getData(JYApi.findOrder, 'post', {
        params: JSON.stringify({
          orderCode: $scope.ordNum,
          memberId: JSON.parse(localStorage.userInfo).memberId
        })
      }, function (res) {
        $scope.getOrderTimeFlag = true;
        $scope.orderInfo = res.data[0];
        if (res.status == "S" && res.data.length > 0) {
          $scope.isSelectCard = res.data[0].bookingType == 'CARD' ? true : false;//支付方式
          $scope.isSelectRightsCard = res.data[0].bookingType;//使用权益次卡支付
          $scope.speciesCode = res.data[0].speciesCode;//升厅券只能使用会员卡支付
          $scope.leftTime = res.data[0].remainingTime;
          $scope.remainingTimeDesc = res.data[0].remainingTimeDesc;
          $scope.remainingTimeFlag = res.data[0].remainingTimeFlag;
          $scope.needPay = res.data[0].totalAmount;
          $scope.validCodeFlag = res.data[0].validCodeFlag == 'Y' || (function () {
            var _flag = false
            if (res.data[0].goods && res.data[0].goods.length > 0) {
              res.data[0].goods.forEach(function (_item) {
                if (_item.validCodeFlag == 'Y') _flag = true
              })
            }
            return _flag
          })();


          if (res.data[0].subsidyType == 'CINEMA') {
            $scope.subsidyType = true
          } else {
            $scope.subsidyType = false
          }
          if (res.data[0].bookingType == 'CARD') {
            $scope.payIndex = 0
          }
          if ($scope.needPay == '0' && $scope.isSelectRightsCard == 'EQUITY_CARD_FREE') {
            $scope.rightsCard = true;
          }
          if ($scope.needPay == '0' && $scope.isSelectRightsCard == 'VOUCHER_FREE') {
            $scope.voucherCard = true;
          }
          if ($scope.speciesCode == 'QGY05-180520-1') {
            $scope.isSelectCard = true;
            $scope.rightsCard = false;
            $scope.voucherCard = false;
          }
          if ($scope.remainingTimeFlag == 'Y' && $scope.pathUrl == '/pay') {
            if (!$scope.myPopup1) {
              $scope.isPay = true;
              $timeout.cancel($scope.queryDjs);
              $scope.myPopup1 = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: $scope.remainingTimeDesc,
                buttons: [
                  {
                    text: languageSetting.confirm,
                    type: 'button-calm',
                    onTap: function (e) {
                      $scope.modal.hide();
                      $scope.myPopup1.close();
                      $scope.myPopup1 = null;
                      $ionicBackdrop.release();
                      $state.go('home');
                    }
                  }
                ]
              });
            }
          } else if ($scope.remainingTimeFlag == 'N') {
            $scope.myPopup1 = null;
            $scope.formatTime();
          }
        }
      }, 2);
    };
    $scope.isWeixin();
    $scope.isPay = false;
    $scope.getOrderTime();
    $scope.formatTime = function () {
      $scope.leftTime--;
      $scope.minute = Math.floor($scope.leftTime / 60) < 10 ? '0' + Math.floor($scope.leftTime / 60) : Math.floor($scope.leftTime / 60);
      $scope.second = $scope.leftTime % 60 < 10 ? '0' + ($scope.leftTime % 60) : $scope.leftTime % 60;
      if ($scope.leftTime > 0) {
        $scope.queryDjs = $timeout(function () {
          if ($scope.formatTime) {
            $scope.formatTime();
          }
        }, 1000);
      } else {
        $scope.getOrderTime();
      }
    };

  });
  $scope.$on("$ionicView.beforeLeave", function (event, data) {
    $scope.getOrderTime = null;
  });
  $scope.$on("$ionicView.leave", function (event, data) {
    if ($scope.myPopup) {
      $scope.myPopup.close();
    }
    if ($scope.myPopup1) {
      $scope.myPopup1.close();
    }
    $scope.myPopup1 = null;
    $scope.hideModal();
    $timeout.cancel($scope.queryDjs);
    $scope.getOrderTime = null;
    $scope.formatTime = null;
    $scope.pathUrl = null;
  });

  $scope.clearText = function () {
    $scope.user.mobileNumber = '';
  };
  $scope.getCurrentData = function (index) {
    $scope.payIndex = index;
  };
  $scope.checkOrder = function () {
    var myPopup = $ionicPopup.show({
      title: languageSetting.tip,
      cssClass: 'jyAlert',
      template: languageSetting.cancelPaying,
      buttons: [
        {
          text: languageSetting.error,
          type: 'button-default',
          onTap: function () {
            myPopup.close();
          }
        },
        {
          text: languageSetting.confirm,
          type: 'button-calm',
          onTap: function (e) {
            myPopup.close();
            $state.go('home');
          }
        }
      ]
    });
  };

  //修改接收短信手机号码
  $scope.changeReceivePhoneNumber = function () {
    httpService.getData(JYApi.updateReceivePhoneNumber, 'post', {
      params: JSON.stringify({
        "orderCode": $scope.ordNum,
        "receivePhoneNumber": $scope.user.mobileNumber
      })
    }, function (res) {

    });
  };

  //会员卡支付验证码逻辑
  $scope.yzmLogicPay = function () {
    $scope.yzmFlagPay = false;
    httpService.getData(JYApi.sendMg, 'post', {
      params: JSON.stringify({
        "mobileNumber": JSON.parse(localStorage.userInfo).cardPhonenumber,
        sendType: 'pay'
      })
    }, function (res) {
      if (res.status == 'S') {
        var djs = $interval(function () {
          if ($scope.leftTimePay > 1) {
            $scope.leftTimePay--;
          } else {
            $interval.cancel(djs);
            $scope.yzmFlagPay = true;
            $scope.leftTimePay = 60;
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
    });
  };

  $scope.goSuccessPage = function () {
    $scope.isPay = true;
    var myPopup = $ionicPopup.show({
      title: languageSetting.tip,
      cssClass: 'jyAlert jyAlert1',
      template: '<i class="iconTip color-green ion-checkmark-circled"></i>' + languageSetting.paySuccess + '!'
    });
    $timeout(function () {
      myPopup.close();
      $state.go('getOrderTicket', {
        ordNum: $scope.ordNum,
        orderType: $scope.orderInfo.orderType
      });
    }, 3000);
  };

  $scope.showModal = function () {
    $scope.modal.show();
    $ionicBackdrop.retain();
  };

  $scope.hideModal = function () {
    $scope.modal.hide();
    $ionicBackdrop.release();
    $interval.cancel($scope.djs);
    $scope.yzmFlagPay = true;
    $scope.leftTimePay = 60;
  };


  $scope.paySubmit = function (obj) {
    if ($scope.payIndex >= 0) {
      switch ($scope.payIndex) {
        case 0:
          //会员卡支付
          if (!JSON.parse(localStorage.userInfo).cardPhonenumber) {
            $scope.myPopup = $ionicPopup.show({
              title: languageSetting.tip,
              cssClass: 'jyAlert jyAlert1',
              template: languageSetting.unBindCard
            });
            $timeout(function () {
              $scope.myPopup.close();
            }, 2000);
            return;
          }
          $scope.cardPhonenumber = JSON.parse(localStorage.userInfo).cardPhonenumber;
          //查询会员卡余额
          httpService.getData(JYApi.getCardInfo, 'post', {
            params: JSON.stringify({
              memberId: JSON.parse(localStorage.userInfo).memberId
            })
          }, function (res) {
            if (res.status == "S") {
              var userInfo = res.data;
              userInfo.token = JSON.parse(localStorage.userInfo).token;
              localStorage.userInfo = JSON.stringify(userInfo);
              $scope.remainPay = JSON.parse(localStorage.userInfo).cardBalance - $scope.needPay;
              if ($scope.remainPay >= 0) {
                $scope.yzmFlagPay = true;
                $scope.leftTimePay = 60;
                $scope.data = {};
                $scope.currentShowIndex = 0;//权益卡
                $scope.showModal();
              } else {
                $scope.myPopup = $ionicPopup.show({
                  title: languageSetting.tip,
                  cssClass: 'jyAlert jyAlert1',
                  template: languageSetting.lowBalance,
                  buttons: [
                    {
                      text: languageSetting.cancel,
                      type: 'button-default',
                      onTap: function () {
                        $scope.myPopup.close();
                      }
                    },
                    {
                      text: languageSetting.charge,
                      type: 'button-calm',
                      onTap: function (e) {
                        $state.go('recharge', {fromPage: 'pay'});
                      }
                    }
                  ]
                });
              }
            } else if (res.status == "NOTOKEN") {
              $scope.myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '登录失效,请重新登录'
              });
              httpService.getData(JYApi.logout, 'post', {}, function (res) {
              });//自动请求服务退出session
              $timeout(function () {
                $scope.myPopup.close();
                localStorage.removeItem('userInfo');
                $rootScope.userInfo = null;
                $state.go('login');
              }, 2000);
            }
          }, 2);
          break;
        case 1:
          //会员卡支付
          if (!JSON.parse(localStorage.userInfo).cardPhonenumber) {
            $scope.myPopup = $ionicPopup.show({
              title: languageSetting.tip,
              cssClass: 'jyAlert jyAlert1',
              template: languageSetting.unBindCard
            });
            $timeout(function () {
              $scope.myPopup.close();
            }, 2000);
            return;
          }
          $scope.cardPhonenumber = JSON.parse(localStorage.userInfo).cardPhonenumber;
          //查询会员卡余额
          httpService.getData(JYApi.getCardInfo, 'post', {
            params: JSON.stringify({
              memberId: JSON.parse(localStorage.userInfo).memberId
            })
          }, function (res) {
            if (res.status == "S") {
              var userInfo = res.data;
              userInfo.token = JSON.parse(localStorage.userInfo).token;
              localStorage.userInfo = JSON.stringify(userInfo);
              $scope.remainPay = JSON.parse(localStorage.userInfo).cardBalance - $scope.needPay;
              if ($scope.remainPay >= 0) {
                $scope.yzmFlagPay = true;
                $scope.leftTimePay = 60;
                $scope.data = {};
                $scope.currentShowIndex = 0;//权益卡
                $scope.showModal();
              } else {
                $scope.myPopup = $ionicPopup.show({
                  title: languageSetting.tip,
                  cssClass: 'jyAlert jyAlert1',
                  template: languageSetting.lowBalance,
                  buttons: [
                    {
                      text: languageSetting.cancel,
                      type: 'button-default',
                      onTap: function () {
                        $scope.myPopup.close();
                      }
                    },
                    {
                      text: languageSetting.charge,
                      type: 'button-calm',
                      onTap: function (e) {
                        $state.go('recharge', {fromPage: 'pay'});
                      }
                    }
                  ]
                });
              }
            } else if (res.status == "NOTOKEN") {
              $scope.myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '登录失效,请重新登录'
              });
              httpService.getData(JYApi.logout, 'post', {}, function (res) {
              });//自动请求服务退出session
              $timeout(function () {
                $scope.myPopup.close();
                localStorage.removeItem('userInfo');
                $rootScope.userInfo = null;
                $state.go('login');
              }, 2000);
            }
          }, 2);
          break;
        case 2:
          //支付宝支付
          $scope.currentShowIndex = 2;
          if ($scope.validCodeFlag) {
            $scope.data = {};
            if (!JSON.parse(localStorage.userInfo).cardPhonenumber) {
              $scope.myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.unBindCard
              });
              $timeout(function () {
                $scope.myPopup.close();
              }, 2000);
              return;
            }
            $scope.cardPhonenumber = JSON.parse(localStorage.userInfo).cardPhonenumber;
            httpService.getData(JYApi.getCardInfo, 'post', {
              params: JSON.stringify({
                memberId: JSON.parse(localStorage.userInfo).memberId
              })
            }, function (res) {
              if (res.status == "S") {
                var userInfo = res.data;
                userInfo.token = JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo = JSON.stringify(userInfo);
                $scope.yzmFlagPay = true;
                $scope.leftTimePay = 60;
                $scope.showModal();
              }
            }, 2);
          } else {
            $scope.zfbPay(true);
          }
          break;
        case 3:
          //微信支付
          $scope.currentShowIndex = 3;
          if ($scope.validCodeFlag) {
            $scope.data = {};
            if (!JSON.parse(localStorage.userInfo).cardPhonenumber) {
              $scope.myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.unBindCard
              });
              $timeout(function () {
                $scope.myPopup.close();
              }, 2000);
              return;
            }
            $scope.cardPhonenumber = JSON.parse(localStorage.userInfo).cardPhonenumber;
            httpService.getData(JYApi.getCardInfo, 'post', {
              params: JSON.stringify({
                memberId: JSON.parse(localStorage.userInfo).memberId
              })
            }, function (res) {
              if (res.status == "S") {
                var userInfo = res.data;
                userInfo.token = JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo = JSON.stringify(userInfo);
                $scope.yzmFlagPay = true;
                $scope.leftTimePay = 60;
                $scope.showModal();
              }
            }, 2);
          } else {
            $scope.wxPay(true);
          }
          break;
        case 4:
          //权益卡0元支付
          //$scope.currentShowIndex = 3;
          $scope.data = {};
          $scope.showModal();
          break;
        case 5:
          //卡卷0元支付
          $scope.currentShowIndex = 5;
          $scope.data = {};
          if ($scope.validCodeFlag) {
            if (!JSON.parse(localStorage.userInfo).cardPhonenumber) {
              $scope.myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.unBindCard
              });
              $timeout(function () {
                $scope.myPopup.close();
              }, 2000);
              return;
            }
            $scope.cardPhonenumber = JSON.parse(localStorage.userInfo).cardPhonenumber;
            //查询会员卡余额
            httpService.getData(JYApi.getCardInfo, 'post', {
              params: JSON.stringify({
                memberId: JSON.parse(localStorage.userInfo).memberId
              })
            }, function (res) {
              if (res.status == "S") {
                var userInfo = res.data;
                userInfo.token = JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo = JSON.stringify(userInfo);
                $scope.yzmFlagPay = true;
                $scope.leftTimePay = 60;
                //20180822修改
                //$scope.cardPhonenumber = userInfo.cardPhonenumber;
                $scope.showModal();
              }
            }, 2);
          } else {
            $scope.zeroPay();
          }
          break;
      }
    } else {
      $scope.myPopup = $ionicPopup.show({
        title: languageSetting.tip,
        cssClass: 'jyAlert jyAlert1',
        template: '<i class="iconTip ion-close-circled"></i>' + '请选择支付方式'
      });
      $timeout(function () {
        $scope.myPopup.close();
      }, 2000);
    }
  };

  //密码加密
  $scope.getEncryption = function (value) {
    var val = Base64.encode(value);
    var arr = [];
    for (var i = 0; i < val.length; i++) {
      arr.push(val.charAt(i));
      if (i % 2) {
        var num1 = Math.floor(10 * Math.random());
        arr.push(num1);
        var num2 = Math.floor(10 * Math.random());
        arr.push(num2);
        var num3 = Math.floor(10 * Math.random());
        arr.push(num3)
      }
    }
    return arr.join("");
  };

  //会员卡支付
  $scope.memberCardPay = function () {
    $interval.cancel($scope.djs);
    httpService.getData(JYApi.memberPay, 'post', {
      tradeNo: $scope.orderInfo.paymentBankNumber,
      memberNo: JSON.parse(localStorage.userInfo).cardPhonenumber,
      mmeberPwd: $scope.getEncryption($scope.data.cardPassword),
      numCode: $scope.data.yzm,
      totalFee: $scope.needPay,
      channelCode: "J0005",
      channelId: 7
    }, function (res) {
      if (res.status == "S") {
        $scope.hideModal();
        $scope.goSuccessPage();
        //更新会员卡号
        httpService.getData(JYApi.updateMemberCardInfo, 'post', {
          params: JSON.stringify({
            orderCode: $scope.ordNum,
            cardNumber: JSON.parse(localStorage.userInfo).chipNumber,
            payMethodCode: 'CARD',
            channelId: 2,
            channelCode: "J0001",
            memberId: localStorage.userInfo ? JSON.parse(localStorage.userInfo).memberId : ''
          })
        }, function (res) {

        })

      } else {
        $scope.errorTip = true;
        $scope.errorTipMsg = res.msg;
        //$timeout(function () {
        //    $scope.errorTip=false;
        //},2000);
      }
    }, 1, '正在支付');
  };
  $scope.hideErrorTip = function () {
    $scope.errorTip = false;
  };

  //支付宝支付
  $scope.zfbPay = function (flag) {
    httpService.getData(JYApi.payurl, 'post', {
      payType: 'ALI_PAY',
      subject: $scope.orderInfo.cinemaName + '-WAP-电影:' + $scope.orderInfo.filmName,
      body: '支付宝WAP电影票支付订单',
      totalFee: $scope.needPay,
      tradeNo: $scope.orderInfo.paymentBankNumber,
      orderTime: $scope.OrderTime,
      timeout: 240000,
      numCode: flag ? '' : $scope.data.yzm,
      mobileNumber: JSON.parse(localStorage.userInfo).cardPhonenumber
    }, function (res) {
      if (res.status == "S") {
        location.href = res.data;
      } else {
        $scope.errorTip = true;
        $scope.errorTipMsg = res.msg;
        $timeout(function () {
          $scope.errorTip = false;
        }, 2000);
      }
    });
  };
  //微信支付
  $scope.wxPay = function (flag) {
    if ($scope.weixinFlag) {
      //微信公众号支付
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5d69bdaaa9765cda&redirect_uri=' + encodeURIComponent(locals.returnUrl() + '/#/wxPay/' + $stateParams.ordNum) + '&response_type=code&scope=snsapi_base&state=' + $stateParams.ordNum + '&connect_redirect=1#wechat_redirect'
    } else {
      //微信H5支付
      var payParams = {
        payType: 'WX_PAY',
        subject: $scope.orderInfo.cinemaName + '-WAP-电影:' + $scope.orderInfo.filmName,
        body: '微信WAP电影票订单',
        totalFee: $scope.needPay,
        tradeNo: $scope.orderInfo.paymentBankNumber,
        orderTime: $scope.orderInfo.orderTime,
        platform: 'WAP_H5',
        numCode: flag ? '' : $scope.data.yzm,
        mobileNumber: JSON.parse(localStorage.userInfo).cardPhonenumber
      };
      httpService.getData(JYApi.payurl, 'post', payParams, function (res) {
        if (res.status == "S") {
          location.href = res.data.mweb_url + '&redirect_url=' + encodeURIComponent(locals.returnUrl() + '/#/pay/') + $scope.ordNum + '?payReturn=Y';
        } else {
          $scope.errorTip = true;
          $scope.errorTipMsg = res.msg;
          $timeout(function () {
            $scope.errorTip = false;
          }, 2000);
        }
      });
    }
  }

  //权益次卡支付
  //2018-8-20 修改了请求字段值mobileNumber为cardPhonenumber
  $scope.zeroPay = function () {
    $interval.cancel($scope.djs);
    httpService.getData(JYApi.zeroPay, 'post', {
      params: JSON.stringify({
        tradeNo: $scope.orderInfo.paymentBankNumber,
        memberId: JSON.parse(localStorage.userInfo).memberId,
        payPwd: $scope.getEncryption($scope.data.cardPassword),
        equitycardCode: $scope.orderInfo.equitycardCode,
        mobileNumber: JSON.parse(localStorage.userInfo).cardPhonenumber,
        numCode: $scope.data.yzm,
        channelCode: "J0005",
        channelId: 7
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.hideModal();
        $scope.goSuccessPage();
      } else {
        $scope.errorTip = true;
        $scope.errorTipMsg = res.msg;
        $timeout(function () {
          $scope.errorTip = false;
        }, 2000);
      }
    }, 1, '正在支付');
  };


  //取消支付
  $scope.cancelPay = function () {
    $scope.myPopup = $ionicPopup.show({
      cssClass: 'jyAlert jyAlert1',
      title: "您确定要取消支付吗？",
      subTitle: $scope.versionRemark,
      buttons: [
        {
          text: languageSetting.cancel,
          type: 'button-default',
          onTap: function (e) {
            $scope.myPopup.close();
          }
        },
        {
          text: languageSetting.confirm,
          type: 'button-calm',
          onTap: function (e) {
            $scope.myPopup.close();
            $state.go('home');
            $ionicViewSwitcher.nextDirection("none")
          }
        }
      ]
    });
  };

  $scope.isWeixin = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      $scope.weixinFlag = true;
    } else {
      $scope.weixinFlag = false;
    }
    if ($scope.weixinFlag) {

    } else {
      if (location.href.indexOf('?') > 0 && location.href.split('?')[1].split('=')[1] == 'Y') {
        $scope.showIsPay = true;
      }
    }
  };

  $scope.checkOrder = function () {
    $scope.showIsPay = false;
    httpService.getData(JYApi.findOrder, 'post', {
      params: JSON.stringify({
        orderCode: $scope.ordNum
      })
    }, function (res) {
      if (res.status == "S") {
        if (res.data[0].status == '已支付') {
          $scope.goSuccessPage();
        } else {
          var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: '<i class="iconTip ion-close-circled"></i>' + '支付异常'
          });
          $timeout(function () {
            myPopup.close();
          }, 2000);
        }

      } else {
        var myPopup = $ionicPopup.show({
          title: languageSetting.tip,
          cssClass: 'jyAlert jyAlert1',
          template: '<i class="iconTip ion-close-circled"></i>' + '支付异常'
        });
        $timeout(function () {
          myPopup.close();
        }, 2000);
      }
    }, 2);
  };
  $scope.closePay = function () {
    $scope.showIsPay = false;
  };

  //wap监听键盘打开
  var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  $(window).on('resize', function () {
    var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (clientHeight > nowClientHeight) {
      //键盘弹出的事件处理
      document.getElementById('bang').style.display = 'none';
      $ionicScrollDelegate.scrollTo(0, 80);
    }
    else {
      //键盘收起的事件处理
      document.getElementById('bang').style.display = 'block';
      $ionicScrollDelegate.scrollTo(0, 0);
    }
  });

});



/**
 * Created by OuYongQiang
 * 2016.12.28 login(登录), reg(注册), forget(忘记密码), pay(支付),绑定会员卡(bdCard)短信验证增加字段sendType
 */
'use strict';
app.controller('loginCtrl', function ($ionicPopup, $scope, $http, $rootScope, $stateParams, $interval, $ionicViewSwitcher, $cordovaStatusbar, $cordovaToast, $state, httpService, JYApi, $timeout) {
  $scope.viewName = $stateParams.viewName;
  $scope.urlParams = $stateParams.urlParams ? JSON.parse($stateParams.urlParams) : '';
  $scope.activeIndex = 0;
  $scope.loginDisabled = true;
  $scope.yzmFlag = true;
  $scope.yzmFlag1 = true;
  $scope.yzmFlag2 = true;
  $scope.leftTime = 60;
  $scope.leftTime1 = 60;
  $scope.leftTime2 = 60;
  $scope.getCode = function () {
    $scope.yzmCode = locals.baseUrl() + '/frontUIWebapp/appserver/validateCodeService/createImage?id=' + Math.random();
  };
  $scope.$on('$ionicView.enter', function () {
    $scope.loginData = {
      tel1: localStorage.mobileNumber ? JSON.parse(localStorage.mobileNumber) : '',
      password1: "",
      tel2: localStorage.mobileNumber ? JSON.parse(localStorage.mobileNumber) : '',
      captcha: '',
      captcha1: '',
      mobileCaptcha1: '',
      captcha2: '',
      card: localStorage.mobileNumber ? JSON.parse(localStorage.mobileNumber) : '',
      mobileCaptcha2: '',
      password3: ''
    };
    $scope.bindPhone = {
      mobileNumber: '',
      vertifyCode: ''
    };
    $scope.getCode();
  });
  $scope.$on('$ionicView.afterEnter', function (event, data) {
    if ($rootScope.isMobile) {
      $cordovaStatusbar.style(1);
    }
  });
  $scope.getCurrentData = function (index) {
    $scope.activeIndex = index;
  };
  $scope.slideHasChanged = function (index) {
    $scope.activeIndex = index;
    if (index == 0 || index == 2 || index == 1) {
      $scope.getCode();
    }
  };
  $scope.slideTo = function () {
    return $scope.activeIndex;
  };

  //获取会员基础信息
  $scope.findMember = function (memberId, openId) {
    httpService.getData(JYApi.findMember, 'post', {
      params: JSON.stringify({
        "memberId": memberId
      })
    }, function (res) {
      if (res.status == "S") {
        var userInfo = res.data;
        userInfo.token = JSON.parse(localStorage.userInfo).token;
        localStorage.userInfo = JSON.stringify(userInfo);
        localStorage.cacheTime = new Date().getTime();//缓存时间
        localStorage.mobileNumber = JSON.stringify(userInfo.mobileNumber);
        $scope.getLoginCount();
        $rootScope.userInfo = userInfo;
        if ($scope.viewName) {
          $state.go($scope.viewName, $scope.urlParams);
        } else {
          $state.go("account");
          $ionicViewSwitcher.nextDirection("none")
        }
      } else {
        $cordovaToast.showShortCenter('获取会员信息失败失败');
      }
    }, 1, languageSetting.loading);
  };

  //密码登陆
  $scope.login1 = function (obj) {
    if (!obj.$invalid) {
      //效验图形码check
      //httpService.getData(JYApi.checkCode, 'post', {
      //  params: JSON.stringify({
      //    "code": $scope.loginData.captcha1
      //  })
      //}, function (res) {
      //  if (res.status == "S") {
      httpService.getData(JYApi.login, 'post', {
        params: JSON.stringify({
          "mobileNumber": $scope.loginData.tel1,
          "encryptedPassword": $scope.loginData.password1,
          "type": "MEMBER",
          "updateVersion": "1.26",
          imgCode: $scope.loginData.captcha1
        })
      }, function (res) {
        if (res.status == "S") {
          if (res.data.memberId) {
            localStorage.userInfo = JSON.stringify(res.data);
            $scope.findMember(res.data.memberId);
          }
        } else {
          var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: '<i class="iconTip ion-close-circled"></i>' + res.msg //ion-checkmark-circled
          });
          $timeout(function () {
            myPopup.close();
          }, 2000);
        }
      });
      //  } else {
      //    var myPopup = $ionicPopup.show({
      //      title: languageSetting.tip,
      //      cssClass: 'jyAlert jyAlert1',
      //      template: '<i class="iconTip ion-close-circled"></i>' + res.msg
      //    });
      //    $timeout(function () {
      //      myPopup.close();
      //    }, 2000);
      //  }
      //});
    }
  };
  //验证码登陆
  $scope.login2 = function () {
    httpService.getData(JYApi.login, 'post', {
      params: JSON.stringify({
        "mobileNumber": $scope.loginData.tel2,
        "numCode": $scope.loginData.captcha,
        "type": "MESSAGE",
        "updateVersion": "1.26",
        imgCode: $scope.loginData.captcha2//'pan!@',//$scope.loginData.captcha2
      })
    }, function (res) {
      if (res.status == "S") {
        if (res.data.memberId) {
          localStorage.userInfo = JSON.stringify(res.data);
          $scope.findMember(res.data.memberId);
        }
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
  //会员卡登陆
  $scope.login3 = function () {
    httpService.getData(JYApi.login, 'post', {
      params: JSON.stringify({
        "cardPhoneNumber": $scope.loginData.card,
        "paymentPassword": $scope.loginData.password3,
        "numCode": $scope.loginData.mobileCaptcha2,
        "type": "MEMBERCARDLOGIN",
        "updateVersion": "1.26"
      })
    }, function (res) {
      if (res.status == "S") {
        if (res.data.memberId) {
          localStorage.userInfo = JSON.stringify(res.data);
          $scope.findMember(res.data.memberId);
        }
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
  //点击获取验证码
  $scope.yzmLogic = function (mobileNumber) {
    $scope.yzmFlag = false;
    httpService.getData(JYApi.sendMg, 'post', {
      params: JSON.stringify({
        "mobileNumber": mobileNumber,
        sendType: 'login'
      })
    }, function (res) {
      if (res.status == 'S') {
        var djs = $interval(function () {
          if ($scope.leftTime > 1) {
            $scope.leftTime--;
          } else {
            $interval.cancel(djs);
            $scope.yzmFlag = true;
            $scope.leftTime = 60;
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
        var djs = $interval(function () {
          if ($scope.leftTime > 1) {
            $scope.leftTime--;
          } else {
            $interval.cancel(djs);
            $scope.yzmFlag = true;
            $scope.leftTime = 60;
          }
        }, 1000);
      }
    });
  };
  $scope.yzmLogic1 = function (mobileNumber) {
    $scope.yzmFlag1 = false;
    httpService.getData(JYApi.sendMg, 'post', {
      params: JSON.stringify({
        "mobileNumber": mobileNumber,
        sendType: "login"
      })
    }, function (res) {
      if (res.status == 'S') {
        var djs = $interval(function () {
          if ($scope.leftTime1 > 1) {
            $scope.leftTime1--;
          } else {
            $interval.cancel(djs);
            $scope.yzmFlag1 = true;
            $scope.leftTime1 = 60;
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
        var djs = $interval(function () {
          if ($scope.leftTime1 > 1) {
            $scope.leftTime1--;
          } else {
            $interval.cancel(djs);
            $scope.yzmFlag1 = true;
            $scope.leftTime1 = 60;
          }
        }, 1000);
      }
    });
  };
  $scope.yzmLogic2 = function (mobileNumber) {
    $scope.yzmFlag2 = false;
    httpService.getData(JYApi.sendMg, 'post', {
      params: JSON.stringify({
        "mobileNumber": mobileNumber,
        sendType: "login"
      })
    }, function (res) {
      if (res.status == 'S') {
        var djs = $interval(function () {
          if ($scope.leftTime2 > 1) {
            $scope.leftTime2--;
          } else {
            $interval.cancel(djs);
            $scope.yzmFlag2 = true;
            $scope.leftTime2 = 60;
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
        var djs = $interval(function () {
          if ($scope.leftTime2 > 1) {
            $scope.leftTime2--;
          } else {
            $interval.cancel(djs);
            $scope.yzmFlag2 = true;
            $scope.leftTime2 = 60;
          }
        }, 1000);
      }
    });
  };


  //手机号-密码登录逻辑
  $scope.loginByPsw = function () {
    httpService.getData(JYApi.login, 'post', {
      params: JSON.stringify({
        "mobileNumber": $scope.loginData.phone,
        "encryptedPassword": $scope.loginData.password,
        "type": "MEMBER"
      })
    }, function (res) {
      if (res.status == "S") {
        $timeout(function () {
          $scope.personInfo = res.data[0];
          $rootScope.hasLogin = true;
          $rootScope.memberId = res.data.memberId;
          $scope.findMember(res.data.memberId);
          $state.go("account");
          $ionicViewSwitcher.nextDirection("none")
        }, 100);
      }
    });
  };
  //手机号-验证码登录逻辑
  $scope.loginByYzm = function () {
    //验证码登录验证
    httpService.getData(JYApi.login, 'post', {
      params: JSON.stringify({
        "mobileNumber": $scope.loginData.phone,
        "numCode": $scope.loginData.captcha,
        "type": "MESSAGE"
      })
    }, function (res) {
      if (res.status == "S") {
        $scope.personInfo = res.data[0];
        $rootScope.hasLogin = true;
        localStorage.userInfo = JSON.stringify(res.data);
        $timeout(function () {
          $rootScope.memberId = res.data.memberId;
          $state.go("account");
          $ionicViewSwitcher.nextDirection("none")
        }, 100);
      }
    });
  };
  //会员卡号，密码登录逻辑
  $scope.loginByVip = function () {
    httpService.getData(JYApi.login, 'post', {
      params: JSON.stringify({
        "cardPhoneNumber": $scope.loginData.phone,
        "paymentPassword": $scope.loginData.password,
        "type": "MEMBERCARDLOGIN"
      })
    }, function (res) {
      if (res.status == "S") {
        $timeout(function () {
          $scope.personInfo = res.data[0];
          $rootScope.hasLogin = true;
          $rootScope.memberId = res.data.memberId;
          $state.go("account");
          $ionicViewSwitcher.nextDirection("none")
          localStorage.userInfo = JSON.stringify(res.data);

        }, 100);
      }
    });
  };

  //第三方登陆QQ
  $scope.qqLogin = function () {
    var myPopup = $ionicPopup.show({
      title: languageSetting.tip,
      cssClass: 'jyAlert jyAlert1',
      template: '<i class="iconTip ion-close-circled"></i>' + '由于系统在维护，暂时不能使用qq登录'
    });
    $timeout(function () {
      myPopup.close();
    }, 3000);
    //YCQQ.logout(function () {
    //
    //}, function (failReason) {
    //
    //});
    //var checkClientIsInstalled = 0;
    //YCQQ.ssoLogin(function (args) {
    //  httpService.getData(JYApi.qqlogin, 'post', {
    //    platform: 'APP_ANDROID',
    //    code: args.access_token
    //  }, function (res) {
    //    if (res.openid) {
    //      $http({
    //        url: JYApi.loginQqAPP + '?openid=' + res.openid,
    //        method: 'get',
    //        headers: {
    //          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    //        },
    //        timeout: 20000
    //      }).success(function (res) {
    //        if (res.status == "S" && res.data.token) {
    //          localStorage.userInfo = JSON.stringify(res.data);
    //          $scope.findMember(res.data.memberId);
    //        } else {
    //          $cordovaToast.showShortCenter('获取token失败');
    //        }
    //      });
    //    } else {
    //      $cordovaToast.showShortCenter('获取授权失败');
    //    }
    //  }, 1, languageSetting.loading);
    //
    //}, function (failReason) {
    //  $cordovaToast.showShortCenter(languageSetting.authorFail);
    //
    //}, checkClientIsInstalled);
  };
  //第三方微信登陆
  $scope.weixinLogin = function () {
    var scope = "snsapi_userinfo";
    var state = "_" + (+new Date());
    Wechat.auth(scope, state, function (response) {
      if (response.code) {
        var params = {platform: 'APP', code: response.code};
        $http({
          url: JYApi.getWechatUserinfo,
          method: 'post',
          data: $.param(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          timeout: 20000
        }).success(function (res) {
          $scope.unionid = res.unionid;
          if ($scope.unionid) {
            $http({
              url: JYApi.loginAPPNew + '?unionid=' + $scope.unionid + '&channelCode=' + "J0001",
              method: 'get',
              headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
              },
              timeout: 20000
            }).success(function (res) {
              if (res.status == '200') {
                var userInfo = res.data;
                userInfo.token = res.token;
                $rootScope.userInfo = userInfo;
                localStorage.userInfo = JSON.stringify(userInfo);
                $scope.findMember(res.data.memberId);
                if ($scope.viewName) {
                  $state.go($scope.viewName, $scope.urlParams);
                } else {
                  $state.go("account");
                  $ionicViewSwitcher.nextDirection("none")
                }
              } else if (res.status == '201') {
                $scope.needBind = true;
              } else {
                $cordovaToast.showShortCenter('登录失败');
              }
            }, 2);
          } else {
            $cordovaToast.showShortCenter('获取unionid失败');
          }
        }, 1, languageSetting.loading);
      }
    }, function (reason) {
      $cordovaToast.showShortCenter(languageSetting.authorFail);
    });
  };

  //第三方支付宝登陆
  $scope.zfbLogin = function () {

  };

  //生成登录交易信息--忠诚度计划
  $scope.getLoginCount = function () {
    $.ajax({
      type: 'POST',
      url: JYApi.saveLytTxn,
      data: {
        params: JSON.stringify({
          planId: 3,
          txnType: 'LOGIN',
          subType: 'APP',
          status: 'PENDING',
          MemberCardNumber: JSON.parse(localStorage.userInfo).chipNumber ? JSON.parse(localStorage.userInfo).chipNumber : '',
          memberId: JSON.parse(localStorage.userInfo).memberId
        })
      },
      success: function () {

      }
    });
  };

  //保存vista会员积分
  $scope.queryMember = function () {
    $.ajax({
      type: 'POST',
      url: JYApi.saveVista,
      data: {
        params: JSON.stringify({
          value: JSON.parse(localStorage.userInfo).integro,
          pointTypeId: 1,
          memberId: JSON.parse(localStorage.userInfo).memberId
        })
      },
      success: function () {

      }
    });
  };

  //微博登陆
  $scope.weiboLogin = function () {
    YCWeibo.logout(function () {

    }, function (failReason) {

    });
    YCWeibo.ssoLogin(function (args) {
      httpService.getData(JYApi.getSinaUserinfo, 'post', {
        platform: 'APP_IOS',
        accessToken: args.access_token,
        userId: args.userid
      }, function (res) {
        if (res.openid) {
          $http({
            url: JYApi.loginSinaAPP + '?openid=' + res.openid,
            method: 'get',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            timeout: 20000
          }).success(function (res) {
            if (res.status == "S" && res.data.token) {
              localStorage.userInfo = JSON.stringify(res.data);
              $scope.findMember(res.data.memberId);
            }
          });
        } else {
          $cordovaToast.showShortCenter('获取授权失败');
        }
      }, 1, languageSetting.loading);
    }, function (failReason) {
      $cordovaToast.showShortCenter(languageSetting.authorFail);
    });
  };

  //绑定手机2017.10.20
  //$scope.bindPhone = {};
  $scope.bindPhoneFn = function () {
    if (!(/^1[34578]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
      $cordovaToast
        .show('手机号码格式不正确', 'short', 'center')
        .then(function (success) {
          // success
        }, function (error) {
          // error
        });
    } else if (!$scope.bindPhone.vertifyCode || $scope.bindPhone.vertifyCode.length != 6) {
      $cordovaToast
        .show('验证码格式不正确', 'short', 'center')
        .then(function (success) {
          // success
        }, function (error) {
          // error
        });
    } else {
      httpService.getData(JYApi.loginAPPNew + '?unionid=' + $scope.unionid + '&mobileNumber=' + $scope.bindPhone.mobileNumber + '&numCode=' + $scope.bindPhone.vertifyCode + '&channelCode=J0001', 'get', {}, function (res) {
        if (res.status == '200') {
          $scope.needBind = false;
          var userInfo = res.data;
          userInfo.token = res.token;
          $rootScope.userInfo = userInfo;
          localStorage.userInfo = JSON.stringify(userInfo);
          localStorage.cacheTime = new Date().getTime();//缓存时间
          if ($scope.viewName) {
            $state.go($scope.viewName, $scope.urlParams);
          } else {
            $state.go("account");
            $ionicViewSwitcher.nextDirection("none")
          }
        } else {
          $cordovaToast.showShortCenter(res.msg);
        }
      }, 2);
    }
  };

  $scope.sendYzmFlag = '获取验证码';
  $scope.sendYzm = function () {
    if (!(/^1[34578]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
      $rootScope.showTip('手机号码格式不正确');
    } else {
      if ($scope.sendYzmFlag == '获取验证码') {

        var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        if (!reg.test($scope.bindPhone.mobileNumber)) {
          var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: '<i class="iconTip ion-close-circled"></i> 手机号码格式不对'
          });
          $timeout(function () {
            myPopup.close();
          }, 2000);
        } else {
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

  $scope.$on('$ionicView.leave', function () {
    $scope.needBind = false;
    $scope.loginData = {
      tel1: localStorage.mobileNumber ? JSON.parse(localStorage.mobileNumber) : '',
      password1: "",
      tel2: localStorage.mobileNumber ? JSON.parse(localStorage.mobileNumber) : '',
      captcha: '',
      captcha1: '',
      mobileCaptcha1: '',
      captcha2: '',
      card: localStorage.mobileNumber ? JSON.parse(localStorage.mobileNumber) : '',
      mobileCaptcha2: '',
      password3: ''
    };
  });
  $scope.hide = function () {
    $scope.needBind = false;
  };


});

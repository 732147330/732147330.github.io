/**
 * Created by pgr on 16/9/12.
 * 2017.2.13 修改手机流程优化,模板修改,修复多次提交
 */
'use strict';
app.controller('personalInformationCtrl', function ($state, httpService, $ionicHistory, $cordovaStatusbar, $timeout, $ionicPopup, $ionicBackdrop, $ionicGesture, $ionicPlatform, $ionicActionSheet, JYApi, $scope, $interval, $rootScope, $ionicLoading, $cordovaDatePicker) {
    $scope.flag = JSON.parse(localStorage.userInfo).mobileNumber ? true : false;
    $scope.yzmFlag = true;
    $scope.leftTime = 60;
    $scope.bindData = {
        tel: '',
        captcha: ''
    };
    //点击获取验证码
    $scope.yzmLogic = function (mobileNumber) {
        $scope.yzmFlag = false;
        httpService.getData(JYApi.sendMg, 'post', {
            params: JSON.stringify({
                "mobileNumber": mobileNumber,
                sendType: 'bd'
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
            }
        });
    };
    $scope.formatDate = function (obj) {
        if (obj < 10) {
            obj = '0' + obj;
        }
        return obj
    }
    //获取会员基础信息
    $scope.findMember = function () {
        httpService.getData(JYApi.findMember, 'post', {
            params: JSON.stringify({})
        }, function (res) {
            if (res.status == "S") {
                $scope.userInfo = res.data;
                $scope.userInfo.token = JSON.parse(localStorage.userInfo).token;
                $scope.userInfo.birthDay = parseInt($scope.userInfo.birthDay);
                $scope.userInfo.birthDay = new Date($scope.userInfo.birthDay).getFullYear() + '/' + $scope.formatDate(new Date($scope.userInfo.birthDay).getMonth() + 1) + '/' + $scope.formatDate(new Date($scope.userInfo.birthDay).getDate());
                console.log($scope.userInfo);
                localStorage.userInfo = JSON.stringify($scope.userInfo);

            } else {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '请求失败,请重新登陆!'
                });
                $timeout(function () {
                    myPopup.close();
                    localStorage.removeItem('userInfo');
                    $scope.userInfo = null;
                    $state.go('login');
                }, 2000);
            }
        });
    };

    //获取第三方绑定
    $scope.isBind = function () {
        httpService.getData(JYApi.findExtLoginAccess, 'post', {
            params: JSON.stringify({
                memberId: JSON.parse(localStorage.userInfo).memberId
            })
        }, function (res) {
            if (res.status == 'S') {
                $scope.qqBindStatus = false;
                $scope.wxBindStatus = false;
                $scope.weiboBindStatus = false;
                $scope.zfbBindStatus = false;
                angular.forEach(res.data, function (value, key) {
                    if (value.accessTypeCode == 'QQ_LOGIN') {
                        $scope.qqBindStatus = true;
                    } else if (value.accessTypeCode == 'WX_LOGIN') {
                        $scope.wxBindStatus = true;
                    } else if (value.accessTypeCode == 'ALI_LOGIN') {
                        $scope.zfbBindStatus = true;
                    } else if (value.accessTypeCode == 'SINA_LOGIN') {
                        $scope.weiboBindStatus = true;
                    }
                });
            }
        });
    };

    $scope.$on('$ionicView.enter', function () {
        $scope.isBind();
        $scope.findMember();
    });
    $scope.bindPhone = function () {
        httpService.getData(JYApi.updateMobileNumber, 'post', {
            params: JSON.stringify({
                memberId: JSON.parse(localStorage.userInfo).memberId,
                mobileNumber: $scope.bindData.tel,
                numCode: $scope.bindData.captcha
            })
        }, function (res) {
            if (res.status == "S") {
                $rootScope.userInfo = JSON.parse(localStorage.userInfo);
                $rootScope.userInfo.mobileNumber = $scope.bindData.tel;
                console.log($rootScope.userInfo.mobileNumber)
                if (res.data) {
                    $rootScope.userInfo.memberId = res.data;
                }
                localStorage.userInfo = JSON.stringify($rootScope.userInfo);

                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.bindSuccess + '!'
                });
                $timeout(function () {
                    myPopup.close();
                    $ionicHistory.goBack();
                }, 2000);
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

    $scope.$on("$ionicView.enter", function (event, data) {
        $rootScope.userInfo = JSON.parse(localStorage.userInfo);
        if (locals.isMobile) {
            $cordovaStatusbar.style(0);
        }
        console.log($rootScope.userInfo);
    });
    $scope.user = {
        newPhone: '',
        yzm: ''
    };

    //初始化数据
    $scope.initParams = function () {
        $scope.hasClick = false;
        $scope.gain = languageSetting.getYzm;
        $interval.cancel($scope.timePromise);
        //重新从服务器请求用户信息

        $scope.gain = languageSetting.getYzm;
    };
    //进入修改密码视图之前,重置值和时间器
    $scope.$on('$ionicView.beforeEnter', $scope.initParams);

    //修改昵称
    $scope.user = {name: ''};
    $scope.saveNick = function () {
        httpService.getData(JYApi.updateMember, 'post', {
            params: JSON.stringify({
                "memberId": $rootScope.memberId,
                "mmbName": $scope.user.name
            })
        }, function (res) {
            if (res.status == "S") {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.changeNicknameSuccess + '!'
                });
                $timeout(function () {
                    myPopup.close();
                    $state.go("personalInformation");
                }, 1000);
            }
        });
    };

    //判断是否有绑定手机
    $scope.changePhone = function () {
        if ($rootScope.userInfo.mobilenumber == null) {
            $state.go("changePhoneStep2");
        }
        else {
            $state.go("changePhone");
        }
    };

    //修改手机号码
    $scope.editPhone = function () {
        //效验手机号码
        httpService.getData(JYApi.updateMemberMobileNumber, 'post', {
            params: JSON.stringify({
                "memberId": $rootScope.userInfo.memberId,
                "vCode": $scope.bindData.captcha,
                "mobileNumber": $scope.bindData.tel
            })
        }, function (res) {
            if (res.status == "S") {
                $rootScope.userInfo.mobileNumber = $scope.user.newPhone;
                localStorage.userInfo = JSON.stringify($rootScope.userInfo);
                $state.go('personalInformation');
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
        });
    };

    //修改手机获取验证码
    $scope.gain = languageSetting.getYzm;
    $scope.getGain = function () {
        $scope.disabledbtn = true;
        $scope.paraclass = "but_null";
        var second = 60,
            timePromise = undefined;

        timePromise = $interval(function () {
            if (second <= 0) {
                $interval.cancel(timePromise);
                timePromise = undefined;

                second = 60;
                $scope.gain = languageSetting.getYzm;
                $scope.paraclass = "but_null";
                $scope.disabledbtn = false;
            } else {
                $scope.gain = second + languageSetting.second;
                $scope.paraclass = "not but_null";
                second--;

            }
        }, 1000, 100);
    };

    //旧手机号码点击获取按钮逻辑
    $scope.yzmPhone = function () {
        if ($scope.hasClick) {
            return;
        }
        $scope.getGain();
        httpService.getData(JYApi.sendMg, 'post', {
            params: JSON.stringify({
                "mobileNumber": $('#mobileNumber').text(),
                sendType: 'bd'
            })
        }, function (res) {
            if (res.status == "S") {

            }
        });
    };

    //修改手机流程
    $scope.changephone = function () {
        httpService.getData(JYApi.updateMemberMobileNumber, 'post', {
            params: JSON.stringify({
                "memberId": $rootScope.memberId,
                "mobileNumber": $rootScope.userInfo.newPhone,
                "vCode": $rootScope.userInfo.vCode
            })
        }, function (res) {
            if (res.status == "S") {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.changePhoneSuccess + '!'
                });
                $timeout(function () {
                    myPopup.close();
                    $state.go("personalInformation");
                }, 1000);
            }
        });
    };
    //新手机号码点击获取按钮逻辑
    $scope.getYzm = function () {
        httpService.getData(JYApi.sendMg, 'post', {
            params: JSON.stringify({
                "mobileNumber": $scope.user.newPhone,
                sendType: "bd"
            })
        }, function (res) {
            if (res.status == "S") {

            }
        });
    };

    //修改邮箱
    $scope.user = {email: ''};
    $scope.saveEmail = function () {
        httpService.getData(JYApi.updateMember, 'post', {
            params: JSON.stringify({
                "memberId": $rootScope.memberId,
                "emailAddress": $scope.user.email ? $scope.user.email : ''
            })
        }, function (res) {
            if (res.status == "S") {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.changeEmailSuccess + '!'
                });
                $timeout(function () {
                    myPopup.close();
                    $state.go("personalInformation");
                }, 1000);
            }
        });
    };

    //修改日期格式
    function FormatDate(strTime) {
        var date = new Date(strTime);
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    }

    //修改生日
    $scope.showDatePicker = function () {
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
        $ionicPlatform.ready(function () {
            $cordovaDatePicker.show(options).then(function (date) {
                //保存
                httpService.getData(JYApi.updateMember, 'post', {
                    params: JSON.stringify({
                        "memberId": $rootScope.userInfo.memberId,
                        "birthDay": date
                    })
                }, function (res) {
                    if (res.status == "S") {
                        if (date) {
                            $scope.userInfo.birthDay = date;
                            $rootScope.userInfo.birthDay = date;
                            localStorage.userInfo = JSON.stringify($rootScope.userInfo);
                        }
                    } else {
                        var myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: languageSetting.updateFail + '!'
                        });
                        $timeout(function () {
                            myPopup.close();
                        }, 1000);
                    }
                });

            });
        });
    };

    //修改男女
    $scope.show = function () {
        $ionicActionSheet.show({
            buttons: [
                {text: languageSetting.man},
                {text: languageSetting.woman}
            ],
            cancelText: languageSetting.cancel,
            buttonClicked: function (index) {
                if (index == 0) {
                    httpService.getData(JYApi.updateMember, 'post', {
                        params: JSON.stringify({
                            "memberId": JSON.parse(localStorage.userInfo).memberId,
                            "sex": "MALE"
                        })
                    }, function (res) {
                        if (res.status == "S") {
                            $scope.userInfo.sex = 'MALE';
                            localStorage.userInfo = JSON.stringify(res.data);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert',
                                template: res.msg
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        }
                    })
                } else if (index == 1) {
                    $rootScope.userInfo.sex = languageSetting.woman;
                    httpService.getData(JYApi.updateMember, 'post', {
                        params: JSON.stringify({
                            "memberId": $rootScope.userInfo.memberId,
                            "sex": "FEMALE"
                        })
                    }, function (res) {
                        if (res.status == "S") {
                            $scope.userInfo.sex = 'FEMALE';
                            localStorage.userInfo = JSON.stringify(res.data);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert',
                                template: res.msg
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        }
                    })
                }
                return true;

            }
        });
    };

    //修改个性签名
    $scope.user = {signature: ''};
    $scope.saveSignature = function () {
        httpService.getData(JYApi.updateMember, 'post', {
            params: JSON.stringify({
                "memberId": $rootScope.memberId,
                "selfIntroduction": $scope.user.signature
            })
        }, function (res) {
            if (res.status == "S") {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.changeSignSuccess + '!'
                });
                $rootScope.userInfo.selfIntroduction = $scope.user.signature;
                localStorage.userInfo = JSON.stringify($rootScope.userInfo);
                $timeout(function () {
                    myPopup.close();
                    $state.go("personalInformation");
                }, 1000);
            }
        });
    };


    //修改密码流程
    $scope.changePassword = function () {
        httpService.getData(JYApi.changePassword, 'post', {
            params: JSON.stringify({
                "memberId": $rootScope.userInfo.memberId,
                "oldPassword": $rootScope.userInfo.encrypatedPassword,
                "newPassword": $rootScope.userInfo.newPassword
            })
        }, function (res) {
            if (res.status == "S") {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.changePasswordSuccess + '!'
                });
                $timeout(function () {
                    myPopup.close();
                    $state.go("personalInformation");
                }, 1000);
            }
        });
    };

    //邀请码
    $scope.findInvitedCode = function () {
        httpService.getData(JYApi.findInvitedCode, 'post', {
            params: JSON.stringify({})
        }, function (res) {
            if (res.status == "S") {
                $scope.invitedCode = res.invitedCode;
            }
        })
    };
    $scope.findInvitedCode();
    const timer = 300;
    const move = -500;
    $scope.showQrCode = function (text, id, w, h) {
        document.getElementById(id).innerHTML = '';
        new QRCode(document.getElementById(id), {
            text: locals.baseUrl() + '/wap/#/invitedScan?employeeNumber=' + text,
            width: w,
            height: h,
            colorDark: "#000",
            colorLight: "#fff"
        });
    };
    $scope.showInvitedScan = function (tit, text, id, w, h, u) {
        if (text) {
            $scope.myPopup = $ionicPopup.show({
                title: ' <div  class="login-img invited-img"><img src=' + u + '></div><span class="invited-name">' + tit + '</span><span class="qrBtn" id="aa"><i class="jyicon">&#xe65c;</i></span>',
                template: `<div style="margin-top: 10px;margin-bottom: 20px" id=${id}></div>`,
                cssClass: 'qrCodeTip'
            });
            $timeout(function () {
                $scope.showQrCode(text, id, w, h);
                $ionicGesture.on('tap', function () {
                    $('.qrCodeTip').animate({top: move, opacity: 0}, timer, function () {
                        $(this).remove();
                        $scope.myPopup.close();
                    });
                    $ionicBackdrop.release();
                }, angular.element(document.querySelector('.qrBtn')));
            }, 0)
        } else {
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '小主，您不是内部员工 !'
            });
            $timeout(function () {
                myPopup.close();
            }, 1000);
        }
    }
});

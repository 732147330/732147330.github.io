/**
 * Created by xiongshengzhong on 16/8/18.
 * 2017.1.4 增加座位图 AreaCategoryCode字段
 * 2017.1.9 修复ticketInformation返回报undefined
 * 2017.2.9 0:空座,1:已售,2:保留座位 (影院保留座),3:特殊座位 (轮椅座),5:坏座 (座位损坏，无法出售),7 – 特殊保留座 (可理解为无法销售的座位)
 */
'use strict';
app.controller('selectSeatCtrl', function ($scope, $rootScope, httpService, JYApi, $ionicViewSwitcher, myhrefService, $http, $cordovaStatusbar, $cordovaToast, $interval, $stateParams, $cordovaProgress, $state, $ionicPopup, $ionicScrollDelegate, $ionicSlideBoxDelegate, $timeout, $filter, $ionicModal, $ionicBackdrop) {
    $scope.movieId = $stateParams.movieId;
    $scope.filmIdAlt = $stateParams.filmIdAlt;
    $scope.theatreId = $stateParams.theatreId;
    $scope.scheduleTime = $stateParams.scheduleTime;

    $scope.sessionOutId = $stateParams.sessionOutId;
    $scope.cinemaOuterId = $stateParams.cinemaOuterId;
    $scope.curIndex = Number($stateParams.curIndex);
    $scope.seats = [];
    $scope.selSeatData = [];
    $scope.seatData = [];
    $scope.seatObj = [];
    $scope.seatSize = 26;
    $scope.String = String;
    $scope.Number = Number;
    $scope.data = {bindTel: ''};
    //选座小视窗控制
    $scope.changeViewStatus = function () {
        $scope.viewFlag = true;
        $timeout(function () {
            $scope.viewFlag = false;
        }, 1000);
    };
    $scope.changeViewStatus();
    //解决跨时区问题
    $scope.getTime1 = function (timti) {
        //获得当前运行环境时间
        var d = timti, currentDate = timti, tmpHours = currentDate.getHours();
        //算得时区
        var time_zone = -d.getTimezoneOffset() / 60;
        //少于0的是西区 西区应该用时区绝对值加京八区 重新设置时间（西区时间比东区时间早 所以加时区间隔）
        if (time_zone < 0) {
            time_zone = Math.abs(time_zone) + 8;
            currentDate.setHours(tmpHours + time_zone);
        } else {
            //大于0的是东区  东区时间直接跟京八区相减
            time_zone -= 8;
            currentDate.setHours(tmpHours - time_zone);
        }
        return currentDate;
    };
    $scope.formatTimeHM = function (timeStr) {
        var timti = new Date(parseInt(timeStr));
        var tim = $scope.getTime1(timti);
        var h = tim.getHours();
        var m = tim.getMinutes();
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return h + ':' + m;
    };

    var myDate = $scope.getTime1(new Date());
    if ($scope.scheduleTime.split('-')[2] > myDate.getDate()) {
        $scope.showScheduleTime = true;
        $timeout(function () {
            $scope.showScheduleTime = false;
        }, 5000)
    }
    //获取影片排期信息
    $scope.getFilmSchedule = function (filmId, cinemaId, date) {
        httpService.getData(JYApi.findItemSku, 'post', {
            params: JSON.stringify({
                "cinemaId": cinemaId,
                "filmIdAlt": filmId,
                "type": "queryItemSku",
                "showtime": date,
                "memberLevelName": localStorage.userInfo ? JSON.parse(localStorage.userInfo).level : ''
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.currentScheduleData = res.data;
                $scope.HourMin = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex].showtime);
                if ($scope.curIndex > 0) {
                    $scope.HourMinUp = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex - 1].showtime);
                }
                if ($scope.curIndex + 1 != res.data.length) {
                    $scope.HourMinDown = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex + 1].showtime);
                }
                $scope.ticketInformation = $scope.currentScheduleData[$scope.curIndex].ticketInformation ? $scope.currentScheduleData[$scope.curIndex].ticketInformation : '您选择的影片是' + $scope.code + '影片,请自备3D眼镜,或在影院前台购买!';
                $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId, $scope.currentScheduleData[$scope.curIndex].skuId);
                $scope.tips($scope.currentScheduleData[$scope.curIndex].sessionAttribute);
            }
        });
    };
    //获取快码值
    $scope.findLookupCode = function () {
        httpService.getData(JYApi.findLookupCode, 'post', {
            params: JSON.stringify({
                lookupType: 'SESSION_SHOW_ATTRIBUTE',
                type: "ordinary"
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.code = res.data[0].meaning;
            }
        });
    };
    $scope.findLookupCode();
    //获取座位图
    $scope.getSeatInfo = function (cinemaOutId, sessionOutId, skuId) {
        httpService.getData(JYApi.findCinPlanSeatDetails, 'post', {
            params: JSON.stringify({
                "sessionId": sessionOutId,
                cinemaOutId: cinemaOutId,
                skuId: skuId
            })
        }, function (res) {
            $scope.seatFlag = true;
            if (res.status == "S") {
                $scope.rows = res.data.rowSize;
                $scope.cols = res.data.maxColumnSize;
                $scope.AreaCategoryCode = res.data.AreaCategoryCode;
                $scope.AreaNumber = res.data.AreaNumber;
                $scope.seatData = res.data.seatMapInfo;
                $scope.contentWidth = $scope.cols * $scope.seatSize;

                //按rowIndex排序
                $scope.seatData = _.sortBy($scope.seatData, function (n) {
                    if (n.data.length > 0) {
                        return n.data[0].rowIndex;
                    } else {
                        return 0;
                    }
                }).reverse();

                //反转座位
                angular.forEach($scope.seatData, function (value, key) {
                    value.data = value.data.reverse();
                });

                for (var i = 0; i < $scope.rows; i++) {
                    if ($scope.seatData.length <= i) {
                        $scope.seatData.push({data: []});
                    }
                }
                angular.forEach($scope.seatData, function (value, key) {
                    if (value.data.length > 0) {
                        var emptyRows = false;
                        angular.forEach(value.data, function (v, k) {
                            if ($scope.rows - v.rowIndex != key) {
                                emptyRows = true;
                            }

                        });
                        if (emptyRows) {
                            $scope.seatData.splice(key, 0, {
                                data: []
                            });
                        }
                    }
                });
                angular.forEach($scope.seatData, function (value, key) {
                    for (var i = 0; i < $scope.cols; i++) {
                        if (!value.data[i] || value.data[i].columnIndex != $scope.cols - (i + 1)) {
                            value.data.splice(i, 0, {
                                columnIndex: '',
                                id: '',
                                physicalName: '',
                                rowIndex: '',
                                status: ""
                            });
                        }
                        //判断情侣座
                        if (value.data[i].partnerSeat) {
                            if (value.data[i].columnIndex > value.data[i].partnerSeat.columnIndex) {
                                value.data[i].loveSeat = 'L';
                            } else {
                                value.data[i].loveSeat = 'R';
                            }
                        } else {
                            value.data[i].loveSeat = 'N';
                        }
                    }
                });
                $scope.ableSeatData = [];
                angular.forEach($scope.seatData, function (value, key) {
                    var flag = 0;
                    angular.forEach(value.data, function (v, k) {
                        v.flag = 'N';
                        if (v.columnIndex >= 0) {

                        } else {
                            flag++;
                        }
                        if (v.physicalName) {
                            value.singleRow = v.physicalName;
                        }
                    });
                    if (flag != $scope.cols) {
                        $scope.ableSeatData.push(value);
                    }
                });
                $scope.selSeatData = [];
                $scope.alignSeat();
                $ionicScrollDelegate.$getByHandle('small').zoomTo(1, true, 0, 0);
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

    //显示提示
    $scope.tips = function (type) {
        if (type.indexOf($scope.code) >= 0 && $scope.currentScheduleData[$scope.curIndex].isDisGlasses != 'Y') {
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: $scope.filmIdAlt == '893' ? $scope.ticketInformation + ' 小学生及学龄前儿童应在家长陪同下观看。' : $scope.ticketInformation,
                buttons: [
                    {
                        text: languageSetting.hasKnown,
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                        }
                    }
                ]
            });
        } else {
            if ($scope.filmIdAlt == '893') {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: $scope.currentScheduleData[$scope.curIndex].ticketInformation ? $scope.currentScheduleData[$scope.curIndex].ticketInformation + ' 小学生及学龄前儿童应在家长陪同下观看。' : ' 小学生及学龄前儿童应在家长陪同下观看。',
                    buttons: [
                        {
                            text: languageSetting.hasKnown,
                            type: 'button-calm',
                            onTap: function (e) {
                                myPopup.close();
                            }
                        }
                    ]
                });
            }
        }
    };
    var seatInitData = $scope.seatData;
    //获取座位图片
    $scope.findImages = function () {
        httpService.getData(JYApi.findImages, 'post', {
            params: JSON.stringify({
                "targetId": $scope.movieId,
                targetType: 'FILM_SEAT_SELECTION',
                imgChannel: 'COMMON'
            })
        }, function (res) {
            if (res.status == 'S') {
                $scope.seatimgData = res.data;
                for (var i = 0; i < (6 - res.data.length); i++) {
                    angular.forEach(res.data, function (v, k) {
                        $scope.seatimgData.push(v)
                    })
                }
            }
        })
    };
    $scope.findImages();
    //获取已选座位
    $scope.getSeat = function (obj) {
        $scope.selSeatData = obj;
        $scope.seatFormat = '';
        $scope.seatFormat2 = [];
        $scope.seatFormat3 = [];
        $scope.seatFormat4 = '';
        angular.forEach(obj, function (value, key) {
            angular.forEach($scope.seatimgData, function (v, k) {
                if (key == k) {
                    value.url = v.url
                }
            })
        });
        angular.forEach($scope.seatData, function (value, key) {
            angular.forEach(value.data, function (v, k) {
                angular.forEach(obj, function (v1, k1) {
                    if (v.rowIndex == v1.rowIndex && v.columnIndex == v1.columnIndex) {
                        v.url = v1.url
                    }
                })
            })
        });
        angular.forEach($scope.selSeatData, function (value, key) {
            //value.physicalName=value.physicalName<65?value.physicalName:$scope.String.fromCharCode(value.physicalName);
            var formatPhysicalName = value.physicalName < 65 ? value.physicalName : $scope.String.fromCharCode(value.physicalName);
            $scope.seatFormat += (formatPhysicalName + languageSetting.row + value.id + languageSetting.col) + ',';
            $scope.seatFormat2.push({
                columnIndex: value.columnIndex,
                id: value.id,
                physicalName: value.physicalName,
                rowIndex: value.rowIndex
            });
            $scope.seatFormat3.push({
                AreaCategoryCode: $scope.AreaCategoryCode,
                AreaNumber: $scope.AreaNumber,
                RowIndex: value.rowIndex,
                ColumnIndex: value.columnIndex
            });
            $scope.seatFormat4 += value.seatCode + ',';
        });
        $scope.seatFormat = $scope.seatFormat.substring(0, $scope.seatFormat.length - 1);
        $scope.seatFormat4 = $scope.seatFormat4.substring(0, $scope.seatFormat4.length - 1);

    };
    //锁座生成订单
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
                $scope.seatSubmit($scope.selSeatData)
            } else {
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };
    $scope.hide = function () {
        $scope.needBind = false;
        $scope.WXneedBind = false;
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
                imgCode: $scope.bindPhone.captcha1
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
    $scope.seatSubmit = function (obj) {
        $scope.activityObj = obj;
        $scope.data.bindTel = '';
        if (!localStorage.userInfo) {
            $scope.needBind = true;
        } else {
            if ($scope.selSeatData.length == 0) {
                return;
            }
            if (!JSON.parse(localStorage.userInfo).mobileNumber) {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: languageSetting.unBindphone,
                    buttons: [
                        {
                            text: languageSetting.bindLater,
                            type: 'button-default',
                            onTap: function () {
                                myPopup.close();
                            }
                        },
                        {
                            text: languageSetting.bindNow,
                            type: 'button-calm',
                            onTap: function (e) {
                                myPopup.close();
                                $state.go('changePhoneStep2');
                            }
                        }
                    ]
                });
            } else {
                httpService.getData(JYApi.findOrderDetailInfo, 'post', {
                    params: JSON.stringify({
                        memberId: JSON.parse(localStorage.userInfo).memberId,
                        type: 'unpaid'
                    })
                }, function (res) {
                    if (res.status == "S") {
                        if (res.data.length > 0) {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert',
                                template: languageSetting.unPay,
                                buttons: [
                                    {
                                        text: languageSetting.pay,
                                        type: 'button-calm',
                                        onTap: function (e) {
                                            myPopup.close();
                                            $state.go('myTickets', {obj: 2});
                                        }
                                    }
                                ]
                            });
                        } else {
                            //校验锁座规则
                            var params = {
                                selectedSeats: $scope.seatFormat2,
                                cinemaOuterId: $scope.currentScheduleData[$scope.curIndex].cinemaOuterId,
                                sessionOutId: $scope.currentScheduleData[$scope.curIndex].sessionOutId
                            };
                            httpService.getData(JYApi.checkSeatsRule, 'post', {
                                params: JSON.stringify(params)
                            }, function (res) {
                                if (res.status == 'S') {
                                    $scope.currentScheduleData[$scope.curIndex].seatFormat = $scope.seatFormat;
                                    $scope.currentScheduleData[$scope.curIndex].seatFormat2 = $scope.seatFormat2;
                                    $scope.currentScheduleData[$scope.curIndex].seatFormat3 = $scope.seatFormat3;
                                    $scope.currentScheduleData[$scope.curIndex].seatFormat4=$scope.seatFormat4;
                                    sessionStorage.currentScheduleData = JSON.stringify($scope.currentScheduleData[$scope.curIndex]);//缓存排期数据
                                    $state.go('queryOrder', {
                                        obj: JSON.stringify(obj),
                                        showtime: $scope.currentScheduleData[$scope.curIndex].showtime,
                                        filmName: $scope.currentScheduleData[$scope.curIndex].filmName,
                                        filmId: $scope.currentScheduleData[$scope.curIndex].filmId,
                                        price: $scope.currentScheduleData[$scope.curIndex].priceincents,
                                        skuId: $scope.currentScheduleData[$scope.curIndex].skuId,
                                        areaName: $scope.currentScheduleData[$scope.curIndex].areaName,
                                        cinemaName: $scope.currentScheduleData[$scope.curIndex].cinemaName,
                                        screenName: $scope.currentScheduleData[$scope.curIndex].screenName,
                                        surchargeAmount: $scope.currentScheduleData[0].surchargeAmount
                                    });
                                } else {
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert jyAlert1',
                                        template: res.msg
                                    });
                                    $timeout(function () {
                                        myPopup.close();
                                    }, 3000);
                                }
                            }, 2);
                        }
                    }
                });
            }
        }
    };
    $scope.changeCurIndex = function (index) {
        console.log(index);
        $scope.curIndex = index;
        $scope.selSeatData = [];
        angular.forEach($scope.seatData, function (v, k) {
            angular.forEach(v.data, function (value, key) {
                if (value.flag == 'Y') {
                    value.flag = 'N';
                }
            });
        });
        $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId, $scope.currentScheduleData[$scope.curIndex].skuId);
        $scope.tips($scope.currentScheduleData[$scope.curIndex].screenTypeInfo);
        $scope.hideModal();
    };
    //切换上一场
    $scope.showPrev = function () {
        if ($scope.selSeatData.length > 0) {
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: languageSetting.cancelSelectSeat + '?',
                buttons: [
                    {
                        text: languageSetting.cancel,
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
                            $scope.curIndex = Number($scope.curIndex - 1);
                            $scope.HourMin = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex].showtime);
                            if ($scope.curIndex > 0) {
                                $scope.HourMinUp = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex - 1].showtime);
                            }
                            if ($scope.curIndex + 1 != $scope.currentScheduleData.length) {
                                $scope.HourMinDown = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex + 1].showtime);
                            }
                            $scope.selSeatData = [];
                            $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId, $scope.currentScheduleData[$scope.curIndex].skuId);
                            $scope.tips($scope.currentScheduleData[$scope.curIndex].screenTypeInfo);
                        }
                    }
                ]
            });
        } else {
            $scope.curIndex = Number($scope.curIndex - 1);
            $scope.HourMin = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex].showtime);
            if ($scope.curIndex > 0) {
                $scope.HourMinUp = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex - 1].showtime);
            }
            if ($scope.curIndex + 1 != $scope.currentScheduleData.length) {
                $scope.HourMinDown = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex + 1].showtime);
            }
            $scope.selSeatData = [];
            $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId, $scope.currentScheduleData[$scope.curIndex].skuId);
            $scope.tips($scope.currentScheduleData[$scope.curIndex].screenTypeInfo);
        }
    };
    //切换下一场
    $scope.showNext = function () {
        if ($scope.selSeatData.length > 0) {
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: languageSetting.cancelSelectSeat + '?',
                buttons: [
                    {
                        text: languageSetting.cancel,
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
                            $scope.curIndex = Number($scope.curIndex + 1);
                            $scope.HourMin = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex].showtime);
                            $scope.HourMinUp = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex - 1].showtime);
                            if ($scope.curIndex + 1 != $scope.currentScheduleData.length) {
                                $scope.HourMinDown = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex + 1].showtime);
                            }
                            $scope.selSeatData = [];
                            $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId, $scope.currentScheduleData[$scope.curIndex].skuId);
                            $scope.tips($scope.currentScheduleData[$scope.curIndex].screenTypeInfo);
                        }
                    }
                ]
            });
        } else {
            $scope.curIndex = Number($scope.curIndex + 1);
            $scope.HourMin = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex].showtime);
            $scope.HourMinUp = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex - 1].showtime);
            if ($scope.curIndex + 1 != $scope.currentScheduleData.length) {
                $scope.HourMinDown = $scope.formatTimeHM($scope.currentScheduleData[$scope.curIndex + 1].showtime);
            }
            $scope.selSeatData = [];
            $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId, $scope.currentScheduleData[$scope.curIndex].skuId);
            $scope.tips($scope.currentScheduleData[$scope.curIndex].screenTypeInfo);
        }
    };
    $scope.changeSeatTimes = function (e, flag) {
        $scope.activityShow = flag == 'screen' ? false : true;
        $scope.modal.show();
        $ionicBackdrop.retain();
        e.stopPropagation();
        $(document).one("click", function () {
            $scope.hideModal();
        });
    };
    $scope.hideModal = function () {
        $scope.modal.hide();
        $ionicBackdrop.release();
    };
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $ionicModal.fromTemplateUrl('templates/modal5.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
    });
    //座位图居中
    $scope.alignSeat = function () {
        $scope.clientWidth = $ionicScrollDelegate.$getByHandle('small').getScrollView().__clientWidth;
        $scope.contentWidth = $scope.cols * $scope.seatSize;
        $timeout(function () {
            if ($scope.contentWidth > $scope.clientWidth) {
                $('.centerLine').css('left', $scope.contentWidth / 2 + 20 + 'px');
                $('.sideBar').css('left', ($scope.contentWidth + 20 - $scope.clientWidth) / 2 + 'px');
                $ionicScrollDelegate.$getByHandle('small').scrollTo(($scope.contentWidth + 20 - $scope.clientWidth) / 2, 0, true);
            } else {
                $('.centerLine').css('left', $scope.clientWidth / 2 + 10 + 'px');
                $('.sideBar').css('left', 0);
            }
            $ionicSlideBoxDelegate.update();
        }, 500);
    };

    $scope.getScrollLeft = function () {
        $scope.zoom = $ionicScrollDelegate.$getByHandle('small').getScrollPosition().zoom;
        $('.sideBar').css('left', $ionicScrollDelegate.$getByHandle('small').getScrollPosition().left / $scope.zoom + 'px');
    };

    $scope.$on("$ionicView.enter", function (event, data) {
        if ($rootScope.isMobile) {
            $cordovaStatusbar.style(0);
        }
        $scope.getFilmSchedule($scope.filmIdAlt, $scope.theatreId, $scope.scheduleTime);

    });
    $scope.$on("$ionicView.leave", function (event, data) {
        $scope.autoSideBar = null;
    });
    $scope.goLogin = function () {
        $scope.needBind = false;
        $state.go('login', {viewName: 'selectSeat', urlParams: JSON.stringify($stateParams)});
        $ionicViewSwitcher.nextDirection("none")
    }


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
                                $scope.needBind = false;
                                $scope.findMember(res.data.memberId);
                            } else if (res.status == '201') {
                                $scope.needBind = false;
                                $scope.WXneedBind = true;
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
                    $scope.WXneedBind = false;
                    var userInfo = res.data;
                    userInfo.token = res.token;
                    $rootScope.userInfo = userInfo;
                    localStorage.userInfo = JSON.stringify(userInfo);
                    localStorage.cacheTime = new Date().getTime();//缓存时间
                    $scope.findMember(res.data.memberId);
                } else {
                    $cordovaToast.showShortCenter(res.msg);
                }
            }, 2);
        }
    };

});

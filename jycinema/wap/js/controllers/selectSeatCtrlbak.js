/**
 * Created by xiongshengzhong on 16/8/18.
 * 2017.1.4 增加座位图 AreaCategoryCode字段
 * 2017.1.9 修复ticketInformation返回报undefined
 * 2017.2.9 0:空座,1:已售,2:保留座位 (影院保留座),3:特殊座位 (轮椅座),5:坏座 (座位损坏，无法出售),7 – 特殊保留座 (可理解为无法销售的座位)
 */
'use strict';
app.controller('selectSeatCtrl', function ($scope, $rootScope, httpService, JYApi, myhrefService, $cordovaStatusbar, $interval, $stateParams, $cordovaProgress, $state, $ionicPopup, $ionicScrollDelegate, $ionicSlideBoxDelegate, $timeout, $filter, $ionicModal, $ionicBackdrop) {
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
                $scope.ticketInformation = $scope.currentScheduleData[$scope.curIndex].ticketInformation ? $scope.currentScheduleData[$scope.curIndex].ticketInformation : '您选择的影片是' + $scope.code + '影片,请自备3D眼镜,或在影院前台购买!';
                $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId);
                $scope.tips($scope.currentScheduleData[$scope.curIndex].sessionAttribute);
            }
        }, 2);
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
    $scope.getSeatInfo = function (cinemaOutId, sessionOutId) {
        httpService.getData(JYApi.findCinPlanSeatDetails, 'post', {
            params: JSON.stringify({
                "sessionId": sessionOutId,
                cinemaOutId: cinemaOutId
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.rows = res.data.rowSize;
                $scope.cols = res.data.maxColumnSize;
                $scope.AreaCategoryCode = res.data.AreaCategoryCode;
                $scope.AreaNumber = res.data.AreaNumber;
                $scope.seatData = res.data.seatMapInfo;
                $scope.contentWidth = $scope.cols * $scope.seatSize;

                //按rowIndex排序
                $scope.seatData=_.sortBy($scope.seatData,function(n){
                    if(n.data.length>0){
                        return n.data[0].rowIndex;
                    }else{
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
        }, 1,'加载中');
    };

    //显示提示
    $scope.tips = function (type) {
      if (type.indexOf($scope.code) >= 0 && $scope.currentScheduleData[$scope.curIndex].isDisGlasses != 'Y') {
        var myPopup = $ionicPopup.show({
          title: languageSetting.tip,
          cssClass: 'jyAlert jyAlert1',
          template: $scope.filmIdAlt=='893'?$scope.ticketInformation+' 小学生及学龄前儿童应在家长陪同下观看。':$scope.ticketInformation,
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
      }else{
        if($scope.filmIdAlt=='893'){
          var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: $scope.currentScheduleData[$scope.curIndex].ticketInformation ? $scope.currentScheduleData[$scope.curIndex].ticketInformation+' 小学生及学龄前儿童应在家长陪同下观看。': ' 小学生及学龄前儿童应在家长陪同下观看。',
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

    //获取已选座位
    $scope.getSeat = function (obj) {
        $scope.selSeatData = obj;
        $scope.seatFormat = '';
        $scope.seatFormat2 = [];
        $scope.seatFormat3 = [];
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
        });
        $scope.seatFormat = $scope.seatFormat.substring(0, $scope.seatFormat.length - 1);
    };
    //锁座生成订单
    $scope.seatSubmit = function (obj) {
        $scope.activityObj=obj;
        $scope.data.bindTel = '';
        if (!localStorage.userInfo) {
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: languageSetting.unlogin,
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
                            $state.go('login', {viewName: 'selectSeat', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
            return;
        }
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
                        //加载活动选择
                        var params = {
                            Qty: $scope.seatFormat2.length,
                            cinemaId: $scope.currentScheduleData[$scope.curIndex].cinemaId,
                            cinemaOuterId: $scope.currentScheduleData[$scope.curIndex].cinemaOuterId,
                            filmId: $scope.currentScheduleData[$scope.curIndex].filmId,
                            priceincents: $scope.currentScheduleData[$scope.curIndex].priceincents,
                            screenId: $scope.currentScheduleData[$scope.curIndex].screenId,
                            sessionAttribute: $scope.currentScheduleData[$scope.curIndex].sessionAttribute,
                            sessionOutId: $scope.currentScheduleData[$scope.curIndex].sessionOutId,
                            showtime: $filter('date')($scope.currentScheduleData[$scope.curIndex].showtime, 'yyyy-MM-dd HH:mm:ss'),
                            selectedSeats: $scope.seatFormat2,
                            memberLevel:JSON.parse(localStorage.userInfo).level
                        };

                        httpService.getData(JYApi.queryActivityInfo, 'post', {
                            params: JSON.stringify(params)
                        }, function (res) {
                          if(res.status=='S'){
                            if(res.data.activityInfo.length>0){
                              angular.forEach(res.data.activityInfo,function(value,key){
                                if(!value.tag){
                                  value.tag='特惠活动';
                                  value.bookingType='ACTIVITY';
                                }
                              });
                            }
                            if(res.data.HasCrad=='N'){
                              if(res.data.activityInfo.length==0){
                                //无活动可选
                                $scope.buildOrder();
                              }else{
                                $scope.ableActivityData=res.data.activityInfo;
                                $scope.ableActivityData.push({
                                  newPriceincents:$scope.currentScheduleData[$scope.curIndex].priceincents/100,
                                  promotionalCopy:'正常购票',
                                  ruleHeaderId:'',
                                  ruleDesc:'',
                                  ruleName:'',
                                  lightingFlag:'Y',
                                  tag:'',
                                  bookingType:''
                                });
                              }
                            }else{
                              $scope.ableActivityData=res.data.activityInfo;
                              $scope.ableActivityData.push({
                                newPriceincents:res.data.priceincents,
                                promotionalCopy:'会员卡购票',
                                ruleHeaderId:'',
                                ruleDesc:'',
                                ruleName:'',
                                lightingFlag:'Y',
                                tag:'会员卡',
                                bookingType:'CARD'
                              });
                              $scope.ableActivityData.push({
                                newPriceincents:$scope.currentScheduleData[$scope.curIndex].priceincents/100,
                                promotionalCopy:'正常购票',
                                ruleHeaderId:'',
                                ruleDesc:'',
                                ruleName:'',
                                lightingFlag:'Y',
                                tag:'',
                                bookingType:''
                              });
                            }
                            if($scope.ableActivityData && $scope.ableActivityData.length>0){
                                for(var i=0;i<$scope.ableActivityData.length;i++){
                                    if($scope.ableActivityData[i].lightingFlag=='Y'){
                                        $scope.minValue=$scope.ableActivityData[i].newPriceincents;
                                        $scope.minKey=i;
                                        break;
                                    }
                                }
                                angular.forEach($scope.ableActivityData,function(value,key){
                                if($scope.minValue>value.newPriceincents && value.lightingFlag=='Y'){
                                  $scope.minValue=value.newPriceincents;
                                  $scope.minKey=key;
                                }
                                value.disabledFlag=value.lightingFlag=='Y'?false:true;
                                });
                                $scope.data.selActivity=$scope.ableActivityData[$scope.minKey];
                                $scope.changeSeatTimes(event);
                            }
                          }else{
                            var myPopup = $ionicPopup.show({
                              title: languageSetting.tip,
                              cssClass: 'jyAlert jyAlert1',
                              template: res.msg
                            });
                            $timeout(function () {
                              myPopup.close();
                            },2000);
                          }

                        },1,'加载中');
                    }
                }
            },1,'加载中');
        }
    };
    $scope.changeCurIndex = function (index) {
        $scope.curIndex = index;
        $scope.selSeatData = [];
        angular.forEach($scope.seatData, function (v, k) {
            angular.forEach(v.data, function (value, key) {
                if (value.flag == 'Y') {
                    value.flag = 'N';
                }
            });
        });
        $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId);
        $scope.tips($scope.currentScheduleData[$scope.curIndex].screenTypeInfo);
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
                            $scope.selSeatData = [];
                            $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId);
                            $scope.tips($scope.currentScheduleData[$scope.curIndex].screenTypeInfo);
                        }
                    }
                ]
            });
        } else {
            $scope.curIndex = Number($scope.curIndex - 1);
            $scope.selSeatData = [];
            $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId);
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
                            $scope.selSeatData = [];
                            $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId);
                            $scope.tips($scope.currentScheduleData[$scope.curIndex].screenTypeInfo);
                        }
                    }
                ]
            });
        } else {
            $scope.curIndex = Number($scope.curIndex + 1);
            $scope.selSeatData = [];
            $scope.getSeatInfo($scope.currentScheduleData[$scope.curIndex].cinemaOuterId, $scope.currentScheduleData[$scope.curIndex].sessionOutId);
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
    $scope.buildOrder=function(){
        //生成订单
        var params = {
            BookingFeeOverride: $scope.currentScheduleData[$scope.curIndex].surchargeAmount,
            orderType: "ORDER",
            memberLevel: JSON.parse(localStorage.userInfo).level,
            memberId: JSON.parse(localStorage.userInfo).memberId,
            memberName: JSON.parse(localStorage.userInfo).mmbName,
            receivePhoneNumber: JSON.parse(localStorage.userInfo).mobileNumber,
            TicketTypes: [
                {
                    TicketTypeCode: $scope.currentScheduleData[$scope.curIndex].tickettypeCode,
                    Qty: $scope.selSeatData.length,
                    PriceInCents: $scope.currentScheduleData[$scope.curIndex].priceincents,
                    BookingFeeOverride: $scope.currentScheduleData[$scope.curIndex].surchargeAmount
                }
            ],
            cinemaId: $scope.currentScheduleData[$scope.curIndex].cinemaId,//cinemaOutId
            cinemaOutId: $scope.currentScheduleData[$scope.curIndex].cinemaOuterId,//cinemaOutId
            sessionId: $scope.currentScheduleData[$scope.curIndex].sessionOutId,//sessionId
            skuId: $scope.currentScheduleData[$scope.curIndex].skuId,//skuid
            filmId: $scope.currentScheduleData[$scope.curIndex].filmId,
            instId: $scope.currentScheduleData[$scope.curIndex].instId,
            filmOutId: $scope.currentScheduleData[$scope.curIndex].filmOuterId,
            sessionAttribute: $scope.currentScheduleData[$scope.curIndex].sessionAttribute,
            screenId: $scope.currentScheduleData[$scope.curIndex].screenId,
            cinemaFinCode: $scope.currentScheduleData[$scope.curIndex].cinemaFinCode,
            cardId: JSON.parse(localStorage.userInfo).membercardId ? JSON.parse(localStorage.userInfo).membercardId : '',
            cardNumber: JSON.parse(localStorage.userInfo).chipNumber ? JSON.parse(localStorage.userInfo).chipNumber : '',
            cardType: "",
            showtime: $filter('date')($scope.currentScheduleData[$scope.curIndex].showtime, 'yyyy-MM-dd HH:mm:ss'),
            totalAmount: $scope.selSeatData.length * $scope.currentScheduleData[$scope.curIndex].priceincents,
            price: $scope.currentScheduleData[$scope.curIndex].priceincents,
            num: $scope.selSeatData.length,
            seatDeatilMessage: $scope.seatFormat,
            selectedSeats: $scope.seatFormat2,
            Seats: $scope.seatFormat3,
            versionNumber: "1.23",
            updateVersion: "1.26",
            bookingType:$scope.data.selActivity?$scope.data.selActivity.bookingType:'',
            activityId: $scope.data.selActivity?$scope.data.selActivity.ruleHeaderId:'',
            screenName:$scope.currentScheduleData[$scope.curIndex].screenName,
            runTime:$scope.currentScheduleData[$scope.curIndex].runTime

        };
        httpService.getData(JYApi.bookingTickets, 'post', {
            params: JSON.stringify(params)
        }, function (res) {
            if (res.status == "S") {
                $state.go('queryOrder', {
                    obj: JSON.stringify($scope.activityObj),
                    showtime: $scope.currentScheduleData[$scope.curIndex].showtime,
                    filmName: $scope.currentScheduleData[$scope.curIndex].filmName,
                    filmId: $scope.currentScheduleData[$scope.curIndex].filmId,
                    price: $scope.currentScheduleData[$scope.curIndex].priceincents,
                    skuId: $scope.currentScheduleData[$scope.curIndex].skuId,
                    areaName: $scope.currentScheduleData[$scope.curIndex].areaName,
                    cinemaName: $scope.currentScheduleData[$scope.curIndex].cinemaName,
                    screenName: $scope.currentScheduleData[$scope.curIndex].screenName,
                    ordNum: res.data,
                    surchargeAmount: $scope.currentScheduleData[0].surchargeAmount
                });
            } else {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: res.msg,
                    buttons: [
                        {
                            text: languageSetting.confirm,
                            type: 'button-calm',
                            onTap: function (e) {
                                myPopup.close();
                            }
                        }
                    ]
                });
            }
        }, 1, languageSetting.lockSeat);
    };
});

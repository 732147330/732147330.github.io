'use strict';
app.controller('mallOrderCtrl', function ($scope, $rootScope, httpService, JYApi, $state, $stateParams, $timeout, $location, $ionicPopup, $ionicBackdrop, $ionicModal) {
    $scope.addressType = [{name: '影院自提', value: 'SINCE_ADDRESS'}, {name: '快递配送', value: 'DELIVERY_ADDRESS'}];
    $scope.currentIndex = 0;
    $rootScope.userInfo = JSON.parse(localStorage.userInfo);
    $scope.commonPriceTotal = 0;
    $scope.endPriceRecommend = 0;
    $scope.endPrice = 0;
    $scope.endSum = 0;
    $scope.otherDataActivict = [];
    $scope.confirmFlag = true;//确认会员章程
    $scope.havingCardFlag='';//确认是否继续购买权益卡
    $scope.$on('$ionicView.leave', function () {
        //sessionStorage.removeItem('cinemaBySkuData');
        //sessionStorage.removeItem('productDetailData');
        //sessionStorage.removeItem('selectArr');
    });
    $scope.deliveryId = $stateParams.id;//配送方式
    $scope.$on('$ionicView.enter', function () {
        $scope.havingCardFlag='';
        if($stateParams.growthSign && $stateParams.growthSign==='Y'){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '您当前权益卡超过500成长值，可免费续卡一年',
                buttons: [{
                    text: '确定',
                    type: 'button-calm',
                    onTap: function (e) {
                    }
                }]
            });
            $timeout(function () {
                myPopup.close();
            },10000);
        }
        if (sessionStorage.cinemaBySkuData) {
            $scope.cinemaBySkuData = JSON.parse(sessionStorage.cinemaBySkuData);
        }
        if ($stateParams.status == "cart") {
            $scope.allflag = $stateParams.allflag;
            $scope.status = 'cart';
            if ($stateParams.allflag == 'true') {
                $scope.productDetailDataArr = JSON.parse(sessionStorage.myCartDataArr);
                $scope.qty = 0;
                $scope.totalAmount = 0;
                $scope.productDetailDataArr.map(function (item) {
                    $scope.qty += item.quantity;
                    $scope.totalAmount += item.price * item.quantity;
                });
                // console.log($scope.productDetailDataArr)
                $scope.valuesData = [];
                angular.forEach($scope.productDetailDataArr, function (value, key) {
                    value.costPrice = value.price * 100;
                    value.qty = value.quantity;
                    $scope.commonPriceTotal += value.quantity * value.price;
                    $scope.valuesData.push({
                        skuId: value.skuId,
                        num: value.quantity
                    });

                });
                $scope.selesParams = $scope.productDetailDataArr;
            } else if ($stateParams.allflag == 'false') {
                if (sessionStorage.selectArr) {
                    $scope.selectData = JSON.parse(sessionStorage.selectArr);
                }
                $scope.productDetailData = JSON.parse(sessionStorage.myCartData);
                $scope.productDetailData.appAbbImg = $scope.productDetailData.accessPath;
                $scope.productDetailData.bnName = $scope.productDetailData.title?$scope.productDetailData.title:'';
                $scope.productDetailData.qty = $scope.productDetailData.quantity;
                $scope.productDetailData.catId = $scope.productDetailData.cartId
                $scope.productDetailData.costPrice = $scope.productDetailData.price * 100
                // console.log($scope.productDetailData)
                // console.log($scope.selectData)
                $scope.valuesData = [];
                $scope.valuesData = [{
                    skuId: $scope.productDetailData.skuId,
                    num: $scope.productDetailData.qty
                }];
                $scope.selesParams = [];
                $scope.selesParams.push($scope.productDetailData);
                $scope.commonPrice = $scope.productDetailData.price;//普通价
                $scope.commonPriceTotal = Number($scope.productDetailData.qty * $scope.productDetailData.price).toFixed(2);//普通价小计
            }
        } else if ($stateParams.status == "product") {
            $scope.allflag = 'false';
            if (sessionStorage.selectArr) {
                $scope.selectData = JSON.parse(sessionStorage.selectArr);
            }
            if (sessionStorage.productDetailData) {
                $scope.productDetailData = JSON.parse(sessionStorage.productDetailData);
            }
            $scope.productDetailData.bnName = $scope.productDetailData.title;
            if ($scope.cinemaBySkuData) {
                $scope.productDetailData.cinemaOuterId = $scope.cinemaBySkuData.cinemaOuterId;
            }
            // console.log(JSON.parse(sessionStorage.productDetailData))
            $scope.totalAmount = $scope.productDetailData.price
            $scope.commonPrice = $scope.productDetailData.price;//普通价
            $scope.commonPriceTotal = Number($scope.productDetailData.qty * $scope.productDetailData.price / 100).toFixed(2);//普通价小计
            if ($scope.productDetailData.skuItemType == 'GROUND_GOODS') {
                //获取地面卖品活动
                // console.log($scope.productDetailData);
                $scope.commonPrice = $scope.productDetailData.price / 100;//普通价
                $scope.commonPriceTotal = Number($scope.productDetailData.qty * $scope.productDetailData.price / 100).toFixed(2);//普通价小计
            }
            $scope.valuesData = [];
            $scope.valuesData = [{
                skuId: $scope.productDetailData.skuId,
                num: $scope.productDetailData.qty
            }];
            $scope.selesParams = [];
            $scope.selesParams.push($scope.productDetailData);
        }
        $scope.mallActivityInfo = function (otherDataActivict) {
            var params = JSON.stringify({
                    cinemaOutId: $scope.productDetailData ? $scope.productDetailData.cinemaOuterId : '',
                    skuItemType: $scope.productDetailData ? $scope.productDetailData.skuItemType : $scope.productDetailDataArr[0].skuItemType,
                    valuesData: $scope.valuesData,
                    otherData: otherDataActivict
            });
            httpService.getData(JYApi.sessionGoodsActivityInfo, 'post', {
                params: params
            }, function (res) {
                if (res.status == "S") {
                    //展示数据
                    $scope.memberVoucherInfoData = [];
                    $scope.ActivityData = res.data;
                    $scope.memberCardInfo = res.data.memberCardInfo;//会员卡信息
                    $scope.activityInfo = res.data.activityInfo;//活动信息
                    $scope.memberVoucherInfo = res.data.memberVoucherInfo;//优惠券信息

                    $scope.memberVoucherInfo.map(function (item) {
                        item.num = 0;
                    });
                    // console.log($scope.memberVoucherInfo)
                    // console.log($scope.memberVoucherInfoData)
                    //计算最低会员价
                    if ($scope.memberCardInfo.HasCrad == 'Y' && $scope.memberCardInfo.hasRemainder == 'Y') {
                        $scope.minMemberCardTotal = Number($scope.productDetailData.qty * $scope.memberCardInfo.priceArray[0].priceincents / 100);//会员价小计
                    } else if ($scope.memberCardInfo.HasCrad == 'Y' && $scope.memberCardInfo.hasRemainder == 'N') {
                        $scope.minMemberCardTotal = 10000;
                        $scope.binding = false;
                    } else if ($scope.memberCardInfo.HasCrad == 'N') {
                        $scope.binding = true;
                        $scope.minMemberCardTotal = 10000;
                    }
                    //计算最低活动价
                    if ($scope.activityInfo.length > 0) {
                        $scope.filterActivityInfo = _.filter($scope.activityInfo, function (item) {
                            return item.lightingFlag == 'Y'
                        });
                        if ($scope.filterActivityInfo.length > 0) {
                            $scope.activityUnable = false;
                            $scope.minActivityArr = [];
                            angular.forEach($scope.filterActivityInfo, function (value, key) {
                                var remainQty = '';
                                value.calcuValue = [];
                                // console.log($scope.selesParams)
                                angular.forEach($scope.selesParams, function (v1, k1) {
                                    v1.sum = 0;
                                    v1.flag = false;
                                    angular.forEach(value.skuArray, function (v2, k2) {
                                        if (v1.skuId == v2.skuId) {
                                            if (v1.qty >= value.discountQty) {
                                                v1.sum += value.discountQty * v2.newPriceincents + (v1.qty - value.discountQty) * v1.costPrice / 100;
                                            } else {
                                                v1.sum += v1.qty * v2.newPriceincents;
                                                remainQty = value.discountQty - v1.qty;
                                            }
                                            //循环其它商品
                                            angular.forEach($scope.selesParams, function (v3, k3) {
                                                if (k1 != k3) {
                                                    var isInSku = false;
                                                    var skuNewPrice = '';
                                                    for (var i = 0; i < value.skuArray.length; i++) {
                                                        if (v3.skuId == value.skuArray[i].skuId) {
                                                            isInSku = true;
                                                            skuNewPrice = value.skuArray[i].newPriceincents;
                                                        }
                                                    }
                                                    if (isInSku) {
                                                        if (v3.qty >= remainQty) {
                                                            v1.sum += remainQty * skuNewPrice + (v3.qty - remainQty) * v3.costPrice / 100;

                                                        } else {
                                                            v1.sum += v3.qty * skuNewPrice;
                                                            remainQty = remainQty - v3.qty;
                                                        }
                                                    } else {
                                                        v1.sum += v3.qty * v3.costPrice / 100;
                                                    }
                                                }
                                            });
                                            v1.flag = true;
                                        }
                                    });
                                    if (v1.flag) {
                                        value.calcuValue.push(v1.sum)
                                    }
                                });
                                value.minValue = _.min(value.calcuValue);
                                $scope.minActivityArr.push(value.minValue);
                            });
                            //console.log($scope.filterActivityInfo)
                            $scope.minActivityValue = _.min($scope.minActivityArr);//
                            $scope.minActivityInfo = _.min($scope.filterActivityInfo, function (item) {
                                return item.minValue
                            });

                        } else {
                            $scope.minActivityInfo = 10000;
                            $scope.minActivityValue = 10000;
                        }
                    } else {
                        $scope.minActivityInfo = 10000;
                        $scope.minActivityValue = 10000;
                    }

                    //计算最低优惠价(卡卷)
                    if ($scope.memberVoucherInfo.length > 0) {
                        $scope.filterMemberVoucherInfo = _.filter($scope.memberVoucherInfo, function (item) {
                            return item.lightingFlag == 'Y'
                        });
                        if ($scope.filterMemberVoucherInfo.length > 0) {
                            $scope.memberVoucherUnable = false;
                            $scope.minMemberVoucherArr = [];
                            angular.forEach($scope.filterMemberVoucherInfo, function (value, key) {
                                var remainQty = '';
                                value.calcuValue = [];
                                angular.forEach($scope.selesParams, function (v1, k1) {
                                    v1.sum = 0;
                                    v1.flag = false;
                                    angular.forEach(value.skuArray, function (v2, k2) {
                                        if (v1.skuId == v2.skuId) {
                                            if (v1.qty >= value.speciesCodeNum) {
                                                v1.sum += value.speciesCodeNum * v2.newPriceincents + (v1.qty - value.speciesCodeNum) * v1.costPrice / 100;
                                            } else {
                                                v1.sum += v1.qty * v2.newPriceincents;
                                                remainQty = value.speciesCodeNum - v1.qty;
                                            }
                                            //循环其它商品
                                            angular.forEach($scope.selesParams, function (v3, k3) {
                                                if (k1 != k3) {
                                                    var isInSku = false;
                                                    var skuNewPrice = '';
                                                    for (var i = 0; i < value.skuArray.length; i++) {
                                                        if (v3.skuId == value.skuArray[i].skuId) {
                                                            isInSku = true;
                                                            skuNewPrice = value.skuArray[i].newPriceincents;
                                                        }
                                                    }
                                                    if (isInSku) {
                                                        if (v3.qty >= remainQty) {
                                                            v1.sum += remainQty * skuNewPrice + (v3.qty - remainQty) * v3.costPrice / 100;

                                                        } else {
                                                            v1.sum += v3.qty * skuNewPrice;
                                                            remainQty = remainQty - v3.qty;
                                                        }
                                                    } else {
                                                        v1.sum += v3.qty * v3.costPrice / 100;
                                                    }
                                                }
                                            });
                                            v1.flag = true;
                                        }
                                    });
                                    if (v1.flag) {
                                        value.calcuValue.push(v1.sum)
                                    }
                                });
                                value.minValue = _.min(value.calcuValue);
                                $scope.minMemberVoucherArr.push(value.minValue);
                                $scope.usingCount = value.calcuValue.length;
                            });
                            $scope.minMemberVoucherValue = _.min($scope.minMemberVoucherArr);//
                            $scope.minMemberVoucherInfo = _.min($scope.filterMemberVoucherInfo, function (item) {
                                return item.minValue
                            });
                        } else {
                            $scope.minMemberVoucherInfo = 10000;
                            $scope.minMemberVoucherValue = 10000;
                            $scope.bindingVoucher = false;
                        }
                    } else {
                        $scope.minMemberVoucherInfo = 10000;
                        $scope.minMemberVoucherValue = 10000;
                        $scope.bindingVoucher = true;
                    }


                    //最终的优惠价
                    // console.log($scope.commonPriceTotal);
                    // console.log($scope.minMemberCardTotal);
                    // console.log($scope.minActivityValue);
                    // console.log($scope.minMemberVoucherValue);


                    $scope.minPrice = Math.min($scope.commonPriceTotal, $scope.minMemberCardTotal, $scope.minActivityValue, $scope.minMemberVoucherValue);
                    $scope.discount = Number($scope.commonPriceTotal - $scope.minPrice).toFixed(2);
                    angular.forEach($scope.filterActivityInfo, function (value, key) {
                        if (value.minValue == $scope.minPrice) {
                            $scope.minActivityInfo = value;
                        }
                    });
                    angular.forEach($scope.filterMemberVoucherInfo, function (value, key) {
                        if (value.minValue == $scope.minPrice) {
                            $scope.minMemberVoucherInfo = value;
                        }
                    });
                    if ($scope.minPrice == 10000) {
                        $scope.selIndex = 0;
                        $scope.minPrice = $scope.commonPriceTotal;
                    } else {
                        if ($scope.minMemberCardTotal == $scope.minPrice) {
                            $scope.selIndex = 1;
                        } else if ($scope.minActivityValue == $scope.minPrice) {
                            $scope.selIndex = 2;
                            $scope.tuijianActivityInfoId = $scope.minActivityInfo.ruleHeaderId;
                        } else if ($scope.minMemberVoucherValue == $scope.minPrice) {
                            $scope.selIndex = 3;
                        } else {
                            $scope.selIndex = 0;
                            $scope.minPrice = $scope.commonPriceTotal;
                        }
                    }
                    // console.log($scope.minPrice)
                    // console.log($scope.endPriceRecommend)
                    $scope.endPrice = Number($scope.endPriceRecommend) + Number($scope.minPrice);
                    if($stateParams.growthSign && $stateParams.growthSign==='Y'){
                        $scope.endPrice = 0;
                    }
                    $scope.endpostFeeTotal = Number($scope.postFeeTotal) + Number($scope.endPrice);

                }
            });
        };
        $scope.mallActivityInfo();
        $scope.findMemberAddress();
        $scope.findRecommendGoods();
    });
    //购物数量控制
    $scope.add = function () {
        $scope.productDetailData.qty++;
        $scope.commonPriceTotal = Number($scope.productDetailData.qty * $scope.productDetailData.price / 100).toFixed(2);//普通价小计
        $scope.minPrice = $scope.commonPriceTotal;
        if ($scope.selIndex == 2) {
            $scope.currentShowIndex = 1;
            $scope.showModal(1);
            $scope.confirm();
        } else if ($scope.selIndex == 3) {
            $scope.currentShowIndex = 2;
            $scope.showModal(2);
            $scope.confirm();
        }


    };
    $scope.reduce = function () {
        if ($scope.productDetailData.qty > 0) {
            $scope.productDetailData.qty--;
            $scope.commonPriceTotal = Number($scope.productDetailData.qty * $scope.productDetailData.price / 100).toFixed(2);//普通价小计
            $scope.minPrice = $scope.commonPriceTotal;
            if ($scope.selIndex == 2) {
                $scope.currentShowIndex = 1;
                $scope.showModal(1);
                $scope.confirm();
            } else if ($scope.selIndex == 3) {
                $scope.currentShowIndex = 2;
                $scope.showModal(2);
                $scope.confirm();
            }
        }
    };
    $scope.params = {};



    //提交订单
    $scope.buildOrder = function () {
        if($stateParams.growthSign && $stateParams.growthSign==='Y'){
            httpService.getData(JYApi.saveEquitycard, 'post', {
                params:JSON.stringify({
                    equitycardInfoId: $stateParams.cardId
                })
            }, function (res) {
                if(res.status === 'S'){
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 续卡成功',
                        buttons: [{
                            text: '确定',
                            type: 'button-calm',
                            onTap: function (e) {
                                $state.go('myRightsCard');
                            }
                        }]
                    });
                    $timeout(function () {
                        myPopup.close();
                        $state.go('myRightsCard');
                    },10000);
                }else {
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: res.msg,
                        buttons: [{
                            text: '确定',
                            type: 'button-calm',
                            onTap: function (e) {
                                $state.go('myRightsCard');
                            }
                        }]
                    });
                    $timeout(function () {
                        myPopup.close();
                        $state.go('myRightsCard');
                    },10000);
                }
            });
            return;
        }
        if ($stateParams.status == "cart" && $stateParams.allflag == 'true') {
            if (!$scope.deliveryId && $scope.productDetailDataArr[0].skuItemType != 'GROUND_GOODS') {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '请您选择配送方式'
                });
                $timeout(function () {
                    myPopup.close();
                }, 1000);
                return;
            }
            if (!$scope.addressListDefault && !$scope.addressListSelect && $scope.productDetailDataArr[0].skuItemType != 'GROUND_GOODS') {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '请您选择配送地址'
                });
                $timeout(function () {
                    myPopup.close();
                }, 1000);
                return;
            }
        } else {
            if (!$scope.deliveryId && $scope.productDetailData.skuItemType != 'GROUND_GOODS' && $scope.productDetailData.skuItemType != 'ONLINE_VIRTUAL_GOODS') {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '请您选择配送方式'
                });
                $timeout(function () {
                    myPopup.close();
                }, 1000);
                return;
            }
            if (!$scope.addressListDefault && !$scope.addressListSelect && $scope.productDetailData.skuItemType != 'GROUND_GOODS' && $scope.productDetailData.skuItemType != 'ONLINE_VIRTUAL_GOODS') {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '请您选择配送地址'
                });
                $timeout(function () {
                    myPopup.close();
                }, 1000);
                return;
            }
        }
        $scope.otherData = [];
        angular.forEach($scope.categoryListNewData, function (v, k) {
            var tt = {};
            if (v.salesQty > 0) {
                tt.skuId = v.sourceId;
                tt.num = v.salesQty;
                $scope.otherData.push(tt)
            }
        });
        // console.log($scope.otherData)
        $scope.speciesCode = $scope.minMemberVoucherInfo.speciesCode;
        if ($scope.selIndex == 1) {
            $scope.bookingType = 'CARD';
        } else if ($scope.selIndex == 2) {
            $scope.activityId = $scope.minActivityInfo.ruleHeaderId;
            $scope.bookingType = 'ACTIVITY';
        } else if ($scope.selIndex == 3) {
            $scope.activityId = $scope.minMemberVoucherInfo.voucherRuleId;
            $scope.bookingType = 'VOUCHER';
        } else {
            $scope.bookingType = ''
        }
        var params;
        if ($stateParams.status == "cart") {
            if ($stateParams.allflag == 'true') {
                var fromCartDataArr = [];
                $scope.productDetailDataArr.map(function (item) {
                    var obj = {
                        cartId: item.cartId
                    };
                    fromCartDataArr.push(obj)
                });
                params = JSON.stringify({
                    memberId: $scope.userInfo.memberId ? $scope.userInfo.memberId : '',
                    memberName: $scope.userInfo.mmbName ? $scope.userInfo.mmbName : '',
                    receivePhoneNumber: $scope.userInfo.mobileNumber ? $scope.userInfo.mobileNumber : '',
                    addressId: $scope.addressListDefault ? $scope.addressListDefault.addressId : $scope.addressListSelect.addressId,
                    quantity: $scope.qty,
                    skuItemType: "ONLINE_GOODS",
                    fromCartData: fromCartDataArr,
                    remark: $scope.params.remark,
                    skuId: $stateParams.skuId?parseInt($stateParams.skuId):$scope.productDetailData.skuId,
                    ruleHeaderIdList: $stateParams.ruleHeaderIdList&&$stateParams.ruleHeaderIdList!='undefined'?$stateParams.ruleHeaderIdList.split(','):[],
                    discountData: {
                        bookingType: $scope.bookingType,
                        activityId: $scope.activityId,
                        activityGroupId: $scope.selIndex == 2 ? $scope.minActivityInfo.activityGroupId : '',
                        usingCount: $scope.selIndex == 3 ? $scope.usingCount : '',
                        speciesCode: $scope.selIndex == 3 ? $scope.speciesCode : ''
                    },
                    otherData: $scope.otherData
                });
            } else if ($stateParams.allflag == 'false') {
                params = JSON.stringify({
                    memberId: $scope.userInfo.memberId ? $scope.userInfo.memberId : '',
                    memberName: $scope.userInfo.mmbName ? $scope.userInfo.mmbName : '',
                    receivePhoneNumber: $scope.userInfo.mobileNumber ? $scope.userInfo.mobileNumber : '',
                    addressId: $scope.addressListDefault ? $scope.addressListDefault.addressId : $scope.addressListSelect.addressId,
                    quantity: $scope.productDetailData.qty,
                    skuItemType: "ONLINE_GOODS",
                    fromCartData: [{"cartId": $scope.productDetailData.catId}],
                    remark: $scope.params.remark,
                    skuId: $stateParams.skuId?parseInt($stateParams.skuId):$scope.productDetailData.skuId,
                    ruleHeaderIdList: $stateParams.ruleHeaderIdList&&$stateParams.ruleHeaderIdList!='undefined'?$stateParams.ruleHeaderIdList.split(','):[],
                    discountData: {
                        bookingType: $scope.bookingType,
                        activityId: $scope.activityId,
                        activityGroupId: $scope.selIndex == 2 ? $scope.minActivityInfo.activityGroupId : '',
                        usingCount: $scope.selIndex == 3 ? $scope.usingCount : '',
                        speciesCode: $scope.selIndex == 3 ? $scope.speciesCode : ''
                    },
                    otherData: $scope.otherData
                });
            }
        } else if ($stateParams.status == "product") {

            //卡
            if ($scope.productDetailData.skuItemType == "ONLINE_VIRTUAL_GOODS") {
                params = JSON.stringify({
                    memberId: $scope.userInfo.memberId ? $scope.userInfo.memberId : '',
                    receivePhoneNumber: $scope.userInfo.mobileNumber ? $scope.userInfo.mobileNumber : '',
                    memberName: $scope.userInfo.mmbName ? $scope.userInfo.mmbName : '',
                    skuItemType: "ONLINE_VIRTUAL_GOODS",
                    skuId: $stateParams.skuId?parseInt($stateParams.skuId):$scope.productDetailData.skuId,
                    equitycardInfoId: $stateParams.cardId?parseInt($stateParams.cardId):$scope.productDetailData.catId,
                    cardRenewalFlag: $stateParams.cardRenewalFlag,
                    buyNowData: [{"skuId": $scope.productDetailData.skuId}],
                    ruleHeaderIdList: $stateParams.ruleHeaderIdList&&$stateParams.ruleHeaderIdList!='undefined'?$stateParams.ruleHeaderIdList.split(','):[],
                    discountData: {
                        bookingType: $scope.bookingType,
                        activityId: $scope.activityId,
                        activityGroupId: $scope.selIndex == 2 ? $scope.minActivityInfo.activityGroupId : '',
                        usingCount: $scope.selIndex == 3 ? $scope.usingCount : '',
                        speciesCode: $scope.selIndex == 3 ? $scope.speciesCode : ''
                    },
                    otherData: $scope.otherData,
                    havingCardFlag: $scope.havingCardFlag?$scope.havingCardFlag:'',
                    cinemaId: $stateParams.cinemaId?$stateParams.cinemaId:'',
                    openChannel: $stateParams.openChannel?$stateParams.openChannel:''
                });
            } else if ($scope.productDetailData.skuItemType == "GROUND_GOODS") {
                // console.log($scope.speciesCode)
                //地面
               params = JSON.stringify({
                    skuItemType: "GROUND_GOODS",
                    cinemaId: $scope.cinemaBySkuData.cinemaId?$scope.cinemaBySkuData.cinemaId:$stateParams.cinemaId,
                    activityGroupId: $scope.selIndex == 2 ? $scope.minActivityInfo.activityGroupId : '',
                    usingCount: $scope.selIndex == 3 ? $scope.usingCount : '',
                    speciesCode: $scope.selIndex == 3 ? $scope.speciesCode : '',
                    activityId: $scope.activityId,
                    bookingType: $scope.bookingType,
                    cardId: $scope.userInfo.memberCardId ? $scope.userInfo.memberCardId : '',
                    receivePhoneNumber: $scope.userInfo.mobileNumber ? $scope.userInfo.mobileNumber : '',
                    cinemaOutId: $scope.productDetailData ? $scope.productDetailData.cinemaOuterId : '',
                    skuId: $stateParams.skuId?parseInt($stateParams.skuId):$scope.productDetailData.skuId,
                    ruleHeaderIdList: $stateParams.ruleHeaderIdList&&$stateParams.ruleHeaderIdList!='undefined'?$stateParams.ruleHeaderIdList.split(','):[],
                    valuesData: [{
                        skuId: $scope.productDetailData.skuId,
                        num: $scope.productDetailData.qty
                    }],
                    memberId: $scope.userInfo.memberId ? $scope.userInfo.memberId : '',
                    memberName: $scope.userInfo.mmbName ? $scope.userInfo.mmbName : '',
                    cardType: $scope.userInfo.level ? $scope.userInfo.level : '',
                    cardNumber: $scope.userInfo.chipNumber ? $scope.userInfo.chipNumber : '',
                    otherData: $scope.otherData,
                   openChannel: $stateParams.openChannel?$stateParams.openChannel:''
                });

            } else {
                //线上商品
                $scope.valuesData = [{
                    bn: $scope.productDetailData.bn,
                    title: $scope.productDetailData.bnName,
                    num: $scope.productDetailData.qty,
                    price: $scope.productDetailData.price
                }];
                params = JSON.stringify({
                    memberId: $scope.userInfo.memberId ? $scope.userInfo.memberId : '',
                    memberName: $scope.userInfo.mmbName ? $scope.userInfo.mmbName : '',
                    receivePhoneNumber: $scope.userInfo.mobileNumber ? $scope.userInfo.mobileNumber : '',
                    addressId: $scope.addressListDefault ? $scope.addressListDefault.addressId : $scope.addressListSelect.addressId,
                    quantity: $scope.productDetailData.qty,
                    skuItemType: "ONLINE_GOODS",
                    buyNowData: [{"skuId": $scope.productDetailData.skuId}],
                    remark: $scope.params.remark,
                    discountData: {
                        bookingType: $scope.bookingType,
                        activityId: $scope.activityId,
                        activityGroupId: $scope.selIndex == 2 ? $scope.minActivityInfo.activityGroupId : '',
                        usingCount: $scope.selIndex == 3 ? $scope.usingCount : '',
                        speciesCode: $scope.selIndex == 3 ? $scope.speciesCode : ''
                    },
                    skuId: $stateParams.skuId?parseInt($stateParams.skuId):$scope.productDetailData.skuId,
                    ruleHeaderIdList: $stateParams.ruleHeaderIdList&&$stateParams.ruleHeaderIdList!='undefined'?$stateParams.ruleHeaderIdList.split(','):[],
                    otherData: $scope.otherData,
                    cinemaId: $stateParams.cinemaId?$stateParams.cinemaId:'',
                    openChannel: $stateParams.openChannel?$stateParams.openChannel:''
                });
            }
        }
        httpService.getData(JYApi.mallOrders, 'post', {
            params: params
        }, function (res) {
            if (res.status == "S") {
                $state.go('paySales', {ordNum: res.orderCode});
            } else {
                if(res.cardFlag) {
                    if(res.cardFlag === "cardDiff") {
                        var myPopup = $ionicPopup.show({
                            title: '',
                            cssClass: 'jyAlert jyAlert1',
                            template: res.msg,
                            buttons: [{
                                text: '取消',
                                type: 'button-positive',
                                onTap: function () {
                                    myPopup.close();
                                }
                            },
                                {
                                    text: '绑定会员卡',
                                    type: 'button-positive',
                                    onTap: function () {
                                        $state.go('myVipHome');
                                    }
                                }]
                        });
                    }else if(res.cardFlag === "phoneDiff"){
                        var myPopup = $ionicPopup.show({
                            title: '',
                            cssClass: 'jyAlert jyAlert1',
                            template: res.msg,
                            buttons: [{
                                text: '取消',
                                type: 'button-positive',
                                onTap: function () {
                                    myPopup.close();
                                }
                            },
                                {
                                    text: '继续购买',
                                    type: 'button-positive',
                                    onTap: function () {
                                        $scope.havingCardFlag='Y';
                                        $scope.buildOrder();
                                    }
                                }]
                        });
                    }
                }else {
                    var myPopup = $ionicPopup.show({
                        title: '',
                        cssClass: 'jyAlert jyAlert1',
                        template: res.msg,
                        buttons: [{
                            text: '确定',
                            type: 'button-positive',
                            onTap: function () {
                                myPopup.close();
                            }
                        }]
                    });
                }


            }
        }, 1, '生成订单...')
    };


    //获取提货地址
    $scope.findMemberAddress = function () {
        httpService.getData(JYApi.findMemberAddress, 'post', {
            params: JSON.stringify({})
        }, function (res) {
            if (res.status == 'S') {
                if ($stateParams.id == 1 && res.sinceAddressData.length == 0 || $stateParams.id == 2 && res.deliveryAddressData.length == 0) {
                    $scope.sinceFlag = 2
                }

                if (res.sinceAddressData.length > 0 || res.deliveryAddressData.length > 0) {
                    res.sinceAddressData.filter(function (item, index) {
                        if (item.defualtFlag == 'Y' && $stateParams.id == 1) {
                            $scope.addressListDefault = item;
                            $scope.deliveryFlag = true
                        }
                        if (item.addressId == $stateParams.addressId) {
                            $scope.addressListSelect = item;
                            $scope.deliveryId = 1;
                            $scope.deliveryFlag = true
                        }
                    });
                    res.deliveryAddressData.filter(function (item, index) {
                        if (item.defualtFlag == 'Y' && $stateParams.id == 2) {
                            $scope.addressListDefault = item;
                            $scope.deliveryFlag = true
                        }
                        if (item.addressId == $stateParams.addressId) {
                            $scope.addressListSelect = item;
                            $scope.deliveryId = 2;
                            $scope.deliveryFlag = true
                        }
                    });
                    if ($scope.addressListDefault) {
                        $scope.findPostFee($scope.addressListDefault.addressId);
                    } else if ($scope.addressListSelect) {
                        $scope.findPostFee($scope.addressListSelect.addressId);
                    }

                } else {
                    $scope.addressListDefault = '';
                }
                $scope.mallOrderFlag = true;
            } else {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '查询地址失败！'
                });
                $timeout(function () {
                    myPopup.close();
                    $state.go('mall')
                }, 1000);
            }
            // console.log($scope.sinceFlag)
        });
    };
//查运费
    $scope.findPostFee = function (addressId) {
        if ($stateParams.status == "cart") {
            $scope.fromCartData = [];
            if ($scope.productDetailDataArr) {
                $scope.productDetailDataArr.map(function (item) {
                    $scope.fromCartData.push({'cartId': item.cartId})
                });
            } else if ($scope.productDetailData) {
                $scope.fromCartData.push({'cartId': $scope.productDetailData.cartId})
            }
            var params = {"addressId": $stateParams.addressId ? $stateParams.addressId : addressId, "skuItemType": "ONLINE_GOODS", "fromCartData": $scope.fromCartData}
        } else if ($stateParams.status == "product") {
            var params = {"addressId": $stateParams.addressId ? $stateParams.addressId : addressId, "quantity": $scope.productDetailData.qty, "skuItemType": "ONLINE_GOODS", "buyNowData": [{"skuId": $scope.productDetailData.skuId}]}
        }
        httpService.getData(JYApi.findPostFee, 'post', {
            params: JSON.stringify(params)
        }, function (res) {
            if (res.status == 'S') {
                $scope.postFeeTotal = res.postFeeTotal;
            }
        })
    };

    //选择会员卡支付
    $scope.selMemberCard = function () {
        if ($scope.binding == true) {
            $state.go('myVipHome')
        } else if ($scope.binding == false) {
            $state.go('recharge')
        } else if ($scope.minMemberCardTotal != 10000) {
            if ($scope.selIndex == 1) {
                $scope.selIndex = 0;
                $scope.minPrice = $scope.commonPriceTotal;
                $scope.discount = 0;
            } else {
                $scope.selIndex = 1;
                $scope.minPrice = $scope.minMemberCardTotal;
                // console.log($scope.minPrice)
                $scope.discount = Number($scope.commonPriceTotal - $scope.minPrice).toFixed(2);
            }
        }
    };
    //展开活动列表
    $scope.showModal = function (index) {
        $scope.currentShowIndex = index;
        //console.log($scope.minMemberVoucherInfo)
        switch (index) {
            case 1:
                if ($scope.minActivityInfo != 10000) {
                    var activeOnce = true;
                    angular.forEach($scope.activityInfo, function (value, key) {
                        $scope.activityInfo[key].isActive = false;
                        if (value.lightingFlag == 'Y' && $scope.minActivityInfo.ruleHeaderId == value.ruleHeaderId) {
                            if (activeOnce && $scope.selIndex == 2) {
                                $scope.activityInfo[key].isActive = true;
                                activeOnce = false;
                            }
                        }
                        //ruleDesc自动换行
                        value.ruleDesc = value.ruleDesc.split("\n");
                        for (var i = 0; i < value.ruleDesc.length; i++) {
                            value.ruleDesc[i] = value.ruleDesc[i] + '<br>';
                        }
                        value.ruleDesc = value.ruleDesc.join('');
                    });
                }
                break;
            case 2:
                if ($scope.bindingVoucher == true) {
                    $state.go('yhj');
                    return;
                } else if ($scope.minMemberVoucherInfo != 10000) {
                    var activeOnce = true;
                    angular.forEach($scope.memberVoucherInfo, function (value, key) {
                        $scope.memberVoucherInfo[key].isActive = false;
                        if (value.lightingFlag == 'Y' && $scope.minMemberVoucherInfo.voucherRuleId == value.voucherRuleId) {
                            if (activeOnce && $scope.selIndex == 3) {
                                $scope.memberVoucherInfo[key].isActive = true;
                                if (value.num == 0) {
                                    value.num = value.totalAvailableNum;
                                }
                                activeOnce = false;
                            }
                        }
                    });
                }
                break;
        }
        $scope.modal.show();
        $ionicBackdrop.retain();
    };
    $scope.hideModal = function () {
        $scope.modal.hide();
        $ionicBackdrop.release();
    };

    //计算卖品总价
    $scope.calcTotal = function () {
        $scope.salesTotal = 0;
        //$scope.valuesData=[];
        angular.forEach($scope.salesData, function (value, key) {
            $scope.salesTotal += (value.costPrice * value.qty) / 100;
            // if(value.salesQty>0){
            //     $scope.valuesData.push({
            //         bn:value.bn,
            //         title:value.title,
            //         num:value.salesQty,
            //         price:value.costPrice
            //     });
            // }
        });
        $scope.salesTotal = Number($scope.salesTotal);
        $scope.needPayTotal = Number($scope.minPrice) + Number($scope.salesTotal);
    };

    //切换选中
    $scope.toggleSelect = function (item, index) {
        if ($scope.currentShowIndex == 1) {
            if ($scope.activityInfo[index].lightingFlag == 'Y') {
                $scope.activityInfo[index].isActive = !$scope.activityInfo[index].isActive;
                if ($scope.activityInfo[index].isActive) {
                    angular.forEach($scope.activityInfo, function (value, key) {
                        if (key != index) {
                            value.isActive = false;
                        }
                    });
                }
            }
        } else if ($scope.currentShowIndex == 2) {
            if (item.lightingFlag == 'Y') {
                item.isActive = !item.isActive;
                if (item.isActive) {
                    //console.log($scope.memberVoucherInfo)
                    angular.forEach($scope.memberVoucherInfo, function (value, key) {
                        if (value != item) {
                            value.isActive = false;
                            value.num = 0;
                        }
                    });
                }
            }
        }

    };
    //显示活动描述
    $scope.toggleDetail = function (index) {
        $scope.activityInfo[index].showCon = !$scope.activityInfo[index].showCon;
    };
    //确认修改
    //确认修改
    $scope.confirm = function () {
        if ($scope.currentShowIndex == 1) {
            var activeFlag = false;
            for (var i = 0; i < $scope.activityInfo.length; i++) {
                if ($scope.activityInfo[i].isActive) {
                    $scope.minActivityInfo = $scope.activityInfo[i];
                    activeFlag = true;
                    break;
                }
            }
            if (activeFlag) {
                $scope.selIndex = 2;
                //console.log($scope.minActivityInfo)
                $scope.minActivityInfo.activityTotalPrice = $scope.minActivityInfo.minValue;
                $scope.minPrice = $scope.minActivityInfo.activityTotalPrice;
                $scope.discount = Number($scope.commonPriceTotal - $scope.minPrice).toFixed(2);
                $scope.calcTotal();
            } else {
                $scope.selIndex = 0;
                $scope.minPrice = $scope.commonPriceTotal;
            }
            $scope.endPrice = Number($scope.endPriceRecommend) + Number($scope.minPrice);
            $scope.endpostFeeTotal = Number($scope.postFeeTotal) + Number($scope.endPrice);
        } else if ($scope.currentShowIndex == 2) {
            var voucherFlag = false;
            for (var i = 0; i < $scope.memberVoucherInfo.length; i++) {
                if ($scope.memberVoucherInfo[i].isActive) {
                    $scope.minMemberVoucherInfo = $scope.memberVoucherInfo[i];
                    $scope.speciesCode = $scope.memberVoucherInfo[i].speciesCode;
                    voucherFlag = true;
                    break;
                }
            }
            //console.log($scope.minMemberVoucherInfo)
            if (voucherFlag) {
                $scope.selIndex = 3;
                var remainQty = '';
                $scope.minMemberVoucherInfo.calcuValue = [];
                angular.forEach($scope.selesParams, function (v1, k1) {
                    v1.sum = 0;
                    v1.flag = false;
                    angular.forEach($scope.minMemberVoucherInfo.skuArray, function (v2, k2) {
                        if (v1.skuId == v2.skuId) {
                            if (v1.qty >= $scope.minMemberVoucherInfo.num) {
                                v1.sum += $scope.minMemberVoucherInfo.num * v2.newPriceincents + (v1.qty - $scope.minMemberVoucherInfo.num) * v1.costPrice / 100;
                            } else {
                                v1.sum += v1.qty * v2.newPriceincents;
                                remainQty = $scope.minMemberVoucherInfo.num - v1.qty;
                            }
                            //循环其它商品
                            angular.forEach($scope.selesParams, function (v3, k3) {
                                if (k1 != k3) {
                                    var isInSku = false;
                                    var skuNewPrice = '';
                                    for (var i = 0; i < $scope.minMemberVoucherInfo.skuArray.length; i++) {
                                        if (v3.skuId == $scope.minMemberVoucherInfo.skuArray[i].skuId) {
                                            isInSku = true;
                                            skuNewPrice = $scope.minMemberVoucherInfo.skuArray[i].newPriceincents;
                                        }
                                    }
                                    if (isInSku) {
                                        if (v3.qty >= remainQty) {
                                            v1.sum += remainQty * skuNewPrice + (v3.qty - remainQty) * v3.costPrice / 100;

                                        } else {
                                            v1.sum += v3.qty * skuNewPrice;
                                            remainQty = remainQty - v3.qty;
                                        }
                                    } else {
                                        v1.sum += v3.qty * v3.costPrice / 100;
                                    }
                                }
                            });
                            v1.flag = true;
                        }
                    });
                    if (v1.flag) {
                        $scope.minMemberVoucherInfo.calcuValue.push(v1.sum)
                    }
                });
                $scope.minMemberVoucherInfo.minValue = _.min($scope.minMemberVoucherInfo.calcuValue);
                //$scope.minMemberVoucherArr.push($scope.minMemberVoucherInfo.minValue);
                //console.log($scope.minMemberVoucherInfo.num)
                $scope.usingCount = $scope.minMemberVoucherInfo.num;
                $scope.minMemberVoucherInfo.voucherInfoTotalPrice = $scope.minMemberVoucherInfo.minValue;
                $scope.minPrice = $scope.minMemberVoucherInfo.voucherInfoTotalPrice;
                $scope.discount = Number($scope.commonPriceTotal - $scope.minPrice).toFixed(2);
                $scope.calcTotal();
            } else {
                $scope.selIndex = 0;
                $scope.minPrice = $scope.commonPriceTotal;
            }
            $scope.endPrice = Number($scope.endPriceRecommend) + Number($scope.minPrice);
            $scope.endpostFeeTotal = Number($scope.postFeeTotal) + Number($scope.endPrice);
        }
        $scope.hideModal();
    };
    //数量控制
    $scope.incr = function (row) {
        if (row.lightingFlag == 'Y') {
            if (row.num >= 0) {
                angular.forEach($scope.memberVoucherInfo, function (value, key) {
                    if (value != row) {
                        value.num = 0;
                    }
                });
            }
            if (row.speciesCodeNum >= row.totalAvailableNum) {
                if (row.num < row.totalAvailableNum) {
                    row.num += 1;
                }
                if (row.num == row.totalAvailableNum) {
                    row.num = row.totalAvailableNum
                }
            } else if (row.speciesCodeNum < row.totalAvailableNum) {
                if (row.num < row.speciesCodeNum) {
                    row.num += 1;
                }
                if (row.num == row.speciesCodeNum) {
                    row.num = row.speciesCodeNum
                }
            } else {
                row.num += 1;
            }
        }
    };
    $scope.decr = function (row) {
        if (row.lightingFlag == 'Y') {
            //只有大于0的时候才减
            if (row.num > 0) {
                row.num -= 1;
            }
        }
    };
    $scope.$on("$ionicView.enter", function (event, data) {
        $ionicModal.fromTemplateUrl('templates/mallactivityList.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
    });
    $scope.$on("$ionicView.leave", function (event, data) {
        if ($scope.modal) {
            $scope.modal.hide();
            $ionicBackdrop.release();
        }
    });

    $scope.delivery = function () {
        $state.go('deliveryMethod', {status: $stateParams.status, allflag: $stateParams.allflag})
    };
    $scope.address = function () {
        $state.go('address', {product: 'product', status: $stateParams.status, allflag: $stateParams.allflag, id: $scope.deliveryId})
    }

    //猜你喜欢
    $scope.findRecommendGoods = function () {
        httpService.getData(JYApi.findRecommendGoods, 'post', {
            params: JSON.stringify({
                "type": "recommendGoods",
                "recommendType": "HOME_GOODS_RECOMMEND",
                skuItemType: $scope.productDetailData ? $scope.productDetailData.skuItemType : $scope.productDetailDataArr[0].skuItemType,
                cinemaOuterId: $scope.productDetailData ? $scope.productDetailData.cinemaOuterId : '',
                "pageIndex": 1,
                "pageRows": 5
            })
        }, function (res) {
            $scope.categoryListNewData = res.data;
            // console.log($scope.categoryListNewData)
        })
    };

    $scope.recommendSumPrice = function () {
        $scope.endSum = 0;
        $scope.endPriceRecommend = 0;
        angular.forEach($scope.categoryListNewData, function (value, key) {
            var tt = {};
            if (value.salesQty > 0) {
                tt.skuId = value.sourceId;
                tt.num = value.salesQty;
                $scope.otherDataActivict.push(tt);
                $scope.endPriceRecommend += (value.price * value.salesQty) / 100;
                $scope.endSum += value.salesQty
            }
        });
        $scope.mallActivityInfo($scope.otherDataActivict);
        // console.log($scope.otherDataActivict)
        $timeout(function () {

        }, 500)

        // console.log($scope.endPriceRecommend)
    };

    //购物数量控制
    $scope.add1 = function (row, index) {
        if (!row.salesQty) {
            row.salesQty = 0;
        }
        row.salesQty++;
        $scope.recommendSumPrice()
    };
    $scope.reduce1 = function (row, index) {
        if (row.salesQty && row.salesQty > 0) {
            row.salesQty--;
        }
        $scope.recommendSumPrice()
    };

    // 金逸会员章程/权益卡须知
    $scope.$on('$ionicView.enter', function () {
        var skuSourceType = "";
        if($scope.productDetailData && $scope.productDetailData.skuSourceType) {
            skuSourceType = $scope.productDetailData.skuSourceType
        }
        //初始化
        if(!$scope.regulationList && skuSourceType==="ONLINE_GIFT_CARDS") { //会员章程
            $scope.regulationList = [{
                articleType: "MEMBERSHIP_RULES",
                articleId: "3321",
                articleTitle: "金逸会员章程",
                checkVal: false
            }];
            $scope.showRegulation = true;
        }else if(!$scope.regulationList && skuSourceType==="ONLINE_EQUITY_CARD") {//金逸权益卡用户服务条款
            $scope.regulationList = [
                {
                    articleType: "MEMBERSHIP_RULES",
                    articleId: "3321",
                    articleTitle: "金逸会员章程",
                    checkVal: false
                },
                {
                    articleType: "EQUITYCARD_INTERESTS",
                    articleId: "3309",
                    articleTitle: "金逸权益卡用户服务条款",
                    checkVal: false
                }
            ];
            $scope.showRegulation = true;
        }
        $rootScope.$on('post-confirmRegulationsFlag', function(event, args) {
            var confirmRegulationsFlag = args.confirmRegulationsFlag?args.confirmRegulationsFlag:0;
            $scope.regulationList[confirmRegulationsFlag].checkVal = true;
        })
        for (var i = 0; i < $scope.regulationList.length; i++) {
            console.log($scope.regulationList[i].checkVal)
            if(i === $scope.regulationList.length-1){
                if($scope.regulationList[i].checkVal){
                    $scope.confirmFlag = false;
                }else {
                    $scope.confirmFlag = true;
                }
            }else {
                if(!$scope.regulationList[i].checkVal){
                    $scope.confirmFlag = true;
                    break;
                }
            }
        }
    })
    $scope.confirmMembershipRegulations = function () {
        for (var i = 0; i < $scope.regulationList.length; i++) {
            console.log($scope.regulationList[i].checkVal)
            if(i === $scope.regulationList.length-1){
                if($scope.regulationList[i].checkVal){
                    $scope.confirmFlag = false;
                }else {
                    $scope.confirmFlag = true;
                }
            }else {
                if(!$scope.regulationList[i].checkVal){
                    $scope.confirmFlag = true;
                    break;
                }
            }
        }
    }
    $scope.goRegulationDetails = function (index) {
        var regulationObj = $scope.regulationList[index];
        $state.go('membershipRegulations', {articleType: regulationObj.articleType, articleId: regulationObj.articleId, articleTitle: regulationObj.articleTitle});
    }

});

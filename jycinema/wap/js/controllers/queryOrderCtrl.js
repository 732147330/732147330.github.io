/**
 * Created by xiongshengzhong on 16/8/18.
 * 2016.12.9修改 跳转成功页面传参---v1.2版需更新内容
 * 2016.12.23修复倒计时反复进入导致停止bug
 * 2016.12.28 修改会员卡支付验证码发送开卡手机号验证逻辑
 * 2017.1.3 修复倒计时不准问题
 * 2017.1.5 纠正购票成功返回首页再跳到成功购票页面的逻辑
 * 2017.1.15 支付增加卡券优惠功能
 * 2017.3.1 会员卡金额不足自动提示跳转充值中心
 * 2017.5.19 增加卖品功能
 * 2017.06.25 无活动 leftTImeId传空修复
 **/
'use strict';
app.controller('queryOrderCtrl', function ($scope, $rootScope, $stateParams,$ionicSlideBoxDelegate,$ionicScrollDelegate, $ionicBackdrop, $ionicModal, $interval, httpService, JYApi, $http, myhrefService, $state, $timeout, $ionicHistory, $ionicPopup, $filter) {
    $scope.getSeatData = JSON.parse($stateParams.obj);
    $scope.String = String;
    $scope.Number = Number;
    $scope.flag = $stateParams.flag;
    $scope.filmName = $stateParams.filmName;
    $scope.filmId = $stateParams.filmId;

    //解决跨时区问题
    $scope.getTime1= function (timti) {
        //获得当前运行环境时间
        var d = timti, currentDate = timti, tmpHours = currentDate.getHours();
        //算得时区
        var time_zone = -d.getTimezoneOffset() / 60;
        //少于0的是西区 西区应该用时区绝对值加京八区 重新设置时间（西区时间比东区时间早 所以加时区间隔）
        if (time_zone < 0) {
            time_zone = Math.abs(time_zone) + 8; currentDate.setHours(tmpHours + time_zone);
        } else {
            //大于0的是东区  东区时间直接跟京八区相减
            time_zone -= 8; currentDate.setHours(tmpHours - time_zone);
        }
        return currentDate;
    };
    $scope.formatTime=function(timeStr){
        var timti = new Date(parseInt(timeStr));
        var tim = $scope.getTime1(timti);
        var year = tim.getFullYear(); //年
        var month = tim.getMonth() + 1; //月
        var h = tim.getHours();
        var m = tim.getMinutes();
        month = month < 10 ? '0' + month : month;
        var day = tim.getDate();//日
        day = day < 10 ? '0' + day : day;
        h=h<10?'0'+h:h;
        m=m<10?'0'+m:m;
        return year + '-' + month + '-' + day +' '+ h + ':' + m;
    };
    $scope.showtime =  $scope.formatTime($stateParams.showtime);

    $scope.data = {selActivity: ''};
    $rootScope.userInfo = JSON.parse(localStorage.userInfo);
    $scope.user = {
        mobileNumber: $rootScope.userInfo.mobileNumber
    };
    $scope.areaName = $stateParams.areaName;
    $scope.cinemaName = $stateParams.cinemaName;
    $scope.screenName = $stateParams.screenName;
    $scope.surchargeAmount = $stateParams.surchargeAmount;
    $scope.currentScheduleData = JSON.parse(sessionStorage.currentScheduleData);
    $scope.page=1;
    $scope.pageSize=10;
    $scope.pageSizeDefault=2;
    $scope.commonPrice=$scope.currentScheduleData.priceincents/100;//普通价
    $scope.commonPriceTotal=Number($scope.getSeatData.length*$scope.currentScheduleData.priceincents/100).toFixed(2);//普通价小计
    $scope.memberVoucherInfoData = [];
    $scope.memberEquityCardInfoData =[];
    $scope.memberCardSalesInfo= [];//会员卡信息
    $scope.activitySalesInfo= [];//活动信息
    $scope.memberVoucherSalesInfo= [];//优惠券信息

    $scope.index=0;
    $scope.activeIndex=$scope.index;
    $scope.getCurrentData=function(index){
        $scope.activeIndex=index;
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideHasChanged=function(index){
        $scope.activeIndex=index;
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideTo=function(){
        return $scope.activeIndex;
    };

    $scope.use = function(row){
        var rightsArray = [];
        rightsArray =row.ruleDesc.split("\n");//字符分割
        $scope.rightsMeaningData = rightsArray;
        $scope.modalDetail.show()
    };
    $scope.sure = function(){
        $scope.modalDetail.hide()
    };
    //获取影片优惠信息
    $scope.getQueryActivityInfo = function () {
        var params = {
            Qty: $scope.currentScheduleData.seatFormat2.length,
            cinemaId: $scope.currentScheduleData.cinemaId,
            cinemaOuterId: $scope.currentScheduleData.cinemaOuterId,
            filmId: $scope.currentScheduleData.filmId,
            priceincents: $scope.currentScheduleData.priceincents,
            screenId: $scope.currentScheduleData.screenId,
            sessionAttribute: $scope.currentScheduleData.sessionAttribute,
            sessionOutId: $scope.currentScheduleData.sessionOutId,
            showtime: $filter('date')($scope.currentScheduleData.showtime, 'yyyy-MM-dd HH:mm:ss'),
            selectedSeats: $scope.currentScheduleData.seatFormat2,
            memberLevel: JSON.parse(localStorage.userInfo).level,
            skuId:$scope.currentScheduleData.skuId
        };

        httpService.getData(JYApi.queryActivityInfo, 'post', {
            params: JSON.stringify(params)
        }, function (res) {
            if (res.status == 'S') {
                $scope.ActivityData = res.data;
                $scope.memberCardInfo= res.data.memberCardInfo;//会员卡信息
                $scope.activityInfo= res.data.activityInfo;//活动信息
                $scope.memberVoucherInfo= res.data.memberVoucherInfo;//优惠券信息
                $scope.memberEquityCardInfo=res.data.memberEquityCardInfo;//权益卡信息
                $scope.memberVoucherInfoData = [];
                $scope.memberEquityCardInfoData =[];
                $scope.memberVoucherInfo.map(function (item) {
                    for(var i in item.groupData){
                        item.groupData[i].num =0;
                        $scope.memberVoucherInfoData.push(item.groupData[i])
                    }
                });
                $scope.memberEquityCardInfo.map(function (item) {
                    for(var i in item.groupData){
                        //item.groupData[i].num =0
                        $scope.memberEquityCardInfoData.push(item.groupData[i])
                    }
                });
                //计算最低会员价
                if($scope.memberCardInfo.HasCrad=='Y'&&$scope.memberCardInfo.hasRemainder=='Y'){
                    $scope.minMemberCardTotal=Number($scope.getSeatData.length*$scope.memberCardInfo.priceincents);//会员价小计
                }else if($scope.memberCardInfo.HasCrad=='Y'&&$scope.memberCardInfo.hasRemainder=='N'){
                    $scope.minMemberCardTotal=10000;
                    $scope.binding=false;
                }else if($scope.memberCardInfo.HasCrad=='N'){
                    $scope.binding=true;
                    $scope.minMemberCardTotal=10000;
                }
                //计算最低活动价
                if($scope.activityInfo.length>0){
                    $scope.filterActivityInfo= _.filter($scope.activityInfo,function (item) {
                        return item.lightingFlag=='Y'
                    });
                    if($scope.filterActivityInfo.length>0){
                        $scope.activityUnable=false;
                        angular.forEach($scope.filterActivityInfo,function (value,key) {
                            if(!value.discountQty || value.discountQty>=$scope.getSeatData.length){
                                value.activityTotalPrice=Number($scope.getSeatData.length)*Number(value.newPriceincents);
                            }else{
                                value.activityTotalPrice= value.discountQty*value.newPriceincents+($scope.getSeatData.length-value.discountQty)*$scope.commonPrice;
                            }
                        });
                        $scope.minActivityInfo = _.min($scope.filterActivityInfo,function (item) {
                            return item.activityTotalPrice
                        });
                    }else{
                        $scope.minActivityInfo=10000;
                        $scope.minActivityValue=10000;
                    }
                }else{
                    $scope.minActivityInfo=10000;
                    $scope.minActivityValue=10000;
                }

                //计算最低优惠价(卡卷)
                if($scope.memberVoucherInfoData.length>0){
                    $scope.filterMemberVoucherInfo= _.filter($scope.memberVoucherInfoData,function (item) {
                        return item.lightingFlag=='Y'
                    });
                    if($scope.filterMemberVoucherInfo.length>0){
                        $scope.minMemberVoucherInfo = _.min($scope.filterMemberVoucherInfo,function (item) {
                            if($scope.currentScheduleData.seatFormat2.length<=item.speciesCodeNum){
                                item.surePriceincents =$scope.currentScheduleData.seatFormat2.length*item.newPriceincents;
                                return item.surePriceincents
                            }else{
                                item.surePriceincents =($scope.currentScheduleData.seatFormat2.length-item.speciesCodeNum)* $scope.commonPrice
                                    +item.speciesCodeNum*item.newPriceincents;
                                return item.surePriceincents
                            }
                        });
                        if($scope.currentScheduleData.seatFormat2.length<=$scope.minMemberVoucherInfo.speciesCodeNum){
                            $scope.usingCount =$scope.currentScheduleData.seatFormat2.length;
                        }else{
                            $scope.usingCount =$scope.minMemberVoucherInfo.speciesCodeNum;
                        }
                        $scope.minMemberVoucherInfo.voucherTotalPrice=($scope.minMemberVoucherInfo.surePriceincents).toFixed(2)
                        $scope.bindingVoucherFlag=1;
                    }else{
                        $scope.minMemberVoucherInfo=10000;
                        $scope.bindingVoucher=false;
                    }
                }else{
                    $scope.minMemberVoucherInfo=10000;
                    $scope.bindingVoucher=true;
                }
                //计算最低权益卡价
                if($scope.memberEquityCardInfoData.length>0){
                    $scope.filterMemberEquityCardInfo= _.filter($scope.memberEquityCardInfoData,function (item) {
                        return item.lightingFlag=='Y'
                    });
                    if($scope.filterMemberEquityCardInfo.length>0){
                        $scope.minMemberEquityCardInfo = _.min($scope.filterMemberEquityCardInfo,function (item) {
                            if(item.equitycardType =="FILM_DISCOUNT_EQUITYCARD"){
                                item.surePriceincents =$scope.currentScheduleData.seatFormat2.length*item.newPriceincents;
                                return item.surePriceincents
                            }else if(item.equitycardType=="FILM_PASS_EQUITYCARD"){
                                if($scope.currentScheduleData.seatFormat2.length<=item.equitycardResidue){
                                    item.surePriceincents =$scope.currentScheduleData.seatFormat2.length*item.newPriceincents;
                                    //$scope.usingCount =$scope.currentScheduleData.seatFormat2.length;
                                    return item.surePriceincents
                                }else{
                                    item.surePriceincents =($scope.currentScheduleData.seatFormat2.length-item.equitycardResidue)* $scope.commonPrice
                                        +item.equitycardResidue*item.newPriceincents;
                                    //$scope.usingCount =item.speciesCodeNum;
                                    return item.surePriceincents
                                }
                            }
                        });
                        $scope.minMemberEquityCardInfo.voucherTotalPrice=($scope.minMemberEquityCardInfo.surePriceincents).toFixed(2)
                    }else{
                        $scope.minMemberEquityCardInfo=10000;
                    }
                }else{
                    $scope.minMemberEquityCardInfo=10000;
                }

                //最终的优惠价
                // console.log($scope.minMemberCardTotal);
                // console.log($scope.minActivityInfo.activityTotalPrice);
                // console.log($scope.minMemberVoucherInfo.voucherTotalPrice);
                //console.log($scope.minMemberEquityCardInfo)

                $scope.minPrice=Math.min($scope.minMemberCardTotal,$scope.minActivityInfo.activityTotalPrice?$scope.minActivityInfo.activityTotalPrice:10000,
                    $scope.minMemberVoucherInfo.voucherTotalPrice?$scope.minMemberVoucherInfo.voucherTotalPrice:10000,$scope.minMemberEquityCardInfo.voucherTotalPrice?$scope.minMemberEquityCardInfo.voucherTotalPrice:10000);
                if($scope.minPrice==10000){
                    $scope.discount=0
                }else{
                    $scope.discount=Number($scope.commonPriceTotal-$scope.minPrice).toFixed(2);
                }

                console.log($scope.discount)
                $scope.sumDiscount=$scope.discount;
                if($scope.minPrice==10000){
                    $scope.selIndex=0;
                    $scope.minPrice= parseFloat($scope.commonPriceTotal);
                }else{
                    if($scope.minMemberCardTotal==$scope.minPrice){
                        $scope.selIndex=1;
                    }else if($scope.minActivityInfo.activityTotalPrice==$scope.minPrice){
                        $scope.selIndex=2;
                        $scope.tuijianActivityInfoId=$scope.minActivityInfo.ruleHeaderId;
                    }else if($scope.minMemberVoucherInfo.voucherTotalPrice==$scope.minPrice){
                        $scope.selIndex=3;
                    }else if($scope.minMemberEquityCardInfo.voucherTotalPrice==$scope.minPrice){
                        if($scope.minMemberEquityCardInfo.equitycardType=="FILM_PASS_EQUITYCARD"){
                            $scope.rightsIndex=11;//判断是次卡就隐藏卖品标识
                            $scope.mallOrderFlag=true;
                        }else if($scope.minMemberEquityCardInfo.equitycardType =="FILM_DISCOUNT_EQUITYCARD"){
                            $scope.rightsIndex=1;//判断是折扣卡就放出卖品标识
                        }
                        $scope.selIndex=4;
                        $scope.scrollTop();
                    }
                    else{
                        $scope.selIndex=0;
                        $scope.minPrice= parseFloat($scope.commonPriceTotal);
                    }
                }
                $scope.mallOrderFlag=true;
            }
        });
    };



    //选择会员卡支付
    $scope.selMemberCard=function () {
        if($scope.binding==true){
            $state.go('myVipHome')
        }else if($scope.binding==false){
            $state.go('recharge')
        }else if($scope.minMemberCardTotal!=10000){
            $scope.rightsIndex=1;//放出卖品标识
            if($scope.minMemberCardTotal!=10000){
                if($scope.selIndex==1){
                    $scope.selIndex=0;
                    $scope.salesSelIndex=0;
                    $scope.minPrice= parseFloat($scope.commonPriceTotal);
                    if($scope.commonSalesPriceTotal){
                        $scope.minSalesPrice=Number($scope.commonSalesPriceTotal);
                    }else{
                        $scope.minSalesPrice=0
                    }
                    $scope.discount=0;
                    console.log( $scope.minPrice)
                }else{
                    $scope.selIndex=1;
                    $scope.salesSelIndex=1;
                    $scope.minPrice= $scope.minMemberCardTotal;
                    if($scope.commonSalesPriceTotal){
                        $scope.minSalesPrice=Number($scope.commonSalesPriceTotal);
                    }else{
                        $scope.minSalesPrice=0
                    }
                    $scope.discount=Number($scope.commonPriceTotal-$scope.minPrice).toFixed(2);
                    $scope.sumDiscount=$scope.discount;
                    console.log( $scope.minSalesPrice)
                    console.log( $scope.minPrice)
                }
            }
        }

    };

    //展开活动列表
    $scope.showModal = function (index) {
        $scope.currentShowIndex=index;
        switch (index){
            case 1:
                if($scope.minActivityInfo!=10000 || $scope.minActivitySalesInfo!=10000){
                    $scope.modal.show();
                    $ionicBackdrop.retain();
                }
                if($scope.minActivityInfo!=10000){
                    var activeOnce=true;
                    angular.forEach($scope.activityInfo, function (value, key) {
                        $scope.activityInfo[key].isActive = false;
                        if (value.lightingFlag=='Y' && $scope.minActivityInfo.ruleHeaderId == value.ruleHeaderId) {
                            if(activeOnce && $scope.selIndex==2){
                                $scope.activityInfo[key].isActive = true;
                                activeOnce=false;
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
                if($scope.minActivitySalesInfo!=10000&&$scope.minActivitySalesInfo){
                    var activeOnce=true;
                    angular.forEach($scope.activitySalesInfo, function (value, key) {
                        $scope.activitySalesInfo[key].isActive = false;
                        if (value.lightingFlag=='Y' && $scope.minActivitySalesInfo.ruleHeaderId == value.ruleHeaderId) {
                            if(activeOnce && $scope.salesSelIndex==2){
                                $scope.activitySalesInfo[key].isActive = true;
                                activeOnce=false;
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
                if($scope.bindingVoucher==true&&$scope.bindingVoucherFlag!=1&&$scope.minMemberVoucherInfo==10000){
                    $state.go('yhj');
                    return;
                }else if($scope.minMemberVoucherInfo!=10000 || $scope.minMemberVoucherSalesInfo!=10000){
                    if($scope.memberVoucherInfo && $scope.selIndex!=3 &&$scope.salesSelIndex!=3&&$scope.minMemberVoucherInfo==10000&&$scope.bindingVoucher!=true&&$scope.bindingVoucherFlag!=1){

                    }else{
                        $scope.modal.show();
                        $ionicBackdrop.retain();
                    }
                    if($scope.minMemberVoucherInfo!=10000){
                        var activeOnce=true;
                        angular.forEach($scope.memberVoucherInfoData, function (value, key) {
                            $scope.memberVoucherInfoData[key].isActive = false;
                            console.log($scope.minMemberVoucherInfo)
                            console.log($scope.memberVoucherInfoData)
                            if (value.lightingFlag=='Y' && $scope.minMemberVoucherInfo.voucherRuleId == value.voucherRuleId) {
                                if(activeOnce && $scope.selIndex==3){
                                    $scope.memberVoucherInfoData[key].isActive = true;
                                    activeOnce=false;
                                    if($scope.currentScheduleData.seatFormat2.length<=value.speciesCodeNum){
                                        if($scope.flag != true){
                                            value.num =$scope.currentScheduleData.seatFormat2.length;
                                        }
                                    }else{
                                        if($scope.flag != true){
                                            value.num = value.speciesCodeNum;
                                        }
                                    }
                                }
                            }else{
                                value.isActive =false
                            }
                        });
                    }
                    if($scope.minMemberVoucherSalesInfo!=10000&&$scope.minMemberVoucherSalesInfo){
                        var activeOnce=true;
                        console.log($scope.memberVoucherSalesInfo)
                        console.log($scope.minMemberVoucherSalesInfo)
                        angular.forEach($scope.memberVoucherSalesInfo, function (value, key) {
                            $scope.memberVoucherSalesInfo[key].isActive = false;
                            if (value.lightingFlag=='Y' && $scope.minMemberVoucherSalesInfo.voucherRuleId == value.voucherRuleId) {
                                if(activeOnce && $scope.salesSelIndex==3){
                                    $scope.memberVoucherSalesInfo[key].isActive = true;
                                    if(value.num==0&&$scope.salesflag != true){
                                        value.num=value.totalAvailableNum;
                                    }
                                    activeOnce=false;
                                }
                            }
                        });
                    }
                }
                break;
            case 3:
                if($scope.minMemberEquityCardInfo!=10000){
                    $scope.modal.show();
                    $ionicBackdrop.retain();
                    //console.log($scope.selIndex)
                    var activeOnce=true;
                    $scope.memberEquityCardInfoData.map(function(item){
                        item.isActive=false;
                        if(item.ruleHeaderId ==$scope.minMemberEquityCardInfo.ruleHeaderId&&item.lightingFlag=='Y'){
                            if(activeOnce && $scope.selIndex==4){
                                item.isActive =true;
                                activeOnce=false;
                            }
                        }else{
                            item.isActive =false
                        }
                        //ruleDesc自动换行
                        item.ruleDesc = item.ruleDesc.split("\n");
                        for (var i = 0; i < item.ruleDesc.length; i++) {
                            item.ruleDesc[i] = item.ruleDesc[i] + '<br>';
                        }
                        item.ruleDesc = item.ruleDesc.join('');
                    });
                }
                break;
        }

    };

    //确认修改
    $scope.confirm = function () {
        if($scope.currentShowIndex==1){
            var activeFlag=false;
            for(var i=0;i<$scope.activityInfo.length;i++){
                if($scope.activityInfo[i].isActive){
                    $scope.minActivityInfo=$scope.activityInfo[i];
                    activeFlag=true;
                    break;
                }
            }
            if(activeFlag){
                $scope.selIndex=2;
                if(!$scope.minActivityInfo.discountQty || $scope.minActivityInfo.discountQty>=$scope.getSeatData.length){
                    $scope.minActivityInfo.activityTotalPrice=Number($scope.getSeatData.length)*Number($scope.minActivityInfo.newPriceincents);
                }else{
                    $scope.minActivityInfo.activityTotalPrice= $scope.minActivityInfo.discountQty*$scope.minActivityInfo.newPriceincents+($scope.getSeatData.length-$scope.minActivityInfo.discountQty)*$scope.commonPrice;
                }
                $scope.minPrice= $scope.minActivityInfo.activityTotalPrice;
                $scope.discount=Number($scope.commonPriceTotal-$scope.minPrice).toFixed(2);
                //$scope.calcTotal();
                $scope.sumDiscount=$scope.discount;
                //if($scope.activitySalesInfo.length==0){
                //    $scope.minSalesPrice=0
                //}
                if($scope.valuesSalesData.length>0){
                    $scope.getQuerySalesActivityInfo()
                }

                console.log($scope.sumDiscount)
            }else{
                $scope.discount=0;
                if(activeSalesFlag){
                    $scope.selIndex=0;
                    $scope.salesSelIndex=2;
                    $scope.minPrice= parseFloat($scope.commonPriceTotal);
                }else{
                    $scope.selIndex=0;
                    $scope.salesSelIndex=0;
                    $scope.minPrice= parseFloat($scope.commonPriceTotal);
                }

            }

            if($scope.activitySalesInfo.length>0){
                var activeSalesFlag=false;
                for(var i=0;i<$scope.activitySalesInfo.length;i++){
                    if($scope.activitySalesInfo[i].isActive){
                        $scope.minActivitySalesInfo=$scope.activitySalesInfo[i];
                        activeSalesFlag=true;
                        break;
                    }
                }
                if(activeSalesFlag){
                    $scope.salesSelIndex=2;
                    var remainQty='';
                    $scope.minActivitySalesInfo.calcuValue=[];
                    angular.forEach($scope.salesData,function (v1,k1) {
                        v1.sum=0;
                        v1.flag=false;
                        angular.forEach($scope.minActivitySalesInfo.skuArray,function (v2,k2) {
                            if(v1.skuId==v2.skuId){
                                if(v1.salesQty>=$scope.minActivitySalesInfo.discountQty){
                                    v1.sum+=$scope.minActivitySalesInfo.discountQty*v2.newPriceincents+(v1.salesQty-$scope.minActivitySalesInfo.discountQty)*v1.costPrice/100;
                                }else{
                                    v1.sum+=v1.salesQty* v2.newPriceincents;
                                    remainQty= $scope.minActivitySalesInfo.discountQty-v1.salesQty;
                                }
                                //循环其它商品
                                angular.forEach($scope.salesData,function (v3,k3) {
                                    if(k1!=k3){
                                        var isInSku=false;
                                        var skuNewPrice='';
                                        for(var i=0;i<$scope.minActivitySalesInfo.skuArray.length;i++){
                                            if(v3.skuId==$scope.minActivitySalesInfo.skuArray[i].skuId){
                                                isInSku=true;
                                                skuNewPrice=$scope.minActivitySalesInfo.skuArray[i].newPriceincents;
                                            }
                                        }
                                        if(isInSku){
                                            if(v3.salesQty>=remainQty){
                                                v1.sum+= remainQty*skuNewPrice+(v3.salesQty-remainQty)*v3.costPrice/100;

                                            }else{
                                                v1.sum+=v3.salesQty*skuNewPrice;
                                                remainQty=remainQty-v3.salesQty;
                                            }
                                        }else{
                                            v1.sum+= v3.salesQty*v3.costPrice/100;
                                        }
                                    }
                                });
                                v1.flag=true;
                            }
                        });
                        if(v1.flag){
                            $scope.minActivitySalesInfo.calcuValue.push(v1.sum)
                        }
                    });
                    $scope.minActivitySalesInfo.minValue=_.min($scope.minActivitySalesInfo.calcuValue);
                    $scope.minActivitySalesInfo.activityTotalSalesPrice=$scope.minActivitySalesInfo.minValue;
                    $scope.minSalesPrice= $scope.minActivitySalesInfo.activityTotalSalesPrice;
                    $scope.discountSales=Number($scope.commonSalesPriceTotal-$scope.minSalesPrice).toFixed(2);
                    $scope.sumDiscount=$scope.discountSales;
                    //$scope.calcTotal();
                    //console.log($scope.discountSales)
                    if(!activeFlag){
                        $scope.selIndex=0;
                        //$scope.salesSelIndex=2;
                        $scope.minPrice= parseFloat($scope.commonPriceTotal);
                    }
                }else{
                    if(activeFlag){
                        $scope.selIndex=2;
                        $scope.salesSelIndex=0;
                        $scope.minSalesPrice= parseFloat($scope.commonSalesPriceTotal);
                    }else{
                        $scope.selIndex=0;
                        $scope.salesSelIndex=0;
                        $scope.minSalesPrice= parseFloat($scope.commonSalesPriceTotal);
                    }

                }
            }
            if(activeSalesFlag&&activeFlag){
                $scope.salesSelIndex=2;
                $scope.selIndex=2;
                $scope.sumDiscount=Number(parseFloat($scope.discountSales)+parseFloat($scope.discount)).toFixed(2);
            }
            $scope.rightsIndex=1;//判断放出卖品标识
            if($scope.memberVoucherSalesInfo.length>0){
                $scope.bindingVoucherFlag=1;
                $scope.minMemberVoucherInfo=1;
                console.log($scope.minMemberVoucherInfo)
            }

        }else if($scope.currentShowIndex==2){
            var voucherFlag=false;
            for(var i=0;i<$scope.memberVoucherInfoData.length;i++){
                if($scope.memberVoucherInfoData[i].isActive){
                    $scope.minMemberVoucherInfo=$scope.memberVoucherInfoData[i];
                    $scope.usingCount = $scope.memberVoucherInfoData[i].num;
                    $scope.speciesCode =$scope.memberVoucherInfoData[i].speciesCode;
                    $scope.newPrice =$scope.memberVoucherInfoData[i].newPriceincents;
                    voucherFlag=true;
                    break;
                }
            }
            if(voucherFlag){
                $scope.selIndex=3;
                $scope.minPrice= (($scope.currentScheduleData.seatFormat2.length- $scope.usingCount)
                *$scope.commonPrice+$scope.usingCount*$scope.newPrice);
                $scope.discount= ($scope.commonPriceTotal-(($scope.currentScheduleData.seatFormat2.length- $scope.usingCount)
                *$scope.commonPrice+$scope.usingCount*$scope.newPrice)).toFixed(2);
                //$scope.calcTotal();
                $scope.sumDiscount=$scope.discount;
                console.log($scope.sumDiscount)
                if($scope.valuesSalesData.length>0){
                    $scope.getQuerySalesActivityInfo()
                }
            }else{
                if(voucherSalesFlag){
                    $scope.selIndex=0;
                    $scope.salesSelIndex=3;
                    $scope.minPrice= parseFloat($scope.commonPriceTotal);
                }else{
                    $scope.selIndex=0;
                    $scope.salesSelIndex=0;
                    $scope.minPrice= parseFloat($scope.commonPriceTotal);
                }
            }

            if($scope.memberVoucherSalesInfo.length>0){
                var voucherSalesFlag=false;
                for(var i=0;i<$scope.memberVoucherSalesInfo.length;i++){
                    if($scope.memberVoucherSalesInfo[i].isActive){
                        $scope.minMemberVoucherSalesInfo=$scope.memberVoucherSalesInfo[i];
                        $scope.speciesSalesCode =$scope.memberVoucherSalesInfo[i].speciesCode;
                        voucherSalesFlag=true;
                        break;
                    }
                }
                //console.log($scope.minMemberVoucherInfo)
                if(voucherSalesFlag){
                    $scope.salesSelIndex=3;
                    var remainQty='';
                    $scope.minMemberVoucherSalesInfo.calcuValue=[];
                    angular.forEach($scope.salesData,function (v1,k1) {
                        v1.sum=0;
                        v1.flag=false;
                        angular.forEach($scope.minMemberVoucherSalesInfo.skuArray,function (v2,k2) {
                            if(v1.skuId==v2.skuId){
                                if(v1.salesQty>=$scope.minMemberVoucherSalesInfo.num){
                                    v1.sum+=$scope.minMemberVoucherSalesInfo.num*v2.newPriceincents+(v1.salesQty-$scope.minMemberVoucherSalesInfo.num)*v1.costPrice/100;
                                }else{
                                    v1.sum+=v1.salesQty* v2.newPriceincents;
                                    remainQty= $scope.minMemberVoucherSalesInfo.num-v1.salesQty;
                                }
                                //循环其它商品
                                angular.forEach($scope.salesData,function (v3,k3) {
                                    if(k1!=k3){
                                        var isInSku=false;
                                        var skuNewPrice='';
                                        for(var i=0;i<$scope.minMemberVoucherSalesInfo.skuArray.length;i++){
                                            if(v3.skuId==$scope.minMemberVoucherSalesInfo.skuArray[i].skuId){
                                                isInSku=true;
                                                skuNewPrice=$scope.minMemberVoucherSalesInfo.skuArray[i].newPriceincents;
                                            }
                                        }
                                        if(isInSku){
                                            if(v3.salesQty>=remainQty){
                                                v1.sum+= remainQty*skuNewPrice+(v3.salesQty-remainQty)*v3.costPrice/100;

                                            }else{
                                                v1.sum+=v3.salesQty*skuNewPrice;
                                                remainQty=remainQty-v3.salesQty;
                                            }
                                        }else{
                                            v1.sum+= v3.salesQty*v3.costPrice/100;
                                        }
                                    }
                                });
                                v1.flag=true;
                            }
                        });
                        if(v1.flag){
                            $scope.minMemberVoucherSalesInfo.calcuValue.push(v1.sum)
                        }
                    });
                    $scope.minMemberVoucherSalesInfo.minValue=_.min($scope.minMemberVoucherSalesInfo.calcuValue);
                    //$scope.minMemberVoucherArr.push($scope.minMemberVoucherInfo.minValue);
                    $scope.usingSalesCount=$scope.minMemberVoucherSalesInfo.num;
                    $scope.minMemberVoucherSalesInfo.voucherInfoTotalPrice=$scope.minMemberVoucherSalesInfo.minValue;
                    $scope.minSalesPrice= $scope.minMemberVoucherSalesInfo.voucherInfoTotalPrice;
                    $scope.discountSales=Number($scope.commonSalesPriceTotal-$scope.minSalesPrice).toFixed(2);
                    //$scope.calcTotal();
                    $scope.sumDiscount=$scope.discountSales;
                    if(!voucherFlag){
                        $scope.selIndex=0;
                        //$scope.selIndex=3;
                        $scope.minPrice= parseFloat($scope.commonPriceTotal);
                    }
                }else{
                    console.log($scope.minMemberVoucherInfo)
                    console.log($scope.salesSelIndex)
                    console.log($scope.selIndex)
                    if($scope.memberVoucherSalesInfo.length>0){
                        $scope.minMemberVoucherInfo=1
                    }
                    if(voucherFlag){
                        $scope.selIndex=3;
                        $scope.salesSelIndex=0;
                        $scope.minSalesPrice= parseFloat($scope.commonSalesPriceTotal);
                    }else{
                        $scope.selIndex=0;
                        $scope.salesSelIndex=0;
                        $scope.minSalesPrice= parseFloat($scope.commonSalesPriceTotal);
                    }

                }
            }
            if(voucherFlag&&voucherSalesFlag){
                $scope.selIndex=3;
                $scope.salesSelIndex=3;
                $scope.sumDiscount=Number(parseFloat($scope.discountSales)+parseFloat($scope.discount)).toFixed(2);
            }
            $scope.rightsIndex=1;//放出卖品标识
            //console.log($scope.sumDiscount)
        } else if($scope.currentShowIndex==3){
            var voucherFlag=false;
            $scope.rightsIndex=1;//判断是折扣卡就放出卖品标识
            for(var i=0;i<$scope.memberEquityCardInfoData.length;i++){
                if($scope.memberEquityCardInfoData[i].isActive){
                    $scope.minMemberEquityCardInfo=$scope.memberEquityCardInfoData[i];
                    $scope.newPrice =$scope.memberEquityCardInfoData[i].newPriceincents;
                    if($scope.memberEquityCardInfoData[i].equitycardType =="FILM_DISCOUNT_EQUITYCARD"){
                        $scope.equitycardType="FILM_DISCOUNT_EQUITYCARD"
                    }else if($scope.memberEquityCardInfoData[i].equitycardType=="FILM_PASS_EQUITYCARD"){
                        if($scope.currentScheduleData.seatFormat2.length>$scope.memberEquityCardInfoData[i].equitycardResidue){
                            $scope.cheackPrice =$scope.commonPrice*($scope.currentScheduleData.seatFormat2.length-$scope.memberEquityCardInfoData[i].equitycardResidue)
                        }else if($scope.currentScheduleData.seatFormat2.length<=$scope.memberEquityCardInfoData[i].equitycardResidue){
                            $scope.cheackPrice = $scope.currentScheduleData.seatFormat2.length* $scope.newPrice
                        }
                        $scope.equitycardType="FILM_PASS_EQUITYCARD"
                    }
                    voucherFlag=true;
                    break;
                }
            }
            if(voucherFlag){
                $scope.selIndex=4;
                $scope.salesSelIndex=0;

                if($scope.equitycardType=="FILM_DISCOUNT_EQUITYCARD"){
                    $scope.rightsIndex=1;//判断是折扣卡就放出卖品标识
                    $scope.minPrice=$scope.newPrice*$scope.currentScheduleData.seatFormat2.length
                }else if($scope.equitycardType=="FILM_PASS_EQUITYCARD"){
                    $scope.salesData.map(function(item){
                        item.salesQty=0
                    });
                    $scope.rightsIndex=11;//判断是次卡就隐藏卖品标识
                    $scope.minSalesPrice=0;
                    $scope.valuesSalesData=[];
                    $scope.memberCardSalesInfo= [];//会员卡信息
                    $scope.activitySalesInfo= [];//活动信息
                    $scope.memberVoucherSalesInfo= [];//优惠券信息
                    $scope.scrollTop();
                    $scope.minPrice=$scope.cheackPrice
                }
                $scope.discount= ($scope.commonPriceTotal-$scope.minPrice).toFixed(2);
                $scope.sumDiscount=$scope.discount;
                //$scope.calcTotal();
            }else{
                $scope.selIndex=0;
                $scope.minPrice= parseFloat($scope.commonPriceTotal);
            }
        }
        $scope.hideModal();
        console.log($scope.selIndex)
        console.log($scope.salesSelIndex)
    };


    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop();
    };
    $scope.$on("$ionicView.enter", function (event, data) {
        $ionicModal.fromTemplateUrl('templates/activityList.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.getQueryActivityInfo();
    });

    $scope.$on("$ionicView.leave", function (event, data) {
        if($scope.modal){
            $scope.modal.hide();
            $ionicBackdrop.release();
        }
        if($scope.modalDetail){
            $scope.modalDetail.hide();
            $ionicBackdrop.release();
        }
    });

    $scope.$on("$ionicView.enter", function (event, data) {
        $ionicModal.fromTemplateUrl('activityDetail', {
            scope: $scope
        }).then(function (modal) {
            $scope.modalDetail = modal;
        });
    });

    //显示活动描述
    $scope.toggleDetail = function (index) {
        $scope.activityInfo[index].showCon = !$scope.activityInfo[index].showCon;
    };
    //卖品显示活动描述
    $scope.toggleSalesDetail = function (index) {
        $scope.activitySalesInfo[index].showCon = !$scope.activitySalesInfo[index].showCon;
    };
    //显示权益卡描述
    $scope.toggleEquityCardDetail = function (index) {
        $scope.memberEquityCardInfoData[index].showCon = !$scope.memberEquityCardInfoData[index].showCon;
    };

    //影片优惠切换选中
    $scope.toggleSelect = function (row,index) {
        if($scope.currentShowIndex==1){
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
            //console.log($scope.activityInfo)
        }else if($scope.currentShowIndex==2){
            if (row.lightingFlag == 'Y') {
                row.isActive = !row.isActive;
                if (row.isActive) {
                    angular.forEach($scope.memberVoucherInfoData, function (value, key) {
                        if (value != row) {
                            value.isActive = false;
                        }
                    });
                }
            }
            console.log($scope.memberVoucherInfoData)
        }else if($scope.currentShowIndex==3){
            if (row.lightingFlag == 'Y') {
                row.isActive = !row.isActive;
                if (row.isActive) {
                    angular.forEach($scope.memberEquityCardInfoData, function (value, key) {
                        if (value != row) {
                            value.isActive = false;
                        }
                    });
                }
            }
        }
    };

    //卖品优惠切换选中
    $scope.toggleSalesSelect = function (item,index) {
        if($scope.currentShowIndex==1){
            if ($scope.activitySalesInfo[index].lightingFlag == 'Y') {
                $scope.activitySalesInfo[index].isActive = !$scope.activitySalesInfo[index].isActive;
                if ($scope.activitySalesInfo[index].isActive) {
                    angular.forEach($scope.activitySalesInfo, function (value, key) {
                        if (key != index) {
                            value.isActive = false;
                        }
                    });
                }
            }
        }else if($scope.currentShowIndex==2){
            if (item.lightingFlag == 'Y') {
                item.isActive = !item.isActive;
                if (item.isActive) {
                    angular.forEach($scope.memberVoucherSalesInfo, function (value, key) {
                        if (value != item) {
                            value.isActive = false;
                            value.num=0;
                        }
                    });
                }
            }
        }

    };


    $scope.hideModal = function () {
        $scope.modal.hide();
        $ionicBackdrop.release();
    };


    //修改接收短信手机号码
    $scope.changeReceivePhoneNumber=function(){
        if($scope.user.mobileNumber){
            httpService.getData(JYApi.updateReceivePhoneNumber, 'post', {
                params:JSON.stringify({
                    "orderCode":$scope.ordNum,
                    "receivePhoneNumber":$scope.user.mobileNumber
                })
            }, function (res) {

            });
        }
    };

    //获取卖品信息
    $scope.findItemGood=function (pageIndex,pageRows) {
        $scope.page=pageIndex;
        $scope.showAll=false;
        httpService.getData(JYApi.findItemGood, 'post', {
            params:JSON.stringify({
                imgChannel:"APP",
                skuItemType:"GROUND_GOODS",
                cinemaOuterId:$scope.currentScheduleData.cinemaOuterId,
                type:"itemGoods",
                pageIndex:pageIndex,
                pageRows:pageRows
            })
        }, function (res) {
            if(pageIndex==1){
                $scope.salesData=res.data;
                angular.forEach($scope.salesData,function (value,key) {
                    value.salesQty=0;
                });
            }else{
                angular.forEach(res.data,function (value,key) {
                    value.salesQty=0;
                    $scope.salesData.push(value);
                });
            }

            if(res.count>$scope.salesData.length){
                $scope.hasMore=true;
            }else if(res.count<$scope.salesData.length){
                $scope.hasMore=false;
                $scope.showAll=true;
            }else if(res.count=$scope.salesData.length&&$scope.jiazai==true){
                $scope.hasMore=false;
                $scope.showAll=true;
            }
            $ionicScrollDelegate.resize();
        });
    };
    $scope.findItemGood($scope.page,$scope.pageSizeDefault);

    //加载更多
    $scope.getMoreSales=function () {
        $scope.page++;
        $scope.jiazai=true;
        if($scope.page==1){
            $scope.findItemGood(1,$scope.pageSize);
        }else{
            $scope.findItemGood($scope.page,$scope.pageSizeDefault);
        }

    };

    //数量控制
    $scope.incr=function(row){
        if(row.lightingFlag == 'Y'){
            $scope.flag=true;
            if (row.num >=0) {
                angular.forEach($scope.memberVoucherInfoData, function (value, key) {
                    if (value != row) {
                        value.num = 0;
                    }
                });
            }
            if(row.speciesCodeNum >= $scope.currentScheduleData.seatFormat2.length){
                if(row.num<$scope.currentScheduleData.seatFormat2.length){
                    row.num += 1;
                }
                if(row.num==$scope.currentScheduleData.seatFormat2.length) {
                    row.num =$scope.currentScheduleData.seatFormat2.length
                }
            }else if(row.speciesCodeNum < $scope.currentScheduleData.seatFormat2.length){
                if(row.num<row.speciesCodeNum){
                    row.num += 1;
                }
                if(row.num == row.speciesCodeNum){
                    row.num = row.speciesCodeNum
                }
            }else{
                row.num += 1;
            }
        }
    };
    $scope.decr=function(row){
        if(row.lightingFlag == 'Y'){
            $scope.flag=true;
            //只有大于0的时候才减
            if(row.num>0){
                row.num -= 1;
            }
        }
    };
    //卖品数量控制
    $scope.incrSales=function(row){
        if(row.lightingFlag == 'Y'){
            $scope.salesflag=true;
            if (row.num >=0) {
                angular.forEach($scope.memberVoucherSalesInfo, function (value, key) {
                    if (value != row) {
                        value.num = 0;
                    }
                });
            }
            if(row.speciesCodeNum >= row.totalAvailableNum){
                if(row.num<row.totalAvailableNum){
                    row.num += 1;
                }
                if(row.num==row.totalAvailableNum) {
                    row.num =row.totalAvailableNum
                }
            }else if(row.speciesCodeNum < row.totalAvailableNum){
                if(row.num<row.speciesCodeNum){
                    row.num += 1;
                }
                if(row.num == row.speciesCodeNum){
                    row.num = row.speciesCodeNum
                }
            }else{
                row.num += 1;
            }
        }
    };
    $scope.decrSales=function(row){
        if(row.lightingFlag == 'Y'){
            $scope.salesflag=true;
            //只有大于0的时候才减
            if(row.num>0){
                row.num -= 1;
            }
        }
    };

    //购物数量控制
    $scope.valuesSalesData=[];
    $scope.add=function (item,index) {
        $scope.salesData[index].salesQty++;
        //$scope.calcTotal();
        $scope.commonSalesPriceTotal=0;
        $scope.valuesSalesData=[];
        angular.forEach($scope.salesData,function (value,key) {
            $scope.commonSalesPriceTotal+=value.salesQty*value.costPrice/100;
            if(value.salesQty!=0){
                $scope.valuesSalesData.push({
                    skuId:value.skuId,
                    num:value.salesQty
                });
            }
        });
        $scope.getQuerySalesActivityInfo();
    };
    $scope.reduce=function (item,index) {
        //console.log(item)
        if($scope.salesData[index].salesQty>0){
            $scope.salesData[index].salesQty--;
            //$scope.calcTotal();
        }
        $scope.commonSalesPriceTotal=0;
        $scope.valuesSalesData=[];
        angular.forEach($scope.salesData,function (value,key) {
            $scope.commonSalesPriceTotal+=value.salesQty*value.costPrice/100;
            if(value.salesQty!=0){
                $scope.valuesSalesData.push({
                    skuId:value.skuId,
                    num:value.salesQty
                });
            }

        });
        $scope.getQuerySalesActivityInfo();

    };

    //获取卖品优惠信息
    $scope.getQuerySalesActivityInfo = function () {
        if($scope.valuesSalesData.length==0){
            $scope.salesSelIndex=0;
            $scope.minSalesPrice=0;
            $scope.sumDiscount= $scope.discount;
            $scope.memberCardSalesInfo= [];//会员卡信息
            $scope.activitySalesInfo= [];//活动信息
            $scope.memberVoucherSalesInfo= [];//优惠券信息
        }

        $scope.salesflag=false;
        console.log($scope.valuesSalesData.length)
        //angular.forEach($scope.valuesSalesData,function(value,key){
        //    if($scope.valuesSalesData[key].num==0){
        //        $scope.valuesSalesData.splice(key,1)
        //    }
        //});

        var params={
            cinemaOutId:$scope.salesData[0].cinemaOuterId,
            cinemaId: $scope.salesData[0].cinemaId,
            valuesData: $scope.valuesSalesData
        };
        httpService.getData(JYApi.sessionGoodsActivityInfo, 'post', {
            params: JSON.stringify(params)
        }, function (res) {
            if (res.status == 'S') {
                $scope.ActivitySalesData = res.data;
                $scope.memberCardSalesInfo= $scope.ActivitySalesData.memberCardInfo;//会员卡信息
                $scope.activitySalesInfo= $scope.ActivitySalesData.activityInfo;//活动信息
                $scope.memberVoucherSalesInfo= $scope.ActivitySalesData.memberVoucherInfo;//优惠券信息
                $scope.memberVoucherSalesInfo.map(function (item) {
                    item.num =0;
                });
                //计算最低会员价
                if($scope.selIndex==1 || $scope.selIndex==0){
                    if($scope.memberCardSalesInfo.HasCrad=='Y'){
                        $scope.minMemberCardSalesTotal=Number($scope.commonSalesPriceTotal);//会员价小计
                        //$scope.minMemberCardSalesTotal=10000;
                    }else{
                        $scope.minMemberCardSalesTotal=10000;
                    }
                }else{
                    $scope.minMemberCardSalesTotal=10000;
                }
                //计算最低活动价
                if($scope.selIndex==2|| $scope.selIndex==0){
                    if($scope.activitySalesInfo.length>0){
                        $scope.filterActivitySalesInfo= _.filter($scope.activitySalesInfo,function (item) {
                            return item.lightingFlag=='Y'
                        });
                        if($scope.filterActivitySalesInfo.length>0){
                            $scope.activityUnable=false;
                            $scope.minActivityArr=[];
                            angular.forEach($scope.filterActivitySalesInfo,function (value,key) {
                                var remainQty='';
                                value.calcuValue=[];
                                angular.forEach($scope.salesData,function (v1,k1) {
                                    v1.sum=0;
                                    v1.flag=false;
                                    angular.forEach(value.skuArray,function (v2,k2) {
                                        if(v1.skuId==v2.skuId){
                                            if(v1.salesQty>=value.discountQty){
                                                v1.sum+=value.discountQty*v2.newPriceincents+(v1.salesQty-value.discountQty)*v1.costPrice/100;
                                            }else{
                                                v1.sum+=v1.salesQty* v2.newPriceincents;
                                                remainQty= value.discountQty-v1.salesQty;
                                            }
                                            //循环其它商品
                                            angular.forEach($scope.salesData,function (v3,k3) {
                                                if(k1!=k3){
                                                    var isInSku=false;
                                                    var skuNewPrice='';
                                                    for(var i=0;i<value.skuArray.length;i++){
                                                        if(v3.skuId==value.skuArray[i].skuId){
                                                            isInSku=true;
                                                            skuNewPrice=value.skuArray[i].newPriceincents;
                                                        }
                                                    }
                                                    if(isInSku){
                                                        if(v3.salesQty>=remainQty){
                                                            v1.sum+= remainQty*skuNewPrice+(v3.salesQty-remainQty)*v3.costPrice/100;

                                                        }else{
                                                            v1.sum+=v3.salesQty*skuNewPrice;
                                                            remainQty=remainQty-v3.salesQty;
                                                        }
                                                    }else{
                                                        v1.sum+= v3.salesQty*v3.costPrice/100;
                                                    }
                                                }
                                            });
                                            v1.flag=true;
                                        }
                                    });
                                    if(v1.flag){
                                        value.calcuValue.push(v1.sum)
                                    }
                                });
                                value.minValue=_.min(value.calcuValue);
                                $scope.minActivityArr.push(value.minValue);
                            });
                            //console.log($scope.filterActivityInfo)
                            $scope.minActivityValue=_.min($scope.minActivityArr);//
                            $scope.minActivitySalesInfo = _.min($scope.filterActivitySalesInfo,function (item) {
                                return item.minValue
                            });

                        }else{
                            $scope.minActivitySalesInfo=10000;
                            $scope.minActivityValue=10000;
                            $scope.salesSelIndex=0;
                        }
                    }else{
                        $scope.minActivitySalesInfo=10000;
                        $scope.minActivityValue=10000;
                        $scope.salesSelIndex=0;
                    }
                }else{
                    $scope.minActivityValue=10000
                }
                //计算最低优惠价(卡卷)
                if($scope.selIndex==3|| $scope.selIndex==0) {
                    if ($scope.memberVoucherSalesInfo.length > 0) {
                        $scope.filterMemberVoucherSalesInfo = _.filter($scope.memberVoucherSalesInfo, function (item) {
                            return item.lightingFlag == 'Y'
                        });
                        if ($scope.filterMemberVoucherSalesInfo.length > 0) {

                            $scope.memberVoucherUnable = false;
                            $scope.minMemberVoucherArr = [];
                            angular.forEach($scope.filterMemberVoucherSalesInfo, function (value, key) {
                                var remainQty = '';
                                value.calcuValue = [];
                                angular.forEach($scope.salesData, function (v1, k1) {
                                    v1.sum = 0;
                                    v1.flag = false;
                                    angular.forEach(value.skuArray, function (v2, k2) {
                                        if (v1.skuId == v2.skuId) {
                                            if (v1.salesQty >= value.speciesCodeNum) {
                                                v1.sum += value.speciesCodeNum * v2.newPriceincents + (v1.salesQty - value.speciesCodeNum) * v1.costPrice / 100;
                                                //console.log(value.speciesCodeNum)
                                            } else {
                                                v1.sum += v1.salesQty * v2.newPriceincents;
                                                remainQty = value.speciesCodeNum - v1.salesQty;
                                                //console.log(v1.salesQty)
                                                //console.log(remainQty)
                                            }
                                            //循环其它商品
                                            angular.forEach($scope.salesData, function (v3, k3) {
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
                                                        if (v3.salesQty >= remainQty) {
                                                            v1.sum += remainQty * skuNewPrice + (v3.salesQty - remainQty) * v3.costPrice / 100;

                                                        } else {
                                                            v1.sum += v3.salesQty * skuNewPrice;
                                                            remainQty = remainQty - v3.salesQty;
                                                        }
                                                    } else {
                                                        v1.sum += v3.salesQty * v3.costPrice / 100;
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
                                //console.log(value.calcuValue)
                                //$scope.usingSalesCount=value.calcuValue.length;
                            });
                            console.log($scope.filterMemberVoucherSalesInfo)
                            $scope.minMemberVoucherValue = _.min($scope.minMemberVoucherArr);//
                            $scope.minMemberVoucherSalesInfo = _.min($scope.filterMemberVoucherSalesInfo, function (item) {
                                return item.minValue
                            });
                            $scope.usingSalesCount=$scope.minMemberVoucherSalesInfo.totalAvailableNum
                            //console.log($scope.minMemberVoucherSalesInfo.totalAvailableNum)
                            $scope.bindingVoucherFlag=1;
                            console.log($scope.bindingVoucherFlag)
                        } else {
                            $scope.minMemberVoucherSalesInfo = 10000;
                            $scope.minMemberVoucherValue=10000;
                            $scope.salesSelIndex=0;
                            $scope.bindingVoucher=false;
                        }
                    } else {
                        $scope.minMemberVoucherSalesInfo = 10000;
                        $scope.minMemberVoucherValue=10000;
                        $scope.salesSelIndex=0;
                        $scope.bindingVoucher=true;
                        $scope.bindingVoucherFlag=2;
                    }
                }else{
                    $scope.minMemberVoucherValue=10000;
                    $scope.minMemberVoucherSalesInfo = 10000;
                    $scope.salesSelIndex=0;
                    $scope.bindingVoucherFlag=2;
                    $scope.bindingVoucher=false;
                }

                //最终的优惠价
                console.log($scope.bindingVoucher)
                console.log($scope.bindingVoucherFlag)
                console.log($scope.commonSalesPriceTotal);
                console.log($scope.minMemberCardSalesTotal);
                console.log($scope.minActivityValue);
                console.log($scope.minMemberVoucherValue);


                $scope.minSalesPrice=parseFloat(Math.min($scope.commonSalesPriceTotal,$scope.minMemberCardSalesTotal,$scope.minActivityValue,$scope.minMemberVoucherValue));
                $scope.discountSales=Number($scope.commonSalesPriceTotal-$scope.minSalesPrice).toFixed(2);
                //console.log(parseInt($scope.discountSales)+parseInt($scope.discount));
                //console.log($scope.discountSales)
                //console.log($scope.discount)
                $scope.minPrice=parseFloat($scope.minPrice);
                console.log($scope.minPrice)
                console.log($scope.discount)
                console.log($scope.discountSales)
                $scope.sumDiscount=(parseFloat($scope.discountSales)+parseFloat($scope.discount)).toFixed(2);
                console.log($scope.filterActivitySalesInfo)
                angular.forEach($scope.filterActivitySalesInfo,function (value,key) {
                    if(value.minValue==$scope.minSalesPrice){
                        $scope.minActivitySalesInfo=value;
                    }
                });
                angular.forEach($scope.filterMemberVoucherInfo,function (value,key) {
                    if(value.minValue==$scope.minSalesPrice){
                        $scope.minMemberVoucherSalesInfo=value;
                    }
                });

                if($scope.minPrice==10000){
                    $scope.selIndex=0;
                    $scope.minSalesPrice= $scope.commonSalesPriceTotal;
                }else{
                    if($scope.minMemberCardSalesTotal==$scope.minSalesPrice){
                        $scope.salesSelIndex=1;
                    }else if($scope.minActivityValue==$scope.minSalesPrice){
                        $scope.salesSelIndex=2;
                        $scope.tuijianActivityInfoId=$scope.minActivityInfo.ruleHeaderId;
                    }else if($scope.minMemberVoucherValue==$scope.minSalesPrice){
                        $scope.salesSelIndex=3;
                    } else{
                        $scope.salesSelIndex=0;
                        $scope.minSalesPrice= $scope.commonSalesPriceTotal;
                    }
                }
            }else{
                console.log($scope.selIndex)
                console.log($scope.minMemberVoucherInfo)
                console.log($scope.salesSelIndex)
            }
        },1,'加载中');
    };


    //锁座生成订单
    $scope.buildOrder = function () {
        //console.log($scope.minMemberVoucherInfo)
        $scope.speciesCode = $scope.minMemberVoucherInfo.speciesCode;
        if($scope.minMemberVoucherSalesInfo){
            $scope.speciesSalesCode = $scope.minMemberVoucherSalesInfo.speciesCode;
        }else{
            $scope.speciesSalesCode =''
        }
        if($scope.valuesSalesData.length==0){
            $scope.salesSelIndex=0;
        }
        if ($scope.selIndex == 1) {
            $scope.bookingType = 'CARD';
        } else if ($scope.selIndex == 2) {
            $scope.activityId = $scope.minActivityInfo.ruleHeaderId;

            $scope.bookingType = 'ACTIVITY';
        } else if ($scope.selIndex == 3) {
            $scope.activityId = $scope.minMemberVoucherInfo.voucherRuleId;

            $scope.bookingType = 'VOUCHER';
        } else if ($scope.selIndex == 4) {
            $scope.activityId = $scope.minMemberEquityCardInfo.ruleHeaderId;
            $scope.bookingType = 'EQUITY_CARD';
            $scope.equitycardInfoId = $scope.minMemberEquityCardInfo.equitycardInfoId
        }else {
            $scope.bookingType = ''
        }
        if ($scope.salesSelIndex == 1) {
            $scope.salesBookingType = 'CARD';
        }else if ($scope.salesSelIndex == 2) {
            $scope.salesBookingType = 'ACTIVITY';
            if($scope.minActivitySalesInfo){
                $scope.activitySalesId = $scope.minActivitySalesInfo.ruleHeaderId;
            }
        }else if ($scope.salesSelIndex == 3) {
            $scope.salesBookingType = 'VOUCHER';
            if($scope.minMemberVoucherSalesInfo){
                $scope.activitySalesId = $scope.minMemberVoucherSalesInfo.voucherRuleId;
            }
        }else {
            $scope.salesBookingType = ''
        }

        //生成订单
        var params = {
            BookingFeeOverride: $scope.currentScheduleData.surchargeAmount,
            orderType: "ORDER",
            memberLevel: JSON.parse(localStorage.userInfo).level,
            memberId: JSON.parse(localStorage.userInfo).memberId,
            memberName: JSON.parse(localStorage.userInfo).mmbName,
            receivePhoneNumber: JSON.parse(localStorage.userInfo).mobileNumber,
            TicketTypes: [
                {
                    TicketTypeCode: $scope.currentScheduleData.tickettypeCode,
                    Qty: $scope.currentScheduleData.seatFormat2.length,
                    PriceInCents: $scope.currentScheduleData.priceincents,
                    BookingFeeOverride: $scope.currentScheduleData.surchargeAmount
                }
            ],
            cinemaId: $scope.currentScheduleData.cinemaId,//cinemaOutId
            cinemaOutId: $scope.currentScheduleData.cinemaOuterId,//cinemaOutId
            sessionId: $scope.currentScheduleData.sessionOutId,//sessionId
            skuId: $scope.currentScheduleData.skuId,//skuid
            filmId: $scope.currentScheduleData.filmId,
            instId: $scope.currentScheduleData.instId,
            filmOutId: $scope.currentScheduleData.filmOuterId,
            sessionAttribute: $scope.currentScheduleData.sessionAttribute,
            screenId: $scope.currentScheduleData.screenId,
            cinemaFinCode: $scope.currentScheduleData.cinemaFinCode,
            cardId: JSON.parse(localStorage.userInfo).membercardId ? JSON.parse(localStorage.userInfo).membercardId : '',
            cardNumber: JSON.parse(localStorage.userInfo).chipNumber ? JSON.parse(localStorage.userInfo).chipNumber : '',
            cardType: "",
            showtime: $filter('date')($scope.currentScheduleData.showtime, 'yyyy-MM-dd HH:mm:ss'),
            totalAmount: $scope.currentScheduleData.seatFormat2.length * $scope.currentScheduleData.priceincents,
            price: $scope.currentScheduleData.priceincents,
            num: $scope.currentScheduleData.seatFormat2.length,
            seatDeatilMessage: $scope.currentScheduleData.seatFormat,
            seatCodeMessage: $scope.currentScheduleData.seatFormat4,
            selectedSeats: $scope.currentScheduleData.seatFormat2,
            Seats: $scope.currentScheduleData.seatFormat3,
            versionNumber: "1.23",
            updateVersion: "1.26",
            bookingType: $scope.bookingType,
            equitycardInfoId: $scope.selIndex==4 ? $scope.equitycardInfoId : '',
            activityId: $scope.activityId,
            screenName: $scope.currentScheduleData.screenName,
            runTime: $scope.currentScheduleData.runTime,
            activityGroupId:$scope.selIndex==2?$scope.minActivityInfo.activityGroupId:'',
            usingCount:$scope.selIndex==3 ? $scope.usingCount : '',
            speciesCode:$scope.selIndex==3 ? $scope.speciesCode : '',
            discountData:{
                bookingType: $scope.salesBookingType,
                activityId: $scope.activitySalesId,
                activityGroupId:$scope.salesSelIndex==2&&$scope.minActivitySalesInfo?$scope.minActivitySalesInfo.activityGroupId:'',
                usingCount:$scope.salesSelIndex==3 ? $scope.usingSalesCount : '',
                speciesCode:$scope.salesSelIndex==3 ? $scope.speciesSalesCode : ''
            }
        };
        //卖品订单
        if($scope.valuesSalesData.length>0){
            angular.forEach($scope.valuesSalesData,function(value,key){
                if($scope.valuesSalesData[key].num==0){
                    $scope.valuesSalesData.splice(key,1)
                }
            });
            params.orderFlag='GOODS';
            params.valuesData=$scope.valuesSalesData;
        }
        httpService.getData(JYApi.bookingTickets, 'post', {
            params: JSON.stringify(params)
        }, function (res) {
            if (res.status == "S") {
                $state.go('pay', {ordNum: res.data});
            }else if(res.status == "P"){
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
        }, 1, '正在提交');
    };
});






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
app.controller('querySalesOrderCtrl', function ($scope, $rootScope, $stateParams,$ionicScrollDelegate, $ionicBackdrop, $ionicModal, $interval, httpService, JYApi, $http, myhrefService, $state, $timeout, $ionicHistory, $ionicPopup, $filter) {

    $scope.selesParams=JSON.parse(sessionStorage.selesParams);
    $scope.commonPriceTotal=0;
    $scope.valuesData=[];
    angular.forEach($scope.selesParams,function (value,key) {
        $scope.commonPriceTotal+=value.salesQty*value.costPrice/100;
        $scope.valuesData.push({
            skuId:value.skuId,
            num:value.salesQty
        });

    });

    console.log($scope.selesParams)
    //获取优惠信息
    $scope.getQueryActivityInfo = function () {
        var params={
                cinemaOutId:$scope.selesParams[0].cinemaOuterId,
                cinemaId: $scope.selesParams[0].cinemaId,
            skuItemType: 'GROUND_GOODS',
                valuesData: $scope.valuesData
            };
        httpService.getData(JYApi.sessionGoodsActivityInfo, 'post', {
            params: JSON.stringify(params)
        }, function (res) {
            if (res.status == 'S') {
                $scope.ActivityData = res.data;
                $scope.memberCardInfo= $scope.ActivityData.memberCardInfo;//会员卡信息
                $scope.activityInfo= $scope.ActivityData.activityInfo;//活动信息
                $scope.memberVoucherInfo= $scope.ActivityData.memberVoucherInfo;//优惠券信息
                $scope.memberVoucherInfo.map(function (item) {
                        item.num =0;
                });
                //计算最低会员价
                if($scope.memberCardInfo.HasCrad=='Y'&&$scope.memberCardInfo.hasRemainder=='Y'){
                    $scope.minMemberCardTotal=Number($scope.commonPriceTotal);//会员价小计
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
                        $scope.minActivityArr=[];
                        angular.forEach($scope.filterActivityInfo,function (value,key) {
                            var remainQty='';
                            value.calcuValue=[];
                            angular.forEach($scope.selesParams,function (v1,k1) {
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
                                        angular.forEach($scope.selesParams,function (v3,k3) {
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
                        $scope.minActivityInfo = _.min($scope.filterActivityInfo,function (item) {
                            return item.minValue
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
                 if($scope.memberVoucherInfo.length>0){
                     $scope.filterMemberVoucherInfo= _.filter($scope.memberVoucherInfo,function (item) {
                         return item.lightingFlag=='Y'
                     });
                     if($scope.filterMemberVoucherInfo.length>0){
                         $scope.memberVoucherUnable=false;
                         $scope.minMemberVoucherArr=[];
                         angular.forEach($scope.filterMemberVoucherInfo,function (value,key) {
                             var remainQty='';
                             value.calcuValue=[];
                             angular.forEach($scope.selesParams,function (v1,k1) {
                                 v1.sum=0;
                                 v1.flag=false;
                                 angular.forEach(value.skuArray,function (v2,k2) {
                                     if(v1.skuId==v2.skuId){
                                         if(v1.salesQty>=value.speciesCodeNum){
                                             v1.sum+=value.speciesCodeNum*v2.newPriceincents+(v1.salesQty-value.speciesCodeNum)*v1.costPrice/100;
                                         }else{
                                             v1.sum+=v1.salesQty* v2.newPriceincents;
                                             remainQty= value.speciesCodeNum-v1.salesQty;
                                         }
                                         //循环其它商品
                                         angular.forEach($scope.selesParams,function (v3,k3) {
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
                             $scope.minMemberVoucherArr.push(value.minValue);
                             $scope.usingCount=value.calcuValue.length;
                         });
                         //console.log($scope.filterMemberVoucherInfo)
                         $scope.minMemberVoucherValue=_.min($scope.minMemberVoucherArr);//
                         $scope.minMemberVoucherInfo = _.min($scope.filterMemberVoucherInfo,function (item) {
                             return item.minValue
                         });
                     }else{
                         $scope.minMemberVoucherInfo=10000;
                         $scope.minMemberVoucherValue=10000;
                         $scope.bindingVoucher=false;
                     }
                 }else{
                     $scope.minMemberVoucherInfo=10000;
                     $scope.minMemberVoucherValue=10000;
                     $scope.bindingVoucher=true;
                 }


                //最终的优惠价
                // console.log($scope.commonPriceTotal);
                // console.log($scope.minMemberCardTotal);
                // console.log($scope.minActivityValue);
                // console.log($scope.minMemberVoucherValue);


                $scope.minPrice=Math.min($scope.commonPriceTotal,$scope.minMemberCardTotal,$scope.minActivityValue,$scope.minMemberVoucherValue);
                $scope.discount=Number($scope.commonPriceTotal-$scope.minPrice).toFixed(2);
                 console.log($scope.minPrice);
                angular.forEach($scope.filterActivityInfo,function (value,key) {
                    if(value.minValue==$scope.minPrice){
                        $scope.minActivityInfo=value;
                    }
                });
                angular.forEach($scope.filterMemberVoucherInfo,function (value,key) {
                    if(value.minValue==$scope.minPrice){
                        $scope.minMemberVoucherInfo=value;
                    }
                });
                console.log($scope.usingCount)
                if($scope.minPrice==10000){
                    $scope.selIndex=0;
                    $scope.minPrice= $scope.commonPriceTotal;
                }else{
                    if($scope.minMemberCardTotal==$scope.minPrice){
                        $scope.selIndex=1;
                    }else if($scope.minActivityValue==$scope.minPrice){
                        $scope.selIndex=2;
                        $scope.tuijianActivityInfoId=$scope.minActivityInfo.ruleHeaderId;
                    }else if($scope.minMemberVoucherValue==$scope.minPrice){
                        $scope.selIndex=3;
                    } else{
                        $scope.selIndex=0;
                        $scope.minPrice= $scope.commonPriceTotal;
                    }
                }
            }
        },1,'加载中');
    };
    //$scope.getQueryActivityInfo();

    //选择会员卡支付
    $scope.selMemberCard=function () {
        if($scope.binding==true){
            $state.go('myVipHome')
        }else if($scope.binding==false){
            $state.go('recharge')
        }else if($scope.minMemberCardTotal!=10000) {
                if ($scope.selIndex == 1) {
                    $scope.selIndex = 0;
                    $scope.minPrice = $scope.commonPriceTotal;
                    $scope.discount = 0;
                } else {
                    $scope.selIndex = 1;
                    $scope.minPrice = $scope.minMemberCardTotal;
                    $scope.discount = Number($scope.commonPriceTotal - $scope.minPrice).toFixed(2);
                }
        }
    };

    //展开活动列表
    $scope.showModal = function (index) {
        $scope.currentShowIndex=index;
        //console.log($scope.minMemberVoucherInfo)
        switch (index){
            case 1:
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
                break;
            case 2:
                if($scope.bindingVoucher==true){
                    $state.go('yhj');
                    return;
                }else if($scope.minMemberVoucherInfo!=10000){
                    var activeOnce=true;
                    angular.forEach($scope.memberVoucherInfo, function (value, key) {
                        $scope.memberVoucherInfo[key].isActive = false;
                        if (value.lightingFlag=='Y' && $scope.minMemberVoucherInfo.voucherRuleId == value.voucherRuleId) {
                            if(activeOnce && $scope.selIndex==3){
                                $scope.memberVoucherInfo[key].isActive = true;
                                if(value.num==0){
                                    value.num=value.totalAvailableNum;
                                }
                                activeOnce=false;
                            }
                        }
                    });
                }
                break;
        }
        $scope.modal.show();
        $ionicBackdrop.retain();
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
                //console.log($scope.minActivityInfo)
                $scope.minActivityInfo.activityTotalPrice=$scope.minActivityInfo.minValue;
                $scope.minPrice= $scope.minActivityInfo.activityTotalPrice;
                $scope.discount=Number($scope.commonPriceTotal-$scope.minPrice).toFixed(2);
                $scope.calcTotal();
            }else{
                $scope.selIndex=0;
                $scope.minPrice= $scope.commonPriceTotal;
            }
        }else if($scope.currentShowIndex==2){
            var voucherFlag=false;
            for(var i=0;i<$scope.memberVoucherInfo.length;i++){
                if($scope.memberVoucherInfo[i].isActive){
                    $scope.minMemberVoucherInfo=$scope.memberVoucherInfo[i];
                    $scope.speciesCode =$scope.memberVoucherInfo[i].speciesCode;
                    voucherFlag=true;
                    break;
                }
            }
            //console.log($scope.minMemberVoucherInfo)
            if(voucherFlag){
                $scope.selIndex=3;
                var remainQty='';
                $scope.minMemberVoucherInfo.calcuValue=[];
                angular.forEach($scope.selesParams,function (v1,k1) {
                    v1.sum=0;
                    v1.flag=false;
                    angular.forEach($scope.minMemberVoucherInfo.skuArray,function (v2,k2) {
                        if(v1.skuId==v2.skuId){
                            if(v1.salesQty>=$scope.minMemberVoucherInfo.num){
                                v1.sum+=$scope.minMemberVoucherInfo.num*v2.newPriceincents+(v1.salesQty-$scope.minMemberVoucherInfo.num)*v1.costPrice/100;
                            }else{
                                v1.sum+=v1.salesQty* v2.newPriceincents;
                                remainQty= $scope.minMemberVoucherInfo.num-v1.salesQty;
                            }
                            //循环其它商品
                            angular.forEach($scope.selesParams,function (v3,k3) {
                                if(k1!=k3){
                                    var isInSku=false;
                                    var skuNewPrice='';
                                    for(var i=0;i<$scope.minMemberVoucherInfo.skuArray.length;i++){
                                        if(v3.skuId==$scope.minMemberVoucherInfo.skuArray[i].skuId){
                                            isInSku=true;
                                            skuNewPrice=$scope.minMemberVoucherInfo.skuArray[i].newPriceincents;
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
                        $scope.minMemberVoucherInfo.calcuValue.push(v1.sum)
                    }
                });
                $scope.minMemberVoucherInfo.minValue=_.min($scope.minMemberVoucherInfo.calcuValue);
                //$scope.minMemberVoucherArr.push($scope.minMemberVoucherInfo.minValue);
                //console.log($scope.minMemberVoucherInfo.num)
                $scope.usingCount=$scope.minMemberVoucherInfo.num;
                $scope.minMemberVoucherInfo.voucherInfoTotalPrice=$scope.minMemberVoucherInfo.minValue;
                $scope.minPrice= $scope.minMemberVoucherInfo.voucherInfoTotalPrice;
                $scope.discount=Number($scope.commonPriceTotal-$scope.minPrice).toFixed(2);
                $scope.calcTotal();
            }else{
                $scope.selIndex=0;
                $scope.minPrice= $scope.commonPriceTotal;
            }
        }
        $scope.hideModal();
    };

    //数量控制
    $scope.incr=function(row){
        if(row.lightingFlag == 'Y'){
            if (row.num >=0) {
                angular.forEach($scope.memberVoucherInfo, function (value, key) {
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
    $scope.decr=function(row){
        if(row.lightingFlag == 'Y'){
            //只有大于0的时候才减
            if(row.num>0){
                row.num -= 1;
            }
        }
    };

    $scope.$on("$ionicView.enter", function (event, data) {
        $ionicModal.fromTemplateUrl('templates/salesactivityList.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
    });

    $scope.$on("$ionicView.leave", function (event, data) {
        if($scope.modal){
            $scope.modal.hide();
            $ionicBackdrop.release();
        }
    });

    $scope.$on("$ionicView.enter", function (event, data) {
        $ionicModal.fromTemplateUrl('activityDetail', {
            scope: $scope
        }).then(function (modal) {
            $scope.modalDetail = modal;
        });
        $scope.getQueryActivityInfo();
    });

    //显示活动描述
    $scope.toggleDetail = function (index) {
        $scope.activityInfo[index].showCon = !$scope.activityInfo[index].showCon;
    };

    //切换选中
    $scope.toggleSelect = function (item,index) {
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
        }else if($scope.currentShowIndex==2){
            if (item.lightingFlag == 'Y') {
                item.isActive = !item.isActive;
                if (item.isActive) {
                    //console.log($scope.memberVoucherInfo)
                    angular.forEach($scope.memberVoucherInfo, function (value, key) {
                        if (value != item) {
                            value.isActive = false;
                            value.num=0;
                        }
                    });
                }
            }
        }

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

    $scope.hideModal = function () {
        $scope.modal.hide();
        $ionicBackdrop.release();
    };

    //计算卖品总价
    $scope.calcTotal=function () {
        $scope.salesTotal=0;
        //$scope.valuesData=[];
        angular.forEach($scope.salesData,function (value,key) {
            $scope.salesTotal+=(value.costPrice * value.salesQty)/100;
            // if(value.salesQty>0){
            //     $scope.valuesData.push({
            //         bn:value.bn,
            //         title:value.title,
            //         num:value.salesQty,
            //         price:value.costPrice
            //     });
            // }
        });
        $scope.salesTotal=Number($scope.salesTotal);
        $scope.needPayTotal=Number($scope.minPrice) + Number($scope.salesTotal);
    };

    $scope.toggleSales=function () {
        if($scope.pageSize==1){
            $scope.pageSize='';
            $scope.findItemGood('','');
        }else{
            $scope.salesData=$scope.salesData.splice(0,1);
        }
    };

    //生成订单
    $scope.buildOrder=function(){
        if($scope.updateTelphoneFlag==true){
            return;
        }
        if($scope.user.mobileNumber==''||$scope.user.mobileNumber==undefined||$scope.user.mobileNumber==null){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '请您输入接收短信的手机号'
            });
            $timeout(function(){
                myPopup.close();
            },1000);
            return;
        }
        $scope.speciesCode=$scope.minMemberVoucherInfo.speciesCode;
        if ($scope.selIndex == 1) {
            $scope.bookingType = 'CARD';
        } else if ($scope.selIndex == 2) {
            $scope.activityId = $scope.minActivityInfo.ruleHeaderId;
            $scope.bookingType = 'ACTIVITY';
        } else if ($scope.selIndex == 3) {
            $scope.activityId = $scope.minMemberVoucherInfo.voucherRuleId;
            $scope.bookingType = 'VOUCHER';
        }else {
            $scope.bookingType = ''
        }
        var params={
            channelId: "3",
            channelCode: "J0002",
            receivePhoneNumber: JSON.parse(localStorage.userInfo).mobileNumber?JSON.parse(localStorage.userInfo).mobileNumber:$scope.user.mobileNumber,
            cinemaOutId:$scope.selesParams[0].cinemaOuterId,
            screenName:$scope.selesParams[0].screenName,
            seatDeatilMessage:$scope.selesParams[0].seatDeatilMessage,
            scanCodeFlag:$scope.selesParams[0].scanCodeFlag,
            cinemaId: $scope.selesParams[0].cinemaId,
            valuesData:$scope.valuesData,
            memberId: JSON.parse(localStorage.userInfo).memberId,
            cardId: JSON.parse(localStorage.userInfo).memberCardId,
            cardNumber:JSON.parse(localStorage.userInfo).chipNumber,
            memberName: JSON.parse(localStorage.userInfo).mmbName,
            cardType:JSON.parse(localStorage.userInfo).level,
            discountData:{
                bookingType: $scope.bookingType,
                activityId: $scope.activityId,
                activityGroupId:$scope.selIndex==2?$scope.minActivityInfo.activityGroupId:'',
                usingCount:$scope.selIndex==3 ? $scope.usingCount : '',
                speciesCode:$scope.selIndex==3 ? $scope.speciesCode : ''
            }
        }
//console.log(params)
        //卖品订单
        if($scope.salesTotal>0){
            //params.orderFlag='GOODS';
            //params.valuesData=$scope.valuesData;
        }
        console.log(params)
        httpService.getData(JYApi.goodsOrder, 'post', {
            params: JSON.stringify(params)
        }, function (res) {
            if (res.status == "S") {
                $state.go('paySales', {ordNum: res.orderCode});
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


//扫码点餐
    $scope.user = {
        mobileNumber:JSON.parse(localStorage.userInfo).mobileNumber?JSON.parse(localStorage.userInfo).mobileNumber:''
    };
    $scope.$on("$ionicView.enter", function (event, data) {
        //localStorage.removeItem('urlScanCode');
        $rootScope.userInfo = JSON.parse(localStorage.userInfo);
    });
    //清除手机号码
    $scope.clearText = function () {
        $scope.user.mobileNumber = '';
    };
    //获取会员基础信息
    $scope.findMember=function(memberId){
        httpService.getData(JYApi.findMember, 'post', {
            params:JSON.stringify({
                "memberId":memberId
            })
        }, function (res) {
            if(res.status=="S"){
                var userInfo=res.data;
                userInfo.token= JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo=JSON.stringify(userInfo);
            }else{
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };
    $scope.updateTelphone=function(){
        if (!(/^1[34578]\d{9}$/.test($scope.user.mobileNumber))) {
            $rootScope.showTip('请您输入正确的手机号码！');
            $scope.updateTelphoneFlag=true;
        }else{
            if($scope.user.mobileNumber!=$rootScope.userInfo.mobileNumber) {
                        httpService.getData(JYApi.updateTelphone, 'post', {
                            params: JSON.stringify({
                                "mobileNumber": $scope.user.mobileNumber
                            })
                        }, function (res) {
                            if(res.status=='S'){
                                $scope.findMember()
                            }else{
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template: res.msg
                                });
                                $timeout(function(){
                                    myPopup.close();
                                },1000);
                            }
                        });
                    }
        }
    }







});






/**
 *
 */
'use strict';
app.controller('myGoodsCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi,$ionicScrollDelegate,$ionicSlideBoxDelegate,$stateParams) {
    //$scope.index=$stateParams.obj?$stateParams.obj:0;
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.activeIndex=0;
    $scope.page1=1;
    $scope.page2=1;
    $scope.page3=1;
    $scope.page4=1;
    $scope.page5=1;
    $scope.pageSize=20;
    $scope.noMorePage1=false;
    $scope.noMorePage2=false;
    $scope.noMorePage3=false;
    $scope.noMorePage4=false;
    $scope.noMorePage5=false;
    $scope.noMorePage=false;
    $scope.getCurrentData=function(index){
        $scope.activeIndex=index;
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideHasChanged=function(index){
        $scope.activeIndex=index;
        $scope.noMorePage=false;
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideTo=function(){
        return $scope.activeIndex;
    };
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.$on('$ionicView.enter',function(){
        //全部
        $scope.findDerivativeOrders('ALL',$scope.page1,$scope.pageSize,function(res){
            $scope.allData=res.data;
            $scope.count1=res.count;
        });
        //待付款
        $scope.findDerivativeOrders('UNPAID',$scope.page2,$scope.pageSize,function(res){
            $scope.unpaidData=res.data;
            $scope.count2=res.count;
        });
        //待收货
        $scope.findDerivativeOrders('DELIVERY_ADDRESS',$scope.page5,$scope.pageSize,function(res){
            $scope.deliveryData=res.data;
            $scope.count3=res.count;
        });
        //待提货
        $scope.findDerivativeOrders('SINCE_ADDRESS',$scope.page3,$scope.pageSize,function(res){
            $scope.sinceData=res.data;
            $scope.count4=res.count;
        });
        //退货退款
        $scope.findDerivativeOrders('REFUND',$scope.page4,$scope.pageSize,function(res){
            $scope.refundData=res.data;
            $scope.count5=res.count;
        });
    });
    $scope.findDerivativeOrders=function(flag,page,pageSize,suc,isDorefresh){
        httpService.getData(JYApi.findDerivativeOrders, 'post', {
            params:JSON.stringify({
                memberId:$rootScope.userInfo.memberId,
                label:flag,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            if(res.status=="S"){
                suc(res);
            }
        },2,'',isDorefresh);
    };

    //下拉刷新
    $scope.doRefresh = function () {
        //刷新数据
        $scope.noMorePage1=false;
        $scope.noMorePage2=false;
        $scope.noMorePage3=false;
        $scope.noMorePage4=false;
        $scope.noMorePage5=false;
        $scope.noMorePage=false;
        if($scope.activeIndex==0){
            $scope.findDerivativeOrders('ALL',1,$scope.pageSize,function(res){
                $scope.allData=res.data;
                $scope.page1=1;
            },true);
        }else if($scope.activeIndex==1){
            $scope.findDerivativeOrders('UNPAID',1,$scope.pageSize,function(res){
                $scope.unpaidData=res.data;
                $scope.page2=1;
            },true);
        }else if($scope.activeIndex==2){
            $scope.findDerivativeOrders('DELIVERY_ADDRESS',1,$scope.pageSize,function(res){
                $scope.paidData=res.data;
                $scope.page3=1;
            },true);
        }else if($scope.activeIndex==3){
            $scope.findDerivativeOrders('SINCE_ADDRESS',1,$scope.pageSize,function(res){
                $scope.paidData=res.data;
                $scope.page4=1;
            },true);
        } else if($scope.activeIndex==4){
            $scope.findDerivativeOrders('REFUND',1,$scope.pageSize,function(res){
                $scope.refundData=res.data;
                $scope.page5=1;
            },true);
        }
        $scope.$broadcast('scroll.refreshComplete');
    };
    //上拉加载更多
    $scope.loadMore=function(){
        if($scope.activeIndex==0){
            if($scope.allData.length<$scope.count1){
                $scope.page1++;
                $scope.findDerivativeOrders('ALL',$scope.page1,$scope.pageSize,function (res) {
                    if(res.status=="S" && res.data.length>0){
                        res.data.filter(function (item,index) {
                            $scope.allData.push(item);
                        });
                    }
                });
            }else{
                $scope.noMorePage1=true;
                $scope.noMorePage=true;
            }
        }else if($scope.activeIndex==1){
            if($scope.unpaidData.length<$scope.count2){
                $scope.page2++;
                $scope.findDerivativeOrders('UNPAID',$scope.page2,$scope.pageSize,function (res) {
                    if(res.status=="S" && res.data.length>0){
                        res.data.filter(function (item,index) {
                            $scope.unpaidData.push(item);
                        });
                    }
                });
            }else{
                $scope.noMorePage2=true;
                $scope.noMorePage=true;
            }
        }else if($scope.activeIndex==2){
            if($scope.paidData.length<$scope.count3){
                $scope.page3++;
                $scope.findDerivativeOrders('DELIVERY_ADDRESS',$scope.page3,$scope.pageSize,function (res) {
                    if(res.status=="S" && res.data.length>0){
                        res.data.filter(function (item,index) {
                            $scope.deliveryData.push(item);
                        });
                    }
                });
            }else{
                $scope.noMorePage3=true;
                $scope.noMorePage=true;
            }
        }else if($scope.activeIndex==3){
            if($scope.paidData.length<$scope.count4){
                $scope.page4++;
                $scope.findDerivativeOrders('SINCE_ADDRESS',$scope.page4,$scope.pageSize,function (res) {
                    if(res.status=="S" && res.data.length>0){
                        res.data.filter(function (item,index) {
                            $scope.sinceData.push(item);
                        });
                    }
                });
            }else{
                $scope.noMorePage4=true;
                $scope.noMorePage=true;
            }
        } else if($scope.activeIndex==4){
            if($scope.paidData.length<$scope.count5){
                $scope.page5++;
                $scope.findDerivativeOrders('REFUND',$scope.page5,$scope.pageSize,function (res) {
                    if(res.status=="S" && res.data.length>0){
                        res.data.filter(function (item,index) {
                            $scope.refundData.push(item);
                        });
                    }
                });
            }else{
                $scope.noMorePage5=true;
                $scope.noMorePage=true;
            }
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    //去支付
    $scope.goPay=function(item){
        $scope.findDerivativeOrders('UNPAID',1,1,function(res){
            if(res.data.length>0){
                $state.go('paySales',{
                    ordNum:item.orderCode
                });
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: res.msg,
                    buttons: [
                        {
                            text: languageSetting.confirm,
                            type: 'button-calm',
                            onTap: function (e) {
                                $scope.unpaidData=res.data;
                            }
                        }
                    ]
                });

            }
        });
    };
    //取消订单
    $scope.cancelOrder=function(id){
        var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert',
            template: languageSetting.isCancelOrder+'?',
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
                        httpService.getData(JYApi.cancelOnlineOrder, 'post', {
                            params:JSON.stringify({
                                tid:id,
                                memberId:$rootScope.userInfo.memberId
                            })
                        }, function (res) {
                            if(res.status=="S"){
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template: res.msg
                                });
                                $timeout(function(){
                                    myPopup.close();
                                },2000);
                                $scope.doRefresh();
                            }else{
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template: res.msg
                                });
                                $timeout(function(){
                                    myPopup.close();
                                },2000);
                            }
                        },2);
                    }
                }
            ]
        });
    };


});

/**
 * Created by pgr on 16/9/12.
 * 2016.12.23 点击去支付操作增加判断订单是否失效
 * 2017.1.10 增加无数据提示
 * 2017.2.14 增加退票功能
 * 2017.4.7 修复去取票按钮显示不正常 IOS new Date().getTime()兼容问题 .replace(/-/g,'/')
 */
'use strict';
app.controller('myTicketsCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi,$ionicScrollDelegate,$ionicSlideBoxDelegate,$stateParams) {
    $scope.index=$stateParams.obj?$stateParams.obj:0;
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.activeIndex=$scope.index;
    $scope.getCurrentData=function(index){
        $scope.activeIndex=index;
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideHasChanged=function(index){
        $scope.activeIndex=index;
        // $ionicScrollDelegate.scrollTop();
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideTo=function(){
        return $scope.activeIndex;
    };
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.findOrderDetailInfo=function(flag,suc,isDorefresh){
        httpService.getData(JYApi.findOrderDetailInfo, 'post', {
            params:JSON.stringify({
                memberId:$rootScope.userInfo.memberId,
                type:flag
            })
        }, function (res) {
            if(res.status=="S"){
                suc(res);
            }
        },2,'',isDorefresh);
    };

    $scope.$on('$ionicView.enter',function(){
        //未取票
        $scope.findOrderDetailInfo('untake',function(res){
            $scope.untakeData=res.data;
            angular.forEach($scope.untakeData,function(value,key){
                value.seatObj=value.seatdetailMessage.split(',');
                if(value.showtimeIsk){
                  if(new Date().getTime()>new Date(value.showtimeIsk.replace(/-/g,'/')).getTime()){
                    value.disBtn=false;
                  }else{
                    value.disBtn=true;
                  }
                }
            });
        });
        //已取票
        $scope.findOrderDetailInfo('taked',function(res){
            $scope.takedData=res.data;
            angular.forEach($scope.takedData,function(value,key){
                value.seatObj=value.seatdetailMessage.split(',');
            });
        });
        //未支付
        $scope.findOrderDetailInfo('unpaid',function(res){
            $scope.unpaidData=res.data;
            angular.forEach($scope.unpaidData,function(value,key){
                value.seatObj=value.seatdetailMessage.split(',');
            });
        });
    });

    //去支付
    $scope.goPay=function(obj){
        $scope.findOrderDetailInfo('unpaid',function(res){
            if(res.data.length>0){
                $state.go('pay',{
                    ordNum:obj.orderCode
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

    $scope.goOrderSuccess=function(index){
        $scope.curData=$scope.untakeData[index];
        $scope.seatdetailMessage=$scope.curData.seatdetailMessage.split(',');
        $state.go('orderSuccessfully', {
            obj:$scope.seatdetailMessage,
            showtime:$scope.showtimeIsk,
            filmName:$scope.curData.filmName,
            filmId:$scope.curData.filmId,
            price:$scope.curData.totalAmount,
            ordNum:'',
            surchargeAmount:'',
            skuId:''
        });
    };
    //下拉刷新
    $scope.doRefresh = function () {
        //刷新数据
        if($scope.activeIndex==0){
            $scope.findOrderDetailInfo('untake',function(res){
                $scope.untakeData=res.data;
                angular.forEach($scope.untakeData,function(value,key){
                    value.seatObj=value.seatdetailMessage.split(',');
                    if(value.showtimeIsk){
                      if(new Date().getTime()>new Date(value.showtimeIsk.replace(/-/g,'/')).getTime()){
                        value.disBtn=false;
                      }else{
                        value.disBtn=true;
                      }
                    }
                });
            },true);
        }else if($scope.activeIndex==1){
            $scope.findOrderDetailInfo('taked',function(res){
                $scope.takedData=res.data;
                angular.forEach($scope.takedData,function(value,key){
                    value.seatObj=value.seatdetailMessage.split(',');
                });
            },true);
        }else if($scope.activeIndex==2){
            $scope.findOrderDetailInfo('unpaid',function(res){
                $scope.unpaidData=res.data;
                angular.forEach($scope.unpaidData,function(value,key){
                    value.seatObj=value.seatdetailMessage.split(',');
                });
            },true);
        }
        $scope.$broadcast('scroll.refreshComplete');
    };
    //取消订单
    $scope.cancelOrder=function(tid){
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
                        httpService.getData(JYApi.cancelOrder, 'post', {
                            params:JSON.stringify({
                                tid:tid
                            })
                        }, function (res) {
                            if(res.status=="S"){
                                $scope.findOrderDetailInfo('unpaid',function(res){
                                    $scope.unpaidData=res.data;
                                    angular.forEach($scope.unpaidData,function(value,key){
                                        value.seatObj=value.seatdetailMessage.split(',');
                                    });
                                });
                            }else{
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template: '小主,目前系统繁忙，请下拉刷新'
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

    //退票
    $scope.refund=function(ordNum){
        var myPopup = $ionicPopup.show({
            cssClass: 'jyAlert jyAlert1',
            title: '亲,您确定要退票吗?',
            buttons: [
                {
                    text: languageSetting.confirm,
                    type: 'button-calm',
                    onTap: function (e) {
                        httpService.getData(JYApi.refund, 'post', {
                            params:JSON.stringify({
                                orderCode:ordNum
                            })
                        }, function (res) {
                            if(res.status=="S"){
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template: '<i class="iconTip color-green ion-checkmark-circled"></i>'+res.msg
                                });
                                $timeout(function(){
                                    myPopup.close();
                                    window.location.reload();
                                },3000);
                            }else{
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert1',
                                    template: '<i class="iconTip ion-close-circled"></i>'+res.msg
                                });
                                $timeout(function(){
                                    myPopup.close();
                                },3000);
                            }
                        },1,'正在退票');
                    }
                },
                {
                    text: languageSetting.cancel,
                    type: 'button-default',
                    onTap: function (e) {
                        myPopup.close();
                    }
                }
            ]
        });


    };
});

/**
 *
 */
'use strict';
app.controller('mySalesCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi,$ionicScrollDelegate,$ionicSlideBoxDelegate,$stateParams) {
    $scope.index=$stateParams.obj?$stateParams.obj:0;
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
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
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.findOrderDetailInfo=function(flag,suc,isDorefresh){
        httpService.getData(JYApi.findGoodsOrder, 'post', {
            params:JSON.stringify({
                memberId:$rootScope.userInfo.memberId,
                orderStatus:flag
            })
        }, function (res) {
            if(res.status=="S"){
                suc(res);
            }
        },2,'',isDorefresh);
    };

    $scope.$on('$ionicView.enter',function(){
        //未领取
        $scope.findOrderDetailInfo('PAID',function(res){
            $scope.untakeData=res.data;

        });
        //已领取
        $scope.findOrderDetailInfo('COMPLETED',function(res){
            $scope.takedData=res.data;

        });
    });



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
            $scope.findOrderDetailInfo('PAID',function(res){
                $scope.untakeData=res.data;
            },true);
        }else if($scope.activeIndex==1){
            $scope.findOrderDetailInfo('COMPLETED',function(res){
                $scope.takedData=res.data;
            },true);
        }
        $scope.$broadcast('scroll.refreshComplete');
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
                        httpService.getData(JYApi.cancelOrder, 'post', {
                            params:JSON.stringify({
                                tid:id
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
                                    template: languageSetting.payOvertime
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

/**
 * Created by pgr on 18/4/18.
 */
'use strict';
app.controller('worldCup-detailCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi,$ionicScrollDelegate,$ionicSlideBoxDelegate,$stateParams) {
    $scope.index=0;
    $scope.activeIndex=$scope.index;
    $scope.page1=1;
    $scope.page2=1;
    $scope.page3=1;
    $scope.pageSize=10;
    $scope.noMorePage1=false;
    $scope.noMorePage2=false;
    $scope.noMorePage3=false;
    $scope.noMorePage=false;
    $scope.getCurrentData=function(index){
        $scope.activeIndex=index;
        $scope.noMorePage=false;
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideHasChanged=function(index){
        $scope.activeIndex=index;
        $scope.noMorePage=false;
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideTo=function(){
        $scope.noMorePage=false;
        return $scope.activeIndex;
    };

    //
    $scope.findguessingResults=function (status,page,pageSize,suc) {
        httpService.getData(JYApi.findguessingResults, 'post', {
            params:JSON.stringify({
                myFlag:status,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            suc(res);
        });
    };

    $scope.$on("$ionicView.enter", function (event, data) {
    $scope.findguessingResults('notOpenPrize',$scope.page,$scope.pageSize,function (res) {
        $scope.notSaleData=res.data;
        $scope.count1=res.count;
        $scope.$broadcast('scroll.refreshComplete');
    }); //未开奖

    $scope.findguessingResults('hitPrize',$scope.page,$scope.pageSize,function (res) {
        $scope.TURNED_BACKData=res.data;
        $scope.count2=res.count;
        $scope.$broadcast('scroll.refreshComplete');
    });  //已中奖


    $scope.findguessingResults('notHitPrize',$scope.page,$scope.pageSize,function (res) {
        $scope.EXPIREDData=res.data;
        $scope.count3=res.count;
        $scope.$broadcast('scroll.refreshComplete');
    }); //未中奖
    });

    $scope.voucherType=['notOpenPrize','hitPrize','notHitPrize'];
    //下拉刷新
    $scope.doRefresh = function () {
        //刷新数据
        $scope.noMorePage1=false;
        $scope.noMorePage2=false;
        $scope.noMorePage3=false;
        $scope.noMorePage=false;
        $scope.findguessingResults($scope.voucherType[$scope.activeIndex],1,$scope.pageSize,function (res) {
            if($scope.activeIndex==0){
                $scope.notSaleData=res.data;
                $scope.page1=1;
            }else if($scope.activeIndex==1){
                $scope.page2=1;
                $scope.TURNED_BACKData=res.data;
            }else{
                $scope.page3=1;
                $scope.EXPIREDData=res.data;

            }
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    //上拉加载更多
    $scope.loadMore=function(){
        if($scope.activeIndex==0){
            if($scope.notSaleData.length<$scope.count1){
                $scope.page1++;
                $scope.findguessingResults('notOpenPrize',$scope.page1,$scope.pageSize,function (res) {
                    if(res.status=="S" && res.data.length>0){
                        res.data.filter(function (item,index) {
                            $scope.notSaleData.push(item);
                        });
                    }
                });
            }else{
                $scope.noMorePage1=true;
                $scope.noMorePage=true;
            }
        }else if($scope.activeIndex==1){
            if($scope.TURNED_BACKData.length<$scope.count2){
                $scope.page2++;
                $scope.findguessingResults('hitPrize',$scope.page2,$scope.pageSize,function (res) {
                    if(res.status=="S" && res.data.length>0){
                        res.data.filter(function (item,index) {
                            $scope.TURNED_BACKData.push(item);
                        });
                    }
                });
            }else{
                $scope.noMorePage2=true;
                $scope.noMorePage=true;
            }
        }else if($scope.activeIndex==2){
            if($scope.EXPIREDData.length<$scope.count3){
                $scope.page3++;
                $scope.findguessingResults('notHitPrize',$scope.page3,$scope.pageSize,function (res) {
                    if(res.status=="S" && res.data.length>0){
                        res.data.filter(function (item,index) {
                            $scope.EXPIREDData.push(item);
                        });
                    }
                });
            }else{
                $scope.noMorePage3=true;
                $scope.noMorePage=true;
            }
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
});

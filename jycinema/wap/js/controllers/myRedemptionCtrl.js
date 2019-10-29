/**
 * Created by pgr on 18/4/18.
 */
'use strict';
app.controller('myRedemptionCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi,$ionicScrollDelegate,$ionicSlideBoxDelegate,$stateParams) {
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
    $scope.findguessingResults=function (api,page,pageSize,suc) {
        httpService.getData(api, 'post', {
            params:JSON.stringify({
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            suc(res);
        });
    };

    $scope.$on("$ionicView.enter", function (event, data) {
        $scope.findguessingResults(JYApi.findGuessingPrizeInfo, $scope.page, $scope.pageSize, function (res) {
            $scope.notSaleData = res.data;
            $scope.surplusExchangeTimes = res.surplusExchangeTimes;
            $scope.count1 = res.count;
            $scope.$broadcast('scroll.refreshComplete');
        }); //奖品列表

        $scope.findguessingResults(JYApi.findAlreadyExchangeRecord, $scope.page, $scope.pageSize, function (res) {
            $scope.TURNED_BACKData = res.data;
            $scope.count2 = res.count;
            $scope.$broadcast('scroll.refreshComplete');
        });  //已兑换


        $scope.findguessingResults(JYApi.findAllowExchangePrizeInfo, $scope.page, $scope.pageSize, function (res) {
            $scope.EXPIREDData = res.data;
            $scope.count3 = res.count;
            $scope.$broadcast('scroll.refreshComplete');
        }); //可兑换
    })

    $scope.voucherType=[JYApi.findGuessingPrizeInfo,JYApi.findAlreadyExchangeRecord,JYApi.findAllowExchangePrizeInfo];
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
                $scope.surplusExchangeTimes=res.surplusExchangeTimes;
                $scope.page1=1;
            }else if($scope.activeIndex==1){
                $scope.page2=1;
                $scope.TURNED_BACKData=res.data;
                $scope.surplusExchangeTimes=res.surplusExchangeTimes;
            }else{
                $scope.page3=1;
                $scope.EXPIREDData=res.data;
                $scope.surplusExchangeTimes=res.surplusExchangeTimes;
            }
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    //上拉加载更多
    $scope.loadMore=function(){
        if($scope.activeIndex==0){
            if($scope.notSaleData.length<$scope.count1){
                $scope.page1++;
                $scope.findguessingResults(JYApi.findGuessingPrizeInfo,$scope.page1,$scope.pageSize,function (res) {
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
                $scope.findguessingResults(JYApi.findAlreadyExchangeRecord,$scope.page2,$scope.pageSize,function (res) {
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
                $scope.findguessingResults(JYApi.findAllowExchangePrizeInfo,$scope.page3,$scope.pageSize,function (res) {
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

    //使用规则
    $scope.showRules=function (dec,e) {
        if(e.target.innerText!='兑换') {
            $ionicPopup.alert(
                {
                    title: '使用规则', // String. 弹窗的标题。
                    subTitle: '', // String (可选)。弹窗的子标题。
                    template: dec.ruleDesc, // String (可选)。放在弹窗body内的html模板。
                    templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
                    okText: '确定', // String (默认: 'OK')。OK按钮的文字。
                    okType: 'button-default', // String (默认: 'button-positive')。OK按钮的类型。
                }
            );
        }
    };
    $scope.redem=function(id){
        httpService.getData(JYApi.startExchangePrize, 'post', {
            params:JSON.stringify({
                guessingPrizeId:id
            })
        }, function (res) {
            if(res.status=='S'){
                $ionicPopup.alert(
                    {
                        title: '提示', // String. 弹窗的标题。
                        subTitle: '', // String (可选)。弹窗的子标题。
                        template: res.msg, // String (可选)。放在弹窗body内的html模板。
                        templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
                        okText: '确定', // String (默认: 'OK')。OK按钮的文字。
                        okType: 'button-default', // String (默认: 'button-positive')。OK按钮的类型。
                    }
                );
                $scope.doRefresh();
            }

        })
    }
});

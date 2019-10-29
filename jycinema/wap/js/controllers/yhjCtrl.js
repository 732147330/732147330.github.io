/**
 * 2017.05.3 增加优惠券
 * CASH_VOUCHER 现金券
 DISCOUNT_VOUCHER 折扣券
 TONGDUI_VOUCHER 通兑券
 COUPON_VOUCHER 礼券
 VIEWING_VOUCHER 观影券
 */
'use strict';
app.controller('yhjCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$ionicSlideBoxDelegate,$ionicPopup, $ionicPlatform, $timeout) {
    $scope.index=$stateParams.index?$stateParams.index:0;
    $scope.activeIndex=$scope.index;
    $scope.page1=1;
    $scope.page2=1;
    $scope.page3=1;
    $scope.pageSize=20;
    $scope.noMorePage1=false;
    $scope.noMorePage2=false;
    $scope.noMorePage3=false;
    $scope.noMorePage=false;

    $scope.cashData=[
        {data:[]},
        {data:[]},
        {data:[]}
    ];
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

    //获取优惠券方法
    $scope.getVoucher=function (status,page,pageSize,suc) {
        httpService.getData(JYApi.findVouLifetime, 'post', {
            params:JSON.stringify({
                type:"MyVou",
                voucherStatus:status,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            angular.forEach(res.data,function (value,key) {
                value.startDateActive=value.startDateActive.split(' ')[0];
                value.endDateActive=value.endDateActive.split(' ')[0];
                value.ruleDesc=value.ruleDesc.split("\n");
                for(var i=0;i<value.ruleDesc.length;i++){
                    value.ruleDesc[i]=value.ruleDesc[i]+'<br>';
                }
                value.ruleDesc=value.ruleDesc.join('');
            });
            suc(res);
        });
    };
    $scope.getVoucher('ON_SALE',$scope.page,$scope.pageSize,function (res) {
        $scope.notSaleData=res.data;
        $scope.count1=res.count;
        $scope.$broadcast('scroll.refreshComplete');
    });//未使用

    $scope.getVoucher('TURNED_BACK',$scope.page,$scope.pageSize,function (res) {
        $scope.TURNED_BACKData=res.data;
        $scope.count2=res.count;
        $scope.$broadcast('scroll.refreshComplete');
    });//已使用


    $scope.getVoucher('EXPIRED',$scope.page,$scope.pageSize,function (res) {
        $scope.EXPIREDData=res.data;
        $scope.count3=res.count;
        $scope.$broadcast('scroll.refreshComplete');
    });//已过期


    $scope.voucherType=['ON_SALE','TURNED_BACK','EXPIRED'];



    //使用规则
    $scope.showRules=function (dec,e) {
        if(e.target.innerText!='立即使用') {
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

    //添加优惠券
    $scope.addQuan=function () {
        $scope.activeIndex=0;
        $scope.data = {}
        $scope.myPopupYhq = $ionicPopup.show({
            template: '<div class="pos quan-add-tip"><input type="text" style="border: 1px solid #ccc;height:28px!important;line-height:28px!important;padding:0 30px 0 5px;border-radius:3px;" placeholder="请输入优惠券号码" ng-model="data.quanNum"><img on-tap="scanQuan()" src="./img/scan.png"></div>',
            title: '添加优惠券',
            subTitle: '',
            cssClass:'quanProup',
            scope: $scope,
            buttons: [
                {
                    text: '取消'
                },
                {
                    text: '<b>确定</b>',
                    onTap: function(e) {
                        if (!$scope.data.quanNum) {
                            //不允许用户关闭
                            e.preventDefault();
                        } else {
                            //myPopup.close();
                            httpService.getData(JYApi.updateVoucherMember, 'post', {
                                params:JSON.stringify({
                                    voucherExchangeCode:$scope.data.quanNum
                                })
                            }, function (res) {
                                var myPopup = $ionicPopup.show({
                                    title: languageSetting.tip,
                                    cssClass: 'jyAlert jyAlert2',
                                    template: res.msg
                                });
                                $timeout(function () {
                                    myPopup.close();
                                    $scope.doRefresh();
                                }, 2000);
                                //$scope.getVoucher('ON_SALE',1,$scope.pageSize);//未使用
                            });
                        }
                    }
                },
            ]
        });
    };

    //扫码券
    $scope.scanQuan=function () {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                if(result.length==12 && /[a-z]/.test(result)){
                    httpService.getData(JYApi.updateVoucherMember, 'post', {
                        params:JSON.stringify({
                            voucherExchangeCode:result
                        })
                    }, function (res) {
                        var myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert2',
                            template: res.msg
                        });
                        if(res.status=='S'){
                            $scope.myPopupYhq.close()
                        }
                        $timeout(function () {
                            myPopup.close();
                            $scope.doRefresh();
                        }, 2000);
                    });
                }
            }
        });
    };

    //下拉刷新
    $scope.doRefresh = function () {
        //刷新数据
        $scope.findMyVouLifetimeCount();
        $scope.noMorePage1=false;
        $scope.noMorePage2=false;
        $scope.noMorePage3=false;
        $scope.noMorePage=false;
        $scope.getVoucher($scope.voucherType[$scope.activeIndex],1,$scope.pageSize,function (res) {
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
                $scope.getVoucher('ON_SALE',$scope.page1,$scope.pageSize,function (res) {
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
                $scope.getVoucher('ON_SALE',$scope.page2,$scope.pageSize,function (res) {
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
                $scope.getVoucher('EXPIRED',$scope.page3,$scope.pageSize,function (res) {
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
    //查询未使用的券
    $scope.findMyVouLifetimeCount=function(){
        httpService.getData(JYApi.findMyVouLifetimeCount, 'post', {
            params:JSON.stringify({
                memberId:JSON.parse(localStorage.userInfo).memberId
            })
        }, function (res) {
            if(res.count>0){
                $scope.vouLifetimeCountFlag=true;
                $scope.vouLifetimeCount=res.count
            }else{
                $scope.vouLifetimeCountFlag=false;
            }
        });
    };
    $scope.findMyVouLifetimeCount();
});

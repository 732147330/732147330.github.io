/**
 * 2017.05.3 增加优惠券
 * CASH_VOUCHER 现金券
 DISCOUNT_VOUCHER 折扣券
 TONGDUI_VOUCHER 通兑券
 COUPON_VOUCHER 礼券
 VIEWING_VOUCHER 观影券
 */
'use strict';
app.controller('yhjCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$ionicSlideBoxDelegate,$ionicPopup,$cordovaBarcodeScanner, $ionicPlatform, $timeout) {
    $scope.index=$stateParams.index?$stateParams.index:0;
    $scope.activeIndex=$scope.index;
    $scope.page=1;
    $scope.pageSize=10;

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
            // if(res.status=="S" && res.data.length>0){
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

            // }
        });
    };
    $scope.getVoucher('ON_SALE',1,30,function (res) {
        $scope.notSaleData=res.data;
    });//未使用

    $scope.getVoucher('TURNED_BACK',1,30,function (res) {
        $scope.TURNED_BACKData=res.data;
    });//已使用


    $scope.getVoucher('EXPIRED',1,30,function (res) {
        $scope.EXPIREDData=res.data;
    });//已过期



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
        $scope.myPopup = $ionicPopup.show({
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
                  $scope.myPopup.close();
                  httpService.getData(JYApi.updateVoucherMember, 'post', {
                      params:JSON.stringify({
                          voucherExchangeCode:$scope.data.quanNum
                      })
                  }, function (res) {
                      $scope.myPopup = $ionicPopup.show({
                          title: languageSetting.tip,
                          cssClass: 'jyAlert jyAlert2',
                          template: res.msg
                      });
                      $timeout(function () {
                          $scope.myPopup.close();
                          $scope.getVoucher('ON_SALE',1,30,function (res) {
                              $scope.notSaleData=res.data;
                          });//未使用
                          $scope.findMyVouLifetimeCount();
                      }, 2000);
                  });
              }
            }
          },
        ]
      });
    };

    //扫码券
    $scope.scanQuan=function () {
      $ionicPlatform.ready(function(){
        $cordovaBarcodeScanner
          .scan()
          .then(function (barcodeData) {
                if (barcodeData.text) {
                    if (barcodeData.text.length == 12 && /[a-z]/.test(barcodeData.text)) {
                        httpService.getData(JYApi.updateVoucherMember, 'post', {
                            params: JSON.stringify({
                                voucherExchangeCode: barcodeData.text
                            })
                        }, function (res) {
                            if(res.status=='S'){
                                $scope.myPopup.close();
                            }
                            $scope.myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert2',
                                template: res.msg
                            });
                            $timeout(function () {
                                $scope.myPopup.close();
                            }, 2000);
                        });
                    }
                }
          }, function (error) {

          });
      });
    };

    //上拉加载更多
    // $scope.loadMore=function(){
    //   if($scope.activeIndex==0){
    //     $scope.page++;
    //     $scope.getVoucher('ON_SALE',$scope.page,$scope.pageSize,function (res) {
    //       if (res.status == "S" && res.data.length>0) {
    //         if($scope.page==1){
    //           $scope.notSaleData=[];
    //         }
    //         angular.forEach(res.data,function(v,k){
    //           $scope.notSaleData.push(v);
    //         });
    //         if(res.data.length<$scope.pageSize){
    //           $scope.noMorePage=true;
    //         }
    //         $scope.$broadcast('scroll.infiniteScrollComplete');
    //       }else{
    //         $scope.noMorePage=true;
    //       }
    //
    //     })
    //   }
    //
    // };
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

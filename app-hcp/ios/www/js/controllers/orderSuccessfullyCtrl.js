/**
 * Created by xiongshengzhong on 16/8/18.
 * 2016.12.9修改 获取订单详情逻辑 v1.2版需更新内容
 */
'use strict';
app.controller('orderSuccessfullyCtrl', function ($scope, $rootScope,$timeout,$ionicModal,$cordovaInAppBrowser,httpService,JYApi,$stateParams,$state,$ionicScrollDelegate,$ionicPopup,$ionicGesture,$ionicBackdrop) {
  $scope.String=String;
  $scope.tid=$stateParams.tid?$stateParams.tid:'';
  $scope.orderCode=$stateParams.ordNum?$stateParams.ordNum:'';
  $scope.fromPage=$stateParams.fromPage?$stateParams.fromPage:'';
  $scope.userInfo = JSON.parse(localStorage.userInfo);
  $scope.pingfen=$stateParams.pingfen;
  //获取订单详情
  if($scope.orderCode){
    var params={
      orderCode:$scope.orderCode
    };
  }else{
    var params={
      tid:$scope.tid
    };
  }

  //2017.11.14增加取票码、取货码二维码扫描
  const timer=300;
  const move=-500;
  $scope.showQrCode=function (text,id,w,h) {
    document.getElementById(id).innerHTML='';
    new QRCode(document.getElementById(id), {
      text:text,
      width: w,
      height: h,
      colorDark : "#000",
      colorLight : "#fff"
    });
  };
  $scope.showProup=function (tit,text,id,w,h) {
    $scope.myPopup = $ionicPopup.show({
      title:tit+'<span class="qrBtn"><i class="jyicon">&#xe65c;</i></span>',
      template: `<div id=${id}></div><div class="text-center color-999 mt20 fs14">温馨提示：部分自助机暂不支持扫码，可手动输入取票码或取货码（<span class="fs12">如有疑问请咨询影城工作人员</span>）</div>`,
      cssClass:'qrCodeTip'
    });
    $timeout(function () {
      $scope.showQrCode(text,id,w,h);
      $ionicGesture.on('dragup', function () {
        $('.qrCodeTip').animate({top:move,opacity:0},timer,function(){
          $(this).remove();
          $scope.myPopup.close();
        });
        $ionicBackdrop.release();
      }, angular.element(document.querySelector('#'+id)));
      $ionicGesture.on('dragdown', function () {
        $('.qrCodeTip').animate({bottom:move,opacity:0},timer,function(){
          $(this).remove();
          $scope.myPopup.close();
        });
        $ionicBackdrop.release();
      }, angular.element(document.querySelector('#'+id)));
      $ionicGesture.on('dragleft', function () {
        $('.qrCodeTip').animate({left:move,opacity:0},timer,function(){
          $(this).remove();
          $scope.myPopup.close();
        });
        $ionicBackdrop.release();
      }, angular.element(document.querySelector('#'+id)));
      $ionicGesture.on('dragright', function () {
        $('.qrCodeTip').animate({right:move,opacity:0},timer,function(){
          $(this).remove();
          $scope.myPopup.close();
        });
        $ionicBackdrop.release();
      }, angular.element(document.querySelector('#'+id)));
      $ionicGesture.on('tap', function () {
        $('.qrCodeTip').animate({top:move,opacity:0},timer,function(){
          $(this).remove();
          $scope.myPopup.close();
        });
        $ionicBackdrop.release();
      }, angular.element(document.querySelector('.qrBtn')));

    },0);
  };


  $scope.showpingfen = function () {
    var myPopup = $ionicPopup.show({
      cssClass: 'jyAlert pgr-pingfen',
      title: '给金逸电影评分',
      subTitle:'亲爱的小主，我们将不断开展各种优惠活动，期待您的五星鼓励与支持！非常感谢！',
      buttons: [
        {
          text: '必须支持',
          type: 'button-default',
          onTap: function (e) {
            httpService.getData(JYApi.saveSpecialControlRecord, 'post', {
              params:JSON.stringify({"memberId":JSON.parse(localStorage.userInfo).memberId,"tid":$scope.tid,"orderCode":$scope.orderCode})
            }, function (res) {
              if(res.status=='S'){
              }
            });
            var options = {
              location: 'yes',
              clearcache: 'yes',
              toolbar: 'no'
            };
            document.addEventListener("deviceready", function () {
              $cordovaInAppBrowser.open('https://itunes.apple.com/us/app/jin-yi-dian-ying-xin-ban/id1178004584?l=zh&ls=1&mt=8', '_blank', options)
                  .then(function(event) {

                  })
                  .catch(function(event) {

                  });
            }, false);
            myPopup.close();
          }
        },
        {
          text: '残忍拒绝',
          type: 'button-calm',
          onTap: function () {
            myPopup.close();
          }
        }
      ]
    });
  };


  $scope.findOrderDetailInfo=function(){
    httpService.getData(JYApi.findOrder, 'post', {
      params:JSON.stringify(params)
    }, function (res) {
      if (res.status == "S" && res.data.length>0) {
        $scope.resData=res.data[0];
        $scope.theatreId=res.data[0].cinemaId;
        $scope.resData.paymentAmount=$scope.resData.totalAmount;
        $scope.page=1;
        $scope.findItemGood($scope.page,$scope.pageSize);
        if(localStorage.userInfo){
          $rootScope.userInfo = JSON.parse(localStorage.userInfo);
          $scope.RedBadFlag=false;
          $scope.findReceivingCenterInfo();
        }
        //2017.11.14增加取票码、取货码二维码扫描
        $timeout(function () {
          if($scope.resData.orderType=='GOODS'){
            if($scope.resData.vistaBookingId){
              $scope.showQrCode($scope.resData.vistaBookingId,"qrcode_goods_single",15,15);
            }
          }else if($scope.resData.orderType=='MOVIE'){
            if($scope.resData.vistaBookingId){
              $scope.showQrCode($scope.resData.vistaBookingId,"qrcode_ticket",15,15);
            }
            if($scope.resData.goodsVistaBookingId){
              $scope.showQrCode($scope.resData.goodsVistaBookingId,"qrcode_goods",15,15);
            }
          }
        },0);
      }
    },2);
  };
  $scope.$on("$ionicView.enter",function(event, data){
    $scope.findOrderDetailInfo();
    $ionicScrollDelegate.scrollTop();
  });
  $scope.doRefresh=function(){
    $scope.findOrderDetailInfo();
    $scope.$broadcast('scroll.refreshComplete');
  };


  //获取卖品信息
  $scope.page=1;
  $scope.pageSize=10;
  $scope.findItemGood=function (pageIndex,pageRows) {
    httpService.getData(JYApi.findItemGood, 'post', {
      params:JSON.stringify({
        imgChannel:"APP",
        skuItemType:"GROUND_GOODS",
        cinemaOuterId:$scope.resData.cinemaOutId,
        type:"itemGoods",
        pageIndex:pageIndex,
        pageRows:pageRows
      })
    }, function (res) {
      if(res.data.length>0){
        $scope.hasSales=true;
      }
      if(pageIndex==1){
        $scope.salesData=res.data;
      }else{
        angular.forEach(res.data,function (value,key) {
          $scope.salesData.push(value);
        });
      }
      angular.forEach($scope.salesData,function (value,key) {
        value.salesQty=0;
      });
      $scope.calcTotal();
      if(res.count>$scope.salesData.length){
        $scope.hasMore=true;
        $scope.page++;
      }else{
        $scope.hasMore=false;
      }
      $ionicScrollDelegate.resize();
    });
  };

  //加载更多
  $scope.getMoreSales=function () {
    $scope.findItemGood($scope.page,$scope.pageSize);
  };

  //购物数量控制
  $scope.add=function (index) {
    $scope.salesData[index].salesQty++;
    $scope.calcTotal();
  };
  $scope.reduce=function (index) {
    if($scope.salesData[index].salesQty>0){
      $scope.salesData[index].salesQty--;
      $scope.calcTotal();
    }
  };
  //计算总价(包含卖品)
  $scope.calcTotal=function () {
    $scope.salesTotal=0;
    $scope.valuesData=[];
    angular.forEach($scope.salesData,function (value,key) {
      $scope.salesTotal+=(value.costPrice * value.salesQty)/100
      if(value.salesQty>0){
        $scope.valuesData.push({
          bn:value.bn,
          title:value.title,
          num:value.salesQty,
          price:value.costPrice
        });
      }
    });
  };

  //生成卖品订单
  $scope.buildSales=function () {
    $scope.params=[];
    console.log($scope.salesData)
    angular.forEach($scope.salesData,function(value,key){
      if(value.salesQty>0){
        $scope.params.push(value)
      }
    });
    console.log($scope.params)
    sessionStorage.selesParams=JSON.stringify($scope.params);
    //判断是否登录
    if(!localStorage.userInfo){
      var myPopup = $ionicPopup.show({
        title: languageSetting.tip,
        cssClass: 'jyAlert',
        template: languageSetting.unlogin,
        buttons: [
          {
            text: languageSetting.cancel,
            type: 'button-default',
            onTap: function () {
              myPopup.close();
            }
          },
          {
            text: languageSetting.login,
            type: 'button-calm',
            onTap: function (e) {
              myPopup.close();
              $state.go('login', {viewName: 'mealList', urlParams: JSON.stringify($stateParams)});
            }
          }
        ]
      });
      return;
    }else{
      $scope.userInfo = JSON.parse(localStorage.userInfo);
    }
    if($scope.params.length>0){
      $state.go('querySalesOrder');
    } else{
      var myPopup = $ionicPopup.show({
        title: languageSetting.tip,
        cssClass: 'jyAlert',
        template: "请选择您要购买的卖品!",
        buttons: [
          {
            text: "确定",
            type: 'button-default',
            onTap: function () {
              myPopup.close();
            }
          }
        ]
      });
    }
    //if($scope.valuesData.length>0){
    //    httpService.getData(JYApi.goodsOrder, 'post', {
    //      params:JSON.stringify({
    //        "cardId":$scope.userInfo.memberCardId?$scope.userInfo.memberCardId:'',
    //        "receivePhoneNumber":$scope.userInfo.mobileNumber?$scope.userInfo.mobileNumber:'',
    //        "cinemaOutId":$scope.resData.cinemaOutId,
    //        "valuesData":$scope.valuesData,
    //        "memberName":$scope.userInfo.mmbName?$scope.userInfo.mmbName:'',
    //        "cardType":$scope.userInfo.level?$scope.userInfo.level:'',
    //        "cardNumber":$scope.userInfo.chipNumber?$scope.userInfo.chipNumber:''
    //      })
    //    }, function (res) {
    //      if(res.status=="S"){
    //        $state.go('paySales',{ordNum:res.orderCode});
    //      }
    //    },1,'生成订单');
    //}else{
    //  if($rootScope.isMobile){
    //    // $cordovaToast
    //    //   .show('请先选择卖品套餐', 'short', 'center')
    //    //   .then(function(success) {
    //    //     // success
    //    //   }, function (error) {
    //    //     // error
    //    //   });
    //  }
    //}
  };

  $scope.hideArrow=function () {
    $scope.hasSales=false;
    $scope.$apply();
  };
  $scope.scrollContent=function () {
    $ionicScrollDelegate.scrollTo(0,$ionicScrollDelegate.getScrollView().__clientHeight-50,true);
  };


  $scope.findReceivingCenterInfo=function(){
    httpService.getData(JYApi.findReceivingCenterInfo,'post',{
      params:JSON.stringify({})
    },function(res){
      if(res.status=='S'){
        $scope.showNewYear='Y';
        $scope.findReceivingCenterInfoData = res.data;
          $scope.RedBadFlag=false;
          $scope.successredBad.show();
          //$ionicBackdrop.retain();
      }else{
        $scope.showNewYear='N';
        if(localStorage.userInfo&&$scope.pingfen=='S'){
          if($scope.resData.bookingType=='ACTIVITY'|| $scope.resData.bookingType=='EQUITY_CARD'|| $scope.resData.bookingType=='VOUCHER_FREE'
              || $scope.resData.bookingType=='EQUITY_CARD_FREE'|| $scope.resData.bookingType=='VOUCHER'){
            httpService.getData(JYApi.findSpecialControlRecord, 'post', {
              params:JSON.stringify({})
            }, function (res) {
              if(res.status=='S'){
                $scope.showpingfen();
              }
            })
          }
        }
      }

    });
  };
  $scope.findReceivingCenterInfoAngain=function(){
    httpService.getData(JYApi.findReceivingCenterInfo,'post',{
      params:JSON.stringify({})
    },function(res){
      if(res.status=='S'){
        $scope.showNewYear='Y';
        //$scope.findReceivingCenterInfoData = res.data;
      }else{
        $scope.showNewYear='N';
      }

    });
  };
  $scope.$on("$ionicView.enter", function (event, data) {
    $ionicModal.fromTemplateUrl('templates/successredBad.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.successredBad = modal;
    });
    $scope.chooseActiveFlag=false;

  });

  $scope.showRedBad=function(){
    $scope.RedBadFlag=true;
  };
  $scope.choose=function(item){
    $scope.chooseActiveData=item;
    angular.forEach($scope.findReceivingCenterInfoData[0].rcLineList,function(v,k){
      if(item==v){
        v.active=false
      }else{
        v.active=true
      }
    });
  };
  $scope.chooseActiveFlag=false;
  $scope.chooseActive=function(){
    if($scope.chooseActiveData==null){
      var myPopup = $ionicPopup.show({
        title: languageSetting.tip,
        cssClass: 'jyAlert jyAlert1',
        template: '请您任选一张礼券！'
      });
      $timeout(function(){
        myPopup.close();
      },1000);
    }else{
      httpService.getData(JYApi.receiveGift,'post',{
        params:JSON.stringify({
          "receivingCenterHeaderId":  $scope.chooseActiveData.receivingCenterHeaderId,
          "receivingCenterLineId":  $scope.chooseActiveData.receivingCenterLineId
        })
      },function(res){
        if(res.status=='S'){
          $scope.chooseActiveFlag=true;
          $scope.findReceivingCenterInfoAngain();
          $timeout(function(){
            $scope.successredBad.hide();
            $ionicBackdrop.release();
          },3000);
        }else{

        }
      });
    }
  };
  $scope.hideRed=function(){
    $scope.successredBad.hide();
    $ionicBackdrop.release();
    if(localStorage.userInfo&&$scope.pingfen=='S'){
      if($scope.resData.bookingType=='ACTIVITY'|| $scope.resData.bookingType=='EQUITY_CARD'|| $scope.resData.bookingType=='VOUCHER_FREE'
          || $scope.resData.bookingType=='EQUITY_CARD_FREE'|| $scope.resData.bookingType=='VOUCHER'){
      httpService.getData(JYApi.findSpecialControlRecord, 'post', {
        params:JSON.stringify({})
      }, function (res) {
        if(res.status=='S'){
          $scope.showpingfen();
        }
      })
    }
    }
  };
  $scope.$on("$ionicView.leave", function (event, data) {
    $scope.successredBad.hide();
    $ionicBackdrop.release();
  });



});

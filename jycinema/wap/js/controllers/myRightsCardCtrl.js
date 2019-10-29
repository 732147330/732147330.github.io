/**
 * Created by pgr on 2017/8/21.
 */
'use strict';
app.controller('myRightsCardCtrl', function($scope,$rootScope,httpService,JYApi,$timeout,$ionicPopup,$state,$ionicScrollDelegate,$ionicSlideBoxDelegate) {

  $rootScope.userInfo=JSON.parse(localStorage.userInfo);
  $scope.activeIndex = 0;
  $scope.slideHasChanged=function(index){
    $scope.activeIndex=index;
    $ionicSlideBoxDelegate.update();
    $ionicScrollDelegate.scrollTop();
  };
  $scope.slideTo=function(){
    return $scope.activeIndex;
  };
  $scope.getCurrentData=function(index){
    $scope.activeIndex=index;
    $ionicSlideBoxDelegate.update();
  };

  $scope.memberCardFlag = true; //是否有会员卡
  $scope.rightsCardFlag = true; //是否有权益卡
  //$scope.userData=[];
  //$scope.userRcData=[];
  //$scope.invalidData=[];
  //获取权益卡基础信息
  $scope.findRights=function(){
    httpService.getData(JYApi.findCardList, 'post', {
      params:JSON.stringify({
          type: "cardInfo",
          memberId: $rootScope.userInfo.memberId
      })
    }, function (res) {
      if(res.count != 0){
        $scope.mgRights = true;
      }
      if(res.count === 0){
        $scope.mgRights = false;
      }
      if(res.status==="S"){
        $scope.rightsData = res.data;
        $scope.userData=[];
        $scope.userRcData=[];
        $scope.invalidData=[];
      //遍历
      $scope.rightsData.map(function(item){
        if(item.activateDate === undefined || item.activateDate === '') return;
        if(item.sign === 'MEMBERCARD') {
            item.timeData= "";
            $scope.memberCardFlag = false;
        }else {
            item.timeData = "有效期：" + item.activateDate.substr(0, 4) + "/" + item.activateDate.substr(5, 2) + "/" + item.activateDate.substr(8, 2) + "~"+ item.expiryDate.substr(0, 4) + "/" + item.expiryDate.substr(5, 2) + "/" + item.expiryDate.substr(8, 2);
        }
        if(item.sign === 'EQUITYCARD') {
            $scope.rightsCardFlag = false;
        }
        //item.sales=(item.amount/100).toFixed(2);
        //item.flag = (item.equitycardFrequency-item.equitycardUseCount)
        if(item.sign === 'MEMBERCARD' || item.status === 'VALID' || item.status === 'OPTIONAL_VALIDITY'){
          $scope.userData.push(item);
        }
        if(item.status === 'OPTIONAL_VALIDITY'){
          $scope.userRcData.push(item);
        }
        if(item.status === 'EXPIRED'){
          $scope.invalidData.push(item);
        }
      });
      }else{
        var myPopup = $ionicPopup.show({
          title: languageSetting.tip,
          cssClass: 'jyAlert',
          template: '请求失败,请重新登陆!'
        });
        $timeout(function(){
          myPopup.close();
          // $state.go('login');
        },2000);
      }
      });
  };
  $scope.$on('$ionicView.enter', function () {
      $scope.findRights();
  })


  if(localStorage.userInfo){
    $scope.findRights();
  }else{
    $state.go('login');
  }

  $scope.doRefresh=function(){
    $scope.findRights(true);
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.reCard = function (cardInfo) {
      var memberCardId = cardInfo.memberCardId ? cardInfo.memberCardId : '';
      var skuId = cardInfo.skuId ? cardInfo.skuId : '';
      var growthSign = cardInfo.growthSign ? cardInfo.growthSign : '';
      var skuStatus = cardInfo.skuStatus ? cardInfo.skuStatus : '';
      var status = cardInfo.status ? cardInfo.status : '';
      var skuItemType = cardInfo.skuItemType ? cardInfo.skuItemType : 'ONLINE_VIRTUAL_GOODS';

      if(skuStatus && skuStatus === 'VALID') {//判断该权益卡是否下架
          if(growthSign && growthSign === 'Y' && status === 'OPTIONAL_VALIDITY'){//判断该会员消费是否满足500并且满足卡状态是可续卡，是则生产订单详情页，否则跳转商品支付页
              httpService.getData(JYApi.findItemSkuCopy, 'post', {
                  params: JSON.stringify({
                      skuId: skuId,
                      pageIndex: 1,
                      pageRows: 10
                  })
              }, function (res) {
                  if (res.status === "S") {
                      $scope.productDetailData = res.data[0];
                      $scope.productDetailData.qty = 1;
                      sessionStorage.productDetailData = JSON.stringify($scope.productDetailData);
                      $state.go('mallOrder', {status: 'product', cardId: memberCardId, growthSign: growthSign,skuId: skuId,skuItemType: skuItemType});
                  }
              })
          }else {
              if(status === 'OPTIONAL_VALIDITY') {
                  httpService.getData(JYApi.mallOrders, 'post', {
                      params: JSON.stringify({
                          memberId: $scope.userInfo.memberId ? $scope.userInfo.memberId : '',
                          receivePhoneNumber: $scope.userInfo.mobileNumber ? $scope.userInfo.mobileNumber : '',
                          memberName: $scope.userInfo.mmbName ? $scope.userInfo.mmbName : '',
                          skuItemType: "ONLINE_VIRTUAL_GOODS",
                          skuId: skuId ? parseInt(skuId) : '',
                          equitycardInfoId: memberCardId ? parseInt(memberCardId) : '',
                          cardRenewalFlag: 'Y',
                          buyNowData: [{"skuId": skuId}],
                          ruleHeaderIdList: cardInfo.ruleHeaderList ? cardInfo.ruleHeaderList : [],
                          discountData: {
                              bookingType: '',
                              activityId: '',
                              activityGroupId: $scope.selIndex === 2 ? $scope.minActivityInfo.activityGroupId : '',
                              usingCount: $scope.selIndex === 3 ? $scope.usingCount : '',
                              speciesCode: $scope.selIndex === 3 ? $scope.speciesCode : ''
                          },
                          otherData: []
                      })
                  }, function (res) {
                      if (res.status === "S") {
                          $state.go('paySales', {ordNum: res.orderCode});
                      } else {
                          var myPopup = $ionicPopup.show({
                              title: '',
                              cssClass: 'jyAlert jyAlert1',
                              template: res.msg,
                              buttons: [{
                                  text: '确定',
                                  type: 'button-positive',
                                  onTap: function () {
                                      myPopup.close();
                                  }
                              }]
                          });
                      }
                  }, 1, '生成订单...')
              }else {
                  $state.go('productDetail',{'skuId': skuId, 'cardId': memberCardId, 'cardRenewalFlag': 'Y'});
              }
          }
      }else {
          var temp = '';
          if(status === 'OPTIONAL_VALIDITY') {//判断卡状态是可续卡还是已失效
              temp = '权益卡商品已下架，不可续卡';
          }else if(status === 'EXPIRED') {
              temp = '权益卡商品已下架，不可再次购买';
          }
          var myPopup = $ionicPopup.show({
              title: languageSetting.tip,
              cssClass: 'jyAlert jyAlert1',
              template: temp
          });
          $timeout(function () {
              myPopup.close();
          },2000);
      }

  };

});

/**
 * 2017.05.3 增加优惠券
 */
'use strict';
app.controller('myCouponCtrl', function($scope,$rootScope,$ionicPopup,$cordovaBarcodeScanner, $ionicPlatform, $timeout) {
    $scope.addQuan=function () {
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<div class="pos quan-add-tip"><input type="text" style="border: 1px solid #ccc;padding:0 30px 0 5px;" placeholder="请输入优惠券号码" ng-model="data.quanNum"><img on-tap="scanQuan()" src="./img/scan.png"></div>',
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
                myPopup.close();
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

            }
          }, function (error) {

          });
      });
    };

});

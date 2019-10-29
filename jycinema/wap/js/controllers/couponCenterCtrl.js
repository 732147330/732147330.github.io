/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('couponCenterCtrl', function ($scope, $rootScope, httpService, JYApi, $ionicPopup, $timeout) {

  $scope.setPercent = function (v, id, id1) {
    if (v < 0.5) {

      document.getElementById(id).style.backgroundColor = "#ffc37e";

      document.getElementById(id).style.transform = "rotate(" + (360 * v) + "deg)";

    } else {

      document.getElementById(id).style.backgroundColor = "#ff8700";

      document.getElementById(id).style.transform = "rotate(" + (360 * (v - 0.5)) + "deg)";

    }

    document.getElementById(id1).innerHTML = "已抢" + (Number(v * 100).toFixed(0)) + "%";

  };
    $scope.couponCount = 0;
  $scope.findReceiveVoucherInfo = function () {
    httpService.getData(JYApi.findReceiveVoucherInfo, 'post', {
      params: JSON.stringify({})
    }, function (res) {
      if (res.status === 'S') {
        $scope.voucherData = res.data;
        var couponCount = 0;
        $timeout(function () {
          angular.forEach($scope.voucherData, function (v, k) {
            if (v.currentStatus === 'NORMAL') {
              couponCount ++;
              $scope.setPercent(v.percentNum, v.gainRulesId, v.receiveVoucherId);
            }
          })
            $scope.couponCount = couponCount;
        }, 1000);
      }
    });
  };
  $scope.$on("$ionicView.enter", function (event, data) {
    $scope.findReceiveVoucherInfo();
  })
    $scope.findReceiveVoucherInfo();

  $scope.giveReceiveVoucher = function (receiveVoucherId) {
    $scope.now = new Date().getTime();
    $scope.getting = 1;

    httpService.getData(JYApi.giveReceiveVoucher, 'post', {
      params: JSON.stringify({
        'receiveVoucherId': receiveVoucherId
      })
    }, function (res) {
      var _now = new Date().getTime()
      var _wait = _now - $scope.now
      if (_wait < 3000) {
        $timeout(function () {
          $scope.getting = 2
        }, 3000 - _wait);
      } else {
        $scope.getting = 2
      }
      if (res.status === 'S') {
        var myPopup = $ionicPopup.show({
          title: languageSetting.tip,
          cssClass: 'jyAlert jyAlert1',
          template: res.msg
        });
        $timeout(function () {
          myPopup.close();
        }, 2000);
      } else if (res.status == 'F') {
        $ionicPopup.alert(
          {
            title: '领取规则', // String. 弹窗的标题。
            subTitle: '', // String (可选)。弹窗的子标题。
            template: res.msg, // String (可选)。放在弹窗body内的html模板。
            templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
            okText: '确定', // String (默认: 'OK')。OK按钮的文字。
            okType: 'button-default', // String (默认: 'button-positive')。OK按钮的类型。
          }
        );
      } else {
        var myPopup = $ionicPopup.show({
          title: languageSetting.tip,
          cssClass: 'jyAlert jyAlert1',
          template: res.msg
        });
        $timeout(function () {
          myPopup.close();
        }, 2000);
      }
      $scope.findReceiveVoucherInfo();
    });
  }

  //全部领取/一键领取
  $scope.giveAllReceiveVoucher = function () {
      angular.forEach($scope.voucherData, function (v, k) {
        if(v.currentStatus === "NORMAL") {
          $scope.giveReceiveVoucher(v.receiveVoucherId);
        }
      });
  }

  //使用规则
  $scope.showRules = function (dec) {
    $ionicPopup.alert(
      {
        title: '领取规则', // String. 弹窗的标题。
        subTitle: '', // String (可选)。弹窗的子标题。
        template: '11111', // String (可选)。放在弹窗body内的html模板。
        templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
        okText: '确定', // String (默认: 'OK')。OK按钮的文字。
        okType: 'button-default', // String (默认: 'button-positive')。OK按钮的类型。
      }
    );
  };

});

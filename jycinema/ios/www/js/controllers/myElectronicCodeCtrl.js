/**
 * 2017.8.25 增加权益卡扫码
 */
'use strict';
app.controller('myElectronicCodeCtrl', function($scope,$rootScope,$ionicSlideBoxDelegate,$timeout) {
  $scope.myElectronicCode=JSON.parse(sessionStorage.rightsMeaning);
  $scope.JsBarcode=JsBarcode("#barcode", $scope.myElectronicCode[0].equitycardCode, {
    displayValue: false,
    width:1.4
  });
  $scope.qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 150,
    height: 150,
    colorDark : "#000",
    colorLight : "#fff"
  });
  $scope.qrcode.makeCode($scope.myElectronicCode[0].equitycardCode);

  $scope.toggleQrcode=function (index) {
    $scope.index=index;
    $scope.qrcodeFlag=!$scope.qrcodeFlag;

  };

});

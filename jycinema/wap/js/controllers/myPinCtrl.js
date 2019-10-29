/**
 * 2017.04.20 增加我的会员码功能
 */
'use strict';
app.controller('myPinCtrl', function($scope,$rootScope,$ionicSlideBoxDelegate,$timeout) {
    $scope.userInfo=JSON.parse(localStorage.userInfo);

    $scope.JsBarcode=JsBarcode("#barcode", $scope.userInfo.chipNumber, {
        displayValue: false
    });
    $scope.qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 150,
        height: 150,
        colorDark : "#000",
        colorLight : "#fff"
    });
    $scope.qrcode.makeCode($scope.userInfo.chipNumber);

    $scope.toggleQrcode=function (index) {
        $scope.index=index;
        $scope.qrcodeFlag=!$scope.qrcodeFlag;

    };

});

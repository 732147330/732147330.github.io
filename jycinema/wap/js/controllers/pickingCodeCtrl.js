/**
 * Created by pgr on 18/3/23.
 */
'use strict';
app.controller('pickingCodeCtrl', function($scope,$rootScope,httpService,$stateParams,JYApi,$ionicPopup,$ionicModal,$ionicBackdrop) {


    $scope.vistaBookingId=$stateParams.vistaBookingId;
    $scope.JsBarcode=JsBarcode("#barcode", $stateParams.vistaBookingId, {
        displayValue: false
    });
    $scope.qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 150,
        height: 150,
        colorDark : "#000",
        colorLight : "#fff"
    });
    $scope.qrcode.makeCode($stateParams.vistaBookingId);

    $scope.toggleQrcode=function (index) {
        $scope.index=index;
        $scope.qrcodeFlag=!$scope.qrcodeFlag;

    };


});
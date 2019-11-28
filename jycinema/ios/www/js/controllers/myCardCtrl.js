/**
 * 2017.1.13 增加我的卡包功能
 */
'use strict';
app.controller('myPinCtrl', function($scope,httpService,JYApi,$stateParams,$ionicHistory) {
    $scope.fromPage=$stateParams.fromPage;
    $scope.goUrl=$scope.fromPage=='queryOrder'?'queryOrder':'home';
    //查询卡卷
    $scope.currentTime=new Date().getTime();
    $scope.findMyVoucher=function(){
        httpService.getData(JYApi.findMyVoucher, 'post', {
            params:JSON.stringify({
                "memberId":JSON.parse(localStorage.userInfo).memberId
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.MyVoucherData=res.data;
                angular.forEach($scope.MyVoucherData,function(value,key){
                    value.startDateActive=new Date(value.startDateActive).getTime();
                    value.endDateActive=new Date(value.endDateActive).getTime();
                });
            }
        },2);
    };
    $scope.findMyVoucher();

    $scope.checkGoUrl=function(index){
        $scope.currentIndex=index;
        $('.cardList a').removeClass('active');
        $('.cardList').eq(index).find('a').addClass('active');
        if($scope.MyVoucherData[index].voucherStatus=='NOT_USED' && $scope.MyVoucherData[index].endDateActive>$scope.currentTime){
            $scope.isShow='Y';
        }else{
            $scope.isShow='';
        }
    };
    $scope.beginGo=function(){
        sessionStorage.voucherValues=$scope.MyVoucherData[$scope.currentIndex].voucherValues;
        $ionicHistory.goBack();
    };

    //下拉刷新
    $scope.doRefresh = function () {
        //刷新数据
        $scope.findMyVoucher();
        $scope.$broadcast('scroll.refreshComplete');
    };

});

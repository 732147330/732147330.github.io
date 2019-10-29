/**
 * 2017.05.3 增加我的钱包功能
 */
'use strict';
app.controller('myWalletCtrl', function($scope,$rootScope,$ionicSlideBoxDelegate,$timeout,httpService,JYApi) {

    //更新权益卡状态
    $scope.updateEquitycardStatus=function(){
        httpService.getData(JYApi.updateEquitycardStatus, 'post', {
            params:JSON.stringify({
                memberId:JSON.parse(localStorage.userInfo).memberId
            })
        }, function (res) {
        });
    };
    $scope.updateEquitycardStatus();
    //更新卡券状态
    $scope.updateLifeTimeStatus=function(){
        httpService.getData(JYApi.updateLifeTimeStatus, 'post', {
            params:JSON.stringify({
                memberId:JSON.parse(localStorage.userInfo).memberId
            })
        }, function (res) {
        });
    };
    $scope.updateLifeTimeStatus();
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
    $scope.$on("$ionicView.enter",function(event, data){
        $scope.findMyVouLifetimeCount();
    });

});

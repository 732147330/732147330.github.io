/**
 * Created by pgr on 2017/9/30.
 */
app.controller('allPointsGoodCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$ionicPopup, $ionicPlatform, $timeout,$state,$ionicScrollDelegate) {

    //商品搜索
    $scope.categoryList=function (page,pageSize,pointsExFlag ) {
        httpService.getData(JYApi.findItemSkuCopy, 'post', {
            params:JSON.stringify({
                pointsExFlag:pointsExFlag,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            $scope.categoryListData = res.data;
        },2)
    };
    $scope.categoryList(1,10000,'Y');


});
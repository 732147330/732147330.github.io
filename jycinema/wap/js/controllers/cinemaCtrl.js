/**
 * Created by pgr on 17/8/31.
 */
'use strict';
app.controller('cinemaCtrl', function($scope,$rootScope,$stateParams,$ionicViewSwitcher, $ionicPopup,$ionicLoading,$timeout,$state,httpService,$interval,JYApi,$location,$ionicPlatform,$ionicModal,$ionicBackdrop) {

    $rootScope.currentCity = localStorage.currentCity ? localStorage.currentCity : languageSetting.defaultCity;

    $scope.data={};

    //获取自提影院
    $scope.getCinema=function () {
        $scope.params={
            "type":"queryAll",
            "cityName":localStorage.currentCity,
            "areaId":'',
            "screenType":''
        };

        httpService.getData(JYApi.findCinema, 'post', {
            params:JSON.stringify($scope.params)
        }, function (res) {
            if(res.status=="S" &&res.data.length>0){
                $scope.sinceTheaterData=res.data;
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: '小主，您所在的城市没有金逸影院!请您切换到有金逸影院的城市进行选购吧！'
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }
        })
    };

    $scope.$on('$ionicView.enter',function () {
            $scope.getCinema();

    });

    $scope.querySel=function (index) {
        sessionStorage.newcinemaData = JSON.stringify($scope.sinceTheaterData[index]);
            $state.go('category',({catId:4,index:0,cinemaNameAlt:$scope.sinceTheaterData[index].cinemaNameAlt,cinemaOuterId:$scope.sinceTheaterData[index].cinemaOuterId}));
    };



    $scope.$on('$ionicView.leave',function () {

    });
});

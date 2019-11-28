/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('selectCityCtrl', function($scope,$rootScope,$ionicPlatform,$state,$timeout,$ionicPopup,httpService,$ionicModal,JYApi,$ionicHistory) {
    //获取定位
    $ionicPlatform.ready(function() {
        // var posOptions = {timeout: 10000, enableHighAccuracy: false};
        // $cordovaGeolocation
        //     .getCurrentPosition(posOptions)
        //     .then(function (position) {
        //             var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
        //             var geoc = new BMap.Geocoder();
        //             geoc.getLocation(point, function (res) {
        //                 var gpsInfo = res.addressComponents;
        //                 $scope.gpsCity=gpsInfo.city;
        //             });
        //         }, function (err) {
        //
        //         }
        //     );
    });
    $scope.getCity=function(){
        $scope.hotCity={
            areaName:'热门城市',
            City:[]
        };
        $timeout(function(){
            httpService.getData(JYApi.findSaafAreas, 'post', {
                params:JSON.stringify({
                    areaLevel:1
                })
            }, function (res) {
                if(res.status=="S"){
                    $scope.cityList=res.data;
                    angular.forEach(res.data,function(value,key){
                        angular.forEach(value.City,function(v,k){
                            if(v.hotCityFlag=="Y"){
                                $scope.hotCity.City.push({
                                    areaName:v.areaName
                                });
                            }
                        });
                    });
                    $scope.cityList.unshift($scope.hotCity);
                    if(localStorage.userInfo){
                        $scope.resortData();
                    }
                }
            },2);
        },500);
    };
    $scope.citys=[];
    $scope.getCity();
    $scope.search={keywords:''};
    $scope.searchCity=function(){
        if(!$scope.search.keywords){
            $scope.citys=[];
        }else{
            httpService.getData(JYApi.findArea, 'post', {
                params:JSON.stringify({
                    "areaLevel":2,
                    "type":"city",
                    "areaName":$scope.search.keywords
                })
            }, function (res) {
                if(res.status=="S"){
                    $scope.citys=res.data;
                }
            });
        }
    };
    //获取附近影城
    $scope.theatreData=[
        {id:'BEDHALL',name:languageSetting.bed,code:'&#xe67d;'},
        {id:'LOVERSHALL',name:languageSetting.couple,code:'&#xe686;'},
        {id:'SOUNDHALL',name:languageSetting.soundHall,code:'&#xe672;'},
        {id:'4DHALL',name:languageSetting.hall4D,code:'&#xe686;'},
        {id:'DOUBLE',name:languageSetting.doubleHall,code:'&#xe69a;'},
        {id:'SCREEN_TYPE',name:languageSetting.hugeScreen,code:'&#xe687;'},
        {id:'IMAX',name:languageSetting.imax,code:'&#xe63a;'},
        {id:'VIP',name:languageSetting.vip,code:'&#xe69e;'},
        {id:'COMMON',name:languageSetting.common,code:''},
        {id:'MX4D',name:languageSetting.mx4D,code:'&#xe686'}
    ];
    $scope.getCityCinema=function(screenType,areaId,isRefresh){
        $scope.getTheatreData=function(){
            httpService.getData(JYApi.findCinema, 'post', {
                params:JSON.stringify($scope.params)
            }, function (res) {
                if (res.status == "S" && res.data.length > 0) {
                    $scope.noData = false;
                    $scope.theatreList = res.data;
                    var num = [];
                    $scope.theatreListBySort = [];
                    angular.forEach($scope.theatreList, function (value, key) {
                        value.screenTypeCode = [];
                        if (value.screenTypeInfo) {
                            $scope.screenTypes = value.screenTypeInfo.split(',');
                            angular.forEach($scope.screenTypes, function (v1, k1) {
                                angular.forEach($scope.theatreData, function (v2, k2) {
                                    if (v1 == v2.name) {
                                        value.screenTypeCode.push({
                                            code: v2.code
                                        });
                                    }
                                });
                            });
                        }
                    });

                    if(sessionStorage.gpsInfo){
                        angular.forEach($scope.theatreList,function(value,key){
                            var map = new BMap.Map("allmap");
                            value.distance=map.getDistance(new BMap.Point(value.longitude,value.latitude),new BMap.Point(JSON.parse(sessionStorage.gpsInfo).long,JSON.parse(sessionStorage.gpsInfo).lat));
                            num[key]=value.distance;
                            num.sort($scope.sortNumber);
                            angular.forEach(num,function(value,key){
                                for(var i=0;i<$scope.theatreList.length;i++){
                                    if($scope.theatreList[i].distance==value){
                                        $scope.theatreListBySort[key]=$scope.theatreList[i];
                                    }
                                }
                            });
                        });
                        sessionStorage.newcinemaData = JSON.stringify(_.min($scope.theatreListBySort,function(item){return item.distance}));
                    }else{
                        $scope.theatreListBySort=$scope.theatreList;
                        sessionStorage.newcinemaData = JSON.stringify($scope.theatreListBySort[0]);
                    }
                    console.log($scope.theatreListBySort)
                    $rootScope.newcinemaData=sessionStorage.newcinemaData?JSON.parse(sessionStorage.newcinemaData):'';
                }
            });
        };
        $scope.params={
            "type":"queryAll",
            "cityName":localStorage.currentCity
        };
        $scope.getTheatreData();
    };
    $scope.changeCity=function(cityName){
        if(cityName){
            $rootScope.currentCity=cityName;
            localStorage.currentCity=cityName;
            $scope.getCityCinema('','');
        }
        $ionicHistory.backView().go();
    };
    $scope.resortData=function(){
        httpService.getData(JYApi.findCuxMemCinmeasInfo, 'post', {
            params:JSON.stringify({})
        }, function (res) {
            if(res.status=='S'){
                $scope.resort=res.data;
            }
        })
    };

});

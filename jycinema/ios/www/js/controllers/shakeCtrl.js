/**
 * Created by pgr on 16/9/13.
 * 2016.12.23 修改摇一摇逻辑,按城市定位查询,与选择城市无关
 */
'use strict';
app.controller('shakeCtrl', function($scope,$rootScope,$cordovaToast,$cordovaGeolocation,$interval,httpService,JYApi,$cordovaNativeAudio,$timeout,$ionicPlatform,$cordovaVibration,$cordovaDeviceMotion) {
    $scope.showFlag=true;
    $scope.tipFlag=false;
    $ionicPlatform.ready(function(){
        if(locals.isMobile){
            $cordovaNativeAudio
                .preloadComplex('music', 'lib/shake_sound.mp3', 1, 1)
                .then(function (msg) {

                }, function (error) {

                });
            $cordovaNativeAudio
                .preloadComplex('sucMusic', 'lib/suc.mp3', 1, 1)
                .then(function (msg) {

                }, function (error) {

                });

            $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
                var X = result.x;
                var Y = result.y;
                var Z = result.z;
                var timeStamp = result.timestamp;
            }, function(err) {
                // An error occurred. Show a message to the user
            });
        }
    });

    //排序函数
    $scope.sortNumber=function(a,b){
        return a - b;
    };
    //获取附近影院
    $scope.getCityCinema=function(cityName){
        $scope.showFlag=false;
        httpService.getData(JYApi.findCinema, 'post', {
            params:JSON.stringify({
                "type":"queryAll",
                "cityName":cityName
            })
        }, function (res) {
            if(res.status=="S"){
                $cordovaNativeAudio.play('sucMusic');
                $scope.shakeFlag=true;
                $scope.showFlag=true;
                $cordovaVibration.vibrate(100);
                $scope.theatreData=res.data;
                var num=[];
                $scope.theatreListBySort=[];
                angular.forEach($scope.theatreData,function(value,key) {
                    var map = new BMap.Map("allmap");
                    if (sessionStorage.gpsInfo) {
                        value.distance = map.getDistance(new BMap.Point(value.longitude, value.latitude), new BMap.Point(JSON.parse(sessionStorage.gpsInfo).long, JSON.parse(sessionStorage.gpsInfo).lat));
                        num[key]=value.distance;
                        num.sort($scope.sortNumber);
                        $scope.theatreFlag=false;
                        angular.forEach(num,function(value,key){
                            for(var i=0;i<$scope.theatreData.length;i++){
                                if($scope.theatreData[i].distance==value){
                                    $scope.theatreListBySort[key]=$scope.theatreData[i];
                                }
                            }
                        });
                    }
                });
                $scope.currentTheatreData=$scope.theatreListBySort[0];
                $scope.theatreId=$scope.currentTheatreData.cinemaId;
            }
        },1,languageSetting.searching);
    };


    $scope.getCurrentPos=function(){
        var posOptions = {timeout: 5000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
                var geoc = new BMap.Geocoder();
                geoc.getLocation(point, function (res) {
                    $scope.tipFlag=false;
                    var gpsInfo = res.addressComponents;
                    gpsInfo.lat = position.coords.latitude;
                    gpsInfo.long = position.coords.longitude;
                    sessionStorage.gpsInfo = JSON.stringify(gpsInfo);
                    $scope.city=JSON.parse(sessionStorage.gpsInfo).city;
                    $scope.getRes();
                });
            },function(err){
                $scope.tipFlag=true;
                if(locals.isMobile){
                    $cordovaToast.showShortBottom(languageSetting.allowGetPosition);
                }
            });
    };

    $scope.$on("$ionicView.enter", function(event, data){
        $scope.getRes=function(){
            $scope.shakeFlag=false;
            var options = { frequency: 1000 };
            $ionicPlatform.ready(function() {
                $scope.watch = $cordovaDeviceMotion.watchAcceleration(options);
                $scope.watch.then(
                    null,
                    function (error) {

                    },
                    function (result) {
                        var X = result.x;
                        var Y = result.y;
                        var Z = result.z;
                        var timeStamp = result.timestamp;
                        if (Math.abs(X) > 10 || Math.abs(Y) > 10) {
                            if($scope.showFlag){
                                $cordovaNativeAudio.play('music');
                                $scope.getCityCinema(JSON.parse(sessionStorage.gpsInfo).city);
                            }
                        }
                    });
            });
        };


        if(sessionStorage.gpsInfo){
            $scope.city=JSON.parse(sessionStorage.gpsInfo).addressComponents.city;
            $scope.getRes();
        }else{
            $scope.getCurrentPos();
        }

    });

    $scope.$on("$ionicView.leave", function(event, data){
        $scope.shakeFlag=true;
        $scope.watch.clearWatch();
    });

    $scope.doRefresh = function () {
        //刷新数据
        $scope.getCurrentPos();
        $scope.$broadcast('scroll.refreshComplete');
    };


});

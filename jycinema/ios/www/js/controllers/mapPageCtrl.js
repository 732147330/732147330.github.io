/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('mapPageCtrl', function ($scope, $rootScope,$timeout,$ionicPlatform,$cordovaGeolocation,$ionicHistory,$ionicPopup,httpService,JYApi,$stateParams) {
    $scope.theatreId=$stateParams.theatreId;
    $scope.getTheatreDetail=function(){
        httpService.getData(JYApi.findCinema, 'post', {
            params:JSON.stringify({
                "cinemaId":$scope.theatreId,
                "type":"queryAll"
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.theatreList=res.data[0];
                var map = new BMap.Map("container");
                var point=new BMap.Point(res.data[0].longitude,res.data[0].latitude);
                map.centerAndZoom(point,16);
                map.enableScrollWheelZoom(true);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
            }
        },2);
    };
    $scope.getTheatreDetail();
});

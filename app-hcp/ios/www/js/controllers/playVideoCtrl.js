/**
 * Created by pgr on 18/2/27.
 */
'use strict';
app.controller('playVideoCtrl', function ($scope,httpService,JYApi,$stateParams,$sce,$cordovaNetwork,$ionicPopup,$rootScope) {
    $scope.movieId = $stateParams.movieId;
    $scope.findImages=function(){
        httpService.getData(JYApi.findImages, 'post', {
            params: JSON.stringify({
                "targetId":$scope.movieId,
                "targetType":"FILM_BANNER",
                "mtimeMessageType":"TRAILER",
                "type":"filmImg",
                "imgChannel":"APP"
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.videoUrl=$sce.trustAsResourceUrl(res.data[1].url);
                $scope.imgUrl=res.data[0].url;
                $scope.viewTimes=res.data[1].viewTimes;
                $scope.id=res.data[1].id;
                //$scope.viewTimes=$scope.viewTimes.substring(0,10);
                $scope.filmName=res.filmName;
                $scope.showTime=res.showTime;
                $scope.getNetworkType();
                $scope.updateCinTrailerViewTimes();
            }
        })
    };
    $scope.findImages();
    $scope.updateCinTrailerViewTimes=function(){
        httpService.getData(JYApi.updateCinTrailerViewTimes, 'post', {
            params: JSON.stringify({
                "targetId":$scope.movieId,
                "id":$scope.id
            })
        }, function (res) {

        })
    };
    $scope.getNetworkType=function(){
        $scope.autoplay=false;
        var type = $cordovaNetwork.getNetwork();
        if(type==Connection.WIFI){
            $scope.autoplay=true;
        }else{
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert pgrMap',
                template: '无可用wifi，使用移动网络继续播放',
                buttons: [
                    {
                        text: '取消',
                        type: 'button-default',
                        onTap: function () {
                            myPopup.close();
                        }
                    },
                    {
                        text: '继续播放',
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                            $scope.autoplay=true;
                        }
                    }
                ]
            });
        }
    }
});

/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('theatreDetailCtrl', function($scope,$stateParams,$timeout,httpService,JYApi,$ionicScrollDelegate) {
    $scope.flag=$stateParams.flag;
    $scope.theatreId=$stateParams.theatreId;
    $scope.movieId=$stateParams.movieId?$stateParams.movieId:'-1';
    $scope.vFlag=true;

    $scope.toggle=function(){
        $scope.vFlag=!$scope.vFlag;
        $timeout(function(){
            $ionicScrollDelegate.resize();
        },10);
    };

    //获取活动海报
    $scope.getCarouselByCity = function (cityName) {
        httpService.getData(JYApi.findImages, 'post', {
            params: JSON.stringify({
                targetId:$scope.theatreId,
                targetType:'CINEMA_PROPAGATE',
                imgChannel:'APP'
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.theatreDetailBanner=res.data;
            }
        });
    };

    //影院详情
    $scope.getTheatreDetail=function(){
        httpService.getData(JYApi.findCinema, 'post', {
            params:JSON.stringify({
                "cinemaId":$scope.theatreId,
                "type":"queryAll"
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.theatreList=res.data[0];
            }
        });
    };

    //影院公告
    $scope.findCmsNoticeMessage=function(){
        httpService.getData(JYApi.findCmsNoticeMessage, 'post', {
            params:JSON.stringify({
                "cinemaId":$scope.theatreId
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.notice=res.data;
                $scope.noticeTime=[];
            }
        });
    };

    $scope.getTheatreDetail();
    $scope.getCarouselByCity();
    $scope.findCmsNoticeMessage();

    //展示幻灯片
    $scope.showSlideBox=function(index){
        $scope.activeIndex = index;
        $scope.showSlideFlag=true;
        $scope.showSlideF=true;
    };

    $scope.hideSlide=function () {
        $scope.showSlideFlag=false;
        $timeout(function () {
            $scope.showSlideF = false;
        }, 300);
    };


});

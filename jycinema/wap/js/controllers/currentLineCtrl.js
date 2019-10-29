/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('currentLineCtrl', function($scope,$rootScope,$stateParams,$ionicScrollDelegate,httpService,$timeout,$ionicPopup,JYApi,scanService,$filter,myhrefService) {
    $scope.activeIndex=$stateParams.activeIndex?$stateParams.activeIndex:0;
    //放映版本
    $scope.versionArr=[{name:'4D', code:'&#xe686;'},{name:'3D', code:'&#xe69d;'},{name:'IMAX', code:'&#xe63a;'},{name:'巨幕', code:'&#xe687;'},{name:'杜比', code:'&#xe672;'}];
    //正在热映
    $scope.getCurrentMovieList=function(isDorefresh){
        $timeout(function(){
            httpService.getData(JYApi.findCurrentFilm, 'post', {
                params:JSON.stringify({
                    status:'HOT',
                    type:'queryFilm',
                    cityName:localStorage.currentCity
                })
            }, function (res) {
                if(res.status=="S"){
                    $scope.currentMovieData=res.data;
                    angular.forEach(res.data,function(value,key){
                        value.revisionCode=[];
                        angular.forEach(value.revision.split(','),function(v,k){
                            angular.forEach($scope.versionArr,function(v1,k1){
                                if(v1.name.indexOf(v)>=0){
                                    value.revisionCode.push(v1.code);
                                }
                            });
                        });
                    });
                    $scope.getCarouselByCity();
                    $scope.getFutrueMovieList();
                }
            },1,languageSetting.loading,isDorefresh);
        },300);

    };
    //即将上映
    $scope.getFutrueMovieList=function(){
        httpService.getData(JYApi.findFilms, 'post', {
            params:JSON.stringify({
                status:'RELEASE',
                type:'ordinary'
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.futrueMovieData=res.data;
            }
        });
    };
    $scope.getCurrentMovieList();
    //下拉刷新
    $scope.doRefresh = function () {
        //刷新数据
        if($scope.activeIndex==0){
            $scope.getCurrentMovieList(true);
        }else if($scope.activeIndex==1){
            $scope.getFutrueMovieList();
        }
        $scope.$broadcast('scroll.refreshComplete');
    };
    //获取正在热映活动海报
    $scope.getCarouselByCity = function () {
        httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
            params: JSON.stringify({
                "adverPosition": "APP_AD_FILM",
                "cityName": localStorage.currentCity
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.currentlineBanner=res.data[0].url;
                if(res.data.length>1){
                    $scope.futrueLineBanner=res.data[1].url?res.data[1].url:'';
                }
            }
        });
    };
    $scope.getCurrentData=function(index){
        $scope.activeIndex=index;
    };
    $scope.slideHasChanged=function(index){
        $scope.activeIndex=index;
        if($scope.activeIndex==0){
            $scope.currentBanner= $scope.currentlineBanner;
        }else if($scope.activeIndex==1){
            $scope.currentBanner= $scope.futrueLineBanner;
        }
        $ionicScrollDelegate.scrollTo(0,0,false);
    };
    $scope.slideTo=function(){
        return $scope.activeIndex;
    };
    //$scope.goMovieDtail=function(id){
    //    window.location.href=locals.returnUrl() +"/?from=timeline#/movieDetail?movieId="+id;
    //}
});

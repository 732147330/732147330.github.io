/**
 * Created by pgr on 2017/9/30.
 */
'use strict';
app.controller('pointsMallCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$ionicPopup, $ionicPlatform, $timeout,$state,$ionicScrollDelegate) {

    //轮播
    $scope.getCarouselByCity = function () {
        $scope.carouselData=[];
        httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
            params:JSON.stringify({
                "adverPosition":"APP_SHOP_BANNER",
                "cityName":localStorage.currentCity
            })
        }, function (res) {
            if(res.status=="S"){
                if(!res.data || res.data.length==0){
                    //获取默认轮播数据
                    httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
                        params:JSON.stringify({
                            "adverPosition":"APP_SHOP_BANNER",
                            "cityName":''
                        })
                    }, function (res) {
                        if(res.status=="S"){
                            $scope.carouselData = res.data;
                            $timeout(function () {
                                var swiper = new Swiper('.swiper-container-focus', {
                                    autoplay:4000,
                                    loop : true,
                                    observer:true,
                                    observeParents:true
                                });
                            },0);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert',
                                template: res.msg
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        }
                    });
                }else{
                    $scope.carouselData = res.data;
                    console.log($scope.carouselData);
                    $timeout(function () {
                        var swiper = new Swiper('.swiper-container-focus', {
                            autoplay:4000,
                            loop : true,
                            observer:true,
                            observeParents:true
                        });
                    },0);
                }
            }
        },function(error){

        });
    };
    $scope.getCarouselByCity();

    //精品推荐
    $scope.getRecommend=function (page,pageSize,recommendType,suc) {
        httpService.getData(JYApi.findIrs, 'post', {
            params:JSON.stringify({
                type:"ALL",
                recommendType:recommendType,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            suc(res);
        })
    };
    $scope.getRecommend(1,100,'BOUTI_RECOMMMEND',function (res) {
        $scope.guessData=res.data;
        console.log($scope.guessData)
    });
});
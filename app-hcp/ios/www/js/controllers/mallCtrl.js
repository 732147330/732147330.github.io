'use strict';
app.controller('mallCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$ionicPopup, $ionicPlatform,$ionicViewSwitcher, $timeout,$state,$ionicScrollDelegate) {
    $scope.page=1;
    $scope.currentPage=1;
    $scope.pageSize=10;
    $rootScope.currentCity = localStorage.currentCity ? localStorage.currentCity : languageSetting.defaultCity;
    if(localStorage.userInfo){
        $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    }
    $scope.searchList=[
        {
            name:'全部'
        },
        {
            name:'影片'
        },
        {
            name:'影人'
        },
        {
            name:'影城'
        }
    ];

    $scope.initIndex=0;


    $scope.currentType=$scope.searchList[0];

    $scope.showList=function (e) {
        $scope.showFlag=!$scope.showFlag;
        e.stopPropagation();
    };
    $scope.getFilter=function (index,e) {
        $scope.currentType=$scope.searchList[index];
      $scope.showFlag=false;
      e.stopPropagation();
    };
    document.addEventListener('click',function () {
        $scope.showFlag=false;
        $scope.$apply();
    });

    //获取商品分类
    $scope.getCategory=function () {
        httpService.getData(JYApi.findItemCat, 'post', {
            params:JSON.stringify({
                type:"ALL",
                catLevel:2,
                pageIndex:1,
                pageRows:50
            })
        }, function (res) {
            $scope.categoryData=res.data;

            var n=5;
            var count=$scope.categoryData.length;
            $scope.newCategoryData=[];
            var x= Math.ceil(count/n);
            for(var i=0;i<x;i++){
                if(i==x-1){
                    $scope.newCategoryData.push(
                        {
                            subData: $scope.categoryData
                        }
                    );
                }else{
                    $scope.newCategoryData.push(
                        {
                            subData: $scope.categoryData.splice(0,n)
                        }
                    );
                }
            }

            $timeout(function () {
                var swiper = new Swiper('.swiper-container-mall', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                });
            },500);

        })
    };

    //猜你喜欢
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

    $scope.slidesTo=function(index){
        $scope.swiper2.slideTo(index);
    };


    //电影系列
    $scope.getFilmData=function () {
        httpService.getData(JYApi.findIrt, 'post', {
            params:JSON.stringify({

            })
        }, function (res) {
            if(res.status=="S"){
                $scope.filmData=res.data;
                console.log($scope.filmData)
                if($scope.filmData.length>0){
                    $scope.subFilmData=$scope.filmData[0].value;
                }
                $scope.activeIndex=0;
                $scope.swiper2 = new Swiper('.swiper-container-mall-index', {
                    slidesPerView: 4,
                    centeredSlides: true,
                    initialSlide :$scope.initIndex,
                    slidesTo:function(index){
                        $scope.swiper.slideTo(index);
                    },
                    observer:true,
                    onTransitionEnd: function(swiper){
                        $scope.activeIndex=swiper.activeIndex;
                        console.log($scope.activeIndex);
                        $scope.subFilmData=$scope.filmData[$scope.activeIndex].value;
                        console.log($scope.subFilmData);
                        $scope.$apply();
                    }
                });

                $timeout(function () {
                    $scope.swiper3 = new Swiper('.swiper-container-mall-con', {
                        slidesPerView: 3,
                        paginationClickable: true,
                        spaceBetween: 30,
                        freeMode: true,
                        observer:true,
                        observeParents:true
                    });
                },500);

            }
        })
    };

    //优惠特价
    $scope.getSpecialOffer=function (page,pageSize,specialOffertype) {
        httpService.getData(JYApi.findIrs, 'post', {
            params:JSON.stringify({
                type:"ALL",
                recommendType:specialOffertype,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            $scope.currentPage=page;
            $scope.specialOfferData = res.data;
            $scope.total=res.count;
        })
    };
    $scope.current ={};
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
    $scope.search =function(){
        $state.go('mallSearch', {catId:'' ,title: $scope.current.title});
    };
    $scope.getRecommend(1,100,'GUESS_YOU_LIKE',function (res) {
        $scope.guessData=res.data;
    });
    $scope.getFilmData();
    $scope.getCategory();
    $scope.getCarouselByCity();
    $scope.getSpecialOffer($scope.page,$scope.pageSize,'SPECIAL_OFFER');

    $scope.scrollContent =function(){
        $ionicScrollDelegate.getScrollPosition();
        if($ionicScrollDelegate.getScrollPosition().top>=100){
            $scope.colorFlag =true;
            $scope.$apply();
        }else if($ionicScrollDelegate.getScrollPosition().top<100){
            $scope.colorFlag =false;
            $scope.$apply();
        }
    };

    //下拉刷新
    $scope.doRefresh = function () {
        //刷新数据
        $scope.getFilmData();
        //$scope.getCategory();
        $scope.getCarouselByCity();
        $scope.getSpecialOffer($scope.page,$scope.pageSize,'SPECIAL_OFFER');
        $scope.getRecommend(1,100,'GUESS_YOU_LIKE',function (res) {
            $scope.guessData=res.data;
        });
        $timeout(function(){
            $scope.$broadcast('scroll.refreshComplete');
        },1000);

    };
    //查询购物车
    $scope.findCartInfo=function () {
        httpService.getData(JYApi.findCartInfo, 'post', {
            params:JSON.stringify({})
        }, function (res) {
            if(res.status=="S"){
                $scope.cartData=res.data;
                $scope.num=0;
                angular.forEach($scope.cartData,function(value,key){
                    $scope.num+=$scope.cartData[key].quantity
                });
                $scope.cartNum=$scope.num
            }
        });
    };
    $scope.$on('$ionicView.enter',function(){
        //if(localStorage.userInfo){
        //    $scope.findCartInfo();
        //}
    })

    $scope.categoryGo=function(catId,index){
        $state.go('category',{catId:catId,index:index});
        $ionicViewSwitcher.nextDirection("none")
    }
});

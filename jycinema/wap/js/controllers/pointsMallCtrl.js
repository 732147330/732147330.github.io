/**
 * Created by pgr on 2017/9/30.
 */
'use strict';
app.controller('pointsMallCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$ionicPopup, $ionicPlatform, $timeout,$state,$ionicScrollDelegate, $ionicSlideBoxDelegate) {

    //切换顶部导航栏
    $scope.navShow = 1;
    $scope.switchTab = function (index) {
        $scope.navShow = index;
    }

    //切换子级导航栏
    $scope.subNavShow = 0;
    $scope.switchSubTab = function (index) {
        $scope.subNavShow = index;
        if(index === 2) {//显示筛选条件
            $('.points-condition-wrapper').slideToggle();
            //蒙版判断
            if($('.mask-wrapper').height() === 0){
                $('.mask-wrapper').height($(window).height());
            }else {
                $('.mask-wrapper').height(0);
            }
        }else if(index === 3) {//显示搜索栏
            $('.points-search-wrapper').animate({left:"0"});
            $('.points-tab-wrapper').animate({right:"100%"});
            $('.points-condition-wrapper').slideUp();
            $('.mask-wrapper').height(0);
        }else {
            $('.points-condition-wrapper').slideUp();
            $('.mask-wrapper').height(0);
        }
    }
    $scope.activeIndex = 0;
    $scope.getCurrentData=function(index){
        if(index === 2 || index === 3) {
            $scope.activeIndex = 1;
        }else {
            $scope.activeIndex = index;
        }
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideTo=function(){
        return $scope.activeIndex;
    };
    $scope.slideHasChanged=function(index){
        $scope.activeIndex = index;
        $ionicSlideBoxDelegate.update();
    };

    //筛选条件
    //隐藏筛选条件
    $('.points-condition-wrapper').hide();
    //tab条件切换
    $scope.tabActive = 0;
    $scope.switchConditionTab = function (index) {
        $scope.tabActive = index;
    };
    //单选框条件切换
    $scope.radioActive = 0;
    $scope.switchConditionRadio = function (index) {
        $scope.radioActive = index;
    };
    //筛选取消
    $scope.conditionCancel = function () {
        $('.points-condition-wrapper').slideUp();
        $('.mask-wrapper').height(0);
    }
    //筛选确认
    $scope.conditionConfirm = function () {
        alert('确认搜索条件！');
    }

    //搜索栏
    $scope.inputText = {value: ""};
    //监听回车键事件
    $("#searchText").on('keypress', function(e) {//搜索栏触发回车键事件
        var key_code = window.event?e.keyCode:e.which;
        if(key_code===13) {//回车键代码
            console.log($scope.inputText.value);
            $('#searchText')[0].blur();
        }
    });
    //监听搜索栏的取消按钮
    $scope.cancelShow = false;
    $scope.$watch('inputText.value', function (newVal, oldVal) {
        if(newVal != oldVal && newVal != ""){
            $scope.cancelShow = true;
        }else {
            $scope.cancelShow = false;
        }
    });
    //清除搜索栏文本
    $scope.cleanText = function () {
        $scope.inputText.value="";
    }
    //取消隐藏搜索栏
    $scope.cancelSearch = function() {
        $('.points-search-wrapper').animate({left:"100%"});
        $('.points-tab-wrapper').animate({right:"0"});
    }


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
    });

    //积分分类商品查询
    $scope.pointGoodsListData = null;
    $scope.catId=$stateParams.catId?$stateParams.catId:'';
    $scope.findMallProductList=function (title) {
        httpService.getData(JYApi.findMallProductList, 'post', {
            params:JSON.stringify({
                "type": "ALL",
                "catLevel": 2,
                "pageIndex": 1,
                "pageRows": 50,
                "skuPageIndex": 1,
                "skuPageRows": 50,
                "title":title,
                "cinemaId": 283,
                cinemaOuterId: 283
            })
        }, function (res) {
            var num =0;
            angular.forEach(res.data,function(v,k){
                if($stateParams.catId){
                    if($stateParams.catId==v.catId){
                        v.active=true
                    }
                }else{
                    res.data[0].active=true
                }
                if(v.itemSkuList[0].activityFlag=='Y'){
                    v.high = v.itemSkuList.length*135;
                }else{
                    v.high = v.itemSkuList.length*114;
                }
                num=num+  v.high;
                v.numHigh =num
            });
            $scope.pointGoodsListData=res.data;
            console.log($scope.pointGoodsListData)
            if($stateParams.index){
                $scope.changeCategoryListNew($scope.catId,$stateParams.index)
            }
            if($stateParams.catName) {
                $scope.pointGoodsListData.map(function(item, index){
                    if (item.catName === $stateParams.catName) {
                        $scope.changeCategoryListNew(item.catId, index)
                    }
                });
            }
            $timeout(function(){
                $scope.categoryFlaglogo=true
            },1000)
        })
    };
    $scope.findMallProductList();
    $scope.$on('$ionicView.enter',function () {
        $scope.findMallProductList();
    });
    $scope.changeCategoryListNew=function(catId,index) {
        console.log(catId)
        console.log(index)
        $scope.catId = catId;
        if (index == 0) {
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, 0, [true])
        } else {
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, $scope.pointGoodsListData[index - 1].numHigh, [true])

        }
    };

    //轮播
    // $scope.getCarouselByCity = function () {
    //     $scope.carouselData=[];
    //     httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
    //         params:JSON.stringify({
    //             "adverPosition":"APP_SHOP_BANNER",
    //             "cityName":localStorage.currentCity
    //         })
    //     }, function (res) {
    //         if(res.status=="S"){
    //             if(!res.data || res.data.length==0){
    //                 //获取默认轮播数据
    //                 httpService.getData(JYApi.findAdvertisImageInfo, 'post', {
    //                     params:JSON.stringify({
    //                         "adverPosition":"APP_SHOP_BANNER",
    //                         "cityName":''
    //                     })
    //                 }, function (res) {
    //                     if(res.status=="S"){
    //                         $scope.carouselData = res.data;
    //                         $timeout(function () {
    //                             var swiper = new Swiper('.swiper-container-focus', {
    //                                 autoplay:4000,
    //                                 loop : true,
    //                                 observer:true,
    //                                 observeParents:true
    //                             });
    //                         },0);
    //                     } else {
    //                         var myPopup = $ionicPopup.show({
    //                             title: languageSetting.tip,
    //                             cssClass: 'jyAlert',
    //                             template: res.msg
    //                         });
    //                         $timeout(function () {
    //                             myPopup.close();
    //                         }, 2000);
    //                     }
    //                 });
    //             }else{
    //                 $scope.carouselData = res.data;
    //                 $timeout(function () {
    //                     var swiper = new Swiper('.swiper-container-focus', {
    //                         autoplay:4000,
    //                         loop : true,
    //                         observer:true,
    //                         observeParents:true
    //                     });
    //                 },0);
    //             }
    //         }
    //     },function(error){
    //
    //     });
    // };
    // $scope.getCarouselByCity();
});

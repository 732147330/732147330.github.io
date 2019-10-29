'use strict';
app.controller('categoryCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$state,$ionicPopup,$ionicViewSwitcher, $ionicPlatform, $timeout,$ionicScrollDelegate,$ionicPosition) {
    $scope.catId=$stateParams.catId?$stateParams.catId:'';
    $scope.title=$stateParams.title?$stateParams.title:'';
    $rootScope.currentCity = localStorage.currentCity ? localStorage.currentCity : languageSetting.defaultCity;
    localStorage.currentCity = localStorage.currentCity ? localStorage.currentCity : $rootScope.currentCity;

    $scope.current={};
    $scope.search =function(){
        $state.go('mallSearch', {catId:'' ,title: $scope.current.title});
        $ionicViewSwitcher.nextDirection("none")
    };
    $scope.$on('$ionicView.enter',function () {
        $scope.userInfo=localStorage.userInfo?JSON.parse(localStorage.userInfo):'';
        $scope.categoryFlaglogo=false;
        $rootScope.newcinemaData=sessionStorage.newcinemaData?JSON.parse(sessionStorage.newcinemaData):'';
        console.log($scope.newcinemaData)
        $scope.cinemaNameAlt=$stateParams.cinemaNameAlt?$stateParams.cinemaNameAlt:$rootScope.newcinemaData.cinemaNameAlt;
                 $timeout(function () {
                     $rootScope.newcinemaData=sessionStorage.newcinemaData?JSON.parse(sessionStorage.newcinemaData):'';
                     $scope.cinemaNameAlt=$stateParams.cinemaNameAlt?$stateParams.cinemaNameAlt:$rootScope.newcinemaData.cinemaNameAlt;
                 },6000);
        if($stateParams.cinemaOuterId || $scope.newcinemaData.cinemaOuterId){
            $scope.findMallProductList();
        }else{

        }

    });
    $scope.getcinemaBySku=function(item){
        sessionStorage.cinemaBySkuData=sessionStorage.newcinemaData?sessionStorage.newcinemaData:'';
        // if(($scope.equitycardFlag && $scope.equitycardFlag === 'N')
        //     && (item.ruleHeaderIdList && item.ruleHeaderIdList.length != 0)) {
        //     var myPopup = $ionicPopup.show({
        //         title: languageSetting.tip,
        //         cssClass: 'jyAlert',
        //         template: '该商品仅限权益卡用户购买!',
        //         buttons: [
        //             {
        //                 text: '确定',
        //                 type: 'button-calm',
        //                 onTap: function (e) {
        //                     myPopup.close();
        //                 }
        //             }
        //         ]
        //     });
        // }else {
            var ruleHeaderIdList = item.ruleHeaderIdList?item.ruleHeaderIdList:[];
            $state.go('productDetail',{'skuId':item.skuId,'ruleHeaderIdList':ruleHeaderIdList.length>0?ruleHeaderIdList:''});
        // }
    };
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
    $scope.categoryTabs=[
        {
            name:'排序',
            active:false,
            subCategory:[
                {
                    name:'价格从高到低',
                    active:false,
                    value:'priceSortDesc'
                },
                {
                    name:'价格从低到高',
                    active:false,
                    value:'priceSortAsc'
                },
                {
                    name:'销量从高到低',
                    active:false,
                    value:'salesDesc'
                },
                {
                    name:'销量从低到高',
                    active:false,
                    value:'salesAsc'
                },
                {
                    name:'发布时间最新',
                    active:false,
                    value:'releaseTimeDesc'
                },
                {
                    name:'发布时间最晚',
                    active:false,
                    value:'releaseTimeAsc'
                }

            ]
        },
        {
            name:'商品分类',
            active:false
        },
        {
            name:'电影主题',
            active:false
        }
    ];

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

    $scope.showCategory=function (index) {
        $scope.currentIndex=index;
        if(!$scope.categoryTabs[index].active){
            $scope.categoryTabs.filter(function (item,index) {
               item.active=false;
            });
        }
        $scope.categoryTabs[index].active=!$scope.categoryTabs[index].active;
        if($scope.categoryTabs[index].active){
            $scope.showCategoryFlag=true;

        }else{
            $scope.showCategoryFlag=false;
        }
    };

    $scope.hideMask=function () {
        $scope.showCategoryFlag=false;
        $scope.categoryTabs.filter(function (item,index) {
            item.active=false;
        });
    };

    $scope.getSubActive=function (index) {
        $scope.subActiveIndex=index;
        if(!$scope.categoryTabs[$scope.currentIndex].subCategory[index].active){
            $scope.categoryTabs[$scope.currentIndex].subCategory.filter(function (item,index) {
                item.active=false;
            });
        }
        $scope.categoryTabs[$scope.currentIndex].subCategory[index].active=!$scope.categoryTabs[$scope.currentIndex].subCategory[index].active;
        $scope.showCategoryFlag=false;
        $scope.categoryTabs.filter(function (item,index) {
            item.active=false;
        });

        //获取选择的值
        if($scope.currentIndex==0){
            $scope.default= $scope.categoryTabs[$scope.currentIndex].subCategory[index].active?$scope.categoryTabs[$scope.currentIndex].subCategory[index].value:'';
        }else if($scope.currentIndex==2){
            $scope.propValueIdSet= $scope.categoryTabs[$scope.currentIndex].subCategory[index].active?$scope.categoryTabs[$scope.currentIndex].subCategory[index].propValueId:'';
        }
        $scope.categoryList(1,100,$stateParams.title);
    };

    //商品分类切换
    //$scope.getSortSubActive=function (index) {
    //    $scope.parentCatIndex=index;
    //    if($scope.parentCatIndex==0){
    //        $scope.showCategoryFlag=false;
    //        $scope.categoryTabs.filter(function (item,index) {
    //            item.active=false;
    //        });
    //        $scope.catId='';
    //        $scope.categoryList(1,100,$stateParams.title);
    //    }else{
    //        $scope.categoryData.filter(function (item,index) {
    //            item.active=false;
    //        });
    //        $scope.categoryData[index].active=true;
    //        $scope.getCategoryDetail($scope.categoryData[index].catId);
    //    }
    //};

    //商品搜索
    //$scope.categoryList=function (page,pageSize,title) {
    //    httpService.getData(JYApi.findItemSkuCopy, 'post', {
    //        params:JSON.stringify({
    //            default:$scope.default,
    //            catId:$scope.catId,
    //            title:title,
    //            propValueIdSet:$scope.propValueIdSet,
    //            pageIndex:page,
    //            pageRows:pageSize
    //        })
    //    }, function (res) {
    //        $scope.categoryListData = res.data;
    //    },2)
    //};
    //$scope.categoryList(1,100,$scope.title);

    //电影主题
    //$scope.showMovie=function () {
    //    httpService.getData(JYApi.findItemPropValues, 'post', {
    //        params:JSON.stringify({
    //            propNameSet:"电影主题"
    //        })
    //    }, function (res) {
    //        if(res.data.length>0){
    //            $scope.MovieThemeList = res.data[0].value;
    //        }
    //        $scope.categoryTabs[2].subCategory=$scope.MovieThemeList;
    //    });
    //};
    //$scope.showMovie();

    //获取商品2级分类
    //$scope.getCategory=function () {
    //    httpService.getData(JYApi.findItemCat, 'post', {
    //        params:JSON.stringify({
    //            type:"ALL",
    //            catLevel:2,
    //            pageIndex:1,
    //            pageRows:100
    //        })
    //    }, function (res) {
    //        $scope.categoryData=res.data;
    //        $scope.categoryData.unshift({catName:'全部分类'});
    //        $scope.categoryTabs[1].subCategory=$scope.categoryData;
    //
    //        // $timeout(function () {
    //        //     var swiper = new Swiper('.swiper-container-category', {
    //        //         pagination: '.swiper-pagination',
    //        //         slidesPerView: 3,
    //        //         paginationClickable: true,
    //        //         spaceBetween: 30,
    //        //         freeMode: true,
    //        //         direction: 'vertical'
    //        //     });
    //        // },0);
    //    })
    //};
    //$scope.getCategory();






    //获取商品3级分类
    //$scope.getCategoryDetail=function (catId) {
    //    httpService.getData(JYApi.findItemCat, 'post', {
    //        params:JSON.stringify({
    //            type:"ALL",
    //            catLevel:3,
    //            parentId:catId,
    //            pageIndex:1,
    //            pageRows:50
    //        })
    //    }, function (res) {
    //        $scope.categoryDtailData=res.data;
    //    })
    //};

    //$scope.goSearch=function (index) {
    //    $scope.categoryDtailIndex=index;
    //    $scope.categoryDtailData.filter(function (item,index) {
    //        item.active=false;
    //    });
    //    $scope.categoryDtailData[index].active=true;
    //    $scope.showCategoryFlag=false;
    //    $scope.categoryTabs.filter(function (item,index) {
    //        item.active=false;
    //    });
    //    $scope.catId=$scope.categoryDtailData[$scope.categoryDtailIndex].catId;
    //    $scope.categoryList(1,100,$stateParams.title);
    //};

//新需求
    //获取商品分类
    $scope.getCategoryNew=function () {
        httpService.getData(JYApi.findItemCat, 'post', {
            params:JSON.stringify({
                type:"ALL",
                catLevel:2,
                pageIndex:1,
                pageRows:50
            })
        }, function (res) {
            //if(res.status=='S'){
                $scope.categoryNewData=res.data;
                angular.forEach($scope.categoryNewData,function(value,key){
                    value.active=false;
                    if($stateParams.catId){
                        if($stateParams.catId==value.catId){
                            value.active=true
                        }
                    }else{
                        $scope.categoryNewData[0].active=true
                    }

                });
            //}
        })
    };
    //$scope.getCategoryNew();
    //初始化设置
    $scope.pageSize=100;
    $scope.page=1;
    $scope.noMorePage=false;
    //商品搜索
    $scope.categoryListNew=function (page,pageSize,catId,title) {
        httpService.getData(JYApi.findItemSkuCopy, 'post', {
            params:JSON.stringify({
                //default:$scope.default,
                catId:catId,
                title:title,
                //propValueIdSet:$scope.propValueIdSet,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            if(res.status=="S" && res.data.length>0){
                if($scope.page==1){
                    $scope.categoryListNewData=[];
                }
                angular.forEach(res.data,function(v,k){
                    $scope.categoryListNewData.push(v);
                });
                if(res.data.length<$scope.pageSize){
                    $scope.noMorePage=true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }else{
                $scope.noMorePage=true;
            }
        })
    };
    //$scope.categoryListNew(1,$scope.pageSize,$scope.catId,$scope.title);
    //切换

    $scope.changeCategoryListNew=function(catId,index){
        $scope.catId=catId;
        if(index==0){
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, 0, [true])
        }else{
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, $scope.categoryListNewData[index-1].numHigh, [true])

        }

    };

    //$timeout(function(){
    //    $scope.categoryFlag=true;
    //},1000)

    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop();
    };
    //上拉加载更多
    //$scope.loadMore=function(){
    //        $scope.page++;
    //        $scope.categoryListNew($scope.page,$scope.pageSize,$scope.catId,$scope.title);
    //
    //};
    //展开活动详情
    $scope.showDetial=function(row,index){
        row[index].showCon = !row[index].showCon;
    };

    $scope.scrollContent=function () {
        $scope.top=$ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top;
        //console.log( $scope.top)
        //if(0<= $scope.top<$scope.categoryListNewData[0].numHigh){
        //    $scope.categoryListNewData[0].active=true;
        //}else{
        //    $scope.categoryListNewData[0].active=false;
        //}
        //if($scope.categoryListNewData[0].numHigh<=$scope.top && $scope.top<$scope.categoryListNewData[1].numHigh){
        //    $scope.categoryListNewData[1].active=true;
        //}else{
        //    $scope.categoryListNewData[1].active=false;
        //}
        //if($scope.categoryListNewData[1].numHigh<=$scope.top && $scope.top<$scope.categoryListNewData[2].numHigh){
        //    $scope.categoryListNewData[2].active=true;
        //}else{
        //    $scope.categoryListNewData[2].active=false;
        //}
        //if($scope.categoryListNewData[2].numHigh<=$scope.top && $scope.top<$scope.categoryListNewData[3].numHigh){
        //    $scope.categoryListNewData[3].active=true;
        //}else{
        //    $scope.categoryListNewData[3].active=false;
        //}
        var index = 0;
        for(var k = 0; k < $scope.categoryListNewData.length; k++){
            if(k == 0){
                if(0<= $scope.top && $scope.top< $scope.categoryListNewData[0].numHigh){
                    index = k;
                }
            }else{
                if($scope.categoryListNewData[k-1].numHigh <= $scope.top && $scope.top < $scope.categoryListNewData[k].numHigh){
                    index = k;
                    break;
                }
            }
        }
        $scope.test(index);
        $scope.$apply();
    };

    $scope.test =function(k){
        if(k == 0){
            if(0<= $scope.top&& $scope.top<$scope.categoryListNewData[0].numHigh){
                $scope.categoryListNewData[0].active=true;
                angular.forEach($scope.categoryListNewData,function(v,key){
                    if(key!=k){
                        $scope.categoryListNewData[key].active=false;
                    }
                })
            }else{
                $scope.categoryListNewData[0].active=false;
            }
        }else{
            if($scope.categoryListNewData[k-1].numHigh <= $scope.top &&  $scope.top < $scope.categoryListNewData[k].numHigh){
                $scope.categoryListNewData[k].active=true;
                angular.forEach($scope.categoryListNewData,function(v,key){
                    if(key!=k){
                        $scope.categoryListNewData[key].active=false;
                    }
                })
            }else{
                $scope.categoryListNewData[k].active=false;
            }
        }
        $scope.$apply();
    };
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
                "cinemaId": $scope.newcinemaData.cinemaId,
                cinemaOuterId:$stateParams.cinemaOuterId?$stateParams.cinemaOuterId:$scope.newcinemaData.cinemaOuterId
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
            $scope.categoryListNewData=res.data;
            $scope.equitycardFlag = res.equitycardFlag;
            if($stateParams.index){
                $scope.changeCategoryListNew($scope.catId,$stateParams.index)
            }
            if($stateParams.catName) {
                $scope.categoryListNewData.map(function(item, index){
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

    //$scope.findMallProductList();

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
    if(localStorage.userInfo){
        $scope.findCartInfo();
    }


    $scope.sougou=function(){
        if(sessionStorage.newcurrentLineList=='undefined'){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: '小主，您所在的城市没有金逸影院!请您切换到有金逸影院的城市进行选购吧！'
            });
            $timeout(function () {
                myPopup.close();
            }, 2000);
        }else{
            $scope.newcinemaData=sessionStorage.newcinemaData?JSON.parse(sessionStorage.newcinemaData):'';
            $scope.newcurrentLineList=sessionStorage.newcurrentLineList?JSON.parse(sessionStorage.newcurrentLineList):'';
            console.log( $scope.newcinemaData)
            console.log($scope.newcurrentLineList)
            $state.go('schedule',{'movieId':$scope.newcurrentLineList.filmId,theatreId: $scope.newcinemaData.cinemaId})
        }
    }
});

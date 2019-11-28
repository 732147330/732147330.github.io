'use strict';
app.controller('mallSearchCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$state,$ionicPopup, $ionicPlatform, $timeout) {
    $scope.catId=$stateParams.catId?$stateParams.catId:'';
    $scope.title=$stateParams.title?$stateParams.title:'';
    $scope.current={};
    $scope.$on('$ionicView.enter',function () {
      $scope.userInfo=localStorage.userInfo?JSON.parse(localStorage.userInfo):'';
    });

    $scope.search =function(){
        if($scope.current.title){
            $scope.categoryList(1,1000,$scope.current.title);
        }else{
            $scope.categoryList(1,1000,$stateParams.title?$stateParams.title:'');
        }
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
        $scope.categoryList(1,1000,$stateParams.title);
    };

    //商品分类切换
    $scope.getSortSubActive=function (index) {
        $scope.parentCatIndex=index;
        if($scope.parentCatIndex==0){
            $scope.showCategoryFlag=false;
            $scope.categoryTabs.filter(function (item,index) {
                item.active=false;
            });
            $scope.catId='';
            $scope.categoryList(1,1000,$stateParams.title);
        }else{
            $scope.categoryData.filter(function (item,index) {
                item.active=false;
            });
            $scope.categoryData[index].active=true;
            $scope.getCategoryDetail($scope.categoryData[index].catId);
        }
    };

    //商品搜索
    $scope.categoryList=function (page,pageSize,title) {
        httpService.getData(JYApi.findItemSkuCopy, 'post', {
            params:JSON.stringify({
                default:$scope.default,
                catId:$scope.catId,
                title:title,
                propValueIdSet:$scope.propValueIdSet,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            $scope.categoryListData = res.data;
        },2)
    };
    $scope.categoryList(1,1000,$scope.title);

    //电影主题
    $scope.showMovie=function () {
        httpService.getData(JYApi.findItemPropValues, 'post', {
            params:JSON.stringify({
                propNameSet:"电影主题"
            })
        }, function (res) {
            if(res.data.length>0){
                $scope.MovieThemeList = res.data[0].value;
            }
            $scope.categoryTabs[2].subCategory=$scope.MovieThemeList;
        });
    };
    $scope.showMovie();

    //获取商品2级分类
    $scope.getCategory=function () {
        httpService.getData(JYApi.findItemCat, 'post', {
            params:JSON.stringify({
                type:"ALL",
                catLevel:2,
                pageIndex:1,
                pageRows:100
            })
        }, function (res) {
            $scope.categoryData=res.data;
            $scope.categoryData.unshift({catName:'全部分类'});
            $scope.categoryTabs[1].subCategory=$scope.categoryData;
        })
    };
    $scope.getCategory();

    //获取商品3级分类
    $scope.getCategoryDetail=function (catId) {
        httpService.getData(JYApi.findItemCat, 'post', {
            params:JSON.stringify({
                type:"ALL",
                catLevel:3,
                parentId:catId,
                pageIndex:1,
                pageRows:50
            })
        }, function (res) {
            $scope.categoryDtailData=res.data;
        })
    };

    $scope.goSearch=function (index) {
        $scope.categoryDtailIndex=index;
        $scope.categoryDtailData.filter(function (item,index) {
            item.active=false;
        });
        $scope.categoryDtailData[index].active=true;
        $scope.showCategoryFlag=false;
        $scope.categoryTabs.filter(function (item,index) {
            item.active=false;
        });
        $scope.catId=$scope.categoryDtailData[$scope.categoryDtailIndex].catId;
        $scope.categoryList(1,1000,$stateParams.title);
    };



});

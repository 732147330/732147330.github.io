/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('pointProductDetailCtrl', function ($scope, $rootScope,$ionicModal,$stateParams,$ionicBackdrop,$timeout,$ionicPopup,$state,$location,httpService,JYApi) {

    $scope.qty=1;
    $scope.colors=[{name:'红色'}, {name:'黄色'}, {name:'蓝色'}];
    $scope.sizes=[{name:'S'}, {name:'M'}, {name:'L'}, {name:'XL'}, {name:'XXL'}];
    $scope.currentIndex=0;
    $scope.tabs=[{name:'图文详情'}, {name:'规格参数'}, {name:'购买须知'}];
    $scope.tabsCon=[{content:''}, {content:''},{content:''}];
    $scope.text="请选择"+$scope.chooseName+"分类";
    $scope.productDetailModalData=[];
    $scope.skuId=$stateParams.skuId;
    $scope.getCurrentIndex=function (index) {
        $scope.currentIndex=index;
    };
    $scope.address={};
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $ionicModal.fromTemplateUrl('templates/pointProductDetail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
    });
    $scope.$on('$ionicView.enter',function () {
        if(sessionStorage.cinemaBySkuData){
            $scope.cinemaBySkuData=JSON.parse(sessionStorage.cinemaBySkuData);
            $scope.address.selCinemaName=$scope.cinemaBySkuData.cinemaName;
            $scope.address.selCinemaAddress=$scope.cinemaBySkuData.address1;
            $scope.address.cinemaOuterId=$scope.cinemaBySkuData.cinemaOuterId;
            console.log( $scope.cinemaBySkuData)
        }
    });
    $scope.$on('$ionicView.leave',function () {
        if($scope.modal){
            $scope.modal.hide();
            $ionicBackdrop.release();
        }
    });
    $scope.showShare = function () {
        $scope.modal.show();
        $ionicBackdrop.retain();
    };
    $scope.hideShare = function (e) {
        $scope.modal.hide();
        $timeout(function(){
            $ionicBackdrop.release();
        },500);
        e.stopPropagation();
    };

    //购物数量控制
    $scope.add=function () {
        $scope.qty++;
    };
    $scope.reduce=function (index) {
        if($scope.qty>0){
            $scope.qty--;
        }
    };

    //获取getDatabyskuParams
    $scope.getDatabyskuParams=function () {
        $scope.propValueIdSet='';
        $scope.selectArr =[];
        $scope.attributesData.filter(function (item,index) {
            item.value.filter(function(subItem,subIndex){
                if(subItem.active){
                    $scope.propValueIdSet+=(subItem.propValueId)+',';
                    $scope.selectArr.push(subItem)
                }
            });
        });

        //更新sku数据
        httpService.getData(JYApi.findItemSkuCopy, 'post', {
            params:JSON.stringify({
                propValueIdSet:$scope.propValueIdSet,
                pointsExFlag:"Y",
                pageIndex:1,
                pageRows:10,
                itemId:$scope.itemId
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.productDetailModalData= res.data[0];
                $scope.productDetailData=res.data[0];
                $scope.productFocusData=res.data[0].appDetailImgSet.split(',');
            }
        });
    };
    $scope.chooseFlag=false;
    $scope.getActiveStatus=function (selfIndex,parentIndex) {
        $scope.attributesData[parentIndex].value.filter(function(item,index){
            if(index==selfIndex){
                item.active=true;
            }else{
                item.active=false;
            }
        });
        $scope.chooseFlag=true;
        $scope.chooseNameActive='';
        angular.forEach($scope.attributesData,function(v,k){
            angular.forEach(v.value,function(v1,k1){
                if(v1.active==true){
                    $scope.chooseNameActive+=(v1.propValue+',')
                }
            })
        });
        $scope.getDatabyskuParams();
    };


    $scope.confirm=function (e) {
        if(!$scope.currentColorIndex){
            $scope.tipFlag=true;
            $timeout(function () {
                $scope.tipFlag=false;
            },2000);
            e.preventDefault();
        }
    };

    //立即购买
    $scope.buy=function () {

        if(!$scope.propValueIdSet&&!$scope.address.selCinemaName){
            $scope.showShare();
            return;
        }

        if(!localStorage.userInfo) {
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.unlogin,
                buttons: [
                    {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                            myPopup.close();
                        }
                    },
                    {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                            $state.go('login', {viewName: 'pointProductDetail', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        } else{
            if(!localStorage.hasAddress){
                $scope.modal.hide();
                $ionicBackdrop.release();
                $scope.productDetailData.qty=$scope.qty;
                $scope.productDetailData.cinemaOuterId=$scope.address.cinemaOuterId;
                sessionStorage.selectArr=JSON.stringify($scope.selectArr);
                sessionStorage.productDetailData=JSON.stringify($scope.productDetailData);
                //去生成订单详情页
                $state.go('mallOrder',{status:'product'});
                //$location.path('/mallOrder',{status:'aa'});
            }else{
                //跳转收货地址维护界面
            }
        }
    };

    //商品详情
    $scope.getProductDetail=function () {
        httpService.getData(JYApi.findItemSkuCopy, 'post', {
            params:JSON.stringify({
                skuId:$stateParams.skuId,
                pointsExFlag:"Y",
                pageIndex:1,
                pageRows:10
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.productDetailData = res.data[0];
                if(typeof($scope.productDetailData.skuPropValueIdSet)=='number'){
                    $scope.defaultValue= [];
                    $scope.defaultValue.push($scope.productDetailData.skuPropValueIdSet);
                }else if(typeof($scope.productDetailData.skuPropValueIdSet)=='string'){
                    $scope.defaultValue=$scope.productDetailData.skuPropValueIdSet.split(',');
                }else{
                    $scope.defaultValue=[];
                }
                console.log($scope.defaultValue);
                $scope.productFocusData=$scope.productDetailData.appDetailImgSet.split(',');
                $timeout(function () {
                    var swiper = new Swiper('.swiper-container-mall-productDetail', {
                        pagination: '.swiper-pagination-product',
                        paginationClickable: true,
                        observer: true
                    });
                },0);
                $scope.tabsCon[0].content=res.data[0].appDetailImgSet.split(',');
                $scope.itemId=res.data[0].itemId;
                $scope.getAttributes();
                $scope.specifications();
                $scope.productDetailModalData= $scope.productDetailData;
            }
        })
    };
    $scope.getProductDetail();


    //商品属性
    $scope.getAttributes=function (itemId) {
        httpService.getData(JYApi.getFindItemSpecIndex, 'post', {
            params:JSON.stringify({
                itemId:$scope.itemId,
                type:"ALL"
            })
        }, function (res) {
            $scope.attributesData = res.data;
            $scope.chooseName='';
            res.data.filter(function (item,index) {
                item.value.filter(function (subItem,subIndex) {
                    if(subItem.propValueId==$scope.defaultValue[index]){
                        subItem.active=true;
                        $scope.chooseName+=(subItem.propValue+',');
                    }else{
                        subItem.active=false;
                    }
                });
            });
            //$scope.getDatabyskuParams();
            $scope.selectArr=[];
            $scope.propValueIdSet='';
            $scope.attributesData.filter(function (item,index) {
                item.value.filter(function(subItem,subIndex){
                    if(subItem.active){
                        $scope.propValueIdSet+=(subItem.propValueId)+',';
                        $scope.selectArr.push(subItem)
                    }
                });
            });
        });
    };

    //规格参数
    $scope.specifications=function () {
        httpService.getData(JYApi.findItemNatureProps, 'post', {
            params:JSON.stringify({
                itemId:$scope.itemId
            })
        }, function (res) {
            $scope.specificationsData = res;
            //console.log($scope.specificationsData)
        })
    };

});

